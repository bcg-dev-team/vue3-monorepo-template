<!--
  Figma 컴포넌트: Button/File-Upload (node-id: 116-2609)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=116-2609&t=agLJQOgDvtXTjTYA-4
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

/**
 * 파일 업로드 버튼 컴포넌트
 *
 * @props label - 버튼 텍스트
 * @props status - 버튼 상태 (default, hover)
 * @props disabled - 비활성화 여부
 * @props showIcon - 아이콘 표시 여부
 * @emits click - 버튼 클릭 시
 * @emits change - 파일 선택 시
 */
interface Props {
  /**
   * 버튼 텍스트
   * @default '파일선택'
   */
  label?: string;
  /**
   * 버튼 상태
   * @default 'default'
   */
  status?: 'default' | 'hover';
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: '파일선택',
  status: 'default',
  disabled: false,
  showIcon: true,
});
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'change', files: FileList | null): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const bgClass = computed(() =>
  props.disabled
    ? 'bg-[var(--button-disabled-background)]'
    : props.status === 'hover'
      ? 'bg-[var(--base-colors-common-bg-surface-default)]'
      : 'bg-gray-100'
);
const borderClass = computed(() =>
  props.disabled
    ? 'border-[var(--button-disabled-border)]'
    : 'border-[var(--background-bg-outline)]'
);
const textClass = computed(() =>
  props.disabled ? 'text-[var(--button-disabled-text)]' : 'text-[var(--input-color-text-static)]'
);

function handleClick(e: MouseEvent) {
  if (!props.disabled) {
    inputRef.value?.click();
    emit('click', e);
  }
}
function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  emit('change', files);
}
</script>
<template>
  <button
    type="button"
    :class="[
      'relative w-full flex items-center rounded-sm border transition-colors duration-150',
      bgClass,
      borderClass,
      props.disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-bg-surface',
    ]"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      type="file"
      class="sr-only"
      :disabled="props.disabled"
      @change="handleChange"
    />
    <span class="flex flex-row items-center gap-1 px-6 py-2 w-full justify-center">
      <span :class="['text-sm font-normal', textClass]">{{ label }}</span>
      <BaseIcon
        v-if="showIcon"
        name="plus"
        size="md"
        :color="props.disabled ? 'primary' : 'current'"
      />
    </span>
  </button>
</template>
