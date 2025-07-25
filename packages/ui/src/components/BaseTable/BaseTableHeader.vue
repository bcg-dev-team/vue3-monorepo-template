<!-- Figma: Table/Header, Table/Header-Type2 -->
<script setup lang="ts">
import type { TextAlign } from '../../types/components';
import './BaseTableHeader.scss';
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
  const baseClasses = [
    // 1. 레이아웃
    'relative w-full h-full',
  ].join(' ');
  const typeClass = typeClasses[props.type];

  return `${baseClasses} ${typeClass}`;
});

// 테두리 클래스
const borderClasses = computed(() => {
  const baseClasses = [
    // 1. 레이아웃
    'absolute inset-0 pointer-events-none',

    // 2. 테두리
    'border-b border-solid',
  ].join(' ');
  const typeClass = `table-header-border-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 컨텐츠 클래스
const contentClasses = computed(() => {
  const baseClasses = [
    // 1. 레이아웃
    'relative flex h-full w-full flex-row items-center',
  ].join(' ');
  const alignClass = alignClasses[props.align];

  return `${baseClasses} ${alignClass}`;
});

// 패딩 클래스
const paddingClasses = computed(() => {
  const baseClasses = [
    // 1. 레이아웃
    'relative flex h-full w-full flex-row items-center justify-start',

    // 2. 간격
    'gap-2.5',

    // 3. 박스 모델
    'box-border content-stretch',
  ].join(' ');
  const typeClass = `table-header-padding-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 텍스트 클래스
const textClasses = computed(() => {
  const baseClasses = [
    // 1. 레이아웃
    'relative flex flex-shrink-0 flex-col justify-center',

    // 2. 타이포그래피
    'text-left text-sm font-medium font-normal leading-none tracking-1',

    // 3. 텍스트 처리
    'whitespace-nowrap',
  ].join(' ');
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
