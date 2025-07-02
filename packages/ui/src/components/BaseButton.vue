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
  gap: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
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
  background-color: #3b82f6;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.base-button--secondary {
  background-color: #6b7280;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.base-button--success {
  background-color: #10b981;
  color: white;
}

.base-button--success:hover:not(:disabled) {
  background-color: #059669;
}

.base-button--warning {
  background-color: #f59e0b;
  color: white;
}

.base-button--warning:hover:not(:disabled) {
  background-color: #d97706;
}

.base-button--danger {
  background-color: #ef4444;
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.base-button--info {
  background-color: #06b6d4;
  color: white;
}

.base-button--info:hover:not(:disabled) {
  background-color: #0891b2;
}

/* Sizes */
.base-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.base-button--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.base-button--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Loading spinner */
.loading-spinner {
  width: 1rem;
  height: 1rem;
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
