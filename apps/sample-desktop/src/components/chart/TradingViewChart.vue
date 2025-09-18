<template>
  <div id="tv_chart_container" class="chart-wrapper"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { getChartManager } from '@/services/managers';

interface Props {
  symbol?: string;
}

interface Emits {
  (e: 'chart-ready'): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  symbol: 'EURTRY',
});

const isChartReady = ref<boolean>(false);

// 심볼 변경 감지
watch(
  () => props.symbol,
  (newSymbol) => {
    if (isChartReady.value) {
      console.log('[TradingView] Symbol changed:', newSymbol);
      const chartManager = getChartManager();
      chartManager.changeSymbol(newSymbol);
    }
  }
);

onMounted(async () => {
  try {
    // ChartManager를 사용하여 차트 초기화
    const chartManager = getChartManager();
    await chartManager.initializeChart({
      symbol: props.symbol,
      interval: '1', // 고정값
      container: 'tv_chart_container',
      width: '100%',
      height: '100%',
      theme: 'light',
      locale: 'ko',
      debug: false,
    });

    isChartReady.value = true;
    emit('chart-ready');
    console.log('[TradingView] Chart initialized successfully');
  } catch (error) {
    console.error('[TradingView] Chart initialization failed:', error);
  }
});

onUnmounted(() => {
  const chartManager = getChartManager();
  chartManager.destroy();
  isChartReady.value = false;
  console.log('[TradingView] Chart destroyed');
});

// 외부에서 차트 심볼 변경을 위한 메서드 노출
defineExpose({
  changeChartSymbol: (symbol: string) => {
    if (isChartReady.value) {
      const chartManager = getChartManager();
      chartManager.changeSymbol(symbol);
    }
  },
  refreshChart: () => {
    if (isChartReady.value) {
      const chartManager = getChartManager();
      chartManager.refreshChart();
    }
  },
  isChartReady: () => isChartReady.value,
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

#tv_chart_container {
  width: 100%;
  height: 100%;
}
</style>
