<template>
  <div class="chart-test-view">
    <h1>TradingView 차트 테스트</h1>

    <div class="chart-container">
      <TradingViewChart :symbol="'ETH/EUR'" :interval="'1'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TradingViewChart from '@/components/chart/TradingViewChart.vue';
</script>

<style scoped>
.chart-test-view {
  padding: 20px;
}

.chart-test-view h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 700px;
  width: 100%;
}
</style>
