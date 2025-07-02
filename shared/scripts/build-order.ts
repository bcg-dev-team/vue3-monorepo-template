#!/usr/bin/env tsx

/**
 * 모노레포 빌드 순서 제어 스크립트
 * 순환참조를 방지하기 위해 의존성 순서대로 빌드
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

// 빌드 순서 정의 (의존성 순서)
const BUILD_ORDER = [
  'packages/types', // 기반 패키지
  'packages/utils', // types에 의존
  'packages/api', // types, utils에 의존
  'packages/ui', // types에 의존
  'apps/desktop', // 모든 패키지 사용
  'apps/mobile', // 모든 패키지 사용
] as const;

// 의존성 그래프 정의
const DEPENDENCY_GRAPH = {
  'packages/types': [],
  'packages/utils': ['packages/types'],
  'packages/api': ['packages/types', 'packages/utils'],
  'packages/ui': ['packages/types'],
  'apps/desktop': ['packages/types', 'packages/utils', 'packages/api', 'packages/ui'],
  'apps/mobile': ['packages/types', 'packages/utils', 'packages/api', 'packages/ui'],
} as const;

/**
 * 패키지가 존재하는지 확인
 */
function packageExists(packagePath: string): boolean {
  return existsSync(join(process.cwd(), packagePath, 'package.json'));
}

/**
 * 의존성 순환참조 검사
 */
function checkCircularDependencies(): void {
  console.log('🔍 순환참조 검사 중...');

  try {
    execSync('npx madge --circular packages/', { stdio: 'inherit' });
    console.log('✅ 순환참조 없음');
  } catch (error) {
    console.error('❌ 순환참조 발견!');
    process.exit(1);
  }
}

/**
 * 패키지 빌드
 */
function buildPackage(packagePath: string): void {
  console.log(`📦 빌드 중: ${packagePath}`);

  try {
    execSync('pnpm build', {
      cwd: join(process.cwd(), packagePath),
      stdio: 'inherit',
    });
    console.log(`✅ 빌드 완료: ${packagePath}`);
  } catch (error) {
    console.error(`❌ 빌드 실패: ${packagePath}`);
    process.exit(1);
  }
}

/**
 * 의존성 체크
 */
function checkDependencies(packagePath: string): void {
  const dependencies = DEPENDENCY_GRAPH[packagePath as keyof typeof DEPENDENCY_GRAPH];

  for (const dep of dependencies) {
    if (!packageExists(dep)) {
      console.error(`❌ 의존성 누락: ${packagePath} → ${dep}`);
      process.exit(1);
    }
  }
}

/**
 * 메인 빌드 프로세스
 */
function main(): void {
  console.log('🚀 모노레포 빌드 시작...\n');

  // 순환참조 검사
  checkCircularDependencies();

  // 순서대로 빌드
  for (const packagePath of BUILD_ORDER) {
    if (!packageExists(packagePath)) {
      console.log(`⏭️  패키지 없음, 건너뜀: ${packagePath}`);
      continue;
    }

    // 의존성 체크
    checkDependencies(packagePath);

    // 패키지 빌드
    buildPackage(packagePath);
    console.log('');
  }

  console.log('🎉 모든 패키지 빌드 완료!');
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
