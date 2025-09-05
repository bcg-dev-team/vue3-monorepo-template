<!--
  Figma 컴포넌트: BaseInput (공통 베이스)
  모든 Input 타입의 공통 기능을 담당하는 베이스 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * BaseInput - 모든 Input 타입의 공통 베이스 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props readonly - 읽기 전용 여부
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @slot prepend - 외부 좌측 커스텀 컨텐츠
 * @slot prepend-inner - 내부 좌측 커스텀 컨텐츠
 * @slot append-inner - 내부 우측 커스텀 컨텐츠
 * @slot append - 외부 우측 커스텀 컨텐츠
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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  size: 'md',
  disabled: false,
  error: false,
  errorMessage: '',
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 상태 계산
const isDisabled = computed(() => props.disabled);
const isError = computed(() => props.error);
const hasValue = computed(() => props.modelValue && props.modelValue.length > 0);

// 크기별 클래스
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-[15px] py-3 text-[13px] leading-[16px]';
    case 'md':
      return 'px-[15px] py-3.5 text-[16px] leading-[20px]';
    default:
      return 'px-[15px] py-3.5 text-[16px] leading-[20px]';
  }
});

// 상태별 클래스
const stateClasses = computed(() => {
  const classes = [
    'relative w-full rounded-md transition-all duration-150 flex',
    'bg-white border border-solid',
  ];

  if (isDisabled.value) {
    classes.push(
      'bg-input-bg-disabled border-input-border-disabled text-input-text-disable cursor-not-allowed'
    );
  } else if (isError.value) {
    classes.push(
      'border-input-border-error',
      'focus-within:border-input-border-error focus-within:shadow-[0_0_0_1px_var(--input-color-border-error)]'
    );
  } else {
    classes.push(
      'border-input-border-static',
      'focus-within:border-input-border-focus focus-within:shadow-[0_0_0_1px_var(--input-color-border-focus)]',
      'hover:border-input-border-focus'
    );
  }

  return classes.join(' ');
});

// prepend-inner 클래스
const prependInnerClasses = computed(() => {
  const classes = [
    'flex items-center pl-[15px] text-input-text-static font-normal tracking-[-0.35px]',
  ];

  if (props.size === 'sm') {
    classes.push('text-[13px] leading-[16px]');
  } else {
    classes.push('text-[16px] leading-[20px]');
  }

  return classes.join(' ');
});

// append-inner 클래스
const appendInnerClasses = computed(() => {
  return 'flex items-center pr-[10px] gap-1';
});

// 입력 요소 클래스
const inputClasses = computed(() => {
  const classes = [
    'w-full bg-transparent border-0 outline-none',
    'tracking-[-0.35px]',
    sizeClasses.value,
  ];

  // 플레이스홀더 스타일
  if (isDisabled.value) {
    classes.push(
      'text-input-text-disable cursor-not-allowed',
      'placeholder:text-input-text-disable'
    );
  } else {
    classes.push(
      'text-input-text-static',
      'placeholder:text-input-text-placeholder placeholder:font-normal placeholder:tracking-[-0.35px]'
    );
  }

  return classes.join(' ');
});

// 이벤트 핸들러
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
  <div class="flex w-full flex-col">
    <!-- 메인 컨테이너 (input과 외부 슬롯들을 포함) -->
    <div class="flex w-full items-center gap-2">
      <!-- 외부 좌측 prepend -->
      <div v-if="$slots.prepend" class="flex-shrink-0">
        <slot name="prepend" />
      </div>

      <!-- 입력 컨테이너 -->
      <div :class="stateClasses" class="flex-1">
        <!-- 내부 좌측 prepend-inner -->
        <div v-if="$slots['prepend-inner']" :class="prependInnerClasses">
          <slot name="prepend-inner" />
        </div>

        <!-- 입력 필드 -->
        <input
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :readonly="readonly"
          :class="inputClasses"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- 내부 우측 append-inner -->
        <div v-if="$slots['append-inner']" :class="appendInnerClasses">
          <slot name="append-inner" />
        </div>
      </div>

      <!-- 외부 우측 append -->
      <div v-if="$slots.append" class="flex-shrink-0">
        <slot name="append" />
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div
      v-if="isError && errorMessage"
      class="text-input-border-error mt-1 text-[12px] font-medium"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
