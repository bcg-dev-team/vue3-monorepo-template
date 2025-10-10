#!/usr/bin/env tsx

/**
 * OpenAPI Swagger JSON으로부터 서비스 클래스를 자동 생성하는 스크립트
 * 기존 프로젝트 패턴을 준수하여 생성
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const swaggerPath = join(projectRoot, 'swagger.json');
const outputDir = join(projectRoot, 'packages/api/src/services/generated');
const API_PREFIX = '/main/v1';

interface SwaggerPath {
  [method: string]: {
    tags: string[];
    summary: string;
    description: string;
    operationId: string;
    parameters?: Array<{
      name: string;
      in: 'path' | 'query' | 'header' | 'cookie';
      required?: boolean;
      description?: string;
      schema?: any;
    }>;
    requestBody?: {
      content: {
        [contentType: string]: {
          schema: {
            $ref?: string;
            type?: string;
          };
        };
      };
    };
    responses: {
      [statusCode: string]: {
        description?: string;
        content?: {
          [contentType: string]: {
            schema: {
              $ref?: string;
              type?: string;
            };
          };
        };
      };
    };
  };
}

interface SwaggerSpec {
  openapi: string;
  info: any;
  tags: Array<{ name: string; description: string }>;
  paths: {
    [path: string]: SwaggerPath;
  };
  components: {
    schemas: any;
  };
}

interface ServiceMethod {
  name: string;
  summary: string;
  description: string;
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    location: 'path' | 'query' | 'body';
  }>;
  requestType?: string;
  responseType?: string;
}

interface ServiceDefinition {
  name: string;
  tag: string;
  description: string;
  methods: ServiceMethod[];
  imports: Set<string>;
}

/**
 * Swagger JSON 로드
 */
