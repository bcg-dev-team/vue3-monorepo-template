<script setup lang="ts">
/**
 * BaseButton - Figma 버튼 컴포넌트 1:1 구현
 * @props variant - 버튼 스타일 (primary, outline, red, blue, pill, light-solid, red-solid, blue-solid, green-solid, cancel-solid, disabled)
 * @props size - 버튼 크기 (lg, md, sm)
 * @props disabled - 비활성화 여부
 * @props leftIcon - 좌측 아이콘 정보 (name, size, color)
 * @props rightIcon - 우측 아이콘 정보 (name, size, color)
 * @props centerIcon - 중앙 아이콘 정보 (name, size, color) - 중앙 아이콘 사용 시 label과 subLabel은 무시됩니다
 * @props label - 버튼 텍스트
 * @props subLabel - 서브 텍스트 (optional)
 * @emits click - 클릭 이벤트
 * @figma Button (node-id: 32-244)
 */
import type { ComponentSize, ButtonIconProps } from '../../types/components';
import BaseSkeleton from '../BaseSkeleton/BaseSkeleton.vue';
import type { IconName } from '../../types/icons';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';
import './BaseButton.scss';

/**
 * 버튼 색상 타입
 */
export type ButtonColor = 'primary' | 'red' | 'blue' | 'green' | 'cancel' | 'grey' | 'white';

