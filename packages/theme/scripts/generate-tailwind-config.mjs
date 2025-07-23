import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * CSS 파일을 테마별 선택자로 변환하는 함수
 */
function processCSSFile(filePath, theme) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // :root를 [data-theme="light"] 또는 [data-theme="dark"]로 변경
    const processedContent = content.replace(/:root\s*{/, `[data-theme="${theme}"] {`);

    fs.writeFileSync(filePath, processedContent);
    console.log(`✅ ${path.basename(filePath)} processed for ${theme} theme`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log('🔄 Starting DTCG Format token generation pipeline...');

// 1. __tokens.json 파일 읽기 (절대 수정 X)
const tokensPath = path.join(__dirname, '../src/tokens/__tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// 2. 참조 경로를 테마별로 변환하는 함수
function fixThemeReferences(obj, theme) {
  if (typeof obj !== 'object' || obj === null) return;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value && typeof value.$value === 'string' && value.$value.startsWith('{')) {
        // 모든 참조를 테마별로 변환
        let newValue = value.$value;

        // Base-Colors 참조들
        newValue = newValue.replace(/\{Base-Colors\./g, `{Theme/${theme}.Base-Colors.`);

        // Base-Size 참조들
        newValue = newValue.replace(/\{Base-Size\./g, `{Theme/${theme}.Base-Size.`);

        // Base-Typography 참조들
        newValue = newValue.replace(/\{Base-Typography\./g, `{Theme/${theme}.Base-Typography.`);

        // Base-Radius 참조들
        newValue = newValue.replace(/\{Base-Radius\./g, `{Theme/${theme}.Base-Radius.`);

        // Font 참조들
        newValue = newValue.replace(/\{Font\./g, `{Theme/${theme}.Font.`);

        // Background 참조들
        newValue = newValue.replace(/\{Background\./g, `{Theme/${theme}.Background.`);

        // 기타 참조들 (Base- 접두사가 없는 것들)
        newValue = newValue.replace(/\{([A-Z][a-zA-Z0-9]*)\s*\./g, `{Theme/${theme}.$1.`);

        value.$value = newValue;
        console.log(`🔄 Fixed reference: ${value.$value}`);
      } else {
        fixThemeReferences(value, theme);
      }
    }
  }
}

// 3. 참조를 실제 값으로 대체하는 함수
function resolveReferences(obj, allTokens, resolved = new Set()) {
  if (typeof obj !== 'object' || obj === null) return;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value && typeof value.$value === 'string' && value.$value.startsWith('{')) {
        // 순환 참조 방지
        const refKey = value.$value;
        if (resolved.has(refKey)) {
          console.warn(`⚠️ Circular reference detected: ${refKey}`);
          continue;
        }

        resolved.add(refKey);

        // 참조 경로 추출: {Theme/Dark.Base-Colors.Primary.primary800} -> ['Theme', 'Dark', 'Base-Colors', 'Primary', 'primary800']
        const refPath = value.$value.slice(1, -1).split('.');

        // 참조된 값 찾기
        let refValue = allTokens;
        for (const pathPart of refPath) {
          if (refValue && refValue[pathPart]) {
            refValue = refValue[pathPart];
          } else {
            console.warn(`⚠️ Reference not found: ${value.$value}`);
            resolved.delete(refKey);
            break;
          }
        }

        // 참조된 값이 실제 값($value)을 가지고 있다면 대체
        if (refValue && refValue.$value && typeof refValue.$value === 'string') {
          if (!refValue.$value.startsWith('{')) {
            // 실제 값인 경우
            value.$value = refValue.$value;
            console.log(`✅ Resolved: ${refKey} -> ${refValue.$value}`);
          } else {
            // 또 다른 참조인 경우, 재귀적으로 해결
            const originalValue = value.$value;
            resolveReferences({ temp: refValue }, allTokens, resolved);
            if (refValue.$value && !refValue.$value.startsWith('{')) {
              value.$value = refValue.$value;
              console.log(`✅ Recursively resolved: ${originalValue} -> ${refValue.$value}`);
            }
          }
        }

        resolved.delete(refKey);
      } else {
        resolveReferences(value, allTokens, resolved);
      }
    }
  }
}

// 4. 테마별 토큰 복사 및 참조 변환
const tokensLight = JSON.parse(JSON.stringify(tokens));
const tokensDark = JSON.parse(JSON.stringify(tokens));

// Light 테마 참조 변환
fixThemeReferences(tokensLight, 'Light');

// Dark 테마 참조 변환
fixThemeReferences(tokensDark, 'Dark');

// 5. 참조 해결
console.log('🔍 Resolving Light theme references...');
resolveReferences(tokensLight['Theme/Light'], tokensLight);

console.log('🔍 Resolving Dark theme references...');
resolveReferences(tokensDark['Theme/Dark'], tokensDark);

// 6. Style Dictionary 등록
await register(StyleDictionary);

// 커스텀 CSS 포맷 등록 (root 선택자 없이 CSS 변수만 생성)
StyleDictionary.registerFormat({
  name: 'custom/css-variables',
  format: function ({ dictionary, options }) {
    const { outputReferences } = options;
    return dictionary.allTokens
      .map((token) => {
        // $value를 우선적으로 사용 (DTCG 형식)
        const value = token.$value || token.resolvedValue || token.value || 'undefined';
        return `  --${token.name}: ${value};`;
      })
      .join('\n');
  },
});
// 7. Light 테마 CSS 생성
console.log('🎨 Generating Light theme CSS...');
const sdLight = new StyleDictionary({
  source: [],
  platforms: {},
});

await sdLight.hasInitialized;

const sdLightExtended = await sdLight.extend({
  tokens: tokensLight,
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: path.join(__dirname, '../src/styles/'),
      files: [
        {
          destination: '__tokens-light.css',
          format: 'custom/css-variables',
          filter: (token) => {
            // Theme/Light 하위의 토큰들만 필터링
            return token.path && token.path[0] === 'Theme/Light';
          },
        },
      ],
    },
  },
  log: {
    verbosity: 'verbose',
  },
});
await sdLightExtended.buildAllPlatforms();

// 🔍 DEBUG: buildAllPlatforms 직후 원본 파일 확인
console.log('🔍 DEBUG: Checking original file after buildAllPlatforms...');
const originalLightCssPath = path.join(__dirname, '../src/styles/__tokens-light.css');
if (fs.existsSync(originalLightCssPath)) {
  const originalContent = fs.readFileSync(originalLightCssPath, 'utf8');
  console.log('📄 Original file content (first 500 chars):');
  console.log(originalContent.substring(0, 500));
  console.log('📄 Original file content (last 500 chars):');
  console.log(originalContent.substring(Math.max(0, originalContent.length - 500)));
  console.log('📄 File length:', originalContent.length);
} else {
  console.log('❌ Original file does not exist!');
}

// Light 테마 CSS 파일에 data-theme 선택자 추가 및 변수명 수정
const lightCssPath = path.join(__dirname, '../src/styles/__tokens-light.css');
let lightCssContent = fs.readFileSync(lightCssPath, 'utf8');

// CSS 변수명에서 'theme-light-' 부분 제거
lightCssContent = lightCssContent.replace(/--theme-light-/g, '--');

lightCssContent = lightCssContent.replace(/:roots*{[sS]*?}s*/, '');
lightCssContent = `/**
 * Do not edit directly, this file was auto-generated.
 */

[data-theme="light"] {
${lightCssContent}
}`;
fs.writeFileSync(lightCssPath, lightCssContent, 'utf8');
console.log('✅ Light theme CSS generated.');

// 8. Dark 테마 CSS 생성
console.log('🎨 Generating Dark theme CSS...');
const sdDark = new StyleDictionary({
  source: [],
  platforms: {},
});

await sdDark.hasInitialized;

const sdDarkExtended = await sdDark.extend({
  tokens: tokensDark,
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: path.join(__dirname, '../src/styles/'),
      files: [
        {
          destination: '__tokens-dark.css',
          format: 'custom/css-variables',
          filter: (token) => {
            // Theme/Dark 하위의 토큰들만 필터링
            return token.path && token.path[0] === 'Theme/Dark';
          },
        },
      ],
    },
  },
  log: {
    verbosity: 'verbose',
  },
});
await sdDarkExtended.buildAllPlatforms();

