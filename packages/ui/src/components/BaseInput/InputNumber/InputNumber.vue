<!--
  Figma 컴포넌트: Input/Number
  BaseInput을 확장한 숫자 입력 컴포넌트
-->
<script setup lang="ts">
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputNumber.scss';

/**
 * InputNumber - 숫자 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props min - 최소값
 * @props max - 최대값
 * @props step - 증감 단위 (기본값: 1)
 * @props precision - 소수점 자릿수 (기본값: 0)
 * @props allowNegative - 음수 허용 여부 (기본값: false)
 * @props format - 포맷 타입 (number, currency, percentage)
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props extends CommonInputProps {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  allowNegative?: boolean;
  format?: 'number' | 'currency' | 'percentage';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '숫자를 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  min: undefined,
  max: undefined,
  step: 1,
  precision: 0,
  allowNegative: false,
  format: 'number',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

/**
 * 숫자 유효성 검사
 * @param value - 검사할 값
 * @returns 유효성 여부
 */
const isValidNumber = (value: string): boolean => {
  if (!value) return true;

  const num = parseFloat(value);
  if (isNaN(num)) return false;

  if (props.min !== undefined && num < props.min) return false;
  if (props.max !== undefined && num > props.max) return false;
  if (!props.allowNegative && num < 0) return false;

  return true;
};

/**
 * 숫자 포맷팅
 * @param value - 포맷팅할 값
 * @returns 포맷팅된 값
 */
const formatNumber = (value: string): string => {
  if (!value) return '';

  const num = parseFloat(value);
  if (isNaN(num)) return value;

  switch (props.format) {
    case 'currency':
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: props.precision,
        maximumFractionDigits: props.precision,
      }).format(num);

    case 'percentage':
      return new Intl.NumberFormat('ko-KR', {
        style: 'percent',
        minimumFractionDigits: props.precision,
        maximumFractionDigits: props.precision,
      }).format(num / 100);

    default:
      return num.toFixed(props.precision);
  }
};

/**
 * 입력값 처리
 * @param value - 입력값
 */
const handleInput = (value: string) => {
  let processedValue = value;

  // 숫자와 소수점만 허용
  if (props.allowNegative) {
    processedValue = value.replace(/[^0-9.-]/g, '');
  } else {
    processedValue = value.replace(/[^0-9.]/g, '');
  }

  // 소수점이 여러 개 있는 경우 처리
  const parts = processedValue.split('.');
  if (parts.length > 2) {
    processedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  emit('update:modelValue', processedValue);
};

/**
 * 블러 시 포맷팅 적용
 * @param event - 블러 이벤트
 */
const handleBlur = (event: FocusEvent) => {
  if (props.format !== 'number' && props.modelValue) {
    const formatted = formatNumber(props.modelValue);
    emit('update:modelValue', formatted);
  }
  emit('blur', event);
};

// 숫자 유효성 상태
const isValid = computed(() => {
  return isValidNumber(props.modelValue);
});

// 에러 메시지
const errorMessage = computed(() => {
  if (!props.modelValue) return '';
  if (!isValid.value) {
    if (props.min !== undefined && props.max !== undefined) {
      return `${props.min}에서 ${props.max} 사이의 숫자를 입력해주세요`;
    } else if (props.min !== undefined) {
      return `${props.min} 이상의 숫자를 입력해주세요`;
    } else if (props.max !== undefined) {
      return `${props.max} 이하의 숫자를 입력해주세요`;
    } else if (!props.allowNegative) {
      return '양수를 입력해주세요';
    } else {
      return '올바른 숫자를 입력해주세요';
    }
  }
  return '';
});

// 표시할 값 (포맷팅 적용)
const displayValue = computed(() => {
  if (!props.modelValue) return '';

  if (props.format === 'number') {
    return props.modelValue;
  }

  // 포커스 중일 때는 원본 값, 블러 시 포맷팅된 값
  return props.modelValue;
});
</script>

<template>
  <div class="input-number-container">
    <!-- 숫자 입력 필드 -->
    <BaseInput
      :model-value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :class="{ error: !isValid && modelValue }"
      @update:model-value="handleInput"
      @focus="$emit('focus', $event)"
      @blur="handleBlur"
    />

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="input-number-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
