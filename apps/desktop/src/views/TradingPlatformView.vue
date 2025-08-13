<template>
  <div class="trading-platform">
    <!-- 상단 툴바 -->
    <div class="top-toolbar">
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
      <div class="charts-container" :class="`layout-${currentLayout}`">
        <div
          v-for="(chart, index) in activeCharts"
          :key="chart.id"
          :class="['chart-wrapper', `chart-${index + 1}`]"
        >
          <div class="chart-header">
            <div class="symbol-info">
              <span class="symbol">{{ chart.symbol }}</span>
              <span class="price">{{ chart.price }}</span>
              <span class="change" :class="chart.change >= 0 ? 'positive' : 'negative'">
                {{ chart.change >= 0 ? '+' : '' }}{{ chart.change }}%
              </span>
            </div>
            <div class="chart-controls">
              <button class="control-btn" @click="removeChart(chart.id)">×</button>
            </div>
          </div>
          <div :id="`chart_${chart.id}`" class="chart-container"></div>
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
            <span>{{ spread }}</span>
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
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import Datafeed from '../chart/datafeed.js';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { BrokerMinimal } from '../chart/broker';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { getLastBar } from '../chart/datafeed.js';

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
  {
    id: 1,
    symbol: 'ETH/EUR',
    price: '0.00',
    change: 0.0,
    lastPrice: 0.0, // 실제 마지막 가격
    previousPrice: 0.0, // 이전 가격 (변화율 계산용)
  },
]);

// 가격 정보
const currentPrice = ref('0.00000');
const buyPrice = ref('0.00000');
const sellPrice = ref('0.00000');
const spread = ref('0.0');
const highPrice = ref('0.00000');
const lowPrice = ref('0.00000');

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
const setChartLayout = (layoutId: string) => {
  currentLayout.value = layoutId;
  const layout = chartLayouts.find((l) => l.id === layoutId);
  if (layout) {
    // 차트 개수에 맞게 activeCharts 조정
    if (layout.charts < activeCharts.value.length) {
      activeCharts.value = activeCharts.value.slice(0, layout.charts);
    } else if (layout.charts > activeCharts.value.length) {
      // 추가 차트 생성
      const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'NZDUSD'];
      for (let i = activeCharts.value.length; i < layout.charts; i++) {
        const symbol = symbols[i % symbols.length];
        activeCharts.value.push({
          id: Date.now() + i,
          symbol,
          price: '0.00',
          change: 0.0,
          lastPrice: 0.0,
          previousPrice: 0.0,
        });
      }
    }

    // 차트 레이아웃 재구성
    setTimeout(() => {
      initializeCharts();

      // 레이아웃 변경 후 추가 지연을 두고 차트 크기 재조정
      setTimeout(() => {
        resizeAllCharts();
      }, 200);
    }, 100);
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
    if (widget && typeof widget.remove === 'function') {
      widget.remove();
    }
  });
  tvWidgets.value = [];

  // 첫 번째 차트만 즉시 생성
  if (activeCharts.value.length > 0) {
    console.log('[initializeCharts] 첫 번째 차트 생성:', activeCharts.value[0].symbol);
    createChart(activeCharts.value[0], 0);
  }
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
    console.log(`[createChart] ${chart.symbol} 차트 생성 시작`);

    // 차트 컨테이너 요소 가져오기
    const container = document.getElementById(`chart_${chart.id}`);
    if (!container) {
      console.error(`[createChart] 차트 컨테이너를 찾을 수 없습니다: chart_${chart.id}`);
      return;
    }

    // 컨테이너 크기 계산
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width || 400;
    const height = containerRect.height || 300;

    console.log(`[createChart] 컨테이너 크기: ${width}x${height}`);

    // ChartView.vue와 동일한 설정 사용
    const widget = new window.TradingView.widget({
      symbol: chart.symbol,
      interval: currentTimeframe.value,
      fullscreen: false,
      container: `chart_${chart.id}`,
      datafeed: Datafeed,
      library_path: '/charting_library/',
      width: width,
      height: height,
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
      console.log(`[TradingView] 차트 ${chart.symbol} 로드 완료`);

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
                console.log(`[TradingView] ${chart.symbol} 가격 스케일 설정 적용`);
                priceScale.setAutoScale(true);
                priceScale.setVisible(true);
              } else {
                console.warn(`[TradingView] ${chart.symbol} 가격 스케일을 찾을 수 없습니다.`);
              }
            } else {
              console.warn(
                `[TradingView] ${chart.symbol} getRightPriceScale 메서드를 사용할 수 없습니다.`
              );
            }
          } else {
            console.warn(`[TradingView] ${chart.symbol} 차트 패널을 찾을 수 없습니다.`);
          }

          // 심볼 정보 확인
          if (chartInstance && typeof chartInstance.symbolExt === 'function') {
            const symbolInfo = chartInstance.symbolExt();
            console.log(`[TradingView] ${chart.symbol} 현재 심볼 정보:`, symbolInfo);
          }

          // 시간 축 설정 강제 적용
          if (chartInstance && typeof chartInstance.timeScale === 'function') {
            const timeScale = chartInstance.timeScale();
            if (timeScale) {
              console.log(`[TradingView] ${chart.symbol} 시간 축 설정 적용`);
              timeScale.setVisible(true);
              timeScale.setTimeVisible(true);
              timeScale.setSecondsVisible(false);

              // 현재 간격에 따른 시간 표시 형식 설정
              const currentInterval = currentTimeframe.value;
              console.log(`[TradingView] ${chart.symbol} 현재 간격:`, currentInterval);

              // 시간 축 새로고침
              timeScale.refresh();
            }
          }

          // 차트 스타일 강제 새로고침
          if (chartInstance && typeof chartInstance.refresh === 'function') {
            console.log(`[TradingView] ${chart.symbol} 차트 새로고침 실행`);
            chartInstance.refresh();
          }

          // 차트에 주문 라인 그리기 기능 추가
          addOrderLineDrawing(widget, chart.symbol);

          // 차트 크기 조정
          resizeChart(widget, container);

          // 초기 차트 데이터 로드
          loadInitialChartData(widget, chart);

          // 실시간 데이터 변경 감지
          setupRealtimeDataListener(widget, chart);
        } catch (error) {
          console.error(`[TradingView] ${chart.symbol} 차트 설정 중 오류 발생:`, error);
        }
      }, 1000); // 1초 대기
    });

    // 리사이즈 이벤트 리스너 추가
    const resizeObserver = new ResizeObserver(() => {
      resizeChart(widget, container);
    });
    resizeObserver.observe(container);
  });
};