interface Props {
  /**
   * 버튼 스타일
   * - contained: 채움(기본)
   * - outlined: 외곽선
   */
  variant?: 'contained' | 'contained-grey' | 'outlined';
  /**
   * 버튼 컬러
   * - primary: 기본 노란색
   * - red: 빨간색
   * - blue: 파란색
   * - green: 초록색
   * - cancel: 보라색
   */
  color?: 'primary' | 'red' | 'blue' | 'green' | 'cancel' | 'grey' | 'white';
  /**
   * 버튼 크기
   * - lg: large (48px)
   * - md: medium (40px)
   * - sm: small (32px)
   */
  size?: ComponentSize;
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
   * 중앙 아이콘 정보 (중앙 아이콘 사용 시 label과 subLabel은 무시됩니다)
   */
  centerIcon?: ButtonIconProps;
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
  /**
   * 버튼이 링크 역할을 할 때, 즉 href 사용할 때 <a role="button">
   * 그 외 경우 <button>
   */
  href?: string;
  /**
   * 커스텀 클래스 (button/a에 직접 적용)
   */
  customClass?: string;
  /**
   * 로딩 상태 여부
   */
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'contained',
  color: 'primary',
  size: 'lg',
  pill: false,
  disabled: false,
  fullWidth: false,
  href: undefined,
  centerIcon: undefined,
  isLoading: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// 미리 정의된 색상 목록
const predefinedColors: readonly ButtonColor[] = [
  'primary',
  'red',
  'blue',
  'green',
  'cancel',
  'grey',
  'white',
];

// 텍스트 영역 표시 여부 계산
const showText = computed(() => {
  return !props.centerIcon && (props.label || props.subLabel);
});

// 버튼 클래스 계산
const buttonClasses = computed(() => {
  const classes = [
    'inline-flex items-center justify-center gap-2.5',
    'transition-all duration-200',
    'select-none',
    'focus:outline-none',
    props.fullWidth ? 'w-full' : '',
    `btn-variant-${props.variant}`,
    `btn-size-${props.size}`,
  ];
  if (props.disabled) classes.push('btn-disabled');
  if (props.pill) classes.push('btn-pill');
  // customClass가 없을 때만 color 클래스 적용
  if (!props.customClass && predefinedColors.includes(props.color as ButtonColor)) {
    classes.push(`btn-color-${props.color}`);
  }
  // customClass는 항상 마지막에 push (우선순위 보장)
  if (props.customClass) classes.push(props.customClass);
  return classes;
});

// 아이콘 크기 매핑
const getIconSize = (size: string) => {
  switch (size) {
    case 'lg':
    case 'md': {
      return 'md'; // 24px
    }
    case 'sm': {
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

  // 모든 아이콘은 기본적으로 currentColor 사용 (버튼 텍스트 색상과 일치)
  return 'currentColor';
};

// 마우스 클릭 핸들러
function handleClick(e: MouseEvent) {
  if (props.disabled) return;
  emit('click', e);
}

// <a role="button"> 키보드 접근성 핸들러
function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    emit('click', e as any);
  }
}

// 스켈레톤 크기 계산 - CSS 값 기반 동적 계산
const getSkeletonWidth = () => {
  // 텍스트 길이 기반 계산
  const textLength = props.label?.length || 0;
  const subTextLength = props.subLabel?.length || 0;

  // CSS에서 정의된 폰트 크기 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-font-size-small, --button-font-size-regular 등
  const getFontSize = () => {
    switch (props.size) {
      case 'md':
        return 14; // btn-size-small font-size: 14px
      case 'sm':
        return 13; // btn-size-small-inner font-size: 13px
      default:
        return 16; // btn-size-regular font-size: 16px
    }
  };

  // CSS에서 정의된 패딩 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-padding-small, --button-padding-regular 등
  const getPadding = () => {
    switch (props.size) {
      case 'md':
        return { x: 20, y: 6 }; // py-1.5 px-5 → padding: 6px 20px
      case 'sm':
        return { x: 12, y: 10 }; // py-2.5 px-3 → padding: 10px 12px
      default:
        return { x: 16, y: 12 }; // py-3 px-4 → padding: 12px 16px
    }
  };

  // CSS에서 정의된 아이콘 크기 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-icon-size-small, --button-icon-size-regular 등
  const getIconSize = () => {
    switch (props.size) {
      case 'md':
        return 24; // .btn-size-small .icon { width: 24px; height: 24px; }
      case 'sm':
        return 16; // .btn-size-small-inner .icon { width: 16px; height: 16px; }
      default:
        return 24; // .btn-size-regular .icon { width: 24px; height: 24px; }
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
    const subFontSize = props.size === 'sm' ? 13 : 14; // .btn-sub-text font-size
    const subCharWidth = subFontSize * 0.6;
    textWidth = Math.max(textWidth, subTextLength * subCharWidth);
  }

  // 아이콘 공간 계산
  let iconSpace = 0;
  if (props.leftIcon) iconSpace += iconSize + 8; // 아이콘 + 간격
  if (props.rightIcon) iconSpace += iconSize + 8;

  // 전체 너비 계산
  const totalWidth = textWidth + iconSpace + padding.x * 2;

  // 최소/최대 제한 (CSS 값 기반)
  // TODO: CSS 변수로 추출 가능: --button-min-width, --button-max-width 등
  const minWidth = props.size === 'md' ? 60 : props.size === 'sm' ? 50 : 80;
  const maxWidth = 400;

  return Math.max(minWidth, Math.min(maxWidth, totalWidth)) + 'px';
};

const getSkeletonHeight = () => {
  // CSS에서 정의된 높이 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-height-small, --button-height-regular 등
  const getBaseHeight = () => {
    switch (props.size) {
      case 'md':
        return 32; // py-1.5 (6px * 2) + line-height (18px) + 여유
      case 'sm':
        return 28; // py-2.5 (10px * 2) + line-height (16px) + 여유
      default:
        return 40; // py-3 (12px * 2) + line-height (20px) + 여유
    }
  };

  const baseHeight = getBaseHeight();
  const hasSubLabel = !!props.subLabel;

  // 서브 라벨이 있으면 추가 높이
  if (hasSubLabel) {
    const subLabelHeight = props.size === 'sm' ? 16 : 18; // .btn-sub-text line-height
    const subLabelMargin = 2; // .btn-sub-text margin-top: 2px
    return baseHeight + subLabelHeight + subLabelMargin + 'px';
  }

  return baseHeight + 'px';
};
</script>

<template>
  <component
    v-if="!props.isLoading"
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    role="button"
    :type="props.href ? undefined : 'button'"
    :class="[...buttonClasses, 'focus-ring']"
    :style="
      !predefinedColors.includes(props.color as ButtonColor)
        ? { '--button-custom-color': props.color }
        : {}
    "
    :aria-label="props.centerIcon ? props.centerIcon.name : props.label"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :tabindex="props.disabled ? -1 : 0"
    :disabled="!props.href && props.disabled"
    @click="handleClick"
    @keydown="props.href ? handleKeydown : undefined"
  >
    <!-- 좌측 아이콘 (중앙 아이콘이 없을 때만) -->
    <BaseIcon
      v-if="props.leftIcon && !props.centerIcon"
      :name="props.leftIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.leftIcon, props.color)"
      class="icon"
    />

    <!-- 중앙 아이콘 -->
    <BaseIcon
      v-if="props.centerIcon"
      :name="props.centerIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.centerIcon, props.color)"
      class="icon"
    />

    <!-- 텍스트 영역 (중앙 아이콘이 없을 때만) -->
    <div v-if="showText" class="flex flex-col items-center justify-center">
      <span :class="['font-medium', props.subLabel ? 'btn-main-label' : 'btn-label']">{{
        props.label
      }}</span>
      <span v-if="props.subLabel" class="btn-sub-text font-semibold">
        {{ props.subLabel }}
      </span>
    </div>

    <!-- 우측 아이콘 (중앙 아이콘이 없을 때만) -->
    <BaseIcon
      v-if="props.rightIcon && !props.centerIcon"
      :name="props.rightIcon.name"
      :size="getIconSize(props.size)"
      :color="getIconColor(props.rightIcon, props.color)"
      class="icon"
    />

    <!-- 기본 슬롯 -->
    <slot />
  </component>

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
