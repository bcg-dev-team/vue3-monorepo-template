import type { LineData } from 'lightweight-charts';

export interface ChartDataPoint {
  time: number;
  value: number;
}

export interface WebSocketMessage {
  type: 'subscription_success' | 'unsubscription_success' | 'price_update';
  data?: ChartDataPoint;
  timestamp?: number;
}

export class RealTimeChartManager {
  private ws: WebSocket | null = null;
  private data: LineData[] = [];
  private maxDataPoints: number = 100;
  private updateCallbacks: Array<(data: LineData[]) => void> = [];
  private isConnected = false;

  constructor(maxDataPoints: number = 100) {
    this.maxDataPoints = maxDataPoints;
  }

  /**
   * WebSocket 연결
   */
  connect(url: string = 'ws://localhost:3001/realtime-chart'): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('[RealTimeChartManager] WebSocket 연결됨');
        this.isConnected = true;

        // 구독 요청
        this.ws?.send(JSON.stringify({ type: 'subscribe' }));
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('[RealTimeChartManager] 메시지 파싱 오류:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[RealTimeChartManager] WebSocket 오류:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('[RealTimeChartManager] WebSocket 연결 종료');
        this.isConnected = false;
      };
    });
  }

  /**
   * WebSocket 연결 해제
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.send(JSON.stringify({ type: 'unsubscribe' }));
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  /**
   * 메시지 처리
   */
  private handleMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'subscription_success':
        console.log('[RealTimeChartManager] 구독 성공');
        break;

      case 'unsubscription_success':
        console.log('[RealTimeChartManager] 구독 해제 성공');
        break;

      case 'price_update':
        if (message.data) {
          this.addDataPoint(message.data);
        }
        break;
    }
  }

  /**
   * 데이터 포인트 추가 (마지막 요소 값만 업데이트)
   */
  addDataPoint(point: ChartDataPoint): void {
    // 기존 데이터가 있으면 마지막 요소의 값만 업데이트
    if (this.data.length > 0) {
      // 마지막 요소의 time은 유지하고 value만 업데이트
      this.data[this.data.length - 1] = {
        time: this.data[this.data.length - 1].time, // 기존 시간 유지
        value: point.value, // 새로운 값으로 업데이트
      };
    } else {
      // 데이터가 없으면 새로 추가
      this.data.push(point);
    }

    this.notifyUpdate();
  }

  /**
   * 데이터 업데이트
   */
  updateData(newData: LineData[]): void {
    this.data = newData;
    this.notifyUpdate();
  }

  /**
   * 현재 데이터 반환
   */
  getData(): LineData[] {
    return [...this.data];
  }

  /**
   * 초기 데이터 설정
   */
  setInitialData(data: LineData[]): void {
    this.data = [...data];
    this.notifyUpdate();
  }

  /**
   * 업데이트 콜백 등록
   */
  onUpdate(callback: (data: LineData[]) => void): void {
    this.updateCallbacks.push(callback);
  }

  /**
   * 업데이트 콜백 제거
   */
  offUpdate(callback: (data: LineData[]) => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index > -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  /**
   * 연결 상태 확인
   */
  isConnectedState(): boolean {
    return this.isConnected;
  }

  /**
   * 업데이트 알림
   */
  private notifyUpdate(): void {
    this.updateCallbacks.forEach((callback) => callback(this.getData()));
  }

  /**
   * 데이터 초기화
   */
  clear(): void {
    this.data = [];
    this.notifyUpdate();
  }
}
