import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { configure } from 'vee-validate';
import { NConfigProvider } from 'naive-ui';
import { useTheme } from '@template/theme';

import Datafeed from './chart/datafeed.js';
import App from './App.vue';
import router from './router';

// MSW 초기화
import { startMSW } from './mocks/browser';

// LocatorJS 설정 (개발 환경에서만)
import setupLocatorUI from '@locator/runtime';

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI({
    adapter: 'vue',
  });
}

// 스타일
import './style.css';

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

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
    const { currentTheme, themeOverrides } = useTheme();

    return () =>
      h(
        NConfigProvider,
        {
          theme: currentTheme.value,
          themeOverrides: themeOverrides.value,
        },
        { default: () => h(App) }
      );
  },
});

// 플러그인 등록
app.use(pinia);
app.use(router);

// MSW 시작 후 앱 마운트
async function startApp() {
  // 개발 환경에서 MSW 시작
  await startMSW();

  // 앱 마운트
  app.mount('#app');
}

startApp();
