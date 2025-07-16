// Tailwind 프리셋 변환 스크립트 (Dark)
// Figma 토큰을 Tailwind CSS 프리셋으로 변환

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Figma 원본 토큰 파일 읽기
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/tokens/tokens-dark.json'), 'utf-8')
);

// 토큰에서 값을 추출하는 함수
function extractTokens(obj, filterType) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v?.type === filterType && v.value) result[k] = v.value;
    else if (typeof v === 'object' && !v.type) Object.assign(result, extractTokens(v, filterType));
  }
  return result;
}

// 컴포넌트별 토큰 추출 함수
function extractComponentTokens(tokens, keys) {
  const result = {};
  for (const key of keys) {
    if (tokens[key]) {
      result[key.toLowerCase()] = extractTokens(tokens[key], 'color');
    }
  }
  return result;
}

const preset = {
  theme: {
    extend: {
      colors: extractTokens(tokens['Base-Colors'], 'color'),
      fontSize: extractTokens(tokens['Font-Size'] ?? {}, 'dimension'),
      spacing: extractTokens(tokens['Base-Size'] ?? {}, 'dimension'),
      borderRadius: extractTokens(tokens['Radius'] ?? {}, 'dimension'),
      boxShadow: extractTokens(tokens['Shadow'] ?? {}, 'boxShadow'),
      zIndex: extractTokens(tokens['Z-Index'] ?? {}, 'number'),
      // 컴포넌트별 토큰
      ...extractComponentTokens(tokens, [
        'Button',
        'Input',
        'Background',
        'Trade',
        'Table',
        'Popup',
        'Nav',
        'Sidebar',
        'Font-Color',
        'Padding',
      ]),
    },
  },
};

const outPath = path.join(__dirname, '../src/presets/tailwind-preset-dark.js');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `export default ${JSON.stringify(preset, null, 2)};\n`);
console.log('✅ Tailwind 프리셋(dark) 변환 및 저장 완료');
