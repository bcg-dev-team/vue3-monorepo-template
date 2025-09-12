/**
 * 목 데이터를 사용하는 실시간 시장 데이터 composable
 * 실제 WebSocket 연결 없이 시장 데이터를 시뮬레이션합니다.
 */

import { getAllSymbols, getAllSymbolPrices } from '@template/mocks';
import { realtimeConfig } from './useRealtimeConfig';
import type { MarketData } from '@template/types';
import { ref, onMounted, onUnmounted } from 'vue';

interface MockRealtimeDataOptions {
  symbols?: string[];
  autoConnect?: boolean;
}

export function useMockRealtimeData(options: MockRealtimeDataOptions = {}) {
  const { symbols = [], autoConnect = true } = options;

  // 상태
  const isConnected = ref(false);
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected' | 'error'>(
    'disconnected'
  );
  const isLoading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');

  // 목 데이터
  const marketData = ref<MarketData[]>([]);

  // 타이머
  let marketTimer: NodeJS.Timeout | null = null;

  // 연결 함수
  const connect = async () => {
    try {
      connectionStatus.value = 'connecting';
      isLoading.value = true;
      hasError.value = false;
      errorMessage.value = '';

      // 목 데이터 로드
      await loadMockData();

      // 연결 성공
      isConnected.value = true;
      connectionStatus.value = 'connected';
      isLoading.value = false;

      // 실시간 업데이트 시작 (영역별)
      startRealTimeUpdates();

      console.log('목 데이터 연결 성공');
    } catch (error) {
      console.error('목 데이터 연결 실패:', error);
      connectionStatus.value = 'error';
      hasError.value = true;
      errorMessage.value = error instanceof Error ? error.message : '연결 실패';
      isLoading.value = false;
    }
  };

  // 연결 해제 함수
  const disconnect = () => {
    isConnected.value = false;
    connectionStatus.value = 'disconnected';

    // 타이머 정리
    clearMarketTimer();

    console.log('목 시장 데이터 연결 해제');
  };

  // 목 데이터 로드
  const loadMockData = async () => {
    // 시장 데이터 로드
    const symbolPrices = getAllSymbolPrices();

    marketData.value = symbolPrices.map((price) => ({
      symbol: price.ticker,
      price: price.price,
      change: price.change,
      changePercent: price.changePercent,
      volume: price.volume,
      high: price.high24h,
      low: price.low24h,
      timestamp: Date.now(),
    }));
  };

  // 타이머 정리
  const clearMarketTimer = () => {
    if (marketTimer) {
      clearInterval(marketTimer);
      marketTimer = null;
    }
  };

  // 실시간 업데이트 시작
  const startRealTimeUpdates = () => {
    // 기존 타이머 정리
    clearMarketTimer();

    const config = realtimeConfig.getConfig();

    // 시장 데이터 업데이트
    if (config.market.enabled) {
      marketTimer = setInterval(() => {
        updateMarketData();
        realtimeConfig.recordUpdate('market');
      }, config.market.interval);
    }
  };

  // 시장 데이터 업데이트
  const updateMarketData = () => {
    if (!isConnected.value) return;

    console.log('📈 시장 데이터 업데이트:', new Date().toLocaleTimeString());

    marketData.value = marketData.value.map((data) => {
      const priceChange = (Math.random() - 0.5) * 0.02; // ±1% 변동
      const newPrice = data.price * (1 + priceChange);
      const change = newPrice - data.price;
      const changePercent = (change / data.price) * 100;

      return {
        ...data,
        price: Math.round(newPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        volume: data.volume + Math.floor(Math.random() * 1000),
        timestamp: Date.now(),
      };
    });
  };

  // 검색 함수
  const searchMarketData = (query: string) => {
    return marketData.value.filter((data) =>
      data.symbol.toLowerCase().includes(query.toLowerCase())
    );
  };

  // 설정 변경 감지 및 타이머 재시작
  let configUnsubscribe: (() => void) | null = null;

  onMounted(() => {
    if (autoConnect) {
      connect();
    }

    // 설정 변경 감지
    configUnsubscribe = realtimeConfig.onConfigChange(() => {
      if (isConnected.value) {
        startRealTimeUpdates();
      }
    });
  });

  // 컴포넌트 언마운트 시 정리
  onUnmounted(() => {
    disconnect();
    if (configUnsubscribe) {
      configUnsubscribe();
    }
  });

  return {
    // 연결 상태
    isConnected,
    connectionStatus,
    isLoading,
    hasError,
    errorMessage,

    // 데이터
    marketData,

    // 함수들
    connect,
    disconnect,
    searchMarketData,
  };
}
