import { ref, computed, watch, readonly, type Ref } from 'vue';
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui';
import { lightThemeOverrides, darkThemeOverrides } from '../themes';

/**
 * 테마 타입 정의
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface Theme {
  themeMode: Readonly<Ref<ThemeMode>>;
  currentTheme: Readonly<Ref<any>>;
  themeOverrides: Readonly<Ref<GlobalThemeOverrides>>;
  isSystemDark: Readonly<Ref<boolean>>;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  updateHtmlClass: () => void;
}

/**
 * Naive UI 테마 관리 컴포저블
 */
export function useTheme(): Theme {
  const themeMode = ref<ThemeMode>('light');
  const isSystemDark = ref(false);

  const currentTheme = computed(() => {
    if (themeMode.value === 'auto') {
      return isSystemDark.value ? darkTheme : lightTheme;
    }
    return themeMode.value === 'dark' ? darkTheme : lightTheme;
  });

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (themeMode.value === 'auto') {
      return isSystemDark.value ? darkThemeOverrides : lightThemeOverrides;
    }
    return themeMode.value === 'dark' ? darkThemeOverrides : lightThemeOverrides;
  });

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
    }
    updateHtmlClass();
  };

  const updateHtmlClass = () => {
    if (typeof document === 'undefined') return;

    const html = window.document.documentElement;
    const isDark = currentTheme.value === darkTheme;
    const newTheme = isDark ? 'dark' : 'light';

    console.log('[useTheme] updateHtmlClass:', {
      currentTheme: currentTheme.value,
      isDark,
      newTheme,
      currentDataTheme: html.getAttribute('data-theme'),
    });

    html.setAttribute('data-theme', newTheme);

    console.log('[useTheme] after update:', {
      newDataTheme: html.getAttribute('data-theme'),
    });
  };

  const detectSystemTheme = () => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isSystemDark.value = mediaQuery.matches;
    mediaQuery.addEventListener('change', (e) => {
      isSystemDark.value = e.matches;
    });
  };

  const restoreThemeMode = () => {
    if (typeof window === 'undefined') return;
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      themeMode.value = savedMode;
    }
  };

  const toggleTheme = () => {
    const newMode = currentTheme.value === lightTheme ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  watch(
    () => isSystemDark.value,
    () => {
      if (themeMode.value === 'auto') {
        updateHtmlClass();
      }
    }
  );

  watch(
    () => themeMode.value,
    () => {
      updateHtmlClass();
    }
  );

  if (typeof window !== 'undefined') {
    detectSystemTheme();
    restoreThemeMode();
    updateHtmlClass();
  }

  return {
    themeMode: readonly(themeMode),
    currentTheme: readonly(currentTheme),
    themeOverrides: readonly(themeOverrides),
    isSystemDark: readonly(isSystemDark),
    setThemeMode,
    toggleTheme,
    updateHtmlClass,
  };
}

let globalThemeInstance: Theme | null = null;

export function useGlobalTheme(): Theme {
  if (!globalThemeInstance) {
    globalThemeInstance = useTheme();
  }
  return globalThemeInstance;
}
