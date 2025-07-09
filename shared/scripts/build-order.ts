#!/usr/bin/env tsx

/**
 * 모노레포 빌드 순서 제어 스크립트
 * 순환참조를 방지하기 위해 의존성 순서대로 빌드
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

// 빌드 순서 정의 (의존성 순서)
const BUILD_ORDER = [
  'packages/types', // 기반 패키지
  'packages/theme', // types에 의존
  'packages/utils', // types에 의존
  'packages/api', // types, utils에 의존
  'packages/ui', // types, theme에 의존
  'apps/desktop', // 모든 패키지 사용
  'apps/mobile', // 모든 패키지 사용
  'apps/mobile-native', // React Native 앱 (WebView 기반)
] as const;

// 의존성 그래프 정의
const DEPENDENCY_GRAPH = {
  'packages/types': [],
  'packages/theme': ['packages/types'],
  'packages/utils': ['packages/types'],
  'packages/api': ['packages/types', 'packages/utils'],
  'packages/ui': ['packages/types', 'packages/theme'],
  'apps/desktop': [
    'packages/types',
    'packages/utils',
    'packages/api',
    'packages/ui',
    'packages/theme',
  ],
  'apps/mobile': [
    'packages/types',
    'packages/utils',
    'packages/api',
    'packages/ui',
    'packages/theme',
  ],
  'apps/mobile-native': ['packages/types', 'packages/utils', 'packages/api', 'packages/theme'],
} as const;

// 타입 정의
type PackagePath = (typeof BUILD_ORDER)[number];

/**
 * 패키지가 존재하는지 확인
 */
function packageExists(packagePath: string): boolean {
  return existsSync(join(process.cwd(), packagePath, 'package.json'));
}

/**
 * 패키지가 빌드되었는지 확인
 */
function isPackageBuilt(packagePath: string): boolean {
  const distPath = join(process.cwd(), packagePath, 'dist');

  if (!existsSync(distPath)) {
    return false;
  }

  // types 패키지는 index.d.ts 체크
  if (packagePath === 'packages/types') {
    return existsSync(join(distPath, 'index.d.ts'));
  }

  // ui 패키지는 dist 기반: index.js, index.d.ts 모두 체크
  if (packagePath === 'packages/ui') {
    return existsSync(join(distPath, 'index.js')) && existsSync(join(distPath, 'index.d.ts'));
  }

  // theme 패키지는 ESM 기준: index.js, index.d.ts 모두 체크
  if (packagePath === 'packages/theme') {
    return existsSync(join(distPath, 'index.js')) && existsSync(join(distPath, 'index.d.ts'));
  }

  // utils, api 패키지는 index.js 체크
  if (packagePath === 'packages/utils' || packagePath === 'packages/api') {
    return existsSync(join(distPath, 'index.js'));
  }

  // React Native 앱은 빌드 체크 제외 (Expo 빌드는 별도 프로세스)
  if (packagePath === 'apps/mobile-native') {
    return true; // React Native 앱은 별도 빌드 프로세스이므로 항상 성공으로 처리
  }

  // 앱 패키지인 경우 index.html 확인
  if (packagePath.startsWith('apps/')) {
    return existsSync(join(distPath, 'index.html'));
  }

  // 기본값: index.js
  return existsSync(join(distPath, 'index.js'));
}

/**
 * 의존성 순환참조 검사
 */
function checkCircularDependencies(): void {
  console.log('🔍 순환참조 검사 중...');

  try {
    // madge가 설치되어 있는지 확인
    try {
      execSync('npx madge --version', { stdio: 'pipe' });
    } catch {
      console.log('📦 madge 설치 중...');
      execSync('pnpm add -D madge', { stdio: 'inherit' });
    }

    execSync('npx madge --circular packages/', { stdio: 'inherit' });
    console.log('✅ 순환참조 없음');
  } catch (error) {
    console.error('❌ 순환참조 발견!');
    console.error('💡 해결 방법:');
    console.error('   1. packages/ 디렉토리의 import 문을 확인하세요');
    console.error('   2. 순환참조가 있는 패키지들을 분리하세요');
    console.error('   3. 인터페이스를 통해 의존성을 역전시키세요');
    process.exit(1);
  }
}

/**
 * 패키지 빌드
 */
