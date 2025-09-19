/**
 * 선택된 심볼을 전역적으로 관리하는 composable
 * 심볼 선택 상태 관리
 */

import { useSymbolSubscriptionManager } from './useSymbolSubscriptionManager';
import { calculateBuyPrice, calculateSellPrice } from '@template/utils';
import { useDataSourceManager } from './useDataSourceManager';
import { getAllSymbols } from '@template/mocks';
import { useMarketData } from './useMarketData';
import { ref, computed, readonly } from 'vue';

// 전역 선택된 심볼 상태
const globalSelectedSymbol = ref<string>('EURTRY');

// 심볼 변경 이벤트 리스너
const symbolChangeListeners = new Set<(symbol: string) => void>();

export function useSelectedSymbol() {
  const marketDataManager = useMarketData();
  const dataSourceManager = useDataSourceManager();
  const subscriptionManager = useSymbolSubscriptionManager();

  // 선택된 심볼 가져오기
  const getSelectedSymbol = () => globalSelectedSymbol.value;

  // 심볼 변경 리스너 등록
  const onSymbolChange = (listener: (symbol: string) => void) => {
    symbolChangeListeners.add(listener);
    return () => symbolChangeListeners.delete(listener);
  };

  // 현재 선택된 심볼을 Chart 소스로 구독 관리
  const updateChartSymbolSubscription = (symbol: string) => {
    subscriptionManager.updateVisibleSymbols('Chart', [symbol], (symbol, data) => {
      marketDataManager.updateMarketDataFromStream(symbol, data);
    });
  };

  // 초기화
  dataSourceManager.initialize();

  // 초기 선택된 심볼을 Chart 소스로 구독
  updateChartSymbolSubscription(globalSelectedSymbol.value);

  // 선택된 심볼의 시장 데이터
  const selectedSymbolData = computed(() => {
    return marketDataManager.getSymbolData(globalSelectedSymbol.value);
  });

  // 선택된 심볼의 실시간 가격
  const currentPrice = computed(() => {
    return selectedSymbolData.value?.price || 0;
  });

  // 선택된 심볼의 변동률
  const changePercent = computed(() => {
    return selectedSymbolData.value?.changePercent || 0;
  });

  // 선택된 심볼의 변동값
  const changeValue = computed(() => {
    return selectedSymbolData.value?.change || 0;
  });

  // 선택된 심볼의 거래량
  const volume = computed(() => {
    return selectedSymbolData.value?.volume || 0;
  });

  // 선택된 심볼의 고가/저가
  const highPrice = computed(() => {
    return selectedSymbolData.value?.high || 0;
  });

  const lowPrice = computed(() => {
    return selectedSymbolData.value?.low || 0;
  });

  // 매수/매도 가격 계산 (utils 함수 사용)
  const buyPrice = computed(() => {
    return calculateBuyPrice(globalSelectedSymbol.value, currentPrice.value);
  });

  const sellPrice = computed(() => {
    return calculateSellPrice(globalSelectedSymbol.value, currentPrice.value);
  });

  // 심볼 정보 (타입, 설명 등)
  const symbolInfo = computed(() => {
    const allSymbols = getAllSymbols();
    return allSymbols.find((symbol) => symbol.ticker === globalSelectedSymbol.value);
  });

  // 심볼 타입
  const symbolType = computed(() => {
    return symbolInfo.value?.type || 'forex';
  });

  // 심볼 설명
  const symbolDescription = computed(() => {
    return symbolInfo.value?.description || globalSelectedSymbol.value;
  });

  // 심볼 변경 (구독과 함께 처리)
  const setSelectedSymbol = (symbol: string) => {
    const oldSymbol = globalSelectedSymbol.value;
    globalSelectedSymbol.value = symbol;

    // 차트 구독 업데이트
    updateChartSymbolSubscription(symbol);

    // 변경 이벤트 알림
    if (oldSymbol !== symbol) {
      symbolChangeListeners.forEach((listener) => listener(symbol));
      console.log(`🔄 선택된 심볼 변경: ${oldSymbol} → ${symbol}`);
    }
  };

  // 가시성 관리는 subscriptionManager에 위임
  const addVisibleSymbols = (source: string, symbols: string[]) => {
    subscriptionManager.addVisibleSymbols(source, symbols, (symbol, data) => {
      marketDataManager.updateMarketDataFromStream(symbol, data);
    });
  };

  // 모든 구독 해제
  const unsubscribeAll = (): void => {
    subscriptionManager.unsubscribeAllSymbols();
  };

  return {
    // 상태
    selectedSymbol: readonly(globalSelectedSymbol),
    selectedSymbolData,
    symbolInfo,
    marketData: marketDataManager.marketData,
    isConnected: dataSourceManager.isConnected,
    connectionStatus: dataSourceManager.connectionStatus,

    // 가격 정보
    currentPrice,
    changePercent,
    changeValue,
    volume,
    highPrice,
    lowPrice,
    buyPrice,
    sellPrice,

    // 심볼 정보
    symbolType,
    symbolDescription,

    // 함수들
    getSelectedSymbol,
    setSelectedSymbol,
    onSymbolChange,
    addVisibleSymbols,
    unsubscribeAll,
  };
}

// 전역 인스턴스
export const selectedSymbolInstance = useSelectedSymbol();
