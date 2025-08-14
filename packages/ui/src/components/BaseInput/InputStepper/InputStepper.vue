<!--
  Figma 컴포넌트: Input/Stepper
  스테퍼 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import { computed } from 'vue';
import './InputStepper.scss';

/**
 * InputStepper - 스테퍼 입력 컴포넌트
 *
 * @props modelValue - 현재 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props min - 최소값
 * @props max - 최대값
 * @props step - 증감 단위
 * @props showButtons - 증감 버튼 표시 여부 (기본값: true)
 * @props buttonPosition - 버튼 위치 ('inside' | 'outside', 기본값: 'outside')
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props extends Omit<CommonInputProps, 'modelValue'> {
  // InputStepper 고유 props
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  showButtons?: boolean;
  buttonPosition?: 'inside' | 'outside';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  placeholder: '0',
  disabled: false,
  readonly: false,
  fullWidth: false,
  min: 0,
  max: undefined,
  step: 1,
  showButtons: true,
  buttonPosition: 'inside',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 최소/최대값 체크 (MUI 방식)
const canDecrease = computed(() => {
  const currentValue = props.modelValue || 0;
  const minValue = props.min || 0;
  return !props.disabled && currentValue > minValue;
});

const canIncrease = computed(() => {
  const currentValue = props.modelValue || 0;
  const maxValue = props.max;
  return !props.disabled && (maxValue === undefined || currentValue < maxValue);
});

// 값 증가 (MUI 방식)
const increase = () => {
  if (canIncrease.value) {
    const currentValue = props.modelValue || 0;
    const newValue = currentValue + props.step;
    emit('update:modelValue', newValue);
  }
};

// 값 감소 (MUI 방식)
const decrease = () => {
  if (canDecrease.value) {
    const currentValue = props.modelValue || 0;
    const newValue = currentValue - props.step;
    emit('update:modelValue', newValue);
  }
};

// 입력값 처리 (MUI 방식)
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  // 빈 문자열이거나 숫자가 아닌 경우 0으로 처리
  if (!value || value.trim() === '') {
    emit('update:modelValue', 0);
    return;
  }

  const numValue = parseFloat(value);

  // NaN인 경우 0으로 처리
  if (isNaN(numValue)) {
    emit('update:modelValue', 0);
    return;
  }

  // 최소/최대값 체크
  const minValue = props.min || 0;
  const maxValue = props.max;

  if (numValue < minValue) {
    emit('update:modelValue', minValue);
  } else if (maxValue !== undefined && numValue > maxValue) {
    emit('update:modelValue', maxValue);
  } else {
    emit('update:modelValue', numValue);
  }
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 클래스 계산
const inputClasses = computed(() => [
  'input-stepper',
  { 'w-full': props.fullWidth, 'w-[200px]': !props.fullWidth },
  { disabled: props.disabled },
  { 'with-buttons': props.showButtons },
  { 'buttons-inside': props.buttonPosition === 'inside' },
  { 'buttons-outside': props.buttonPosition === 'outside' },
]);
</script>

<template>
  <div class="input-stepper-container" :class="{ 'buttons-outside': buttonPosition === 'outside' }">
    <!-- 감소 버튼 -->
    <button
      v-if="showButtons"
      type="button"
      class="stepper-button stepper-button--decrease"
      :class="{ disabled: !canDecrease }"
      :disabled="!canDecrease"
      @click="decrease"
    >
      <BaseIcon name="minus" size="sm" />
    </button>

    <!-- 입력 필드 -->
    <input
      type="number"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :min="min"
      :max="max"
      :step="step"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- 증가 버튼 -->
    <button
      v-if="showButtons"
      type="button"
      class="stepper-button stepper-button--increase"
      :class="{ disabled: !canIncrease }"
      :disabled="!canIncrease"
      @click="increase"
    >
      <BaseIcon name="plus" size="sm" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
// 브라우저 기본 number input 화살표 숨기기
:deep(input[type='text']) {
  // number input의 기본 화살표 숨기기
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // Firefox용
  &[type='number'] {
    -moz-appearance: textfield;
  }
}

.stepper-buttons-inside {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-left: 8px;
}

.stepper-button-inside {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 20px;
  border: 1px solid var(--color-neutral-300, #d1d5db);
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: var(--color-neutral-600, #5a5c5e);

  &:hover:not(:disabled) {
    background-color: var(--color-neutral-50, #f9fafb);
    border-color: var(--color-neutral-400, #9ca3af);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--color-neutral-100, #f3f4f6);
  }
}
</style>
