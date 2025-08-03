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
import BaseSkeleton from '../BaseSkeleton/BaseSkeleton.vue';
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
  /**
   * 로딩 상태 여부
   */
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'regular',
  disabled: false,
  isLoading: false,
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

// 스켈레톤 크기 계산 - CSS 값 기반 동적 계산
const getSkeletonWidth = () => {
  // 텍스트 길이 기반 계산
  const textLength = props.label?.length || 0;
  const subTextLength = props.subLabel?.length || 0;
  
  // CSS에서 정의된 폰트 크기 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-font-size-small, --button-font-size-regular 등
  const getFontSize = () => {
    switch (props.size) {
      case 'small': return 14; // btn-size-small font-size: 14px
      case 'small-inner': return 13; // btn-size-small-inner font-size: 13px
      case 'pill': return 14; // btn-size-pill font-size: 14px
      default: return 16; // btn-size-regular font-size: 16px
    }
  };
  
  // CSS에서 정의된 패딩 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-padding-small, --button-padding-regular 등
  const getPadding = () => {
    switch (props.size) {
      case 'small': return { x: 20, y: 6 }; // py-1.5 px-5 → padding: 6px 20px
      case 'small-inner': return { x: 12, y: 10 }; // py-2.5 px-3 → padding: 10px 12px
      case 'pill': return { x: 16, y: 8 }; // py-2 px-4 → padding: 8px 16px
      default: return { x: 16, y: 12 }; // py-3 px-4 → padding: 12px 16px
    }
  };
  
  // CSS에서 정의된 아이콘 크기 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-icon-size-small, --button-icon-size-regular 등
  const getIconSize = () => {
    switch (props.size) {
      case 'small': return 24; // .btn-size-small .icon { width: 24px; height: 24px; }
      case 'small-inner': return 16; // .btn-size-small-inner .icon { width: 16px; height: 16px; }
      case 'pill': return 20; // .btn-size-pill .icon { width: 20px; height: 20px; }
      default: return 24; // .btn-size-regular .icon { width: 24px; height: 24px; }
    }
  };
  
  const fontSize = getFontSize();
  const padding = getPadding();
  const iconSize = getIconSize();
  
  // 문자당 너비 계산 (폰트 크기의 60% 정도)
  // TODO: 폰트 패밀리에 따라 조정 가능
  const charWidth = fontSize * 0.6;
  
  // 텍스트 너비 계산
  let textWidth = textLength * charWidth;
  if (subTextLength > 0) {
    // 서브 텍스트는 더 작은 폰트 크기 사용
    const subFontSize = props.size === 'small-inner' ? 13 : 14; // .btn-sub-text font-size
    const subCharWidth = subFontSize * 0.6;
    textWidth = Math.max(textWidth, subTextLength * subCharWidth);
  }
  
  // 아이콘 공간 계산
  let iconSpace = 0;
  if (props.leftIcon) iconSpace += iconSize + 8; // 아이콘 + 간격
  if (props.rightIcon) iconSpace += iconSize + 8;
  
  // 전체 너비 계산
  const totalWidth = textWidth + iconSpace + (padding.x * 2);
  
  // 최소/최대 제한 (CSS 값 기반)
  // TODO: CSS 변수로 추출 가능: --button-min-width, --button-max-width 등
  const minWidth = props.size === 'small' ? 60 : props.size === 'small-inner' ? 50 : 80;
  const maxWidth = 400;
  
  return Math.max(minWidth, Math.min(maxWidth, totalWidth)) + 'px';
};

const getSkeletonHeight = () => {
  // CSS에서 정의된 높이 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-height-small, --button-height-regular 등
  const getBaseHeight = () => {
    switch (props.size) {
      case 'small': return 32; // py-1.5 (6px * 2) + line-height (18px) + 여유
      case 'small-inner': return 28; // py-2.5 (10px * 2) + line-height (16px) + 여유
      case 'pill': return 36; // py-2 (8px * 2) + line-height (18px) + 여유
      default: return 40; // py-3 (12px * 2) + line-height (20px) + 여유
    }
  };
  
  const baseHeight = getBaseHeight();
  const hasSubLabel = !!props.subLabel;
  
  // 서브 라벨이 있으면 추가 높이
  if (hasSubLabel) {
    const subLabelHeight = props.size === 'small-inner' ? 16 : 18; // .btn-sub-text line-height
    const subLabelMargin = 2; // .btn-sub-text margin-top: 2px
    return (baseHeight + subLabelHeight + subLabelMargin) + 'px';
  }
  
  return baseHeight + 'px';
};
</script>

<template>
  <button
    v-if="!props.isLoading"
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
  
  <!-- 스켈레톤 상태 -->
  <div v-else class="button-skeleton">
    <BaseSkeleton
      :width="getSkeletonWidth()"
      :height="getSkeletonHeight()"
      variant="rectangular"
      class="button-skeleton-element"
    />
  </div>
</template>

<style scoped>
.button-skeleton {
  display: inline-block;
}

.button-skeleton-element {
  border-radius: var(--radius-sm);
}
</style>