function buildPackage(packagePath: PackagePath): void {
  console.log(`📦 빌드 중: ${packagePath}`);

  try {
    // 빌드 전 dist 폴더 정리 (types 패키지는 제외)
    console.log(`🔍 ${packagePath} 빌드 전 dist 폴더 상태 확인...`);
    if (packagePath !== 'packages/types') {
      const distPath = join(process.cwd(), packagePath, 'dist');
      if (existsSync(distPath)) {
        console.log(`🗑️  ${packagePath} dist 폴더 삭제 중...`);
        execSync('rm -rf dist', {
          cwd: join(process.cwd(), packagePath),
          stdio: 'pipe',
        });
      }
    } else {
      console.log(`✅ ${packagePath} dist 폴더 삭제 건너뜀`);
    }

    // React Native 앱은 별도 빌드 프로세스
    if (packagePath === 'apps/mobile-native') {
      console.log(`✅ React Native 앱 빌드 건너뜀 (Expo 빌드는 별도 프로세스)`);
      return;
    }

    execSync('pnpm build', {
      cwd: join(process.cwd(), packagePath),
      stdio: 'inherit',
    });

    // 빌드 결과 확인 (파일 시스템 동기화 대기)
    const maxRetries = 10;
    let retryCount = 0;
    while (!isPackageBuilt(packagePath) && retryCount < maxRetries) {
      execSync('sleep 0.1', { stdio: 'pipe' });
      retryCount++;
    }

    if (!isPackageBuilt(packagePath)) {
      // dist 폴더 내 실제 파일 목록 출력
      const distPath = join(process.cwd(), packagePath, 'dist');
      let fileList = '';
      if (existsSync(distPath)) {
        try {
          fileList = execSync('ls -la', { cwd: distPath }).toString();
        } catch {}
      }
      throw new Error(
        `빌드 산출물이 생성되지 않았습니다: ${packagePath}/dist/index.js, index.d.ts\n실제 dist 폴더 파일 목록:\n${fileList}`
      );
    }

    console.log(`✅ 빌드 완료: ${packagePath}`);
  } catch (error) {
    console.error(`❌ 빌드 실패: ${packagePath}`);
    console.error(`💡 오류 내용: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    console.error('💡 해결 방법:');
    console.error('   1. 해당 패키지의 의존성이 올바르게 설치되었는지 확인');
    console.error('   2. TypeScript 설정을 확인');
    console.error('   3. 빌드 스크립트가 올바르게 정의되었는지 확인');
    process.exit(1);
  }
}

/**
 * 의존성 체크
 */
function checkDependencies(packagePath: PackagePath): void {
  const dependencies = DEPENDENCY_GRAPH[packagePath];

  for (const dep of dependencies) {
    if (!packageExists(dep)) {
      console.error(`❌ 의존성 누락: ${packagePath} → ${dep}`);
      console.error(`💡 해결 방법: ${dep} 패키지를 생성하거나 의존성에서 제거하세요`);
      process.exit(1);
    }

    // 의존 패키지가 빌드되었는지 확인
    if (!isPackageBuilt(dep)) {
      console.error(`❌ 의존 패키지 미빌드: ${packagePath} → ${dep}`);
      console.error(`💡 해결 방법: ${dep} 패키지를 먼저 빌드하세요`);
      process.exit(1);
    }
  }
}

/**
 * 빌드 가능한 패키지 필터링
 */
function getBuildablePackages(): PackagePath[] {
  return BUILD_ORDER.filter((packagePath) => packageExists(packagePath));
}

/**
 * 메인 빌드 프로세스
 */
function main(): void {
  console.log('🚀 모노레포 빌드 시작...\n');

  // 빌드 가능한 패키지 확인
  const buildablePackages = getBuildablePackages();

  if (buildablePackages.length === 0) {
    console.error('❌ 빌드할 패키지가 없습니다.');
    console.error('💡 packages/ 또는 apps/ 디렉토리에 package.json이 있는지 확인하세요');
    process.exit(1);
  }

  console.log(`💡 빌드 대상 패키지: ${buildablePackages.join(', ')}\n`);

  // 순환참조 검사
  checkCircularDependencies();

  // 순서대로 빌드
  for (const packagePath of buildablePackages) {
    // 의존성 체크
    checkDependencies(packagePath);

    // 패키지 빌드
    buildPackage(packagePath);
    console.log('');
  }

  console.log('✅ 모든 패키지 빌드 완료!');
  console.log('📊 빌드된 패키지:');
  buildablePackages.forEach((pkg) => {
    console.log(`   ✅ ${pkg}`);
  });
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
