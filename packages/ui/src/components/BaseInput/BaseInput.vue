<!--
  Figma 컴포넌트: BaseInput (공통 베이스)
  모든 Input 타입의 공통 기능을 담당하는 베이스 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import { computed } from 'vue';
import './BaseInput.scss';

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
 * @slot prefix - 좌측 커스텀 컨텐츠
 * @slot suffix - 우측 커스텀 컨텐츠
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
    'relative w-full rounded-md transition-all duration-150',
    'bg-white border border-solid',
  ];

  if (isDisabled.value) {
    classes.push(
      'bg-input-bg-disabled border-input-border-disabled text-input-text-disable cursor-not-allowed'
    );
  } else if (isError.value) {
    classes.push('border-input-border-error focus:border-input-border-error');
  } else {
    classes.push(
      'border-input-border-static focus:border-input-border-focus hover:border-input-border-focus'
    );
  }

  return classes.join(' ');
});

// 입력 요소 클래스
const inputClasses = computed(() => {
  const classes = [
    'w-full bg-transparent border-0 outline-none',
    "font-['Pretendard_GOV:Regular',_sans-serif]",
    'tracking-[-0.35px]',
    sizeClasses.value,
  ];

  if (isDisabled.value) {
    classes.push('text-input-text-disable cursor-not-allowed');
  } else if (hasValue.value) {
    classes.push('text-input-text-static');
  } else {
    classes.push('text-input-text-placeholder');
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
  <div class="base-input-container">
    <!-- 메인 입력 컨테이너 -->
    <div :class="stateClasses">
      <!-- 좌측 prefix -->
      <div v-if="$slots.prefix" class="base-input-prefix">
        <slot name="prefix" />
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

      <!-- 우측 suffix -->
      <div v-if="$slots.suffix" class="base-input-suffix">
        <slot name="suffix" />
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="isError && errorMessage" class="base-input-error">
      {{ errorMessage }}
    </div>
  </div>
</template>
