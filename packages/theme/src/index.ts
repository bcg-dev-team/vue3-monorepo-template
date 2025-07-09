/**
 * @template/theme - 공유 테마 관리 패키지
 *
 * 이 패키지는 모노레포의 모든 앱에서 공유되는 테마 관리 기능을 제공합니다.
 *
 * @example
 * ```typescript
 * import { useTheme, useThemeStore } from '@template/theme';
 *
 * // 컴포저블 사용
 * const { isDark, toggleTheme } = useTheme();
 *
 * // 스토어 직접 사용
 * const themeStore = useThemeStore();
 * themeStore.toggleTheme();
 * ```
 */

// 기본 내보내기
export { useTheme as default } from './composables';

// 테마 관련 export
export * from './composables';
export * from './store';
export * from './naive/createNaiveTheme';
export * from './utils';

// CSS 파일들 export (타입스크립트에서 CSS import를 위한 더미 export)
export const tokensLightCSS = '';
export const tokensDarkCSS = '';