// 실시간 데이터 변경 감지 설정
const setupRealtimeDataListener = (widget: any, chart: any) => {
  try {
    const chartInstance = widget.chart();
    if (chartInstance && typeof chartInstance.subscribeCrosshairMove === 'function') {
      // 크로스헤어 이동 시 데이터 업데이트
      chartInstance.subscribeCrosshairMove((param: any) => {
        if (param.time && param.seriesPrices) {
          const currentPrice = param.seriesPrices.get(chartInstance.getVisibleRange().from);
          if (currentPrice && currentPrice !== chart.lastPrice) {
            // 가격이 변경된 경우에만 업데이트
            updateChartPriceData(widget, chart);
          }
        }
      });

      // 차트 데이터 변경 감지
      if (typeof chartInstance.subscribeDataChanged === 'function') {
        chartInstance.subscribeDataChanged(() => {
          // 새로운 데이터가 추가되면 가격 정보 업데이트
          updateChartPriceData(widget, chart);
        });
      }
    }
  } catch (error) {
    console.error(
      `[setupRealtimeDataListener] ${chart.symbol} 실시간 데이터 리스너 설정 중 오류:`,
      error
    );
  }
};

// 차트에서 실제 가격 데이터 가져오기
const updateChartPriceData = (widget: any, chart: any) => {
  try {
    const chartInstance = widget.chart();
    if (chartInstance && typeof chartInstance.getVisibleRange === 'function') {
      const visibleRange = chartInstance.getVisibleRange();
      if (visibleRange && visibleRange.to) {
        // 차트의 마지막 데이터 포인트에서 가격 가져오기
        const lastBar = chartInstance.getLastBar();
        if (lastBar && lastBar.close) {
          const newPrice = lastBar.close;
          const previousPrice = chart.lastPrice || newPrice;

          // 가격 업데이트
          chart.lastPrice = newPrice;
          chart.previousPrice = previousPrice;
          chart.price = newPrice.toFixed(5);

          // 변화율 계산
          if (previousPrice > 0) {
            const changePercent = ((newPrice - previousPrice) / previousPrice) * 100;
            chart.change = parseFloat(changePercent.toFixed(2));
          }

          console.log(`[updateChartPriceData] ${chart.symbol} 가격 업데이트:`, {
            price: chart.price,
            change: chart.change,
            lastPrice: chart.lastPrice,
          });

          // 첫 번째 차트인 경우 현재 가격 정보도 업데이트
          if (chart.id === activeCharts.value[0].id) {
            updateCurrentPriceInfo(chart);
          }
        }
      }
    }
  } catch (error) {
    console.error(`[updateChartPriceData] ${chart.symbol} 가격 데이터 업데이트 중 오류:`, error);
  }
};

