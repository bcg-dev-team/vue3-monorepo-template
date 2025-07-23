<template>
  <div class="grid grid-flow-row auto-rows-min" :class="`gap-${props.gap}`">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  gap?: number;
  rowNumber?: number;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 6,
  colNumber: 1,
});
</script>
