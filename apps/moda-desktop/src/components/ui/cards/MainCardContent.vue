<template>
  <div class="bg-bg-surface border-bg-outline rounded-md border border-solid p-6">
    <div v-if="title">
      <span class="text-3xl font-semibold leading-snug tracking-wide">{{ props.title }}</span>
    </div>
    <div class="mt-4">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface MainCardContentProps {
  title?: string;
}

const props = withDefaults(defineProps<MainCardContentProps>(), {
  title: '',
});
</script>
