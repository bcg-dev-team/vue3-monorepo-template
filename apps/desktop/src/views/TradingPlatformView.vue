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
            <div 
              :id="`chart_${chart.id}`" 
              class="chart-wrapper"
            >
              <!-- 컨텍스트 메뉴를 위한 투명 오버레이 -->
              <div 
                class="chart-overlay"
                :data-context-menu="true"
                @contextmenu.prevent="handleChartContextMenu($event, chart.id)"
                @mousedown="handleOverlayMouseDown"
                @mouseup="handleOverlayMouseUp"
                @mousemove="handleOverlayMouseMove"
              ></div>
            </div>
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

    <!-- 커스텀 컨텍스트 메뉴 -->
    <div 
      v-if="showContextMenu" 
      class="context-menu"
      :style="contextMenuStyle"
      @click.stop
    >
      <div class="menu-header">
        <span class="menu-title">주문 설정</span>
        <button class="close-btn" @click="hideContextMenu">×</button>
      </div>
      
      <div class="menu-section">
        <h4>현재 가격: {{ contextMenuPrice }}</h4>
        <div class="price-info">
          <span class="price-label">가격:</span>
          <input 
            v-model="contextMenuOrderPrice" 
            type="number" 
            step="0.00001" 
            class="price-input"
            @input="updateOrderPreview"
          />
        </div>
        <div class="quantity-info">
          <span class="quantity-label">수량:</span>
          <input 
            v-model="contextMenuOrderQuantity" 
            type="number" 
            step="0.1" 
            class="quantity-input"
            @input="updateOrderPreview"
          />
        </div>
      </div>

      <div class="menu-section">
        <h4>주문 타입</h4>
        <div class="order-type-buttons">
          <button 
            class="order-type-btn buy"
            :class="{ active: contextMenuOrderType === 'limit-buy' }"
            @click="setOrderType('limit-buy')"
          >
            Limit 매수
          </button>
          <button 
            class="order-type-btn sell"
            :class="{ active: contextMenuOrderType === 'limit-sell' }"
            @click="setOrderType('limit-sell')"
          >
            Limit 매도
          </button>
        </div>
        <div class="order-type-buttons">
          <button 
            class="order-type-btn buy"
            :class="{ active: contextMenuOrderType === 'stop-buy' }"
            @click="setOrderType('stop-buy')"
          >
            Stop 매수
          </button>
          <button 
            class="order-type-btn sell"
            :class="{ active: contextMenuOrderType === 'stop-sell' }"
            @click="setOrderType('stop-sell')"
          >
            Stop 매도
          </button>
        </div>
      </div>

      <div class="menu-section">
        <h4>주문 미리보기</h4>
        <div class="order-preview">
          <div class="preview-row">
            <span>주문 타입:</span>
            <span class="preview-value">{{ getOrderTypeLabel(contextMenuOrderType) }}</span>
          </div>
          <div class="preview-row">
            <span>가격:</span>
            <span class="preview-value">{{ contextMenuOrderPrice }}</span>
          </div>
          <div class="preview-row">
            <span>수량:</span>
            <span class="preview-value">{{ contextMenuOrderQuantity }} Lot</span>
          </div>
        </div>
      </div>

      <div class="menu-actions">
        <button class="action-btn cancel" @click="hideContextMenu">취소</button>
        <button class="action-btn confirm" @click="placeContextMenuOrder">주문 실행</button>
      </div>
    </div>

    <!-- 주문 라인 정보 패널 -->
    <div v-if="showOrderLineInfo" class="order-line-info" :style="orderLineInfoStyle">
      <div class="info-header">
        <span class="info-title">주문 라인 정보</span>
        <button class="close-btn" @click="hideOrderLineInfo">×</button>
      </div>
      <div class="info-content">
        <div class="info-row">
          <span>주문 타입:</span>
          <span class="info-value">{{ selectedOrderLine?.type }}</span>
        </div>
        <div class="info-row">
          <span>가격:</span>
          <span class="info-value">{{ selectedOrderLine?.price }}</span>
        </div>
        <div class="info-row">
          <span>수량:</span>
          <span class="info-value">{{ selectedOrderLine?.quantity }} Lot</span>
        </div>
        <div class="info-row">
          <span>상태:</span>
          <span class="info-value">{{ selectedOrderLine?.status }}</span>
        </div>
      </div>
      <div class="info-actions">
        <button class="action-btn delete" @click="deleteOrderLine">삭제</button>
        <button class="action-btn modify" @click="modifyOrderLine">수정</button>
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
import { ref, reactive, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import Datafeed from '../chart/datafeed.js';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { BrokerMinimal } from '../chart/broker';
import './TradingPlatformView.css';

// window 객체에 추가 속성들을 위한 타입 확장
declare global {
  interface Window {
    chartData?: Record<string, any>;
    lastChartData?: Record<string, any>;
  }
}

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
const selectedSymbol = ref('ETH/EUR'); // ChartView와 일치하도록 수정
const activeAccountTab = ref('liquidation');

// 차트 관련 상태
const activeCharts = ref([
  { id: 1, symbol: 'ETH/EUR', price: '50000.00', change: 0.03, chartId: 'chart_1' },
  { id: 2, symbol: 'BTC/EUR', price: '80000.00', change: -0.02, chartId: 'chart_2' },
  { id: 3, symbol: 'GBP/USD', price: '1.26000', change: 0.01, chartId: 'chart_3' },
  { id: 4, symbol: 'EUR/USD', price: '1.08000', change: -0.005, chartId: 'chart_4' },
]);

// 선택된 차트 상태
const selectedChartId = ref(1); // 기본적으로 첫 번째 차트 선택

// 가격 정보 (선택된 차트 기준으로 동적 계산)
const currentPrice = ref('0.00');

const buyPrice = ref('0.00000');
const sellPrice = ref('0.00000');

// 스프레드 값 (고정)
const spreadValue = ref('0.3');

// 매수/매도 가격 계산 함수
const calculateOrderPrices = (basePrice: number) => {
  const spread = parseFloat(spreadValue.value);
  buyPrice.value = (basePrice - spread / 2).toFixed(5);
  sellPrice.value = (basePrice + spread / 2).toFixed(5);
};

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

// 주문 라인 데이터
const orderLines = ref<Array<{
  id: string;
  chartId: number;
  symbol: string;
  type: string;
  price: number;
  quantity: number;
  status: string;
  lineId?: string;
  time: number;
}>>([]);

// 컨텍스트 메뉴 관련 상태
const showContextMenu = ref(false);
const contextMenuStyle = ref({
  left: '0px',
  top: '0px'
});
const contextMenuPrice = ref('0.00000');
const contextMenuOrderPrice = ref('0.00000');
const contextMenuOrderQuantity = ref(1.0);
const contextMenuOrderType = ref('limit-buy');
const contextMenuChartId = ref<number | null>(null);

// 주문 라인 정보 패널 관련 상태
const showOrderLineInfo = ref(false);
const orderLineInfoStyle = ref({
  left: '0px',
  top: '0px'
});
const selectedOrderLine = ref<any>(null);

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
          chartId: `chart_${i + 1}`,
        };
        activeCharts.value.push(newChart);
      }
    } else if (activeCharts.value.length > targetChartCount) {
      // 차트 제거
      activeCharts.value = activeCharts.value.slice(0, targetChartCount);
    }

    // 차트 재초기화 (DOM 업데이트 후)
    nextTick(() => {
      setTimeout(() => {
        initializeCharts();
      }, 100); // DOM 업데이트 후 약간의 지연
    });
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
      try {
        widget.remove();
      } catch (error) {
        console.warn('[initializeCharts] 차트 제거 중 오류:', error);
      }
    }
  });
  tvWidgets.value = [];

  // 차트 컨테이너가 DOM에 렌더링될 때까지 대기
  nextTick(() => {
    // 모든 차트를 순차적으로 생성 (비동기 처리)
    activeCharts.value.forEach((chart, index) => {
      console.log(
        `[initializeCharts] ${chart.symbol} 차트 생성 중... (${index + 1}/${activeCharts.value.length})`
      );

      // 각 차트 생성 사이에 약간의 지연을 두어 충돌 방지
      setTimeout(() => {
        createChart(chart, index);
      }, index * 1000); // 1초 간격으로 차트 생성 (충돌 방지)
    });
  });
};

