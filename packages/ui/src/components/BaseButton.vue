<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="loading-spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonVariant, ButtonSize, ButtonType } from '@template/types';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
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

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

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
