<!--
  Figma 컴포넌트: Input/Select-SM
  Headless UI를 사용한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import type { CommonInputProps } from '../types';
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
  modelValue?: string;
  options: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '선택해주세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  options: () => [],
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [];
  blur: [];
}>();

// 선택된 옵션
const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue)
);

// 선택된 옵션 라벨
const selectedLabel = computed(() => selectedOption.value?.label || props.placeholder);

// 클래스 계산
const buttonClasses = computed(() => [
  'input-select',
  { 'w-full': props.fullWidth, 'w-[200px]': !props.fullWidth },
  { disabled: props.disabled || props.readonly },
]);
</script>

<template>
  <Listbox
    :model-value="modelValue"
    :disabled="disabled || readonly"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @focus="emit('focus')"
    @blur="emit('blur')"
  >
    <div class="relative">
      <ListboxButton :class="buttonClasses" :disabled="disabled || readonly">
        <span class="block truncate text-left">
          {{ selectedLabel }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <!-- ChevronDown 아이콘 -->
          <svg
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                option.disabled ? 'cursor-not-allowed opacity-50' : '',
              ]"
            >
              <span :class="['block truncate', selected ? 'font-medium' : 'font-normal']">
                {{ option.label }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-2',
                  active ? 'text-white' : 'text-blue-600',
                ]"
              >
                <!-- Check 아이콘 -->
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
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
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
