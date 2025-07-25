<!--
  Figma 공통 칩 최소 단위 컴포넌트
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { ChipVariant, ComponentSize } from '../../types/components';

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

// 정적 색상은 Tailwind arbitrary value로 처리 (성능 최적화)
const chipClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const variantStyles = {
    surface: 'bg-[var(--bg-surface)] text-[var(--text-secondary)]',
    primary: 'bg-[var(--button-primary-background)] text-[var(--button-primary-text)]',
    secondary: 'bg-[var(--bg-surface-muted)] text-[var(--text-primary)]',
    success: 'bg-[var(--trade-correct-bg)] text-[var(--trade-correct-text)]',
    warning: 'bg-[var(--warning)] text-[var(--white)]',
    error: 'bg-[var(--error)] text-[var(--white)]',
  };

  return [
    'inline-flex items-center justify-center transition-colors duration-150',
    sizeClasses[props.size],
    variantStyles[props.variant],
    props.rounded,
    props.fontWeight,
  ].join(' ');
});
</script>

<template>
  <span :class="chipClasses">
    <slot>{{ label }}</slot>
  </span>
</template>
