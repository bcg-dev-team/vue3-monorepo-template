// Tailwind 프리셋 변환 스크립트 (Light)
// Figma 토큰을 의미 있는 Semantic Token으로 변환

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(__dirname, '../src/tokens/tokens-light.json');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

// 참조값을 실제 값으로 변환 (재귀적으로 해결)
function resolveReference(ref, tokens, depth = 0) {
  if (depth > 10) return ref; // 무한 루프 방지

  if (!ref.startsWith('{') || !ref.endsWith('}')) return ref;

  const path = ref.slice(1, -1).split('.');
  let value = tokens;

  for (const key of path) {
    if (value && value[key]) {
      value = value[key];
    } else {
      return ref; // 참조를 찾을 수 없으면 원본 반환
    }
  }

  // value가 참조를 포함하고 있으면 재귀적으로 해결
  if (value.value && typeof value.value === 'string' && value.value.startsWith('{')) {
    return resolveReference(value.value, tokens, depth + 1);
  }

  return value.value || ref;
}

// 의미 있는 semantic token들을 생성
function generateSemanticTokens(tokens) {
  const semanticTokens = {
    // Primary Colors
    primary: resolveReference('{Base-Colors.Primary.primary800}', tokens),
    'primary-light': resolveReference('{Base-Colors.Primary.primary100}', tokens),
    'primary-deep': resolveReference('{Base-Colors.Primary.primary-deep}', tokens),

    // Text Colors
    'text-primary': resolveReference('{Font.Color.Default}', tokens),
    'text-secondary': resolveReference('{Font.Color.Default-muted}', tokens),
    'text-disabled': resolveReference('{Input.Color.text-disable}', tokens),
    'text-inverse': resolveReference('{Font.Color.White}', tokens),
    'text-footer': resolveReference('{Font.Color.footer}', tokens),

    // Surface Colors
    'surface-default': resolveReference('{Base-Colors.Common.bg-surface-default}', tokens),
    'surface-muted': resolveReference('{Base-Colors.Common.light-gray(EA)}', tokens),
    'surface-disabled': resolveReference('{Base-Colors.Common.light-gray(F5)}', tokens),
    'surface-inner': resolveReference('{Background.bg-innerframe}', tokens),

    // Border Colors
    'border-default': resolveReference('{Base-Colors.Neutral.neutral300}', tokens),
    'border-focus': resolveReference('{Input.Color.border-focus}', tokens),
    'border-error': resolveReference('{Input.Color.border-error}', tokens),
    'border-disabled': resolveReference('{Input.Color.border-disabled}', tokens),
    'border-static': resolveReference('{Base-Colors.Neutral.neutral400}', tokens),

    // Status Colors
    success: resolveReference('{Font.Color.Green}', tokens),
    error: resolveReference('{Font.Color.Red}', tokens),
    warning: resolveReference('{Base-Colors.Primary.primary800}', tokens),
    info: resolveReference('{Font.Color.Blue}', tokens),
    favorite: resolveReference('{Input.Icon.Favorite}', tokens),

    // Trade Colors
    'trade-buy': resolveReference('{Font.Color.Buy}', tokens),
    'trade-sell': resolveReference('{Font.Color.Sell}', tokens),

    // Button Tokens
    'button-primary-bg': resolveReference('{Button.Primary.background}', tokens),
    'button-primary-text': resolveReference('{Button.Primary.text}', tokens),
    'button-primary-border': resolveReference('{Button.Primary.border}', tokens),
    'button-outline-bg': resolveReference('{Button.Outline.background}', tokens),
    'button-outline-text': resolveReference('{Button.Outline.text}', tokens),
    'button-outline-border': resolveReference('{Button.Outline.border}', tokens),
    'button-disabled-bg': resolveReference('{Button.Disabled.background}', tokens),
    'button-disabled-text': resolveReference('{Button.Disabled.text}', tokens),
    'button-disabled-border': resolveReference('{Button.Disabled.border}', tokens),
    'button-red-bg': resolveReference('{Button.Red.background}', tokens),
    'button-red-text': resolveReference('{Button.Red.text}', tokens),
    'button-red-border': resolveReference('{Button.Red.border}', tokens),
    'button-red-solid-bg': resolveReference('{Button.Red-solid.background}', tokens),
    'button-red-solid-text': resolveReference('{Button.Red-solid.text}', tokens),
    'button-blue-solid-bg': resolveReference('{Button.Blue-solid.background}', tokens),
    'button-blue-solid-text': resolveReference('{Button.Blue-solid.text}', tokens),
    'button-light-solid-bg': resolveReference('{Button.Light-solid.background}', tokens),
    'button-light-solid-text': resolveReference('{Button.Light-solid.text}', tokens),

    // Input Tokens
    'input-bg': resolveReference('{Input.Color.surface}', tokens),
    'input-border': resolveReference('{Input.Color.border-static}', tokens),
    'input-border-focus': resolveReference('{Input.Color.border-focus}', tokens),
    'input-border-error': resolveReference('{Input.Color.border-error}', tokens),
    'input-border-disabled': resolveReference('{Input.Color.border-disabled}', tokens),
    'input-text': resolveReference('{Input.Color.text-static}', tokens),
    'input-text-placeholder': resolveReference('{Input.Color.text-placeholder}', tokens),
    'input-text-disabled': resolveReference('{Input.Color.text-disable}', tokens),
    'input-bg-disabled': resolveReference('{Input.Color.bg-disabled}', tokens),

    // Check & Radio Tokens
    'checkbox-disabled-border': resolveReference('{Input.Check & Radio.disable-border}', tokens),
    'checkbox-disabled-bg': resolveReference('{Input.Check & Radio.disable-bg}', tokens),
    'checkbox-active-bg': resolveReference('{Input.Check & Radio.active-bg}', tokens),
    'checkbox-active-border': resolveReference('{Input.Check & Radio.active-border}', tokens),
    'checkbox-selected-bg': resolveReference('{Input.Check & Radio.selected-bg}', tokens),

    // Icon Tokens
    'icon-default': resolveReference('{Input.Icon.Default}', tokens),
    'icon-off': resolveReference('{Input.Icon.Off}', tokens),
    'icon-on': resolveReference('{Input.Icon.On}', tokens),
    'icon-off-dark': resolveReference('{Input.Icon.Off-dark}', tokens),
    'icon-white': resolveReference('{Input.Icon.White}', tokens),
    'icon-favorite': resolveReference('{Input.Icon.Favorite}', tokens),
    'icon-success': resolveReference('{Input.Icon.Success}', tokens),

    // Menu Tokens
    'menu-bg': resolveReference('{Base-Colors.Common.menu-background}', tokens),
    'menu-border': resolveReference('{Base-Colors.Common.menu-border}', tokens),
    'menu-off': resolveReference('{Base-Colors.Common.menu-off}', tokens),
    'menu-on-long': resolveReference('{Base-Colors.Common.menu-on-long}', tokens),
    'menu-on-short': resolveReference('{Base-Colors.Common.menu-on-short}', tokens),
    'menu-on-correct': resolveReference('{Base-Colors.Common.menu-on-correct}', tokens),
    'menu-text-off': resolveReference('{Base-Colors.Common.menu-text-off}', tokens),
    'menu-on-cancel': resolveReference('{Base-Colors.Common.menu-on-cancel}', tokens),

    // Background Tokens
    'bg-default': resolveReference('{Background.bg-default}', tokens),
    'bg-surface': resolveReference('{Background.bg-surface}', tokens),
    'bg-outline': resolveReference('{Background.bg-outline}', tokens),
    'bg-surface-muted': resolveReference('{Background.bg-surface-muted}', tokens),
    'bg-innerframe': resolveReference('{Background.bg-innerframe}', tokens),
    'bg-sidebar': resolveReference('{Background.bg-sidebar}', tokens),
    'bg-topbar': resolveReference('{Background.bg-topbar}', tokens),
    'bg-header': resolveReference('{Background.header-bg}', tokens),
    'bg-body': resolveReference('{Background.body-bg}', tokens),
    'bg-body-select': resolveReference('{Background.body-bg-select}', tokens),
    'bg-body-row': resolveReference('{Background.body-bg-row}', tokens),
    'bg-red': resolveReference('{Background.bg-red}', tokens),
    'bg-blue': resolveReference('{Background.bg-blue}', tokens),

    // Divider Tokens
    divider: resolveReference('{Background.divider}', tokens),
    'divider-muted': resolveReference('{Background.divider-muted}', tokens),

    // Body Tokens
    'body-border': resolveReference('{Background.body-border}', tokens),
    'body-border-mid': resolveReference('{Background.body-border-mid}', tokens),
    'header-underline': resolveReference('{Background.header-underline}', tokens),
  };

  return semanticTokens;
}

