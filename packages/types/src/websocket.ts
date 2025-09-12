/**
 * WebSocket 관련 타입 정의
 */

import type { WebSocketMessage } from './realtime';

/**
 * WebSocket 연결 상태
 */
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

/**
 * WebSocket 이벤트 타입
 */
export type WebSocketEventType =
  | 'open'
  | 'close'
  | 'error'
  | 'message'
  | 'reconnect'
  | 'reconnect_failed';

/**
 * WebSocket 이벤트 데이터
 */
export interface WebSocketEvent<T = unknown> {
  type: WebSocketEventType;
  data?: T;
  error?: Error;
  timestamp: number;
}

/**
 * WebSocket 메시지 핸들러
 */
export type WebSocketMessageHandler<T = unknown> = (message: WebSocketMessage<T>) => void;

/**
 * WebSocket 이벤트 핸들러
 */
export type WebSocketEventHandler<T = unknown> = (event: WebSocketEvent<T>) => void;

/**
 * WebSocket 구독 정보
 */
export interface WebSocketSubscription {
  id: string;
  type: string;
  symbols?: string[];
  callback: WebSocketMessageHandler;
  active: boolean;
  createdAt: Date;
}

/**
 * WebSocket 연결 옵션
 */
export interface WebSocketConnectionOptions {
  url: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  timeout?: number;
  retryOnClose?: boolean;
}

/**
 * WebSocket 클라이언트 인터페이스
 */
export interface WebSocketClient {
  connect(): Promise<void>;
  disconnect(): void;
  send<T>(message: WebSocketMessage<T>): void;
  subscribe(subscription: Omit<WebSocketSubscription, 'id' | 'createdAt'>): string;
  unsubscribe(id: string): void;
  getStatus(): WebSocketStatus;
  isConnected(): boolean;
  on<T>(event: WebSocketEventType, handler: WebSocketEventHandler<T>): void;
  off<T>(event: WebSocketEventType, handler: WebSocketEventHandler<T>): void;
}

/**
 * WebSocket 메시지 타입 정의
 */
export const WEBSOCKET_MESSAGE_TYPES = {
  // 연결 관련
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  PING: 'ping',
  PONG: 'pong',

  // 구독 관련
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  SUBSCRIPTION_ACK: 'subscription_ack',

  // 데이터 관련
  ORDER_UPDATE: 'order_update',
  MARKET_DATA: 'market_data',
  POSITION_UPDATE: 'position_update',
  ACCOUNT_UPDATE: 'account_update',

  // 에러 관련
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type WebSocketMessageType =
  (typeof WEBSOCKET_MESSAGE_TYPES)[keyof typeof WEBSOCKET_MESSAGE_TYPES];