// 차트 초기 로드 시 시고저종 데이터 가져오기
const loadInitialChartData = (widget: any, chart: any) => {
  try {
    const chartInstance = widget.chart();
    if (chartInstance && typeof chartInstance.getVisibleRange === 'function') {
      // 차트에 충분한 데이터가 로드될 때까지 대기
      setTimeout(() => {
        try {
          // datafeed에서 마지막 바 데이터 가져오기
          const symbolName = chart.symbol;
          const lastBar = getLastBar(symbolName);

          if (lastBar && lastBar.close) {
            // 초기 가격 데이터 설정
            chart.lastPrice = lastBar.close;
            chart.previousPrice = lastBar.close;
            chart.price = lastBar.close.toFixed(5);
            chart.change = 0.0;

            // datafeed에서 가져온 고가/저가 사용
            chart.highPrice = lastBar.high;
            chart.lowPrice = lastBar.low;

            console.log(`[loadInitialChartData] ${chart.symbol} 초기 데이터 로드:`, {
              price: chart.price,
              highPrice: chart.highPrice,
              lowPrice: chart.lowPrice,
              source: 'datafeed',
            });

            // 첫 번째 차트인 경우 현재 가격 정보도 업데이트
            if (chart.id === activeCharts.value[0].id) {
              updateCurrentPriceInfo(chart);
            }
          } else {
            // datafeed에서 데이터를 가져올 수 없는 경우 차트 인스턴스에서 가져오기
            console.log(
              `[loadInitialChartData] ${chart.symbol} datafeed에서 데이터를 찾을 수 없음, 차트 인스턴스에서 가져오기`
            );
            const chartLastBar = chartInstance.getLastBar();
            if (chartLastBar && chartLastBar.close) {
              // 초기 가격 데이터 설정
              chart.lastPrice = chartLastBar.close;
              chart.previousPrice = chartLastBar.close;
              chart.price = chartLastBar.close.toFixed(5);
              chart.change = 0.0;

              // 고가/저가 데이터 수집 (최근 100개 캔들 기준)
              let highPrice = chartLastBar.high;
              let lowPrice = chartLastBar.low;

              // 차트에서 최근 데이터 포인트들을 가져와서 고가/저가 계산
              const visibleRange = chartInstance.getVisibleRange();
              if (visibleRange) {
                // 최근 100개 캔들 데이터 수집
                const dataPoints = chartInstance.getVisibleLogicalRange();
                if (dataPoints) {
                  const endIndex = Math.floor(dataPoints.to);
                  const startIndex = Math.max(0, endIndex - 100);

                  for (let i = startIndex; i <= endIndex; i++) {
                    const bar = chartInstance.getBar(i);
                    if (bar) {
                      if (bar.high > highPrice) highPrice = bar.high;
                      if (bar.low < lowPrice) lowPrice = bar.low;
                    }
                  }
                }
              }

              // 차트 데이터 저장
              chart.highPrice = highPrice;
              chart.lowPrice = lowPrice;

              console.log(
                `[loadInitialChartData] ${chart.symbol} 차트 인스턴스에서 초기 데이터 로드:`,
                {
                  price: chart.price,
                  highPrice: chart.highPrice,
                  lowPrice: chart.lowPrice,
                  source: 'chartInstance',
                }
              );

              // 첫 번째 차트인 경우 현재 가격 정보도 업데이트
              if (chart.id === activeCharts.value[0].id) {
                updateCurrentPriceInfo(chart);
              }
            }
          }
        } catch (error) {
          console.error(`[loadInitialChartData] ${chart.symbol} 초기 데이터 로드 중 오류:`, error);
        }
      }, 2000); // 차트 데이터 로드 완료까지 2초 대기
    }
  } catch (error) {
    console.error(`[loadInitialChartData] ${chart.symbol} 초기 데이터 로드 중 오류:`, error);
  }
};

