import { type Ref } from 'vue';
/**
 * 테마 타입 정의
 */
export type ThemeMode = 'light' | 'dark' | 'auto';
/**
 * 테마 컴포저블 반환 타입
 */
export interface ThemeComposable {
    isDark: Ref<boolean>;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;
    setSystemTheme: () => void;
    updateHtmlClass: () => void;
}
/**
 * 전역 테마 관리 컴포저블
 * 모든 앱에서 공유되는 테마 로직을 제공합니다.
 */
export declare function useTheme(): ThemeComposable;
/**
 * 전역 테마 컴포저블 (싱글톤 패턴)
 * 앱 전체에서 동일한 테마 인스턴스를 공유합니다.
 */
export declare function useGlobalTheme(): ThemeComposable;
//# sourceMappingURL=composables.d.ts.map