const createChart = (chart: any, index: number) => {
  // 차트 컨테이너가 존재하는지 확인
  const containerId = `chart_${chart.id}`;
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`[createChart] 컨테이너를 찾을 수 없음: ${containerId}`);
    return;
  }

  console.log(`[createChart] 컨테이너 확인됨: ${containerId}`, container);

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
      container: containerId,
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
        'no_context_menu', // 컨텍스트 메뉴 완전 비활성화
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
        'context_menu', // 기본 컨텍스트 메뉴 비활성화
        'header_undo_redo', // 실행취소/재실행 버튼 비활성화
        'header_screenshot', // 스크린샷 버튼 비활성화
        'header_fullscreen_button', // 전체화면 버튼 비활성화
        'pane_context_menu' // 차트 영역 우클릭 메뉴 비활성화
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
      console.log(`[TradingView] onChartReady 콜백 실행됨 - 차트 ID: ${chart.id}`);
      console.log(`[TradingView] 즉시 실행 로그 - 차트 ${chart.symbol}`);

      // 즉시 실행되는 테스트 코드
      console.log(`[Test] 즉시 실행 테스트 - 차트 ${chart.id}`);
      


      // 차트가 완전히 로드될 때까지 잠시 대기
      console.log(`[TradingView] 차트 ${chart.symbol} 1초 타이머 시작`);
      
      // 즉시 실행되는 테스트
      console.log(`[Test] setTimeout 전 즉시 실행 - 차트 ${chart.id}`);
      
      // requestAnimationFrame을 사용하여 더 안정적으로 실행
      const delayedExecution = () => {
        console.log(`[Test] requestAnimationFrame 실행됨 - 차트 ${chart.id}`);
        
        // 차트 설정 및 오버레이 생성
        try {
          const chartInstance = widget.chart();
          console.log(`[ChartSetup] 차트 인스턴스 가져옴 - 차트 ${chart.id}`);

          // 차트에 주문 라인 그리기 기능 추가
          try {
            addOrderLineDrawing(widget, chart.symbol);
            console.log(`[ChartSetup] 주문 라인 그리기 기능 추가 완료 - 차트 ${chart.id}`);
          } catch (error) {
            console.warn(`[ChartSetup] 주문 라인 그리기 기능 추가 실패 - 차트 ${chart.id}:`, error);
            // 에러가 발생해도 계속 진행
          }
          
          // 드로잉 이벤트 구독 (라인 이동/수정/삭제 감지)
          try {
            subscribeToDrawingEvents(widget, chartInstance);
            console.log(`[ChartSetup] 드로잉 이벤트 구독 완료 - 차트 ${chart.id}`);
          } catch (error) {
            console.warn(`[ChartSetup] 드로잉 이벤트 구독 실패 - 차트 ${chart.id}:`, error);
            // 에러가 발생해도 계속 진행
          }
          
          // 차트 컨테이너에 직접 더블클릭 이벤트 추가
          const chartContainer = document.getElementById(`chart_${chart.id}`);
          if (chartContainer) {
            // 기존 이벤트 리스너 제거 (중복 방지)
            const existingListeners = (chartContainer as any)._doubleClickHandler;
            if (existingListeners) {
              chartContainer.removeEventListener('dblclick', existingListeners);
            }
            
            // 새로운 더블클릭 이벤트 핸들러 생성
            const doubleClickHandler = (event: MouseEvent) => {
              console.log(`[ChartDoubleClick] 차트 ${chart.id} 더블클릭 이벤트 발생 - 이벤트 타입: ${event.type}`);
              console.log(`[ChartDoubleClick] 마우스 위치: clientX=${event.clientX}, clientY=${event.clientY}`);
              console.log(`[ChartDoubleClick] 차트 컨테이너:`, chartContainer);
              
                        // 차트 위에서 더블클릭 시 라인 생성 (크로스헤어 방식 사용)
          const orderLine = createOrderLineWithCrosshair(chart.id, 'limit-buy', 1.0);
          
          if (orderLine) {
            console.log(`[Overlay] 더블클릭으로 주문 라인 생성 완료:`, orderLine);
          } else {
            console.error(`[Overlay] 더블클릭으로 주문 라인 생성 실패`);
          }
            };
            
            // 핸들러를 컨테이너에 저장 (나중에 제거할 때 사용)
            (chartContainer as any)._doubleClickHandler = doubleClickHandler;
            
            // 더블클릭 이벤트 리스너 추가
            chartContainer.addEventListener('dblclick', doubleClickHandler);
            
            // 우클릭 이벤트도 추가
            const contextMenuHandler = (event: MouseEvent) => {
              event.preventDefault();
              event.stopPropagation();
              event.stopImmediatePropagation();
              
              console.log(`[ChartContextMenu] 차트 ${chart.id} 우클릭 이벤트 발생 - 이벤트 타입: ${event.type}`);
              console.log(`[ChartContextMenu] 마우스 위치: clientX=${event.clientX}, clientY=${event.clientY}`);
              
              // 우클릭 시 컨텍스트 메뉴 표시
              handleChartContextMenu(event, chart.id);
            };
            
            chartContainer.addEventListener('contextmenu', contextMenuHandler);
            (chartContainer as any)._contextMenuHandler = contextMenuHandler;
            
            // 클릭 이벤트도 추가하여 이벤트가 제대로 작동하는지 테스트
            const clickHandler = (event: MouseEvent) => {
              console.log(`[ChartClick] 차트 ${chart.id} 클릭 이벤트 발생 - 이벤트 타입: ${event.type}`);
            };
            
            chartContainer.addEventListener('click', clickHandler);
            (chartContainer as any)._clickHandler = clickHandler;
            
            console.log(`[ChartSetup] 차트 ${chart.id} 이벤트 리스너 추가 완료`);
            console.log(`[ChartSetup] 차트 컨테이너 ID: ${chartContainer.id}`);
            console.log(`[ChartSetup] 차트 컨테이너 클래스: ${chartContainer.className}`);
            console.log(`[ChartSetup] 차트 컨테이너 자식 요소 수: ${chartContainer.children.length}`);
          } else {
            console.error(`[ChartSetup] 차트 컨테이너를 찾을 수 없음: chart_${chart.id}`);
          }
          
          // 즉시 오버레이 생성 (5초 대기 없이)
          console.log(`[ImmediateOverlay] 차트 ${chart.id} 오버레이 즉시 생성 시작`);
          recreateOverlay(chart.id, index);
          
        } catch (error) {
          console.error(`[ChartSetup] 차트 ${chart.id} 설정 중 오류:`, error);
        }
      };
      
      // requestAnimationFrame을 사용하여 다음 프레임에서 실행
      requestAnimationFrame(() => {
        console.log(`[Test] requestAnimationFrame 콜백 실행됨 - 차트 ${chart.id}`);
        delayedExecution();
      });
      
      // 백업용 setTimeout (requestAnimationFrame이 실패할 경우)
      setTimeout(() => {
        console.log(`[Backup] setTimeout 백업 실행됨 - 차트 ${chart.id}`);
        delayedExecution();
      }, 1000);
      
    });

    // 차트 생성 실패 시 오류 처리
    widget.onError((error: any) => {
      console.error(`[createChart] ${chart.symbol} 차트 생성 실패:`, error);
    });
  });
};

