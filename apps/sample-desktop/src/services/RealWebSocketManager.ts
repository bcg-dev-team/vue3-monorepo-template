import { getDataSourceConfig } from '../config/dataSource';

/**
 * 실제 웹소켓 연결을 관리하는 클래스
 */
class RealWebSocketManager {
  private ws: WebSocket | null = null;
  private subscriptions = new Map<string, Set<{ id: string; callback: (data: any) => void }>>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private isConnecting = false;
  private url: string;
  private heartbeatTimer: any = null;
  private heartbeatInterval: number;
  private connectionTimeout: any = null;
  private readonly CONNECTION_TIMEOUT = 10000; // 10초

  constructor() {
    const config = getDataSourceConfig();
    this.url = config.websocket.url;
    this.maxReconnectAttempts = config.websocket.reconnectAttempts;
    this.reconnectDelay = config.websocket.reconnectDelay;
    this.heartbeatInterval = config.websocket.heartbeatInterval;
  }

  /**
   * 웹소켓 연결
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
        resolve();
        return;
      }

      this.isConnecting = true;
      console.log('[RealWebSocket] 연결 시도:', this.url);

      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('[RealWebSocket] 연결 성공');
          this.isConnecting = false;
          this.reconnectAttempts = 0;

          // 하트비트 시작
          this.startHeartbeat();

          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            // 하트비트 응답 처리
            if (data.type === 'pong') {
              console.log('[RealWebSocket] 하트비트 응답 수신');
              return;
            }

            this.handleMessage(data);
          } catch (error) {
            console.error('[RealWebSocket] 메시지 파싱 오류:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('[RealWebSocket] 연결 종료:', event.code, event.reason);
          this.isConnecting = false;
          this.ws = null;

          // 하트비트 중지
          this.stopHeartbeat();

          // 정책 위반(1008)이나 비정상 종료가 아닌 경우에만 재연결 시도
          if (
            event.code !== 1008 &&
            event.code !== 1006 &&
            this.reconnectAttempts < this.maxReconnectAttempts
          ) {
            this.scheduleReconnect();
          } else if (event.code === 1008) {
            console.error('[RealWebSocket] 서버에서 연결을 거부했습니다. 서버 상태를 확인하세요.');
          }
        };

        this.ws.onerror = (error) => {
          console.error('[RealWebSocket] 연결 오류:', error);
          this.isConnecting = false;
          reject(error);
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  /**
   * 재연결 스케줄링
   */
  private scheduleReconnect(): void {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `[RealWebSocket] ${delay}ms 후 재연결 시도 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connect().catch(() => {
        // 재연결 실패 시 추가 시도는 scheduleReconnect에서 처리
      });
    }, delay);
  }

  /**
   * 메시지 처리
   */
  private handleMessage(data: any): void {
    if (data.type === 'price_update' && data.symbol) {
      const callbacks = this.subscriptions.get(data.symbol);
      if (callbacks) {
        callbacks.forEach(({ callback }) => {
          try {
            callback(data);
          } catch (error) {
            console.error('[RealWebSocket] 콜백 오류:', error);
          }
        });
      }
    }
  }

  /**
   * 종목 구독
   */
  subscribe(symbol: string, callback: (data: any) => void): string {
    const subscriptionId = `${symbol}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('[RealWebSocket] 구독 시작:', symbol, 'ID:', subscriptionId);

    if (!this.subscriptions.has(symbol)) {
      this.subscriptions.set(symbol, new Set());
    }

    const callbackWithId = { id: subscriptionId, callback };
    this.subscriptions.get(symbol)!.add(callbackWithId);

    // 서버에 구독 요청 전송
    this.sendSubscriptionRequest(symbol, 'subscribe');

    callback({
      type: 'subscription_success',
      symbol,
      subscriptionId,
      timestamp: Date.now(),
    });

    return subscriptionId;
  }

  /**
   * 구독 해제
   */
  unsubscribe(symbol: string, callback: (data: any) => void): void {
    console.log('[RealWebSocket] 구독 해제:', symbol);

    const callbacks = this.subscriptions.get(symbol);
    if (callbacks) {
      for (const callbackWithId of callbacks) {
        if (callbackWithId.callback === callback) {
          callbacks.delete(callbackWithId);
          break;
        }
      }

      if (callbacks.size === 0) {
        this.subscriptions.delete(symbol);
        // 서버에 구독 해제 요청 전송
        this.sendSubscriptionRequest(symbol, 'unsubscribe');
      }
    }

    callback({
      type: 'unsubscription_success',
      symbol,
      timestamp: Date.now(),
    });
  }

  /**
   * ID로 구독 해제
   */
  unsubscribeById(subscriptionId: string): void {
    console.log('[RealWebSocket] ID로 구독 해제:', subscriptionId);

    for (const [symbol, callbacks] of this.subscriptions.entries()) {
      for (const callbackWithId of callbacks) {
        if (callbackWithId.id === subscriptionId) {
          callbacks.delete(callbackWithId);
          console.log('[RealWebSocket] 구독 해제됨:', symbol, 'ID:', subscriptionId);

          if (callbacks.size === 0) {
            this.subscriptions.delete(symbol);
            // 서버에 구독 해제 요청 전송
            this.sendSubscriptionRequest(symbol, 'unsubscribe');
          }
          return;
        }
      }
    }
  }

  /**
   * 하트비트 시작
   */
  private startHeartbeat(): void {
    this.stopHeartbeat(); // 기존 하트비트 중지

    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: 'ping',
            timestamp: Date.now(),
          })
        );
        console.log('[RealWebSocket] 하트비트 전송');
      }
    }, this.heartbeatInterval);
  }

  /**
   * 하트비트 중지
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 서버에 구독/해제 요청 전송
   */
  private sendSubscriptionRequest(symbol: string, action: 'subscribe' | 'unsubscribe'): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        type: action,
        symbol: symbol,
        timestamp: Date.now(),
      };

      this.ws.send(JSON.stringify(message));
      console.log(`[RealWebSocket] 서버에 ${action} 요청 전송:`, symbol);
    } else {
      console.warn('[RealWebSocket] 웹소켓이 연결되지 않음');
    }
  }

  /**
   * 연결 상태 확인
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * 연결 종료
   */
  disconnect(): void {
    // 하트비트 중지
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.reconnectAttempts = 0;
    console.log('[RealWebSocket] 연결 종료');
  }

  /**
   * 정리
   */
  cleanup(): void {
    this.disconnect();
  }
}

export const realWebSocketManager = new RealWebSocketManager();
