<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createChart, LineSeries, BarSeries } from 'lightweight-charts';

const chartContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!chartContainerRef.value) return;

  const chart = createChart(chartContainerRef.value, {
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
  const lineSeries = chart.addSeries(LineSeries, {
    color: '#2962FF',
    lineWidth: 2,
  });

  // 샘플 데이터 설정
  const generateData = () => {
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
      console.log({
        time: timestamp,
        value: parseFloat(currentValue.toFixed(2)),
      });
    }
    return data;
  };

  lineSeries.setData(generateData());

  // 차트 크기를 컨테이너에 맞게 조정
  chart.timeScale().fitContent();
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
