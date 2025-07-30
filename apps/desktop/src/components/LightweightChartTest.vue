<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, LineSeries } from 'lightweight-charts';
import { RealTimeChartManager } from '@template/utils';

const chartContainerRef = ref<HTMLElement | null>(null);
const chart = ref<any>(null);
const lineSeries = ref<any>(null);
const realtimeManager = ref<RealTimeChartManager | null>(null);

// 초기 데이터 생성
const generateInitialData = () => {
  const data = [];
  let currentValue = 25;

  for (let i = 0; i < 100; i++) {
    // 자연스러운 변동 생성 (이전 값 기준 ±2% 변동)
    const change = (Math.random() - 0.5) * 0.8;
    currentValue = currentValue + change;

    // 날짜 생성 (1분 간격)
    const date = new Date(2023, 0, 1, 9, i); // 9시부터 1분 간격
    const timestamp = Math.floor(date.getTime());

    data.push({
      time: timestamp,
      value: parseFloat(currentValue.toFixed(2)),
    });
  }
  return data;
};

// 실시간 데이터 업데이트 처리
const handleRealtimeUpdate = (data: any[]) => {
  if (lineSeries.value && data.length > 0) {
    // 마지막 데이터 포인트만 업데이트
    const latestData = data[data.length - 1];
    lineSeries.value.update(latestData);
  }
};

onMounted(async () => {
  if (!chartContainerRef.value) return;

  chart.value = createChart(chartContainerRef.value, {
    width: 400,
    height: 300,
    layout: {
      background: { color: '#ffffff' },
      textColor: 'transparent',
      attributionLogo: false,
    },
    grid: {
      vertLines: { visible: false },
      horzLines: { visible: false },
    },
    rightPriceScale: {
      visible: false, // 우측 가격 스케일 숨기기
    },
    timeScale: {
      visible: false, // 시간 스케일 숨기기
    },
  });

  // 라인 시리즈 추가
  lineSeries.value = chart.value.addSeries(LineSeries, {
    color: '#2962FF',
    lineWidth: 2,
    priceLineVisible: false, // 마지막 값 기준 가로 가이드라인 숨기기
  });

  // 초기 데이터 설정
  const initialData = generateInitialData();
  console.log('초기 데이터:', initialData);
  lineSeries.value.setData(initialData);

  // 차트 크기를 컨테이너에 맞게 조정
  chart.value.timeScale().fitContent();

  // 실시간 차트 매니저 초기화
  realtimeManager.value = new RealTimeChartManager(100);

  // 실시간 업데이트 콜백 등록
  realtimeManager.value.onUpdate(handleRealtimeUpdate);

  // WebSocket 연결
  try {
    await realtimeManager.value.connect();
    console.log('[LightweightChartTest] WebSocket 연결 성공');
  } catch (error) {
    console.error('[LightweightChartTest] WebSocket 연결 실패:', error);
  }
});

onUnmounted(() => {
  // 실시간 매니저 정리
  if (realtimeManager.value) {
    realtimeManager.value.disconnect();
  }

  // 차트 정리
  if (chart.value) {
    chart.value.remove();
  }
});
</script>

<template>
  <div class="chart-container">
    <div ref="chartContainerRef" />
  </div>
</template>

<style scoped>
.chart-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