// 주문 라인 그리기 기능
const addOrderLineDrawing = (widget: any, symbol: string) => {
  const chart = widget.chart();
  if (chart) {
    // 차트에 그리기 도구 활성화
    try {
      chart.setCrosshairMode(1); // 크로스헤어 모드
    } catch (error) {
      console.warn(`[addOrderLineDrawing] 크로스헤어 모드 설정 실패:`, error);
    }

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
    
    // 주문 라인 더블클릭 이벤트 - 라인 생성
    chart.subscribeDblClick((param: any) => {
      if (param.time && param.seriesPrices) {
        const price = param.seriesPrices.get(chart.getVisibleRange().from);
        if (price) {
          console.log(`${symbol} 차트 더블클릭:`, { time: param.time, price });
          
          // 더블클릭으로 주문 라인 생성
          const chartId = activeCharts.value.find(c => c.symbol === symbol)?.id;
          if (chartId) {
            console.log(`[addOrderLineDrawing] 더블클릭으로 주문 라인 생성 시작 - 차트 ${chartId}`);
            
            // 크로스헤어를 사용하여 주문 라인 생성
            const orderLine = createOrderLineWithCrosshair(chartId, 'limit-buy', 1.0);
            
            if (orderLine) {
              console.log(`[addOrderLineDrawing] 더블클릭으로 주문 라인 생성 완료:`, orderLine);
            } else {
              console.error(`[addOrderLineDrawing] 더블클릭으로 주문 라인 생성 실패`);
            }
          }
        }
      }
    });
    
    // 우클릭 이벤트 - 컨텍스트 메뉴 표시
    chart.subscribeClick((param: any) => {
      // 우클릭 감지 (button === 2)
      if (param.button === 2 && param.time && param.seriesPrices) {
        const price = param.seriesPrices.get(chart.getVisibleRange().from);
        if (price) {
          console.log(`${symbol} 차트 우클릭:`, { time: param.time, price, button: param.button });
          
          // 우클릭으로 컨텍스트 메뉴 표시
          const chartId = activeCharts.value.find(c => c.symbol === symbol)?.id;
          if (chartId) {
            console.log(`[addOrderLineDrawing] 우클릭으로 컨텍스트 메뉴 표시 시작 - 차트 ${chartId}`);
            
            // 컨텍스트 메뉴 설정
            contextMenuOrderType.value = 'limit-buy';
            contextMenuOrderPrice.value = price.toFixed(5);
            contextMenuOrderQuantity.value = 1.0;
            contextMenuChartId.value = chartId;
            
            // 컨텍스트 메뉴 위치 설정 (마우스 위치)
            contextMenuStyle.value = {
              left: `${param.point?.x || 0}px`,
              top: `${param.point?.y || 0}px`
            };
            
            // 컨텍스트 메뉴 표시
            showContextMenu.value = true;
            
            console.log(`[addOrderLineDrawing] 우클릭으로 컨텍스트 메뉴 표시 완료 - 차트 ${chartId}`);
          }
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
    // 선택된 차트의 가격으로 currentPrice 업데이트
    currentPrice.value = selectedChart.price;
    // 매수/매도 가격 재계산
    calculateOrderPrices(parseFloat(currentPrice.value));
  }
};

// 실시간 가격 업데이트 함수 (랜덤 업데이트 제거)
const updateChartPrices = () => {
  // 랜덤 가격 업데이트 제거 - 차트 데이터와의 동기화만 유지
  console.log('[updateChartPrices] 차트 가격 업데이트 스킵 - 차트 데이터와 동기화 중');
};

// 심볼 형식 변환 함수 (ChartView와 TradingPlatformView 간의 심볼 매칭)
const normalizeSymbol = (symbol: string): string => {
  // 슬래시가 포함된 심볼을 연결 형식으로 변환
  if (symbol.includes('/')) {
    return symbol.replace('/', '');
  }
  // 연결 형식을 슬래시 형식으로 변환
  if (symbol.length === 6) {
    return `${symbol.substring(0, 3)}/${symbol.substring(3)}`;
  }
  return symbol;
};

// 차트 데이터 구독 및 가격 동기화 함수
const subscribeToChartData = () => {
  // 차트 데이터 변경 이벤트 리스너 등록
  window.addEventListener('chartDataUpdate', (event: any) => {
    const { symbol, data } = event.detail;

    // 심볼 형식 변환하여 매칭
    const normalizedChartSymbol = normalizeSymbol(symbol);
    const normalizedSelectedSymbol = normalizeSymbol(selectedSymbol.value);

    console.log('[subscribeToChartData] 심볼 매칭 시도:', {
      chartSymbol: symbol,
      normalizedChartSymbol,
      selectedSymbol: selectedSymbol.value,
      normalizedSelectedSymbol,
      isMatch: normalizedChartSymbol === normalizedSelectedSymbol,
      data: data,
    });

    // 현재 선택된 심볼과 일치하는 경우에만 가격 업데이트
    if (normalizedChartSymbol === normalizedSelectedSymbol && data && data.price) {
      console.log('[subscribeToChartData] 차트 데이터 수신:', { symbol, data });

      // 현재 가격 업데이트
      currentPrice.value = data.price.toFixed(5);

      // 매수/매도 가격 재계산
      const price = parseFloat(currentPrice.value);
      calculateOrderPrices(price);

      // 선택된 차트의 가격도 업데이트
      const selectedChart = activeCharts.value.find(
        (chart) => normalizeSymbol(chart.symbol) === normalizedSelectedSymbol
      );
      if (selectedChart) {
        selectedChart.price = data.price.toFixed(5);
      }

      console.log('[subscribeToChartData] 가격 동기화 완료:', {
        currentPrice: currentPrice.value,
        buyPrice: buyPrice.value,
        sellPrice: sellPrice.value,
      });
    }

    // 모든 차트의 가격 업데이트 (선택된 심볼과 관계없이)
    updateAllChartPrices(symbol, data);
  });

  // window.chartData에서 기존 데이터 확인
  if (window.chartData) {
    // 모든 심볼에 대해 매칭 시도
    Object.keys(window.chartData).forEach((chartSymbol) => {
      const normalizedChartSymbol = normalizeSymbol(chartSymbol);
      const normalizedSelectedSymbol = normalizeSymbol(selectedSymbol.value);

      if (normalizedChartSymbol === normalizedSelectedSymbol) {
        const existingData = window.chartData![chartSymbol];
        if (existingData && existingData.latestPrice) {
          currentPrice.value = existingData.latestPrice.toFixed(5);
          const price = parseFloat(currentPrice.value);
          calculateOrderPrices(price);

          console.log('[subscribeToChartData] 기존 차트 데이터로 초기화:', {
            chartSymbol,
            normalizedChartSymbol,
            currentPrice: currentPrice.value,
            buyPrice: buyPrice.value,
            sellPrice: sellPrice.value,
          });
        }
      }
    });
  }

  // window.lastChartData에서도 확인 (streaming.js와의 호환성)
  if (window.lastChartData) {
    Object.keys(window.lastChartData).forEach((chartSymbol) => {
      const normalizedChartSymbol = normalizeSymbol(chartSymbol);
      const normalizedSelectedSymbol = normalizeSymbol(selectedSymbol.value);

      if (normalizedChartSymbol === normalizedSelectedSymbol) {
        const existingData = window.lastChartData![chartSymbol];
        if (
          (existingData && existingData.close && !currentPrice.value) ||
          currentPrice.value === '0.00000'
        ) {
          currentPrice.value = existingData.close.toFixed(5);
          const price = parseFloat(currentPrice.value);
          calculateOrderPrices(price);

          console.log('[subscribeToChartData] streaming 데이터로 초기화:', {
            chartSymbol,
            normalizedChartSymbol,
            currentPrice: currentPrice.value,
            buyPrice: buyPrice.value,
            sellPrice: sellPrice.value,
          });
        }
      }
    });
  }
};

// 모든 차트의 가격을 업데이트하는 함수
const updateAllChartPrices = (symbol: string, data: any) => {
  if (!data || !data.price) return;

  const normalizedChartSymbol = normalizeSymbol(symbol);

  // 해당 심볼과 관련된 모든 차트 찾기
  activeCharts.value.forEach((chart) => {
    const normalizedChartSymbolInActive = normalizeSymbol(chart.symbol);

    if (normalizedChartSymbol === normalizedChartSymbolInActive) {
      // 차트 가격 업데이트
      chart.price = data.price.toFixed(5);

      // 변화율도 업데이트 (간단한 시뮬레이션)
      const currentChange = parseFloat(chart.change.toString());
      const newChange = currentChange + (Math.random() - 0.5) * 0.1; // -0.05% ~ +0.05% 변동
      chart.change = parseFloat(newChange.toFixed(2));

      console.log(`[updateAllChartPrices] 차트 ${chart.id} 가격 업데이트:`, {
        symbol: chart.symbol,
        chartId: chart.chartId,
        oldPrice: chart.price,
        newPrice: data.price.toFixed(5),
        change: chart.change,
      });
    }
  });
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

// 차트 우클릭 이벤트 핸들러
const handleChartContextMenu = (event: MouseEvent, chartId: number) => {
  // 이벤트 완전 차단
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  
  const chart = activeCharts.value.find(c => c.id === chartId);
  if (!chart) return;

  // 현재 차트 선택
  selectChart(chartId);
  
  // 컨텍스트 메뉴 위치 설정
  contextMenuStyle.value = {
    left: `${event.clientX}px`,
    top: `${event.clientY}px`
  };
  
  // 크로스헤어 위치의 가격 가져오기
  let crosshairPrice = null;
  
  try {
    // 차트 위젯에서 크로스헤어 정보 가져오기
    const chartIndex = activeCharts.value.findIndex(c => c.id === chartId);
    if (chartIndex !== -1 && tvWidgets.value[chartIndex]) {
      const widget = tvWidgets.value[chartIndex];
      const chartInstance = widget.chart();
      
      if (chartInstance) {
        // 크로스헤어 위치에서 가격 정보 가져오기
        const crosshairPosition = chartInstance.getCrosshairPosition();
        if (crosshairPosition && crosshairPosition.price) {
          crosshairPrice = crosshairPosition.price;
          console.log(`[handleChartContextMenu] 크로스헤어에서 가격 가져옴: ${crosshairPrice}`);
        }
      }
    }
  } catch (error) {
    console.warn(`[handleChartContextMenu] 크로스헤어 가격 가져오기 실패:`, error);
  }
  
  // 크로스헤어 가격이 있으면 사용, 없으면 현재 차트 가격 사용
  const targetPrice = crosshairPrice || parseFloat(chart.price);
  contextMenuPrice.value = targetPrice.toFixed(5);
  contextMenuOrderPrice.value = targetPrice.toFixed(5);
  contextMenuOrderQuantity.value = quantity.value;
  contextMenuChartId.value = chartId;
  
  // 컨텍스트 메뉴 표시
  showContextMenu.value = true;
  
  console.log(`[handleChartContextMenu] 차트 ${chartId} 우클릭:`, {
    symbol: chart.symbol,
    price: targetPrice,
    crosshairPrice: crosshairPrice,
    fallbackPrice: parseFloat(chart.price),
    position: { x: event.clientX, y: event.clientY }
  });
  
  // false 반환으로 기본 동작 완전 차단
  return false;
};

// 컨텍스트 메뉴 숨기기
const hideContextMenu = () => {
  showContextMenu.value = false;
  contextMenuChartId.value = null;
};

// 주문 타입 설정
const setOrderType = (type: string) => {
  contextMenuOrderType.value = type;
  updateOrderPreview();
};

// 주문 타입 라벨 반환
const getOrderTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'limit-buy': 'Limit 매수',
    'limit-sell': 'Limit 매도',
    'stop-buy': 'Stop 매수',
    'stop-sell': 'Stop 매도'
  };
  return labels[type] || type;
};

// 주문 미리보기 업데이트
const updateOrderPreview = () => {
  // 가격과 수량 유효성 검사
  if (parseFloat(contextMenuOrderPrice.value) <= 0) {
    contextMenuOrderPrice.value = contextMenuPrice.value;
  }
  if (parseFloat(contextMenuOrderQuantity.value.toString()) <= 0) {
    contextMenuOrderQuantity.value = 1.0;
  }
};

// 컨텍스트 메뉴에서 주문 실행
const placeContextMenuOrder = async () => {
  if (!contextMenuChartId.value) return;
  
  const chart = activeCharts.value.find(c => c.id === contextMenuChartId.value);
  if (!chart) return;
  
  const orderData = {
    id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    chartId: contextMenuChartId.value,
    symbol: chart.symbol,
    type: contextMenuOrderType.value,
    price: parseFloat(contextMenuOrderPrice.value),
    quantity: parseFloat(contextMenuOrderQuantity.value.toString()),
    status: '대기중',
    time: Date.now()
  };
  
  // 주문 라인 추가
  orderLines.value.push(orderData);
  
  // 차트에 주문 라인 그리기 (await 사용)
  try {
    await drawOrderLine(orderData);
    console.log('[placeContextMenuOrder] 주문 라인 생성 및 그리기 완료:', orderData);
  } catch (error) {
    console.error('[placeContextMenuOrder] 주문 라인 그리기 실패:', error);
  }
  
  // 컨텍스트 메뉴 숨기기
  hideContextMenu();
  
  // 주문 실행 로그
  console.log(`[TRADING] ${chart.symbol} ${getOrderTypeLabel(contextMenuOrderType.value)} 주문 실행:`, {
    가격: orderData.price,
    수량: orderData.quantity,
    차트ID: orderData.chartId,
    시간: new Date(orderData.time).toLocaleString()
  });
};

// 차트에 주문 라인 그리기
const drawOrderLine = async (orderLine: any) => {
  const chartIndex = activeCharts.value.findIndex(c => c.id === orderLine.chartId);
  if (chartIndex === -1 || !tvWidgets.value[chartIndex]) return;
  
  const widget = tvWidgets.value[chartIndex];
  const chart = widget.chart();
  
  if (!chart) return;
  
  try {
    // AC의 createShape API 사용하여 수평선 생성 (Promise 반환값 await)
    const entityId = await chart.createShape(
      { price: orderLine.price }, // 한 점(anchor)만으로 수평선 위치 결정
      {
        shape: 'horizontal_line',
        lock: false, // 드래그 가능
        text: `${getOrderTypeLabel(orderLine.type)} - ${orderLine.price.toFixed(5)}`,
        overrides: {
          linecolor: getOrderLineColor(orderLine.type),
          linewidth: 2,
          linestyle: 1, // 점선
          show_price: true, // 가격 표시
          show_label: true, // 라벨 표시
          textcolor: getOrderLineColor(orderLine.type),
          fontsize: 12,
          bold: true,
          backgroundColor: getOrderLineColor(orderLine.type),
          backgroundTransparency: 80,
          borderColor: getOrderLineColor(orderLine.type),
          borderTransparency: 100
        }
      }
    );
    
    // entityId를 주문 라인에 저장
    orderLine.lineId = entityId;
    
    // 라인 ID와 주문 ID를 매핑 테이블에 추가
    lineIdToOrderId.set(entityId, orderLine.id);
    
    console.log(`[drawOrderLine] 주문 라인 그리기 완료:`, {
      symbol: orderLine.symbol,
      type: orderLine.type,
      price: orderLine.price,
      lineId: orderLine.lineId
    });
    
    return entityId;
    
  } catch (error) {
    console.error('[drawOrderLine] 주문 라인 그리기 실패:', error);
    return null;
  }
};

// 주문 라인 색상 반환
const getOrderLineColor = (type: string): string => {
  const colors: Record<string, string> = {
    'limit-buy': '#28a745',    // 초록색 (매수)
    'limit-sell': '#dc3545',   // 빨간색 (매도)
    'stop-buy': '#ffc107',     // 노란색 (Stop 매수)
    'stop-sell': '#fd7e14'     // 주황색 (Stop 매도)
  };
  return colors[type] || '#007bff';
};

// 주문 라인 정보 패널 표시
const showOrderLineInfoPanel = (orderLine: any, point: { x: number, y: number }) => {
  selectedOrderLine.value = orderLine;
  orderLineInfoStyle.value = {
    left: `${point.x + 10}px`,
    top: `${point.y - 10}px`
  };
  showOrderLineInfo.value = true;
};

// 주문 라인 정보 패널 숨기기
const hideOrderLineInfo = () => {
  showOrderLineInfo.value = false;
  selectedOrderLine.value = null;
};

// 주문 라인 삭제
const deleteOrderLine = () => {
  if (!selectedOrderLine.value) return;
  
  const orderLine = selectedOrderLine.value;
  
  // 차트에서 라인 제거
  const chartIndex = activeCharts.value.findIndex(c => c.id === orderLine.chartId);
  if (chartIndex !== -1 && tvWidgets.value[chartIndex]) {
    const widget = tvWidgets.value[chartIndex];
    const chart = widget.chart();
    
    if (chart && orderLine.lineId) {
      try {
        // AC의 removeShape API 사용하여 라인 제거
        chart.removeShape(orderLine.lineId);
        console.log(`[deleteOrderLine] 주문 라인 제거 완료:`, orderLine.lineId);
      } catch (error) {
        console.error('[deleteOrderLine] 라인 제거 실패:', error);
      }
    }
  }
  
  // 주문 라인 데이터에서 제거
  const index = orderLines.value.findIndex(ol => ol.id === orderLine.id);
  if (index !== -1) {
    orderLines.value.splice(index, 1);
  }
  
  // 정보 패널 숨기기
  hideOrderLineInfo();
  
  console.log(`[TRADING] ${orderLine.symbol} 주문 라인 삭제:`, {
    타입: orderLine.type,
    가격: orderLine.price,
    수량: orderLine.quantity,
    시간: new Date().toLocaleString()
  });
};

// 주문 라인 수정
const modifyOrderLine = () => {
  if (!selectedOrderLine.value) return;
  
  // 수정을 위해 컨텍스트 메뉴를 다시 열기
  const orderLine = selectedOrderLine.value;
  
  // 기존 주문 라인 삭제
  deleteOrderLine();
  
  // 컨텍스트 메뉴에 기존 값 설정
  contextMenuOrderPrice.value = orderLine.price.toFixed(5);
  contextMenuOrderQuantity.value = orderLine.quantity;
  contextMenuOrderType.value = orderLine.type;
  contextMenuChartId.value = orderLine.chartId;
  
  // 컨텍스트 메뉴 표시
  showContextMenu.value = true;
  
  console.log(`[modifyOrderLine] 주문 라인 수정 모드:`, orderLine);
};

// 전역 클릭 이벤트로 컨텍스트 메뉴와 정보 패널 숨기기
const handleGlobalClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  // 컨텍스트 메뉴 외부 클릭 시 숨기기
  if (!target.closest('.context-menu')) {
    hideContextMenu();
  }
  
  // 주문 라인 정보 패널 외부 클릭 시 숨기기
  if (!target.closest('.order-line-info')) {
    hideOrderLineInfo();
  }
};

// 차트 로딩 완료 후 오버레이 재생성
const recreateOverlay = (chartId: number, chartIndex: number) => {
  console.log(`[recreateOverlay] 차트 ${chartId} 오버레이 재생성 시작 - 호출됨`);
  
  // 오버레이가 비활성화된 경우 생성하지 않음
  if (!showOverlay.value || !overlayEnabled.value) {
    console.log(`[recreateOverlay] 오버레이가 비활성화되어 생성하지 않음 - 차트 ${chartId}`);
    return;
  }
  
  // 기존 오버레이 제거
  const existingOverlay = document.querySelector(`#chart_${chartId} .chart-overlay`);
  if (existingOverlay) {
    existingOverlay.remove();
    console.log(`[recreateOverlay] 기존 오버레이 제거됨`);
  }
  
  // 새로운 오버레이 생성
  const chartContainer = document.getElementById(`chart_${chartId}`);
  if (chartContainer) {
    const newOverlay = document.createElement('div');
    newOverlay.className = 'chart-overlay';
    newOverlay.setAttribute('data-context-menu', 'false'); // 기본적으로 비활성화
    newOverlay.id = `overlay_${chartId}`;
    
    // 우클릭 시에만 이벤트 활성화
    newOverlay.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      console.log(`[Overlay] 우클릭 이벤트 가로챔 - 차트 ${chartId}`);
      
      handleChartContextMenu(event, chartId);
    });
    
    // 클릭 이벤트 처리 (좌클릭, 중간클릭)
    newOverlay.addEventListener('click', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 클릭 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 다운 이벤트 처리
    newOverlay.addEventListener('mousedown', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 마우스 다운 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 업 이벤트 처리
    newOverlay.addEventListener('mouseup', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 마우스 업 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 이동 이벤트 처리
    newOverlay.addEventListener('mousemove', (event) => {
      // 마우스 이동은 항상 차트로 넘기기
      newOverlay.style.pointerEvents = 'none';
      
      // 다음 프레임에서 pointer-events를 다시 활성화
      requestAnimationFrame(() => {
        newOverlay.style.pointerEvents = 'auto';
      });
      
      console.log(`[Overlay] 마우스 이동 이벤트를 차트로 넘김 - 차트 ${chartId}`);
    });
    
    // 더블클릭 이벤트 처리 - 선 그리기
    newOverlay.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      console.log(`[Overlay] 더블클릭 이벤트 - 선 그리기 시작 - 차트 ${chartId}`);
      
      // 더블클릭 위치에서 선 그리기
      handleDoubleClickDrawing(event, chartId);
    });
    
    // 오버레이를 차트 컨테이너의 맨 위에 추가
    chartContainer.appendChild(newOverlay);
    
    console.log(`[recreateOverlay] 차트 ${chartId} 오버레이 재생성 완료`);
    
    // 주기적으로 오버레이가 존재하는지 확인하고 필요시 재생성
    startOverlayMonitoring(chartId);
  } else {
    console.error(`[recreateOverlay] 차트 컨테이너를 찾을 수 없음: chart_${chartId}`);
  }
};

// 오버레이 모니터링 및 자동 재생성
const overlayMonitors = new Map<number, NodeJS.Timeout>();
const mutationObservers = new Map<number, MutationObserver>();

const startOverlayMonitoring = (chartId: number) => {
  // 기존 모니터링 중지
  if (overlayMonitors.has(chartId)) {
    clearInterval(overlayMonitors.get(chartId)!);
  }
  
  // MutationObserver로 DOM 변경 감지
  const chartContainer = document.getElementById(`chart_${chartId}`);
  if (chartContainer && !mutationObservers.has(chartId)) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // 자식 요소가 추가/제거되었을 때
          const overlay = document.getElementById(`overlay_${chartId}`);
          if (!overlay) {
            console.log(`[MutationObserver] 차트 ${chartId} 오버레이가 제거됨, 재생성 중...`);
            recreateOverlayImmediately(chartId);
          }
        }
      });
    });
    
    observer.observe(chartContainer, {
      childList: true,
      subtree: true
    });
    
    mutationObservers.set(chartId, observer);
    console.log(`[MutationObserver] 차트 ${chartId} DOM 변경 감지 시작`);
  }
  
  // 백업용 타이머 모니터링 (MutationObserver가 작동하지 않을 경우)
  const monitor = setInterval(() => {
    const overlay = document.getElementById(`overlay_${chartId}`);
    const chartContainer = document.getElementById(`chart_${chartId}`);
    
    if (!overlay && chartContainer) {
      console.log(`[TimerMonitor] 차트 ${chartId} 오버레이가 사라짐, 재생성 중...`);
      recreateOverlayImmediately(chartId);
    }
  }, 500); // 0.5초마다 확인
  
  overlayMonitors.set(chartId, monitor);
};

