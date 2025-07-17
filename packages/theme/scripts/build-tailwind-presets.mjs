// Tailwind 프리셋 빌드 스크립트
// Light와 Dark 프리셋을 모두 생성하고 tailwind.config.js를 자동 업데이트

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('�� Tailwind 프리셋 빌드 시작...');

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

  // Tailwind config 자동 업데이트
  console.log('⚙️ Tailwind config 자동 업데이트 중...');
  const tailwindConfigPath = path.join(__dirname, '../../ui/tailwind.config.js');
  const tailwindConfigContent = `import { lightColors, lightTypography, lightSpacing, lightBorderRadius } from '../theme/src/presets/tailwind-preset-light.js';
import { darkColors, darkTypography, darkSpacing, darkBorderRadius } from '../theme/src/presets/tailwind-preset-dark.js';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/stories/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...lightColors,
        ...darkColors,
      },
      fontSize: lightTypography.fontSize,
      lineHeight: lightTypography.lineHeight,
      letterSpacing: lightTypography.letterSpacing,
      spacing: lightSpacing,
      borderRadius: lightBorderRadius,
    },
  },
};
`;

  fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);

  console.log('✅ Tailwind 프리셋 빌드 완료!');
  console.log('📁 생성된 파일들:');
  console.log('  - packages/theme/src/presets/tailwind-preset-light.js');
  console.log('  - packages/theme/src/presets/tailwind-preset-dark.js');
  console.log('  - packages/ui/tailwind.config.js (자동 업데이트됨)');
} catch (error) {
  console.error('❌ 빌드 중 오류 발생:', error.message);
  process.exit(1);
}
