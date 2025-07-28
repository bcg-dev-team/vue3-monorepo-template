<!--
  Figma 컴포넌트: Tabs 컨테이너
  - v-if를 활용한 세 가지 탭 디자인 지원
  - 첫 번째 탭: 연결된 탭 형태 (기존 BaseTabs 디자인)
  - 두 번째 탭: 개별 탭 형태
  - 세 번째 탭: 카드 형태 탭
  @figma Tab (node-id: 58-877, 815-12005, 1133-11929)
-->
<script setup lang="ts">
import type { TabItem, ComponentSize } from '../../types/components';
import { computed, ref } from 'vue';
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
   * 탭 디자인 타입
   *
   * 'connected': 연결된 탭 형태 (첫 번째 탭 디자인)
   * 'individual': 개별 탭 형태 (두 번째 탭 디자인)
   * 'card': 카드 형태 탭 (세 번째 탭 디자인)
   */
  variant?: 'connected' | 'individual' | 'card';

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
  variant: 'connected',
  direction: 'horizontal',
  size: 'md',
  showContent: true,
});

const emit = defineEmits<Emits>();

// 방향별 클래스 매핑
const directionClasses = {
  horizontal: 'tabs-container-horizontal',
  vertical: 'tabs-container-vertical',
};

// 크기별 클래스 매핑
const sizeClasses = {
  sm: 'tabs-sm',
  md: 'tabs-md',
  lg: 'tabs-lg',
};

// 컨테이너 클래스
const containerClasses = computed(() => {
  const baseClasses = ['w-full', `tabs-variant-${props.variant}`].join(' ');
  const directionClass = directionClasses[props.direction];
  const sizeClass = sizeClasses[props.size];

  return `${baseClasses} ${directionClass} ${sizeClass}`;
});

/**
 * 각 탭의 위치를 결정하는 함수 (연결된 탭용)
 */
const getTabPosition = (index: number): 'first' | 'middle' | 'last' => {
  if (index === 0) return 'first';
  if (index === props.tabs.length - 1) return 'last';
  return 'middle';
};

/**
 * 탭 변경 핸들러
 */
const handleTabChange = (tabValue: string | number) => {
  const selectedTab = props.tabs.find((tab) => tab.value === tabValue);
  if (selectedTab && !selectedTab.disabled) {
    emit('update:modelValue', selectedTab.value);
    emit('tab-click', selectedTab.value);
  }
};

/**
 * 현재 선택된 탭의 인덱스
 */
const selectedIndex = computed(() => {
  return props.tabs.findIndex((tab) => tab.value === props.modelValue);
});

/**
 * 각 탭의 클래스 계산 (연결된 탭용)
 */
const getConnectedTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const classes = ['tab', 'tab-connected'];

    // 위치별 클래스
    const position = getTabPosition(index);
    if (position === 'first') classes.push('tab-first');
    if (position === 'middle') classes.push('tab-middle');
    if (position === 'last') classes.push('tab-last');

    // 상태별 클래스
    if (disabled) {
      classes.push('tab-disabled');
    } else if (selected) {
      classes.push('tab-selected', `tab-color-${index % 4}`);
    }

    return classes.join(' ');
  };
});

/**
 * 각 탭의 클래스 계산 (개별 탭용)
 */
const getIndividualTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const classes = ['tab', 'tab-individual'];

    // 상태별 클래스
    if (disabled) {
      classes.push('tab-disabled');
    } else if (selected) {
      classes.push('tab-selected', `tab-individual-color-${index % 4}`);
    }

    return classes.join(' ');
  };
});

/**
 * 각 탭의 클래스 계산 (카드 탭용)
 */
const getCardTabClasses = computed(() => {
  return (index: number, disabled: boolean, selected: boolean) => {
    const classes = ['tab', 'tab-card'];

    // 상태별 클래스
    if (disabled) {
      classes.push('tab-disabled');
    } else if (selected) {
      classes.push('tab-selected', `tab-card-color-${index % 4}`);
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

/**
 * 우측 여백 영역 클래스 계산 (연결된 탭용)
 */
const spacerClasses = computed(() => {
  return 'tab-spacer';
});
</script>

<template>
  <div :class="containerClasses">
    <!-- 연결된 탭 형태 (첫 번째 탭 디자인) -->
    <div v-if="variant === 'connected'" class="tabs-connected">
      <!-- 탭 리스트 -->
      <div class="tab-list" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="getConnectedTabClasses(index, tab.disabled || false, modelValue === tab.value)"
          :disabled="tab.disabled"
          @click="handleTabChange(tab.value)"
        >
          {{ tab.label }}
        </button>

        <!-- 우측 여백 영역 (탭과 컨텐츠 연결) -->
        <div :class="spacerClasses"></div>
      </div>

      <!-- 컨텐츠 영역 -->
      <div v-if="showContent" class="tab-content">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.value"
          v-show="modelValue === tab.value"
          :class="getPanelClasses(index)"
        >
          <slot name="content" :tab="tab" :index="index" :is-selected="modelValue === tab.value">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center text-gray-500">{{ tab.label }} 컨텐츠</div>
          </slot>
        </div>
      </div>
    </div>

    <!-- 개별 탭 형태 (두 번째 탭 디자인) -->
    <div v-else-if="variant === 'individual'" class="tabs-individual">
      <!-- 탭 리스트 -->
      <div class="tab-list" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="getIndividualTabClasses(index, tab.disabled || false, modelValue === tab.value)"
          :disabled="tab.disabled"
          @click="handleTabChange(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 컨텐츠 영역 -->
      <div v-if="showContent" class="tab-content">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.value"
          v-show="modelValue === tab.value"
          class="tab-panel tab-panel-individual"
        >
          <slot name="content" :tab="tab" :index="index" :is-selected="modelValue === tab.value">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center text-gray-500">{{ tab.label }} 컨텐츠</div>
          </slot>
        </div>
      </div>
    </div>

    <!-- 카드 형태 탭 (세 번째 탭 디자인) -->
    <div v-else-if="variant === 'card'" class="tabs-card">
      <!-- 탭 리스트 -->
      <div class="tab-list" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.value"
          :class="getCardTabClasses(index, tab.disabled || false, modelValue === tab.value)"
          :disabled="tab.disabled"
          @click="handleTabChange(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 컨텐츠 영역 -->
      <div v-if="showContent" class="tab-content">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.value"
          v-show="modelValue === tab.value"
          class="tab-panel tab-panel-card"
        >
          <slot name="content" :tab="tab" :index="index" :is-selected="modelValue === tab.value">
            <div v-if="tab.content" v-html="tab.content"></div>
            <div v-else class="text-center text-gray-500">{{ tab.label }} 컨텐츠</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
