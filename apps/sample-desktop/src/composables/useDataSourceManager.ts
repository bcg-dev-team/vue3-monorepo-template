/**
 * 데이터 소스 관리 Composable
 * WebSocket/MSW 통합 데이터 소스 관리 및 구독 처리
 */

import { getDataSourceManager } from '../services/managers';
import { ref, computed, readonly } from 'vue';

export function useDataSourceManager() {
  // 구독 관리
  const subscriptions = ref<Map<string, string>>(new Map()); // symbol -> subscriptionId
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // 데이터 소스 초기화
  const initialize = async () => {
    try {
      connectionStatus.value = 'connecting';
      const dataSourceManager = getDataSourceManager();

      // 이미 초기화되어 있는지 확인
      if (dataSourceManager.isConnected()) {
        console.log('[useDataSourceManager] 이미 초기화됨 - 스킵');
        connectionStatus.value = 'connected';
        return;
      }

      await dataSourceManager.initialize();
      connectionStatus.value = 'connected';
      console.log('[useDataSourceManager] 데이터 소스 초기화 완료');
    } catch (error) {
      console.error('[useDataSourceManager] 데이터 소스 초기화 실패:', error);
      connectionStatus.value = 'disconnected';
    }
  };

  // 모든 구독 해제 (일괄 처리)
  const unsubscribeAll = (): void => {
    const symbols = Array.from(subscriptions.value.keys());
    if (symbols.length > 0) {
      unsubscribeBulk(symbols);
      console.log(`[useDataSourceManager] 모든 구독 해제: ${symbols.length}개 종목`);
    }
  };

  // 일괄 구독
  const subscribeBulk = (
    symbols: string[],
    callback: (symbol: string, data: any) => void
  ): string[] => {
    const dataSourceManager = getDataSourceManager();
    const subscriptionIds = dataSourceManager.subscribeBulk(symbols, callback);

    // 구독 정보 저장
    symbols.forEach((symbol, index) => {
      subscriptions.value.set(symbol, subscriptionIds[index]);
    });

    console.log(`[useDataSourceManager] 일괄 구독 완료: ${symbols.length}개 종목`, symbols);
    return subscriptionIds;
  };

  // 일괄 구독 해제
  const unsubscribeBulk = (symbols: string[]): void => {
    const dataSourceManager = getDataSourceManager();
    const subscriptionIds = symbols
      .map((symbol) => subscriptions.value.get(symbol))
      .filter(Boolean) as string[];

    if (subscriptionIds.length > 0) {
      dataSourceManager.unsubscribeBulk(subscriptionIds);

      // 구독 정보 삭제
      symbols.forEach((symbol) => {
        subscriptions.value.delete(symbol);
      });

      console.log(`[useDataSourceManager] 일괄 구독 해제 완료: ${symbols.length}개 종목`, symbols);
    }
  };

  // 연결 상태
  const isConnected = computed(() => {
    try {
      const dataSourceManager = getDataSourceManager();
      return dataSourceManager.isConnected();
    } catch (error) {
      return false;
    }
  });

  return {
    // 상태
    connectionStatus: readonly(connectionStatus),
    isConnected,
    subscriptions: readonly(subscriptions),

    // 함수들
    initialize,
    unsubscribeAll,
    subscribeBulk,
    unsubscribeBulk,
  };
}
