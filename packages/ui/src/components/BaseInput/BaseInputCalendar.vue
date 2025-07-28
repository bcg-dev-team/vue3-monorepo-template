<!--
  Figma 컴포넌트: Input/Calendar-SM
  BaseInput을 확장한 캘린더 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import BaseInput from './BaseInput.vue';
import './BaseInputCalendar.scss';
import { computed } from 'vue';

/**
 * BaseInputCalendar - 캘린더 입력 컴포넌트
 *
 * @props modelValue - 선택된 날짜 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @emits update:modelValue - 날짜 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props {
  /**
   * 선택된 날짜 (v-model)
   */
  modelValue?: string;
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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'YYYY-MM-DD',
  size: 'sm',
  disabled: false,
  error: false,
  errorMessage: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 아이콘 크기 계산
const iconSize = computed(() => {
  return props.size === 'sm' ? 'sm' : 'md';
});

// 이벤트 핸들러
const handleInput = (value: string) => {
  emit('update:modelValue', value);
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
    :model-value="modelValue"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :error="error"
    :error-message="errorMessage"
    type="date"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #suffix>
      <BaseIcon name="calendar" :size="iconSize" :color="disabled ? 'disabled' : 'default'" />
    </template>
  </BaseInput>
</template>
