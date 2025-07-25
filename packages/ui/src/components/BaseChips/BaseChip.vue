<!--
  Figma 공통 칩 최소 단위 컴포넌트
-->
<script setup lang="ts">
import { computed } from 'vue';

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
  variant?: 'surface' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * 칩 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
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

// 색상/테마는 CSS 변수 + Tailwind arbitrary value로 처리
const chipStyle = computed(() => {
  const variantStyles = {
    surface: {
      backgroundColor: 'var(--bg-surface)',
      color: 'var(--text-secondary)',
    },
    primary: {
      backgroundColor: 'var(--button-primary-background)',
      color: 'var(--button-primary-text)',
    },
    secondary: {
      backgroundColor: 'var(--bg-surface-muted)',
      color: 'var(--text-primary)',
    },
    success: {
      backgroundColor: 'var(--trade-correct-bg)',
      color: 'var(--trade-correct-text)',
    },
    warning: {
      backgroundColor: 'var(--warning)',
      color: 'var(--white)',
    },
    error: {
      backgroundColor: 'var(--error)',
      color: 'var(--white)',
    },
  };

  return variantStyles[props.variant];
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const chipClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return [
    'inline-flex items-center justify-center transition-colors duration-150',
    sizeClasses[props.size],
    props.rounded,
    props.fontWeight,
  ].join(' ');
});
</script>

<template>
  <span :class="chipClasses" :style="chipStyle">
    <slot>{{ label }}</slot>
  </span>
</template>
