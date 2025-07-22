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
import type { IconName } from '../../types/icons';

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

interface Props {
  /**
   * 버튼 스타일 (primary, outline, red, blue, pill, ...)]
   *
   * 기본값은 'primary'입니다.
   */
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
  /**
   * 버튼 크기 (regular, small, pill, small-inner)
   *
   * 기본값은 'regular'입니다.
   */
  size?: 'regular' | 'small' | 'pill' | 'small-inner';
  /**
   * 비활성화 여부
   *
   * 기본값은 false입니다.
   */
  disabled?: boolean;
  /**
   * 좌측 아이콘 정보 (name, size, color)
   */
  leftIcon?: IconProps;
  /**
   * 우측 아이콘 정보 (name, size, color)
   */
  rightIcon?: IconProps;
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

const base =
  'inline-flex items-center justify-center font-sans font-semibold transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed';

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-button-primary-bg text-button-primary-text hover:bg-primary-deep';
    case 'outline':
      return 'bg-button-outline-bg border border-button-outline-border text-button-outline-text hover:bg-surface-muted';
    case 'red':
      return 'bg-button-red-bg border border-button-red-border text-button-red-text hover:bg-bg-red';
    case 'red-solid':
      return 'bg-button-red-solid-bg text-button-red-solid-text hover:bg-error';
    case 'blue':
      return 'bg-button-outline-bg border border-info text-info hover:bg-bg-blue';
    case 'blue-solid':
      return 'bg-button-blue-solid-bg text-button-blue-solid-text hover:bg-info';
    case 'light-solid':
      return 'bg-button-light-solid-bg text-button-light-solid-text border border-primary';
    case 'pill':
      return 'bg-primary text-button-primary-text rounded-full';
    case 'disabled':
      return 'bg-button-disabled-bg text-button-disabled-text border border-button-disabled-border cursor-not-allowed';
    default:
      return '';
  }
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
    :class="[base, variantClass, sizeClass]"
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
