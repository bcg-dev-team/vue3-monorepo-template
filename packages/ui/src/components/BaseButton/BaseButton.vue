<script setup lang="ts">
/**
 * BaseButton - Figma 버튼 컴포넌트 1:1 구현
 * @props variant - 버튼 스타일 (primary, outline, red, blue, pill, light-solid, red-solid, blue-solid, green-solid, cancel-solid, disabled)
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
   * 버튼 스타일
   * - contained: 채움(기본)
   * - outlined: 외곽선
   */
  variant?: 'contained' | 'outlined';
  /**
   * 버튼 컬러
   * - primary: 기본 노란색
   * - red: 빨간색
   * - blue: 파란색
   * - green: 초록색
   * - cancel: 보라색
   * - disabled: 비활성화
   */
  color?: 'primary' | 'red' | 'blue' | 'green' | 'cancel' | 'disabled';
  /**
   * 버튼 크기
   * - large: 48px
   * - medium: 40px
   * - small: 32px
   */
  size?: 'large' | 'medium' | 'small';
  /**
   * pill 스타일 여부 (둥근 모서리)
   */
  pill?: boolean;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 좌측 아이콘 정보
   */
  leftIcon?: ButtonIconProps;
  /**
   * 우측 아이콘 정보
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
  /**
   * 부모 컨테이너 100% 너비로 확장
   */
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'contained',
  color: 'primary',
  size: 'large',
  pill: false,
  disabled: false,
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// 버튼 클래스 계산
const buttonClasses = computed(() => {
  const classes = [
    // 기본 클래스
    'inline-flex items-center justify-center gap-2.5',
    'transition-all duration-200',
    'select-none',
    'focus:outline-none',
    'min-w-[64px]',
    'min-h-[32px]',
    props.fullWidth ? 'w-full' : '',
  ];

  // variant 클래스
  const variantClass = `btn-variant-${props.variant}`;
  classes.push(variantClass);

  // color 클래스
  const colorClass = `btn-color-${props.color}`;
  classes.push(colorClass);

  // 크기 클래스
  const sizeClass = `btn-size-${props.size}`;
  classes.push(sizeClass);

  // 비활성화 상태
  if (props.disabled) {
    classes.push('btn-disabled');
  }

  // pill 스타일 (항상 마지막에 push)
  if (props.pill) {
    classes.push('btn-pill');
  }

  return classes.join(' ');
});

// 아이콘 크기 매핑
const getIconSize = (size: string) => {
  switch (size) {
    case 'large':
    case 'medium': {
      return 'md'; // 24px
    }
    case 'small': {
      return 'sm'; // 16px
    }
    default: {
      return 'md';
    }
  }
};

// 아이콘 색상 계산
const getIconColor = (iconProps: ButtonIconProps | undefined, color: string) => {
  if (iconProps?.color) {
    return iconProps.color;
  }

  // color별 기본 아이콘 색상 (디자인 토큰 사용)
  switch (color) {
    case 'primary':
      return 'var(--button-primary-text)';
    case 'red':
      return 'var(--button-red-text)';
    case 'blue':
      return 'var(--button-blue-text)';
    case 'green':
      return 'var(--base-colors-neutral-neutral000)';
    case 'cancel':
      return 'var(--base-colors-neutral-neutral000)';
    case 'disabled':
      return 'var(--button-disabled-text)';
    default:
      return 'currentColor';
  }
};
</script>

<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <!-- 좌측 아이콘 -->
    <BaseIcon
      v-if="props.leftIcon"
      :name="props.leftIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.leftIcon, props.color)"
      class="icon"
    />

    <!-- 텍스트 영역 -->
    <div class="flex flex-col items-center justify-center">
      <span class="btn-label font-medium">{{ props.label }}</span>
      <span v-if="props.subLabel" class="btn-sub-text font-semibold">
        {{ props.subLabel }}
      </span>
    </div>

    <!-- 우측 아이콘 -->
    <BaseIcon
      v-if="props.rightIcon"
      :name="props.rightIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.rightIcon, props.color)"
      class="icon"
    />

    <!-- 기본 슬롯 -->
    <slot />
  </button>
</template>
