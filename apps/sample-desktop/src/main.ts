import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import '@/assets/scss/index.scss';

import setupLocatorUI from '@locator/runtime';

// MSW 모킹 시작 (개발 환경)
import { getDataSourceConfig } from './config/dataSource';
import { startMocking } from '@template/mocks';

if ((import.meta as any).env.DEV) {
  setupLocatorUI({
    adapter: 'vue',
  });

  // 데이터 소스 설정에 따라 MSW 시작 여부 결정
  const config = getDataSourceConfig();
  if (!config.useWebSocket) {
    // Mock 데이터 사용 시에만 MSW 시작
    startMocking();
  } else {
    console.log('[Main] 실제 웹소켓 사용 - MSW 비활성화');
  }
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

// Manager Factory 초기화
import { initializeManagers } from './services/managers';

async function initializeApp() {
  try {
    // Manager들 초기화
    await initializeManagers();
    console.log('[Main] Manager 초기화 완료');
  } catch (error) {
    console.error('[Main] Manager 초기화 실패:', error);
  }

  app.mount('#app');
}

initializeApp();
