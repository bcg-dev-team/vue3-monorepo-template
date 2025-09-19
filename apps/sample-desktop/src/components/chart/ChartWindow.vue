<!--
  Figma 컴포넌트: 개별 차트 윈도우
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

        <!-- 심볼 정보 -->
        <div class="symbol-info">
          <div class="symbol-name">{{ chart.symbol.ticker }}</div>
          <BaseIcon name="arrow-down" :size="16" class="dropdown-icon" />
        </div>

        <!-- 시간대 정보 -->
        <div class="timeframe-info">
          <BaseIcon name="chart-1h" :size="16" />
          <BaseIcon name="arrow-down" :size="16" class="dropdown-icon" />
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
import type { ChartData } from './MultiChartLayout.vue';
import TradingViewChart from './TradingViewChart.vue';
import { BaseIcon } from '@template/ui';
import { computed, ref } from 'vue';
import './ChartWindow.scss';

// Props 정의
interface Props {
  chart: ChartData;
  isSelected: boolean;
}

const props = defineProps<Props>();

// Emits 정의
interface Emits {
  (e: 'select'): void;
  (e: 'close'): void;
  (e: 'sync', syncColor: string): void;
  (e: 'external-link'): void;
  (e: 'previous'): void;
  (e: 'next'): void;
}

const emit = defineEmits<Emits>();

// 동기화 색상 옵션
const syncColors = [
  { value: '--base-colors-blue-blue800-deep', label: 'A' },
  { value: '--base-colors-green-green700', label: 'B' },
  { value: '--base-colors-purple-purple600', label: 'C' },
  { value: '--base-colors-primary-primary900', label: 'D' },
  { value: '--base-colors-neutral-neutral600', label: 'E' },
  { value: '--base-colors-red-red700', label: 'F' },
];

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

// TradingViewChart 컴포넌트 ref
const tradingViewChartRef = ref();

// 외부에서 ChartManager에 접근할 수 있도록 노출
defineExpose({
  getChartManager: () => {
    return tradingViewChartRef.value?.chartManager || null;
  },
});
</script>
