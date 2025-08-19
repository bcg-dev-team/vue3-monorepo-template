<!--
  Figma 컴포넌트: Input/Text-SM, Input/Text-MD
  BaseInput을 확장한 텍스트 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import BaseInput from './BaseInput.vue';
import { computed } from 'vue';

/**
 * BaseInputText - 텍스트 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props readonly - 읽기 전용 여부
 * @props showIcon - 아이콘 표시 여부
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props {
  /**
   * 입력값 (v-model)
   */
  modelValue?: string;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 크기
   * @default 'md'
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
   * 읽기 전용 여부
   * @default false
   */
  readonly?: boolean;
  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  size: 'md',
  disabled: false,
  error: false,
  errorMessage: '',
  readonly: false,
  showIcon: true,
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
    :readonly="readonly"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #suffix>
      <BaseIcon
        v-if="showIcon"
        name="eye"
        :size="iconSize"
        :color="disabled ? 'disabled' : 'default'"
      />
    </template>
  </BaseInput>
</template>
