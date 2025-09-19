<!--
  Figma 컴포넌트: 차트 그리드
  다중 차트를 그리드 형태로 배치하는 컴포넌트
-->
<template>
  <div class="chart-grid" :class="gridLayoutClass">
    <ChartWindow
      v-for="chart in sortedCharts"
      :key="chart.id"
      :ref="(el: any) => setChartWindowRef(chart.id, el)"
      :chart="chart"
      :is-selected="chart.id === selectedChart"
      @select="() => handleChartSelect(chart.id)"
      @close="() => handleChartClose(chart.id)"
      @sync="(syncColor: string) => handleChartSync(chart.id, syncColor)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ChartData, ChartLayout } from './MultiChartLayout.vue';
import ChartWindow from './ChartWindow.vue';
import { computed, ref } from 'vue';
import './ChartGrid.scss';

// Props 정의
interface Props {
  charts: ChartData[];
  selectedChart: string | null;
  layout: ChartLayout;
}

const props = defineProps<Props>();

// Emits 정의
interface Emits {
  (e: 'chart-select', chartId: string): void;
  (e: 'chart-close', chartId: string): void;
  (e: 'chart-sync', chartId: string, syncColor: string): void;
}

const emit = defineEmits<Emits>();

// ChartWindow 컴포넌트 ref 관리
const chartWindowRefs = ref<Map<string, any>>(new Map());

const setChartWindowRef = (chartId: string, el: any) => {
  if (el) {
    chartWindowRefs.value.set(chartId, el);
  } else {
    chartWindowRefs.value.delete(chartId);
  }
};

// 그리드 레이아웃 클래스 계산
const gridLayoutClass = computed(() => {
  const layoutMap: Record<ChartLayout, string> = {
    '1x1': 'grid-cols-1 grid-rows-1',
    '2x2': 'grid-cols-2 grid-rows-2',
    '3x3': 'grid-cols-3 grid-rows-3',
    '4x4': 'grid-cols-4 grid-rows-4',
  };
  return layoutMap[props.layout];
});

// 위치별로 정렬된 차트 목록
const sortedCharts = computed(() => {
  return [...props.charts].sort((a, b) => {
    if (a.position.row !== b.position.row) {
      return a.position.row - b.position.row;
    }
    return a.position.col - b.position.col;
  });
});

// 이벤트 핸들러
const handleChartSelect = (chartId: string) => {
  emit('chart-select', chartId);
};

const handleChartClose = (chartId: string) => {
  emit('chart-close', chartId);
};

const handleChartSync = (chartId: string, syncColor: string) => {
  emit('chart-sync', chartId, syncColor);
};

// ChartWindow ref 접근을 위한 메서드 노출
defineExpose({
  getChartWindowRef: (chartId: string) => {
    return chartWindowRefs.value.get(chartId) || null;
  },
});
</script>
