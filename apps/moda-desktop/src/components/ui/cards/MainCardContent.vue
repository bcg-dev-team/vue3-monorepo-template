<template>
  <div class="bg-bg-default border-bg-outline overflow-hidden rounded-md border border-solid">
    <div class="flex items-center justify-between" v-if="title">
      <div>
        <span class="leading-snug tracking-wide" :class="[titleSizeClass]">
          {{ props.title }}
        </span>
      </div>
      <div><slot name="title-right" /></div>
    </div>
    <div :class="!title ? 'mt-0' : 'mt-4'">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface MainCardContentProps {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  isLink?: boolean;
}

const props = withDefaults(defineProps<MainCardContentProps>(), {
  title: '',
  size: 'medium',
  isLink: false,
});

const titleSizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-lg font-medium';
    case 'medium':
      return 'text-xl font-medium';
    case 'large':
      return 'text-3xl font-semibold';
  }
});
</script>
