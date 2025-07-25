<!-- Figma: Table/Body-Input, Table/Body-Input-bg, Table/Body-Type2 -->
<script setup lang="ts">
import type { TextAlign } from '../../types/components';
import { computed } from 'vue';

/**
 * 테이블 셀 컴포넌트
 *
 * @props content - 셀 내용
 * @props type - 셀 타입 ('normal' | 'selected' | 'input')
 * @props align - 텍스트 정렬 ('left' | 'center' | 'right')
 * @props width - 셀 너비 (CSS width 값)
 */
interface Props {
  /** 셀 내용 */
  content?: string;
  /** 셀 타입 */
  type?: 'normal' | 'selected' | 'input';
  /** 텍스트 정렬 */
  align?: TextAlign;
  /** 셀 너비 */
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  type: 'normal',
  align: 'left',
  width: 'auto',
});

// 색상은 CSS 변수로 처리
const cellStyle = computed(() => {
  const bgColor =
    props.type === 'selected' ? 'var(--table-type1-body-bg-select)' : 'var(--table-type1-body-bg)';

  const borderColor = 'var(--table-type1-body-border)';

  return {
    backgroundColor: bgColor,
    borderColor: borderColor,
    width: props.width,
  };
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const containerClasses = computed(() => {
  return 'relative w-full h-full';
});

const borderClasses = computed(() => {
  const baseClasses = 'absolute inset-0 pointer-events-none border-solid';
  const borderClasses = props.type === 'input' ? 'border-b' : 'border-x';
  return `${baseClasses} ${borderClasses}`;
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
  const paddingClasses = props.type === 'input' ? 'px-[15px] py-2' : 'px-[15px] py-3';
  return `${baseClasses} ${paddingClasses}`;
});

const textClasses = computed(() => {
  const baseClasses =
    'font-regular leading-[0] not-italic relative shrink-0 text-left text-nowrap tracking-wide text-input-color-text-static';
  const fontClasses = props.type === 'input' ? 'text-base leading-tight' : 'text-sm leading-snug';
  return `${baseClasses} ${fontClasses}`;
});
</script>

<template>
  <div :class="containerClasses" :style="cellStyle" data-name="Table/Cell">
    <div :class="borderClasses" />
    <div :class="contentClasses">
      <div :class="paddingClasses">
        <div :class="textClasses">
          <span class="block whitespace-pre">{{ content }}</span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
