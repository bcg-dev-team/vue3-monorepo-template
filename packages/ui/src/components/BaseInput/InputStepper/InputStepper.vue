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
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 최소/최대값 체크
const canDecrease = computed(() => {
  return !props.disabled && props.modelValue > props.min;
});

const canIncrease = computed(() => {
  return !props.disabled && (props.max === undefined || props.modelValue < props.max);
});

// 값 증가
const increase = () => {
  if (canIncrease.value) {
    const newValue = props.modelValue + props.step;
    emit('update:modelValue', newValue);
  }
};

// 값 감소
const decrease = () => {
  if (canDecrease.value) {
    const newValue = props.modelValue - props.step;
    emit('update:modelValue', newValue);
  }
};

// 입력값 처리
const handleInput = (value: string) => {
  const numValue = parseFloat(value) || 0;

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
    :model-value="modelValue.toString()"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :full-width="fullWidth"
    type="number"
    :min="min"
    :max="max"
    :step="step"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- 증감 버튼들 (append slot) -->
    <template #append v-if="showButtons">
      <div class="stepper-buttons">
        <button
          type="button"
          class="stepper-button decrease"
          :disabled="!canDecrease"
          @click="decrease"
          aria-label="값 감소"
        >
          <BaseIcon name="minus" size="sm" />
        </button>
        <button
          type="button"
          class="stepper-button increase"
          :disabled="!canIncrease"
          @click="increase"
          aria-label="값 증가"
        >
          <BaseIcon name="plus" size="sm" />
        </button>
      </div>
    </template>
  </BaseInput>
</template>

<style lang="scss" scoped></style>
