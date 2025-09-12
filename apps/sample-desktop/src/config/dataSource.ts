/**
 * 데이터 소스 설정
 * 개발자가 Mock 데이터와 실제 웹소켓 중 선택할 수 있습니다.
 */

// 🎯 데이터 소스 선택 (개발자 설정)
// true: 실제 웹소켓 사용 (ws://172.25.1.24:9999/ws)
// false: MSW 모킹 데이터 사용 (기본값)
export const USE_REAL_WEBSOCKET = false;

// 🎯 실제 웹소켓 서버 설정
export const WEBSOCKET_CONFIG = {
  url: 'ws://172.25.1.24:9999/ws',
  reconnectAttempts: 5,
  reconnectDelay: 1000, // 1초
  heartbeatInterval: 30000, // 30초
} as const;

// 🎯 개발 모드 설정
export const DEV_CONFIG = {
  enableLogging: true,
  showConnectionStatus: true,
  mockDataDelay: 100, // MSW 데이터 생성 간격 (ms)
} as const;

// 🎯 환경별 설정
export const getDataSourceConfig = () => {
  // 환경 변수에서 설정을 읽어올 수도 있습니다 (Vite 환경)
  const envUseRealWebSocket = (import.meta as any).env.VITE_USE_REAL_WEBSOCKET === 'true';

  return {
    useRealWebSocket: envUseRealWebSocket || USE_REAL_WEBSOCKET,
    websocket: WEBSOCKET_CONFIG,
    dev: DEV_CONFIG,
  };
};