// 즉시 오버레이 재생성 (MutationObserver나 타이머에서 호출)
const recreateOverlayImmediately = (chartId: number) => {
  // 오버레이가 비활성화된 경우 생성하지 않음
  if (!showOverlay.value || !overlayEnabled.value) {
    console.log(`[recreateOverlayImmediately] 오버레이가 비활성화되어 생성하지 않음 - 차트 ${chartId}`);
    return;
  }
  
  const chartContainer = document.getElementById(`chart_${chartId}`);
  if (chartContainer) {
    // 기존 오버레이 제거
    const existingOverlay = document.querySelector(`#chart_${chartId} .chart-overlay`);
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    // 새로운 오버레이 생성
    const newOverlay = document.createElement('div');
    newOverlay.className = 'chart-overlay';
    newOverlay.setAttribute('data-context-menu', 'false'); // 기본적으로 비활성화
    newOverlay.id = `overlay_${chartId}`;
    
    // 우클릭 시에만 이벤트 활성화
    newOverlay.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      console.log(`[Overlay] 우클릭 이벤트 가로챔 - 차트 ${chartId}`);
      
      handleChartContextMenu(event, chartId);
    });
    
    // 클릭 이벤트 처리 (좌클릭, 중간클릭)
    newOverlay.addEventListener('click', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 클릭 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 다운 이벤트 처리
    newOverlay.addEventListener('mousedown', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 마우스 다운 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 업 이벤트 처리
    newOverlay.addEventListener('mouseup', (event) => {
      // 우클릭이 아닌 경우에만 처리
      if (event.button !== 2) {
        // 이벤트를 차트로 넘기기 위해 pointer-events를 일시적으로 비활성화
        newOverlay.style.pointerEvents = 'none';
        
        // 다음 프레임에서 pointer-events를 다시 활성화
        requestAnimationFrame(() => {
          newOverlay.style.pointerEvents = 'auto';
        });
        
        console.log(`[Overlay] 마우스 업 이벤트를 차트로 넘김 - 차트 ${chartId}`);
      }
    });
    
    // 마우스 이동 이벤트 처리
    newOverlay.addEventListener('mousemove', (event) => {
      // 마우스 이동은 항상 차트로 넘기기
      newOverlay.style.pointerEvents = 'none';
      
      // 다음 프레임에서 pointer-events를 다시 활성화
      requestAnimationFrame(() => {
        newOverlay.style.pointerEvents = 'auto';
      });
      
      console.log(`[Overlay] 마우스 이동 이벤트를 차트로 넘김 - 차트 ${chartId}`);
    });
    
    // 더블클릭 이벤트 처리 - 선 그리기
    newOverlay.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      console.log(`[Overlay] 더블클릭 이벤트 - 선 그리기 시작 - 차트 ${chartId}`);
      
      // 더블클릭 위치에서 선 그리기
      handleDoubleClickDrawing(event, chartId);
    });
    
    // 오버레이를 차트 컨테이너의 맨 위에 추가
    chartContainer.appendChild(newOverlay);
    
    console.log(`[recreateOverlayImmediately] 차트 ${chartId} 오버레이 즉시 재생성 완료`);
    
    // requestAnimationFrame을 사용하여 지속적으로 오버레이 위치 확인 및 복원
    ensureOverlayPosition(chartId);
  }
};

