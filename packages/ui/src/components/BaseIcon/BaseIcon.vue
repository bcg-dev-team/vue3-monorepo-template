<!-- packages/ui/src/components/BaseIcon/BaseIcon.vue -->
<!--
  BaseIcon 컴포넌트
  vite-svg-loader를 활용하여 SVG 아이콘을 Vue 컴포넌트로 렌더링합니다.
  
  Figma 컴포넌트: Icon (아이콘 컴포넌트)
-->
<script setup lang="ts">
import type { IconName } from '../../types/icons';
import { getIconComponent } from './iconRegistry';
import { getIconType } from '../../types/icons';
import { computed } from 'vue';

interface Props {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'currentColor',
});

// 아이콘 컴포넌트 가져오기 (정적 방식)
const iconComponent = computed(() => {
  const component = getIconComponent(props.name);
  if (!component && import.meta.env.DEV) {
    console.warn(`Icon "${props.name}" not found. Please check the icon name.`);
  }
  return component;
});

const iconClasses = computed(() => {
  const baseClasses = ['inline-block'];

  if (typeof props.size === 'string') {
    const sizeMap = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };
    baseClasses.push(sizeMap[props.size]);
  }

  if (props.class) {
    baseClasses.push(props.class);
  }

  return baseClasses;
});

const iconStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (typeof props.size === 'number') {
    styles.width = `${props.size}px`;
    styles.height = `${props.size}px`;
  }

  // 아이콘 타입에 따라 fill/stroke 적용
  const iconType = getIconType(props.name);
  const color = props.color || 'currentColor';

  if (iconType === 'fill') {
    styles.fill = color;
    styles.stroke = 'none';
  } else if (iconType === 'stroke') {
    styles.stroke = color;
    styles.fill = 'none';
  }

  return styles;
});
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="iconClasses"
    :style="iconStyles"
    aria-hidden="true"
  />
  <div
    v-else
    class="inline-block bg-gray-200 animate-pulse"
    :style="{ width: '24px', height: '24px' }"
  />
</template>
