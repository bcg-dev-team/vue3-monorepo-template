<!--
  각 차트를 표시하는 개별 윈도우 컴포넌트
-->
<template>
  <div
    class="chart-window"
    :class="{
      selected: isSelected,
      unselected: !isSelected,
    }"
    @click="handleSelect"
  >
    <!-- 차트 헤더 -->
    <div class="chart-header">
      <!-- 왼쪽 영역 -->
      <div class="header-left">
        <!-- 동기화 색상 표시 -->
        <div
          v-if="chart.syncColor"
          class="sync-color-badge"
          :style="{ backgroundColor: chart.syncColor }"
        >
          {{ getSyncColorLabel(chart.syncColor) }}
        </div>

        <!-- 심볼 드롭다운 -->
        <div class="symbol-info">
          <BaseInputSelect
            v-model="selectedSymbol"
            :options="symbolOptions"
            size="sm"
            placeholder="심볼 선택"
          />
        </div>

        <!-- 시간대 드롭다운 -->
        <div class="timeframe-info">
          <BaseInputSelect
            v-model="selectedTimeframe"
            :options="timeframeOptions"
            size="sm"
            placeholder="시간대 선택"
          />
        </div>
      </div>

      <!-- 오른쪽 영역 -->
      <div class="header-right">
        <button class="header-button" @click.stop="handleExternalLink">
          <BaseIcon name="external-link" :size="16" />
        </button>
        <button class="header-button" @click.stop="handleClose">
          <BaseIcon name="cert" :size="16" />
        </button>
      </div>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-content">
      <TradingViewChart
        ref="tradingViewChartRef"
        :symbol="chart.symbol.ticker"
        :timeframe="chart.timeframe"
        :height="chartHeight"
        :chart-id="chart.id"
        :is-dialog-open="isDialogOpen"
        :key="`chart-${chart.id}-${chart.symbol.ticker}-${chart.timeframe}`"
      />
    </div>

    <!-- 차트 하단 컨트롤 -->
    <div class="chart-controls">
      <div class="controls-left">
        <button class="control-button" @click.stop="handlePrevious">
          <BaseIcon name="cert" :size="16" />
        </button>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: '50%' }" />
        </div>
      </div>
      <button class="control-button" @click.stop="handleNext">
        <BaseIcon name="cert" :size="16" />
      </button>
    </div>

    <!-- 동기화 색상 선택 패널 (선택된 차트에만 표시) -->
    <!-- <div v-if="isSelected" class="sync-panel">
      <div class="sync-panel-content">
        <div class="sync-title">심볼 동기화</div>
        <div class="sync-colors">
          <button
            v-for="color in syncColors"
            :key="color.value"
            class="sync-color-button"
            :class="{ active: chart.syncColor === color.value }"
            :style="{ backgroundColor: color.value }"
            @click.stop="handleSyncColorSelect(color.value)"
          >
            {{ color.label }}
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { CHART_TIMEFRAMES, ALL_SYMBOLS, SYNC_COLORS } from '@template/types';
import type { ChartWindowProps, TradingSymbol } from '@template/types';
import { BaseIcon, BaseInputSelect } from '@template/ui';
import TradingViewChart from './TradingViewChart.vue';
import { computed, ref, watch } from 'vue';
import './ChartWindow.scss';

// Props 정의 (공통 타입 사용)
const props = defineProps<ChartWindowProps & { isDialogOpen?: boolean }>();

// Emits 정의
interface Emits {
  (e: 'select'): void;
  (e: 'close'): void;
  (e: 'sync', syncColor: string): void;
  (e: 'external-link'): void;
  (e: 'previous'): void;
  (e: 'next'): void;
  (e: 'symbol-change', symbol: TradingSymbol): void;
  (e: 'timeframe-change', timeframe: string): void;
}

const emit = defineEmits<Emits>();

// 동기화 색상 옵션 (상수 사용)
const syncColors = SYNC_COLORS;

// 시간대 옵션 사용
const timeframes = CHART_TIMEFRAMES;

// 전체 심볼 목록 - types 패키지에서 관리되는 전체 심볼 리스트 사용
const allSymbols = ALL_SYMBOLS;

// 선택된 심볼과 시간대 관리를 위한 ref
const selectedSymbol = ref(props.chart.symbol.ticker);
const selectedTimeframe = ref(props.chart.timeframe);

// 심볼 옵션 배열 생성
const symbolOptions = computed(() =>
  allSymbols.map((symbol) => ({
    value: symbol.ticker,
    label: `${symbol.ticker} - ${symbol.description}`,
  }))
);

// 시간대 옵션 배열 생성
const timeframeOptions = computed(() =>
  timeframes.map((timeframe) => ({
    value: timeframe.value,
    label: timeframe.label,
  }))
);

// 차트 높이 계산 (헤더와 컨트롤 제외)
const chartHeight = computed(() => {
  // 컨테이너 높이에서 헤더(40px)와 컨트롤(40px)을 제외한 높이
  return 320; // 400px - 40px(헤더) - 40px(컨트롤) = 320px
});

// 동기화 색상 라벨 가져오기
const getSyncColorLabel = (color: string): string => {
  const colorOption = syncColors.find((c) => c.value === color);
  return colorOption?.label || 'A';
};

// 이벤트 핸들러
const handleSelect = () => {
  if (!props.isSelected) {
    emit('select');
  }
};

const handleClose = () => {
  emit('close');
};

const handleSyncColorSelect = (color: string) => {
  emit('sync', color);
};

const handleExternalLink = () => {
  emit('external-link');
};

const handlePrevious = () => {
  emit('previous');
};

const handleNext = () => {
  emit('next');
};

// 선택된 심볼이 변경될 때 처리
watch(selectedSymbol, (newSymbolTicker) => {
  if (newSymbolTicker) {
    const symbol = allSymbols.find((s) => s.ticker === newSymbolTicker);
    if (symbol) {
      emit('symbol-change', symbol);
    }
  }
});

// 선택된 시간대가 변경될 때 처리
watch(selectedTimeframe, (newTimeframe) => {
  if (newTimeframe) {
    emit('timeframe-change', newTimeframe);
  }
});

// 차트 props 변경 시 로컬 상태도 동기화
watch(
  () => props.chart.symbol.ticker,
  (newTicker) => {
    selectedSymbol.value = newTicker;
  },
  { immediate: true }
);

watch(
  () => props.chart.timeframe,
  (newTimeframe) => {
    selectedTimeframe.value = newTimeframe;
  },
  { immediate: true }
);

// TradingViewChart 컴포넌트 ref
const tradingViewChartRef = ref();

// 외부에서 ChartManager에 접근할 수 있도록 노출
defineExpose({
  getChartManager: () => {
    return tradingViewChartRef.value?.chartManager || null;
  },
});
</script>