// requestAnimationFrame을 사용하여 오버레이 위치 지속 확인 및 복원
const ensureOverlayPosition = (chartId: number) => {
  const checkAndFix = () => {
    const overlay = document.getElementById(`overlay_${chartId}`);
    const chartContainer = document.getElementById(`chart_${chartId}`);
    
    if (overlay && chartContainer) {
      // 오버레이가 차트 컨테이너의 맨 위에 있는지 확인
      const lastChild = chartContainer.lastElementChild;
      if (lastChild !== overlay) {
        console.log(`[ensureOverlayPosition] 차트 ${chartId} 오버레이 위치 수정 중...`);
        // 오버레이를 맨 위로 이동
        chartContainer.appendChild(overlay);
      }
    }
    
    // 다음 프레임에서 다시 확인
    requestAnimationFrame(checkAndFix);
  };
  
  requestAnimationFrame(checkAndFix);
};

// 컴포넌트 언마운트 시 모니터링 정리
const cleanupOverlayMonitors = () => {
  overlayMonitors.forEach((monitor, chartId) => {
    clearInterval(monitor);
    console.log(`[Cleanup] 차트 ${chartId} 오버레이 모니터링 중지`);
  });
  overlayMonitors.clear();
};

// 오버레이 마우스 이벤트 핸들러들
const handleOverlayMouseDown = (event: MouseEvent) => {
  // 마우스 다운 이벤트를 차트로 통과시킴
  event.stopPropagation();
  const chartElement = (event.currentTarget as HTMLElement)?.parentElement;
  if (chartElement) {
    // 차트 요소에 마우스 다운 이벤트 전달
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: event.clientX,
      clientY: event.clientY,
      button: event.button,
      buttons: event.buttons,
      bubbles: true,
      cancelable: true
    });
    chartElement.dispatchEvent(mouseDownEvent);
  }
};

