<!--
  Figma 컴포넌트: Input/Select-SM
  BaseInput을 확장한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
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
  disabled?: boolean;
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
  modelValue: undefined,
  placeholder: '선택하세요',
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

// 선택된 옵션 객체
const selectedOption = computed({
  get() {
    return props.options.find((opt) => opt.value === props.modelValue) || null;
  },
  set(option: Option | null) {
    if (option) {
      emit('update:modelValue', option.value);
    }
  },
});

// 버튼 클래스
const buttonClasses = computed(() => {
  const base =
    'relative w-full min-w-0 rounded-md transition-all duration-150 bg-white border border-solid flex items-center justify-between tracking-[-0.35px]';
  const size =
    props.size === 'sm'
      ? 'px-[15px] py-3 text-[14px] leading-[16px]'
      : 'px-[15px] py-3.5 text-[16px] leading-[20px]';

  let state = '';
  if (props.disabled) {
    state =
      'bg-input-bg-disabled border-input-border-disabled text-input-text-disable cursor-not-allowed';
  } else {
    state = 'border-input-border-static';
  }

  const textColor = selectedOption.value ? 'text-input-text-static' : 'text-input-text-placeholder';

  return `${base} ${size} ${state} ${textColor}`;
});
</script>

<template>
  <div class="w-full">
    <Listbox v-model="selectedOption" :disabled="disabled" v-slot="{ open }">
      <div class="relative w-full">
        <ListboxButton
          :class="buttonClasses"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
          style="width: 100% !important; max-width: 100% !important"
        >
          <span class="truncate">{{ selectedOption?.label || placeholder }}</span>
          <BaseIcon
            name="arrow-down"
            :size="size === 'sm' ? 'sm' : 'md'"
            :color="disabled ? 'disabled' : 'default'"
            :class="{ 'rotate-180': open }"
            class="ml-2 flex-shrink-0 transition-transform duration-200"
          />
        </ListboxButton>

        <ListboxOptions
          class="border-input-border-static absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option"
            :disabled="option.disabled"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9 text-[13px] leading-[16px] tracking-[-0.35px]',
                option.disabled
                  ? 'text-input-text-disable cursor-not-allowed opacity-50'
                  : active
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-input-text-static',
                selected && !option.disabled ? 'font-medium' : '',
              ]"
            >
              <span class="block truncate">{{ option.label }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
