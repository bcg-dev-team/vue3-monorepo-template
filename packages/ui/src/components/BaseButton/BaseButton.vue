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
import type { ButtonIconProps, ButtonVariant, ButtonSize } from '../../types/components';

interface Props {
  /**
   * 버튼 스타일 (primary, outline, red, blue, pill, ...)]
   *
   * 기본값은 'primary'입니다.
   */
  variant?: ButtonVariant;
  /**
   * 버튼 크기 (regular, small, pill, small-inner)
   *
   * 기본값은 'regular'입니다.
   */
  size?: ButtonSize;
  /**
   * 비활성화 여부
   *
   * 기본값은 false입니다.
   */
  disabled?: boolean;
  /**
   * 좌측 아이콘 정보 (name, size, color)
   */
  leftIcon?: ButtonIconProps;
  /**
   * 우측 아이콘 정보 (name, size, color)
   */
  rightIcon?: ButtonIconProps;
  /**
   * 버튼 텍스트
   */
  label: string;
  /**
   * 서브 텍스트 (optional)
   */
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

// 색상/테마는 CSS 변수 + Tailwind arbitrary value로 처리
const buttonStyle = computed(() => {
  const baseStyle = {
    backgroundColor: `var(--button-${props.variant}-background)`,
    color: `var(--button-${props.variant}-text)`,
  };

  // border가 필요한 variant들
  const borderVariants = ['outline', 'red', 'blue', 'light-solid', 'disabled'];
  if (borderVariants.includes(props.variant)) {
    return {
      ...baseStyle,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: `var(--button-${props.variant}-border)`,
    };
  }

  return baseStyle;
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const baseClasses = computed(() => {
  const classes = [
    'inline-flex items-center justify-center font-sans font-semibold transition-all select-none',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  // hover 효과 추가
  switch (props.variant) {
    case 'primary':
      classes.push('hover:bg-[var(--button-primary-background-deep)]');
      break;
    case 'outline':
      classes.push('hover:bg-[var(--button-outline-background)]');
      break;
    case 'red':
      classes.push('hover:bg-[var(--button-red-background-hover)]');
      break;
    case 'red-solid':
      classes.push('hover:bg-[var(--button-red-solid-hover)]');
      break;
    case 'blue':
      classes.push('hover:bg-[var(--button-blue-background-hover)]');
      break;
    case 'blue-solid':
      classes.push('hover:bg-[var(--button-blue-solid-hover)]');
      break;
    case 'disabled':
      classes.push('cursor-not-allowed');
      break;
  }

  return classes.join(' ');
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'regular':
      return 'px-4 py-3 text-lg rounded-default';
    case 'small':
      return 'px-5 py-1.5 text-md rounded-sm';
    case 'pill':
      return 'px-4 py-2 text-md rounded-full';
    case 'small-inner':
      return 'px-3 py-2.5 text-base rounded-sm';
    default:
      return '';
  }
});
</script>

<template>
  <button
    type="button"
    :class="[baseClasses, sizeClass]"
    :style="buttonStyle"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <span v-if="props.leftIcon" class="mr-2">
      <BaseIcon
        :name="props.leftIcon.name"
        :size="props.leftIcon.size"
        :color="props.leftIcon.color || 'currentColor'"
      />
    </span>
    <span class="flex flex-col justify-center">
      {{ props.label }}
      <span v-if="props.subLabel" class="block text-xs font-semibold leading-5">{{
        props.subLabel
      }}</span>
    </span>
    <span v-if="props.rightIcon" class="ml-2">
      <BaseIcon
        :name="props.rightIcon.name"
        :size="props.rightIcon.size"
        :color="props.rightIcon.color || 'currentColor'"
      />
    </span>
    <slot />
  </button>
</template>