const handleOverlayMouseUp = (event: MouseEvent) => {
  // 마우스 업 이벤트를 차트로 통과시킴
  event.stopPropagation();
  const chartElement = (event.currentTarget as HTMLElement)?.parentElement;
  if (chartElement) {
    // 차트 요소에 마우스 업 이벤트 전달
    const mouseUpEvent = new MouseEvent('mouseup', {
      clientX: event.clientX,
      clientY: event.clientY,
      button: event.button,
      buttons: event.buttons,
      bubbles: true,
      cancelable: true
    });
    chartElement.dispatchEvent(mouseUpEvent);
  }
};

const handleOverlayMouseMove = (event: MouseEvent) => {
  // 마우스 이동 이벤트를 차트로 통과시킴
  event.stopPropagation();
  const chartElement = (event.currentTarget as HTMLElement)?.parentElement;
  if (chartElement) {
    // 차트 요소에 마우스 이동 이벤트 전달
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: event.clientX,
      clientY: event.clientY,
      buttons: event.buttons,
      bubbles: true,
      cancelable: true
    });
    chartElement.dispatchEvent(mouseMoveEvent);
  }
};

// 더블클릭으로 선 그리기 핸들러
const handleDoubleClickDrawing = (event: MouseEvent, chartId: number) => {
  console.log(`[handleDoubleClickDrawing] 더블클릭 이벤트 발생 - 차트 ${chartId}`);
  
  // 더블클릭 위치에서 가격 정보 가져오기
  const chartContainer = document.getElementById(`chart_${chartId}`);
  if (!chartContainer) {
    console.error(`[handleDoubleClickDrawing] 차트 컨테이너를 찾을 수 없습니다 - 차트 ${chartId}`);
    return;
  }
  
  // 마우스 위치를 기준으로 가격 추정 (간단한 방식)
  const rect = chartContainer.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;
  const relativeY = event.clientY - rect.top;
  
  // 차트 높이를 기준으로 가격 계산 (간단한 추정)
  const chartHeight = rect.height;
  const priceRange = 1000; // 가격 범위 (실제로는 차트 데이터에서 가져와야 함)
  const estimatedPrice = (chartHeight - relativeY) / chartHeight * priceRange;
  
  console.log(`[handleDoubleClickDrawing] 추정 가격: ${estimatedPrice.toFixed(5)} - 차트 ${chartId}`);
  
  // 컨텍스트 메뉴 숨기기
  hideContextMenu();
  hideOrderLineInfo();
  
  // 더블클릭 위치에 바로 주문 라인 생성
  const orderLine = {
    id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    chartId: chartId,
    symbol: activeCharts.value.find(c => c.id === chartId)?.symbol || 'UNKNOWN',
    type: 'limit-buy', // 기본값
    price: estimatedPrice,
    quantity: 1.0, // 기본 수량
    status: 'active',
    time: Date.now()
  };
  
  // 주문 라인 배열에 추가
  orderLines.value.push(orderLine);
  
  // 차트에 라인 그리기
  drawOrderLine(orderLine);
  
  // 주문 로그 출력
  console.log(`[handleDoubleClickDrawing] 더블클릭으로 주문 라인 생성 완료:`, {
    chartId: chartId,
    price: estimatedPrice.toFixed(5),
    type: orderLine.type,
    quantity: orderLine.quantity
  });
  
  console.log(`[handleDoubleClickDrawing] 더블클릭으로 주문 라인 생성 완료 - 차트 ${chartId}`);
};

