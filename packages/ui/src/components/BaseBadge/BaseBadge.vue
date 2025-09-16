<script setup lang="ts">
/**
 * BaseBadge - Material UI와 Element Plus를 참고한 배지 컴포넌트
 * @props value - 배지에 표시할 값 (숫자 또는 문자열)
 * @props max - 최대값 (숫자일 때만 적용)
 * @props variant - 배지 스타일 (dot: 점 형태, standard: 값 표시)
 * @props color - 배지 색상
 * @props showZero - 0일 때도 표시할지 여부
 * @props hidden - 배지 숨김 여부
 * @props overlap - 겹침 여부 (overlap: 겹쳐서, no-overlap: 나란히)
 * @props anchorOrigin - 배지 위치 (overlap일 때만 적용)
 */
import { computed } from 'vue';
import './BaseBadge.scss';

/**
 * 배지 색상 타입
 */
export type BadgeColor = 'grey' | 'red' | 'green' | 'blue' | 'yellow' | 'purple';

/**
 * 배지 스타일 타입
 */
export type BadgeVariant = 'dot' | 'standard' | 'square';

/**
 * 배지 겹침 타입
 */
export type BadgeOverlap = 'overlap' | 'no-overlap';

/**
 * 배지 수직 위치 타입
 */
export type BadgeVertical = 'top' | 'middle' | 'bottom';

/**
 * 배지 수평 위치 타입
 */
export type BadgeHorizontal = 'left' | 'right';

/**
 * 배지 앵커 오리진 타입
 */
export interface BadgeAnchorOrigin {
  vertical: BadgeVertical;
  horizontal: BadgeHorizontal;
}

interface Props {
  /**
   * 배지에 표시할 값
   */
  value?: string | number;
  /**
   * 최대값 (숫자일 때만 적용)
   */
  max?: number;
  /**
   * 배지 스타일
   * - dot: 작은 점 형태
   * - standard: 값이 표시되는 형태
   */
  variant?: BadgeVariant;
  /**
   * 배지 색상
   */
  color?: BadgeColor;
  /**
   * 0일 때도 표시할지 여부
   */
  showZero?: boolean;
  /**
   * 배지 숨김 여부
   */
  hidden?: boolean;
  /**
   * 배지 겹침 여부
   * - overlap: 컨텐츠에 겹쳐서 배치 (Material UI 스타일)
   * - no-overlap: 컨텐츠 옆에 나란히 배치
   */
  overlap?: BadgeOverlap;
  /**
   * 배지 위치 (overlap일 때만 적용)
   */
  anchorOrigin?: BadgeAnchorOrigin;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  max: 99,
  variant: 'standard',
  color: 'red',
  showZero: false,
  hidden: false,
  overlap: 'overlap',
  anchorOrigin: () => ({ vertical: 'top', horizontal: 'right' }),
});

// 배지 표시 여부 계산
const shouldShowBadge = computed(() => {
  if (props.hidden) return false;
  if (props.variant === 'dot') return true;
  if (typeof props.value === 'number') {
    return props.showZero ? true : props.value > 0;
  }
  return !!props.value;
});

// 배지 표시 값 계산
const displayValue = computed(() => {
  if (props.variant === 'dot') return '';
  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value.toString();
  }
  return props.value;
});

// square 변형에 대한 강제 배치 규칙 적용
const effectiveOverlap = computed<BadgeOverlap>(() => {
  return props.variant === 'square' ? 'no-overlap' : props.overlap;
});

const effectiveAnchor = computed<BadgeAnchorOrigin>(() => {
  return props.variant === 'square'
    ? { vertical: 'middle', horizontal: 'right' }
    : props.anchorOrigin!;
});

// 배지 클래스 계산
const badgeClasses = computed(() => {
  const classes = [
    'base-badge',
    `base-badge--${props.variant}`,
    `base-badge--${props.color}`,
    `base-badge--${effectiveOverlap.value}`,
  ];

  // 위치 클래스 추가 (overlap과 no-overlap 모두)
  classes.push(`base-badge--${effectiveAnchor.value.vertical}-${effectiveAnchor.value.horizontal}`);

  return classes;
});
</script>

<template>
  <div :class="['base-badge-wrapper', `base-badge-wrapper--${props.overlap}`]">
    <!-- 슬롯 컨텐츠 -->
    <slot />

    <!-- 배지 -->
    <span
      v-if="shouldShowBadge"
      :class="badgeClasses"
      :aria-hidden="variant === 'dot' ? 'true' : 'false'"
    >
      {{ displayValue }}
    </span>
  </div>
</template>
