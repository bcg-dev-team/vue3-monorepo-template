<!--
  Figma 컴포넌트: Input/Select-SM
  BaseInput을 확장한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed, ref } from 'vue';
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

interface Props extends Omit<CommonInputProps, 'modelValue'> {
  // InputSelect 고유 props
  modelValue?: string | string[];
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

// 드롭다운 상태
const isOpen = ref(false);

// 이벤트 핸들러
const handleSelect = (value: string) => {
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? props.modelValue : [];
    const newValues = currentValues.includes(value) 
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    emit('update:modelValue', newValues);
  } else {
    emit('update:modelValue', value);
    isOpen.value = false;
  }
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
};

// 옵션 선택 상태 확인
const isOptionSelected = (value: string): boolean => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value);
  }
  return props.modelValue === value;
};
</script>

<template>
  <div class="input-select-container" @blur="closeDropdown">
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
        <BaseIcon 
          name="arrow-down" 
          size="sm" 
          class="select-icon"
          :class="{ 'select-icon--open': isOpen }"
          @click="toggleDropdown"
        />
      </template>
    </BaseInput>

    <!-- 커스텀 드롭다운 메뉴 -->
    <div v-if="isOpen" class="select-dropdown">
      <div class="dropdown-options">
        <div
          v-for="option in options"
          :key="option.value"
          class="dropdown-option"
          :class="{ 
            'dropdown-option--selected': isOptionSelected(option.value),
            'dropdown-option--disabled': option.disabled 
          }"
          @click="!option.disabled && handleSelect(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-select-container {
  position: relative;
}

.select-icon {
  color: var(--color-neutral-600, #5a5c5e);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &--open {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-options {
  padding: 4px 0;
}

.dropdown-option {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  
  &:hover {
    background-color: var(--color-neutral-100, #f3f4f6);
  }
  
  &--selected {
    background-color: var(--color-primary-50, #eff6ff);
    color: var(--color-primary-700, #1d4ed8);
    font-weight: 500;
  }
  
  &--disabled {
    color: var(--color-neutral-400, #9ca3af);
    cursor: not-allowed;
    
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
