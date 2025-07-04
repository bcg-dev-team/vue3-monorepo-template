import { ref, computed, watch, readonly } from 'vue';

/**
 * 테마 타입 정의
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * 테마 관리를 위한 composable
 *
 * @returns 테마 상태와 관련 메서드들
 */
export function useTheme() {
  const theme = ref<Theme>('system');
  const isDark = ref(false);

  /**
   * 시스템 테마 감지
   */
  const systemTheme = computed(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  /**
   * 실제 적용될 테마 계산
   */
  const currentTheme = computed(() => {
    if (theme.value === 'system') {
      return systemTheme.value;
    }
    return theme.value;
  });

  /**
   * 다크 모드 여부 계산
   */
  const isDarkMode = computed(() => currentTheme.value === 'dark');

  /**
   * 테마 변경
   * @param newTheme - 새로운 테마
   */
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    applyTheme();
  };

  /**
   * 테마를 DOM에 적용
   */
  const applyTheme = () => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const isDark = isDarkMode.value;

    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', currentTheme.value);
  };

  /**
   * 시스템 테마 변경 감지
   */
  const mediaQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  if (mediaQuery) {
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        applyTheme();
      }
    });
  }

  // 초기 테마 적용
  watch(currentTheme, applyTheme, { immediate: true });

  return {
    theme: readonly(theme),
    currentTheme: readonly(currentTheme),
    isDarkMode: readonly(isDarkMode),
    setTheme,
    applyTheme,
  };
}
