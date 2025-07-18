<!--
  Figma 컴포넌트: Chip/Position (node-id: 1028-8538)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1028-8538&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseChip from './BaseChip.vue';

/**
 * 포지션(LONG/SHORT) 칩 컴포넌트
 *
 * @props status - 칩 상태 ('LONG' | 'SHORT')
 */
interface Props {
  /**
   * 칩 상태
   * @default 'LONG'
   */
  status?: 'LONG' | 'SHORT';
}
const props = withDefaults(defineProps<Props>(), {
  status: 'LONG',
});

const chipProps = computed(() => {
  if (props.status === 'SHORT') {
    return {
      label: 'SHORT',
      bg: 'bg-trade-short-bg',
      textColor: 'text-trade-short-text',
      rounded: 'rounded-[3px]',
      size: 'text-xs',
      fontWeight: 'font-medium',
      px: 'px-2.5',
      py: 'py-0.5',
    };
  }
  return {
    label: 'LONG',
    bg: 'bg-trade-long-bg',
    textColor: 'text-trade-long-text',
    rounded: 'rounded-[3px]',
    size: 'text-xs',
    fontWeight: 'font-medium',
    px: 'px-2.5',
    py: 'py-0.5',
  };
});
</script>
<template>
  <BaseChip v-bind="chipProps" />
</template>
