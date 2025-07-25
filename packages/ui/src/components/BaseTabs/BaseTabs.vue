<!--
  Figma 컴포넌트: Tabs 컨테이너
  - Headless UI TabGroup 컴포넌트 기반
  - 여러 탭을 관리하는 컨테이너 컴포넌트
  - 탭 순서에 따른 색상 변경: [빨간색, 파란색, 초록색, 보라색] 순환
  - 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경
  @figma Tab (node-id: 58-877)
-->
<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import type { TabItem, ComponentSize } from '../../types/components';
import { computed } from 'vue';

interface Props {
  /**
   * 탭 목록
   *
   * TabItem 객체 배열로, 각 탭의 value/label/disabled/content를 정의합니다.
   */
  tabs: TabItem[];

  /**
   * 현재 선택된 탭의 값
   *
   * 탭의 value와 일치하는 값이어야 합니다.
   */
  modelValue: string | number;

  /**
   * 탭 그룹의 방향 (horizontal, vertical)
   *
   * 기본값은 'horizontal'입니다.
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * 탭 그룹의 크기 (sm, md, lg)
   *
   * 기본값은 'md'입니다.
   */
  size?: ComponentSize;

  /**
   * 컨텐츠 영역 표시 여부
   *
   * 기본값은 true입니다.
   */
  showContent?: boolean;
}

interface Emits {
  /**
   * 선택된 탭이 변경될 때 발생하는 이벤트
   */
  (e: 'update:modelValue', value: string | number): void;

  /**
   * 탭 클릭 시 발생하는 이벤트
   */
  (e: 'tab-click', value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'md',
  showContent: true,
});

const emit = defineEmits<Emits>();

// 탭 순서에 따른 색상 정의 (CSS 변수 사용)
const tabColors = [
  {
    bg: 'var(--trade-long-bg)',
    text: 'var(--trade-long-text)',
    border: 'var(--trade-long-border)',
  },
  {
    bg: 'var(--trade-short-bg)',
    text: 'var(--trade-short-text)',
    border: 'var(--trade-short-border)',
  },
  {
    bg: 'var(--trade-correct-bg)',
    text: 'var(--trade-correct-text)',
    border: 'var(--trade-correct-border)',
  },
  {
    bg: 'var(--trade-cancel-bg)',
    text: 'var(--trade-cancel-text)',
    border: 'var(--trade-cancel-border)',
  },
];

/**
 * 탭 인덱스에 따른 색상 반환
 * @param index - 탭 인덱스
 * @returns 색상 객체
 */
const getTabColor = (index: number) => {
  return tabColors[index % tabColors.length];
};

// 레이아웃/간격/상태는 Tailwind class로 처리
const containerClasses = computed(() => {
  const baseClasses = 'inline-flex rounded-default';

  const directionClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return [baseClasses, directionClasses[props.direction], sizeClasses[props.size]].join(' ');
});

const getTabPosition = (index: number): 'first' | 'middle' | 'last' => {
  if (index === 0) return 'first';
  if (index === props.tabs.length - 1) return 'last';
  return 'middle';
};

const handleTabChange = (index: number) => {
  const selectedTab = props.tabs[index];
  if (selectedTab && !selectedTab.disabled) {
    emit('update:modelValue', selectedTab.value);
    emit('tab-click', selectedTab.value);
  }
};

const selectedIndex = computed(() => {
  return props.tabs.findIndex((tab) => tab.value === props.modelValue);
});

/**
 * 각 탭의 스타일과 클래스 계산
 */
const getTabStyles = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const tabColor = getTabColor(index);
    const selectedTabColor = getTabColor(selectedIndex.value);

    if (disabled) {
      return {
        backgroundColor: 'var(--surface-disabled)',
        color: 'var(--text-disabled)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--border-default)',
      };
    }

    if (selected) {
      return {
        backgroundColor: tabColor.bg,
        color: tabColor.text,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: tabColor.border,
      };
    }

    return {
      backgroundColor: 'var(--bg-surface)',
      color: 'var(--text-secondary)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: selectedTabColor.border,
    };
  };
});

const getTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const baseClasses =
      'px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none';
    const positionClasses = [
      getTabPosition(index) === 'first' ? 'rounded-tl-default' : '',
      getTabPosition(index) === 'last' ? 'rounded-tr-default' : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (disabled) {
      return [baseClasses, positionClasses, 'opacity-50 cursor-not-allowed border-b']
        .filter(Boolean)
        .join(' ');
    }

    if (selected) {
      return [baseClasses, positionClasses, 'border-t border-l border-r border-b-0 border-solid']
        .filter(Boolean)
        .join(' ');
    }

    return [baseClasses, positionClasses, 'border-b border-solid hover:bg-bg-surface-muted']
      .filter(Boolean)
      .join(' ');
  };
});

/**
 * 각 탭 패널의 스타일과 클래스 계산
 */
const getPanelStyles = computed(() => {
  return (index: number) => {
    const tabColor = getTabColor(index);
    return {
      backgroundColor: tabColor.bg,
      color: tabColor.text,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: tabColor.border,
    };
  };
});

const getPanelClasses = computed(() => {
  return () => {
    return 'p-6 rounded-b-default transition-all duration-200 border-l border-r border-b';
  };
});
</script>

<template>
  <div>
    <TabGroup :selected-index="selectedIndex" @change="handleTabChange">
      <TabList :class="containerClasses" role="tablist">
        <Tab
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :disabled="tab.disabled"
          as="template"
          v-slot="{ selected }"
        >
          <button
            :class="getTabClasses(index, tab.disabled || false, selected)"
            :style="getTabStyles(index, tab.disabled || false, selected)"
          >
            {{ tab.label }}
          </button>
        </Tab>
      </TabList>

      <!-- 컨텐츠 영역 -->
      <TabPanels v-if="showContent">
        <TabPanel
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="getPanelClasses()"
          :style="getPanelStyles(index)"
        >
          <slot name="content" :tab="tab" :index="index" :is-selected="selectedIndex === index">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center"></div>
          </slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
