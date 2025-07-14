/**
 * CSS 변수에서 디자인 토큰을 동적으로 읽어오는 유틸리티 함수들
 */

/**
 * CSS 변수 값을 가져오는 함수
 * @param variableName - CSS 변수명 (예: --base-colors-primary-primary800)
 * @returns CSS 변수 값
 */
export function getCSSVariable(variableName: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * 공통 색상(common) 토큰을 가져오는 함수
 * @returns common 색상 토큰 객체
 */
function getCommonColorTokens() {
  const common: Record<string, string> = {};
  const style = getComputedStyle(
    typeof window !== 'undefined' ? document.documentElement : ({} as HTMLElement)
  );
  for (const key in style) {
    if (typeof key === 'string' && key.startsWith('--base-colors-common-')) {
      const value = style.getPropertyValue(key).trim();
      if (value) {
        const name = key.replace('--base-colors-common-', '');
        common[name] = value;
      }
    }
  }
  return common;
}

/**
 * 색상 토큰을 그룹별로 가져오는 함수
 * @returns 색상 토큰 객체
 */
export function getColorTokens() {
  const colors: Record<string, Record<string, string>> = {
    primary: {},
    neutral: {},
    green: {},
    red: {},
    blue: {},
    purple: {},
    common: getCommonColorTokens(),
  };

  // Primary 색상 (실제 CSS 변수명 확인)
  const primaryTokens = [
    '--base-colors-primary-primary800',
    '--base-colors-primary-primary700',
    '--base-colors-primary-primary600',
    '--base-colors-primary-primary500',
    '--base-colors-primary-primary400',
    '--base-colors-primary-primary300',
    '--base-colors-primary-primary200',
    '--base-colors-primary-primary100',
    '--base-colors-primary-primary050',
    '--base-colors-primary-primary-deep',
  ];

  primaryTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-primary-', '');
      colors.primary[key] = value;
    }
  });

  // Neutral 색상
  const neutralTokens = [
    '--base-colors-neutral-neutral800',
    '--base-colors-neutral-neutral700',
    '--base-colors-neutral-neutral600',
    '--base-colors-neutral-neutral500',
    '--base-colors-neutral-neutral400',
    '--base-colors-neutral-neutral300',
    '--base-colors-neutral-neutral200',
    '--base-colors-neutral-neutral100',
    '--base-colors-neutral-neutral000',
    '--base-colors-neutral-neutral750',
    '--base-colors-neutral-neutral250',
    '--base-colors-neutral-neutral150',
    '--base-colors-neutral-neutral550',
    '--base-colors-neutral-neutral050',
  ];

  neutralTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-neutral-', '');
      colors.neutral[key] = value;
    }
  });

  // Green 색상
  const greenTokens = [
    '--base-colors-green-green100',
    '--base-colors-green-green200',
    '--base-colors-green-green300',
    '--base-colors-green-green400',
    '--base-colors-green-green600',
    '--base-colors-green-green700',
    '--base-colors-green-green500',
    '--base-colors-green-green800',
    '--base-colors-green-green050',
  ];

  greenTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-green-', '');
      colors.green[key] = value;
    }
  });

  // Red 색상
  const redTokens = [
    '--base-colors-red-red800',
    '--base-colors-red-red700',
    '--base-colors-red-red600',
    '--base-colors-red-red500',
    '--base-colors-red-red400',
    '--base-colors-red-red300',
    '--base-colors-red-red200',
    '--base-colors-red-red100',
    '--base-colors-red-red050',
  ];

  redTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-red-', '');
      colors.red[key] = value;
    }
  });

  // Blue 색상
  const blueTokens = [
    '--base-colors-blue-blue800',
    '--base-colors-blue-blue700',
    '--base-colors-blue-blue600',
    '--base-colors-blue-blue500',
    '--base-colors-blue-blue400',
    '--base-colors-blue-blue300',
    '--base-colors-blue-blue200',
    '--base-colors-blue-blue100',
    '--base-colors-blue-blue050',
  ];

  blueTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-blue-', '');
      colors.blue[key] = value;
    }
  });

  // Purple 색상
  const purpleTokens = [
    '--base-colors-purple-purple800',
    '--base-colors-purple-purple700',
    '--base-colors-purple-purple600',
    '--base-colors-purple-purple500',
    '--base-colors-purple-purple400',
    '--base-colors-purple-purple300',
    '--base-colors-purple-purple200',
    '--base-colors-purple-purple100',
    '--base-colors-purple-purple050',
  ];

  purpleTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-purple-', '');
      colors.purple[key] = value;
    }
  });

  return colors;
}

