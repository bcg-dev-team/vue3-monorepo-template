<template>
  <div class="p-6 bg-bg-surface rounded-md border-bg-outline border border-solid">
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
