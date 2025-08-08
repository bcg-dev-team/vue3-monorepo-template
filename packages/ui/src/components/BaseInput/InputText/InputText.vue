<!--
  Figma 컴포넌트: Input/Text-SM, Input/Text-MD
  BaseInput을 확장한 텍스트 입력 컴포넌트 (text 타입 전용)
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { TextInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputText.scss';

/**
 * InputText - BaseInput을 확장한 텍스트 입력 컴포넌트
 * text 타입 전용으로 설계되었습니다.
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props type - 입력 타입 (text, email, password, search, tel)
 * @props label - 라벨 텍스트
 * @props helperText - 헬퍼 텍스트
 * @props errorMessage - 에러 메시지
 * @props size - 크기 (sm, md)
 * @props clearable - clear 버튼 표시 여부
 * @props required - 필수 여부
 * @props autoFocus - 자동 포커스 여부
 * @props tabIndex - 탭 인덱스
 * @props id - 고유 ID
 * @props name - 폼 필드명
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits clear - clear 버튼 클릭 시 발생
 */
interface Props extends TextInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  size?: 'sm' | 'md';
  clearable?: boolean; // clear 버튼 표시 여부
  required?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  id?: string;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  readonly: false,
  fullWidth: true, // InputText는 일반적으로 전체 너비 사용
  size: 'md',
  clearable: false,
  required: false,
  autoFocus: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
}>();

// 계산된 값들
const inputId = computed(() => props.id || `input-text-${Math.random().toString(36).slice(2, 8)}`);
const hasError = computed(() => !!props.errorMessage);
const showClearButton = computed(
  () => props.clearable && props.modelValue && props.modelValue.length > 0 && !props.disabled
);

// size별 설정
const iconSize = computed(() => (props.size === 'sm' ? 'sm' : 'md'));

// 컨테이너 클래스 계산
const containerClass = computed(() => {
  return `input-text-container ${props.fullWidth ? 'w-full' : 'w-fit'}`;
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

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<template>
  <div :class="containerClass">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="input-text-label">
      {{ label }}
      <span v-if="required" class="required-indicator" aria-hidden="true">*</span>
    </label>

    <!-- BaseInput 조합 (type="text" 고정) -->
    <BaseInput
      :modelValue="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :fullWidth="fullWidth"
      type="text"
      @update:modelValue="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- suffix slot에 clear 버튼만 -->
      <template #suffix>
        <BaseIcon
          v-if="showClearButton"
          name="icn-delete"
          :size="iconSize"
          class="input-text-clear-icon"
          @click="handleClear"
        />
      </template>
    </BaseInput>

    <!-- Helper Text -->
    <div v-if="helperText && !hasError" :id="`${inputId}-helper`" class="input-text-helper">
      {{ helperText }}
    </div>

    <!-- Error Message -->
    <div v-if="hasError" :id="`${inputId}-error`" class="input-text-error">
      {{ errorMessage }}
    </div>
  </div>
</template>
