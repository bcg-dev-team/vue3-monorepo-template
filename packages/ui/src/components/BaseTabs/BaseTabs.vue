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
import './BaseTabs.scss';

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

// 방향별 클래스 매핑 (컴포넌트별 토큰)
const directionClasses = {
  horizontal: 'tabs-container-horizontal',
  vertical: 'tabs-container-vertical',
};

// 크기별 클래스 매핑 (컴포넌트별 토큰)
const sizeClasses = {
  sm: 'tabs-sm',
  md: 'tabs-md',
  lg: 'tabs-lg',
};

// 컨테이너 클래스
const containerClasses = computed(() => {
  const baseClasses = [
    // 1. 레이아웃
    'w-full',
  ].join(' ');
  const directionClass = directionClasses[props.direction];
  const sizeClass = sizeClasses[props.size];

  return `${baseClasses} ${directionClass} ${sizeClass}`;
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
 * 각 탭의 클래스 계산
 */
const getTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const classes = ['tab'];

    // 위치별 클래스
    const position = getTabPosition(index);
    if (position === 'first') classes.push('tab-first');
    if (position === 'last') classes.push('tab-last');

    // 상태별 클래스
    if (disabled) {
      classes.push('tab-disabled');
    } else if (selected) {
      classes.push('tab-selected', `tab-color-${index % 4}`);
    } else {
      classes.push('tab-default');
    }

    return classes.join(' ');
  };
});

/**
 * 각 탭 패널의 클래스 계산
 */
const getPanelClasses = computed(() => {
  return (index: number) => {
    const classes = ['tab-panel', `tab-panel-color-${index % 4}`];
    return classes.join(' ');
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
          <button :class="getTabClasses(index, tab.disabled || false, selected)">
            {{ tab.label }}
          </button>
        </Tab>
      </TabList>

      <!-- 컨텐츠 영역 -->
      <TabPanels v-if="showContent">
        <TabPanel v-for="(tab, index) in tabs" :key="tab.value" :class="getPanelClasses(index)">
          <slot name="content" :tab="tab" :index="index" :is-selected="selectedIndex === index">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center"></div>
          </slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
