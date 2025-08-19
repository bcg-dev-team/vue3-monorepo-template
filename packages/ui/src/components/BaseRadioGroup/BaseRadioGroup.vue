<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { ref, watch } from 'vue';
import type { RadioOption } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

interface Props {
  /**
   * 라디오 옵션 목록
   */
  options: RadioOption[];
  /**
   * 현재 선택된 값
   */
  modelValue?: any;
  /**
   * 초기 선택값 (modelValue가 없을 때만 사용)
   */
  initialValue?: any;
  /**
   * 라디오 그룹 라벨
   */
  label?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 폼에서 사용할 name 속성
   */
  name?: string;
  /**
   * 객체 비교를 위한 키 또는 비교 함수
   */
  by?: string | ((a: any, b: any) => boolean);
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: '',
  disabled: false,
  name: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

// 내부 선택 상태 관리
const internalValue = ref(props.modelValue ?? props.initialValue);

// modelValue가 변경되면 내부 상태도 업데이트
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue;
  }
});

// 내부 상태가 변경되면 부모에게 알림
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

/**
 * 라디오 옵션의 클래스를 동적으로 생성하는 함수
 * @param checked - 선택된 옵션 여부
 * @param active - 활성 상태 여부
 * @param disabled - 비활성화 여부
 * @returns CSS 클래스 문자열
 */
const getRadioOptionClasses = (
  checked: boolean,
  active: boolean = false,
  disabled: boolean = false
): string => {
  const baseClasses = 'focus:outline-none focus:ring-0 flex items-center gap-x-2 px-3 py-1.5 text-[13px] leading-[16px] tracking-tight rounded-xs font-medium transition-colors duration-200';

  // 비활성화 상태
  if (disabled) {
    return [
      baseClasses,
      'opacity-50 cursor-not-allowed text-[var(--button-tab-text-off)]'
    ].join(' ');
  }

  // 선택된 상태
  if (checked) {
    return [
      baseClasses,
      'bg-[var(--button-tab-button-on)] text-[var(--button-tab-text-on)]'
    ].join(' ');
  }

  // 활성 상태 (호버/포커스)
  if (active) {
    return [
      baseClasses,
      'bg-[var(--button-tab-button-hover)] text-[var(--button-tab-text-on)]'
    ].join(' ');
  }

  // 기본 상태
  return [
    baseClasses,
    'text-[var(--button-tab-text-off)] hover:bg-[var(--button-tab-button-hover)] hover:text-[var(--button-tab-text-on)]'
  ].join(' ');
};
</script>

<template>
  <div class="w-full">
    <!-- 라디오 그룹 컨테이너 -->
    <RadioGroup
      v-model="internalValue"
      :disabled="disabled"
      :name="name"
      :by="by"
      class="space-y-2"
    >
      <!-- 라디오 그룹 라벨 -->
      <RadioGroupLabel
        v-if="label"
        class="block text-sm font-medium text-gray-700"
      >
        {{ label }}
      </RadioGroupLabel>

      <!-- 라디오 옵션들 -->
      <div class="flex p-1 bg-neutral-neutral050 rounded-[6px] gap-x-[10px]">
        <RadioGroupOption
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled || disabled"
          as="template"
          v-slot="{ checked, active, disabled: optionDisabled }"
        >
          <button
            :class="getRadioOptionClasses(checked, active, optionDisabled)"
            :disabled="optionDisabled"
            type="button"
          >
            <!-- 아이콘이 있는 경우 -->
            <BaseIcon
              v-if="option.icon"
              :name="option.icon"
              class="w-4 h-4"
            />

            <!-- 옵션 라벨 -->
            {{ option.label }}
          </button>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template> 