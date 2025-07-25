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
import type { ComponentSize, IconName } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';
import './BaseButton.scss';

// 버튼 아이콘 props 타입 (BaseButton 전용)
interface ButtonIconProps {
  name: IconName;
  size?: ComponentSize | 'xl';
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

// 색상/테마는 정적 CSS 변수로 처리
const staticClasses = computed(() => {
  const classes = [
    // 1. 레이아웃
    'inline-flex items-center justify-center',

    // 2. 타이포그래피
    'font-sans font-semibold',

    // 3. 전환 효과
    'transition-all',

    // 4. 사용자 선택
    'select-none',

    // 5. 포커스 상태
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',

    // 6. 비활성화 상태
    'disabled:cursor-not-allowed disabled:opacity-50',
  ];

  // variant별 클래스 매핑
  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    red: 'btn-red',
    blue: 'btn-blue',
    pill: 'btn-pill',
    'light-solid': 'btn-light-solid',
    'red-solid': 'btn-red-solid',
    'blue-solid': 'btn-blue-solid',
    disabled: 'btn-disabled',
  };

  classes.push(variantClasses[props.variant] || 'btn-primary');

  return classes.join(' ');
});

// 동적 스타일 (조건부 변경이 필요한 경우만)
const dynamicStyle = computed(() => {
  // border가 필요한 variant들만 동적 처리
  const borderVariants = ['outline', 'red', 'blue', 'light-solid', 'disabled'];
  if (borderVariants.includes(props.variant)) {
    return {
      borderWidth: '1px',
      borderStyle: 'solid',
    };
  }
  return {};
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'regular':
      return [
        // 1. 패딩
        'px-4 py-3',
        // 2. 타이포그래피
        'text-lg',
        // 3. 테두리
        'rounded-default',
      ].join(' ');
    case 'small':
      return [
        // 1. 패딩
        'px-5 py-1.5',
        // 2. 타이포그래피
        'text-md',
        // 3. 테두리
        'rounded-sm',
      ].join(' ');
    case 'pill':
      return [
        // 1. 패딩
        'px-4 py-2',
        // 2. 타이포그래피
        'text-md',
        // 3. 테두리
        'rounded-full',
      ].join(' ');
    case 'small-inner':
      return [
        // 1. 패딩
        'px-3 py-2.5',
        // 2. 타이포그래피
        'text-base',
        // 3. 테두리
        'rounded-sm',
      ].join(' ');
    default:
      return '';
  }
});
</script>

<template>
  <button
    type="button"
    :class="[staticClasses, sizeClass]"
    :style="dynamicStyle"
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
