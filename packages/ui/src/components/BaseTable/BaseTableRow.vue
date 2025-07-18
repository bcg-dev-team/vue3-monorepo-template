<!-- Figma: Table Row -->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 테이블 행 컴포넌트
 *
 * @props isHeader - 헤더 행 여부
 * @props selected - 선택된 행 여부
 * @props hover - 호버 효과 여부
 */
interface Props {
  /** 헤더 행 여부 */
  isHeader?: boolean;
  /** 선택된 행 여부 */
  selected?: boolean;
  /** 호버 효과 여부 */
  hover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isHeader: false,
  selected: false,
  hover: true,
});

const rowClasses = computed(() => {
  const baseClasses = 'flex w-full';
  const hoverClasses =
    props.hover && !props.isHeader ? 'hover:bg-gray-50 transition-colors duration-200' : '';
  return `${baseClasses} ${hoverClasses}`;
});
</script>

<template>
  <div :class="rowClasses" data-name="Table/Row">
    <slot />
  </div>
</template>
