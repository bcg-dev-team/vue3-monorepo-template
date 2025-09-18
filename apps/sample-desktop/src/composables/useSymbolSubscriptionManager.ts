/**
 * 심볼 구독 및 가시성 관리 Composable
 * 컴포넌트별 가시성 기반 효율적인 데이터 구독 관리
 */

import { useDataSourceManager } from './useDataSourceManager';
import { ref, readonly } from 'vue';

export function useSymbolSubscriptionManager() {
  const { subscribeToSymbol, unsubscribeFromSymbol, unsubscribeAll } = useDataSourceManager();

  // 현재 구독 중인 심볼들
  const activeSubscriptions = ref<Map<string, string>>(new Map());

  // 🎯 특정 컴포넌트에서 보이는 종목 추가 (구독 방식)
  const addVisibleSymbols = (
    source: string,
    symbols: string[],
    callback: (symbol: string, data: any) => void
  ) => {
    console.log(`[${source}] 보이는 종목 추가: ${symbols.length}개`, symbols);

    symbols.forEach((symbol) => {
      if (!activeSubscriptions.value.has(symbol)) {
        // 구독 시작
        const subscriptionId = subscribeToSymbol(symbol, (data) => {
          callback(symbol, data);
        });
        activeSubscriptions.value.set(symbol, subscriptionId);
      }
    });

    console.log(
      `🎯 현재 구독 중인 종목: ${activeSubscriptions.value.size}개`,
      Array.from(activeSubscriptions.value.keys())
    );
  };

  // 특정 컴포넌트에서 보이는 종목 제거
  const removeVisibleSymbols = (source: string, symbols: string[]) => {
    console.log(`[${source}] 보이는 종목 제거: ${symbols.length}개`, symbols);

    symbols.forEach((symbol) => {
      const subscriptionId = activeSubscriptions.value.get(symbol);
      if (subscriptionId) {
        unsubscribeFromSymbol(symbol);
        activeSubscriptions.value.delete(symbol);
      }
    });

    console.log(
      `🎯 현재 구독 중인 종목: ${activeSubscriptions.value.size}개`,
      Array.from(activeSubscriptions.value.keys())
    );
  };

  // 모든 구독 해제
  const unsubscribeAllSymbols = (): void => {
    activeSubscriptions.value.clear();
    unsubscribeAll();
  };

  return {
    // 상태
    activeSubscriptions: readonly(activeSubscriptions),

    // 함수들
    addVisibleSymbols,
    removeVisibleSymbols,
    unsubscribeAllSymbols,
  };
}
