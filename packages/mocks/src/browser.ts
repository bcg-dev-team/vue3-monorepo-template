/**
 * MSW 브라우저 워커 설정
 * 브라우저 환경에서 네트워크 요청을 가로채기 위한 Service Worker 설정
 */

import { MockWebSocket, mockWebSocketManager } from './handlers/chart/websocket.js';
import { chartHttpHandlers } from './handlers/chart/http.js';
import { setupWorker } from 'msw/browser';
import { logger } from '@template/utils';

// MSW Browser 전용 로거 생성
const mswLogger = logger.createComponentLogger('MSW-Browser');

/**
 * MSW 워커 인스턴스 생성
 * 모든 핸들러를 등록하여 API 요청을 모킹합니다.
 */
export const worker = setupWorker(...chartHttpHandlers);

/**
 * WebSocket 모킹 시작
 */
function startWebSocketMocking(): void {
  if (typeof window !== 'undefined' && (import.meta as any).env.DEV) {
    mswLogger.info('WebSocket Mocking 시작');

    (window as any).OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = MockWebSocket;

    mswLogger.info('🔧 WebSocket이 모킹되었습니다.');
  }
}

/**
 * WebSocket 모킹 중지
 */
function stopWebSocketMocking(): void {
  if (typeof window !== 'undefined' && (window as any).OriginalWebSocket) {
    mswLogger.info('WebSocket Mocking 중지');

    window.WebSocket = (window as any).OriginalWebSocket;
    delete (window as any).OriginalWebSocket;

    mockWebSocketManager.cleanup();

    mswLogger.info('🔧 WebSocket 모킹이 중지되었습니다.');
  }
}

/**
 * 통합 모킹 시작 함수
 * HTTP + WebSocket 모킹을 모두 활성화합니다.
 */
export const startMocking = async (): Promise<void> => {
  if ((import.meta as any).env.DEV) {
    try {
      // HTTP 모킹 시작 (MSW Service Worker)
      await worker.start({
        onUnhandledRequest: 'warn', // 처리되지 않은 요청에 대해 경고 표시
      });
      mswLogger.info('🔧 MSW HTTP 모킹이 활성화되었습니다.');

      // WebSocket 모킹 시작
      startWebSocketMocking();

      mswLogger.info('✅ 모든 모킹 시스템이 활성화되었습니다.');
    } catch (error) {
      mswLogger.error('모킹 시작 중 오류 발생', { error });
    }
  }
};

/**
 * 통합 모킹 중지 함수
 * HTTP + WebSocket 모킹을 모두 비활성화합니다.
 */
export const stopMocking = async (): Promise<void> => {
  try {
    // WebSocket 모킹 중지
    stopWebSocketMocking();

    // HTTP 모킹 중지 (MSW Service Worker)
    worker.stop();

    mswLogger.info('✅ 모든 모킹 시스템이 비활성화되었습니다.');
  } catch (error) {
    mswLogger.error('모킹 중지 중 오류 발생', { error });
  }
};
