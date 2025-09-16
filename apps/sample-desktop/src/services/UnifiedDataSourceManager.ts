/**
 * 통합된 데이터 소스 관리자
 * Mock과 WebSocket을 명확히 분리하여 관리
 */

import { getDataSourceConfig } from '../config/dataSource';
import { webSocketManager } from './WebSocketManager';
import type { SymbolData } from '@template/types';

export class UnifiedDataSourceManager {
  private static instance: UnifiedDataSourceManager;
  private config = getDataSourceConfig();
  private marketData = new Map<string, SymbolData>();
  private subscribers = new Map<string, Set<(data: SymbolData) => void>>();

  private constructor() {}

  static getInstance(): UnifiedDataSourceManager {
    if (!UnifiedDataSourceManager.instance) {
      UnifiedDataSourceManager.instance = new UnifiedDataSourceManager();
    }
    return UnifiedDataSourceManager.instance;
  }

  /**
   * 데이터 소스 초기화
   */
  async initialize(): Promise<void> {
    if (this.config.useWebSocket) {
      console.log('[UnifiedDataSourceManager] 실제 WebSocket 사용');
      await webSocketManager.connect();
    } else {
      console.log('[UnifiedDataSourceManager] MSW Mock 데이터 사용');
      // MSW는 이미 main.ts에서 초기화됨
    }
  }

  /**
   * 심볼 구독
   */
  subscribe(symbol: string, callback: (data: SymbolData) => void): string {
    const subscriptionId = `${symbol}_${Date.now()}_${Math.random()}`;

    // 구독자 등록
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)!.add(callback);

    // 데이터 소스에 따라 구독
    if (this.config.useWebSocket) {
      this.subscribeToRealWebSocket(symbol, subscriptionId);
    } else {
      this.subscribeToMSW(symbol, subscriptionId);
    }

    return subscriptionId;
  }

  /**
   * 실제 WebSocket 구독
   */
  private subscribeToRealWebSocket(symbol: string, subscriptionId: string): void {
    webSocketManager.subscribe(symbol, (data: any) => {
      this.updateMarketData(symbol, data);
    });
  }

  /**
   * MSW 구독
   */
  private subscribeToMSW(symbol: string, subscriptionId: string): void {
    if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
      (window as any).mockWebSocketManager.subscribe(symbol, (data: any) => {
        this.updateMarketData(symbol, data);
      });
    }
  }

  /**
   * 구독 해제
   */
  unsubscribe(subscriptionId: string): void {
    // subscriptionId에서 symbol 추출 (간단한 구현)
    const symbol = subscriptionId.split('_')[0];
    const symbolSubscribers = this.subscribers.get(symbol);

    if (symbolSubscribers) {
      // 모든 콜백 제거 (실제로는 subscriptionId로 특정 콜백만 제거해야 함)
      symbolSubscribers.clear();
    }

    // 데이터 소스에 따라 구독 해제
    if (this.config.useWebSocket) {
      webSocketManager.unsubscribeById(subscriptionId);
    } else {
      if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
        (window as any).mockWebSocketManager.unsubscribeById(subscriptionId);
      }
    }
  }

  /**
   * 시장 데이터 업데이트 (통합 처리)
   */
  private updateMarketData(symbol: string, data: any): void {
    const currentData = this.marketData.get(symbol);
    const newPrice = data.close || data.price;

    if (currentData) {
      const change = newPrice - currentData.price;
      const changePercent = (change / currentData.price) * 100;

      const updatedData: SymbolData = {
        ...currentData,
        symbol,
        price: Math.round(newPrice * 100000) / 100000,
        change: Math.round(change * 100000) / 100000,
        changePercent: Math.round(changePercent * 100) / 100,
        high: Math.max(currentData.high, newPrice),
        low: Math.min(currentData.low, newPrice),
        volume: currentData.volume + (data.volume || 0),
        timestamp: data.time || Date.now(),
      };

      this.marketData.set(symbol, updatedData);

      // 구독자들에게 알림
      const symbolSubscribers = this.subscribers.get(symbol);
      if (symbolSubscribers) {
        symbolSubscribers.forEach((callback) => callback(updatedData));
      }
    }
  }

  /**
   * 시장 데이터 가져오기
   */
  getMarketData(symbol: string): SymbolData | undefined {
    return this.marketData.get(symbol);
  }

  /**
   * 모든 시장 데이터 가져오기
   */
  getAllMarketData(): SymbolData[] {
    return Array.from(this.marketData.values());
  }

  /**
   * 시장 데이터 설정 (초기화용)
   */
  setMarketData(symbol: string, data: SymbolData): void {
    this.marketData.set(symbol, data);
  }

  /**
   * 설정 변경 처리
   */
  updateConfig(): void {
    // 설정 다시 로드
    this.config = getDataSourceConfig();

    // MSW 간격 업데이트 (MSW 사용 시에만)
    if (
      !this.config.useWebSocket &&
      typeof window !== 'undefined' &&
      (window as any).mockWebSocketManager
    ) {
      (window as any).mockWebSocketManager.updateAllIntervals();
    }

    console.log('[UnifiedDataSourceManager] 설정 업데이트 완료');
  }

  /**
   * 연결 상태 확인
   */
  isConnected(): boolean {
    if (this.config.useWebSocket) {
      return webSocketManager.isConnected();
    } else {
      return typeof window !== 'undefined' && !!(window as any).mockWebSocketManager;
    }
  }
}

// 전역 인스턴스
export const unifiedDataSourceManager = UnifiedDataSourceManager.getInstance();
