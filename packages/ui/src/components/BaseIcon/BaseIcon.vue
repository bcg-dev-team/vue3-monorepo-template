<script setup lang="ts">
/**
 * BaseIcon - Figma 아이콘 컴포넌트 1:1 구현
 * @props name - 아이콘 이름
 * @props size - 아이콘 크기 (sm, md, lg, xl)
 * @props color - 아이콘 색상 (current, primary, error)
 * @props disabled - 비활성화 여부
 * @emits click - 클릭 이벤트
 * @figma Icon (node-id: 32-245)
 */
import { computed } from 'vue';
import * as Icons from './icons';

interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'current' | 'primary' | 'error';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'current',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4';
    case 'md':
      return 'w-5 h-5';
    case 'lg':
      return 'w-6 h-6';
    case 'xl':
      return 'w-8 h-8';
    default:
      return 'w-5 h-5';
  }
});

const colorClass = computed(() => {
  if (props.disabled) return 'text-disabled';
  switch (props.color) {
    case 'primary':
      return 'text-primary800';
    case 'error':
      return 'text-red800';
    case 'current':
    default:
      return 'text-current';
  }
});

const iconComponent = computed(() => {
  const iconName = `${props.name.charAt(0).toUpperCase() + props.name.slice(1)}Icon`;
  return (Icons as Record<string, any>)[iconName] || null;
});
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="[sizeClass, colorClass, 'transition-colors duration-200']"
    @click="emit('click', $event)"
  />
  <span v-else class="text-red-500">Icon not found: {{ name }}</span>
</template>
