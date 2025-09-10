/**
 * WebSocket 모킹 관련 핸들러
 * 실시간 데이터 생성 및 WebSocket API 모킹을 통합 관리합니다.
 */

import type { Bar } from '../../types/chart.js';
import { logger } from '@template/utils';

// MSW WebSocket 전용 로거 생성
const mswWsLogger = logger.createComponentLogger('MSW-WebSocket');

/**
 * 심볼별 실시간 가격 데이터 관리 클래스
 */
class MockWebSocketManager {
  private subscriptions = new Map<string, Set<(data: any) => void>>();
  private intervals = new Map<string, any>();
  private currentPrices = new Map<string, number>();
  private lastBars = new Map<string, Bar>();

  private basePrices: Record<string, number> = {
    BTCEUR: 45000,
    BTCUSD: 50000,
    ETHEUR: 2800,
    ETHUSD: 3000,
  };

  subscribe(symbol: string, callback: (data: any) => void): void {
    mswWsLogger.info('MockWebSocket 구독 시작', { symbol });

    if (!this.subscriptions.has(symbol)) {
      this.subscriptions.set(symbol, new Set());
      this.startPriceUpdates(symbol);
    }

    this.subscriptions.get(symbol)!.add(callback);

    callback({
      type: 'subscription_success',
      symbol,
      timestamp: Date.now(),
    });
  }

  unsubscribe(symbol: string, callback: (data: any) => void): void {
    mswWsLogger.info('MockWebSocket 구독 해제', { symbol });

    const callbacks = this.subscriptions.get(symbol);
    if (callbacks) {
      callbacks.delete(callback);

      if (callbacks.size === 0) {
        this.subscriptions.delete(symbol);
        this.stopPriceUpdates(symbol);
      }
    }

    callback({
      type: 'unsubscription_success',
      symbol,
      timestamp: Date.now(),
    });
  }

  private startPriceUpdates(symbol: string): void {
    const basePrice = this.basePrices[symbol] || 1000;
    this.currentPrices.set(symbol, basePrice);

    const now = Date.now();
    const currentBarStart = this.getBarStartTime(now, '1');

    this.lastBars.set(symbol, {
      time: currentBarStart,
      open: basePrice,
      high: basePrice,
      low: basePrice,
      close: basePrice,
      volume: 1000,
    });

    const updateInterval = 2000 + Math.random() * 3000;
    const interval = setInterval(() => {
      this.generatePriceUpdate(symbol);
    }, updateInterval);

    this.intervals.set(symbol, interval);
    mswWsLogger.info(`${symbol} 가격 업데이트 시작 (${updateInterval}ms 간격)`);
  }

  private stopPriceUpdates(symbol: string): void {
    const interval = this.intervals.get(symbol);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(symbol);
      mswWsLogger.info(`${symbol} 가격 업데이트 중지`);
    }
  }

  private generatePriceUpdate(symbol: string): void {
    const currentPrice = this.currentPrices.get(symbol) || 1000;
    const callbacks = this.subscriptions.get(symbol);

    if (!callbacks || callbacks.size === 0) {
      return;
    }

    const volatility = 0.001;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = currentPrice * (1 + change);

    this.currentPrices.set(symbol, newPrice);

    const high = newPrice * (1 + Math.random() * 0.0005);
    const low = newPrice * (1 - Math.random() * 0.0005);
    const volume = Math.floor(Math.random() * 1000) + 500;

    const updateData = {
      type: 'price_update',
      symbol,
      timestamp: Date.now(),
      price: parseFloat(newPrice.toFixed(2)),
      // 🎯 open은 제거: Bar 생성 로직에서 이전 Bar의 종가를 사용
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume,
    };

    callbacks.forEach((callback) => {
      try {
        callback(updateData);
      } catch (error) {
        mswWsLogger.error('MockWebSocket 콜백 오류', { error });
      }
    });
  }

  private getBarStartTime(timestamp: number, resolution: string): number {
    const timeInSeconds = Math.floor(timestamp / 1000);
    let interval: number;

    switch (resolution) {
      case '1':
        interval = 60;
        break;
      case '5':
        interval = 5 * 60;
        break;
      case '15':
        interval = 15 * 60;
        break;
      case '30':
        interval = 30 * 60;
        break;
      case '60':
        interval = 60 * 60;
        break;
      case '240':
        interval = 4 * 60 * 60;
        break;
      case '1D':
        interval = 24 * 60 * 60;
        break;
      default:
        interval = 60;
    }

    const barStart = Math.floor(timeInSeconds / interval) * interval;
    return barStart * 1000;
  }

  cleanup(): void {
    mswWsLogger.info('MockWebSocket 모든 구독 정리');

    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });

    this.subscriptions.clear();
    this.intervals.clear();
    this.currentPrices.clear();
    this.lastBars.clear();
  }
}

