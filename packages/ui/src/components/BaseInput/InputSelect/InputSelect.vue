<!--
  Figma 컴포넌트: Input/Select-SM
  BaseInput을 확장한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputSelect.scss';

/**
 * InputSelect - 셀렉트 박스 컴포넌트
 *
 * @props modelValue - 선택된 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props options - 선택 옵션들
 * @props multiple - 다중 선택 여부 (기본값: false)
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props extends CommonInputProps {
  // InputSelect 고유 props
  options?: Option[];
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '선택해주세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  options: () => [],
  multiple: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 선택된 옵션 라벨
const selectedLabel = computed(() => {
  if (!props.modelValue) return '';

  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue
      .map((value) => {
        const option = props.options.find((opt) => opt.value === value);
        return option ? option.label : value;
      })
      .join(', ');
  }

  const option = props.options.find((opt) => opt.value === props.modelValue);
  return option ? option.label : (props.modelValue as string);
});

// 이벤트 핸들러
const handleSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;

  if (props.multiple) {
    const selectedValues = Array.from(target.selectedOptions).map((option) => option.value);
    emit('update:modelValue', selectedValues);
  } else {
    emit('update:modelValue', target.value);
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
    :model-value="selectedLabel"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="true"
    :full-width="fullWidth"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- 셀렉트 아이콘 (suffix slot) -->
    <template #suffix>
      <BaseIcon name="arrow-down" size="sm" class="select-icon" />
    </template>

    <!-- 실제 셀렉트 엘리먼트 (append slot) -->
    <template #append>
      <select
        :value="modelValue"
        :multiple="multiple"
        :disabled="disabled"
        class="select-element"
        @change="handleSelect"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
  </BaseInput>
</template>

<style lang="scss" scoped></style>
