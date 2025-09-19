<!--
  Figma 컴포넌트: 멀티차트 레이아웃
  다중 차트를 표시하는 메인 레이아웃 컴포넌트
-->
<template>
  <div class="multi-chart-layout">
    <!-- 좌측 툴바 (51px 고정) -->
    <div class="chart-toolbar">
      <ChartToolbar />
    </div>

    <!-- 메인 차트 영역 -->
    <div class="chart-main-area">
      <!-- 상단 글로벌 설정 영역 -->
      <div class="chart-global-settings">
        <ChartGlobalSettings
          :selected-chart="selectedChart"
          @timeframe-change="handleTimeframeChange"
          @indicator-change="handleIndicatorChange"
          @layout-change="handleLayoutChange"
          @chart-manage="handleChartManage"
          @chart-settings="handleChartSettings"
        />
      </div>

      <!-- 차트 그리드 영역 -->
      <div class="chart-grid-container">
        <ChartGrid
          ref="chartGridRef"
          :charts="charts"
          :selected-chart="selectedChart"
          :layout="currentLayout"
          @chart-select="handleChartSelect"
          @chart-close="handleChartClose"
          @chart-sync="handleChartSync"
        />
      </div>
    </div>

    <!-- 차트 설정 다이얼로그 -->
    <ChartSettingsDialog
      :is-visible="showSettingsDialog"
      :chart-manager="getSelectedChartManager()"
      @close="handleSettingsDialogClose"
      @settings-changed="handleSettingsChanged"
    />
  </div>
</template>

<script setup lang="ts">
import ChartSettingsDialog from './ChartSettingsDialog.vue';
import ChartGlobalSettings from './ChartGlobalSettings.vue';
import type { TradingSymbol } from '@template/types';
import ChartToolbar from './ChartToolbar.vue';
import { ref, computed, watch } from 'vue';
import ChartGrid from './ChartGrid.vue';
import './MultiChartLayout.scss';

// 차트 레이아웃 타입 정의
export type ChartLayout = '1x1' | '2x2' | '3x3' | '4x4';

// 차트 데이터 타입 정의
export interface ChartData {
  id: string;
  symbol: TradingSymbol;
  timeframe: string;
  isSelected: boolean;
  syncColor?: string;
  position: { row: number; col: number };
}

// Props 정의
interface Props {
  initialSymbols?: TradingSymbol[];
}

const props = withDefaults(defineProps<Props>(), {
  initialSymbols: () => [],
});

