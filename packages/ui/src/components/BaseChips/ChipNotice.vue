<!--
  Figma 컴포넌트: Chip/Notice (node-id: 108-1955)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=108-1955&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseChip from './BaseChip.vue';

/**
 * 공지 칩 컴포넌트
 *
 * @props label - 칩 텍스트(예: 업무공지)
 */
interface Props {
  /**
   * 칩 텍스트
   * @default '업무공지'
   */
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '업무공지',
});

const chipProps = computed(() => ({
  label: props.label,
  bg: 'bg-bg-surface',
  textColor: 'text-text-footer',
  rounded: 'rounded-md',
  size: 'text-sm',
  fontWeight: 'font-normal',
  px: 'px-2',
  py: 'py-1',
}));
</script>
<template>
  <BaseChip v-bind="chipProps" />
</template>
