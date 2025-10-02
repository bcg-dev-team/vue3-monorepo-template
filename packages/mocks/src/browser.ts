/**
 * MSW 브라우저 워커 설정
 * WebSocket 모킹만 사용
 */

import { MockWebSocket, mockWebSocketManager } from './handlers/chart/MockWebSocketHandler.js';

/**
 * WebSocket 모킹 시작
 */
function startWebSocketMocking(): void {
  if (typeof window !== 'undefined' && (import.meta as any).env.DEV) {
    console.log('[WebSocket Mocking] 시작');

    (window as any).OriginalWebSocket = window.WebSocket;
    (window as any).WebSocket = MockWebSocket;

    console.log('🔧 WebSocket이 모킹되었습니다.');
  }
}

/**
 * WebSocket 모킹 중지
 */
function stopWebSocketMocking(): void {
  if (typeof window !== 'undefined' && (window as any).OriginalWebSocket) {
    console.log('[WebSocket Mocking] 중지');

    window.WebSocket = (window as any).OriginalWebSocket;
    delete (window as any).OriginalWebSocket;

    mockWebSocketManager.cleanup();

    console.log('🔧 WebSocket 모킹이 중지되었습니다.');
  }
}

/**
 * WebSocket 모킹 시작 함수
 */
export const startMocking = async (): Promise<void> => {
  if ((import.meta as any).env.DEV) {
    try {
      // WebSocket 모킹 시작
      startWebSocketMocking();

      console.log('✅ WebSocket 모킹 시스템이 활성화되었습니다.');
    } catch (error) {
      console.error('모킹 시작 중 오류 발생:', error);
    }
  }
};

/**
 * WebSocket 모킹 중지 함수
 */
export const stopMocking = async (): Promise<void> => {
  try {
    // WebSocket 모킹 중지
    stopWebSocketMocking();

    console.log('✅ WebSocket 모킹 시스템이 비활성화되었습니다.');
  } catch (error) {
    console.error('모킹 중지 중 오류 발생:', error);
  }
};
