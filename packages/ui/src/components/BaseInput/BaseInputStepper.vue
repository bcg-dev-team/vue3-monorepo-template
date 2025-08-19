<!--
  Figma 컴포넌트: Input/Stepper
  BaseInput을 확장한 스테퍼 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import BaseInput from './BaseInput.vue';
import { computed } from 'vue';

/**
 * BaseInputStepper - 스테퍼 입력 컴포넌트
 *
 * @props modelValue - 현재 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props min - 최소값
 * @props max - 최대값
 * @props step - 증감 단위
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props {
  /**
   * 현재 값 (v-model)
   */
  modelValue?: number;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 크기
   * @default 'sm'
   */
  size?: 'sm' | 'md';
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 에러 상태 여부
   * @default false
   */
  error?: boolean;
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  /**
   * 최소값
   * @default 0
   */
  min?: number;
  /**
   * 최대값
   */
  max?: number;
  /**
   * 증감 단위
   * @default 1
   */
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  placeholder: '',
  size: 'sm',
  disabled: false,
  error: false,
  errorMessage: '',
  min: 0,
  max: undefined,
  step: 1,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 아이콘 크기 계산
const iconSize = computed(() => {
  return props.size === 'sm' ? 'sm' : 'md';
});

// 최소/최대값 체크
const canDecrease = computed(() => {
  return !props.disabled && (props.max === undefined || props.modelValue > props.min);
});

const canIncrease = computed(() => {
  return !props.disabled && (props.max === undefined || props.modelValue < props.max);
});

// 이벤트 핸들러
const handleInput = (value: string) => {
  const numValue = parseInt(value) || 0;
  emit('update:modelValue', numValue);
};

const handleDecrease = () => {
  if (canDecrease.value) {
    const newValue = props.modelValue - props.step;
    emit('update:modelValue', Math.max(newValue, props.min));
  }
};

const handleIncrease = () => {
  if (canIncrease.value) {
    const newValue = props.modelValue + props.step;
    if (props.max !== undefined) {
      emit('update:modelValue', Math.min(newValue, props.max));
    } else {
      emit('update:modelValue', newValue);
    }
  }
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
    :size="size"
    :disabled="disabled"
    :error="error"
    :error-message="errorMessage"
    type="number"
    :min="min"
    :max="max"
    :step="step"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #suffix>
      <div class="base-input-stepper-controls">
        <button
          type="button"
          class="base-input-stepper-btn"
          :disabled="!canDecrease"
          @click="handleDecrease"
        >
          <BaseIcon name="minus" :size="iconSize" :color="canDecrease ? 'default' : 'disabled'" />
        </button>
        <button
          type="button"
          class="base-input-stepper-btn"
          :disabled="!canIncrease"
          @click="handleIncrease"
        >
          <BaseIcon name="plus" :size="iconSize" :color="canIncrease ? 'default' : 'disabled'" />
        </button>
      </div>
    </template>
  </BaseInput>
</template>
