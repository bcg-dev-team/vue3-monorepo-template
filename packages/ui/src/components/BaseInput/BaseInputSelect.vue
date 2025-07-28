<!--
  Figma 컴포넌트: Input/Select-SM
  BaseInput을 확장한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import BaseInput from './BaseInput.vue';
import './BaseInputSelect.scss';
import { computed } from 'vue';

/**
 * BaseInputSelect - 셀렉트 박스 컴포넌트
 *
 * @props modelValue - 선택된 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props options - 선택 옵션들
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Option {
  value: string;
  label: string;
}

interface Props {
  /**
   * 선택된 값 (v-model)
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
  /**
   * 선택 옵션들
   */
  options?: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  size: 'sm',
  disabled: false,
  error: false,
  errorMessage: '',
  options: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 선택된 옵션 라벨
const selectedLabel = computed(() => {
  if (!props.modelValue) return '';
  const option = props.options.find((opt) => opt.value === props.modelValue);
  return option ? option.label : props.modelValue;
});

// 아이콘 크기 계산
const iconSize = computed(() => {
  return props.size === 'sm' ? 'sm' : 'md';
});

// 이벤트 핸들러
const handleSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
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
    :model-value="selectedLabel"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :error="error"
    :error-message="errorMessage"
    readonly
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #suffix>
      <BaseIcon name="arrow-down" :size="iconSize" :color="disabled ? 'disabled' : 'default'" />
    </template>
  </BaseInput>

  <!-- 실제 셀렉트 요소 (숨김) -->
  <select
    :value="modelValue"
    :disabled="disabled"
    class="base-input-select-hidden"
    @change="handleSelect"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