// Typography tokens 생성
function generateTypographyTokens(tokens) {
  return {
    fontSize: {
      xs: resolveReference('{Font.Size.font-10}', tokens),
      sm: resolveReference('{Font.Size.font-12}', tokens),
      base: resolveReference('{Font.Size.font-13}', tokens),
      md: resolveReference('{Font.Size.font-14}', tokens),
      lg: resolveReference('{Font.Size.font-16}', tokens),
      xl: resolveReference('{Font.Size.font-18}', tokens),
      '2xl': resolveReference('{Font.Size.font-20}', tokens),
      '3xl': resolveReference('{Font.Size.font-24}', tokens),
      '4xl': resolveReference('{Font.Size.font-36}', tokens),
      '5xl': resolveReference('{Font.Size.font-48}', tokens),
      '6xl': resolveReference('{Font.Size.font-64}', tokens),
    },

    lineHeight: {
      none: resolveReference('{Font.lineHeights.0}', tokens),
      tight: resolveReference('{Font.lineHeights.1}', tokens),
      snug: resolveReference('{Font.lineHeights.2}', tokens),
      normal: resolveReference('{Font.lineHeights.3}', tokens),
      relaxed: resolveReference('{Font.lineHeights.4}', tokens),
      loose: resolveReference('{Font.lineHeights.5}', tokens),
      xl: resolveReference('{Font.lineHeights.6}', tokens),
      '2xl': resolveReference('{Font.lineHeights.7}', tokens),
      '3xl': resolveReference('{Font.lineHeights.8}', tokens),
    },

    letterSpacing: {
      tighter: resolveReference('{Font.letterSpacing.0}', tokens),
      tight: resolveReference('{Font.letterSpacing.1}', tokens),
      normal: resolveReference('{Font.letterSpacing.2}', tokens),
      wide: resolveReference('{Font.letterSpacing.3}', tokens),
      wider: resolveReference('{Font.letterSpacing.4}', tokens),
    },
  };
}

