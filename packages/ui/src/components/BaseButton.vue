<script setup lang="ts">
import { computed } from 'vue';
import {
  getButtonTokens,
  getColorTokens,
  getTypographyTokens,
  getSpacingTokens,
  getRadiusTokens,
} from '@template/theme';

/**
 * BaseButton - 피그마 정의값 1:1 반영, 디자인토큰 기반, 미적용 속성은 TODO 주석 필수
 * @props variant - primary | outline | red | blue | pill 등 (Figma variant와 동일)
 * @props size - regular | small | small-inner | pill 등 (Figma 정의값)
 * @props disabled - 비활성화
 * @props loading - 로딩 상태
 * @props icon - 아이콘 컴포넌트
 * @props iconPlacement - 아이콘 위치(left, right)
 * @props subText - 서브 텍스트
 * @emits click - 버튼 클릭
 * @tokens button, color, typography, spacing, radius (가능한 경우)
 */
interface Props {
  variant?: 'primary' | 'outline' | 'red' | 'blue' | 'pill';
  size?: 'regular' | 'small' | 'small-inner' | 'pill';
  disabled?: boolean;
  loading?: boolean;
  icon?: () => any;
  iconPlacement?: 'left' | 'right';
  subText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'regular',
  disabled: false,
  loading: false,
  iconPlacement: 'left',
  subText: '',
});

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

// 디자인 토큰 가져오기 (테마 자동 적용)
const buttonTokens = getButtonTokens();
console.log('buttonTokens:', buttonTokens);
console.log('primary-background:', buttonTokens['primary-background']);
console.log('disabled-background:', buttonTokens['disabled-background']);
const typographyTokens = getTypographyTokens();
const spacingTokens = getSpacingTokens();
const radiusTokens = getRadiusTokens();
console.log('radiusTokens:', radiusTokens); // radius 토큰 전체 확인

// 피그마 variant별 스타일 정의 (분기/조건문 없이 1:1 매핑)
const variantStyle = {
  primary: {
    bg: buttonTokens['primary-background'],
    // hoverBg: buttonTokens['primary-hover-background'], // 존재하지 않음, 필요시 TODO
    text: buttonTokens['primary-text'],
    border: buttonTokens['primary-border'],
  },
  outline: {
    bg: buttonTokens['outline-background'],
    // hoverBg: '#f8f8f8', // TODO) 디자인 토큰 적용 요청
    text: buttonTokens['outline-text'],
    border: buttonTokens['outline-border'],
  },
  red: {
    bg: buttonTokens['red-background'],
    hoverBg: buttonTokens['light-solid-background'],
    text: buttonTokens['red-text'],
    border: buttonTokens['red-border'],
  },
  blue: {
    bg: buttonTokens['blue-background'],
    hoverBg: buttonTokens['blue-solid-hover'],
    text: buttonTokens['blue-text'],
    border: buttonTokens['blue-border'],
  },
  pill: {
    bg: buttonTokens['pill-background'],
    hoverBg: buttonTokens['pill-hover-background'],
    text: buttonTokens['pill-text'],
    border: buttonTokens['pill-border'],
  },
  disabled: {
    bg: buttonTokens['disabled-background'],
    text: buttonTokens['disabled-text'],
    border: buttonTokens['disabled-border'],
    // hoverBg: '',
  },
};

// 피그마 size별 스타일 정의 (분기/조건문 없이 1:1 매핑)
const sizeStyle = {
  regular: {
    px: spacingTokens['spacing-16'],
    py: spacingTokens['spacing-12'],
    text: typographyTokens.fontSize['font-16'],
    radius: radiusTokens['radius-default'],
    icon: 'size-6',
    gap: spacingTokens['spacing-10'],
    font: 'font-[Pretendard_GOV] font-semibold',
    leading: typographyTokens.lineHeight['line-height-5'],
  },
  small: {
    px: spacingTokens['spacing-20'],
    py: spacingTokens['spacing-6'],
    text: typographyTokens.fontSize['font-14'],
    radius: radiusTokens['radius-sm'],
    icon: 'size-6',
    gap: spacingTokens['spacing-4'],
    font: 'font-[Pretendard_GOV] font-medium',
    leading: typographyTokens.lineHeight['line-height-4'],
  },
  'small-inner': {
    px: spacingTokens['spacing-12'],
    py: spacingTokens['spacing-10'],
    text: typographyTokens.fontSize['font-13'],
    radius: radiusTokens['radius-sm'],
    icon: 'size-4',
    gap: spacingTokens['spacing-4'],
    font: 'font-[Pretendard_GOV] font-medium',
    leading: typographyTokens.lineHeight['line-height-4'],
  },
  pill: {
    px: spacingTokens['spacing-16'],
    py: spacingTokens['spacing-8'],
    text: typographyTokens.fontSize['font-14'],
    radius: radiusTokens['radius-pill'],
    icon: 'size-5',
    gap: spacingTokens['spacing-8'],
    font: 'font-[Pretendard_GOV] font-medium',
    leading: typographyTokens.lineHeight['line-height-4'],
  },
};

// 버튼 클래스 계산 (정적 Tailwind 유틸리티만)
const buttonClasses = computed(() => [
  'inline-flex',
  'items-center',
  'justify-center',
  'relative',
  'select-none',
  'transition-all',
  'duration-150',
  'ease-in-out',
  props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
]);

// 인라인 스타일 바인딩 (디자인토큰 기반, 동적 값만)
const buttonStyle = computed(() => {
  const s = sizeStyle[props.size];
  const v = props.disabled ? variantStyle.disabled : variantStyle[props.variant];
  console.log('borderRadius:', s.radius); // 실제 반영값 확인용
  return {
    backgroundColor: v.bg,
    color: v.text,
    border: `1px solid ${v.border}`,
    paddingLeft: s.px,
    paddingRight: s.px,
    paddingTop: s.py,
    paddingBottom: s.py,
    fontSize: s.text,
    borderRadius: s.radius,
    gap: s.gap,
    lineHeight: s.leading,
    fontFamily: s.font.includes('font-[') ? undefined : s.font,
    fontWeight: s.font.includes('font-semibold')
      ? 600
      : s.font.includes('font-medium')
        ? 500
        : undefined,
    // TODO: hover, active, focus 등 상태별 스타일은 별도 구현 필요
  };
});

// 아이콘 클래스
const iconClass = computed(() => sizeStyle[props.size].icon);

// 클릭 핸들러
const handleClick = (e: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', e);
  }
};
</script>

<template>
  <button
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
    type="button"
    :aria-label="
      (() => {
        const slot = $slots.default?.();
        const text = slot && typeof slot[0]?.children === 'string' ? slot[0].children : 'Button';
        return subText ? `${text} ${subText}` : text;
      })()
    "
  >
    <!-- 왼쪽 아이콘 -->
    <span v-if="icon && iconPlacement === 'left'" :class="iconClass">
      <component :is="icon" />
    </span>

    <!-- 메인 텍스트 -->
    <span class="flex items-center">
      <slot>Button</slot>
    </span>

    <!-- 서브 텍스트 -->
    <span v-if="subText" class="block text-[16px] font-semibold leading-5 ml-1">
      {{ subText }}
    </span>

    <!-- 오른쪽 아이콘 -->
    <span v-if="icon && iconPlacement === 'right'" :class="iconClass">
      <component :is="icon" />
    </span>

    <!-- 로딩 인디케이터 -->
    <span v-if="loading" class="ml-2 animate-spin">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* PostCSS @apply 사용 (필요한 경우만) */
/* Pretendard GOV 폰트는 TailwindCSS arbitrary value로 처리 */
</style>
