import { ref, computed, onMounted, onUnmounted, watch, readonly } from 'vue';
import { RealtimeChartManager } from '../chart/realtime-manager';
import type { ChartDataPoint, OrderBookData, RealtimeConfig } from '@template/types';

/**
 * 실시간 차트 데이터를 관리하는 Composable
 * WebSocket 연결과 Throttle 기능을 제공합니다.
 */
export function useRealtimeChart(config: RealtimeConfig) {
  // 실시간 데이터 관리자 인스턴스
  const manager = ref<RealtimeChartManager | null>(null);

  // 반응형 데이터
  const trades = ref<ChartDataPoint[]>([]);
  const orderBook = ref<OrderBookData | null>(null);
  const isConnected = ref(false);
  const connectionError = ref<string | null>(null);
  const throttleInterval = ref(config.throttleMs || 200);

  // 성능 모니터링
  const updateCount = ref(0);
  const lastUpdateTime = ref(0);

  /**
   * 실시간 데이터 관리자 초기화
   */
  const initializeManager = () => {
    if (manager.value) {
      manager.value.destroy();
    }

    manager.value = new RealtimeChartManager(throttleInterval.value);

    // 업데이트 콜백 등록
    manager.value.onUpdate(() => {
      updateCount.value++;
      lastUpdateTime.value = Date.now();

      // 최신 데이터 가져오기
      const latestTrades = manager.value?.getLatestTrades();
      const latestOrderBook = manager.value?.getLatestOrderBook();

      if (latestTrades) {
        trades.value = latestTrades.value;
      }

      if (latestOrderBook) {
        orderBook.value = latestOrderBook.value;
      }
    });

    // 연결 상태 모니터링
    const status = manager.value.getConnectionStatus();
    isConnected.value = status.isConnected.value;
    connectionError.value = status.error.value;

    // 연결 상태 변경 감시
    watch(status.isConnected, (connected) => {
      isConnected.value = connected;
    });

    watch(status.error, (error) => {
      connectionError.value = error;
    });
  };

  /**
   * WebSocket 연결 시작
   */
  const connect = () => {
    if (!manager.value) {
      initializeManager();
    }

    manager.value?.connect(config.wsUrl, config.symbol);
  };

  /**
   * WebSocket 연결 해제
   */
  const disconnect = () => {
    manager.value?.disconnect();
  };

  /**
   * Throttle 간격 변경
   */
  const setThrottleInterval = (ms: number) => {
    throttleInterval.value = Math.max(100, Math.min(300, ms));
    manager.value?.setThrottleInterval(ms);
  };

  /**
   * 연결 재시도
   */
  const reconnect = () => {
    disconnect();
    setTimeout(() => {
      connect();
    }, 1000);
  };

  /**
   * 성능 통계
   */
  const performanceStats = computed(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTime.value;

    return {
      updateCount: updateCount.value,
      timeSinceLastUpdate,
      throttleInterval: throttleInterval.value,
      isConnected: isConnected.value,
    };
  });

  /**
   * 최신 체결 데이터 (최근 100개)
   */
  const recentTrades = computed(() => {
    return trades.value.slice(-100);
  });

  /**
   * 최신 호가 데이터 (상위 10개)
   */
  const topOrderBook = computed(() => {
    if (!orderBook.value) return null;

    return {
      symbol: orderBook.value.symbol,
      timestamp: orderBook.value.timestamp,
      bids: orderBook.value.bids.slice(0, 10),
      asks: orderBook.value.asks.slice(0, 10),
    };
  });

  // 컴포넌트 마운트 시 연결
  onMounted(() => {
    connect();
  });

  // 컴포넌트 언마운트 시 정리
  onUnmounted(() => {
    manager.value?.destroy();
  });

  return {
    // 상태
    trades: readonly(trades),
    orderBook: readonly(orderBook),
    isConnected: readonly(isConnected),
    connectionError: readonly(connectionError),
    throttleInterval: readonly(throttleInterval),

    // 계산된 값
    recentTrades,
    topOrderBook,
    performanceStats,

    // 메서드
    connect,
    disconnect,
    reconnect,
    setThrottleInterval,
  };
}
