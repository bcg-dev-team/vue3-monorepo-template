<template>
  <div class="bg-bg-innerframe rounded-md">
    <div v-if="title">
      <span class="text-md leading-xl font-medium tracking-wide">{{ props.title }}</span>
    </div>
    <div :class="!title ? 'mt-0' : 'mt-4'">
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
