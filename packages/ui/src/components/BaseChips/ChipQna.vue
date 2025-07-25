<!--
  Figma 컴포넌트: Chip/qna (node-id: 116-2845)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=116-2845&m=dev
-->
<script setup lang="ts">
import BaseChip from './BaseChip.vue';
import { computed } from 'vue';

/**
 * QnA 상태 칩 컴포넌트
 *
 * @props status - 칩 상태 ('답변대기' | '답변완료')
 */
interface Props {
  /**
   * 칩 상태
   * @default '답변대기'
   */
  status?: '답변대기' | '답변완료';
}

const props = withDefaults(defineProps<Props>(), {
  status: '답변대기',
});

const chipProps = computed(() => {
  if (props.status === '답변완료') {
    return {
      label: '답변완료',
      variant: 'error' as const,
      size: 'sm' as const,
      rounded: 'rounded-[3px]',
      fontWeight: 'font-normal',
    };
  }
  return {
    label: '답변대기',
    variant: 'surface' as const,
    size: 'sm' as const,
    rounded: 'rounded-[3px]',
    fontWeight: 'font-normal',
  };
});
</script>

<template>
  <BaseChip v-bind="chipProps" />
</template>
