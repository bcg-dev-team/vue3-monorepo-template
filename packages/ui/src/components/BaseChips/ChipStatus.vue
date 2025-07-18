<!--
  Figma 컴포넌트: Chip/Status (node-id: 1346-18267)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1346-18267&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseChip from './BaseChip.vue';

/**
 * 상태(Done/Pending) 칩 컴포넌트
 *
 * @props status - 칩 상태 ('Done' | 'Pending')
 */
interface Props {
  /**
   * 칩 상태
   * @default 'Done'
   */
  status?: 'Done' | 'Pending';
}
const props = withDefaults(defineProps<Props>(), {
  status: 'Done',
});

const chipProps = computed(() => {
  if (props.status === 'Pending') {
    return {
      label: '대기중',
      bg: 'bg-warning',
      textColor: 'text-white',
      rounded: 'rounded-[3px]',
      size: 'text-xs',
      fontWeight: 'font-medium',
      px: 'px-2.5',
      py: 'py-0.5',
    };
  }
  return {
    label: '완료',
    bg: 'bg-trade-correct-bg',
    textColor: 'text-trade-correct-text',
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
