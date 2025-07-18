<!-- Figma: Table/Header, Table/Header-Type2 -->
<script setup lang="ts">
import { computed } from 'vue';

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
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'type1',
  align: 'left',
});

const containerClasses = computed(() => {
  const baseClasses = 'relative w-full h-full';
  const bgClasses =
    props.type === 'type1' ? 'bg-table-type1-header-bg' : 'bg-table-type2-header-bg';
  return `${baseClasses} ${bgClasses}`;
});

const borderClasses = computed(() => {
  const baseClasses = 'absolute inset-0 pointer-events-none';
  const borderClasses =
    props.type === 'type1'
      ? 'border-table-type1-header-underline border-[0px_0px_2px] border-solid'
      : 'border-table-type2-header-underline border-[0px_0px_1px] border-solid';
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
  <div :class="containerClasses" data-name="Table/Header">
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
