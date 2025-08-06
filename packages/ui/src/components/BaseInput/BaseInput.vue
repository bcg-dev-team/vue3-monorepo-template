<!--
  Figma 컴포넌트: BaseInput (공통 베이스)
  모든 Input 타입의 공통 기능을 담당하는 베이스 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import type { BaseInputProps } from './types';
import { computed } from 'vue';

/**
 * BaseInput - 공통 스타일/상태/slot만 담당하는 베이스 컴포넌트
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부 (기본값: false, false일 때는 w-[200px])
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @slot prefix - 입력창 내부 왼쪽
 * @slot suffix - 입력창 내부 오른쪽
 * @slot append - 입력창 외부 오른쪽(타이머, 버튼 등)
 */
interface Props extends BaseInputProps {
  // BaseInput 고유 props (현재는 없음)
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  readonly: false,
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 상태별 클래스 계산
const stateClasses = computed(() => {
  const baseClasses = ['relative rounded-md transition-all duration-150', 'border border-solid'];

  if (props.disabled) {
    // disabled 상태: 피그마 디자인 토큰 적용
    baseClasses.push('bg-input-bg-disabled', 'border-input-border-disabled', 'cursor-not-allowed');
  } else {
    // 기본 상태
    baseClasses.push(
      'bg-white',
      'border-input-border-static',
      'focus:border-input-border-focus',
      'hover:border-input-border-focus'
    );
  }

  return baseClasses;
});

const mainRowClass = computed(() => {
  // fullWidth: w-full, 기본값 w-[200px] min-w-0
  return props.fullWidth ? 'flex items-stretch w-full' : 'flex items-stretch min-w-0 w-[200px]';
});

const innerClass = computed(() => {
  return 'flex items-center px-[15px] w-full';
});

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
</script>

<template>
  <div :class="'base-input-main-row ' + mainRowClass">
    <div :class="stateClasses.join(' ') + ' ' + innerClass">
      <!-- prefix slot: input 왼쪽, 오른쪽 마진(mr-2)으로 최소 공간 확보 -->
      <div v-if="$slots.prefix" class="base-input-prefix mr-2 flex shrink-0 items-center">
        <slot name="prefix" />
      </div>
      <!-- 입력 필드 -->
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-disabled="disabled"
        :aria-readonly="readonly"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        class="disabled:text-input-text-disable w-full flex-1 border-0 bg-transparent p-0 py-3.5 text-[16px] leading-[20px] tracking-[-0.35px] outline-none disabled:cursor-not-allowed"
      />
      <!-- suffix slot: input 오른쪽, 왼쪽 마진(ml-2)으로 최소 공간 확보 -->
      <div v-if="$slots.suffix" class="base-input-suffix ml-2 flex shrink-0 items-center">
        <slot name="suffix" />
      </div>
    </div>
    <!-- append slot: 입력창 외부 오른쪽, 왼쪽 마진(ml-2)으로 최소 공간 확보 -->
    <div v-if="$slots.append" class="base-input-append ml-2 flex items-center">
      <slot name="append" />
    </div>
  </div>
</template>
