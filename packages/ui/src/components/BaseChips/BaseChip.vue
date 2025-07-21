<!--
  Figma 공통 칩 최소 단위 컴포넌트
-->
<script setup lang="ts">
/**
 * 칩(Chip) 최소 단위 컴포넌트
 *
 * @props label - 칩 텍스트
 * @props bg - 배경색 클래스 (Tailwind 토큰)
 * @props textColor - 텍스트색 클래스 (Tailwind 토큰)
 * @props rounded - border-radius 클래스 (Tailwind 토큰)
 * @props size - 텍스트 크기 (text-xs, text-sm 등)
 * @props fontWeight - 폰트 굵기 (font-normal, font-medium 등)
 * @props px - 좌우 패딩(px-2 등)
 * @props py - 상하 패딩(py-1 등)
 * @slot 기본 슬롯(텍스트 대신 커스텀)
 */
interface Props {
  /**
   * 칩 텍스트
   */
  label?: string;
  /**
   * 배경색 클래스
   * @default 'bg-bg-surface'
   */
  bg?: string;
  /**
   * 텍스트색 클래스
   * @default 'text-text-secondary'
   */
  textColor?: string;
  /**
   * border-radius 클래스
   * @default 'rounded-sm'
   */
  rounded?: string;
  /**
   * 텍스트 크기
   * @default 'text-xs'
   */
  size?: string;
  /**
   * 폰트 굵기
   * @default 'font-normal'
   */
  fontWeight?: string;
  /**
   * 좌우 패딩
   * @default 'px-2'
   */
  px?: string;
  /**
   * 상하 패딩
   * @default 'py-0.5'
   */
  py?: string;
}
withDefaults(defineProps<Props>(), {
  bg: 'bg-bg-surface',
  textColor: 'text-text-secondary',
  rounded: 'rounded-sm',
  size: 'text-xs',
  fontWeight: 'font-normal',
  px: 'px-2',
  py: 'py-0.5',
});
</script>
<template>
  <span
    :class="[
      bg,
      textColor,
      rounded,
      size,
      fontWeight,
      px,
      py,
      'inline-flex items-center justify-center',
    ]"
  >
    <slot>{{ label }}</slot>
  </span>
</template>
