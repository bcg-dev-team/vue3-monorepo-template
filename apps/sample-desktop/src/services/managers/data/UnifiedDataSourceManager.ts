/**
 * 통합된 데이터 소스 관리자
 * Mock과 WebSocket을 명확히 분리하여 관리
 */

import { getDataSourceConfig } from '../../../config/dataSource';
import { webSocketManager } from './WebSocketManager';
import type { SymbolData } from '@template/types';

export class UnifiedDataSourceManager {
  private static instance: UnifiedDataSourceManager;
  private config = getDataSourceConfig();
  private marketData = new Map<string, SymbolData>();
  private subscribers = new Map<string, Set<(data: SymbolData) => void>>();
  private webSocketSubscriptionIds = new Map<string, string>(); // symbol -> webSocketSubscriptionId

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
   * 일괄 구독
   */
  subscribeBulk(symbols: string[], callback: (symbol: string, data: SymbolData) => void): string[] {
    console.log(`[UnifiedDataSourceManager] 일괄 구독 시작: ${symbols.length}개 종목`, symbols);

    const subscriptionIds: string[] = [];

    // 각 심볼에 대해 구독자 등록
    symbols.forEach((symbol) => {
      const subscriptionId = `${symbol}_${Date.now()}_${Math.random()}`;
      subscriptionIds.push(subscriptionId);

      // 구독자 등록
      if (!this.subscribers.has(symbol)) {
        this.subscribers.set(symbol, new Set());
      }
      this.subscribers.get(symbol)!.add((data) => callback(symbol, data));
    });

    // 데이터 소스에 따라 일괄 구독
    if (this.config.useWebSocket) {
      this.subscribeBulkToWebSocket(symbols);
    } else {
      this.subscribeBulkToMSW(symbols);
    }

    console.log(`[UnifiedDataSourceManager] 일괄 구독 완료: ${subscriptionIds.length}개 ID 생성`);
    return subscriptionIds;
  }

  /**
   * 일괄 구독 해제
   */
  unsubscribeBulk(subscriptionIds: string[]): void {
    console.log(`[UnifiedDataSourceManager] 일괄 구독 해제 시작: ${subscriptionIds.length}개 ID`);

    const symbols = subscriptionIds.map((id) => id.split('_')[0]);
    const uniqueSymbols = Array.from(new Set(symbols));

    // 구독자 정리
    uniqueSymbols.forEach((symbol) => {
      const symbolSubscribers = this.subscribers.get(symbol);
      if (symbolSubscribers) {
        symbolSubscribers.clear();
      }
    });

    // 데이터 소스에 따라 일괄 구독 해제
    if (this.config.useWebSocket) {
      this.unsubscribeBulkFromWebSocket(uniqueSymbols);
    } else {
      this.unsubscribeBulkFromMSW(uniqueSymbols);
    }

    console.log(`[UnifiedDataSourceManager] 일괄 구독 해제 완료: ${uniqueSymbols.length}개 종목`);
  }

  /**
   * WebSocket 일괄 구독
   */
  private subscribeBulkToWebSocket(symbols: string[]): void {
    symbols.forEach((symbol) => {
      const webSocketSubscriptionId = webSocketManager.subscribe(symbol, (data: any) => {
        this.updateMarketData(symbol, data);
      });
      this.webSocketSubscriptionIds.set(symbol, webSocketSubscriptionId);
    });
  }

  /**
   * MSW 일괄 구독
   */
  private subscribeBulkToMSW(symbols: string[]): void {
    if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
      symbols.forEach((symbol) => {
        (window as any).mockWebSocketManager.subscribe(symbol, (data: any) => {
          this.updateMarketData(symbol, data);
        });
      });
    }
  }

  /**
   * WebSocket 일괄 구독 해제
   */
  private unsubscribeBulkFromWebSocket(symbols: string[]): void {
    symbols.forEach((symbol) => {
      const webSocketSubscriptionId = this.webSocketSubscriptionIds.get(symbol);
      if (webSocketSubscriptionId) {
        webSocketManager.unsubscribeById(webSocketSubscriptionId);
        this.webSocketSubscriptionIds.delete(symbol);
      }
    });
  }

  /**
   * MSW 일괄 구독 해제
   */
  private unsubscribeBulkFromMSW(symbols: string[]): void {
    if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
      symbols.forEach((symbol) => {
        (window as any).mockWebSocketManager.unsubscribe(symbol);
      });
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
