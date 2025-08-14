<!--
  Figma 컴포넌트: Input/Stepper
  BaseInput을 확장한 스테퍼 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
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
const handleInput = (value: string) => {
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

  // 최소/최대값 제한
  let clampedValue = numValue;
  if (props.min !== undefined) {
    clampedValue = Math.max(clampedValue, props.min);
  }
  if (props.max !== undefined) {
    clampedValue = Math.min(clampedValue, props.max);
  }

  emit('update:modelValue', clampedValue);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>

<template>
  <BaseInput
    :model-value="(modelValue || 0).toString()"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :full-width="fullWidth"
    type="text"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >


    <!-- 내부 버튼들 (suffix slot) -->
    <template #suffix>
      <div v-if="showButtons && buttonPosition === 'inside'" class="stepper-buttons-inside">
        <button
          type="button"
          class="stepper-button-inside decrease"
          :disabled="!canDecrease"
          @click.stop="decrease"
          aria-label="값 감소"
        >
          <BaseIcon name="minus" size="sm" />
        </button>
        <button
          type="button"
          class="stepper-button-inside increase"
          :disabled="!canIncrease"
          @click.stop="increase"
          aria-label="값 증가"
        >
          <BaseIcon name="plus" size="sm" />
        </button>
      </div>
    </template>
  </BaseInput>
</template>

<style lang="scss" scoped>
// 브라우저 기본 number input 화살표 숨기기
:deep(input[type="text"]) {
  // number input의 기본 화살표 숨기기
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  // Firefox용
  &[type="number"] {
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
