const StyleDictionaryModule = require('style-dictionary');
const { makeSdTailwindConfig } = require('sd-tailwindcss-transformer');

console.log('🔄 Generating Tailwind config with sd-tailwindcss-transformer...');

const StyleDictionary = StyleDictionaryModule.extend(
  makeSdTailwindConfig({
    type: 'all',
    source: ['./src/config/processed-tokens.json'], // ✅ 1번에서 생성된 파일 경로
    buildPath: './src/config/', // ✅ 명확한 출력 경로
    // 추가 옵션들
    tailwindConfig: {
      // Tailwind 설정 커스터마이징
      prefix: '', // CSS 변수 접두사
      format: 'typescript', // TypeScript 출력
    },
  })
);

StyleDictionary.buildAllPlatforms();
console.log('✅ Tailwind config generated successfully!');
