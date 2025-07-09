import { computed, watch, type Ref } from 'vue';
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui';
import { useThemeStore } from './store';

// UI 패키지에서 테마 오버라이드를 가져오는 대신 직접 정의
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#ffc300',
    primaryColorHover: '#ffd91d',
    primaryColorPressed: '#ffaa00',
    baseColor: '#ffffff',
    textColorBase: '#131313',
    bodyColor: '#ffffff',
  },
  Button: {
    colorPrimary: '#ffc300',
    colorPrimaryHover: '#ffd91d',
    colorPrimaryPressed: '#ffaa00',
    textColorPrimary: '#131313',
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#ffc800',
    primaryColorHover: '#e1bc02',
    primaryColorPressed: '#c2a305',
    baseColor: '#131313',
    textColorBase: '#ffffff',
    bodyColor: '#131313',
  },
  Button: {
    colorPrimary: '#ffc800',
    colorPrimaryHover: '#e1bc02',
    colorPrimaryPressed: '#c2a305',
    textColorPrimary: '#131313',
  },
};

/**
 * 테마 타입 정의
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 테마 컴포저블 반환 타입
 */
export interface ThemeComposable {
  isDark: Ref<boolean>;
  currentTheme: Ref<any>;
  themeOverrides: Ref<GlobalThemeOverrides>;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
  setSystemTheme: () => void;
  updateHtmlClass: () => void;
}

/**
 * 전역 테마 관리 컴포저블
 * 모든 앱에서 공유되는 테마 로직을 제공합니다.
 */
export function useTheme(): ThemeComposable {
  const themeStore = useThemeStore();

  const currentTheme = computed(() => (themeStore.isDark ? darkTheme : lightTheme));

  const themeOverrides = computed<GlobalThemeOverrides>(() =>
    themeStore.isDark ? darkThemeOverrides : lightThemeOverrides
  );

  /**
   * HTML 요소에 data-theme 속성을 설정합니다.
   */
  const updateHtmlClass = () => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light');
  };

  // 테마 변경 시 HTML 클래스 업데이트
  watch(
    () => themeStore.isDark,
    () => {
      updateHtmlClass();
    },
    { immediate: true }
  );

  return {
    isDark: computed(() => themeStore.isDark),
    currentTheme,
    themeOverrides,
    toggleTheme: themeStore.toggleTheme,
    setTheme: themeStore.setTheme,
    setSystemTheme: themeStore.setSystemTheme,
    updateHtmlClass,
  };
}

/**
 * 전역 테마 인스턴스 (싱글톤)
 */
let globalThemeInstance: ThemeComposable | null = null;

/**
 * 전역 테마 컴포저블 (싱글톤 패턴)
 * 앱 전체에서 동일한 테마 인스턴스를 공유합니다.
 */
export function useGlobalTheme(): ThemeComposable {
  if (!globalThemeInstance) {
    globalThemeInstance = useTheme();
  }
  return globalThemeInstance;
}
