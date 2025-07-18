<!-- Figma: Pagination/Number -->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 페이지네이션 번호 컴포넌트
 *
 * @props number - 표시할 페이지 번호
 * @props status - 상태 ('selected' | 'unselected' | 'hover')
 * @emits click - 클릭 이벤트
 */
interface Props {
  /** 표시할 페이지 번호 */
  number: number;
  /** 상태 */
  status?: 'selected' | 'unselected' | 'hover';
}

interface Emits {
  (e: 'click', number: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'unselected',
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click', props.number);
};

const containerClasses = computed(() => {
  const baseClasses = 'relative w-8 h-8 cursor-pointer transition-all duration-200';
  return baseClasses;
});

const backgroundClasses = computed(() => {
  const baseClasses = 'absolute inset-0 rounded-[3px] transition-colors duration-200';

  switch (props.status) {
    case 'selected':
      return `${baseClasses} bg-[#fff9df]`;
    case 'hover':
      return `${baseClasses} bg-[#f5f7f9]`;
    default:
      return baseClasses;
  }
});

const textClasses = computed(() => {
  const baseClasses =
    'absolute flex flex-col justify-center leading-[0] text-center text-nowrap not-italic tracking-[-0.63px]';
  const sizeClasses = 'text-[14px]';

  switch (props.status) {
    case 'selected':
      return `${baseClasses} ${sizeClasses} font-semibold text-[#131313] leading-[22px] bottom-[17.647%] left-[35.294%] right-[38.235%] top-[17.647%]`;
    case 'hover':
      return `${baseClasses} ${sizeClasses} font-normal text-[#717375] leading-[18px] bottom-[23.529%] left-[35.294%] right-[38.235%] top-[23.529%] tracking-[-0.35px]`;
    default:
      return `${baseClasses} ${sizeClasses} font-normal text-[#717375] leading-[22px] bottom-[17.647%] left-[35.294%] right-[38.235%] top-[17.647%]`;
  }
});
</script>

<template>
  <div :class="containerClasses" @click="handleClick" :data-name="`Pagination/Number-${status}`">
    <div :class="backgroundClasses" />
    <div :class="textClasses">
      <span class="block whitespace-pre">{{ number }}</span>
    </div>
  </div>
</template>
