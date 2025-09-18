/**
 * 데이터 소스 관리 Composable
 * WebSocket/MSW 통합 데이터 소스 관리 및 구독 처리
 */

import { unifiedDataSourceManager } from '../services/UnifiedDataSourceManager';
import { ref, computed, readonly } from 'vue';

export function useDataSourceManager() {
  // 구독 관리
  const subscriptions = ref<Map<string, string>>(new Map()); // symbol -> subscriptionId
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // 통합 데이터 소스 초기화
  const initialize = async () => {
    try {
      connectionStatus.value = 'connecting';
      await unifiedDataSourceManager.initialize();
      connectionStatus.value = 'connected';
      console.log('[useDataSourceManager] 통합 데이터 소스 초기화 완료');
    } catch (error) {
      console.error('[useDataSourceManager] 통합 데이터 소스 초기화 실패:', error);
      connectionStatus.value = 'disconnected';
    }
  };

  // 심볼 구독
  const subscribeToSymbol = (symbol: string, callback: (data: any) => void): string => {
    const subscriptionId = unifiedDataSourceManager.subscribe(symbol, callback);
    subscriptions.value.set(symbol, subscriptionId);
    console.log(`[useDataSourceManager] 데이터 소스 구독 시작: ${symbol} (ID: ${subscriptionId})`);
    return subscriptionId;
  };

  // 심볼 구독 해제
  const unsubscribeFromSymbol = (symbol: string): void => {
    const subscriptionId = subscriptions.value.get(symbol);
    if (subscriptionId) {
      unifiedDataSourceManager.unsubscribe(subscriptionId);
      console.log(
        `[useDataSourceManager] 데이터 소스 구독 해제: ${symbol} (ID: ${subscriptionId})`
      );
      subscriptions.value.delete(symbol);
    }
  };

  // 모든 구독 해제
  const unsubscribeAll = (): void => {
    subscriptions.value.forEach((subscriptionId, symbol) => {
      unifiedDataSourceManager.unsubscribe(subscriptionId);
    });
    subscriptions.value.clear();
    console.log(`[useDataSourceManager] 모든 구독 해제`);
  };

  // 설정 업데이트
  const updateConfig = () => {
    unifiedDataSourceManager.updateConfig();
  };

  // 연결 상태
  const isConnected = computed(() => unifiedDataSourceManager.isConnected());

  return {
    // 상태
    connectionStatus: readonly(connectionStatus),
    isConnected,
    subscriptions: readonly(subscriptions),

    // 함수들
    initialize,
    subscribeToSymbol,
    unsubscribeFromSymbol,
    unsubscribeAll,
    updateConfig,
  };
}
