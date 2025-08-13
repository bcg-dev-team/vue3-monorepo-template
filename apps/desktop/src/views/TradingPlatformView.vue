<template>
  <div class="trading-platform">
    <!-- 상단 컨트롤 패널 -->
    <div class="top-controls">
      <div class="left-controls">
        <div class="layout-controls">
          <button
            v-for="layout in chartLayouts"
            :key="layout.id"
            :class="['layout-btn', { active: currentLayout === layout.id }]"
            @click="setChartLayout(layout.id)"
          >
            {{ layout.label }}
          </button>
        </div>
        <div class="timeframe-controls">
          <button
            v-for="tf in timeframes"
            :key="tf.value"
            :class="['timeframe-btn', { active: currentTimeframe === tf.value }]"
            @click="setTimeframe(tf.value)"
          >
            {{ tf.label }}
          </button>
        </div>
      </div>
      <div class="right-controls">
        <div class="account-selector">
          <select v-model="selectedAccount" class="account-dropdown">
            <option value="account1">라이브계좌#1 110-81-345150</option>
            <option value="account2">데모계좌#1 110-81-345151</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 차트 영역 -->
      <div class="chart-area">
        <div class="chart-container" :class="getLayoutClass()">
          <div v-for="(chart, index) in activeCharts" :key="chart.id" class="chart-item">
            <div
              class="chart-header"
              @click="handleChartHeaderClick(chart.id)"
              :class="getChartHeaderClass(chart.id)"
            >
              <div class="chart-info">
                <span class="chart-symbol">{{ chart.symbol }}</span>
                <span class="chart-price">{{ chart.price }}</span>
                <span class="chart-change" :class="chart.change >= 0 ? 'positive' : 'negative'">
                  {{ chart.change >= 0 ? '+' : '' }}{{ chart.change }}%
                </span>
              </div>
              <div class="chart-controls">
                <button class="control-btn" @click="removeChart(chart.id)">×</button>
              </div>
            </div>
            <div :id="`chart_${chart.id}`" class="chart-wrapper"></div>
          </div>
        </div>
      </div>

      <!-- 우측 주문 패널 -->
      <div class="order-panel">
        <div class="panel-header">
          <h3>{{ selectedSymbol }}</h3>
          <div class="current-price">{{ currentPrice }}</div>
        </div>

        <!-- 주문 타입 탭 -->
        <div class="order-type-tabs">
          <button
            v-for="type in orderTypes"
            :key="type.value"
            :class="['order-tab', { active: selectedOrderType === type.value }]"
            @click="selectedOrderType = type.value"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- 매수/매도 버튼 -->
        <div class="trade-buttons">
          <button class="buy-btn" @click="placeOrder('buy')">
            <span class="btn-label">매수</span>
            <span class="btn-price">{{ buyPrice }}</span>
          </button>
          <button class="sell-btn" @click="placeOrder('sell')">
            <span class="btn-label">매도</span>
            <span class="btn-price">{{ sellPrice }}</span>
          </button>
        </div>

        <!-- 시장 정보 -->
        <div class="market-info">
          <div class="info-row">
            <span>스프레드:</span>
            <span>{{ spreadValue }}</span>
          </div>
          <div class="info-row">
            <span>고가:</span>
            <span>{{ highPrice }}</span>
          </div>
          <div class="info-row">
            <span>저가:</span>
            <span>{{ lowPrice }}</span>
          </div>
        </div>

        <!-- 수량 입력 -->
        <div class="quantity-section">
          <label>수량</label>
          <div class="quantity-controls">
            <button @click="decreaseQuantity">-</button>
            <span>{{ quantity }} Lot</span>
            <button @click="increaseQuantity">+</button>
          </div>
        </div>

        <!-- 주문 실행 버튼 -->
        <button class="execute-order-btn" @click="executeOrder">주문 실행</button>
      </div>
    </div>

    <!-- 하단 계정 정보 패널 -->
    <div class="bottom-panel">
      <div class="panel-tabs">
        <button
          v-for="tab in accountTabs"
          :key="tab.value"
          :class="['tab-btn', { active: activeAccountTab === tab.value }]"
          @click="activeAccountTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <!-- 청산 탭 (기본 선택) -->
        <div v-if="activeAccountTab === 'liquidation'" class="liquidation-table">
          <table>
            <thead>
              <tr>
                <th>주문</th>
                <th>종목코드</th>
                <th>통화</th>
                <th>L/S</th>
                <th>청산수량</th>
                <th>매입가격</th>
                <th>청산가격</th>
                <th>청산손익($)</th>
                <th>수수료($)</th>
                <th>스왑($)</th>
                <th>수익률(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="position in closedPositions" :key="position.order">
                <td>{{ position.order }}</td>
                <td>{{ position.symbol }}</td>
                <td>{{ position.currency }}</td>
                <td>
                  <span :class="['position-type', position.type === 'LONG' ? 'long' : 'short']">
                    {{ position.type }}
                  </span>
                </td>
                <td>{{ position.quantity.toLocaleString() }}</td>
                <td>{{ position.purchasePrice }}</td>
                <td>{{ position.liquidationPrice }}</td>
                <td>{{ position.pnl }}</td>
                <td>{{ position.commission }}</td>
                <td>{{ position.swap }}</td>
                <td :class="position.returnRate >= 0 ? 'positive' : 'negative'">
                  {{ position.returnRate >= 0 ? '+' : '' }}{{ position.returnRate }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import Datafeed from '../chart/datafeed.js';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { BrokerMinimal } from '../chart/broker';

// 차트 레이아웃 정의
const chartLayouts = [
  { id: 'single', label: '단일', charts: 1 },
  { id: '2x2', label: '2x2', charts: 4 },
  { id: '1x3', label: '1x3', charts: 3 },
  { id: '3x1', label: '3x1', charts: 3 },
];

// 시간대 정의
const timeframes = [
  { label: '1m', value: '1' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
];

// 주문 타입 정의
const orderTypes = [
  { label: '시장가', value: 'market' },
  { label: 'Limit', value: 'limit' },
  { label: 'Stop', value: 'stop' },
  { label: 'Stop Limit', value: 'stopLimit' },
];

// 계정 탭 정의
const accountTabs = [
  { label: '잔고', value: 'balance' },
  { label: '주문', value: 'orders' },
  { label: '미체결', value: 'pending' },
  { label: '청산', value: 'liquidation' },
];

// 반응형 상태
const currentLayout = ref('2x2');
const currentTimeframe = ref('1');
const selectedAccount = ref('account1');
const selectedOrderType = ref('market');
const selectedSymbol = ref('GBPUSD');
const activeAccountTab = ref('liquidation');

// 차트 관련 상태
const activeCharts = ref([
  { id: 1, symbol: 'ETH/EUR', price: '50000.00', change: 0.03 },
  { id: 2, symbol: 'BTC/EUR', price: '80000.00', change: -0.02 },
  { id: 3, symbol: 'ETH/EUR', price: '50000.00', change: 0.03 }, // 첫 번째와 동일
  { id: 4, symbol: 'BTC/EUR', price: '80000.00', change: -0.02 }, // 두 번째와 동일
]);

// 선택된 차트 상태
const selectedChartId = ref(1); // 기본적으로 첫 번째 차트 선택

// 가격 정보 (선택된 차트 기준으로 동적 계산)
const currentPrice = computed(() => {
  const selectedChart = activeCharts.value.find((chart) => chart.id === selectedChartId.value);
  return selectedChart ? selectedChart.price : '0.00';
});

const buyPrice = computed(() => {
  const price = parseFloat(currentPrice.value);
  const spread = parseFloat(spreadValue.value);
  return (price - spread / 2).toFixed(5);
});

const sellPrice = computed(() => {
  const price = parseFloat(currentPrice.value);
  const spread = parseFloat(spreadValue.value);
  return (price + spread / 2).toFixed(5);
});

// 스프레드 값 (고정)
const spreadValue = ref('0.3');

// 고가/저가 (선택된 차트 기준)
const highPrice = computed(() => {
  const selectedChart = activeCharts.value.find((chart) => chart.id === selectedChartId.value);
  if (!selectedChart) return '0.00';

  const basePrice = parseFloat(selectedChart.price);
  return (basePrice * 1.02).toFixed(5); // 2% 높은 가격
});

const lowPrice = computed(() => {
  const selectedChart = activeCharts.value.find((chart) => chart.id === selectedChartId.value);
  if (!selectedChart) return '0.00';

  const basePrice = parseFloat(selectedChart.price);
  return (basePrice * 0.98).toFixed(5); // 2% 낮은 가격
});

// 거래 정보
const quantity = ref(2.0);

// 청산된 포지션 데이터
const closedPositions = [
  {
    order: 71,
    symbol: 'AUD/USD',
    currency: 'USD',
    type: 'LONG',
    quantity: 1,
    purchasePrice: 1.10086,
    liquidationPrice: 1.10086,
    pnl: 1.10086,
    commission: 42.01,
    swap: 80.0,
    returnRate: 1.05,
  },
  {
    order: 12,
    symbol: 'AUD/USD',
    currency: 'USD',
    type: 'SHORT',
    quantity: 999999,
    purchasePrice: 1.10086,
    liquidationPrice: 999999,
    pnl: 1.10086,
    commission: 21.61,
    swap: 75.0,
    returnRate: -21.53,
  },
];

// TradingView 위젯들
const tvWidgets = ref<any[]>([]);

// 메서드들
// 레이아웃 변경 함수
const setChartLayout = (layoutId: string) => {
  console.log('[setChartLayout] 레이아웃 변경:', layoutId);
  currentLayout.value = layoutId;

  // 레이아웃에 따른 차트 개수 조정
  const layout = chartLayouts.find((l) => l.id === layoutId);
  if (layout) {
    const targetChartCount = layout.charts;

    if (activeCharts.value.length < targetChartCount) {
      // 차트 추가
      for (let i = activeCharts.value.length; i < targetChartCount; i++) {
        const newChart = {
          id: i + 1,
          symbol: activeCharts.value[i % activeCharts.value.length].symbol,
          price: activeCharts.value[i % activeCharts.value.length].price,
          change: activeCharts.value[i % activeCharts.value.length].change,
        };
        activeCharts.value.push(newChart);
      }
    } else if (activeCharts.value.length > targetChartCount) {
      // 차트 제거
      activeCharts.value = activeCharts.value.slice(0, targetChartCount);
    }

    // 차트 재초기화
    initializeCharts();
  }
};

// 레이아웃 CSS 클래스 반환 함수
const getLayoutClass = () => {
  switch (currentLayout.value) {
    case 'single':
      return 'single';
    case '2x2':
      return 'two-by-two';
    case '1x3':
      return 'one-by-three';
    case '3x1':
      return 'three-by-one';
    default:
      return 'single';
  }
};

const setTimeframe = (timeframe: string) => {
  currentTimeframe.value = timeframe;
  // 모든 차트의 시간대 변경
  tvWidgets.value.forEach((widget) => {
    if (widget && typeof widget.setSymbol === 'function') {
      const currentSymbol = widget.symbol();
      widget.setSymbol(currentSymbol, timeframe);
    }
  });
};

const removeChart = (chartId: number) => {
  const index = activeCharts.value.findIndex((chart) => chart.id === chartId);
  if (index !== -1) {
    activeCharts.value.splice(index, 1);
    // 차트 위젯도 제거
    if (tvWidgets.value[index]) {
      tvWidgets.value[index].remove();
      tvWidgets.value.splice(index, 1);
    }
  }
};

const increaseQuantity = () => {
  quantity.value += 0.1;
};

const decreaseQuantity = () => {
  if (quantity.value > 0.1) {
    quantity.value -= 0.1;
  }
};

const placeOrder = (side: 'buy' | 'sell') => {
  console.log(`${side} 주문 실행:`, {
    symbol: selectedSymbol.value,
    quantity: quantity.value,
    price: side === 'buy' ? buyPrice.value : sellPrice.value,
    orderType: selectedOrderType.value,
  });
};

const executeOrder = () => {
  console.log('주문 실행:', {
    symbol: selectedSymbol.value,
    orderType: selectedOrderType.value,
    quantity: quantity.value,
  });
};

// 차트 초기화
const initializeCharts = () => {
  console.log('[initializeCharts] 차트 초기화 시작');

  // 기존 차트들 제거
  tvWidgets.value.forEach((widget) => {
    if (widget) {
      widget.remove();
    }
  });
  tvWidgets.value = [];

  // 모든 차트를 순차적으로 생성 (비동기 처리)
  activeCharts.value.forEach((chart, index) => {
    console.log(
      `[initializeCharts] ${chart.symbol} 차트 생성 중... (${index + 1}/${activeCharts.value.length})`
    );

    // 각 차트 생성 사이에 약간의 지연을 두어 충돌 방지
    setTimeout(() => {
      createChart(chart, index);
    }, index * 500); // 500ms 간격으로 차트 생성
  });
};

const createChart = (chart: any, index: number) => {
  function waitForTradingView(cb: () => void) {
    if (window.TradingView && window.TradingView.widget) {
      cb();
    } else {
      setTimeout(() => waitForTradingView(cb), 100);
    }
  }

  waitForTradingView(() => {
    console.log(`[createChart] ${chart.symbol} 차트 생성 시작 (차트 ${index + 1})`);

    // ChartView.vue와 동일한 설정 사용
    const widget = new window.TradingView.widget({
      symbol: chart.symbol,
      interval: currentTimeframe.value,
      fullscreen: false,
      container: `chart_${chart.id}`,
      datafeed: Datafeed,
      library_path: '/charting_library/',
      width: 600, // 차트 크기 증가
      height: 400, // 차트 크기 증가
      locale: 'ko',
      debug: false,
      enabled_features: [
        'study_templates',
        'side_toolbar_in_fullscreen_mode',
        'header_compare',
        'compare_symbol',
        'show_spread_operators',
        'hide_price_scale_if_all_sources_hidden',
      ],
      disabled_features: [
        'use_localstorage_for_settings',
        'volume_force_overlay',
        'create_volume_indicator_by_default',
        'left_toolbar', // 왼쪽 도구모음 안보이게
        'header_widget', // 헤더 위젯 안보이게
        'header_symbol_search', // 헤더 위젯 안보이게
        'header_settings', // 헤더 위젯 안보이게
        'header_quick_search', // 헤더 위젯 안보이게
        'main_series_scale_menu', // 오른쪽하단 설정버튼 안보이게
        'right_toolbar',
      ],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      // 가격 스케일 및 차트 스타일 설정 (ChartView와 동일)
      overrides: {
        'mainSeriesProperties.style': 1, // 1 = 캔들스틱 차트
        'paneProperties.gridLinesMode': 'none', // 그리드 라인 숨기기
        'paneProperties.background': '#ffffff',
        'paneProperties.vertGridProperties.color': '#e6e6e6',
        'paneProperties.horzGridProperties.color': '#e6e6e6',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#191919',
        'scalesProperties.lineColor': '#b8b8b8',
      },
      studies_overrides: {},
      theme: 'light',
      custom_css_url: '',
      loading_screen: { backgroundColor: '#ffffff' },
      broker_factory: function (host: any) {
        return new BrokerMinimal(host, Datafeed);
      },
    });

    tvWidgets.value[index] = widget;

    // ChartView.vue와 동일한 방식으로 차트 로드 완료 처리
    widget.onChartReady(() => {
      console.log(`[TradingView] 차트 ${chart.symbol} 로드 완료 (차트 ${index + 1})`);

      // 차트가 완전히 로드될 때까지 잠시 대기
      setTimeout(() => {
        try {
          const chartInstance = widget.chart();

          // 차트와 패널이 존재하는지 확인
          if (chartInstance && chartInstance.getPanes && chartInstance.getPanes().length > 0) {
            const panes = chartInstance.getPanes();
            const firstPane = panes[0];

            // getRightPriceScale 메서드가 존재하는지 확인
            if (firstPane && typeof firstPane.getRightPriceScale === 'function') {
              const priceScale = firstPane.getRightPriceScale();

              if (priceScale) {
                console.log(
                  `[TradingView] ${chart.symbol} 차트 ${index + 1} 가격 스케일 설정 적용`
                );
                priceScale.setAutoScale(true);
                priceScale.setVisible(true);
              } else {
                console.warn(
                  `[TradingView] ${chart.symbol} 차트 ${index + 1} 가격 스케일을 찾을 수 없습니다.`
                );
              }
            } else {
              console.warn(
                `[TradingView] ${chart.symbol} 차트 ${index + 1} getRightPriceScale 메서드를 사용할 수 없습니다.`
              );
            }
          } else {
            console.warn(
              `[TradingView] ${chart.symbol} 차트 ${index + 1} 차트 패널을 찾을 수 없습니다.`
            );
          }

          // 심볼 정보 확인
          if (chartInstance && typeof chartInstance.symbolExt === 'function') {
            const symbolInfo = chartInstance.symbolExt();
            console.log(
              `[TradingView] ${chart.symbol} 차트 ${index + 1} 현재 심볼 정보:`,
              symbolInfo
            );
          }

          // 시간 축 설정 강제 적용
          if (chartInstance && typeof chartInstance.timeScale === 'function') {
            const timeScale = chartInstance.timeScale();
            if (timeScale) {
              console.log(`[TradingView] ${chart.symbol} 차트 ${index + 1} 시간 축 설정 적용`);
              timeScale.setVisible(true);
              timeScale.setTimeVisible(true);
              timeScale.setSecondsVisible(false);

              // 현재 간격에 따른 시간 표시 형식 설정
              const currentInterval = currentTimeframe.value;
              console.log(
                `[TradingView] ${chart.symbol} 차트 ${index + 1} 현재 간격:`,
                currentInterval
              );

              // 시간 축 새로고침
              timeScale.refresh();
            }
          }

          // 차트 스타일 강제 새로고침
          if (chartInstance && typeof chartInstance.refresh === 'function') {
            console.log(`[TradingView] ${chart.symbol} 차트 ${index + 1} 차트 새로고침 실행`);
            chartInstance.refresh();
          }

          // 차트에 주문 라인 그리기 기능 추가
          addOrderLineDrawing(widget, chart.symbol);
        } catch (error) {
          console.error(
            `[TradingView] ${chart.symbol} 차트 ${index + 1} 차트 설정 중 오류 발생:`,
            error
          );
        }
      }, 1000); // 1초 대기
    });
  });
};

// 주문 라인 그리기 기능
const addOrderLineDrawing = (widget: any, symbol: string) => {
  const chart = widget.chart();
  if (chart) {
    // 차트에 그리기 도구 활성화
    chart.setCrosshairMode(1); // 크로스헤어 모드

    // 마우스 이벤트로 라인 그리기
    let isDrawing = false;
    let startPrice = 0;
    let startTime = 0;

    chart.subscribeCrosshairMove((param: any) => {
      if (isDrawing && param.time && param.seriesPrices) {
        const currentPrice = param.seriesPrices.get(chart.getVisibleRange().from);
        if (currentPrice) {
          // 라인 업데이트 로직
        }
      }
    });

    // 차트 클릭 이벤트
    chart.subscribeClick((param: any) => {
      if (param.time && param.seriesPrices) {
        const price = param.seriesPrices.get(chart.getVisibleRange().from);
        if (price) {
          console.log(`${symbol} 차트 클릭:`, { time: param.time, price });
          // 여기에 주문 라인 그리기 로직 추가
        }
      }
    });
  }
};

// 차트 선택 함수
const selectChart = (chartId: number) => {
  console.log(`[selectChart] 차트 ${chartId} 선택됨`);
  selectedChartId.value = chartId;

  // 선택된 차트의 심볼을 우측 패널에 표시
  const selectedChart = activeCharts.value.find((chart) => chart.id === chartId);
  if (selectedChart) {
    selectedSymbol.value = selectedChart.symbol;
  }
};

// 실시간 가격 업데이트 함수
const updateChartPrices = () => {
  activeCharts.value.forEach((chart, index) => {
    // 각 차트마다 약간 다른 가격 변동 시뮬레이션
    const change = (Math.random() - 0.5) * 0.01; // -0.5% ~ +0.5% 변동
    const currentPrice = parseFloat(chart.price);
    const newPrice = Math.max(currentPrice * (1 + change), currentPrice * 0.99);

    // 가격 업데이트
    chart.price = newPrice.toFixed(2);

    // 변화율 업데이트 (간단한 시뮬레이션)
    chart.change = parseFloat((Math.random() * 4 - 2).toFixed(2)); // -2% ~ +2%
  });

  console.log('[updateChartPrices] 차트 가격 업데이트 완료:', activeCharts.value);
};

// 차트 헤더 클릭 이벤트 추가
const handleChartHeaderClick = (chartId: number) => {
  selectChart(chartId);
};

// 차트 헤더 클래스 계산
const getChartHeaderClass = (chartId: number) => {
  return {
    'chart-header': true,
    selected: chartId === selectedChartId.value,
    clickable: true,
  };
};

// 심볼 변경 감지
watch(selectedSymbol, (newSymbol) => {
  // 우측 패널의 심볼 정보 업데이트
  currentPrice.value = (Math.random() * 2 + 0.5).toFixed(5);
  buyPrice.value = (parseFloat(currentPrice.value) - 0.00016).toFixed(5);
  sellPrice.value = (parseFloat(currentPrice.value) + 0.00016).toFixed(5);

  // 스프레드는 고정값이므로 업데이트하지 않음
  console.log('[updatePrices] 가격 업데이트 완료');
});

// 생명주기 훅
onMounted(() => {
  console.log('[TradingPlatformView] 컴포넌트 마운트됨');

  // 차트 초기화
  initializeCharts();

  // 실시간 가격 업데이트 타이머 설정 (3초마다)
  const priceUpdateTimer = setInterval(() => {
    updateChartPrices();
  }, 3000);

  // 컴포넌트 언마운트 시 타이머 정리
  onUnmounted(() => {
    clearInterval(priceUpdateTimer);
  });
});
</script>

<style scoped>
/* 메인 레이아웃 */
.trading-platform {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
}

/* 상단 컨트롤 패널 */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.layout-controls {
  display: flex;
  gap: 0.5rem;
}

.layout-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.layout-btn:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

.layout-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.timeframe-controls {
  display: flex;
  gap: 0.5rem;
}

.timeframe-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.timeframe-btn:hover {
  background: #f8f9fa;
}

.timeframe-btn.active {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

/* 메인 콘텐츠 영역 */
.main-content {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

/* 차트 영역 */
.chart-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-container {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  min-height: 600px;
  overflow: auto;
}

.chart-container.single {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.chart-container.two-by-two {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  min-height: 700px;
}

.chart-container.one-by-three {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  min-height: 500px;
}

.chart-container.three-by-one {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  min-height: 800px;
}

.chart-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.chart-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #007bff;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.2s ease;
}

.chart-header.clickable {
  cursor: pointer;
}

.chart-header.clickable:hover {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 0.5rem;
  margin: -0.5rem -0.5rem 0.5rem -0.5rem;
}

.chart-header.selected {
  background: #e3f2fd;
  border-color: #2196f3;
  border-radius: 6px;
  padding: 0.5rem;
  margin: -0.5rem -0.5rem 0.5rem -0.5rem;
}

.chart-header.selected .chart-symbol {
  color: #1976d2;
  font-weight: 700;
}

.chart-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.chart-symbol {
  font-weight: 600;
  font-size: 1rem;
  color: #212529;
}

.chart-price {
  font-size: 0.875rem;
  color: #6c757d;
}

.chart-change {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
}

.chart-change.positive {
  background: #d4edda;
  color: #155724;
}

.chart-change.negative {
  background: #f8d7da;
  color: #721c24;
}

.chart-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  width: 24px;
  height: 24px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #6c757d;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
  color: #495057;
}

.chart-wrapper {
  flex: 1;
  min-height: 300px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

/* 우측 주문 패널 */
.order-panel {
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel-header {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.panel-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #007bff;
}

/* 주문 타입 탭 */
.order-type-tabs {
  display: flex;
  gap: 0.5rem;
  border-radius: 8px;
  padding: 0.25rem;
  background: #f8f9fa;
}

.order-tab {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.order-tab:hover {
  background: #e9ecef;
}

.order-tab.active {
  background: #007bff;
  color: white;
}

/* 매수/매도 버튼 */
.trade-buttons {
  display: flex;
  gap: 1rem;
}

.buy-btn,
.sell-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.buy-btn {
  background: #28a745;
  color: white;
}

.buy-btn:hover {
  background: #218838;
  transform: translateY(-1px);
}

.sell-btn {
  background: #dc3545;
  color: white;
}

.sell-btn:hover {
  background: #c82333;
  transform: translateY(-1px);
}

.btn-label {
  font-size: 0.875rem;
}

.btn-price {
  font-size: 1.125rem;
}

/* 시장 정보 */
.market-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span:first-child {
  color: #6c757d;
  font-size: 0.875rem;
}

.info-row span:last-child {
  font-weight: 600;
  color: #212529;
}

/* 수량 입력 */
.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quantity-section label {
  font-weight: 600;
  color: #212529;
  font-size: 0.875rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.quantity-controls button:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

.quantity-controls span {
  font-weight: 600;
  color: #212529;
  min-width: 80px;
  text-align: center;
}

/* 주문 실행 버튼 */
.execute-order-btn {
  padding: 1rem;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.execute-order-btn:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

/* 하단 계정 정보 패널 */
.bottom-panel {
  background: white;
  border-radius: 12px;
  margin: 0 1rem 1rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid #e9ecef;
}

.tab-btn {
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: #495057;
  background: #f8f9fa;
}

.tab-btn.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-content {
  padding: 1.5rem;
}

/* 청산 테이블 */
.liquidation-table table {
  width: 100%;
  border-collapse: collapse;
}

.liquidation-table th,
.liquidation-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.liquidation-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
}

.liquidation-table td {
  color: #212529;
  font-size: 0.875rem;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .order-panel {
    width: 280px;
  }

  .chart-container.two-by-two {
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .order-panel {
    width: 100%;
  }

  .chart-container {
    min-height: 400px;
  }

  .chart-container.two-by-two {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  .chart-container.one-by-three {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .chart-container.three-by-one {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
}
</style>
