/**
 * 데이터 소스 설정
 * 개발자가 Mock 데이터와 실제 웹소켓 중 선택할 수 있습니다.
 */

/**
 * 데이터 소스 선택 (개발자 설정)
 * true: 웹소켓 사용 (ws://172.25.1.24:9999/ws)
 * false: MSW 모킹 데이터 사용
 */
export const USE_WEBSOCKET = false;

/**
 * 웹소켓 서버 설정
 */
export const WEBSOCKET_CONFIG = {
  url: 'ws://172.25.1.24:9999/ws',
  reconnectAttempts: 5,
  /**
   * 재연결 지연 시간 (ms)
   */
  reconnectDelay: 1000, // 1s
  /**
   * 하트비트 간격 (ms)
   */
  heartbeatInterval: 30000, // 30s
} as const;

/**
 * 환경별 설정
 */
export const getDataSourceConfig = () => {
  const envUseWebSocket = (import.meta as any).env.VITE_USE_WEBSOCKET === 'true';

  return {
    useWebSocket: envUseWebSocket || USE_WEBSOCKET,
    websocket: WEBSOCKET_CONFIG,
  };
};
