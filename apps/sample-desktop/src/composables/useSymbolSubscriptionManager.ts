/**
 * 소스별 심볼 구독 관리 Composable
 * 각 소스(Chart, AGGrid, SymbolList)별로 구독을 관리하되,
 * 실제 WebSocket 구독은 전체 종목의 합집합으로 처리
 */

import { useDataSourceManager } from './useDataSourceManager';
import { ref, readonly, computed } from 'vue';

/**
 * 소스별 구독 정보
 */
interface SourceSubscription {
  source: string;
  symbols: Set<string>;
  callback: (symbol: string, data: any) => void;
}

export function useSymbolSubscriptionManager() {
  const { subscribeBulk, unsubscribeBulk } = useDataSourceManager();

  // 소스별 구독 관리
  const sourceSubscriptions = ref<Map<string, SourceSubscription>>(new Map());

  // 실제 WebSocket 구독 (심볼별 구독 ID 저장)
  const activeWebSocketSubscriptions = ref<Map<string, string>>(new Map());

  // 전체 구독 중인 종목들의 합집합 (computed)
  const allSubscribedSymbols = computed(() => {
    const allSymbols = new Set<string>();
    sourceSubscriptions.value.forEach((subscription) => {
      subscription.symbols.forEach((symbol) => allSymbols.add(symbol));
    });
    return allSymbols;
  });

  /**
   * 실제 WebSocket 구독 동기화 (일괄 처리 방식)
   * 합집합에서 추가/제거된 종목들에 대해 WebSocket 구독/해제 처리
   */
  const syncWebSocketSubscriptions = () => {
    const requiredSymbols = allSubscribedSymbols.value;
    const currentSymbols = new Set(activeWebSocketSubscriptions.value.keys());

    // 새로 구독해야 할 종목들
    const symbolsToAdd = Array.from(requiredSymbols).filter(
      (symbol) => !currentSymbols.has(symbol)
    );

    // 구독 해제해야 할 종목들
    const symbolsToRemove = Array.from(currentSymbols).filter(
      (symbol) => !requiredSymbols.has(symbol)
    );

    // 🚀 일괄 WebSocket 구독 추가
    if (symbolsToAdd.length > 0) {
      const subscriptionIds = subscribeBulk(symbolsToAdd, (symbol, data) => {
        // 해당 종목을 구독하는 모든 소스에 데이터 전달
        sourceSubscriptions.value.forEach((subscription) => {
          if (subscription.symbols.has(symbol)) {
            try {
              subscription.callback(symbol, data);
            } catch (error) {
              console.error(`[${subscription.source}] 콜백 오류:`, error);
            }
          }
        });
      });

      // 구독 ID 저장
      symbolsToAdd.forEach((symbol, index) => {
        activeWebSocketSubscriptions.value.set(symbol, subscriptionIds[index]);
      });
    }

    // 🚀 일괄 WebSocket 구독 해제
    if (symbolsToRemove.length > 0) {
      unsubscribeBulk(symbolsToRemove);
      symbolsToRemove.forEach((symbol) => {
        activeWebSocketSubscriptions.value.delete(symbol);
      });
    }

    if (symbolsToAdd.length > 0 || symbolsToRemove.length > 0) {
      console.log(`🔄 WebSocket 구독 동기화 (일괄 처리):`, {
        added: symbolsToAdd.length,
        removed: symbolsToRemove.length,
        addedSymbols: symbolsToAdd,
        removedSymbols: symbolsToRemove,
        total: activeWebSocketSubscriptions.value.size,
      });
    }
  };

  /**
   * 특정 소스의 가시성 종목 업데이트
   */
  const updateVisibleSymbols = async (
    source: string,
    symbols: string[],
    callback: (symbol: string, data: any) => void
  ) => {
    console.log(`[${source}] 가시성 종목 업데이트: ${symbols.length}개`, symbols);

    // 소스별 구독 정보 업데이트
    sourceSubscriptions.value.set(source, {
      source,
      symbols: new Set(symbols),
      callback,
    });

    // WebSocket 구독 동기화
    await syncWebSocketSubscriptions();

    console.log(`✅ [${source}] 구독 업데이트 완료`, {
      sourceSymbols: symbols.length,
      totalWebSocketSubscriptions: activeWebSocketSubscriptions.value.size,
    });
  };

  /**
   * 특정 소스의 가시성 종목 추가
   */
  const addVisibleSymbols = async (
    source: string,
    symbols: string[],
    callback: (symbol: string, data: any) => void
  ) => {
    await updateVisibleSymbols(source, symbols, callback);
  };

  /**
   * 모든 구독 해제 (일괄 처리)
   */
  const unsubscribeAllSymbols = (): void => {
    console.log('🔄 모든 구독 해제 시작');

    // 소스별 구독 정보 초기화
    sourceSubscriptions.value.clear();

    // 🚀 모든 WebSocket 구독을 일괄 해제
    const allSymbols = Array.from(activeWebSocketSubscriptions.value.keys());
    if (allSymbols.length > 0) {
      unsubscribeBulk(allSymbols);
    }
    activeWebSocketSubscriptions.value.clear();

    console.log(`✅ 모든 구독 해제 완료: ${allSymbols.length}개 종목`);
  };

  return {
    // 상태 (읽기 전용)
    sourceSubscriptions: readonly(sourceSubscriptions),
    activeWebSocketSubscriptions: readonly(activeWebSocketSubscriptions),
    allSubscribedSymbols,

    // 함수들
    updateVisibleSymbols,
    addVisibleSymbols, // 편의 함수
    unsubscribeAllSymbols,
  };
}
