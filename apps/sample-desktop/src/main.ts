import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import '@/assets/scss/index.scss';

import setupLocatorUI from '@locator/runtime';

// MSW 모킹 시작 (개발 환경)
import { startMocking } from '@template/mocks';

if ((import.meta as any).env.MODE === 'development') {
  setupLocatorUI({
    adapter: 'vue',
  });

  // MSW 모킹 시작 (HTTP + WebSocket 통합)
  startMocking();
}

// Theme 패키지 import (CSS 변수 포함)
import '@template/theme';

// UI 패키지 import (스타일 포함)
import '@template/ui/style.css';
import '@template/ui';

// 전역 스타일
import './style.css';

// TradingView 차트 선언
declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

// 테마 초기화
import { useTheme } from '@template/theme';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 앱 마운트 전에 테마 초기화
const theme = useTheme();
theme.updateHtmlClass();

app.mount('#app');