/**
 * 타이포그래피 토큰을 가져오는 함수
 * @returns 타이포그래피 토큰 객체
 */
export function getTypographyTokens() {
  return {
    fontSize: {
      'font-10': tokens.fontSizeFont10,
      'font-12': tokens.fontSizeFont12,
      'font-13': tokens.fontSizeFont13,
      'font-14': tokens.fontSizeFont14,
      'font-16': tokens.fontSizeFont16,
      'font-18': tokens.fontSizeFont18,
      'font-20': tokens.fontSizeFont20,
      'font-24': tokens.fontSizeFont24,
      'font-36': tokens.fontSizeFont36,
      'font-48': tokens.fontSizeFont48,
      'font-64': tokens.fontSizeFont64,
    },
    lineHeight: {
      'line-height-0': tokens.fontLineHeights0,
      'line-height-1': tokens.fontLineHeights1,
      'line-height-2': tokens.fontLineHeights2,
      'line-height-3': tokens.fontLineHeights3,
      'line-height-4': tokens.fontLineHeights4,
      'line-height-5': tokens.fontLineHeights5,
      'line-height-6': tokens.fontLineHeights6,
      'line-height-7': tokens.fontLineHeights7,
      'line-height-8': tokens.fontLineHeights8,
    },
    letterSpacing: {
      'letter-spacing-0': tokens.fontLetterSpacing0,
      'letter-spacing-1': tokens.fontLetterSpacing1,
      'letter-spacing-2': tokens.fontLetterSpacing2,
      'letter-spacing-3': tokens.fontLetterSpacing3,
      'letter-spacing-4': tokens.fontLetterSpacing4,
      'letter-spacing-5': tokens.fontLetterSpacing5,
    },
  };
}

/**
 * 간격 토큰을 가져오는 함수
 * @returns 간격 토큰 객체
 */
export function getSpacingTokens() {
  return {
    'spacing-4': tokens.baseSizeSize4,
    'spacing-6': tokens.baseSizeSize6,
    'spacing-8': tokens.baseSizeSize8,
    'spacing-10': tokens.baseSizeSize10,
    'spacing-12': tokens.baseSizeSize12,
    'spacing-13': tokens.baseSizeSize13,
    'spacing-14': tokens.baseSizeSize14,
    'spacing-16': tokens.baseSizeSize16,
    'spacing-18': tokens.baseSizeSize18,
    'spacing-20': tokens.baseSizeSize20,
    'spacing-24': tokens.baseSizeSize24,
    'spacing-36': tokens.baseSizeSize36,
    'spacing-40': tokens.baseSizeSize40,
    'spacing-48': tokens.baseSizeSize48,
    'spacing-50': tokens.baseSizeSize50,
    'spacing-64': tokens.baseSizeSize64,
    'spacing-100': tokens.baseSizeSize100,
    'spacing-130': tokens.baseSizeSize130,
    'spacing-140': tokens.baseSizeSize140,
    'spacing-200': tokens.baseSizeSize200,
    'spacing-300': tokens.baseSizeSize300,
  };
}

/**
 * 패딩 토큰을 가져오는 함수
 * @returns 패딩 토큰 객체
 */
export function getPaddingTokens() {
  return {
    'padding-4': tokens.paddingPadding4,
    'padding-8': tokens.paddingPadding8,
    'padding-12': tokens.paddingPadding12,
    'padding-16': tokens.paddingPadding16,
    'padding-24': tokens.paddingPadding24,
    'padding-36': tokens.paddingPadding36,
    'padding-48': tokens.paddingPadding48,
    'padding-64': tokens.paddingPadding64,
    'padding-130': tokens.paddingPadding130,
    'padding-z': tokens.paddingPaddingZ,
  };
}

/**
 * 라운드(Radius) 토큰을 가져오는 함수
 * @returns 라운드 토큰 객체
 */
export function getRadiusTokens() {
  return {
    'radius-xs': tokens.radiusXs,
    'radius-sm': tokens.radiusSm,
    'radius-md': tokens.radiusMd,
    'radius-lg': tokens.radiusLg,
    'radius-pill': tokens.radiusPill,
    'radius-default': tokens.radiusDefault,
    'radius-none': tokens.radiusNone,
  };
}

