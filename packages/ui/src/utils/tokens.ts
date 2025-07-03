// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens = require('../styles/tokens.js');

/**
 * 디자인 토큰 값을 가져오는 유틸리티 함수
 */
export const getToken = (path: string): string => {
  const keys = path.split('.');
  let value: any = tokens;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Token not found: ${path}`);
      return '';
    }
  }

  return value?.value || '';
};

/**
 * 색상 토큰 가져오기
 */
export const getColor = (colorPath: string): string => {
  return getToken(`color.${colorPath}`);
};

/**
 * 간격 토큰 가져오기
 */
export const getSpacing = (spacingPath: string): string => {
  return getToken(`spacing.${spacingPath}`);
};

/**
 * 타이포그래피 토큰 가져오기
 */
export const getTypography = (typographyPath: string): string => {
  return getToken(`typography.${typographyPath}`);
};

/**
 * 그림자 토큰 가져오기
 */
export const getShadow = (shadowPath: string): string => {
  return getToken(`shadow.${shadowPath}`);
};

/**
 * CSS 변수명 생성
 */
export const getCSSVariable = (path: string): string => {
  const keys = path.split('.');
  return `--${keys.join('-')}`;
};

/**
 * 모든 토큰 객체 내보내기
 */
export { tokens };
