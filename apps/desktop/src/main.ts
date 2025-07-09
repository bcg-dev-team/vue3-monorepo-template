import { createApp, h, computed, watch } from 'vue';
import { createPinia } from 'pinia';
import { configure } from 'vee-validate';
import { NConfigProvider, lightTheme, darkTheme } from 'naive-ui';
import { lightThemeOverrides, darkThemeOverrides } from '@template/ui';
import { useThemeStore } from './stores/theme';
import App from './App.vue';
import router from './router';

// LocatorJS 설정 (개발 환경에서만)
import setupLocatorUI from '@locator/runtime';

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI({
    adapter: 'vue',
  });
}

// 스타일
import './style.css';

// Vee-Validate 설정
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

// Pinia 인스턴스 생성
const pinia = createPinia();

// Naive UI ConfigProvider로 앱을 래핑
const app = createApp({
  setup() {
    const themeStore = useThemeStore();

    const currentTheme = computed(() => (themeStore.isDark ? darkTheme : lightTheme));

    const currentThemeOverrides = computed(() =>
      themeStore.isDark ? darkThemeOverrides : lightThemeOverrides
    );

    // 테마 변경 시 HTML 요소에 data-theme 속성 추가
    watch(
      () => themeStore.isDark,
      (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      },
      { immediate: true }
    );

    return () =>
      h(
        NConfigProvider,
        {
          theme: currentTheme.value,
          themeOverrides: currentThemeOverrides.value,
        },
        { default: () => h(App) }
      );
  },
});

// 플러그인 등록
app.use(pinia);
app.use(router);

app.mount('#app');
