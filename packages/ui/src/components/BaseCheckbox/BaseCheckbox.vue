<!--
  Figma 컴포넌트: Input/Checkbox (node-id: 29-405)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=29-405&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import './BaseCheckbox.scss';

/**
 * BaseCheckbox - 체크박스 컴포넌트
 *
 * @props modelValue - 체크 여부 (v-model)
 * @props disabled - 비활성화 여부
 * @props indeterminate - 부분 선택 상태 (3-state checkbox)
 * @emits update:modelValue - 값 변경 시 발생
 */
interface Props {
  /**
   * 체크 여부 (v-model)
   */
  modelValue: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 부분 선택 상태 (3-state checkbox)
   * @default false
   */
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// 상태 계산
const isChecked = computed(() => props.modelValue);
const isDisabled = computed(() => props.disabled);
const isIndeterminate = computed(() => props.indeterminate);

// 체크박스 클래스 계산
const checkboxClasses = computed(() => {
  const baseClasses = [
    'relative',
    'w-6 h-6', // 24x24px (피그마 크기)
    'rounded-[3px]',
    'border-[1.5px]',
    'border-solid',
    'transition-all',
    'duration-150',
    'flex',
    'items-center',
    'justify-center',
  ];

  return baseClasses.join(' ');
});

// 체크박스 스타일 계산
const checkboxStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (isDisabled.value) {
    if (isChecked.value) {
      // Disabled + Checked
      styles.backgroundColor = 'var(--checkbox-color-background-disabled)';
      styles.borderColor = 'var(--checkbox-color-border-disabled)';
    } else {
      // Disabled + Unchecked
      styles.backgroundColor = 'var(--checkbox-color-surface-disabled)';
      styles.borderColor = 'var(--checkbox-color-border-disabled)';
    }
  } else {
    if (isChecked.value || isIndeterminate.value) {
      // Enabled + Checked/Indeterminate
      styles.backgroundColor = 'var(--checkbox-color-background-checked)';
      styles.borderColor = 'var(--checkbox-color-border-checked)';
    } else {
      // Enabled + Unchecked
      styles.backgroundColor = 'var(--checkbox-color-surface)';
      styles.borderColor = 'var(--checkbox-color-border-static)';
    }
  }

  return styles;
});

// 이벤트 핸들러
const handleClick = () => {
  if (!isDisabled.value) {
    emit('update:modelValue', !isChecked.value);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};
</script>

<template>
  <div
    class="inline-flex cursor-pointer select-none items-center"
    :class="{ 'cursor-not-allowed': isDisabled }"
    @click="handleClick"
    @keydown="handleKeydown"
    tabindex="0"
    role="checkbox"
    :aria-checked="isIndeterminate ? 'mixed' : isChecked"
    :aria-disabled="isDisabled"
  >
    <!-- 체크박스 박스 -->
    <div :class="checkboxClasses" :style="checkboxStyles">
      <!-- 체크 아이콘 (체크된 상태) -->
      <svg
        v-if="isChecked && !isIndeterminate"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M9.50071 13.3801L16.3957 6.48438L17.4571 7.54502L9.50071 15.5014L4.72705 10.7277L5.7877 9.66706L9.50071 13.3801Z"
          fill="currentColor"
        />
      </svg>

      <!-- 부분 선택 아이콘 (indeterminate 상태) -->
      <svg
        v-if="isIndeterminate"
        class="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <!-- 숨겨진 실제 input 요소 -->
    <input
      type="checkbox"
      class="sr-only"
      :checked="isChecked"
      :disabled="isDisabled"
      :indeterminate="isIndeterminate"
      @change="(e) => emit('update:modelValue', (e.target as HTMLInputElement).checked)"
    />

    <!-- 라벨 슬롯 -->
    <slot />
  </div>
</template>