export const mockWebSocketManager = new MockWebSocketManager();

/**
 * 모킹된 WebSocket 클래스
 */
export class MockWebSocket extends EventTarget {
  public readyState: number = MockWebSocket.CONNECTING;
  public url: string;
  public protocol: string = '';
  public extensions: string = '';
  public bufferedAmount: number = 0;
  public binaryType: BinaryType = 'blob';

  private messageCallback: ((data: any) => void) | null = null;

  constructor(url: string, protocols?: string | string[]) {
    super();
    this.url = url;

    mswWsLogger.info('MockWebSocket 연결 시작', { url });

    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      mswWsLogger.info('MockWebSocket 연결 완료');

      const openEvent = new Event('open');
      this.dispatchEvent(openEvent);

      if (this.onopen) {
        this.onopen(openEvent);
      }
    }, 100);
  }

  public onopen: ((this: MockWebSocket, ev: Event) => any) | null = null;
  public onclose: ((this: MockWebSocket, ev: Event) => any) | null = null;
  public onerror: ((this: MockWebSocket, ev: Event) => any) | null = null;
  public onmessage: ((this: MockWebSocket, ev: MessageEvent) => any) | null = null;

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.readyState !== MockWebSocket.OPEN) {
      mswWsLogger.error('MockWebSocket 연결이 열려있지 않음');
      return;
    }

    try {
      const message = typeof data === 'string' ? JSON.parse(data) : data;
      mswWsLogger.info('MockWebSocket 메시지 전송', { message });
      this.handleMessage(message);
    } catch (error) {
      mswWsLogger.error('MockWebSocket 메시지 파싱 오류', { error });
    }
  }

  close(code?: number, reason?: string): void {
    mswWsLogger.info('MockWebSocket 연결 종료', { code, reason });

    this.readyState = MockWebSocket.CLOSED;

    if (this.messageCallback) {
      this.messageCallback = null;
    }

    const closeEvent = new Event('close') as any;
    closeEvent.code = code || 1000;
    closeEvent.reason = reason || 'Normal closure';
    closeEvent.wasClean = true;

    this.dispatchEvent(closeEvent);

    if (this.onclose) {
      this.onclose(closeEvent);
    }
  }

  private handleMessage(message: any): void {
    if (message.type === 'subscribe') {
      const symbol = message.symbol;
      mswWsLogger.info('MockWebSocket 구독 요청 처리', { symbol });

      this.messageCallback = (data: any) => {
        this.sendMessageToClient(data);
      };

      mockWebSocketManager.subscribe(symbol, this.messageCallback);
    } else if (message.type === 'unsubscribe') {
      const symbol = message.symbol;
      mswWsLogger.info('MockWebSocket 구독 해제 요청 처리', { symbol });

      if (this.messageCallback) {
        mockWebSocketManager.unsubscribe(symbol, this.messageCallback);
      }
    }
  }

  private sendMessageToClient(data: any): void {
    if (this.readyState !== MockWebSocket.OPEN) {
      return;
    }

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify(data),
    });

    if (this.onmessage) {
      this.onmessage(messageEvent);
    }

    this.dispatchEvent(messageEvent);
  }

  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;
}

// 페이지 언로드 시 정리
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    mockWebSocketManager.cleanup();
  });
}

export const websocketHandlers = [];
