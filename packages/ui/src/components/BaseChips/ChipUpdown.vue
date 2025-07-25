<!--
  Figma 컴포넌트: Chip/Updown (node-id: 1028-8543)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1028-8543&m=dev
-->
<script setup lang="ts">
import BaseChip from './BaseChip.vue';
import { computed } from 'vue';

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
      variant: 'error' as const, // trade-short 스타일을 error variant로 매핑
      size: 'sm' as const,
      rounded: 'rounded-[3px]',
      fontWeight: 'font-medium',
    };
  }
  return {
    label: props.value,
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
