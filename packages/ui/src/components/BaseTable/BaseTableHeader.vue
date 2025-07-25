<!-- Figma: Table/Header, Table/Header-Type2 -->
<script setup lang="ts">
import { computed } from 'vue';
import type { TextAlign } from '../../types/components';

/**
 * 테이블 헤더 컴포넌트
 *
 * @props title - 헤더 제목
 * @props type - 헤더 타입 ('type1' | 'type2')
 * @props align - 텍스트 정렬 ('left' | 'center' | 'right')
 */
interface Props {
  /** 헤더 제목 */
  title: string;
  /** 헤더 타입 */
  type?: 'type1' | 'type2';
  /** 텍스트 정렬 */
  align?: TextAlign;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'type1',
  align: 'left',
});

// 색상은 CSS 변수로 처리
const headerStyle = computed(() => {
  const bgColor =
    props.type === 'type1' ? 'var(--table-type1-header-bg)' : 'var(--table-type2-header-bg)';

  const borderColor =
    props.type === 'type1'
      ? 'var(--table-type1-header-underline)'
      : 'var(--table-type2-header-underline)';

  return {
    backgroundColor: bgColor,
    borderBottomColor: borderColor,
  };
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const containerClasses = computed(() => {
  return 'relative w-full h-full';
});

const borderClasses = computed(() => {
  const baseClasses = 'absolute inset-0 pointer-events-none border-b border-solid';
  const borderWidth = props.type === 'type1' ? 'border-b-2' : 'border-b';
  return `${baseClasses} ${borderWidth}`;
});

const contentClasses = computed(() => {
  const baseClasses = 'flex flex-row items-center relative size-full';
  const justifyClasses =
    props.align === 'center'
      ? 'justify-center'
      : props.align === 'right'
        ? 'justify-end'
        : 'justify-start';
  return `${baseClasses} ${justifyClasses}`;
});

const paddingClasses = computed(() => {
  const baseClasses =
    'box-border content-stretch flex flex-row gap-2.5 items-center relative size-full';
  const paddingClasses = props.type === 'type1' ? 'px-2.5 py-2' : 'px-[15px] py-3';
  return `${baseClasses} ${paddingClasses}`;
});

const textClasses = computed(() => {
  const baseClasses =
    'flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-input-color-text-static text-left text-nowrap';
  const fontClasses =
    props.type === 'type1'
      ? 'font-medium text-xs leading-tight'
      : 'font-medium text-sm leading-snug tracking-wide';
  return `${baseClasses} ${fontClasses}`;
});
</script>

<template>
  <div :class="containerClasses" :style="headerStyle" data-name="Table/Header">
    <div :class="borderClasses" />
    <div :class="contentClasses">
      <div :class="paddingClasses">
        <div :class="textClasses">
          <span class="block whitespace-pre">{{ title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
