<!--
  Figma 컴포넌트: Input/Tel
  BaseInput을 확장한 전화번호 입력 컴포넌트
-->
<script setup lang="ts">
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputTel.scss';

/**
 * InputTel - 전화번호 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props autoFormat - 자동 포맷팅 여부 (기본값: true)
 * @props format - 전화번호 포맷 (기본값: '###-####-####')
 * @props countryCode - 국가 코드 표시 여부 (기본값: false)
 * @props defaultCountry - 기본 국가 코드 (기본값: '+82')
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props extends CommonInputProps {
  autoFormat?: boolean;
  format?: string;
  countryCode?: boolean;
  defaultCountry?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '전화번호를 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  autoFormat: true,
  format: '###-####-####',
  countryCode: false,
  defaultCountry: '+82',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

/**
 * 전화번호 포맷팅
 * @param value - 포맷팅할 전화번호
 * @returns 포맷팅된 전화번호
 */
const formatPhoneNumber = (value: string): string => {
  if (!props.autoFormat) return value;

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 포맷 적용
  let formatted = '';
  let numberIndex = 0;

  for (let i = 0; i < props.format.length && numberIndex < numbers.length; i++) {
    if (props.format[i] === '#') {
      formatted += numbers[numberIndex];
      numberIndex++;
    } else {
      formatted += props.format[i];
    }
  }

  return formatted;
};

/**
 * 입력값 처리
 * @param value - 입력값
 */
const handleInput = (value: string) => {
  const formattedValue = formatPhoneNumber(value);
  emit('update:modelValue', formattedValue);
};

/**
 * 전화번호 유효성 검사
 * @param value - 검사할 전화번호
 * @returns 유효성 여부
 */
const isValidPhoneNumber = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
};

// 전화번호 유효성 상태
const isValid = computed(() => {
  if (!props.modelValue) return true;
  return isValidPhoneNumber(props.modelValue);
});

// 에러 메시지
const errorMessage = computed(() => {
  if (!props.modelValue) return '';
  if (!isValid.value) return '올바른 전화번호를 입력해주세요';
  return '';
});
</script>

<template>
  <div class="input-tel-container">
    <!-- 국가 코드가 있는 경우 -->
    <div v-if="countryCode" class="input-tel-with-country">
      <div class="country-code">{{ defaultCountry }}</div>
      <BaseInput
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :full-width="fullWidth"
        type="tel"
        :class="{ error: !isValid && modelValue }"
        @update:model-value="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <!-- 일반 전화번호 입력 -->
    <BaseInput
      v-else
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="tel"
      :class="{ error: !isValid && modelValue }"
      @update:model-value="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="input-tel-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
