<!--
  Figma 컴포넌트: Input/Text-MD (node-id: 32-176)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-176&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

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

const borderClass = computed(() => {
  if (isDisabled.value) return 'border-input-border-disabled';
  if (isError.value) return 'border-input-border-error';
  if (isFocus.value) return 'border-input-border-focus';
  return 'border-input-border';
});
const bgClass = computed(() => (isDisabled.value ? 'bg-input-bg-disabled' : 'bg-input-bg'));
const textClass = computed(() =>
  isDisabled.value ? 'text-input-text-disabled' : 'text-input-text'
);
const placeholderClass = computed(() =>
  isDisabled.value ? 'text-input-text-disabled' : 'text-input-text-placeholder'
);
</script>
<template>
  <div :class="['relative w-full', bgClass, 'rounded-sm']">
    <div
      :class="[
        'absolute inset-0 pointer-events-none rounded-sm border transition-colors duration-150',
        borderClass,
        isError ? 'border-2' : 'border',
      ]"
    />
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
        :class="[
          'flex-1 bg-transparent outline-none border-0 p-0 text-base',
          textClass,
          placeholderClass,
          isDisabled ? 'cursor-not-allowed' : '',
        ]"
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
