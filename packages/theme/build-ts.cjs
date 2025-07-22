const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');
const path = require('path');

registerTransforms(StyleDictionary);

const sd = StyleDictionary.extend({
  source: ['./src/tokens/tokens-light.json'], // ✅ 명확한 경로
  platforms: {
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: './src/config/', // ✅ 명확한 출력 경로
      files: [
        {
          destination: 'processed-tokens.json', // ✅ 중간 파일명 명확화
          format: 'json',
        },
      ],
    },
  },
});

console.log('🔄 Processing tokens with @tokens-studio/sd-transforms...');
sd.cleanAllPlatforms();
sd.buildAllPlatforms();
console.log('✅ Tokens processed successfully!');
