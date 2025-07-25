<!--
  Figma 컴포넌트: Input/Text-MD (node-id: 32-176)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-176&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import type { InputStatus } from '../../types/components';

/**
 * 텍스트 입력 컴포넌트 (중간 사이즈)
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props status - 입력 상태 (Static, Focus, Error, Filled, Disabled)
 * @props showIcon - 아이콘 표시 여부
 * @props disabled - 비활성화 여부
 * @emits update:modelValue - 입력값 변경 시 발생
 * @slot left - 왼쪽 아이콘/컨텐츠
 * @slot right - 오른쪽 아이콘/컨텐츠
 */
interface Props {
  /**
   * 입력값 (v-model)
   */
  modelValue: string;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 입력 상태
   *
   * Static: 기본, Focus: 포커스, Error: 에러, Filled: 값 있음, Disabled: 비활성화
   * @default 'Static'
   */
  status?: InputStatus;
  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'Static',
  showIcon: true,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isDisabled = computed(() => props.disabled || props.status === 'Disabled');
const isError = computed(() => props.status === 'Error');
const isFocus = computed(() => props.status === 'Focus');
const isFilled = computed(() => props.status === 'Filled');

// 정적 색상은 Tailwind arbitrary value로 처리
const staticClasses = computed(() => {
  const classes = [
    'relative w-full rounded-sm',
    'bg-[var(--input-color-surface)]', // 기본 배경색
  ];

  // 기본 테두리 색상
  classes.push('border-[var(--input-color-border-static)]');

  // 기본 텍스트 색상
  classes.push('text-[var(--input-color-text-static)]');

  return classes.join(' ');
});

// 동적 스타일 (조건부 변경이 필요한 경우만)
const dynamicStyle = computed(() => {
  const styles: Record<string, string> = {};

  // 조건부 배경색
  if (isDisabled.value) {
    styles.backgroundColor = 'var(--input-color-bg-disabled)';
  }

  // 조건부 테두리 색상
  if (isDisabled.value) {
    styles.borderColor = 'var(--input-color-border-disabled)';
  } else if (isError.value) {
    styles.borderColor = 'var(--input-color-border-error)';
  } else if (isFocus.value) {
    styles.borderColor = 'var(--input-color-border-focus)';
  }

  // 조건부 텍스트 색상
  if (isDisabled.value) {
    styles.color = 'var(--input-color-text-disable)';
  }

  return styles;
});

// placeholder 스타일 (동적 처리 필요)
const placeholderStyle = computed(() => {
  const color = isDisabled.value
    ? 'var(--input-color-text-disable)'
    : 'var(--input-color-text-placeholder)';
  return { color };
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const containerClasses = computed(() => {
  return 'relative w-full rounded-sm';
});

const borderClasses = computed(() => {
  const classes = [
    'absolute inset-0 pointer-events-none rounded-sm border transition-colors duration-150',
  ];

  if (isError.value) {
    classes.push('border-2');
  } else {
    classes.push('border');
  }

  return classes.join(' ');
});

const inputClasses = computed(() => {
  const classes = ['flex-1 bg-transparent outline-none border-0 p-0 text-base'];

  if (isDisabled.value) {
    classes.push('cursor-not-allowed');
  }

  return classes.join(' ');
});
</script>

<template>
  <div :class="staticClasses" :style="dynamicStyle">
    <div :class="borderClasses" :style="dynamicStyle" />
    <div class="flex flex-row items-center w-full px-4 py-3.5">
      <slot name="left">
        <BaseIcon
          v-if="showIcon"
          name="eye"
          size="md"
          :color="isDisabled ? 'primary' : 'current'"
          class="mr-2"
        />
      </slot>
      <input
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :class="inputClasses"
        :style="dynamicStyle"
        :placeholder-style="placeholderStyle"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />
      <slot name="right">
        <BaseIcon
          v-if="showIcon"
          name="eye"
          size="md"
          :color="isDisabled ? 'primary' : 'current'"
          class="ml-2"
        />
      </slot>
    </div>
  </div>
</template>
