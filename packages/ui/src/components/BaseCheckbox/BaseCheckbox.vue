<!--
  Figma 컴포넌트: Input/Checkbox (node-id: 29-405)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=29-405&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import './BaseCheckbox.scss';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

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

// 체크박스 스타일 계산
const checkboxStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (isDisabled.value) {
    if (isChecked.value) {
      // Disabled + Checked
      styles.backgroundColor = 'var(--base-colors-neutral-neutral400)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
    } else {
      // Disabled + Unchecked
      styles.backgroundColor = 'var(--base-colors-neutral-neutral300)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
    }
  } else {
    if (isChecked.value || isIndeterminate.value) {
      // Enabled + Checked/Indeterminate
      styles.backgroundColor = 'var(--base-colors-primary-primary800)';
      styles.borderColor = 'var(--base-colors-primary-primary800)';
    } else {
      // Enabled + Unchecked
      styles.backgroundColor = 'var(--base-colors-neutral-neutral000)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
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
    <div class="flex items-center justify-center w-[22px] h-[22px] p-[1.83px]">
      <!-- 체크박스 박스 -->
      <div class="w-full h-full rounded-[3px] border-[1.5px] border flex items-center justify-center" :style="checkboxStyles">
        <!-- 체크 아이콘 (체크된 상태) -->
        <BaseIcon
          v-if="isChecked && !isIndeterminate"
          name="check-sm"
          color="var(--base-colors-neutral-neutral000)"
        />

        <!-- 부분 선택 아이콘 (indeterminate 상태) -->
        <BaseIcon
          v-if="isIndeterminate"
          name="minus"
          color="var(--base-colors-neutral-neutral000)"
        />
      </div>
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