// 🔍 DEBUG: buildAllPlatforms 직후 원본 파일 확인 (Dark)
console.log('🔍 DEBUG: Checking original dark file after buildAllPlatforms...');
const originalDarkCssPath = path.join(__dirname, '../src/styles/__tokens-dark.css');
if (fs.existsSync(originalDarkCssPath)) {
  const originalContent = fs.readFileSync(originalDarkCssPath, 'utf8');
  console.log('📄 Original dark file content (first 500 chars):');
  console.log(originalContent.substring(0, 500));
  console.log('📄 Original dark file content (last 500 chars):');
  console.log(originalContent.substring(Math.max(0, originalContent.length - 500)));
  console.log('📄 Dark file length:', originalContent.length);
} else {
  console.log('❌ Original dark file does not exist!');
}

// Dark 테마 CSS 파일에 data-theme 선택자 추가 및 변수명 수정
const darkCssPath = path.join(__dirname, '../src/styles/__tokens-dark.css');
let darkCssContent = fs.readFileSync(darkCssPath, 'utf8');

// CSS 변수명에서 'theme-dark-' 부분 제거
darkCssContent = darkCssContent.replace(/--theme-dark-/g, '--');

darkCssContent = darkCssContent.replace(/:roots*{[sS]*?}s*/, '');
darkCssContent = `/**
 * Do not edit directly, this file was auto-generated.
 */

[data-theme="dark"] {
${darkCssContent}
}`;
fs.writeFileSync(darkCssPath, darkCssContent, 'utf8');
console.log('✅ Dark theme CSS generated.');

