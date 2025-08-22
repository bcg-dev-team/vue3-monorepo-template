<template>
  <BaseTwoWaySplitPane
    direction="vertical"
    :min-sizes="minSizes"
    :max-sizes="maxSizes"
    v-bind="$attrs"
  >
    <template #first>
      <slot name="top" />
    </template>
    <template #second>
      <slot name="bottom" />
    </template>
  </BaseTwoWaySplitPane>
</template>

<script setup lang="ts">
import BaseTwoWaySplitPane from '../BaseTwoWaySplitPane/BaseTwoWaySplitPane.vue';

// BaseTwoWaySplitPane의 props를 상속받음
interface Props {
  minSizes?: { first: number; second: number };
  maxSizes?: { first: number; second: number };
}

defineProps<Props>();
</script>
