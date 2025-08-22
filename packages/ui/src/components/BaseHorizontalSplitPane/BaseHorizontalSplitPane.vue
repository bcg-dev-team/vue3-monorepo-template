<template>
  <BaseTwoWaySplitPane
    direction="horizontal"
    :min-sizes="{ first: minSizes?.left || 300, second: 60 }"
    :max-sizes="{ first: maxSizes?.left || 500, second: 80 }"
    :push-other-panes="false"
    v-bind="$attrs"
  >
    <template #first>
      <slot name="left" />
    </template>
    <template #second>
      <BaseTwoWaySplitPane
        direction="horizontal"
        :min-sizes="{ first: 20, second: minSizes?.right || 300 }"
        :max-sizes="{ first: 80, second: maxSizes?.right || 500 }"
        :push-other-panes="false"
      >
        <template #first>
          <slot name="center" />
        </template>
        <template #second>
          <slot name="right" />
        </template>
      </BaseTwoWaySplitPane>
    </template>
  </BaseTwoWaySplitPane>
</template>

<script setup lang="ts">
import BaseTwoWaySplitPane from '../BaseTwoWaySplitPane/BaseTwoWaySplitPane.vue';

// BaseHorizontalSplitPane의 props를 상속받음
interface Props {
  minSizes?: { left: number; right: number };
  maxSizes?: { left: number; right: number };
  breakpoint?: number;
}

defineProps<Props>();
</script>
