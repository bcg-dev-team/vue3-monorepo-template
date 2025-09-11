<!--
  Figma 컴포넌트: BaseInput (공통 베이스)
  모든 Input 타입의 공통 기능을 담당하는 베이스 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref, watch } from 'vue';

/**
 * BaseInput - 모든 Input 타입의 공통 베이스 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props variant - 입력 타입 변형 (default, search, password, tel, number)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props readonly - 읽기 전용 여부
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits onSearch - 검색 버튼 클릭 이벤트 (variant="search"일 때 사용)
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
   * 입력 타입 변형
   * @default 'default'
   */
  variant?: 'default' | 'search' | 'password' | 'tel' | 'number';
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
  variant: 'default',
  disabled: false,
  error: false,
  errorMessage: '',
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'onSearch', event: MouseEvent): void;
}>();

// 내부 상태 관리
const isPasswordVisible = ref(false);
const internalValue = ref(props.modelValue || '');

// Computed 속성들
const isDisabled = computed(() => props.disabled);
const isError = computed(() => props.error);
const showVariantIcon = computed(() => props.variant === 'search' || props.variant === 'password');

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-[15px] py-[13px] text-[13px] leading-[16px]'
    : 'px-[15px] py-[13px] text-[16px] leading-[20px]';
});

const containerClasses = computed(() => {
  const base =
    'relative w-full rounded-md transition-all duration-150 flex bg-[var(--input-color-surface)] border border-solid';

  if (isDisabled.value) {
    return `${base} bg-input-bg-disabled border-input-border-disabled text-input-text-disable cursor-not-allowed`;
  }

  if (isError.value) {
    return `${base} border-input-border-error focus-within:border-input-border-error focus-within:shadow-[0_0_0_1px_var(--input-color-border-error)]`;
  }

  return `${base} border-input-border-static focus-within:border-input-border-focus focus-within:shadow-[0_0_0_1px_var(--input-color-border-focus)] hover:border-input-border-focus`;
});

const inputClasses = computed(() => {
  const base = `w-full bg-transparent border-0 outline-none tracking-[-0.35px] ${sizeClasses.value}`;
  const padding = showVariantIcon.value ? 'pr-[45px]' : '';

  const textStyles = isDisabled.value
    ? 'text-input-text-disable cursor-not-allowed placeholder:text-input-text-disable'
    : 'text-input-text-static placeholder:text-input-text-placeholder placeholder:font-normal placeholder:tracking-[-0.35px]';

  return `${base} ${padding} ${textStyles}`;
});

const prependInnerClasses = computed(() => {
  const textSize =
    props.size === 'sm' ? 'text-[13px] leading-[16px]' : 'text-[16px] leading-[20px]';
  return `flex items-center pl-[15px] text-input-text-static font-normal tracking-[-0.35px] ${textSize}`;
});

const appendInnerClasses = computed(() => {
  return 'absolute right-0 top-0 h-full flex items-center pr-[15px] gap-1';
});

// 이벤트 핸들러들
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  internalValue.value = target.value;
  emit('update:modelValue', target.value);
};

const handleTelInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, '');
  target.value = value;
  internalValue.value = value;
  emit('update:modelValue', value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleSearchClick = (event: MouseEvent) => {
  if (props.variant === 'search') {
    emit('onSearch', event);
  }
};

const handlePasswordToggle = (event: MouseEvent) => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// 키보드 접근성 이벤트 핸들러
const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleSearchClick(event as any);
  }
};

const handlePasswordKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handlePasswordToggle(event as any);
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue || '';
  }
);
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full items-center gap-2">
      <!-- 외부 좌측 prepend -->
      <div v-if="$slots.prepend" class="flex-shrink-0">
        <slot name="prepend" />
      </div>

      <!-- 입력 컨테이너 -->
      <div :class="containerClasses" class="flex-1">
        <!-- 내부 좌측 prepend-inner -->
        <div v-if="$slots['prepend-inner']" :class="prependInnerClasses">
          <slot name="prepend-inner" />
        </div>

        <!-- 입력 필드 -->
        <div class="relative flex-1">
          <!-- default,search variant -->
          <input
            v-show="variant === 'default' || variant === 'search' || isPasswordVisible"
            :value="internalValue"
            type="text"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :readonly="readonly"
            :class="inputClasses"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <!-- tel variant -->
          <input
            v-show="variant === 'tel'"
            :value="internalValue"
            type="tel"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :readonly="readonly"
            :class="inputClasses"
            @input="handleTelInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <!-- number variant -->
          <input
            v-show="variant === 'number'"
            :value="internalValue"
            type="number"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :readonly="readonly"
            :class="inputClasses"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <!-- password variant -->
          <input
            v-show="variant === 'password' && !isPasswordVisible"
            :value="internalValue"
            type="password"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :readonly="readonly"
            :class="inputClasses"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />

          <!-- Variant 아이콘 -->
          <div v-if="showVariantIcon" :class="appendInnerClasses">
            <BaseIcon
              v-if="variant === 'search'"
              name="search"
              :size="size === 'sm' ? 'sm' : 'md'"
              class="text-input-text-static hover:text-input-text-hover cursor-pointer select-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              tabindex="0"
              role="button"
              aria-label="검색 실행"
              @click.stop="handleSearchClick"
              @keydown.stop="handleSearchKeydown"
              @mousedown.prevent
            />
            <BaseIcon
              v-if="variant === 'password'"
              :name="isPasswordVisible ? 'eye' : 'eye-close'"
              :size="size === 'sm' ? 'sm' : 'md'"
              class="text-input-text-static hover:text-input-text-hover cursor-pointer select-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              tabindex="0"
              role="button"
              :aria-label="isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시'"
              @click.stop="handlePasswordToggle"
              @keydown.stop="handlePasswordKeydown"
              @mousedown.prevent
            />
          </div>
        </div>

        <!-- 내부 우측 append-inner (슬롯) -->
        <div
          v-if="$slots['append-inner']"
          :class="appendInnerClasses.replace('gap-1', 'z-10 gap-1')"
        >
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

<style scoped>
/* BaseInput type=number일 경우 우측 스핀버튼 제거 style */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
