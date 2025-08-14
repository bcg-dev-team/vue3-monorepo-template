<!--
  Figma 컴포넌트: Input/Calendar-SM
  캘린더 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import { computed } from 'vue';
import './InputCalendar.scss';

/**
 * InputCalendar - 캘린더 입력 컴포넌트
 *
 * @props modelValue - 선택된 날짜 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props minDate - 최소 선택 가능한 날짜
 * @props maxDate - 최대 선택 가능한 날짜
 * @props format - 날짜 포맷 (기본값: 'YYYY-MM-DD')
 * @emits update:modelValue - 날짜 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props extends Omit<CommonInputProps, 'modelValue'> {
  modelValue?: string;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'YYYY-MM-DD',
  disabled: false,
  readonly: false,
  fullWidth: false,
  minDate: undefined,
  maxDate: undefined,
  format: 'YYYY-MM-DD',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 날짜 유효성 검사
const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// 날짜 범위 검사
const isDateInRange = (dateString: string): boolean => {
  if (!dateString) return true;

  const date = new Date(dateString);

  if (props.minDate) {
    const minDate = new Date(props.minDate);
    if (date < minDate) return false;
  }

  if (props.maxDate) {
    const maxDate = new Date(props.maxDate);
    if (date > maxDate) return false;
  }

  return true;
};

// 날짜 유효성 상태
const isValid = computed(() => {
  if (!props.modelValue) return true;
  return isValidDate(props.modelValue) && isDateInRange(props.modelValue);
});

// 에러 메시지
const errorMessage = computed(() => {
  if (!props.modelValue) return '';
  if (!isValidDate(props.modelValue)) return '올바른 날짜를 입력해주세요';
  if (!isDateInRange(props.modelValue)) return '선택 가능한 날짜 범위를 벗어났습니다';
  return '';
});

// 이벤트 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 클래스 계산
const inputClasses = computed(() => [
  'input-calendar',
  { 'w-full': props.fullWidth, 'w-[200px]': !props.fullWidth },
  { error: !isValid.value },
  { disabled: props.disabled },
]);
</script>

<template>
  <div class="input-calendar-container">
    <input
      type="date"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :min="minDate"
      :max="maxDate"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- 캘린더 아이콘 -->
    <BaseIcon name="calendar" size="sm" class="calendar-icon" />

    <!-- 에러 메시지 -->
    <div v-if="!isValid && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 기본 date input의 캘린더 아이콘 숨기기
:deep(input[type='date']::-webkit-calendar-picker-indicator) {
  display: none;
}

:deep(input[type='date']::-webkit-inner-spin-button) {
  display: none;
}

:deep(input[type='date']::-webkit-clear-button) {
  display: none;
}

.calendar-icon {
  color: var(--color-neutral-600, #5a5c5e);
  cursor: pointer;
}

.input-calendar-error {
  color: var(--color-error-500, #dc2626);
  font-size: 12px;
  margin-top: 4px;
}
</style>
