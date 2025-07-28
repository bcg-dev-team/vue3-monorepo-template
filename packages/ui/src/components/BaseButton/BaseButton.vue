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
   * - primary: 기본 노란색 버튼
   * - outline: 기본 아웃라인 버튼
   * - red: 빨간색 아웃라인 버튼
   * - blue: 파란색 아웃라인 버튼
   * - pill: 둥근 모서리 버튼
   * - light-solid: 연한 노란색 솔리드 버튼
   * - red-solid: 빨간색 솔리드 버튼
   * - blue-solid: 파란색 솔리드 버튼
   * - green-solid: 초록색 솔리드 버튼
   * - cancel-solid: 보라색 솔리드 버튼
   * - disabled: 비활성화 버튼
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
    | 'green-solid'
    | 'cancel-solid'
    | 'disabled';
  /**
   * 버튼 크기
   * - regular: 기본 크기 (16px, py-3 px-4)
   * - small: 작은 크기 (14px, py-1.5 px-5)
   * - pill: 둥근 모서리 크기 (14px, py-2 px-4)
   * - small-inner: 작은 내부 크기 (13px, py-2.5 px-3)
   */
  size?: 'regular' | 'small' | 'pill' | 'small-inner';
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
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'regular',
  disabled: false,
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
  ];

  // variant 클래스
  const variantClass = `btn-${props.variant}`;
  classes.push(variantClass);

  // 크기 클래스
  const sizeClass = `btn-size-${props.size}`;
  classes.push(sizeClass);

  // 비활성화 상태
  if (props.disabled) {
    classes.push('btn-disabled');
  }

  return classes.join(' ');
});

// 아이콘 크기 매핑
const getIconSize = (size: string) => {
  switch (size) {
    case 'regular':
      return 'md'; // 24px
    case 'small':
      return 'md'; // 24px
    case 'small-inner':
      return 'sm'; // 16px
    case 'pill':
      return 'lg'; // 20px
    default:
      return 'md';
  }
};

// 아이콘 색상 계산
const getIconColor = (iconProps: ButtonIconProps | undefined, variant: string) => {
  if (iconProps?.color) {
    return iconProps.color;
  }

  // variant별 기본 아이콘 색상 (디자인 토큰 사용)
  switch (variant) {
    case 'primary':
    case 'pill':
    case 'light-solid':
      return 'var(--button-primary-text)'; // #131313 → var(--button-primary-text)
    case 'outline':
      return 'var(--button-outline-text)'; // #242424 → var(--button-outline-text)
    case 'red':
    case 'red-solid':
      return 'var(--button-red-text)'; // #f63338 → var(--button-red-text)
    case 'blue':
    case 'blue-solid':
      return 'var(--button-blue-text)'; // #0067ef → var(--button-blue-text)
    case 'green-solid':
    case 'cancel-solid':
      return 'var(--base-colors-neutral-neutral000)'; // #ffffff → var(--base-colors-neutral-neutral000)
    case 'disabled':
      return 'var(--button-disabled-text)'; // #b4b6bb → var(--button-disabled-text)
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
      :color="getIconColor(props.leftIcon, props.variant)"
      class="icon"
    />

    <!-- 텍스트 영역 -->
    <div class="flex flex-col items-center justify-center">
      <span class="font-medium">{{ props.label }}</span>
      <span v-if="props.subLabel" class="btn-sub-text font-semibold">
        {{ props.subLabel }}
      </span>
    </div>

    <!-- 우측 아이콘 -->
    <BaseIcon
      v-if="props.rightIcon"
      :name="props.rightIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.rightIcon, props.variant)"
      class="icon"
    />

    <!-- 기본 슬롯 -->
    <slot />
  </button>
</template>
