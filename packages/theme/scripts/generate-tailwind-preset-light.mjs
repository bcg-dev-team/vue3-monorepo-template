// Tailwind 프리셋 변환 스크립트 (Light)
// Figma 토큰을 Tailwind CSS 프리셋으로 변환 (CSS 변수 직접 매핑)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(__dirname, '../src/tokens/tokens-light.json');
const outputPath = path.join(__dirname, '../src/presets/tailwind-preset-light.js');
const tailwindConfigPath = path.join(__dirname, '../../ui/tailwind.config.js');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

// 1. 모든 색상 토큰을 flat하게 추출 (key: 마지막 key만 사용)
function flattenColors(obj, path = [], result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && 'value' in value && value.type === 'color') {
      // 마지막 key만 사용 (primary800, neutral100 등)
      result[key.toLowerCase()] = value.value;
    } else if (typeof value === 'object') {
      flattenColors(value, [...path, key], result);
    }
  }
  return result;
}

// 참조값을 flatKey로 변환 (마지막 key만)
function refToFlatKey(ref) {
  // {Base-Colors.Neutral.neutral200} → neutral200
  return ref.slice(1, -1).split('.').pop().toLowerCase();
}

function resolveReferences(colors) {
  const resolved = {};
  const getHex = (val, depth = 0) => {
    if (typeof val !== 'string') return val;
    if (val.startsWith('{') && val.endsWith('}')) {
      const refKey = refToFlatKey(val);
      if (colors[refKey] && depth < 10) return getHex(colors[refKey], depth + 1);
      return val;
    }
    return val;
  };
  for (const [key, value] of Object.entries(colors)) {
    resolved[key] = getHex(value);
  }
  return resolved;
}

const flatColors = flattenColors(tokens);
const lightColors = resolveReferences(flatColors);

// 3. 필요한 키만 추출 (flatKey 규칙에 맞게 작성)
const neededKeys = [
  'primary800',
  'primary700',
  'primary600',
  'primary500',
  'primary400',
  'primary300',
  'primary200',
  'primary100',
  'primary050',
  'primarydeep',
  'neutral800',
  'neutral700',
  'neutral600',
  'neutral500',
  'neutral400',
  'neutral300',
  'neutral200',
  'neutral100',
  'neutral000',
  'neutral750',
  'neutral250',
  'neutral150',
  'neutral550',
  'neutral050',
  'red800',
  'red700',
  'red600',
  'red500',
  'red400',
  'red300',
  'red200',
  'red100',
  'red050',
  'blue800',
  'blue700',
  'blue600',
  'blue500',
  'blue400',
  'blue300',
  'blue200',
  'blue100',
  'blue050',
  'green800',
  'green700',
  'green600',
  'green500',
  'green400',
  'green300',
  'green200',
  'green100',
  'green050',
  'purple800',
  'purple700',
  'purple600',
  'purple500',
  'purple400',
  'purple300',
  'purple200',
  'purple100',
  'purple050',
  // 버튼 등 컴포넌트 색상
  'button-disabled-background',
  'button-disabled-text',
  'button-disabled-border',
  'button-outline-background',
  'button-outline-text',
  'button-outline-border',
  'button-primary-background',
  'button-primary-text',
  'button-primary-border',
  'button-red-background',
  'button-red-text',
  'button-red-border',
  'button-lightsolid-background',
  'button-lightsolid-text',
  'button-lightsolid-border',
  'button-redsolid-background',
  'button-redsolid-text',
  'button-redsolid-border',
  'button-redsolid-hover',
  'button-bluesolid-background',
  'button-bluesolid-text',
  'button-bluesolid-border',
  'button-bluesolid-hover',
  // 필요시 추가
];

const filteredColors = {};
for (const key of Object.keys(lightColors)) {
  filteredColors[key] = lightColors[key];
}

// 4. JS 프리셋 파일로 저장
fs.writeFileSync(
  outputPath,
  `export const lightColors = ${JSON.stringify(filteredColors, null, 2)};\n`
);
console.log('✅ Light Tailwind hex 프리셋 생성 완료:', outputPath);

// 5. tailwind.config.js의 colors 블록을 자동으로 덮어쓰기
const configSrc = fs.readFileSync(tailwindConfigPath, 'utf-8');

const colorBlock = `// [TEMPLATE_COLOR_BLOCK_START]\n      colors: ${JSON.stringify(lightColors, null, 8)},\n      // [TEMPLATE_COLOR_BLOCK_END]`;

const colorBlockRegex =
  /\/\/ \[TEMPLATE_COLOR_BLOCK_START\][\s\S]*?\/\/ \[TEMPLATE_COLOR_BLOCK_END\]/m;
let newConfigSrc;
if (colorBlockRegex.test(configSrc)) {
  newConfigSrc = configSrc.replace(colorBlockRegex, colorBlock);
} else {
  // colors 블록이 없으면 extend 내에 삽입
  newConfigSrc = configSrc.replace(/extend:\s*\{/, `extend: {\n${colorBlock},`);
}

fs.writeFileSync(tailwindConfigPath, newConfigSrc);
console.log('✅ tailwind.config.js colors 블록 자동 덮어쓰기 완료:', tailwindConfigPath);
