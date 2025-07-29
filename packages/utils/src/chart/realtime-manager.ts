import { ref, computed } from 'vue';
import type { ChartDataPoint, OrderBookData } from '@template/types';

/**
 * 실시간 차트 데이터 관리자
 * WebSocket으로 실시간 데이터를 받고, Throttle로 화면 갱신을 제어합니다.
 */
export class RealtimeChartManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimer: NodeJS.Timeout | null = null;

  // 실시간 데이터 저장소
  private latestTrades = ref<ChartDataPoint[]>([]);
  private latestOrderBook = ref<OrderBookData | null>(null);

  // Throttle 설정
  private throttleInterval = 200; // 200ms (100~300ms 범위)
  private lastUpdateTime = 0;
  private updateCallbacks: Array<() => void> = [];

  // 연결 상태
  private isConnected = ref(false);
  private connectionError = ref<string | null>(null);

  constructor(throttleMs: number = 200) {
    this.throttleInterval = Math.max(100, Math.min(300, throttleMs));
  }

  /**
   * WebSocket 연결
   */
  connect(wsUrl: string, symbol: string) {
    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected.value = true;
        this.connectionError.value = null;
        this.reconnectAttempts = 0;

        // 구독 메시지 전송
        this.subscribeToSymbol(symbol);
        console.log('WebSocket connected:', symbol);
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.ws.onclose = () => {
        this.isConnected.value = false;
        this.handleReconnect(symbol);
      };

      this.ws.onerror = (error) => {
        this.connectionError.value = 'WebSocket 연결 오류가 발생했습니다.';
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      this.connectionError.value = 'WebSocket 연결을 초기화할 수 없습니다.';
      console.error('WebSocket connection error:', error);
    }
  }

  /**
   * 심볼 구독
   */
  private subscribeToSymbol(symbol: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const subscribeMessage = {
      type: 'subscribe',
      symbol: symbol,
      channels: ['trades', 'orderbook'],
    };

    this.ws.send(JSON.stringify(subscribeMessage));
  }

  /**
   * 메시지 처리
   */
  private handleMessage(message: any) {
    switch (message.type) {
      case 'trade':
        this.updateTradeData(message.data);
        break;
      case 'orderbook':
        this.updateOrderBookData(message.data);
        break;
      case 'heartbeat':
        // 연결 유지용 heartbeat 처리
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  /**
   * 체결 데이터 업데이트
   */
  private updateTradeData(tradeData: any) {
    const newTrade: ChartDataPoint = {
      time: Date.now(),
      open: tradeData.price,
      high: tradeData.price,
      low: tradeData.price,
      close: tradeData.price,
      volume: tradeData.volume,
    };

    // 최신 데이터 추가 (최대 1000개 유지)
    this.latestTrades.value.push(newTrade);
    if (this.latestTrades.value.length > 1000) {
      this.latestTrades.value = this.latestTrades.value.slice(-1000);
    }

    // Throttle로 화면 갱신 제어
    this.throttledUpdate();
  }

  /**
   * 호가 데이터 업데이트
   */
  private updateOrderBookData(orderBookData: any) {
    this.latestOrderBook.value = {
      symbol: orderBookData.symbol,
      timestamp: Date.now(),
      bids: orderBookData.bids || [],
      asks: orderBookData.asks || [],
    };

    // Throttle로 화면 갱신 제어
    this.throttledUpdate();
  }

  /**
   * Throttle된 화면 갱신
   */
  private throttledUpdate() {
    const now = Date.now();

    if (now - this.lastUpdateTime >= this.throttleInterval) {
      this.lastUpdateTime = now;
      this.notifyUpdate();
    }
  }

  /**
   * 업데이트 콜백 등록
   */
  onUpdate(callback: () => void) {
    this.updateCallbacks.push(callback);
  }

  /**
   * 업데이트 알림
   */
  private notifyUpdate() {
    this.updateCallbacks.forEach((callback) => callback());
  }

  /**
   * 재연결 처리
   */
  private handleReconnect(symbol: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectTimer = setTimeout(() => {
        this.reconnectAttempts++;
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect(this.ws?.url || '', symbol);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      this.connectionError.value = '연결이 끊어졌습니다. 페이지를 새로고침해주세요.';
    }
  }

  /**
   * 연결 해제
   */
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected.value = false;
    this.reconnectAttempts = 0;
  }

  /**
   * Throttle 간격 변경
   */
  setThrottleInterval(ms: number) {
    this.throttleInterval = Math.max(100, Math.min(300, ms));
  }

  /**
   * 최신 체결 데이터 반환
   */
  getLatestTrades() {
    return computed(() => this.latestTrades.value);
  }

  /**
   * 최신 호가 데이터 반환
   */
  getLatestOrderBook() {
    return computed(() => this.latestOrderBook.value);
  }

  /**
   * 연결 상태 반환
   */
  getConnectionStatus() {
    return {
      isConnected: computed(() => this.isConnected.value),
      error: computed(() => this.connectionError.value),
    };
  }

  /**
   * 정리
   */
  destroy() {
    this.disconnect();
    this.updateCallbacks = [];
    this.latestTrades.value = [];
    this.latestOrderBook.value = null;
  }
}
