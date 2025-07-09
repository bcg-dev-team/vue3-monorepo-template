import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 전역 테마 상태 관리 스토어
 * 모든 앱에서 공유되는 테마 설정을 관리합니다.
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false);

  // localStorage에서 테마 설정 복원
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme === 'dark') {
    isDark.value = true;
  }

  /**
   * 테마를 토글합니다.
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light');
  };

  /**
   * 특정 테마로 설정합니다.
   * @param dark - 다크 테마 여부
   */
  const setTheme = (dark: boolean) => {
    isDark.value = dark;
    localStorage.setItem('theme-mode', dark ? 'dark' : 'light');
  };

  /**
   * 시스템 테마를 감지하여 설정합니다.
   */
  const setSystemTheme = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark.value = mediaQuery.matches;
      localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light');
    }
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
    setSystemTheme,
  };
});
