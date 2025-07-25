// 1. Style Dictionary 및 변환기 등록
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import { readFile, writeFile } from 'fs/promises';
import { kebabCase } from 'change-case';

register(StyleDictionary);

// 2. 토큰 분리 및 CSS 변수/JSON 생성
async function buildTheme(themeKey, jsonOut, cssOut) {
  const tokens = JSON.parse(await readFile('src/tokens/__tokens.json', 'utf-8'));
  const themeTokens = tokens[themeKey];
  if (!themeTokens) throw new Error(`${themeKey} 토큰이 존재하지 않습니다.`);
  await writeFile(jsonOut, JSON.stringify(themeTokens, null, 2), 'utf-8');

  // 2-1. Style Dictionary로 CSS/JSON 변환
  const sd = new StyleDictionary({
    source: [jsonOut],
    preprocessors: ['tokens-studio'],
    platforms: {
      json: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            destination: jsonOut.replace('.json', '-transformed.json'),
            format: 'json',
          },
        ],
      },
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: './src/styles/',
        files: [
          {
            destination: cssOut,
            format: 'css/variables',
            options: { outputReferences: true },
          },
        ],
      },
    },
  });
  await sd.hasInitialized;
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

// 3. CSS 변수 파일의 :root를 테마 셀렉터로 패치
async function patchThemeSelector(cssPath, theme) {
  const content = await readFile(cssPath, 'utf-8');
  const patched = content.replace(/:root\s*{/, `:root[data-theme=\"${theme}\"] {`);
  await writeFile(cssPath, patched, 'utf-8');
}

// 4. 전체 빌드 실행
async function run() {
  // 4-1. 라이트/다크 토큰 분리 및 CSS/JSON 생성
  await buildTheme('Theme/Light', './__light-tokens.json', '__tokens-light.css');
  await patchThemeSelector('src/styles/__tokens-light.css', 'light');
  await buildTheme('Theme/Dark', './__dark-tokens.json', '__tokens-dark.css');
  await patchThemeSelector('src/styles/__tokens-dark.css', 'dark');

  // 4-2. Tailwind config 자동 생성
  const sdConfig = makeSdTailwindConfig({
    type: 'all',
    isVariables: true,
    formatType: 'cjs',
    source: ['__light-tokens-transformed.json'],
    buildPath: './',
    transforms: ['attribute/cti', 'name/kebab'],
    tailwind: {
      content: [
        './src/**/*.{vue,js,ts,jsx,tsx}',
        '../../packages/**/*.{vue,js,ts,jsx,tsx}',
        '../../apps/**/*.{vue,js,ts,jsx,tsx}',
      ],
      darkMode: 'class',
    },
  });

  const styleDictionaryTailwind = new StyleDictionary(sdConfig);
  await styleDictionaryTailwind.hasInitialized;
  await styleDictionaryTailwind.buildAllPlatforms();

  console.log('✅ Tailwind config 및 CSS 변수 파일(라이트/다크) 생성 완료!');

  // 5. Tailwind config 후처리: 공식 분류만 남기고 재분류
  try {
    const configPath = './tailwind.config.cjs';
    let content = await readFile(configPath, 'utf-8');
    // module.exports = ... 부분만 추출
    const configMatch = content.match(/module\.exports\s*=\s*(\{[\s\S]*\});?/);
    if (!configMatch) throw new Error('config 객체를 찾을 수 없습니다.');
    const configObj = eval('(' + configMatch[1] + ')');
    // 매핑 규칙
    const mappingRules = {
      'base-colors': 'colors',
      'base-colors.primary': 'colors.primary',
      'base-colors.neutral': 'colors.neutral',
      'base-colors.green': 'colors.green',
      'base-colors.red': 'colors.red',
      'base-colors.blue': 'colors.blue',
      'base-colors.purple': 'colors.purple',
      'base-colors.common': 'colors.common',
      'font.color': 'textColor',
      'font.size': 'fontSize',
      'font.line-heights': 'lineHeight',
      'font.letter-spacing': 'letterSpacing',
      'base-size': 'spacing',
      radius: 'borderRadius',
      padding: 'spacing',
      // background: 'colors.background', // 기존 매핑 제거
      'input.color': 'colors.input',
    };
    // 공식 분류
    const allowed = [
      'colors',
      'textColor',
      'fontSize',
      'lineHeight',
      'letterSpacing',
      'spacing',
      'borderRadius',
    ];
    // 컴포넌트성 키
    const ignoreKeys = [
      'button',
      'trade',
      'table',
      'popup',
      'nav',
      'chips',
      'sidebar',
      '메뉴명_01',
      '메뉴명_02',
      '메뉴명_03',
      '메뉴명_04',
      '메뉴명_05',
    ];
    // flatten 함수 (key를 케밥 케이스로 변환)
    function flatten(obj, prefix = '', res = {}) {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        // key를 케밥 케이스로 변환
        const kebabKey = kebabCase(key);
        const newKey = prefix ? `${prefix}.${kebabKey}` : kebabKey;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flatten(value, newKey, res);
        } else {
          res[newKey] = value;
        }
      }
      return res;
    }
    // deep merge 함수
    function deepMerge(target, source) {
      for (const key of Object.keys(source)) {
        if (
          typeof target[key] === 'object' &&
          typeof source[key] === 'object' &&
          target[key] !== null &&
          source[key] !== null &&
          !Array.isArray(target[key]) &&
          !Array.isArray(source[key])
        ) {
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }
    // theme.extend flatten
    const flat = flatten(configObj.theme?.extend || {});
    // 매핑 및 병합
    const merged = {};
    for (const [flatKey, value] of Object.entries(flat)) {
      // 무시할 키
      if (ignoreKeys.some((k) => flatKey.startsWith(k))) continue;
      // flatKey가 background.으로 시작하면 flat하게 colors에 bg- 접두사로 매핑
      if (flatKey.startsWith('background.')) {
        const suffix = flatKey.slice('background.'.length);
        const targetKey = `colors.bg-${suffix}`;
        // 중첩 객체로 복원
        const parts = targetKey.split('.');
        let cur = merged;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const lastKey = parts[parts.length - 1];
        cur[lastKey] = value;
        continue;
      }
      // 기존 매핑 규칙 적용
      let matched = '';
      let mapped = '';
      for (const rule of Object.keys(mappingRules).sort((a, b) => b.length - a.length)) {
        if (flatKey.startsWith(rule)) {
          matched = rule;
          mapped = mappingRules[rule];
          break;
        }
      }
      if (matched) {
        const suffix = flatKey.slice(matched.length).replace(/^[.]/, '');
        const targetKey = suffix ? `${mapped}.${suffix}` : mapped;
        // 중첩 객체로 복원
        const parts = targetKey.split('.');
        let cur = merged;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const lastKey = parts[parts.length - 1];
        if (
          typeof cur[lastKey] === 'object' &&
          typeof value === 'object' &&
          cur[lastKey] !== null &&
          value !== null &&
          !Array.isArray(cur[lastKey]) &&
          !Array.isArray(value)
        ) {
          cur[lastKey] = deepMerge(cur[lastKey], value);
        } else {
          cur[lastKey] = value;
        }
      }
    }
    // 공식 분류만 남기기
    const filteredExtend = Object.fromEntries(
      Object.entries(merged).filter(([k]) => allowed.includes(k))
    );
    // 새 config 객체 재구성
    const newConfig = {
      ...configObj,
      theme: {
        ...configObj.theme,
        extend: filteredExtend,
      },
    };
    const configStr =
      "/** @type {import('tailwindcss').Config} */\nmodule.exports = " +
      JSON.stringify(newConfig, null, 2) +
      ';\n';
    await writeFile(configPath, configStr, 'utf-8');
    console.log('✅ Tailwind config 후처리(공식 분류 재구성) 완료!');
  } catch (e) {
    console.error('❌ Tailwind config 후처리 오류:', e);
  }

  // 6. 불필요한 중간 산출물 삭제
  const fs = await import('fs/promises');
  const filesToRemove = [
    './__light-tokens.json',
    './__dark-tokens.json',
    './__light-tokens-transformed.json',
    './__dark-tokens-transformed.json',
    './__light-tokens-flat.json',
    './__dark-tokens-flat.json',
  ];
  for (const file of filesToRemove) {
    try {
      await fs.unlink(file);
      console.log(`🗑️  ${file} 삭제 완료`);
    } catch (e) {
      // 파일이 없으면 무시
    }
  }
}

// 7. 실행
run();