// 차트 컨테이너에서 직접 더블클릭 처리하는 함수
const handleChartDoubleClick = (event: MouseEvent, chartId: number) => {
  console.log(`[handleChartDoubleClick] 차트 ${chartId} 직접 더블클릭 이벤트 발생`);
  
  // 컨텍스트 메뉴 숨기기
  hideContextMenu();
  hideOrderLineInfo();
  
  // 크로스헤어를 사용하여 주문 라인 생성 (더 안정적인 방식)
  const resultOrderLine = createOrderLineWithCrosshair(chartId, 'limit-buy', 1.0);
  
  if (resultOrderLine) {
    console.log(`[handleChartDoubleClick] 차트 직접 더블클릭으로 주문 라인 생성 완료:`, resultOrderLine);
  } else {
    console.error(`[handleChartDoubleClick] 차트 직접 더블클릭으로 주문 라인 생성 실패`);
  }
};

// 크로스헤어 이벤트를 사용하여 가격 정보를 가져오고 Drawings API로 수평 라인 생성
const createOrderLineWithCrosshair = (chartId: number, orderType: string, quantity: number = 1.0) => {
  console.log(`[createOrderLineWithCrosshair] 주문 라인 생성 시작 - 차트 ${chartId}, 타입: ${orderType}`);
  
  // 차트 위젯 찾기
  const chartWidget = tvWidgets.value.find(w => {
    const chart = w.chart();
    return chart && chart.id === `chart_${chartId}`;
  });
  
  if (!chartWidget) {
    console.error(`[createOrderLineWithCrosshair] 차트 위젯을 찾을 수 없습니다 - 차트 ${chartId}`);
    return;
  }
  
  const chart = chartWidget.chart();
  if (!chart) {
    console.error(`[createOrderLineWithCrosshair] 차트 인스턴스를 가져올 수 없습니다 - 차트 ${chartId}`);
    return;
  }
  
  // 차트의 가격 스케일을 사용하여 현재 마우스 위치의 가격 계산
  try {
    // 차트의 가격 범위 가져오기
    const priceScale = chart.getPriceScale();
    if (!priceScale) {
      console.error(`[createOrderLineWithCrosshair] 가격 스케일을 가져올 수 없습니다 - 차트 ${chartId}`);
      return;
    }
    
    // 현재 차트의 가격 범위
    const priceRange = priceScale.getVisibleRange();
    if (!priceRange) {
      console.error(`[createOrderLineWithCrosshair] 가격 범위를 가져올 수 없습니다 - 차트 ${chartId}`);
      return;
    }
    
    // 간단한 가격 계산 (실제로는 더 정확한 방법 필요)
    const estimatedPrice = (priceRange.from + priceRange.to) / 2;
    
    console.log(`[createOrderLineWithCrosshair] 추정 가격: ${estimatedPrice} - 차트 ${chartId}`);
    
    // 주문 라인 객체 생성
    const orderLine = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chartId: chartId,
      symbol: activeCharts.value.find(c => c.id === chartId)?.symbol || 'UNKNOWN',
      type: orderType,
      price: estimatedPrice,
      quantity: quantity,
      status: 'active',
      time: Date.now(),
      chartTime: Math.floor(Date.now() / 1000) // 현재 시간을 초 단위로
    };
    
    // 주문 라인 배열에 추가
    orderLines.value.push(orderLine);
    
    // Drawings API를 사용하여 수평 라인 생성
    createHorizontalLine(chart, orderLine);
    
    // 주문 로그 출력
    console.log(`[createOrderLineWithCrosshair] 주문 라인 생성 완료:`, {
      chartId: chartId,
      price: estimatedPrice,
      type: orderType,
      quantity: quantity,
      time: orderLine.chartTime
    });
    
    return orderLine;
    
  } catch (error) {
    console.error(`[createOrderLineWithCrosshair] 가격 계산 중 오류 발생:`, error);
    return null;
  }
};

// Drawings API를 사용하여 수평 라인 생성
const createHorizontalLine = async (chart: any, orderLine: any) => {
  try {
    console.log(`[createHorizontalLine] 수평 라인 생성 시작 - 주문 라인 ID: ${orderLine.id}`);
    
    // AC의 createShape API 사용하여 수평선 생성 (Promise 반환값 await)
    const entityId = await chart.createShape(
      { price: orderLine.price }, // 한 점(anchor)만으로 수평선 위치 결정
      {
        shape: 'horizontal_line',
        lock: false, // 드래그 가능
        text: `${orderLine.type.toUpperCase()} ${orderLine.price.toFixed(5)}`,
        overrides: {
          linecolor: getOrderLineColor(orderLine.type),
          linewidth: 2,
          show_price: true, // 가격 표시
          show_label: true, // 라벨 표시
          textcolor: getOrderLineColor(orderLine.type),
          fontsize: 12,
          bold: true,
          backgroundColor: getOrderLineColor(orderLine.type),
          backgroundTransparency: 80,
          borderColor: getOrderLineColor(orderLine.type),
          borderTransparency: 100
        }
      }
    );
    
    // entityId를 주문 라인에 저장
    orderLine.lineId = entityId;
    
    // 라인 ID와 주문 ID를 매핑 테이블에 추가
    lineIdToOrderId.set(entityId, orderLine.id);
    
    console.log(`[createHorizontalLine] 수평 라인 생성 완료 - 라인 ID: ${entityId}, 매핑 추가됨`);
    
    return entityId;
    
  } catch (error) {
    console.error(`[createHorizontalLine] 수평 라인 생성 실패:`, error);
    
    // 실패 시 기존 방식으로 라인 그리기 (fallback)
    drawOrderLine(orderLine);
    return null;
  }
};

// 주문 라인 수정 처리 (나중에 OMS modify 연결)
const handleOrderLineModification = (orderLine: any, params: any) => {
  console.log(`[handleOrderLineModification] 주문 라인 수정 처리 - 주문 라인 ID: ${orderLine.id}`);
  console.log(`[handleOrderLineModification] 수정된 라인 정보:`, params);
  
  // 여기에 OMS modify 로직 추가 예정
  // 현재는 로그만 출력
};

// 심볼 변경 감지
watch(selectedSymbol, (newSymbol) => {
  // 우측 패널의 심볼 정보 업데이트
  // currentPrice.value = (Math.random() * 2 + 0.5).toFixed(5); // 랜덤 업데이트 제거
  // calculateOrderPrices(parseFloat(currentPrice.value)); // 랜덤 업데이트 제거

  // 스프레드는 고정값이므로 업데이트하지 않음
  console.log('[updatePrices] 가격 업데이트 완료');
});