// Spacing tokens 생성
function generateSpacingTokens(tokens) {
  return {
    0: resolveReference('{Base-Size.size-0}', tokens),
    1: resolveReference('{Base-Size.size-4}', tokens),
    1.5: resolveReference('{Base-Size.size-6}', tokens),
    2: resolveReference('{Base-Size.size-8}', tokens),
    3: resolveReference('{Base-Size.size-12}', tokens),
    4: resolveReference('{Base-Size.size-16}', tokens),
    5: resolveReference('{Base-Size.size-20}', tokens),
    6: resolveReference('{Base-Size.size-24}', tokens),
    7: resolveReference('{Base-Size.size-30}', tokens),
    8: resolveReference('{Base-Size.size-32}', tokens),
    9: resolveReference('{Base-Size.size-36}', tokens),
    10: resolveReference('{Base-Size.size-40}', tokens),
    12: resolveReference('{Base-Size.size-48}', tokens),
    16: resolveReference('{Base-Size.size-64}', tokens),
    20: resolveReference('{Base-Size.size-100}', tokens),
    25: resolveReference('{Base-Size.size-130}', tokens),
    28: resolveReference('{Base-Size.size-140}', tokens),
    32: resolveReference('{Base-Size.size-200}', tokens),
    48: resolveReference('{Base-Size.size-300}', tokens),
  };
}

// Border radius tokens 생성
function generateBorderRadiusTokens(tokens) {
  return {
    none: resolveReference('{Radius.none}', tokens),
    xs: resolveReference('{Radius.xs}', tokens),
    sm: resolveReference('{Radius.sm}', tokens),
    md: resolveReference('{Radius.md}', tokens),
    lg: resolveReference('{Radius.lg}', tokens),
    full: resolveReference('{Radius.pill}', tokens),
    default: resolveReference('{Radius.default}', tokens),
  };
}

// Semantic tokens 생성
const semanticColors = generateSemanticTokens(tokens);
const typographyTokens = generateTypographyTokens(tokens);
const spacingTokens = generateSpacingTokens(tokens);
const borderRadiusTokens = generateBorderRadiusTokens(tokens);

// 프리셋 파일 생성
const outputPath = path.join(__dirname, '../src/presets/tailwind-preset-light.js');
const presetContent = `// Auto-generated from Figma tokens
// Last updated: ${new Date().toISOString()}

export const lightColors = ${JSON.stringify(semanticColors, null, 2)};

export const lightTypography = ${JSON.stringify(typographyTokens, null, 2)};

export const lightSpacing = ${JSON.stringify(spacingTokens, null, 2)};

export const lightBorderRadius = ${JSON.stringify(borderRadiusTokens, null, 2)};
`;

fs.writeFileSync(outputPath, presetContent);
console.log('✅ Light Semantic Tailwind 프리셋 생성 완료:', outputPath);

// Tailwind config 자동 업데이트
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
console.log('✅ Tailwind config 자동 업데이트 완료:', tailwindConfigPath);
