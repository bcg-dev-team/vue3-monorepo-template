<!--
  Figma 컴포넌트: Tabs 컨테이너
  - Headless UI TabGroup 컴포넌트 기반
  - 여러 탭을 관리하는 컨테이너 컴포넌트
  - 탭 순서에 따른 색상 변경: [빨간색, 파란색, 초록색, 보라색] 순환
  - 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경
-->
<script setup lang="ts">
import { computed } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

interface TabItem {
  /**
   * 탭의 고유 식별자
   */
  value: string | number;

  /**
   * 탭에 표시될 텍스트
   */
  label: string;

  /**
   * 탭이 비활성화되었는지 여부
   */
  disabled?: boolean;

  /**
   * 탭 패널에 표시될 컨텐츠
   */
  content?: string;
}

interface Props {
  /**
   * 탭 목록
   */
  tabs: TabItem[];

  /**
   * 현재 선택된 탭의 값
   */
  modelValue: string | number;

  /**
   * 탭 그룹의 방향
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * 탭 그룹의 크기
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 컨텐츠 영역 표시 여부
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

// 탭 순서에 따른 색상 정의 (semantic tokens 사용)
const tabColors = [
  {
    bg: 'bg-trade-buy',
    text: 'text-text-inverse',
    hover: 'hover:bg-error',
    content: 'bg-trade-buy',
  },
  { bg: 'bg-info', text: 'text-text-inverse', hover: 'hover:bg-info', content: 'bg-info' },
  { bg: 'bg-success', text: 'text-text-inverse', hover: 'hover:bg-success', content: 'bg-success' },
  {
    bg: 'bg-favorite',
    text: 'text-text-inverse',
    hover: 'hover:bg-favorite',
    content: 'bg-favorite',
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

const containerClasses = computed(() => {
  const baseClasses = 'inline-flex bg-surface-muted rounded-default p-1';

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
 * 각 탭의 클래스 계산
 */
const getTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const baseClasses =
      'px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-border-focus';
    const positionClasses = [
      getTabPosition(index) === 'first' ? 'rounded-l-default' : '',
      getTabPosition(index) === 'last' ? 'rounded-r-default' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const stateClasses = disabled
      ? 'opacity-50 cursor-not-allowed bg-surface-disabled text-text-disabled'
      : selected
        ? `${getTabColor(index).bg} ${getTabColor(index).text} shadow-sm`
        : 'bg-surface-default text-text-secondary hover:bg-surface-muted';

    return [baseClasses, positionClasses, stateClasses].filter(Boolean).join(' ');
  };
});

/**
 * 각 탭 패널의 클래스 계산
 */
const getPanelClasses = computed(() => {
  return (index: number, isSelected: boolean) => {
    const baseClasses = 'p-6 rounded-default transition-all duration-200';
    const stateClasses = isSelected
      ? `${getTabColor(index).content} text-text-inverse`
      : 'bg-surface-disabled text-text-secondary';

    return [baseClasses, stateClasses].join(' ');
  };
});
</script>

<template>
  <div class="space-y-4">
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
      <TabPanels v-if="showContent" class="mt-4">
        <TabPanel
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="getPanelClasses(index, selectedIndex === index)"
        >
          <slot name="content" :tab="tab" :index="index" :is-selected="selectedIndex === index">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center">
              <p class="text-lg font-medium">{{ tab.label }} 컨텐츠</p>
              <p class="mt-2 opacity-80">이 영역에 {{ tab.label }}의 컨텐츠가 표시됩니다.</p>
            </div>
          </slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
