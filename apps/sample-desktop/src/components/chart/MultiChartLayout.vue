<!--
  @fileoverview 다중 차트를 표시하는 메인 레이아웃 컴포넌트
  @component MultiChartLayout
  @figma 다중 차트 레이아웃
-->
<template>
  <div class="multi-chart-layout">
    <!-- 좌측 드로잉 툴바 (TBD) -->
    <!-- TODO: 툴바 구현을 위한 공식 API 미제공으로, 기획 검토 요청 필요 -->
    <!-- <div class="chart-drawing-toolbar">
      <ChartDrawingToolbar />
    </div> -->

    <!-- 메인 차트 영역 -->
    <div class="chart-main-area">
      <!-- 상단 툴바 영역 -->
      <div class="chart-top-toolbar">
        <ChartTopToolbar
          :selected-chart="selectedChart"
          :selected-chart-data="getSelectedChartData()"
          :current-layout="currentLayout"
          @timeframe-change="handleTimeframeChange"
          @indicator-change="handleIndicatorChange"
          @layout-change="handleLayoutChange"
          @chart-manage="handleChartManage"
          @chart-settings="handleChartSettings"
          @workspace-change="handleWorkspaceChange"
          @workspace-save="handleWorkspaceSave"
          @workspace-delete="handleWorkspaceDelete"
        />
      </div>

      <!-- 차트 그리드 영역 -->
      <div class="chart-grid-container">
        <ChartGrid
          ref="chartGridRef"
          :charts="charts"
          :selected-chart="selectedChart"
          :layout="currentLayout"
          :is-dialog-open="showSettingsDialog || showIndicatorDialog"
          @chart-select="handleChartSelect"
          @chart-close="handleChartClose"
          @chart-sync="handleChartSync"
          @chart-symbol-change="handleChartSymbolChange"
          @chart-timeframe-change="handleChartTimeframeChange"
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

    <!-- 차트 지표 다이얼로그 -->
    <ChartIndicatorDialog
      :is-visible="showIndicatorDialog"
      :selected-chart-id="selectedChart"
      @close="handleIndicatorDialogClose"
      @indicator-select="handleIndicatorSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { getChartCountForLayout, getNextAvailablePosition } from '@/utils/chart/ChartLayoutUtils';
import type { ChartLayout, ChartData, TradingSymbol } from '@template/types';
import { useWorkspaceSync } from '../../composables/useWorkspaceSync';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useWorkspace } from '../../composables/useWorkspace';
import ChartIndicatorDialog from './ChartIndicatorDialog.vue';
import ChartSettingsDialog from './ChartSettingsDialog.vue';
import ChartDrawingToolbar from './ChartDrawingToolbar.vue';
import { DEFAULT_FOREX_SYMBOLS } from '@template/types';
import ChartTopToolbar from './ChartTopToolbar.vue';
import ChartGrid from './ChartGrid.vue';

import './MultiChartLayout.scss';

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
// 워크스페이스 동기화
const {
  charts: workspaceCharts,
  isCustomWorkspaceActive: isCustomWorkspaceActiveComputed,
  updateCharts: updateWorkspaceCharts,
  updateChart: updateWorkspaceChart,
  saveChartsToWorkspace,
  loadChartsFromWorkspace,
} = useWorkspaceSync();

// 워크스페이스 활성화 상태
const isCustomWorkspaceActive = computed(() => isCustomWorkspaceActiveComputed.value);

// useWorkspace에서 워크스페이스 변경 감지
const { currentWorkspaceId } = useWorkspace();

const charts = ref<ChartData[]>([]);
const selectedChart = ref<string | null>(null);
const currentLayout = ref<ChartLayout>('2x2');
const showSettingsDialog = ref(false);
const showIndicatorDialog = ref(false);

// 컴포넌트 ref
const chartGridRef = ref();