/**
 * 카테고리별 토큰 getter 생성기
 * @param {string} prefix - CSS 변수 prefix (예: '--button-')
 * @param {string} groupName - 반환 객체의 그룹명
 */
function getCategoryTokens(prefix: string, groupName: string) {
  const group: Record<string, string> = {};
  const style = getComputedStyle(
    typeof window !== 'undefined' ? document.documentElement : ({} as HTMLElement)
  );
  for (const key in style) {
    if (typeof key === 'string' && key.startsWith(prefix)) {
      const value = style.getPropertyValue(key).trim();
      if (value) {
        const name = key.replace(prefix, '');
        group[name] = value;
      }
    }
  }
  return group;
}

import * as tokens from '../styles/_tokens-light';
/**
 * Button 디자인 토큰 반환 (Figma 1:1 매핑)
 * @returns 버튼 관련 디자인 토큰 객체
 */
export function getButtonTokens() {
  return {
    'primary-background': tokens.buttonPrimaryBackground,
    'primary-text': tokens.buttonPrimaryText,
    'primary-border': tokens.buttonPrimaryBorder,
    'disabled-background': tokens.buttonDisabledBackground,
    'disabled-text': tokens.buttonDisabledText,
    'disabled-border': tokens.buttonDisabledBorder,
    'outline-background': tokens.buttonOutlineBackground,
    'outline-text': tokens.buttonOutlineText,
    'outline-border': tokens.buttonOutlineBorder,
    'red-background': tokens.buttonRedBackground,
    'red-text': tokens.buttonRedText,
    'red-border': tokens.buttonRedBorder,
    'blue-background': tokens.buttonBlueSolidBackground,
    'blue-text': tokens.buttonBlueSolidText,
    'blue-border': tokens.buttonBlueSolidBorder,
    'blue-solid-hover': tokens.buttonBlueSolidHover,
    'light-solid-background': tokens.buttonLightSolidBackground,
    'light-solid-text': tokens.buttonLightSolidText,
    'light-solid-border': tokens.buttonLightSolidBorder,
    'red-solid-background': tokens.buttonRedSolidBackground,
    'red-solid-text': tokens.buttonRedSolidText,
    'red-solid-border': tokens.buttonRedSolidBorder,
    'red-solid-hover': tokens.buttonRedSolidHover,
    // TODO: pill 관련 토큰이 Figma에 정의되면 교체 필요
    'pill-background': tokens.buttonPrimaryBackground, // 임시
    'pill-text': tokens.buttonPrimaryText, // 임시
    'pill-border': tokens.buttonPrimaryBorder, // 임시
    'pill-hover-background': tokens.buttonPrimaryBackground, // 임시
  };
}
export function getInputTokens() {
  return getCategoryTokens('--input-', 'input');
}
export function getBackgroundTokens() {
  return getCategoryTokens('--background-', 'background');
}
export function getFontTokens() {
  return getCategoryTokens('--font-', 'font');
}
export function getTradeTokens() {
  return getCategoryTokens('--trade-', 'trade');
}
export function getTableTokens() {
  return getCategoryTokens('--table-', 'table');
}
export function getPopupTokens() {
  return getCategoryTokens('--popup-', 'popup');
}
export function getNavTokens() {
  return getCategoryTokens('--nav-', 'nav');
}
export function getSidebarTokens() {
  return getCategoryTokens('--sidebar-', 'sidebar');
}

/**
 * 모든 디자인 토큰을 가져오는 함수
 * @returns 모든 디자인 토큰 객체
 */
export function getAllDesignTokens() {
  return {
    colors: getColorTokens(),
    button: getButtonTokens(),
    input: getInputTokens(),
    background: getBackgroundTokens(),
    font: getFontTokens(),
    trade: getTradeTokens(),
    table: getTableTokens(),
    popup: getPopupTokens(),
    nav: getNavTokens(),
    sidebar: getSidebarTokens(),
    radius: getRadiusTokens(),
    padding: getPaddingTokens(),
    typography: getTypographyTokens(),
    spacing: getSpacingTokens(),
  };
}

/**
 * 토큰 이름을 사용자 친화적으로 변환하는 함수
 * @param tokenName - 토큰 이름
 * @returns 사용자 친화적인 이름
 */
export function formatTokenName(tokenName: string): string {
  return tokenName
    .replace(/^--/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