// 생명주기 훅
onMounted(() => {
  console.log('[TradingPlatformView] 컴포넌트 마운트됨');

  // 초기 가격 설정
  const selectedChart = activeCharts.value.find((chart) => chart.id === selectedChartId.value);
  if (selectedChart) {
    currentPrice.value = selectedChart.price;
    calculateOrderPrices(parseFloat(currentPrice.value));
    console.log('[TradingPlatformView] 초기 가격 설정:', {
      symbol: selectedChart.symbol,
      price: currentPrice.value,
      buyPrice: buyPrice.value,
      sellPrice: sellPrice.value,
    });
  }

  // 차트 초기화 (DOM 렌더링 완료 후)
  nextTick(() => {
    setTimeout(() => {
      initializeCharts();
    }, 500); // DOM 렌더링 완료 후 500ms 지연
  });

  // 차트 데이터 구독 시작
  subscribeToChartData();

  // 실시간 가격 업데이트 타이머 설정 (3초마다)
  const priceUpdateTimer = setInterval(() => {
    updateChartPrices();
  }, 3000);

  // 전역 클릭 이벤트 리스너 등록
  document.addEventListener('click', handleGlobalClick);

  // 컴포넌트 언마운트 시 타이머 정리
  onUnmounted(() => {
    clearInterval(priceUpdateTimer);
    // 이벤트 리스너 제거
    window.removeEventListener('chartDataUpdate', () => {});
    document.removeEventListener('click', handleGlobalClick);
  });
});

// 컴포넌트 언마운트 시 오버레이 모니터링 정리
onUnmounted(() => {
  cleanupOverlayMonitors();
  
  // MutationObserver 정리
  mutationObservers.forEach((observer, chartId) => {
    observer.disconnect();
    console.log(`[Cleanup] 차트 ${chartId} MutationObserver 정리`);
  });
  mutationObservers.clear();
});

// 오버레이 관리 상태
const showOverlay = ref(true) // 오버레이 표시 여부 (true로 변경)
const overlayEnabled = ref(true) // 오버레이 기능 활성화 여부

// 오버레이 표시/숨김 토글
const toggleOverlay = () => {
  showOverlay.value = !showOverlay.value;
  console.log(`[Overlay] 오버레이 ${showOverlay.value ? '표시' : '숨김'}`);
  
  if (showOverlay.value) {
    // 모든 차트에 오버레이 재생성
    activeCharts.value.forEach((chart, index) => {
      recreateOverlay(chart.id, index);
    });
  } else {
    // 모든 차트에서 오버레이 제거
    activeCharts.value.forEach((chart) => {
      const existingOverlay = document.querySelector(`#chart_${chart.id} .chart-overlay`);
      if (existingOverlay) {
        existingOverlay.remove();
        console.log(`[Overlay] 차트 ${chart.id} 오버레이 제거됨`);
      }
    });
  }
};

// 오버레이 기능 활성화/비활성화 토글
const toggleOverlayFunctionality = () => {
  overlayEnabled.value = !overlayEnabled.value;
  console.log(`[Overlay] 오버레이 기능 ${overlayEnabled.value ? '활성화' : '비활성화'}`);
  
  if (overlayEnabled.value) {
    // 모든 차트에 오버레이 재생성
    activeCharts.value.forEach((chart, index) => {
      recreateOverlay(chart.id, index);
    });
  } else {
    // 모든 차트에서 오버레이 제거
    activeCharts.value.forEach((chart) => {
      const existingOverlay = document.querySelector(`#chart_${chart.id} .chart-overlay`);
      if (existingOverlay) {
        existingOverlay.remove();
        console.log(`[Overlay] 차트 ${chart.id} 오버레이 제거됨`);
      }
    });
  }
};

// 차트 선택 버튼들
const chartSelectionButtons = ref([]);

// 오버레이 제어 버튼들
const overlayControlButtons = ref([]);

// 컨텍스트 메뉴에서 크로스헤어를 사용하여 주문 라인 생성
const placeContextMenuOrderWithCrosshair = () => {
  if (!contextMenuChartId.value) {
    console.error('[placeContextMenuOrderWithCrosshair] 차트 ID가 설정되지 않았습니다.');
    return;
  }

  console.log('[placeContextMenuOrderWithCrosshair] 크로스헤어를 사용하여 주문 라인 생성 시작');

  // 크로스헤어를 사용하여 주문 라인 생성
  const orderLine = createOrderLineWithCrosshair(
    contextMenuChartId.value,
    contextMenuOrderType.value,
    contextMenuOrderQuantity.value
  );

  if (orderLine) {
    console.log('[placeContextMenuOrderWithCrosshair] 주문 라인 생성 완료:', orderLine);
  } else {
    console.error('[placeContextMenuOrderWithCrosshair] 주문 라인 생성에 실패했습니다.');
  }

  // 컨텍스트 메뉴 숨기기
  hideContextMenu();
};

// 라인 ID와 주문 ID를 매핑하는 Map
const lineIdToOrderId = new Map<string, string>();

// 위젯에서 드로잉 이벤트 구독 (이동/수정/삭제)
const subscribeToDrawingEvents = (widget: any, chart: any) => {
  try {
    widget.subscribe('drawing_event', (id: string, type: string) => {
      console.log(`[DrawingEvent] 드로잉 이벤트 발생 - ID: ${id}, 타입: ${type}`);
      
      // 우리가 만든 라인만 처리
      if (!lineIdToOrderId.has(id)) {
        console.log(`[DrawingEvent] 알 수 없는 라인 ID: ${id}`);
        return;
      }

      const orderId = lineIdToOrderId.get(id);
      console.log(`[DrawingEvent] 주문 라인 이벤트 - 주문 ID: ${orderId}, 타입: ${type}`);

      // 이동/수정 시 현재 좌표 읽어서 OMS modify 호출
      if (type === 'modify' || type === 'move') {
        try {
          const shapeApi = chart.getShapeById(id);
          if (shapeApi) {
            const points = shapeApi.getPoints();
            if (points && points.length > 0) {
              const newPrice = points[0].price;
              console.log(`[DrawingEvent] 라인 이동/수정 - 새로운 가격: ${newPrice}`);
              
              // TODO: OMS modify 호출
              // modifyOrder(orderId, { price: newPrice });
              
              // 주문 라인 데이터 업데이트
              const orderLine = orderLines.value.find(ol => ol.id === orderId);
              if (orderLine) {
                orderLine.price = newPrice;
                console.log(`[DrawingEvent] 주문 라인 가격 업데이트: ${newPrice}`);
              }
            }
          }
        } catch (error) {
          console.error(`[DrawingEvent] 라인 정보 읽기 실패:`, error);
        }
      }

      // 삭제(사용자가 라인 지운 경우) 처리
      if (type === 'remove') {
        console.log(`[DrawingEvent] 라인 삭제 감지 - 주문 ID: ${orderId}`);
        
        // TODO: OMS cancel 호출
        // cancelOrder(orderId);
        
        // 주문 라인 데이터에서 제거
        const index = orderLines.value.findIndex(ol => ol.id === orderId);
        if (index !== -1) {
          orderLines.value.splice(index, 1);
          console.log(`[DrawingEvent] 주문 라인 데이터에서 제거됨`);
        }
        
        // 매핑 테이블에서 제거
        lineIdToOrderId.delete(id);
      }
    });
    
    console.log(`[subscribeToDrawingEvents] 드로잉 이벤트 구독 완료`);
    
  } catch (error) {
    console.error(`[subscribeToDrawingEvents] 드로잉 이벤트 구독 실패:`, error);
  }
};
</script>

