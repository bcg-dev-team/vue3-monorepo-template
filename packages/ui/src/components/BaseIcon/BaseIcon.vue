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

// 크기별 클래스 매핑 (컴포넌트별 토큰)
const sizeClasses = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
  xl: 'icon-xl',
};

// 아이콘 타입별 클래스 매핑 (컴포넌트별 토큰)
const typeClasses = {
  fill: 'icon-fill',
  stroke: 'icon-stroke',
};

const iconClasses = computed(() => {
  const classes = [
    // 1. 레이아웃
    'inline-block',
  ];

  if (typeof props.size === 'string') {
    classes.push(sizeClasses[props.size]);
  }

  // 아이콘 타입에 따른 클래스 추가
  const iconType = getIconType(props.name);
  if (iconType) {
    classes.push(typeClasses[iconType]);
  }

  if (props.class) {
    classes.push(props.class);
  }

  return classes.join(' ');
});

const iconStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (typeof props.size === 'number') {
    styles.width = `${props.size}px`;
    styles.height = `${props.size}px`;
  }

  // 색상 적용
  const color = props.color || 'currentColor';
  const iconType = getIconType(props.name);

  if (iconType === 'fill') {
    styles.fill = color;
  } else if (iconType === 'stroke') {
    styles.stroke = color;
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
  <div v-else class="icon-loading" :style="{ width: '24px', height: '24px' }" />
</template>
