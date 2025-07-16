<script setup lang="ts">
/**
 * BaseButton - Figma 버튼 컴포넌트 1:1 구현
 * @props variant - 버튼 스타일 (primary, outline, red, blue, pill, ...)
 * @props size - 버튼 크기 (regular, small, pill, small-inner)
 * @props disabled - 비활성화 여부
 * @props leftIcon - 좌측 아이콘 정보 (name, size, color)
 * @props rightIcon - 우측 아이콘 정보 (name, size, color)
 * @props label - 버튼 텍스트
 * @props subLabel - 서브 텍스트 (optional)
 * @emits click - 클릭 이벤트
 * @figma Button (node-id: 32-244)
 */
import { computed } from 'vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'current' | 'primary' | 'error';
  disabled?: boolean;
}

interface Props {
  variant?:
    | 'primary'
    | 'outline'
    | 'red'
    | 'blue'
    | 'pill'
    | 'light-solid'
    | 'red-solid'
    | 'blue-solid'
    | 'disabled';
  size?: 'regular' | 'small' | 'pill' | 'small-inner';
  disabled?: boolean;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  label: string;
  subLabel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'regular',
  disabled: false,
});
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const base =
  'inline-flex items-center justify-center font-sans font-semibold transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary800 disabled:opacity-50 disabled:cursor-not-allowed';
const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary800 text-neutral800 hover:bg-primary-deep';
    case 'outline':
      return 'bg-neutral000 border border-outline text-neutral750 hover:bg-neutral050';
    case 'red':
      return 'bg-neutral000 border border-red800 text-red800 hover:bg-red050';
    case 'red-solid':
      return 'bg-red800 text-neutral000 hover:bg-red700';
    case 'blue':
      return 'bg-neutral000 border border-blue800 text-blue800 hover:bg-blue050';
    case 'blue-solid':
      return 'bg-blue800 text-neutral000 hover:bg-blue700';
    case 'light-solid':
      return 'bg-light-solid text-light-solid-text border border-light-solid-border';
    case 'pill':
      return 'bg-primary800 text-neutral800 rounded-3xl';
    case 'disabled':
      return 'bg-disabled text-disabled-text border border-disabled-border cursor-not-allowed';
    default:
      return '';
  }
});
const sizeClass = computed(() => {
  switch (props.size) {
    case 'regular':
      return 'px-4 py-3 text-[16px] rounded-lg';
    case 'small':
      return 'px-5 py-1.5 text-[14px] rounded-md';
    case 'pill':
      return 'px-4 py-2 text-[14px] rounded-3xl';
    case 'small-inner':
      return 'px-3 py-2.5 text-[13px] rounded-md';
    default:
      return '';
  }
});
</script>

<template>
  <button
    type="button"
    :class="[base, variantClass, sizeClass]"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <span v-if="props.leftIcon" class="mr-2">
      <BaseIcon :name="props.leftIcon.name" :size="props.leftIcon.size" color="current" />
    </span>
    <span class="flex flex-col justify-center">
      {{ props.label }}
      <span v-if="props.subLabel" class="block text-xs font-semibold leading-5">{{
        props.subLabel
      }}</span>
    </span>
    <span v-if="props.rightIcon" class="ml-2">
      <BaseIcon :name="props.rightIcon.name" :size="props.rightIcon.size" color="current" />
    </span>
    <slot />
  </button>
</template>
