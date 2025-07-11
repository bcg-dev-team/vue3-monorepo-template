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
  const typography: Record<string, Record<string, string>> = {
    fontSize: {},
    lineHeight: {},
    letterSpacing: {},
  };

  // Font Size
  const fontSizes = [10, 12, 13, 14, 16, 18, 20, 24, 36, 48, 64];
  fontSizes.forEach((size) => {
    const tokenName = `--font-size-font-${size}`;
    const value = getCSSVariable(tokenName);
    if (value) {
      typography.fontSize[`font-${size}`] = value;
    }
  });

  // Line Height
  for (let i = 0; i <= 8; i++) {
    const tokenName = `--font-line-heights-${i}`;
    const value = getCSSVariable(tokenName);
    if (value) {
      typography.lineHeight[`line-height-${i}`] = value;
    }
  }

  // Letter Spacing
  for (let i = 0; i <= 5; i++) {
    const tokenName = `--font-letter-spacing-${i}`;
    const value = getCSSVariable(tokenName);
    if (value) {
      typography.letterSpacing[`letter-spacing-${i}`] = value;
    }
  }

  return typography;
}

/**
 * 간격 토큰을 가져오는 함수
 * @returns 간격 토큰 객체
 */
export function getSpacingTokens() {
  const spacing: Record<string, string> = {};

  // 간격 토큰들 (실제 CSS 변수명에 맞게 조정 필요)
  const spacingValues = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256];

  spacingValues.forEach((value) => {
    const tokenName = `--spacing-${value}`;
    const cssValue = getCSSVariable(tokenName);
    if (cssValue) {
      spacing[`spacing-${value}`] = cssValue;
    } else {
      // CSS 변수가 없으면 기본값 사용
      spacing[`spacing-${value}`] = `${value}px`;
    }
  });

  return spacing;
}

/**
 * 패딩 토큰을 가져오는 함수
 * @returns 패딩 토큰 객체
 */
export function getPaddingTokens() {
  const paddings: Record<string, string> = {};
  // 패딩 토큰들 (실제 CSS 변수명에 맞게 조정)
  const paddingNames = ['64', '48', '36', '16', '24', '12', '4', '130', '8', 'z'];
  paddingNames.forEach((name) => {
    const tokenName = `--padding-padding-${name}`;
    const value = getCSSVariable(tokenName);
    if (value) {
      paddings[`padding-${name}`] = value;
    } else {
      paddings[`padding-${name}`] = name + 'px'; // fallback
    }
  });
  return paddings;
}

/**
 * 라운드(Radius) 토큰을 가져오는 함수
 * @returns 라운드 토큰 객체
 */
export function getRadiusTokens() {
  const radii: Record<string, string> = {};
  const radiusNames = ['xs', 'sm', 'md', 'lg', 'pill', 'default', 'none'];
  radiusNames.forEach((name) => {
    const tokenName = `--radius-${name}`;
    const value = getCSSVariable(tokenName);
    if (value) {
      radii[`radius-${name}`] = value;
    } else {
      radii[`radius-${name}`] = name; // fallback
    }
  });
  return radii;
}

/**
 * 모든 디자인 토큰을 가져오는 함수
 * @returns 모든 디자인 토큰 객체
 */
export function getAllDesignTokens() {
  return {
    colors: getColorTokens(),
    typography: getTypographyTokens(),
    spacing: getSpacingTokens(),
    padding: getPaddingTokens(),
    radius: getRadiusTokens(),
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
