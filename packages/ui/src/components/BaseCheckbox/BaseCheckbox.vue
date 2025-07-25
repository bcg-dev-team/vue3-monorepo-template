<!--
  Figma 컴포넌트: Input/Checkbox (node-id: 29-405)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=29-405&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 체크박스 컴포넌트
 *
 * @props modelValue - 체크 여부 (v-model)
 * @props state - 체크 상태 (On, Off)
 * @props style - 스타일 (Default, Disabled)
 * @emits update:modelValue - 값 변경 시 발생
 */
interface Props {
  /**
   * 체크 여부 (v-model)
   */
  modelValue: boolean;
  /**
   * 체크 상태
   *
   * On: 체크됨, Off: 체크 안됨
   * @default 'Off'
   */
  state?: 'On' | 'Off';
  /**
   * 스타일
   *
   * Default: 기본, Disabled: 비활성화
   * @default 'Default'
   */
  style?: 'Default' | 'Disabled';
}

const props = withDefaults(defineProps<Props>(), {
  state: 'Off',
  style: 'Default',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isChecked = computed(() => props.state === 'On' || props.modelValue);
const isDisabled = computed(() => props.style === 'Disabled');

// 색상/테마는 CSS 변수로 처리
const checkboxStyle = computed(() => {
  let backgroundColor: string;
  let borderColor: string;

  if (isDisabled.value && isChecked.value) {
    backgroundColor = 'var(--input-color-text-disable)';
  } else if (isDisabled.value && !isChecked.value) {
    backgroundColor = 'var(--input-color-bg-disabled)';
  } else if (!isDisabled.value && isChecked.value) {
    backgroundColor = 'var(--button-primary-background)';
  } else {
    backgroundColor = 'var(--input-color-surface)';
  }

  if (isDisabled.value) {
    borderColor = 'var(--input-color-border-disabled)';
  } else if (isChecked.value) {
    borderColor = 'var(--button-primary-background)';
  } else {
    borderColor = 'var(--input-color-border-static)';
  }

  return { backgroundColor, borderColor };
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const checkboxClasses = computed(() => {
  const classes = [
    'relative flex items-center justify-center w-5 h-5 rounded-[3px] border transition-colors duration-150',
  ];

  if (isDisabled.value) {
    classes.push('cursor-not-allowed opacity-60');
  }

  return classes.join(' ');
});
</script>

<template>
  <label class="inline-flex items-center cursor-pointer select-none">
    <span
      :class="checkboxClasses"
      :style="checkboxStyle"
      @click.stop.prevent="!isDisabled && emit('update:modelValue', !isChecked)"
    >
      <svg v-if="isChecked" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
        <path
          d="M9.5 13.38l6.9-6.9 1.06 1.06-7.96 7.96-4.77-4.77 1.06-1.06 3.71 3.71z"
          fill="currentColor"
        />
      </svg>
    </span>
    <input
      type="checkbox"
      class="sr-only"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="(e) => emit('update:modelValue', (e.target as HTMLInputElement).checked)"
    />
    <slot />
  </label>
</template>