// 현재 가격 정보 업데이트
const updateCurrentPriceInfo = (chart: any) => {
  if (chart.lastPrice > 0) {
    const price = chart.lastPrice;
    const spreadValue = 0.00016; // 스프레드 값

    currentPrice.value = price.toFixed(5);
    buyPrice.value = (price - spreadValue).toFixed(5);
    sellPrice.value = (price + spreadValue).toFixed(5);

    // 실제 차트 데이터에서 가져온 고가/저가 사용
    if (chart.highPrice && chart.lowPrice) {
      highPrice.value = chart.highPrice.toFixed(5);
      lowPrice.value = chart.lowPrice.toFixed(5);
    } else {
      // 백업: 현재 가격 기준으로 계산
      highPrice.value = (price + Math.random() * 0.01).toFixed(5);
      lowPrice.value = (price - Math.random() * 0.01).toFixed(5);
    }

    // 스프레드 업데이트
    spread.value = (spreadValue * 2 * 10000).toFixed(1); // pip 단위로 변환

    console.log(`[updateCurrentPriceInfo] 현재 가격 정보 업데이트:`, {
      currentPrice: currentPrice.value,
      buyPrice: buyPrice.value,
      sellPrice: sellPrice.value,
      highPrice: highPrice.value,
      lowPrice: lowPrice.value,
    });
  }
};

