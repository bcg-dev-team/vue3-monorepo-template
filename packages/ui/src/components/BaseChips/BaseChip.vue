<!--
  Figma 공통 칩 최소 단위 컴포넌트
-->
<script setup lang="ts">
import type { ChipVariant, ComponentSize } from '../../types/components';
import { computed } from 'vue';
import './BaseChip.scss';

/**
 * 칩(Chip) 최소 단위 컴포넌트
 *
 * @props label - 칩 텍스트
 * @props variant - 칩 스타일 변형 (surface, primary, secondary 등)
 * @props size - 칩 크기 (sm, md, lg)
 * @props rounded - border-radius 클래스 (Tailwind 토큰)
 * @props fontWeight - 폰트 굵기 (font-normal, font-medium 등)
 * @slot 기본 슬롯(텍스트 대신 커스텀)
 */
interface Props {
  /**
   * 칩 텍스트
   */
  label?: string;
  /**
   * 칩 스타일 변형
   * @default 'surface'
   */
  variant?: ChipVariant;
  /**
   * 칩 크기
   * @default 'md'
   */
  size?: ComponentSize;
  /**
   * border-radius 클래스
   * @default 'rounded-sm'
   */
  rounded?: string;
  /**
   * 폰트 굵기
   * @default 'font-normal'
   */
  fontWeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'surface',
  size: 'md',
  rounded: 'rounded-sm',
  fontWeight: 'font-normal',
});

// Size별 클래스 매핑
const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

// Variant별 클래스 매핑 (컴포넌트별 토큰)
const variantClasses = {
  surface: 'chip-surface',
  primary: 'chip-primary',
  secondary: 'chip-secondary',
  success: 'chip-success',
  warning: 'chip-warning',
  error: 'chip-error',
};

// Font weight별 클래스 매핑
const fontWeightClasses: Record<string, string> = {
  'font-normal': 'font-normal',
  'font-medium': 'font-medium',
  'font-semibold': 'font-semibold',
  'font-bold': 'font-bold',
};

// Rounded별 클래스 매핑
const roundedClasses: Record<string, string> = {
  'rounded-sm': 'rounded-sm',
  'rounded-md': 'rounded-md',
  'rounded-lg': 'rounded-lg',
  'rounded-full': 'rounded-full',
};

// 정적 클래스 (기본 스타일)
const chipClasses = computed(() => {
  const classes = [
    // 1. 레이아웃
    'inline-flex items-center justify-center',

    // 2. 전환 효과
    'transition-all duration-150',

    // 3. 크기별 클래스 (패딩 + 타이포그래피)
    sizeClasses[props.size] || 'text-sm px-2.5 py-1',

    // 4. 폰트 굵기
    fontWeightClasses[props.fontWeight] || 'font-normal',

    // 5. 테두리
    roundedClasses[props.rounded] || 'rounded-sm',

    // 6. 컴포넌트별 토큰 (배경색, 텍스트색 등)
    variantClasses[props.variant] || 'chip-surface',
  ];

  return classes.join(' ');
});
</script>

<template>
  <span :class="chipClasses">
    <slot>{{ label }}</slot>
  </span>
</template>
