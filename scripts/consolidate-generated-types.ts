#!/usr/bin/env tsx

/**
 * OpenAPI Generator로 생성된 개별 타입 파일들을 도메인별로 통합하는 스크립트
 * 기존 프로젝트 패턴: 도메인별로 타입이 한 파일에 모임 (user.types.ts, account.types.ts 등)
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const generatedModelsPath = join(projectRoot, 'packages/api/src/__generated__/models');
const outputPath = join(projectRoot, 'packages/api/src/generated-types');

// 도메인별 타입 매핑
const domainMapping: Record<string, string[]> = {
  'auth.types.ts': [
    'auth-login-request',
    'auth-login-response',
    'auth-refresh-token-request',
    'verification-request',
    'verification-code-request',
    'response-data-auth-login-response',
    'response-data-token-response',
    'token-response',
  ],
  'member.types.ts': [
    'member-approve-request',
    'member-find-id-request',
    'member-find-id-response',
    'member-join-response',
    'member-password-change-request',
    'member-send-sms-code-request',
    'member-verify-sms-code-request',
    'individual-member-join-request',
    'corporate-member-join-request',
    'response-data-member-find-id-response',
    'response-data-member-join-response',
  ],
  'account.types.ts': [
    'account-create-request',
    'account-create-response',
    'account-info',
    'account-info-response',
    'account-info-update-request',
    'account-update-pwd-request',
    'item-dto',
    'response-data-account-create-response',
    'response-data-account-info-response',
  ],
  'trade.types.ts': [
    'order-execution-history-request',
    'order-execution-history-response',
    'payment-history-request',
    'payment-history-response',
    'liquidation-history-request',
    'liquidation-history-response',
    'details-order-execution',
    'summary-order-execution',
    'payment-detail',
    'liquidation-detail',
    'liquidation-summary',
    'response-data-order-execution-history-response',
    'response-data-payment-history-response',
    'response-data-liquidation-history-response',
  ],
  'stock.types.ts': [
    'position-stock-request',
    'position-stock-response',
    'possession-stock-request',
    'possession-stock-response',
    'order-stock-request',
    'order-stock-response',
    'position-stock-data',
    'symbol-meta-data',
    'response-data-position-stock-response',
    'response-data-possession-stock-response',
    'response-data-order-stock-response',
    'response-list-order-book-response',
    'order-book-response',
    'response-data-response-list-order-book-response',
  ],
  'asset.types.ts': [
    'asset-deposits-request',
    'asset-deposits-response',
    'asset-positions-request',
    'asset-positions-response',
    'asset-order',
    'asset-position',
    'asset-summary',
    'position',
    'response-data-asset-deposits-response',
    'response-data-asset-positions-response',
  ],
  'terms.types.ts': [
    'response-data-map-terms-name-list-response-terms-by-terms-name',
    'response-data-response-list-response-terms-by-terms-name',
    'response-data-response-terms-list',
    'response-list-response-terms-by-terms-name',
    'response-terms-by-terms-name',
    'response-terms-list',
  ],
  'watch-list.types.ts': [
    'watch-list-add-request',
    'watch-list-response',
    'page-response-watch-list-response',
    'response-data-page-response-watch-list-response',
  ],
  'common.types.ts': [
    'response-data-object',
    'response-data-string',
    'page-request',
    'email',
    'stock-code',
    'order-response-dto',
    'order-response-item-dto',
    'balance-response-dto',
    'balance-response-item-dto',
    'response-data-balance-response-dto',
    'response-data-order-response-dto',
  ],
};

/**
 * API 베이스 타입 파일 생성
 */