// 차트 추가
const addChart = (symbol: TradingSymbol) => {
  const newChart: ChartData = {
    id: `chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    symbol,
    timeframe: '1h',
    isSelected: false,
    position: getNextAvailablePositionLocal(),
  };

  charts.value.push(newChart);

  // 워크스페이스 동기화
  if (isCustomWorkspaceActive.value) {
    console.log('차트 추가로 인한 워크스페이스 동기화:', newChart);
    updateWorkspaceCharts(charts.value);
  }

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

  // 워크스페이스 동기화
  if (isCustomWorkspaceActive.value) {
    console.log('차트 제거로 인한 워크스페이스 동기화:', chartId);
    updateWorkspaceCharts(charts.value);
  }

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
const getNextAvailablePositionLocal = (): { row: number; col: number } => {
  return getNextAvailablePosition(charts.value, currentLayout.value);
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

const handleChartSymbolChange = (chartId: string, symbol: any) => {
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.symbol = symbol;

    // 워크스페이스 동기화
    if (isCustomWorkspaceActive.value) {
      console.log('심볼 변경으로 인한 워크스페이스 동기화:', chartId, symbol);
      updateWorkspaceChart(chartId, { symbol });
    }

    // 선택된 차트인 경우 심볼 change emit
    if (selectedChart.value === chartId) {
      emit('symbol-change', symbol);
    }
  }
};

const handleChartTimeframeChange = (chartId: string, timeframe: string) => {
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.timeframe = timeframe;

    // 워크스페이스 동기화
    if (isCustomWorkspaceActive.value) {
      console.log('시간대 변경으로 인한 워크스페이스 동기화:', chartId, timeframe);
      updateWorkspaceChart(chartId, { timeframe });
    }
  }
};

const handleIndicatorChange = (indicator: any) => {
  console.log('Indicator changed:', indicator);

  if (indicator === 'indicator-dialog-open') {
    showIndicatorDialog.value = true;
    return;
  }

  // TODO: 선택된 차트에 지표 적용
  // TradingViewChart 컴포넌트에서 직접 지표를 추가하도록 수정 필요
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      console.log('지표를 선택된 차트에 적용:', chart.id, indicator);
    }
  }
};

const handleIndicatorDialogClose = () => {
  showIndicatorDialog.value = false;
};

const handleIndicatorSelect = (indicator: any) => {
  console.log('선택된 지표:', indicator);
  // TODO: 선택된 차트에 지표 적용
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
  const chartCount = getChartCountForLayoutLocal(layout);

  // 기본 심볼들로 차트 생성 (최대 16개까지 지원)
  const defaultSymbols = DEFAULT_FOREX_SYMBOLS;

  for (let i = 0; i < chartCount; i++) {
    const symbol = defaultSymbols[i] || defaultSymbols[0];
    addChart(symbol);
  }

  // 첫 번째 차트를 선택된 차트로 설정
  if (charts.value.length > 0) {
    selectedChart.value = charts.value[0].id;
  }
};

// 레이아웃별 차트 개수 반환 (유틸리티 함수 사용)
const getChartCountForLayoutLocal = (layout: ChartLayout): number => {
  return getChartCountForLayout(layout);
};

const handleLayoutChange = (layout: ChartLayout) => {
  currentLayout.value = layout;

  // 워크스페이스 동기화
  if (isCustomWorkspaceActive.value) {
    console.log('레이아웃 변경으로 인한 워크스페이스 동기화:', layout);
    // 전체 차트 데이터를 워크스페이스에 저장
    updateWorkspaceCharts(charts.value);
  }

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

// 워크스페이스 변경 이벤트 핸들러
const handleWorkspaceChange = async (workspace: any) => {
  console.log('워크스페이스 변경:', workspace);

  try {
    // 워크스페이스에서 차트 데이터 로드
    const savedCharts = loadChartsFromWorkspace();

    if (savedCharts.length > 0) {
      console.log('워크스페이스에서 차트 로드:', savedCharts.length, '개');
      charts.value = savedCharts;

      // 첫 번째 차트 선택
      if (charts.value.length > 0) {
        selectChart(charts.value[0].id);
      }
    } else {
      console.log('워크스페이스에 저장된 차트가 없음, 기본 차트 추가');
      // 기본 차트 추가
      if (charts.value.length === 0) {
        addChart(DEFAULT_FOREX_SYMBOLS[0]);
      }
    }
  } catch (error) {
    console.error('워크스페이스 로드 실패:', error);
  }
};

// 워크스페이스 변경 감시 (useWorkspaceSync에서 발생하는 이벤트)
watch(isCustomWorkspaceActive, (isActive, wasActive) => {
  console.log('워크스페이스 활성화 상태 변경:', { isActive, wasActive });

  if (isActive && !wasActive) {
    // 커스텀 워크스페이스로 전환된 경우
    console.log('커스텀 워크스페이스로 전환됨');
    const savedCharts = loadChartsFromWorkspace();
    if (savedCharts.length > 0) {
      charts.value = savedCharts;
      if (charts.value.length > 0) {
        selectChart(charts.value[0].id);
      }
    }
  } else if (!isActive && wasActive) {
    // 템플릿 워크스페이스로 전환된 경우
    console.log('템플릿 워크스페이스로 전환됨');
    // 템플릿 워크스페이스는 기본 차트로 초기화
    charts.value = [];
    addChart(DEFAULT_FOREX_SYMBOLS[0]);
  }
});

// 워크스페이스 ID 변경 감지
watch(currentWorkspaceId, (newWorkspaceId, oldWorkspaceId) => {
  console.log('워크스페이스 ID 변경:', { newWorkspaceId, oldWorkspaceId });

  if (newWorkspaceId !== oldWorkspaceId) {
    if (newWorkspaceId === 'custom-workspace') {
      // 커스텀 워크스페이스로 전환
      console.log('커스텀 워크스페이스로 전환');
      const savedCharts = loadChartsFromWorkspace();
      if (savedCharts.length > 0) {
        console.log('커스텀 워크스페이스에서 차트 로드:', savedCharts.length, '개');
        charts.value = savedCharts;
        if (charts.value.length > 0) {
          selectChart(charts.value[0].id);
        }
      } else {
        console.log('커스텀 워크스페이스에 저장된 차트가 없음, 기본 차트 추가');
        charts.value = [];
        addChart(DEFAULT_FOREX_SYMBOLS[0]);
      }
    } else {
      // 템플릿 워크스페이스로 전환
      console.log('템플릿 워크스페이스로 전환:', newWorkspaceId);
      charts.value = [];
      addChart(DEFAULT_FOREX_SYMBOLS[0]);
    }
  }
});

const handleWorkspaceSave = (workspace: any) => {
  console.log('워크스페이스 저장됨:', workspace);
  // 현재 차트 상태를 워크스페이스에 저장
  if (isCustomWorkspaceActive.value) {
    updateWorkspaceCharts(charts.value);
  }
};

const handleWorkspaceDelete = (workspaceId: string) => {
  console.log('워크스페이스 삭제됨:', workspaceId);
  // 삭제된 워크스페이스가 현재 활성화된 경우 기본 상태로 리셋
  if (isCustomWorkspaceActive.value) {
    charts.value = [];
    addChart(DEFAULT_FOREX_SYMBOLS[0]);
  }
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

// 선택된 차트 데이터 가져오기
const getSelectedChartData = () => {
  return selectedChartData.value;
};

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
