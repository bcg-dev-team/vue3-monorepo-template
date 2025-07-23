import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * 브라우저 환경에서 MSW 설정
 * Service Worker를 사용하여 네트워크 요청을 가로채고 모킹합니다.
 */
export const worker = setupWorker(...handlers);

/**
 * MSW 시작 함수
 * 개발 환경에서만 실행되도록 설정
 */
export const startMSW = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await worker.start({
        onUnhandledRequest: 'warn', // 처리되지 않은 요청에 대해 경고 표시
      });
      console.log('🔧 MSW가 활성화되었습니다.');
    } catch (error) {
      console.error('MSW 시작 중 오류 발생:', error);
    }
  }
};
