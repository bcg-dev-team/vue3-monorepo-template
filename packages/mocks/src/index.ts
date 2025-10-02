/**
 * MSW 모킹 시스템 진입점
 * 개발 환경에서 API 모킹을 위한 설정을 제공합니다.
 */

export { startMocking, stopMocking } from './browser.js';
export { MockWebSocket, mockWebSocketManager } from './handlers/chart/MockWebSocketHandler.js';
export { handlers } from './handlers/index.js';

// 데이터 export
export * from './data/orders.js';

// 유틸리티 함수 export
export * from './utils/symbols.js';
export { generateSymbolPrice, getSymbolPriceData } from './utils/generators/prices.js';
export * from './utils/generators/tradingview.js';

// 타입 export (MSW 전용 타입들만)
export type { ChartApiData, WebSocketMessage, Bar, OrderData } from './types/chart.js';
export * from './types/orders.js';

// 공통 타입들은 @template/types에서 import
export type { TradingSymbol, TradingViewBar, SymbolPrice } from '@template/types';