// 차트 크기 조정 함수
const resizeChart = (widget: any, container: HTMLElement) => {
  try {
    const containerRect = container.getBoundingClientRect();
    const width = Math.max(containerRect.width, 100);
    const height = Math.max(containerRect.height, 100);

    console.log(`[resizeChart] 차트 크기 조정: ${width}x${height}`);

    // 위젯 크기 조정
    if (widget && typeof widget.resize === 'function') {
      widget.resize(width, height);
    }

    // 차트 인스턴스 크기 조정
    const chartInstance = widget.chart();
    if (chartInstance && typeof chartInstance.resize === 'function') {
      chartInstance.resize(width, height);
    }
  } catch (error) {
    console.error('[resizeChart] 차트 크기 조정 중 오류 발생:', error);
  }
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

// 심볼 변경 감지
watch(selectedSymbol, (newSymbol) => {
  // 선택된 심볼이 변경되면 해당 차트를 찾아서 가격 정보 업데이트
  const targetChart = activeCharts.value.find((chart) => chart.symbol === newSymbol);
  if (targetChart && targetChart.lastPrice > 0) {
    updateCurrentPriceInfo(targetChart);
  }
});

// 컴포넌트 마운트 시 차트 초기화
onMounted(() => {
  setTimeout(() => {
    initializeCharts();
  }, 500);
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  // 모든 차트 위젯 정리
  tvWidgets.value.forEach((widget) => {
    if (widget && typeof widget.remove === 'function') {
      widget.remove();
    }
  });
  tvWidgets.value = [];
});

// 모든 차트 크기 재조정
const resizeAllCharts = () => {
  activeCharts.value.forEach((chart, index) => {
    const container = document.getElementById(`chart_${chart.id}`);
    if (container && tvWidgets.value[index]) {
      resizeChart(tvWidgets.value[index], container);
    }
  });
};
</script>

<style scoped>
.trading-platform {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 상단 툴바 */
.top-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-controls {
  display: flex;
  gap: 16px;
}

.layout-controls,
.timeframe-controls {
  display: flex;
  gap: 4px;
}

.layout-btn,
.timeframe-btn {
  padding: 6px 12px;
  border: 1px solid #d0d0d0;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.layout-btn:hover,
.timeframe-btn:hover {
  background-color: #f0f0f0;
}

.layout-btn.active,
.timeframe-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.account-dropdown {
  padding: 6px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 12px;
}

/* 메인 콘텐츠 */
.main-content {
  display: flex;
  flex: 1;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
  min-height: 0; /* Flexbox 오버플로우 방지 */
}

/* 차트 컨테이너 */
.charts-container {
  flex: 1;
  display: grid;
  gap: 16px;
  overflow: hidden;
  min-height: 0; /* Grid 오버플로우 방지 */
  height: 100%; /* 전체 높이 사용 */
  align-items: stretch; /* 차트를 동일한 높이로 정렬 */
}

.layout-single {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.layout-2x2 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.layout-1x3 {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.layout-3x1 {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

/* 반응형 그리드 레이아웃 */
@media (max-width: 1200px) {
  .layout-2x2 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  .layout-3x1 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }

  .order-panel {
    width: 100%;
    order: -1; /* 모바일에서는 주문 패널을 상단에 배치 */
  }

  .charts-container {
    gap: 12px;
  }

  .chart-wrapper {
    min-height: 300px; /* 모바일에서 최소 높이 보장 */
  }
}

.chart-wrapper {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Flexbox 오버플로우 방지 */
  height: 100%; /* 전체 높이 사용 */
  position: relative; /* 차트 컨테이너의 기준점 */
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0; /* 헤더 크기 고정 */
}

.symbol-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap; /* 긴 심볼명 처리 */
}

.symbol {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap; /* 심볼명 줄바꿈 방지 */
}

.price {
  font-size: 12px;
  color: #666;
}

.change {
  font-size: 12px;
  font-weight: 500;
}

.change.positive {
  color: #28a745;
}

.change.negative {
  color: #dc3545;
}

.control-btn {
  width: 24px;
  height: 24px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0; /* 버튼 크기 고정 */
}

.chart-container {
  flex: 1;
  min-height: 0; /* Flexbox 오버플로우 방지 */
  width: 100%;
  position: relative;
  overflow: hidden; /* 차트 오버플로우 방지 */
  display: flex; /* 차트를 컨테이너에 맞춤 */
  align-items: center; /* 차트를 중앙 정렬 */
  justify-content: center; /* 차트를 중앙 정렬 */
}

/* 우측 주문 패널 */
.order-panel {
  width: 320px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.panel-header {
  margin-bottom: 20px;
  text-align: center;
}

.panel-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.current-price {
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
}

/* 주문 타입 탭 */
.order-type-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 20px;
}

.order-tab {
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  transition: all 0.2s;
}

.order-tab:hover {
  background-color: #f0f0f0;
}

.order-tab.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* 매수/매도 버튼 */
.trade-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.buy-btn,
.sell-btn {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.buy-btn {
  background-color: #dc3545;
  color: white;
}

.buy-btn:hover {
  background-color: #c82333;
}

.sell-btn {
  background-color: #007bff;
  color: white;
}

.sell-btn:hover {
  background-color: #0056b3;
}

.btn-label {
  font-size: 14px;
}

.btn-price {
  font-size: 16px;
}

/* 시장 정보 */
.market-info {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.info-row:last-child {
  margin-bottom: 0;
}

/* 수량 섹션 */
.quantity-section {
  margin-bottom: 20px;
}

.quantity-section label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: 1px solid #d0d0d0;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

.quantity-controls span {
  font-size: 16px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
}

/* 주문 실행 버튼 */
.execute-order-btn {
  width: 100%;
  padding: 16px;
  background-color: #ffc107;
  color: #212529;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.execute-order-btn:hover {
  background-color: #e0a800;
}

/* 하단 패널 */
.bottom-panel {
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: #f8f9fa;
}

.tab-btn.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: 500;
}

.tab-content {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
}

/* 청산 테이블 */
.liquidation-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.liquidation-table th,
.liquidation-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.liquidation-table th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #666;
}

.position-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.position-type.long {
  background-color: #dc3545;
  color: white;
}

.position-type.short {
  background-color: #007bff;
  color: white;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}
</style>
