<!--
  @fileoverview 차트 드로잉 툴바 컴포넌트
  @component ChartDrawingToolbar
  @figma 차트 드로잉 툴바
-->
<template>
  <div class="chart-drawing-toolbar">
    <!-- 차트 추가 버튼 -->
    <!-- <div class="toolbar-section">
      <button class="toolbar-button active" @click="handleAddChart" title="차트 추가">
        <BaseIcon name="cert" :size="16" />
      </button>
    </div> -->

    <!-- 구분선 -->
    <div class="toolbar-divider" />

    <!-- 차트 도구들 -->
    <div class="toolbar-section">
      <!-- <button class="toolbar-button" @click="handleChartEye" title="차트 보기 설정">
        <BaseIcon name="eye" size="16" />
      </button> -->

      <button class="toolbar-button" @click="handleChartSetup" title="차트 설정">
        <BaseIcon name="settings" :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon } from '@template/ui';
import './ChartDrawingToolbar.scss';

// Emits 정의
interface Emits {
  (e: 'add-chart'): void;
  (e: 'chart-eye'): void;
  (e: 'chart-setup'): void;
}

const emit = defineEmits<Emits>();

// 이벤트 핸들러
const handleAddChart = () => {
  emit('add-chart');
};

const handleChartEye = () => {
  emit('chart-eye');
};

const handleChartSetup = () => {
  emit('chart-setup');
};
</script>
