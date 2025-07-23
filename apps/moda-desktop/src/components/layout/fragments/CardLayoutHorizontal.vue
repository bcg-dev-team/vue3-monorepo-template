<template>
  <div class="grid grid-flow-col" :class="`gap-${props.gap} grid-cols-${props.rowNumber}`">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  gap?: number;
  rowNumber?: number;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 4,
  rowNumber: 1,
});
</script>
