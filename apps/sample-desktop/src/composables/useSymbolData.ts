/**
 * 심볼 데이터 관리 Composable
 * 심볼 목록, 필터링, 검색, 관심 종목 관리 등을 담당
 */

import { selectedSymbolInstance as selectedSymbol } from './useSelectedSymbol';
import { filterSymbols } from '@template/utils/symbol';
import type { TradingSymbol } from '@template/types';
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

  // 상태 관리
  const symbols = ref<TradingSymbol[]>(getAllSymbols());
  const favorites = ref<Set<string>>(new Set());
  const activeTab = ref('all');
  const searchQuery = ref('');

  // 계산된 속성
  const filteredSymbols = computed(() => {
    return filterSymbols(symbols.value, activeTab.value, searchQuery.value, favorites.value);
  });

  // 메서드
  const selectSymbol = (symbol: TradingSymbol) => {
    // 전역 selectedSymbol 업데이트
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

  const handleSearch = () => {
    // 검색 로직은 computed에서 처리됨
  };

  const loadSymbols = async () => {
    try {
      // mocks 패키지에서 심볼 목록 가져오기
      const { getAllSymbols } = await import('@template/mocks');
      symbols.value = getAllSymbols();
    } catch (error) {
      console.error('Failed to load symbols:', error);
      // 에러 발생 시 기본 데이터 사용
      symbols.value = [
        {
          symbol: 'EURTRY',
          ticker: 'EURTRY',
          description: 'Euro / Turkish Lira',
          exchange: 'Forex',
          type: 'forex',
        },
        {
          symbol: 'USDSEK',
          ticker: 'USDSEK',
          description: 'US Dollar / Swedish Krona',
          exchange: 'Forex',
          type: 'forex',
        },
        {
          symbol: 'SUI30',
          ticker: 'SUI30',
          description: 'Swiss Market Index',
          exchange: 'Index',
          type: 'index',
        },
        {
          symbol: 'AUDJPY',
          ticker: 'AUDJPY',
          description: 'Australian Dollar / Japanese Yen',
          exchange: 'Forex',
          type: 'forex',
        },
      ];
    }
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
    handleSearch,
    loadSymbols,
    addVisibleSymbols,
    removeVisibleSymbols,
    unsubscribeAll,
  };
}
