<!--
  Figma 컴포넌트: Chip/Updown (node-id: 1028-8543)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1028-8543&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseChip from './BaseChip.vue';

/**
 * Up/Down 상태 칩 컴포넌트
 *
 * @props status - 칩 상태 ('Up' | 'Down')
 * @props value - 표시할 값 (예: +0.03%, -1.15%)
 */
interface Props {
  /**
   * 칩 상태
   * @default 'Up'
   */
  status?: 'Up' | 'Down';
  /**
   * 표시할 값
   */
  value: string;
}
const props = withDefaults(defineProps<Props>(), {
  status: 'Up',
});

const chipProps = computed(() => {
  if (props.status === 'Down') {
    return {
      label: props.value,
      bg: 'bg-trade-short-bg',
      textColor: 'text-trade-short-text',
      rounded: 'rounded-[3px]',
      size: 'text-[11px]',
      fontWeight: 'font-medium',
      px: 'px-1',
      py: 'py-0.5',
    };
  }
  return {
    label: props.value,
    bg: 'bg-trade-long-bg',
    textColor: 'text-trade-long-text',
    rounded: 'rounded-[3px]',
    size: 'text-[11px]',
    fontWeight: 'font-medium',
    px: 'px-1',
    py: 'py-0.5',
  };
});
</script>
<template>
  <BaseChip v-bind="chipProps" />
</template>
