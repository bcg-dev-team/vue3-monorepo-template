<template>
  <div class="p-6 bg-bg-innerframe rounded-md">
    <div v-if="title">
      <span class="text-md font-medium leading-xl tracking-wide">{{ props.title }}</span>
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
