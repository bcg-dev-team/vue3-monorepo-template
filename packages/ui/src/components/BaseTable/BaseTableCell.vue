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

// 타입별 클래스 매핑 (컴포넌트별 토큰)
const typeClasses = {
  normal: 'table-cell-normal',
  selected: 'table-cell-selected',
  input: 'table-cell-input',
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
  const baseClasses = 'absolute border-l border-r border-solid inset-0 pointer-events-none';
  const typeClass = `table-cell-border-${props.type}`;

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
  const baseClasses = 'flex flex-row items-center justify-start relative w-full h-full';
  const typeClass = `table-cell-padding-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 텍스트 클래스
const textClasses = computed(() => {
  const baseClasses =
    'flex flex-col justify-center leading-none font-normal relative flex-shrink-0 text-sm text-left whitespace-nowrap';
  const typeClass = `table-cell-text-${props.type}`;

  return `${baseClasses} ${typeClass}`;
});

// 동적 스타일 (너비만)
const cellStyle = computed(() => {
  return {
    width: props.width,
  };
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
