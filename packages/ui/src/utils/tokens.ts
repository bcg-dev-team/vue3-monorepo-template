// style-dictionary로 생성된 토큰을 ES 모듈로 import
import * as lightTokens from '../styles/_tokens-light';
import * as darkTokens from '../styles/_tokens-dark';

/**
 * 디자인 토큰 값을 가져오는 유틸리티 함수
 */
export const getToken = (path: string, theme: 'light' | 'dark' = 'light'): string => {
  const keys = path.split('.');
  const tokens = theme === 'dark' ? darkTokens : lightTokens;
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
export const getColor = (colorPath: string, theme: 'light' | 'dark' = 'light'): string => {
  return getToken(`color.${colorPath}`, theme);
};

/**
 * 간격 토큰 가져오기
 */
export const getSpacing = (spacingPath: string, theme: 'light' | 'dark' = 'light'): string => {
  return getToken(`spacing.${spacingPath}`, theme);
};

/**
 * 타이포그래피 토큰 가져오기
 */
export const getTypography = (
  typographyPath: string,
  theme: 'light' | 'dark' = 'light'
): string => {
  return getToken(`typography.${typographyPath}`, theme);
};

/**
 * 그림자 토큰 가져오기
 */
export const getShadow = (shadowPath: string, theme: 'light' | 'dark' = 'light'): string => {
  return getToken(`shadow.${shadowPath}`, theme);
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
export { lightTokens, darkTokens };
