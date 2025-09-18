/**
 * 심볼 데이터 관리 Composable
 * 심볼 목록, 필터링, 검색, 관심 종목 관리 등을 담당
 */

import { selectedSymbolInstance as selectedSymbol } from './useSelectedSymbol';
import type { TradingSymbol } from '@template/types';
import { filterSymbols } from '@template/utils';
import { getAllSymbols } from '@template/mocks';
import { ref, computed } from 'vue';

/**
 * 심볼 데이터 관리 Composable
 */
export function useSymbolData() {
  // 선택된 심볼의 시장 데이터 사용
  const {
    selectedSymbol: currentSelectedSymbol,
    marketData,
    addVisibleSymbols,
    removeVisibleSymbols,
    unsubscribeAll,
  } = selectedSymbol;

  const symbols = ref<TradingSymbol[]>(getAllSymbols());
  const favorites = ref<Set<string>>(new Set());
  const activeTab = ref('all');
  const searchQuery = ref('');

  const filteredSymbols = computed(() => {
    return filterSymbols(symbols.value, activeTab.value, searchQuery.value, favorites.value);
  });

  const selectSymbol = (symbol: TradingSymbol) => {
    selectedSymbol.setSelectedSymbol(symbol.ticker);
    return symbol;
  };

  const toggleFavorite = (ticker: string) => {
    if (favorites.value.has(ticker)) {
      favorites.value.delete(ticker);
    } else {
      favorites.value.add(ticker);
    }
  };

  const isFavorite = (ticker: string) => {
    return favorites.value.has(ticker);
  };

  const loadSymbols = async () => {
    // mocks 패키지에서 심볼 목록 가져오기
    const { getAllSymbols } = await import('@template/mocks');
    symbols.value = getAllSymbols();
  };

  return {
    // 상태
    symbols,
    favorites,
    activeTab,
    searchQuery,
    currentSelectedSymbol,
    marketData,

    // 계산된 속성
    filteredSymbols,

    // 메서드
    selectSymbol,
    toggleFavorite,
    isFavorite,
    loadSymbols,
    addVisibleSymbols,
    removeVisibleSymbols,
    unsubscribeAll,
  };
}