// Emits 정의
interface Emits {
  (e: 'chart-select', chart: ChartData): void;
  (e: 'symbol-change', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 상태 관리
const charts = ref<ChartData[]>([]);
const selectedChart = ref<string | null>(null);
const currentLayout = ref<ChartLayout>('2x2');
const showSettingsDialog = ref(false);

// 컴포넌트 ref
const chartGridRef = ref();

// 차트 추가
const addChart = (symbol: TradingSymbol) => {
  const newChart: ChartData = {
    id: `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    symbol,
    timeframe: '1h',
    isSelected: false,
    position: getNextAvailablePosition(),
  };

  charts.value.push(newChart);

  // 첫 번째 차트인 경우 선택
  if (charts.value.length === 1) {
    selectChart(newChart.id);
  }
};

// 차트 제거
const removeChart = (chartId: string) => {
  const index = charts.value.findIndex((chart) => chart.id === chartId);
  if (index === -1) return;

  charts.value.splice(index, 1);

  // 선택된 차트가 제거된 경우 다른 차트 선택
  if (selectedChart.value === chartId) {
    selectedChart.value = charts.value.length > 0 ? charts.value[0].id : null;
  }
};

// 차트 선택
const selectChart = (chartId: string) => {
  // 모든 차트 선택 해제
  charts.value.forEach((chart) => {
    chart.isSelected = false;
  });

  // 선택된 차트만 선택 상태로 변경
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.isSelected = true;
    selectedChart.value = chartId;
    emit('chart-select', chart);
    emit('symbol-change', chart.symbol);
  }
};

// 다음 사용 가능한 위치 계산
const getNextAvailablePosition = (): { row: number; col: number } => {
  const layoutConfig = {
    '1x1': { rows: 1, cols: 1 },
    '2x2': { rows: 2, cols: 2 },
    '3x3': { rows: 3, cols: 3 },
    '4x4': { rows: 4, cols: 4 },
  };

  const config = layoutConfig[currentLayout.value];
  const usedPositions = charts.value.map((chart) => chart.position);

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      const position = { row, col };
      if (!usedPositions.some((pos) => pos.row === row && pos.col === col)) {
        return position;
      }
    }
  }

  // 모든 위치가 사용 중인 경우 첫 번째 위치 반환
  return { row: 0, col: 0 };
};

// 이벤트 핸들러
const handleChartSelect = (chartId: string) => {
  selectChart(chartId);
};

const handleChartClose = (chartId: string) => {
  removeChart(chartId);
};

const handleChartSync = (chartId: string, syncColor: string) => {
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.syncColor = syncColor;
  }
};

const handleTimeframeChange = (timeframe: string) => {
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      chart.timeframe = timeframe;
    }
  }
};

const handleIndicatorChange = (indicator: any) => {
  console.log('Indicator changed:', indicator);

  // TODO: 선택된 차트에 지표 적용
  // TradingViewChart 컴포넌트에서 직접 지표를 추가하도록 수정 필요
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      console.log('지표를 선택된 차트에 적용:', chart.id, indicator);
    }
  }
};

// 레이아웃에 따른 차트 초기화
const initializeChartsForLayout = (layout: ChartLayout) => {
  // 기존 차트 모두 제거
  charts.value = [];

  // 레이아웃에 따른 차트 개수 결정
  const chartCount = getChartCountForLayout(layout);

  // 기본 심볼들로 차트 생성 (최대 16개까지 지원)
  const defaultSymbols = [
    {
      symbol: 'EURUSD',
      ticker: 'EURUSD',
      description: 'EUR/USD',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'GBPUSD',
      ticker: 'GBPUSD',
      description: 'GBP/USD',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'USDJPY',
      ticker: 'USDJPY',
      description: 'USD/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'AUDUSD',
      ticker: 'AUDUSD',
      description: 'AUD/USD',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'USDCAD',
      ticker: 'USDCAD',
      description: 'USD/CAD',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'NZDUSD',
      ticker: 'NZDUSD',
      description: 'NZD/USD',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'EURGBP',
      ticker: 'EURGBP',
      description: 'EUR/GBP',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'EURJPY',
      ticker: 'EURJPY',
      description: 'EUR/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'GBPJPY',
      ticker: 'GBPJPY',
      description: 'GBP/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'AUDJPY',
      ticker: 'AUDJPY',
      description: 'AUD/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'CADJPY',
      ticker: 'CADJPY',
      description: 'CAD/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'NZDJPY',
      ticker: 'NZDJPY',
      description: 'NZD/JPY',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'EURCHF',
      ticker: 'EURCHF',
      description: 'EUR/CHF',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'GBPCHF',
      ticker: 'GBPCHF',
      description: 'GBP/CHF',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'AUDCHF',
      ticker: 'AUDCHF',
      description: 'AUD/CHF',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
    {
      symbol: 'NZDCHF',
      ticker: 'NZDCHF',
      description: 'NZD/CHF',
      exchange: 'FOREX',
      type: 'forex' as const,
    },
  ];

  for (let i = 0; i < chartCount; i++) {
    const symbol = defaultSymbols[i] || defaultSymbols[0];
    addChart(symbol);
  }

  // 첫 번째 차트를 선택된 차트로 설정
  if (charts.value.length > 0) {
    selectedChart.value = charts.value[0].id;
  }
};

// 레이아웃별 차트 개수 반환
const getChartCountForLayout = (layout: ChartLayout): number => {
  const countMap: Record<ChartLayout, number> = {
    '1x1': 1,
    '2x2': 4,
    '3x3': 9,
    '4x4': 16,
  };
  return countMap[layout] || 4;
};

const handleLayoutChange = (layout: ChartLayout) => {
  currentLayout.value = layout;
  // 레이아웃 변경 시 차트 초기화 및 재배치
  initializeChartsForLayout(layout);
};

const handleChartManage = () => {
  // TODO: 차트 관리 모달 표시 또는 차트 추가/제거 기능
  console.log('차트 관리 클릭');
};

// 차트 설정 다이얼로그 관련
const handleChartSettings = () => {
  console.log('차트 설정 버튼 클릭됨');
  showSettingsDialog.value = true;
};

const handleSettingsDialogClose = () => {
  console.log('설정 다이얼로그 닫기');
  showSettingsDialog.value = false;
};

const handleSettingsChanged = (settings: any) => {
  console.log('Chart settings changed:', settings);
  // 설정이 변경되면 이미 ChartManager에서 자동으로 적용됨
};

// 선택된 차트의 ChartManager 가져오기
const getSelectedChartManager = () => {
  if (!selectedChart.value) {
    console.log('선택된 차트가 없음');
    return null;
  }

  try {
    // ChartGrid에서 선택된 ChartWindow 가져오기
    const chartWindow = chartGridRef.value?.getChartWindowRef(selectedChart.value);
    if (chartWindow) {
      // ChartWindow에서 ChartManager 가져오기
      const chartManager = chartWindow.getChartManager();
      console.log('선택된 차트 Manager 반환:', selectedChart.value, chartManager);
      return chartManager;
    }
  } catch (error) {
    console.error('Failed to get chart manager:', error);
  }

  console.log('차트 Manager를 찾을 수 없음');
  return null;
};

// 초기 차트 추가
watch(
  () => props.initialSymbols,
  (symbols) => {
    if (symbols.length > 0 && charts.value.length === 0) {
      // 기본 2x2 레이아웃으로 차트 초기화
      initializeChartsForLayout('2x2');
    }
  },
  { immediate: true }
);

// 선택된 차트 정보
const selectedChartData = computed(() => {
  return charts.value.find((chart) => chart.id === selectedChart.value) || null;
});

// 선택된 차트의 심볼 변경
const changeSelectedChartSymbol = (symbol: TradingSymbol) => {
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      chart.symbol = symbol;
      emit('symbol-change', symbol);
    }
  }
};

// 차트 추가 (외부에서 호출 가능)
const addNewChart = (symbol: TradingSymbol) => {
  addChart(symbol);
};

// 차트 제거 (외부에서 호출 가능)
const removeChartById = (chartId: string) => {
  removeChart(chartId);
};

// 선택된 차트 ID 가져오기
const getSelectedChartId = () => {
  return selectedChart.value;
};

// 차트 목록 가져오기
const getCharts = () => {
  return charts.value;
};

// 외부에서 호출 가능한 메서드들 expose
defineExpose({
  changeSelectedChartSymbol,
  addNewChart,
  removeChartById,
  getSelectedChartId,
  getCharts,
  selectedChartData,
});
</script>
