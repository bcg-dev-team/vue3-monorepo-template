<!-- Figma: Pagination/Arrow-Left, Pagination/Arrow-Right -->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 페이지네이션 화살표 컴포넌트
 *
 * @props direction - 화살표 방향 ('left' | 'right')
 * @props disabled - 비활성화 상태 여부
 * @emits click - 클릭 이벤트
 */
interface Props {
  /** 화살표 방향 */
  direction?: 'left' | 'right';
  /** 비활성화 상태 여부 */
  disabled?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left',
  disabled: false,
});

const emit = defineEmits<Emits>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

// 레이아웃/상태는 Tailwind class로 처리
const arrowClasses = computed(() => {
  const baseClasses = 'relative w-6 h-6 cursor-pointer transition-colors duration-200';
  const disabledClasses = props.disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80';
  return `${baseClasses} ${disabledClasses}`;
});

const svgClasses = computed(() => {
  const baseClasses = 'block w-full h-full';
  const rotationClasses = props.direction === 'right' ? 'rotate-180' : '';
  return `${baseClasses} ${rotationClasses}`;
});

// 색상은 CSS 변수로 처리
const fillColor = computed(() => {
  return props.disabled ? 'var(--text-disabled)' : 'var(--text-primary)';
});
</script>

<template>
  <div
    :class="arrowClasses"
    @click="handleClick"
    :data-name="`Pagination/Arrow-${direction === 'left' ? 'Left' : 'Right'}`"
  >
    <div class="absolute bottom-[33.333%] left-1/4 right-1/4 top-[35.792%]">
      <svg :class="svgClasses" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
        <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" :fill="fillColor" />
      </svg>
    </div>
  </div>
</template>
