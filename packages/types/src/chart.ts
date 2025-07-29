/**
 * 차트 데이터 포인트 타입
 */
export interface ChartDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

/**
 * 호가 데이터 타입
 */
export interface OrderBookEntry {
  price: number;
  size: number;
}

/**
 * 호가창 데이터 타입
 */
export interface OrderBookData {
  symbol: string;
  timestamp: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

/**
 * 차트 설정 타입
 */
export interface ChartConfig {
  symbol: string;
  interval: string;
  theme: 'light' | 'dark';
  locale: string;
  timezone: string;
  throttleInterval?: number;
}

/**
 * WebSocket 메시지 타입
 */
export interface WebSocketMessage<T = unknown> {
  type: string;
  data: T;
  timestamp?: number;
}

/**
 * 실시간 데이터 관리자 설정
 */
export interface RealtimeConfig {
  wsUrl: string;
  symbol: string;
  throttleMs?: number;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}
