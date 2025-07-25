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

// 행 클래스
const rowClasses = computed(() => {
  const baseClasses = 'w-full';

  if (props.selected) {
    return `${baseClasses} table-row-selected`;
  }

  if (props.hover && !props.isHeader) {
    return `${baseClasses} table-row-hover`;
  }

  return baseClasses;
});
</script>

<template>
  <div :class="rowClasses" data-name="Table/Row">
    <slot />
  </div>
</template>
