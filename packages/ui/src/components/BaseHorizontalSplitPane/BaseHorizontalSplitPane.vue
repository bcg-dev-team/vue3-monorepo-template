<template>
  <ThreeWaySplitPane direction="horizontal" v-bind="$attrs">
    <template #left>
      <slot name="left" />
    </template>
    <template #center>
      <slot name="center" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </ThreeWaySplitPane>
</template>

<script setup lang="ts">
import ThreeWaySplitPane from '../BaseThreeWaySplitPane/BaseThreeWaySplitPane.vue';

// BaseThreeWaySplitPane의 props를 상속받음
interface Props {
  minSizes?: { left: number; right: number };
  maxSizes?: { left: number; right: number };
  breakpoint?: number;
}

defineProps<Props>();
</script>
