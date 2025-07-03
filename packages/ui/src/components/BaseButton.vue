<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="loading-spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonVariant, ButtonSize, ButtonType } from '@template/types';

/**
 * BaseButton 컴포넌트
 *
 * 재사용 가능한 버튼 컴포넌트로, 다양한 스타일과 상태를 지원합니다.
 *
 * @props variant - 버튼 스타일 변형 (primary, secondary, success, warning, danger, info)
 * @props size - 버튼 크기 (sm, md, lg)
 * @props type - HTML button 타입 (button, submit, reset)
 * @props disabled - 비활성화 상태
 * @props loading - 로딩 상태 (스피너 표시)
 * @props fullWidth - 전체 너비 사용 여부
 * @emits click - 버튼 클릭 시 발생하는 이벤트
 */
interface Props {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** HTML button 타입 */
  type?: ButtonType;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
});

interface Emits {
  /** 버튼 클릭 이벤트 */
  (e: 'click', event: MouseEvent): void;
}

const emit = defineEmits<Emits>();

/**
 * 버튼 CSS 클래스들을 계산합니다.
 * variant, size, 상태에 따라 적절한 클래스를 조합합니다.
 */
const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--disabled': props.disabled,
    'base-button--loading': props.loading,
    'base-button--full-width': props.fullWidth,
  },
]);

/**
 * 버튼 클릭 이벤트를 처리합니다.
 * disabled나 loading 상태가 아닐 때만 이벤트를 발생시킵니다.
 * @param event - 마우스 클릭 이벤트
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: none;
  border-radius: var(--spacing-1-5);
  font-family: var(--typography-font-family-sans);
  font-weight: var(--typography-font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-button--full-width {
  width: 100%;
}

/* Variants */
.base-button--primary {
  background-color: var(--color-primary-500);
  color: var(--color-neutral-white);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.base-button--secondary {
  background-color: var(--color-secondary-500);
  color: var(--color-neutral-white);
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-600);
}

.base-button--success {
  background-color: var(--color-success-500);
  color: var(--color-neutral-white);
}

.base-button--success:hover:not(:disabled) {
  background-color: var(--color-success-600);
}

.base-button--warning {
  background-color: var(--color-warning-500);
  color: var(--color-neutral-white);
}

.base-button--warning:hover:not(:disabled) {
  background-color: var(--color-warning-600);
}

.base-button--danger {
  background-color: var(--color-error-500);
  color: var(--color-neutral-white);
}

.base-button--danger:hover:not(:disabled) {
  background-color: var(--color-error-600);
}

.base-button--info {
  background-color: var(--color-primary-400);
  color: var(--color-neutral-white);
}

.base-button--info:hover:not(:disabled) {
  background-color: var(--color-primary-500);
}

/* Sizes */
.base-button--sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--typography-font-size-sm);
}

.base-button--md {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--typography-font-size-base);
}

.base-button--lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--typography-font-size-lg);
}

/* Loading spinner */
.loading-spinner {
  width: var(--spacing-4);
  height: var(--spacing-4);
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