// 9. Tailwind 설정 생성 (생성된 CSS 파일 기반)
console.log('⚙️ Generating Tailwind config...');

// 생성된 CSS 파일에서 CSS 변수명 추출
const cssFilePath = path.join(__dirname, '../src/styles/__tokens-light.css');
const cssContent = fs.readFileSync(cssFilePath, 'utf8');

// CSS 변수명 추출 (--base-colors-primary-primary800 형태)
const cssVariableRegex = /--([^:]+):/g;
const cssVariables = new Set();
let match;

while ((match = cssVariableRegex.exec(cssContent)) !== null) {
  cssVariables.add(match[1]);
}

console.log(`📊 Found ${cssVariables.size} CSS variables`);

// CSS 변수를 Tailwind 설정으로 변환하는 함수
function convertCssVariablesToTailwindConfig(cssVariables) {
  const tailwindConfig = {
    content: [
      './src/**/*.{vue,js,ts,jsx,tsx}',
      '../../packages/**/*.{vue,js,ts,jsx,tsx}',
      '../../apps/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {},
        spacing: {},
        borderRadius: {},
        fontSize: {},
        lineHeight: {},
        letterSpacing: {},
        backgroundColor: {},
        textColor: {},
      },
    },
  };

  cssVariables.forEach((variableName) => {
    const parts = variableName.split('-');

    // base-colors 처리
    if (parts[0] === 'base' && parts[1] === 'colors') {
      const colorType = parts[2];
      const shade = parts[3];

      if (!tailwindConfig.theme.extend.colors[colorType]) {
        tailwindConfig.theme.extend.colors[colorType] = {};
      }

      if (shade.includes('-')) {
        // blue-blue800-deep 같은 경우
        const [baseShade, modifier] = shade.split('-');
        tailwindConfig.theme.extend.colors[colorType][`${baseShade}-${modifier}`] =
          `var(--${variableName})`;
      } else {
        tailwindConfig.theme.extend.colors[colorType][shade] = `var(--${variableName})`;
      }
    }

    // font-color 처리
    else if (parts[0] === 'font' && parts[1] === 'color') {
      const colorName = parts[2];
      if (!tailwindConfig.theme.extend.textColor) {
        tailwindConfig.theme.extend.textColor = {};
      }
      tailwindConfig.theme.extend.textColor[colorName] = `var(--${variableName})`;
    }

    // font-size 처리
    else if (parts[0] === 'font' && parts[1] === 'size' && parts[2] === 'font') {
      const size = parts[3];
      tailwindConfig.theme.extend.fontSize[size] = `var(--${variableName})`;
    }

    // font-line-heights 처리
    else if (parts[0] === 'font' && parts[1] === 'line' && parts[2] === 'heights') {
      const height = parts[3];
      tailwindConfig.theme.extend.lineHeight[height] = `var(--${variableName})`;
    }

    // font-letter-spacing 처리
    else if (parts[0] === 'font' && parts[1] === 'letter' && parts[2] === 'spacing') {
      const spacing = parts[3];
      tailwindConfig.theme.extend.letterSpacing[spacing] = `var(--${variableName})`;
    }

    // background 처리
    else if (parts[0] === 'background') {
      const bgType = parts[1];
      const bgName = parts[2];

      if (!tailwindConfig.theme.extend.backgroundColor) {
        tailwindConfig.theme.extend.backgroundColor = {};
      }

      if (bgName && parts[3]) {
        // background-bg-surface 같은 경우
        const modifier = parts[3];
        tailwindConfig.theme.extend.backgroundColor[`${bgName}-${modifier}`] =
          `var(--${variableName})`;
      } else {
        tailwindConfig.theme.extend.backgroundColor[bgName] = `var(--${variableName})`;
      }
    }

    // base-size-size 처리
    else if (parts[0] === 'base' && parts[1] === 'size' && parts[2] === 'size') {
      const size = parts[3];
      tailwindConfig.theme.extend.spacing[size] = `var(--${variableName})`;
    }

    // padding-padding 처리
    else if (parts[0] === 'padding' && parts[1] === 'padding') {
      const padding = parts[2];
      tailwindConfig.theme.extend.spacing[`p-${padding}`] = `var(--${variableName})`;
    }

    // radius 처리
    else if (parts[0] === 'radius') {
      const radius = parts[1];
      tailwindConfig.theme.extend.borderRadius[radius] = `var(--${variableName})`;
    }

    // nav 처리
    else if (parts[0] === 'nav') {
      const navType = parts[1];
      if (!tailwindConfig.theme.extend.colors.nav) {
        tailwindConfig.theme.extend.colors.nav = {};
      }
      tailwindConfig.theme.extend.colors.nav[navType] = `var(--${variableName})`;
    }

    // chips 처리
    else if (parts[0] === 'chips') {
      const chipType = parts[1];
      const chipProperty = parts[2];

      if (!tailwindConfig.theme.extend.colors.chips) {
        tailwindConfig.theme.extend.colors.chips = {};
      }
      if (!tailwindConfig.theme.extend.colors.chips[chipType]) {
        tailwindConfig.theme.extend.colors.chips[chipType] = {};
      }
      tailwindConfig.theme.extend.colors.chips[chipType][chipProperty] = `var(--${variableName})`;
    }

    // button, input, trade, sidebar, table, popup은 제외 (컴포넌트별 사용)
    // else if (parts[0] === 'button' || parts[0] === 'input' || parts[0] === 'trade' ||
    //          parts[0] === 'sidebar' || parts[0] === 'table' || parts[0] === 'popup') {
    //   // 컴포넌트별 토큰은 제외
    // }
  });

  return tailwindConfig;
}

// Tailwind 설정 파일 생성
const configPath = path.join(__dirname, '../tailwind.config.js');
fs.writeFileSync(
  configPath,
  `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(convertCssVariablesToTailwindConfig(Array.from(cssVariables)), null, 2)};
`,
  'utf8'
);

// 10. Prettier 포맷팅
console.log('✨ Applying Prettier formatting...');
try {
  execSync(`npx prettier --write "${configPath}"`, { stdio: 'inherit' });
  console.log('✅ Prettier formatting applied');
} catch (error) {
  console.warn('⚠️ Prettier formatting failed:', error.message);
}

console.log('🎉 Complete DTCG Format token generation pipeline finished successfully!');
console.log('📁 Generated files:');
console.log(`   - CSS Variables: src/styles/__tokens-light.css, src/styles/__tokens-dark.css`);
console.log(`   - Tailwind Config: tailwind.config.js`);
