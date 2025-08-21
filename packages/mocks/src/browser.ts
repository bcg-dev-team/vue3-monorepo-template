/**
 * MSW 브라우저 환경 설정
 */

import { chartHandlers } from './handlers/chart.js';
import { mockConfig } from './config/index.js';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...chartHandlers);

/**
 * 모킹 시작
 */
export const startMocking = async (): Promise<void> => {
  if (mockConfig.enabled) {
    try {
      await worker.start({
        onUnhandledRequest: mockConfig.onUnhandledRequest,
      });
      console.log('🔧 MSW 모킹이 활성화되었습니다.');
    } catch (error) {
      console.error('모킹 시작 중 오류 발생:', error);
    }
  }
};

/**
 * 모킹 중지
 */
export const stopMocking = async (): Promise<void> => {
  try {
    worker.stop();
    console.log('✅ MSW 모킹이 비활성화되었습니다.');
  } catch (error) {
    console.error('모킹 중지 중 오류 발생:', error);
  }
};