function generateApiBaseTypes() {
  console.log('📝 API 베이스 타입 생성 중...\n');

  const baseTypesContent = `/**
 * API 공통 응답 타입
 * 모든 API 응답의 기본 구조
 */

/**
 * API 성공 응답
 * @template T - 응답 데이터 타입
 */
export interface ApiSuccessResponse<T> {
  /** 응답 상태 */
  status: string;
  /** 응답 코드 */
  code: number;
  /** 응답 데이터 (옵셔널) */
  data?: T;
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  /** 응답 상태 */
  status: string;
  /** 응답 코드 */
  code: number;
  /** 에러 메시지 */
  message: string;
  /** 추가 에러 정보 */
  errors?: any | null;
}

/**
 * data가 없는 성공 응답 (삭제, 업데이트 등)
 */
export type ApiEmptySuccessResponse = ApiSuccessResponse<Record<string, never>>;

/**
 * 페이지네이션 응답
 * @template T - 컨텐츠 타입
 */
export interface PageResponse<T> {
  /** 컨텐츠 목록 */
  contents: T[];
  /** 총 페이지 수 */
  totalPages?: number;
  /** 총 요소 수 */
  totalElements?: number;
  /** 첫 페이지 여부 */
  isFirst: boolean;
  /** 마지막 페이지 여부 */
  isLast: boolean;
}

/**
 * ApiSuccessResponse 사용 가이드
 *
 * 1. data가 있는 응답
 *    - 조회(GET) 응답
 *    - 생성(POST) 응답 (생성된 리소스 반환)
 *    - 로그인/인증 응답
 *
 * 2. data가 없을 수 있는 응답
 *    - 업데이트(PUT/PATCH) 응답
 *    - 삭제(DELETE) 응답
 *    - 로그아웃 응답
 *
 * 3. ApiEmptySuccessResponse 사용 (data 없음 보장)
 *    - 순수 성공/실패만 반환하는 경우
 *    - 빈 객체 {} 반환하는 경우
 */
`;

  const baseTypesPath = join(outputPath, 'api-base.types.ts');
  writeFileSync(baseTypesPath, baseTypesContent, 'utf-8');

  console.log('✅ api-base.types.ts 생성 완료\n');
}

/**
 * 도메인별로 타입 파일들을 통합
 */
