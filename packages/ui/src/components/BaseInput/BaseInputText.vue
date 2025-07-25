<!--
  Figma 컴포넌트: Input/Text-MD (node-id: 32-176)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-176&m=dev
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';
import './BaseInputText.scss';

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
  status?: 'Static' | 'Focus' | 'Error' | 'Filled' | 'Disabled';
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

// 상태별 클래스 매핑 (컴포넌트별 토큰)
const statusClasses = {
  Static: 'input-static',
  Focus: 'input-focus',
  Error: 'input-error',
  Filled: 'input-filled',
  Disabled: 'input-disabled',
};

// 정적 클래스 (기본 스타일)
const staticClasses = computed(() => {
  const classes = [
    'relative w-full rounded-sm transition-all duration-150',
    statusClasses[props.status] || 'input-static',
  ];

  return classes.join(' ');
});

// 테두리 클래스
const borderClasses = computed(() => {
  const baseClasses =
    'absolute inset-0 pointer-events-none rounded-sm border border-solid transition-colors duration-150';

  if (isError.value) {
    return `${baseClasses} border-2 input-border-error`;
  }

  return baseClasses;
});

// 입력 요소 클래스
const inputClasses = computed(() => {
  const baseClasses = 'flex-1 bg-transparent outline-none border-0 p-0 text-base';

  if (isDisabled.value) {
    return `${baseClasses} cursor-not-allowed`;
  }

  return baseClasses;
});
</script>

<template>
  <div :class="staticClasses">
    <div :class="borderClasses" />
    <div class="flex flex-row items-center w-full py-3.5 px-4">
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
