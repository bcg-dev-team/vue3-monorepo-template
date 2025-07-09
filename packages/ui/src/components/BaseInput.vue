<template>
  <div class="base-input">
    <NFormItem
      v-if="label"
      :label="label"
      :required="required"
      :validation-status="validationStatus"
      :feedback="errorMessage"
    >
      <NInput
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :clearable="clearable"
        :show-password-on="showPasswordOn"
        :round="round"
        :autosize="autosize"
        :maxlength="maxlength"
        :show-count="showCount"
        :pair="pair"
        :separator="separator"
        :show-separator="showSeparator"
        :input-props="inputProps"
        @update:value="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @enter="handleEnter"
        @clear="handleClear"
      />
    </NFormItem>

    <NInput
      v-else
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :clearable="clearable"
      :show-password-on="showPasswordOn"
      :round="round"
      :autosize="autosize"
      :maxlength="maxlength"
      :show-count="showCount"
      :pair="pair"
      :separator="separator"
      :show-separator="showSeparator"
      :input-props="inputProps"
      @update:value="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
      @enter="handleEnter"
      @clear="handleClear"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NInput, NFormItem } from 'naive-ui';
import type { InputProps, FormItemRule } from 'naive-ui';

/**
 * BaseInput 컴포넌트
 *
 * Naive UI를 기반으로 한 재사용 가능한 입력 필드 컴포넌트입니다.
 * 디자인 토큰을 활용하여 일관된 스타일을 제공합니다.
 *
 * @props modelValue - v-model 바인딩 값
 * @props label - 입력 필드 라벨
 * @props type - HTML input 타입
 * @props placeholder - 플레이스홀더 텍스트
 * @props required - 필수 입력 여부
 * @props disabled - 비활성화 상태
 * @props size - 입력 필드 크기
 * @props clearable - 지우기 버튼 표시 여부
 * @props showPasswordOn - 비밀번호 표시/숨김 토글
 * @props round - 둥근 모서리
 * @props autosize - 자동 크기 조정
 * @props maxlength - 최대 길이
 * @props showCount - 글자 수 표시
 * @props pair - 쌍 입력 필드
 * @props separator - 구분자
 * @props showSeparator - 구분자 표시 여부
 * @props inputProps - HTML input 속성
 * @props rules - 유효성 검증 규칙
 * @props errorMessage - 에러 메시지
 * @emits update:modelValue - 값 변경 시 발생하는 이벤트
 * @emits focus - 포커스 시 발생하는 이벤트
 * @emits blur - 블러 시 발생하는 이벤트
 * @emits keydown - 키 다운 시 발생하는 이벤트
 * @emits keyup - 키 업 시 발생하는 이벤트
 * @emits keypress - 키 프레스 시 발생하는 이벤트
 * @emits enter - 엔터 키 시 발생하는 이벤트
 * @emits clear - 지우기 시 발생하는 이벤트
 */
interface Props {
  /** v-model 바인딩 값 */
  modelValue?: string;
  /** 입력 필드 라벨 */
  label?: string;
  /** HTML input 타입 */
  type?: 'text' | 'password' | 'textarea' | 'number' | 'tel' | 'email' | 'url' | 'search';
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 입력 필드 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 지우기 버튼 표시 여부 */
  clearable?: boolean;
  /** 비밀번호 표시/숨김 토글 */
  showPasswordOn?: 'click' | 'mousedown';
  /** 둥근 모서리 */
  round?: boolean;
  /** 자동 크기 조정 */
  autosize?: boolean | { minRows?: number; maxRows?: number };
  /** 최대 길이 */
  maxlength?: number;
  /** 글자 수 표시 */
  showCount?: boolean;
  /** 쌍 입력 필드 */
  pair?: boolean;
  /** 구분자 */
  separator?: string;
  /** 구분자 표시 여부 */
  showSeparator?: boolean;
  /** HTML input 속성 */
  inputProps?: Record<string, any>;
  /** 유효성 검증 규칙 */
  rules?: FormItemRule[];
  /** 에러 메시지 */
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  size: 'medium',
  clearable: false,
  showPasswordOn: 'click',
  round: false,
  autosize: false,
  showCount: false,
  pair: false,
  separator: '-',
  showSeparator: false,
  inputProps: () => ({}),
  rules: () => [],
  errorMessage: '',
});

interface Emits {
  /** 값 변경 이벤트 */
  (e: 'update:modelValue', value: string): void;
  /** 포커스 이벤트 */
  (e: 'focus', event: FocusEvent): void;
  /** 블러 이벤트 */
  (e: 'blur', event: FocusEvent): void;
  /** 키 다운 이벤트 */
  (e: 'keydown', event: KeyboardEvent): void;
  /** 키 업 이벤트 */
  (e: 'keyup', event: KeyboardEvent): void;
  /** 키 프레스 이벤트 */
  (e: 'keypress', event: KeyboardEvent): void;
  /** 엔터 키 이벤트 */
  (e: 'enter'): void;
  /** 지우기 이벤트 */
  (e: 'clear'): void;
}

const emit = defineEmits<Emits>();

/**
 * Naive UI 입력 타입으로 변환
 */
const inputType = computed(() => {
  switch (props.type) {
    case 'password':
      return 'password';
    case 'textarea':
      return 'textarea';
    default:
      return 'text';
  }
});

/**
 * 유효성 검증 상태 계산
 */
const validationStatus = computed(() => {
  if (props.errorMessage) {
    return 'error';
  }
  return undefined;
});

/**
 * 입력 값 변경을 처리합니다.
 * @param value - 입력 값
 */
const handleInput = (value: string) => {
  emit('update:modelValue', value);
};

/**
 * 포커스 이벤트를 처리합니다.
 * @param event - 포커스 이벤트
 */
const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

/**
 * 블러 이벤트를 처리합니다.
 * @param event - 블러 이벤트
 */
const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

/**
 * 키 다운 이벤트를 처리합니다.
 * @param event - 키 다운 이벤트
 */
const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

/**
 * 키 업 이벤트를 처리합니다.
 * @param event - 키 업 이벤트
 */
const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event);
};

/**
 * 키 프레스 이벤트를 처리합니다.
 * @param event - 키 프레스 이벤트
 */
const handleKeypress = (event: KeyboardEvent) => {
  emit('keypress', event);
};

/**
 * 엔터 키 이벤트를 처리합니다.
 */
const handleEnter = () => {
  emit('enter');
};

/**
 * 지우기 이벤트를 처리합니다.
 */
const handleClear = () => {
  emit('clear');
};
</script>

<style scoped>
.base-input {
  width: 100%;
}
</style>
