<!--
  Figma 컴포넌트: Input/Email
  BaseInput을 확장한 이메일 입력 컴포넌트
-->
<script setup lang="ts">
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputEmail.scss';

/**
 * InputEmail - 이메일 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props autoComplete - 자동완성 기능 여부 (기본값: true)
 * @props domainSuggestions - 도메인 제안 목록
 * @props validateOnBlur - 블러 시 유효성 검사 여부 (기본값: true)
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits validation - 유효성 검사 결과
 */
interface Props extends CommonInputProps {
  autoComplete?: boolean;
  domainSuggestions?: string[];
  validateOnBlur?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '이메일을 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  autoComplete: true,
  domainSuggestions: () => ['gmail.com', 'naver.com', 'daum.net', 'outlook.com'],
  validateOnBlur: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'validation', isValid: boolean, message: string): void;
}>();

/**
 * 이메일 유효성 검사
 * @param email - 검사할 이메일
 * @returns 유효성 여부
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 도메인 추출
 * @param email - 이메일 주소
 * @returns 도메인 부분
 */
const extractDomain = (email: string): string => {
  const parts = email.split('@');
  return parts.length > 1 ? parts[1] : '';
};

/**
 * 도메인 제안 목록 가져오기
 * @param partialDomain - 부분 도메인
 * @returns 제안 목록
 */
const getDomainSuggestions = (partialDomain: string): string[] => {
  if (!partialDomain) return [];

  return props.domainSuggestions.filter((domain) =>
    domain.toLowerCase().startsWith(partialDomain.toLowerCase())
  );
};

// 이메일 유효성 상태
const isValid = computed(() => {
  if (!props.modelValue) return true;
  return isValidEmail(props.modelValue);
});

// 에러 메시지
const errorMessage = computed(() => {
  if (!props.modelValue) return '';
  if (!isValid.value) return '올바른 이메일 주소를 입력해주세요';
  return '';
});

// 도메인 제안 표시 여부
const showDomainSuggestions = computed(() => {
  if (!props.autoComplete || !props.modelValue) return false;

  const domain = extractDomain(props.modelValue);
  const suggestions = getDomainSuggestions(domain);

  return domain && suggestions.length > 0 && !isValid.value;
});

// 도메인 제안 목록
const domainSuggestions = computed(() => {
  const domain = extractDomain(props.modelValue);
  return getDomainSuggestions(domain);
});

/**
 * 도메인 제안 선택
 * @param domain - 선택된 도메인
 */
const handleDomainSelect = (domain: string) => {
  const localPart = props.modelValue.split('@')[0];
  const newEmail = `${localPart}@${domain}`;
  emit('update:modelValue', newEmail);
};

/**
 * 블러 이벤트 처리
 * @param event - 블러 이벤트
 */
const handleBlur = (event: FocusEvent) => {
  emit('blur', event);

  if (props.validateOnBlur && props.modelValue) {
    emit('validation', isValid.value, errorMessage.value);
  }
};
</script>

<template>
  <div class="input-email-container">
    <!-- 이메일 입력 필드 -->
    <BaseInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="email"
      :class="{ error: !isValid && modelValue }"
      :autocomplete="autoComplete ? 'email' : 'off'"
      @update:model-value="$emit('update:modelValue', $event)"
      @focus="$emit('focus', $event)"
      @blur="handleBlur"
    />

    <!-- 도메인 제안 목록 -->
    <div v-if="showDomainSuggestions" class="domain-suggestions">
      <ul class="domain-suggestions-list">
        <li
          v-for="(domain, index) in domainSuggestions"
          :key="index"
          class="domain-suggestion-item"
          @click="handleDomainSelect(domain)"
        >
          {{ domain }}
        </li>
      </ul>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="input-email-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
