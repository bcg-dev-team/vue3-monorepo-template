<template>
  <div
    class="border-bg-outline bg-neutral-neutral000 overflow-hidden rounded-md border border-solid"
  >
    <div class="flex items-center justify-between" v-if="title">
      <div>
        <span class="leading-snug tracking-wide" :class="[titleSizeClass]">
          {{ props.title }}
        </span>
      </div>

      <div><slot name="title-right" /></div>
    </div>
    <slot name="title" />
    <div :class="!title ? 'mt-0' : 'mt-4'">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentSize } from '@template/ui';

interface MainCardContentProps {
  title?: string;
  size?: ComponentSize; // 'lg' | 'md' | 'sm'
  isLink?: boolean;
}

const props = withDefaults(defineProps<MainCardContentProps>(), {
  title: '',
  size: 'md',
  isLink: false,
});

const titleSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-lg font-medium';
    case 'md':
      return 'text-xl font-medium';
    case 'lg':
      return 'text-3xl font-semibold';
  }
});
</script>
