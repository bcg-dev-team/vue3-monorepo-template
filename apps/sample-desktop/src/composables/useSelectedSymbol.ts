/**
 * 선택된 심볼을 전역적으로 관리하는 composable
 * 모든 컴포넌트에서 동일한 심볼을 참조할 수 있도록 합니다.
 */

import { unifiedDataSourceManager } from '../services/UnifiedDataSourceManager';
import { useRealtimeConfig } from './useRealtimeConfig';
import type { SymbolData } from '@template/types';
import { getAllSymbols } from '@template/mocks';
import { ref, computed, readonly } from 'vue';

// 전역 선택된 심볼 상태
const globalSelectedSymbol = ref<string>('EURTRY');

// 심볼 변경 이벤트 리스너
const symbolChangeListeners = new Set<(symbol: string) => void>();

export function useSelectedSymbol() {
  // 선택된 심볼 가져오기
  const getSelectedSymbol = () => globalSelectedSymbol.value;

  // 심볼 변경
  const setSelectedSymbol = (symbol: string) => {
    const oldSymbol = globalSelectedSymbol.value;
    globalSelectedSymbol.value = symbol;

    // 변경 이벤트 알림
    if (oldSymbol !== symbol) {
      symbolChangeListeners.forEach((listener) => listener(symbol));
      console.log(`🔄 선택된 심볼 변경: ${oldSymbol} → ${symbol}`);
    }
  };

  // 심볼 변경 리스너 등록
  const onSymbolChange = (listener: (symbol: string) => void) => {
    symbolChangeListeners.add(listener);
    return () => symbolChangeListeners.delete(listener);
  };

  // 선택된 심볼의 시장 데이터 - 직접 가져오기
  const marketData = ref<SymbolData[]>([]);

  // 시장 데이터 초기화
  const initializeMarketData = () => {
    const symbols = getAllSymbols();
    marketData.value = symbols.map((symbol) => {
      const basePrice = getBasePrice(symbol.ticker);
      return {
        symbol: symbol.ticker,
        price: basePrice,
        change: 0,
        changePercent: 0,
        volume: Math.floor(Math.random() * 10000) + 1000,
        high: basePrice * 1.02,
        low: basePrice * 0.98,
        open: basePrice,
        close: basePrice,
        timestamp: Date.now(),
      };
    });
  };

  // 🎯 통합 데이터 소스 관리자 사용
  const subscriptions = ref<Map<string, string>>(new Map()); // symbol -> subscriptionId
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // 통합 데이터 소스 초기화
  unifiedDataSourceManager
    .initialize()
    .then(() => {
      connectionStatus.value = 'connected';
      console.log('[useSelectedSymbol] 통합 데이터 소스 초기화 완료');
    })
    .catch((error) => {
      console.error('[useSelectedSymbol] 통합 데이터 소스 초기화 실패:', error);
      connectionStatus.value = 'disconnected';
    });

  const subscribeToSymbol = (symbol: string, callback: (data: any) => void): string => {
    // 통합 데이터 소스 관리자를 통해 구독
    const subscriptionId = unifiedDataSourceManager.subscribe(symbol, callback);
    subscriptions.value.set(symbol, subscriptionId);
    console.log(
      `[useSelectedSymbol] 통합 데이터 소스 구독 시작: ${symbol} (ID: ${subscriptionId})`
    );
    return subscriptionId;
  };

  const unsubscribeFromSymbol = (symbol: string): void => {
    const subscriptionId = subscriptions.value.get(symbol);
    if (subscriptionId) {
      // 통합 데이터 소스 관리자를 통해 구독 해제
      unifiedDataSourceManager.unsubscribe(subscriptionId);
      console.log(
        `[useSelectedSymbol] 통합 데이터 소스 구독 해제: ${symbol} (ID: ${subscriptionId})`
      );
      subscriptions.value.delete(symbol);
    }
  };

  const unsubscribeAll = (): void => {
    subscriptions.value.forEach((subscriptionId, symbol) => {
      // 통합 데이터 소스 관리자를 통해 구독 해제
      unifiedDataSourceManager.unsubscribe(subscriptionId);
    });
    subscriptions.value.clear();
    console.log(`[useSelectedSymbol] 모든 구독 해제`);
  };

  // 🎯 특정 컴포넌트에서 보이는 종목 추가/제거 (구독 방식)
  const addVisibleSymbols = (source: string, symbols: string[]) => {
    console.log(`[${source}] 보이는 종목 추가: ${symbols.length}개`, symbols);

    symbols.forEach((symbol) => {
      if (!subscriptions.value.has(symbol)) {
        // 구독 시작
        subscribeToSymbol(symbol, (data) => {
          updateMarketDataFromStream(symbol, data);
        });
      }
    });

    console.log(
      `🎯 현재 구독 중인 종목: ${subscriptions.value.size}개`,
      Array.from(subscriptions.value.keys())
    );
  };

  const removeVisibleSymbols = (source: string, symbols: string[]) => {
    console.log(`[${source}] 보이는 종목 제거: ${symbols.length}개`, symbols);

    symbols.forEach((symbol) => {
      if (subscriptions.value.has(symbol)) {
        // 구독 해제
        unsubscribeFromSymbol(symbol);
      }
    });

    console.log(
      `🎯 현재 구독 중인 종목: ${subscriptions.value.size}개`,
      Array.from(subscriptions.value.keys())
    );
  };

  // 기준값 가져오기 함수
  const getBasePrice = (ticker: string): number => {
    const basePrices: Record<string, number> = {
      EURUSD: 1.085,
      GBPUSD: 1.265,
      USDJPY: 149.5,
      USDCHF: 0.875,
      USDCAD: 1.365,
      AUDUSD: 0.655,
      NZDUSD: 0.605,
      EURGBP: 0.855,
      EURJPY: 162.0,
      GBPJPY: 189.0,
      AUDJPY: 98.0,
      NZDJPY: 90.5,
      EURCHF: 0.945,
      EURCAD: 1.485,
      EURAUD: 1.655,
      EURNZD: 1.795,
      GBPCHF: 1.105,
      GBPCAD: 1.725,
      GBPAUD: 1.955,
      GBPNZD: 2.095,
      AUDCHF: 0.575,
      AUDCAD: 0.885,
      AUDNZD: 1.085,
      NZDCHF: 0.535,
      NZDCAD: 0.825,
      CADCHF: 0.645,
      CHFJPY: 171.0,
      CADJPY: 109.5,
      BTCUSD: 50000,
      ETHUSD: 3000,
      XRPUSD: 0.5,
      XAUUSD: 2000,
      XAGUSD: 25.0,
      USOil: 75.0,
      UKOil: 75.0,
      AAPL: 180.0,
      GOOGL: 140.0,
      MSFT: 350.0,
      AMZN: 150.0,
      TSLA: 250.0,
    };
    return basePrices[ticker] || 100;
  };

  // 실시간 설정 관리
  const realtimeConfig = useRealtimeConfig();

  // 실시간 업데이트는 차트 스트리밍에서 처리되므로 별도 타이머 불필요

  // 차트 스트리밍 시스템에서 데이터를 받아서 시장 데이터 업데이트
  const updateMarketDataFromStream = (symbol: string, streamData: any) => {
    const dataIndex = marketData.value.findIndex((data) => data.symbol === symbol);
    if (dataIndex !== -1) {
      const currentData = marketData.value[dataIndex];
      const newPrice = streamData.close || streamData.price;
      const change = newPrice - currentData.price;
      const changePercent = (change / currentData.price) * 100;

      marketData.value[dataIndex] = {
        ...currentData,
        price: Math.round(newPrice * 100000) / 100000,
        change: Math.round(change * 100000) / 100000,
        changePercent: Math.round(changePercent * 100) / 100,
        high: Math.max(currentData.high, newPrice),
        low: Math.min(currentData.low, newPrice),
        volume: currentData.volume + (streamData.volume || 0),
        timestamp: streamData.time || Date.now(),
      };

      // console.log(`[useSelectedSymbol] ${symbol} 업데이트: ${currentData.price} → ${newPrice}`);
    } else {
      console.warn(`[useSelectedSymbol] ${symbol} 데이터를 찾을 수 없습니다!`);
    }
    recordMarketUpdate();
  };

  // 차트 스트리밍 시스템과 연동을 위한 전역 함수 등록
  const setupStreamingIntegration = () => {
    if (typeof window !== 'undefined') {
      // 전역 함수로 차트 스트리밍 데이터를 받을 수 있도록 설정
      (window as any).updateMarketDataFromStream = updateMarketDataFromStream;

      // 스트리밍 간격 설정 함수 등록
      (window as any).getStreamingInterval = () => {
        const config = realtimeConfig.getConfig();
        return config.market.interval;
      };
    }
  };

  // 시장 데이터 업데이트 기록
  const recordMarketUpdate = () => {
    realtimeConfig.recordUpdate('market');
  };

  // 타이머 정리 (현재는 사용하지 않음)
  const clearAllTimers = () => {
    // 현재는 별도 타이머를 사용하지 않음
  };

  // 실시간 업데이트 시작 (설정 기반)
  const startRealTimeUpdates = () => {
    clearAllTimers();

    const config = realtimeConfig.getConfig();

    // 시장 데이터는 차트 스트리밍에서 처리되므로 여기서는 별도 타이머 불필요
    // 포지션, 계정, 주문 데이터는 현재 사용하지 않으므로 주석 처리
    console.log('[useSelectedSymbol] 실시간 업데이트 시작 - 시장 데이터는 차트 스트리밍에서 처리');
  };

  // 실시간 업데이트 중지
  const stopRealTimeUpdates = () => {
    clearAllTimers();
  };

  // 초기화
  initializeMarketData();
  setupStreamingIntegration();
  startRealTimeUpdates();

  // 설정 변경 감지하여 타이머 재시작
  realtimeConfig.onConfigChange(() => {
    startRealTimeUpdates();
    // 통합 데이터 소스 관리자에서 설정 변경 처리
    unifiedDataSourceManager.updateConfig();
  });

  // 연결 상태
  const isConnected = computed(() => unifiedDataSourceManager.isConnected());

  const selectedSymbolData = computed(() => {
    return marketData.value.find((data: any) => data.symbol === globalSelectedSymbol.value);
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

  // 매수/매도 가격 계산 (스프레드 적용)
  const buyPrice = computed(() => {
    const basePrice = currentPrice.value;
    if (basePrice === 0) return 0;

    // 스프레드 계산 (심볼 타입에 따라 다름)
    let spread = 0.0001; // 기본 스프레드

    if (globalSelectedSymbol.value.includes('JPY')) {
      spread = 0.01; // JPY 쌍은 더 큰 스프레드
    } else if (
      globalSelectedSymbol.value.includes('BTC') ||
      globalSelectedSymbol.value.includes('ETH')
    ) {
      spread = basePrice * 0.0001; // 암호화폐는 비율 스프레드
    } else if (
      globalSelectedSymbol.value.includes('XAU') ||
      globalSelectedSymbol.value.includes('XAG')
    ) {
      spread = 0.1; // 금/은은 더 큰 스프레드
    }

    return Math.round((basePrice + spread) * 100000) / 100000;
  });

  const sellPrice = computed(() => {
    const basePrice = currentPrice.value;
    if (basePrice === 0) return 0;

    // 스프레드 계산 (심볼 타입에 따라 다름)
    let spread = 0.0001; // 기본 스프레드

    if (globalSelectedSymbol.value.includes('JPY')) {
      spread = 0.01; // JPY 쌍은 더 큰 스프레드
    } else if (
      globalSelectedSymbol.value.includes('BTC') ||
      globalSelectedSymbol.value.includes('ETH')
    ) {
      spread = basePrice * 0.0001; // 암호화폐는 비율 스프레드
    } else if (
      globalSelectedSymbol.value.includes('XAU') ||
      globalSelectedSymbol.value.includes('XAG')
    ) {
      spread = 0.1; // 금/은은 더 큰 스프레드
    }

    return Math.round((basePrice - spread) * 100000) / 100000;
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

  return {
    // 상태
    selectedSymbol: readonly(globalSelectedSymbol),
    selectedSymbolData,
    symbolInfo,
    marketData: readonly(marketData),
    isConnected,
    useWebSocket: readonly(ref(unifiedDataSourceManager.isConnected())),
    connectionStatus: readonly(connectionStatus),

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
    removeVisibleSymbols,
    subscribeToSymbol,
    unsubscribeFromSymbol,
    unsubscribeAll,
    startRealTimeUpdates,
    stopRealTimeUpdates,
  };
}

// 전역 인스턴스
export const selectedSymbolInstance = useSelectedSymbol();
