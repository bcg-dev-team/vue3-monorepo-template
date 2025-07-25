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
      variant: 'error' as const, // trade-short 스타일을 error variant로 매핑
      size: 'sm' as const,
      rounded: 'rounded-[3px]',
      fontWeight: 'font-medium',
    };
  }
  return {
    label: 'LONG',
    variant: 'success' as const, // trade-long 스타일을 success variant로 매핑
    size: 'sm' as const,
    rounded: 'rounded-[3px]',
    fontWeight: 'font-medium',
  };
});
</script>

<template>
  <BaseChip v-bind="chipProps" />
</template>
