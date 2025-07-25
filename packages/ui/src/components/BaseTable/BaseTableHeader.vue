<!-- Figma: Table/Header, Table/Header-Type2 -->
<script setup lang="ts">
import type { TextAlign } from '../../types/components';
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
  align?: TextAlign;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'type1',
  align: 'left',
});

// 타입별 클래스 매핑 (컴포넌트별 토큰)
const typeClasses = {
  type1: 'table-header-type1',
  type2: 'table-header-type2',
};

// 정렬별 클래스 매핑
const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// 컨테이너 클래스
const containerClasses = computed(() => {
  const baseClasses = 'relative w-full h-full';
  const typeClass = typeClasses[props.type];

  return `${baseClasses} ${typeClass}`;
});

// 테두리 클래스
const borderClasses = computed(() => {
  const baseClasses = 'absolute border-b border-solid inset-0 pointer-events-none';
  const typeClass = `table-header-border-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 컨텐츠 클래스
const contentClasses = computed(() => {
  const baseClasses = 'flex flex-row items-center relative w-full h-full';
  const alignClass = alignClasses[props.align];

  return `${baseClasses} ${alignClass}`;
});

// 패딩 클래스
const paddingClasses = computed(() => {
  const baseClasses =
    'box-border content-stretch flex flex-row gap-2.5 items-center justify-start relative w-full h-full';
  const typeClass = `table-header-padding-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 텍스트 클래스
const textClasses = computed(() => {
  const baseClasses =
    'flex flex-col font-medium justify-center leading-none font-normal relative flex-shrink-0 text-sm text-left whitespace-nowrap tracking-1';
  const typeClass = `table-header-text-${props.type}`;

  return `${baseClasses} ${typeClass}`;
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