function consolidateTypes() {
  console.log('🚀 타입 파일 통합 시작...\n');

  // 출력 디렉토리 생성
  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
  }

  // API 베이스 타입 생성
  generateApiBaseTypes();

  let totalConsolidated = 0;

  // 도메인별로 처리
  for (const [outputFile, typeFiles] of Object.entries(domainMapping)) {
    console.log(`📝 처리 중: ${outputFile}`);

    const consolidatedContent: string[] = [];

    // 파일 헤더
    consolidatedContent.push('/* tslint:disable */');
    consolidatedContent.push('/* eslint-disable */');
    consolidatedContent.push('/**');
    consolidatedContent.push(' * Moda API Document');
    consolidatedContent.push(' * Moda API 명세서 입니다.');
    consolidatedContent.push(' *');
    consolidatedContent.push(' * The version of the OpenAPI document: v1');
    consolidatedContent.push(' *');
    consolidatedContent.push(
      ' * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).'
    );
    consolidatedContent.push(' * https://openapi-generator.tech');
    consolidatedContent.push(' * Do not edit the class manually.');
    consolidatedContent.push(' */');
    consolidatedContent.push('');

    // ApiSuccessResponse import 추가
    consolidatedContent.push("import { ApiSuccessResponse } from './api-base.types';");

    // Cross-reference 타입 import 추가
    if (outputFile !== 'common.types.ts') {
      const crossReferenceImports: string[] = [];

      // Email이 필요한 도메인
      if (['auth.types.ts', 'member.types.ts'].includes(outputFile)) {
        crossReferenceImports.push('Email');
      }

      // AccountInfo가 필요한 도메인 (account.types.ts에서 import)
      if (outputFile === 'auth.types.ts') {
        consolidatedContent.push(`import { AccountInfo } from './account.types';`);
      }

      // StockCode가 필요한 도메인
      if (outputFile === 'watch-list.types.ts') {
        crossReferenceImports.push('StockCode');
      }

      if (crossReferenceImports.length > 0) {
        consolidatedContent.push(
          `import { ${crossReferenceImports.join(', ')} } from './common.types';`
        );
      }
    }

    consolidatedContent.push('');

    const imports = new Set<string>();
    const typeDefinitions: string[] = [];

    // 각 타입 파일 읽기
    for (const typeFile of typeFiles) {
      const filePath = join(generatedModelsPath, `${typeFile}.ts`);

      if (!existsSync(filePath)) {
        console.log(`  ⚠️  파일 없음: ${typeFile}.ts`);
        continue;
      }

      const content = readFileSync(filePath, 'utf-8');

      // Import 문 추출
      const importMatches = content.matchAll(/^import type \{ (.+?) \} from '\.\/(.+?)';$/gm);
      for (const match of importMatches) {
        const importedTypes = match[1];
        const fromFile = match[2];

        // 같은 도메인 내 파일이 아닌 경우만 import
        if (!typeFiles.includes(fromFile)) {
          imports.add(`import type { ${importedTypes} } from '../models/${fromFile}';`);
        }
      }

      // 타입 정의 추출 (import 이후 부분)
      const lines = content.split('\n');
      let inDefinition = false;
      const definition: string[] = [];

      for (const line of lines) {
        // import, 주석, 빈 줄 건너뛰기
        if (
          line.startsWith('import ') ||
          line.startsWith('/* tslint') ||
          line.startsWith('/* eslint') ||
          (line.startsWith('/**') && !inDefinition) ||
          line.startsWith(' * Moda') ||
          line.startsWith(' * NOTE:') ||
          line.startsWith(' * https://') ||
          (line.startsWith(' */') && !inDefinition) ||
          (line.trim() === '' && !inDefinition)
        ) {
          continue;
        }

        // 타입 정의 시작
        if (line.match(/^(export (interface|type|const))/)) {
          inDefinition = true;
        }

        if (inDefinition) {
          definition.push(line);
        }
      }

      if (definition.length > 0) {
        // ResponseData* 타입을 ApiSuccessResponse 패턴으로 변환
        let definitionText = definition.join('\n');

        // *TypeType 중복 패턴 제거 (*Type으로 변경)
        // 예: MemberApproveRequestMemberTypeType -> MemberApproveRequestMemberType
        definitionText = definitionText.replace(/(\w+)TypeType/g, '$1Type');

        // ResponseData* 패턴 감지 및 변환
        // ResponseData* wrapper는 그대로 유지하고, ApiSuccessResponse를 extends하도록 변환
        const responseDataPatternOptional =
          /export interface (ResponseData(?!Object|String)\w+) \{[\s\S]*?status: string;[\s\S]*?code: number;[\s\S]*?data\?: (\w+);[\s\S]*?\}/g;
        definitionText = definitionText.replace(
          responseDataPatternOptional,
          (match, wrapperName, dataType) => {
            // data가 옵셔널인 경우도 ApiSuccessResponse 사용 (data가 이미 옵셔널이므로)
            return `export interface ${wrapperName} extends ApiSuccessResponse<${dataType}> {}`;
          }
        );

        // data가 필수인 경우도 처리
        const requiredDataPattern =
          /export interface (ResponseData(?!Object|String)\w+) \{[\s\S]*?status: string;[\s\S]*?code: number;[\s\S]*?data: (\w+);[\s\S]*?\}/g;
        definitionText = definitionText.replace(
          requiredDataPattern,
          (match, wrapperName, dataType) => {
            // ResponseData* 타입명은 그대로 유지
            return `export interface ${wrapperName} extends ApiSuccessResponse<${dataType}> {}`;
          }
        );

        typeDefinitions.push(definitionText);
        totalConsolidated++;
      }
    }

    // Import 추가 (cross-reference import 제거)
    if (imports.size > 0) {
      const filteredImports = Array.from(imports).filter((imp) => {
        // ../models/ import는 제거 (cross-reference)
        return !imp.includes('../models/');
      });

      if (filteredImports.length > 0) {
        consolidatedContent.push(filteredImports.join('\n'));
        consolidatedContent.push('');
      }
    }

    // 타입 정의 추가
    let consolidatedTypes = typeDefinitions.join('\n\n');

    // Cross-reference import를 동일 파일 내 타입 사용으로 변환
    consolidatedTypes = consolidatedTypes.replace(
      /import type \{ (\w+) \} from '\.\.\/models\/[\w-]+';?\n?/g,
      ''
    );

    consolidatedContent.push(consolidatedTypes);

    // 파일 저장
    const outputFilePath = join(outputPath, outputFile);
    writeFileSync(outputFilePath, consolidatedContent.join('\n'), 'utf-8');

    console.log(`  ✅ 생성 완료: ${typeFiles.length}개 타입 통합\n`);
  }

  // index.ts 생성
  const indexContent =
    `// 공통 API 응답 타입\nexport * from './api-base.types';\n\n` +
    `// 도메인별 타입\n` +
    Object.keys(domainMapping)
      .map((file) => `export * from './${file.replace('.ts', '')}';`)
      .join('\n') +
    '\n';

  writeFileSync(join(outputPath, 'index.ts'), indexContent, 'utf-8');

  console.log('================================');
  console.log(`🎉 타입 통합 완료!`);
  console.log(`📁 통합된 타입 파일: ${Object.keys(domainMapping).length}개`);
  console.log(`📦 처리된 타입: ${totalConsolidated}개`);
  console.log(`📁 출력 위치: ${outputPath}`);
}

// 스크립트 실행
consolidateTypes();
