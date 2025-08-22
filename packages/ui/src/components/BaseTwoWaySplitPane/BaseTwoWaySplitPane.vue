<template>
  <Splitpanes
    class="split-pane"
    :horizontal="direction === 'vertical'"
    :vertical="direction === 'horizontal'"
    :push-other-panes="pushOtherPanes"
    @resized="emit('resize')"
  >
    <!-- First Pane -->
    <Pane :min-size="minSizes.first" :max-size="maxSizes.first" :size="sizes.first">
      <slot name="first" />
    </Pane>

    <!-- Second Pane -->
    <Pane :min-size="minSizes.second" :max-size="maxSizes.second" :size="sizes.second">
      <slot name="second" />
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { ref } from 'vue';

interface MinSizes {
  first: number;
  second: number;
}

interface MaxSizes {
  first: number;
  second: number;
}

interface Props {
  direction?: 'horizontal' | 'vertical';
  minSizes?: MinSizes;
  maxSizes?: MaxSizes;
  pushOtherPanes?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  minSizes: () => ({ first: 20, second: 20 }),
  maxSizes: () => ({ first: 80, second: 80 }),
  pushOtherPanes: false,
});

const emit = defineEmits<{
  resize: [];
}>();

// 슬롯 타입 정의
defineSlots<{
  first: () => any;
  second: () => any;
}>();

const sizes = ref({ first: 30, second: 70 });
</script>

<style scoped>
/* 컴포넌트별 스타일은 여기에 */
</style>

<style lang="scss">
@use './BaseTwoWaySplitPane.scss';
</style>
