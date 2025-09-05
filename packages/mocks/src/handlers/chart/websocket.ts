/**
 * WebSocket 모킹 관련 핸들러
 * 실시간 데이터 생성 및 WebSocket API 모킹을 통합 관리합니다.
 */

import type { Bar } from '../../types/chart.js';

/**
 * 심볼별 실시간 가격 데이터 관리 클래스
 */
class MockWebSocketManager {
  private subscriptions = new Map<string, Set<(data: any) => void>>();
  private intervals = new Map<string, any>();
  private currentPrices = new Map<string, number>();
  private lastBars = new Map<string, Bar>();

  private basePrices: Record<string, number> = {
    // 실제 심볼 리스트의 첫 번째 심볼들
    EURTRY: 32.0,
    USDSEK: 10.8,
    SUI30: 12000,
    AUDJPY: 97.5,
    GBPJPY: 187.5,
    AAPL: 180.0,
    XRPUSD: 0.5,
    GBPAUD: 1.92,
    NOKSEK: 0.95,
    CHFPLN: 4.16,
    US30: 35000,
    UKOil: 75.0,
    EURNZD: 1.75,
    GBPNOK: 13.2,
    AUDCAD: 0.88,
    EURHUF: 390.0,
    XAGUSD: 25.0,
    GBPEUR: 1.19,
    NZDCAD: 0.81,
    JPN225: 33000,
    EURUSD: 1.05,
    ESP35: 9500,
    EURHKD: 8.2,
    AUDCHF: 0.585,
    DKKJPY: 22.0,
    NZDUSD: 0.6,
    GER30: 16000,
    CHFNOK: 11.5,
    GBPCAD: 1.69,
    EURSEK: 11.4,
    EURCAD: 1.42,
    EURGBP: 0.84,
    GBPDKK: 8.7,
    GBPCHF: 1.125,
    MXNJPY: 8.5,
    GBPSEK: 13.5,
    HKG33: 18000,
    USDCZK: 23.0,
    PLNJPY: 37.5,
    USDCAD: 1.35,
    AUS200: 7500,
    USDDKK: 6.9,
    TRYJPY: 4.8,
    EURAUD: 1.62,
    EURSGD: 1.44,
    CHFSEK: 12.6,
    NZDAUD: 1.08,
    GBPUSD: 1.25,
    USOil: 75.0,
    EURNOK: 11.2,
    CADJPY: 111.0,
    NZDJPY: 90.0,
    GBPPLN: 4.95,
    FRA40: 7500,
    CHFJPY: 166.7,
    EURCHF: 0.945,
    GBPNZD: 2.08,
    EURPLN: 4.16,
    CADCHF: 0.67,
    EURZAR: 19.5,
    EURJPY: 157.5,
    USDCHF: 0.9,
    EUSTX50: 4500,
    XAUUSD: 2000.0,
    UK100: 7500,
    USDJPY: 150.0,
    USDNOK: 10.7,
    USDSGD: 1.37,
    EURCZK: 24.5,
    NOKDKK: 0.65,
    USDTRY: 30.0,
    NZDCHF: 0.54,
    SGDJPY: 109.5,
    USDHKD: 7.8,
    ETHUSD: 3000,
    AUDUSD: 0.65,
    NAS100: 15000,
  };

  subscribe(symbol: string, callback: (data: any) => void): void {
    console.log('[MockWebSocket] 구독 시작:', symbol);

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
    console.log('[MockWebSocket] 구독 해제:', symbol);

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
    const basePrice = this.basePrices[symbol] || this.getDefaultPrice(symbol);
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
    console.log(`[MockWebSocket] ${symbol} 가격 업데이트 시작 (${updateInterval}ms 간격)`);
  }

  private stopPriceUpdates(symbol: string): void {
    const interval = this.intervals.get(symbol);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(symbol);
      console.log(`[MockWebSocket] ${symbol} 가격 업데이트 중지`);
    }
  }

  private getDefaultPrice(symbol: string): number {
    // 심볼 타입에 따른 기본 가격 설정
    if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP')) {
      return symbol.includes('BTC') ? 50000 : symbol.includes('ETH') ? 3000 : 0.5;
    }
    if (
      symbol.includes('Oil') ||
      symbol.includes('Gold') ||
      symbol.includes('XAU') ||
      symbol.includes('XAG')
    ) {
      return symbol.includes('XAU') ? 2000 : symbol.includes('XAG') ? 25 : 75;
    }
    if (
      symbol.includes('AAPL') ||
      symbol.includes('US30') ||
      symbol.includes('NAS100') ||
      symbol.includes('JPN225')
    ) {
      return symbol.includes('AAPL')
        ? 180
        : symbol.includes('US30')
          ? 35000
          : symbol.includes('NAS100')
            ? 15000
            : 33000;
    }
    if (symbol.length === 6 && /^[A-Z]{6}$/.test(symbol)) {
      return 1.0; // 외환 기본값
    }
    return 1000; // 기본값
  }

  private generatePriceUpdate(symbol: string): void {
    const currentPrice = this.currentPrices.get(symbol) || this.getDefaultPrice(symbol);
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
        console.error('[MockWebSocket] 콜백 오류:', error);
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
    console.log('[MockWebSocket] 모든 구독 정리');

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

    console.log('[MockWebSocket] 연결 시작:', url);

    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      console.log('[MockWebSocket] 연결 완료');

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
      console.error('[MockWebSocket] 연결이 열려있지 않음');
      return;
    }

    try {
      const message = typeof data === 'string' ? JSON.parse(data) : data;
      console.log('[MockWebSocket] 메시지 전송:', message);
      this.handleMessage(message);
    } catch (error) {
      console.error('[MockWebSocket] 메시지 파싱 오류:', error);
    }
  }

  close(code?: number, reason?: string): void {
    console.log('[MockWebSocket] 연결 종료:', { code, reason });

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
      console.log('[MockWebSocket] 구독 요청 처리:', symbol);

      this.messageCallback = (data: any) => {
        this.sendMessageToClient(data);
      };

      mockWebSocketManager.subscribe(symbol, this.messageCallback);
    } else if (message.type === 'unsubscribe') {
      const symbol = message.symbol;
      console.log('[MockWebSocket] 구독 해제 요청 처리:', symbol);

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
