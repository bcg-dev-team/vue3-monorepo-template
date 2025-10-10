#!/usr/bin/env node

/**
 * OpenAPI Generator를 사용하여 API 클라이언트 코드를 생성하는 스크립트
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// 설정
const config = {
  swaggerJsonPath: join(projectRoot, 'swagger.json'),
  configPath: join(projectRoot, 'openapi-generator-config.yaml'),
  outputDir: join(projectRoot, 'packages/api/src/__generated__'),
  generatorName: 'typescript-axios'
};

/**
 * 디렉토리가 존재하지 않으면 생성
 */
function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 디렉토리 생성: ${dirPath}`);
  }
}

/**
 * Swagger JSON 파일 존재 여부 확인
 */
function checkSwaggerJson() {
  if (!existsSync(config.swaggerJsonPath)) {
    console.error(`❌ Swagger JSON 파일을 찾을 수 없습니다: ${config.swaggerJsonPath}`);
    console.log('💡 Swagger JSON 파일을 프로젝트 루트에 배치해주세요.');
    process.exit(1);
  }
  console.log(`✅ Swagger JSON 파일 확인: ${config.swaggerJsonPath}`);
}

/**
 * OpenAPI Generator 실행
 */
function generateApiClient() {
  try {
    console.log('🚀 OpenAPI Generator 실행 중...');
    
    const command = [
      'pnpm exec openapi-generator-cli generate',
      `-g ${config.generatorName}`,
      `-i ${config.swaggerJsonPath}`,
      `-o ${config.outputDir}`,
      `-c ${config.configPath}`
    ].join(' ');

    console.log(`실행 명령어: ${command}`);
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ API 클라이언트 코드 생성 완료!');
    
  } catch (error) {
    console.error('❌ API 클라이언트 생성 중 오류 발생:', error.message);
    process.exit(1);
  }
}

/**
 * 생성된 파일들 정리
 */
function cleanupGeneratedFiles() {
  try {
    console.log('🧹 생성된 파일들 정리 중...');
    
    // 불필요한 파일들 제거
    const filesToRemove = [
      'README.md',
      '.openapi-generator-ignore',
      '.openapi-generator',
      'git_push.sh'
    ];
    
    filesToRemove.forEach(file => {
      const filePath = join(config.outputDir, file);
      if (existsSync(filePath)) {
        execSync(`rm -rf "${filePath}"`, { cwd: projectRoot });
        console.log(`🗑️  제거: ${file}`);
      }
    });
    
    console.log('✅ 파일 정리 완료!');
    
  } catch (error) {
    console.warn('⚠️  파일 정리 중 오류 발생:', error.message);
  }
}

/**
 * 타입 파일 통합
 */
function consolidateTypes() {
  try {
    console.log('🔄 타입 파일 통합 중...');
    
    const command = 'tsx scripts/consolidate-generated-types.ts';
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ 타입 파일 통합 완료!');
    
  } catch (error) {
    console.warn('⚠️  타입 파일 통합 중 오류 발생:', error.message);
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🎯 OpenAPI Generator 실행 시작');
  console.log('================================');
  
  // 1. 출력 디렉토리 생성
  ensureDirectoryExists(config.outputDir);
  
  // 2. Swagger JSON 파일 확인
  checkSwaggerJson();
  
  // 3. API 클라이언트 생성
  generateApiClient();
  
  // 4. 생성된 파일들 정리
  cleanupGeneratedFiles();
  
  // 5. 타입 파일 통합
  consolidateTypes();
  
  console.log('================================');
  console.log('🎉 OpenAPI Generator 실행 완료!');
  console.log(`📁 생성된 파일 위치: ${config.outputDir}`);
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as generateApiClient };