function loadSwagger(): SwaggerSpec {
  const content = readFileSync(swaggerPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * operationId를 기존 패턴의 메서드명으로 변환
 */
function convertOperationIdToMethodName(operationId: string): string {
  // camelCase 그대로 사용하되, 필요시 변환 규칙 추가
  const mappings: Record<string, string> = {
    sendAccountCreate: 'createAccount',
    refreshTokensForWeb: 'refreshTokenForWeb',
    refreshTokensForApp: 'refreshTokenForApp',
    sendEmailVerificationCode: 'sendEmailVerificationCode',
    verifyEmailVerificationCode: 'verifyEmailVerificationCode',
    sendSmsVerificationCode: 'sendSmsVerificationCode',
    verifySmsVerificationCode: 'verifySmsVerificationCode',
  };

  return mappings[operationId] || operationId;
}

/**
 * $ref에서 타입명 추출
 * ResponseData* 타입명을 그대로 사용 (consolidate 스크립트가 처리)
 */
function extractTypeName(ref: string): string {
  return ref.split('/').pop() || '';
}

/**
 * Swagger paths를 서비스별로 그룹화
 */
function groupByService(swagger: SwaggerSpec): Map<string, ServiceDefinition> {
  const services = new Map<string, ServiceDefinition>();

  for (const [path, pathItem] of Object.entries(swagger.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue;

      const tag = operation.tags?.[0] || 'Default';
      const tagInfo = swagger.tags.find((t) => t.name === tag);

      if (!services.has(tag)) {
        // 서비스명: 하이픈 제거 후 PascalCase로 변환
        const serviceName =
          tag
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Service';

        services.set(tag, {
          name: serviceName,
          tag,
          description: tagInfo?.description || `${tag} 관련 API 서비스`,
          methods: [],
          imports: new Set(),
        });
      }

      const service = services.get(tag)!;

      // Request 타입 추출
      let requestType: string | undefined;
      if (operation.requestBody?.content?.['application/json']?.schema?.$ref) {
        requestType = extractTypeName(
          operation.requestBody.content['application/json'].schema.$ref
        );
        service.imports.add(requestType);
      }

      // Response 타입 추출
      let responseType: string | undefined;
      const response200 = operation.responses['200'];
      if (response200?.content?.['application/json']?.schema?.$ref) {
        responseType = extractTypeName(response200.content['application/json'].schema.$ref);
        service.imports.add(responseType);
      }

      // Parameters 추출
      const parameters: ServiceMethod['parameters'] = [];

      // Path parameters
      const pathParams = path.match(/\{([^}]+)\}/g);
      if (pathParams) {
        pathParams.forEach((param) => {
          const paramName = param.slice(1, -1);
          const paramInfo = operation.parameters?.find(
            (p) => p.name === paramName && p.in === 'path'
          );
          parameters.push({
            name: paramName,
            type: 'string', // 일반적으로 path params는 string
            required: true,
            description: paramInfo?.description || paramName,
            location: 'path',
          });
        });
      }

      // Query parameters
      operation.parameters
        ?.filter((p) => p.in === 'query')
        .forEach((param) => {
          parameters.push({
            name: param.name,
            type: param.schema?.type || 'string',
            required: param.required || false,
            description: param.description || param.name,
            location: 'query',
          });
        });

      // Request body를 parameters로 추가
      if (requestType) {
        parameters.push({
          name: 'request',
          type: requestType,
          required: true,
          description: `${operation.summary} 요청 데이터`,
          location: 'body',
        });
      }

      service.methods.push({
        name: convertOperationIdToMethodName(operation.operationId),
        summary: operation.summary,
        description: operation.description,
        httpMethod: method as any,
        path,
        parameters,
        requestType,
        responseType,
      });
    }
  }

  return services;
}

/**
 * 서비스 클래스 코드 생성
 */
function generateServiceCode(service: ServiceDefinition): string {
  const lines: string[] = [];

  // Imports
  const typeImports = Array.from(service.imports).sort();
  if (typeImports.length > 0) {
    lines.push(`import {`);
    typeImports.forEach((type) => {
      lines.push(`  ${type},`);
    });
    lines.push(`} from '../../generated-types';`);
  }
  lines.push(`import { CustomAxiosInstance } from '../../types';`);
  lines.push('');

  // Class declaration
  lines.push(`/**`);
  lines.push(` * ${service.description}`);
  lines.push(` * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합`);
  lines.push(` */`);
  lines.push(`export class ${service.name} {`);
  lines.push(`  private axios: CustomAxiosInstance;`);
  lines.push('');
  lines.push(`  constructor(axiosInstance: CustomAxiosInstance) {`);
  lines.push(`    this.axios = axiosInstance;`);
  lines.push(`  }`);
  lines.push('');

  // Methods
  service.methods.forEach((method, index) => {
    if (index > 0) lines.push('');

    // JSDoc
    lines.push(`  /**`);
    lines.push(`   * ${method.summary}`);
    if (method.description && method.description !== method.summary) {
      lines.push(`   * ${method.description}`);
    }

    // Parameters documentation
    method.parameters.forEach((param) => {
      if (param.location !== 'body') {
        lines.push(`   * @param ${param.name} - ${param.description}`);
      }
    });

    if (method.responseType) {
      lines.push(`   * @returns ${method.summary} 결과`);
    }
    lines.push(`   */`);

    // Method signature
    const methodParams = method.parameters
      .filter((p) => p.location !== 'body')
      .map((p) => {
        const optional = !p.required ? '?' : '';
        return `${p.name}${optional}: ${p.type}`;
      });

    // Request body parameter를 개별 파라미터로 전환 (간단한 경우만)
    const bodyParam = method.parameters.find((p) => p.location === 'body');
    if (bodyParam && method.requestType) {
      // TODO: Request 타입의 필드를 파싱해서 개별 파라미터로 추가
      // 현재는 단순히 request 객체로 받음
      methodParams.push(`request: ${method.requestType}`);
    }

    const returnType = method.responseType
      ? `Promise<AxiosResponse<${method.responseType}>>`
      : 'Promise<AxiosResponse>';

    lines.push(`  ${method.name}(${methodParams.join(', ')}) {`);

    // Method body
    const hasRequestBody = method.httpMethod === 'post' || method.httpMethod === 'put';
    const hasQueryParams = method.parameters.some((p) => p.location === 'query');

    // Path 변환 (path parameters 치환 및 prefix 추가)
    let pathStr = API_PREFIX + method.path;
    method.parameters
      .filter((p) => p.location === 'path')
      .forEach((param) => {
        pathStr = pathStr.replace(`{${param.name}}`, `\${${param.name}}`);
      });

    if (hasRequestBody && bodyParam) {
      // Request body 구성
      if (method.httpMethod === 'post') {
        lines.push(`    return this.axios.post<${method.responseType}>(`);
      } else {
        lines.push(`    return this.axios.put<${method.responseType}>(`);
      }
      lines.push(`      \`${pathStr}\`,`);
      lines.push(`      request`);
      lines.push(`    );`);
    } else if (hasQueryParams) {
      // Query parameters
      lines.push(`    return this.axios.${method.httpMethod}<${method.responseType}>(`);
      lines.push(`      \`${pathStr}\`,`);
      lines.push(`      {`);
      lines.push(`        params: {`);
      method.parameters
        .filter((p) => p.location === 'query')
        .forEach((param) => {
          lines.push(`          ${param.name},`);
        });
      lines.push(`        }`);
      lines.push(`      }`);
      lines.push(`    );`);
    } else {
      // Simple GET or DELETE
      lines.push(`    return this.axios.${method.httpMethod}<${method.responseType}>(`);
      lines.push(`      \`${pathStr}\``);
      lines.push(`    );`);
    }

    lines.push(`  }`);
  });

  lines.push(`}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * 서비스 index.ts 생성
 */
function generateIndexFile(services: ServiceDefinition[]): string {
  const lines: string[] = [];

  lines.push(`/**`);
  lines.push(` * Generated API 서비스 클래스`);
  lines.push(` * OpenAPI Generator로 생성된 타입을 사용하여 기존 서비스 패턴 준수`);
  lines.push(` */`);
  lines.push('');

  services.forEach((service) => {
    // 파일명에서 하이픈 제거
    const filename = service.tag.toLowerCase().replace(/-/g, '');
    lines.push(`export { ${service.name} } from './${filename}.service';`);
  });

  lines.push('');

  return lines.join('\n');
}

/**
 * 메인 실행
 */
function main() {
  console.log('🚀 서비스 클래스 자동 생성 시작...\n');

  // Swagger 로드
  const swagger = loadSwagger();
  console.log(`✅ Swagger JSON 로드 완료`);
  console.log(`   - Tags: ${swagger.tags.map((t) => t.name).join(', ')}\n`);

  // 서비스별로 그룹화
  const services = groupByService(swagger);
  console.log(`📦 서비스 그룹화 완료: ${services.size}개 서비스\n`);

  // 출력 디렉토리 생성
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // 각 서비스 파일 생성
  let totalMethods = 0;
  for (const [tag, service] of services.entries()) {
    // 파일명에서 하이픈을 제거하고 camelCase로 변환
    const filename = `${tag.toLowerCase().replace(/-/g, '')}.service.ts`;
    const filepath = join(outputDir, filename);
    const code = generateServiceCode(service);

    writeFileSync(filepath, code, 'utf-8');

    console.log(`✅ ${filename}`);
    console.log(`   - ${service.methods.length}개 메서드`);
    console.log(`   - ${service.imports.size}개 타입 import\n`);

    totalMethods += service.methods.length;
  }

  // index.ts 생성
  const indexCode = generateIndexFile(Array.from(services.values()));
  writeFileSync(join(outputDir, 'index.ts'), indexCode, 'utf-8');
  console.log(`✅ index.ts 생성 완료\n`);

  console.log('================================');
  console.log(`🎉 서비스 클래스 생성 완료!`);
  console.log(`📁 생성된 서비스: ${services.size}개`);
  console.log(`🔧 생성된 메서드: ${totalMethods}개`);
  console.log(`📂 출력 위치: ${outputDir}`);
}

main();
