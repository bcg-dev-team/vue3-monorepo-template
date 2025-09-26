<!--
  Figma 컴포넌트: 템플릿 선택 패널
  화면 템플릿 선택 드롭다운 컴포넌트
-->
<template>
  <div class="layout-template-dropdown">
    <div class="dropdown-content">
      <div class="template-list">
        <div
          v-for="template in layoutTemplates"
          :key="template.value"
          class="template-item"
          :class="{ active: selectedLayout === template.value }"
          @click="handleTemplateSelect(template.value)"
        >
          <div class="template-icon">
            <BaseIcon :name="template.icon" :size="24" />
          </div>
          <div class="template-label">{{ template.label }}</div>
          <div class="template-info">
            <BaseIcon name="cert" :size="20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartLayout } from '@template/types';
import { BaseIcon } from '@template/ui';
import './LayoutTemplateDropdown.scss';

// Props 정의
interface Props {
  selectedLayout: ChartLayout;
}

const props = defineProps<Props>();

// Emits 정의
interface Emits {
  (e: 'template-select', layout: ChartLayout): void;
}

const emit = defineEmits<Emits>();

// 레이아웃 템플릿 옵션
const layoutTemplates = [
  { value: '1x1' as ChartLayout, label: '1x1', icon: 'cert' },
  { value: '2x2' as ChartLayout, label: '2x2', icon: 'cert' },
  { value: '3x3' as ChartLayout, label: '3x3', icon: 'cert' },
  { value: '4x4' as ChartLayout, label: '4x4', icon: 'cert' },
];

// 이벤트 핸들러
const handleTemplateSelect = (layout: ChartLayout) => {
  emit('template-select', layout);
};
</script>
