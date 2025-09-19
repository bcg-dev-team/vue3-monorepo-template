<!--
  Figma 컴포넌트: 차트 글로벌 설정
  상단에 위치한 차트 전역 설정 영역
-->
<template>
  <div class="chart-global-settings">
    <div class="settings-container">
      <!-- 왼쪽 설정 그룹 -->
      <div class="settings-group">
        <!-- 차트 관리 -->
        <button class="setting-button" @click="handleChartManage">
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

        <!-- 차트 설정 -->
        <div class="settings-group">
          <span class="settings-label">설정</span>
          <button class="setting-button" @click="handleChartSettings" title="차트 설정">
            <BaseIcon name="settings" :size="16" color="#333740" />
          </button>
        </div>

        <!-- 지표 다이얼로그 -->
        <IndicatorDialog
          v-if="showIndicatorDialog"
          :selected-chart-id="selectedChart"
          @close="handleIndicatorDialogClose"
          @indicator-select="handleIndicatorSelect"
        />

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 화면 템플릿 -->
        <div class="layout-group">
          <span class="layout-label">화면 템플릿</span>
          <div class="layout-dropdown-container">
            <button class="layout-button" @click="toggleLayoutDropdown">
              <BaseIcon :name="getLayoutIcon(selectedLayout)" :size="16" color="#333740" />
            </button>
            <!-- 템플릿 드롭다운 -->
            <div v-if="showLayoutDropdown" class="layout-dropdown">
              <LayoutTemplateDropdown
                :selected-layout="selectedLayout"
                @template-select="handleLayoutSelect"
              />
            </div>
          </div>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 워크스페이스 -->
        <div class="workspace-group">
          <span class="workspace-label">워크스페이스 3</span>
          <button class="workspace-button active" @click="handleWorkspaceClick">
            <BaseIcon name="cert" :size="16" color="#333740" />
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 차트 도구 -->
        <div class="chart-tools">
          <button class="tool-button" @click="handleChartEye">
            <BaseIcon name="eye" :size="16" color="#333740" />
          </button>
          <button class="tool-button" @click="handleChartSetup">
            <BaseIcon name="settings" :size="16" color="#333740" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutTemplateDropdown from './LayoutTemplateDropdown.vue';
import type { ChartLayout } from './MultiChartLayout.vue';
import IndicatorDialog from './IndicatorDialog.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import type { IconName } from '@template/ui';
import { BaseIcon } from '@template/ui';
import './ChartGlobalSettings.scss';

// Props 정의
interface Props {
  selectedChart?: string | null;
}

const props = defineProps<Props>();

// Emits 정의
interface Emits {
  (e: 'timeframe-change', timeframe: string): void;
  (e: 'indicator-change', indicator: string): void;
  (e: 'layout-change', layout: string): void;
  (e: 'chart-manage'): void;
  (e: 'chart-eye'): void;
  (e: 'chart-setup'): void;
  (e: 'chart-settings'): void;
  (e: 'workspace-save'): void;
}

const emit = defineEmits<Emits>();

// 시간대 옵션
const timeframes = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1M', label: '1M' },
];

// 선택된 시간대
const selectedTimeframe = ref('1h');

// 선택된 레이아웃
const selectedLayout = ref<ChartLayout>('2x2');

// 드롭다운 표시 상태
const showLayoutDropdown = ref(false);

// 지표 다이얼로그 표시 상태
const showIndicatorDialog = ref(false);

// 이벤트 핸들러
const handleChartManage = () => {
  emit('chart-manage');
};

const handleTimeframeChange = (timeframe: string) => {
  selectedTimeframe.value = timeframe;
  emit('timeframe-change', timeframe);
};

const handleIndicatorClick = () => {
  showIndicatorDialog.value = true;
};

const handleIndicatorDialogClose = () => {
  showIndicatorDialog.value = false;
};

const handleIndicatorSelect = (indicator: any) => {
  console.log('선택된 지표:', indicator);
  emit('indicator-change', indicator);
};

const toggleLayoutDropdown = () => {
  showLayoutDropdown.value = !showLayoutDropdown.value;
};

const handleLayoutSelect = (layout: ChartLayout) => {
  selectedLayout.value = layout;
  showLayoutDropdown.value = false;
  emit('layout-change', layout);
};

const getLayoutIcon = (layout: ChartLayout): IconName => {
  // 모든 레이아웃에 대해 'cert' 아이콘 사용
  return 'cert';
};

const handleWorkspaceClick = () => {
  emit('workspace-save');
};

const handleChartSettings = () => {
  console.log('차트 설정 버튼 클릭됨');
  emit('chart-settings');
};

// 드롭다운 외부 클릭 시 닫기
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const dropdown = document.querySelector('.layout-dropdown-container');

  if (dropdown && !dropdown.contains(target)) {
    showLayoutDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleChartEye = () => {
  emit('chart-eye');
};

const handleChartSetup = () => {
  emit('chart-setup');
};
</script>
