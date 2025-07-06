const StyleDictionary = require('style-dictionary');
const path = require('path');

// __dirname 대체 (ESM 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 커스텀 TypeScript ES6 포맷 등록
StyleDictionary.registerFormat({
  name: 'typescript/es6',
  format: function ({ dictionary }) {
    return dictionary.allProperties
      .map((prop) => `export const ${prop.name} = ${JSON.stringify(prop.value)};`)
      .join('\n');
  },
});

// style-dictionary.config.js 경로 지정
const configPath = path.resolve(__dirname, '../style-dictionary.config.js');
StyleDictionary.extend(configPath).buildAllPlatforms();
