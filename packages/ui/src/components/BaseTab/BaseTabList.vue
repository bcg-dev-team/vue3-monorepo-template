<script setup lang="ts">
import type { ComponentSize } from 'types/components';
import { Tab } from '@headlessui/vue';
import type { Component } from 'vue';

interface TabItem {
  value: string | number;
  component?: Component;
}

interface TabCategories {
  [categoryName: string]: TabItem;
}

type TabVariant = 'underline' | 'inner';

interface Props {
  /**
   * 탭 데이터
   */
  tabs: TabCategories;
  /**
   * 탭 스타일 variant
   * - underline: 밑줄 스타일 (기본)
   * - inner: 알약 형태 스타일
   */
  variant?: TabVariant;
  /**
   * 글자 크기
   * - lg: large (18px)
   * - md: medium (16px)
   */
  size?: Extract<ComponentSize, 'lg' | 'md'>;
  /**
   * 밑줄 여부 (underline variant에서만 사용)
   */
  underline?: boolean;
  /**
   * 배경색 여부 (underline variant에서만 사용)
   */
  hasBackground?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'inner',
  size: 'md',
  underline: false,
  hasBackground: false,
});

/**
 * 탭 버튼의 클래스를 동적으로 생성하는 함수
 * @param selected - 선택된 탭 여부
 * @returns CSS 클래스 문자열
 */
const getTabButtonClasses = (selected: boolean): string => {
  const baseClasses = 'focus:outline-none focus:ring-0 ';

  // inner variant 스타일
  if (props.variant === 'inner') {
    return [
      baseClasses,
      'px-3 py-1.5 text-[13px] leading-[16px] tracking-tight',
      selected
        ? 'bg-[var(--button-tab-button-on)] text-[var(--button-tab-text-on)] rounded-xs font-medium'
        : 'text-[var(--button-tab-text-off)]',
    ].join(' ');
  }

  // Underline variant 스타일 (기본)
  const sizeClasses =
    props.size === 'lg' ? 'p-[10px] text-base font-semibold' : 'px-4 py-3 text-sm font-medium';

  const textColorClasses = selected
    ? 'bg-bg-bg-default text-default'
    : props.hasBackground
      ? 'bg-bg-bg-surface text-default-muted-dark'
      : 'bg-bg-bg-default text-default-muted-dark';

  const underlineClasses = selected
    ? props.size === 'lg'
      ? 'shadow-[inset_0_-3px_0_0_var(--input-color-border-focus)]'
      : 'shadow-[inset_0_-2px_0_0_var(--input-color-border-focus)]'
    : props.underline
      ? props.size === 'lg'
        ? 'shadow-[inset_0_-3px_0_0_var(--background-bg-outline)]'
        : 'shadow-[inset_0_-2px_0_0_var(--background-bg-outline)]'
      : '';

  return [baseClasses, 'whitespace-nowrap ', sizeClasses, textColorClasses, underlineClasses]
    .filter(Boolean)
    .join(' ');
};

/**
 * 컨테이너의 클래스를 반환하는 함수
 * @returns CSS 클래스 문자열
 */
const getContainerClasses = (): string => {
  if (props.variant === 'inner') {
    return 'flex p-1 bg-neutral-neutral050 rounded-[6px]';
  }
  return 'flex flex-nowrap';
};
</script>

<template>
  <div :class="getContainerClasses()">
    <Tab v-for="tab in Object.keys(tabs)" as="template" :key="tab" v-slot="{ selected }">
      <button :class="getTabButtonClasses(selected)">
        {{ tab }}
      </button>
    </Tab>
  </div>
</template>
