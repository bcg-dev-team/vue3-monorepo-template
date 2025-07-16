// Tailwind 프리셋 통합 빌드 스크립트
// Light와 Dark 프리셋을 모두 생성

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Tailwind 프리셋 빌드 시작...\n');

try {
  // Light 프리셋 생성
  console.log('📦 Light 프리셋 생성 중...');
  execSync('node scripts/generate-tailwind-preset-light.mjs', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });

  // Dark 프리셋 생성
  console.log('📦 Dark 프리셋 생성 중...');
  execSync('node scripts/generate-tailwind-preset-dark.mjs', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });

  console.log('\n✅ 모든 Tailwind 프리셋 생성 완료!');
  console.log('📁 생성된 파일들:');
  console.log('  - src/presets/tailwind-preset-light.js');
  console.log('  - src/presets/tailwind-preset-dark.js');
} catch (error) {
  console.error('❌ 프리셋 생성 중 오류 발생:', error.message);
  process.exit(1);
}
