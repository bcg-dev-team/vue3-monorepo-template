<!--
  @fileoverview 차트 상단 툴바 컴포넌트
  @component ChartTopToolbar
  @figma 차트 상단 툴바
-->
<template>
  <div class="chart-top-toolbar">
    <div class="toolbar-container">
      <!-- 왼쪽 설정 그룹 -->
      <div class="toolbar-group">
        <!-- 차트 관리 -->
        <button class="add-symbol-button" @click="handleChartManage">
          <BaseIcon name="plus" :size="16" color="#333740" />
        </button>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 시간대 선택 -->
        <div class="timeframe-group">
          <button
            v-for="timeframe in timeframes"
            :key="timeframe.value"
            class="timeframe-button"
            :class="{ active: selectedTimeframe === timeframe.value }"
            @click="handleTimeframeChange(timeframe.value)"
          >
            {{ timeframe.label }}
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 지표 설정 -->
        <div class="indicator-group">
          <span class="indicator-label">지표</span>
          <button class="indicator-button" @click="handleIndicatorClick">
            <BaseIcon name="cert" :size="16" color="#333740" />
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 화면 템플릿 -->
        <div class="layout-group">
          <div class="layout-buttons">
            <button
              v-for="layout in layoutOptions"
              :key="layout.value"
              class="layout-button"
              :class="{ active: selectedLayout === layout.value }"
              @click="handleLayoutSelect(layout.value)"
            >
              <BaseIcon :name="layout.icon" :size="16" color="#333740" />
            </button>
          </div>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 워크스페이스 -->
        <div class="workspace-group">
          <WorkspaceDropdown
            @workspace-selected="handleWorkspaceSelected"
            @workspace-saved="handleWorkspaceSaved"
            @workspace-deleted="handleWorkspaceDeleted"
          />
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 차트 도구 -->
        <div class="chart-tools">
          <button class="tool-button" @click="handleChartEye">
            <BaseIcon name="eye" :size="16" color="#333740" />
          </button>
          <button class="tool-button" @click="handleChartSnapshot">
            <BaseIcon name="cert" :size="16" color="#333740" />
          </button>
          <button class="tool-button" @click="handleChartSetup" title="차트 설정">
            <BaseIcon name="settings" :size="16" color="#333740" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ChartLayout,
  ChartGlobalSettingsProps,
  ChartGlobalSettingsEmits,
} from '@template/types';
import type { WorkspaceLayout } from '../../types/workspace';
import { CHART_LAYOUT_OPTIONS } from '@/types/chart.types';
import WorkspaceDropdown from './WorkspaceDropdown.vue';
import { CHART_TIMEFRAMES } from '@template/types';
import { BaseIcon } from '@template/ui';
import { ref, watch } from 'vue';
import './ChartTopToolbar.scss';

// Props 정의 (공통 타입 사용)
const props = defineProps<ChartGlobalSettingsProps>();

// Emits 정의 (공통 타입 사용)
const emit = defineEmits<ChartGlobalSettingsEmits>();

// 시간대 옵션 (상수 사용)
const timeframes = CHART_TIMEFRAMES;

// 선택된 시간대 (선택된 차트와 동기화)
const selectedTimeframe = ref('1h');

// 선택된 레이아웃 (실제 레이아웃과 동기화)
const selectedLayout = ref<ChartLayout>('2x2');

// 선택된 차트의 시간대 동기화
watch(
  () => props.selectedChartData?.timeframe,
  (newTimeframe) => {
    if (newTimeframe) {
      selectedTimeframe.value = newTimeframe;
    }
  },
  { immediate: true }
);

// 현재 레이아웃과 동기화
watch(
  () => props.currentLayout,
  (newLayout) => {
    if (newLayout) {
      selectedLayout.value = newLayout;
    }
  },
  { immediate: true }
);

// 레이아웃 옵션
const layoutOptions = CHART_LAYOUT_OPTIONS;

// 이벤트 핸들러
const handleChartManage = () => {
  emit('chart-manage');
};

const handleTimeframeChange = (timeframe: string) => {
  selectedTimeframe.value = timeframe;
  emit('timeframe-change', timeframe);
};

const handleIndicatorClick = () => {
  emit('indicator-change', 'indicator-dialog-open');
};

const handleLayoutSelect = (layout: ChartLayout) => {
  selectedLayout.value = layout;
  emit('layout-change', layout);
};

const handleWorkspaceSelected = (workspace: WorkspaceLayout) => {
  console.log('워크스페이스 선택됨:', workspace);
  emit('workspace-change', workspace);
};

const handleWorkspaceSaved = (workspace: WorkspaceLayout) => {
  console.log('워크스페이스 저장됨:', workspace);
  emit('workspace-save', workspace);
};

const handleWorkspaceDeleted = (workspaceId: string) => {
  console.log('워크스페이스 삭제됨:', workspaceId);
  emit('workspace-delete', workspaceId);
};

const handleChartEye = () => {
  emit('chart-eye');
};

const handleChartSnapshot = () => {
  console.log('차트 스냅샷 클릭');
};

const handleChartSetup = () => {
  console.log('차트 설정 버튼 클릭됨 (setup 버튼)');
  emit('chart-settings');
};
</script>
