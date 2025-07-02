// Vue UI 컴포넌트들을 export
export * from './components';
export * from './composables';
export * from './types';

// 디자인 토큰 유틸리티 export
export * from './utils/tokens';

// 스타일 import
import './style.css';

// 기본 설치 함수
import type { App } from 'vue';

/**
 * UI 라이브러리 설치 함수
 * @param app - Vue 앱 인스턴스
 */
export function install(app: App): void {
  // 컴포넌트들을 전역으로 등록
  // TODO: 컴포넌트 등록 로직 추가
}

export default {
  install,
};
