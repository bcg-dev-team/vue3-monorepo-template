<template>
  <NButton
    :type="buttonType"
    :size="buttonSize"
    :loading="loading"
    :disabled="disabled"
    :block="fullWidth"
    :round="round"
    :circle="circle"
    :ghost="ghost"
    :secondary="secondary"
    :tertiary="tertiary"
    :quaternary="quaternary"
    :color="color"
    :text-color="textColor"
    :border-color="borderColor"
    @click="handleClick"
  >
    <template v-if="icon && iconPlacement === 'left'" #icon>
      <component :is="icon" />
    </template>

    <slot />

    <template v-if="icon && iconPlacement === 'right'" #icon>
      <component :is="icon" />
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NButton } from 'naive-ui';
import type { ButtonProps } from 'naive-ui';

/**
 * BaseButton 컴포넌트
 *
 * Naive UI를 기반으로 한 재사용 가능한 버튼 컴포넌트입니다.
 * 디자인 토큰을 활용하여 일관된 스타일을 제공합니다.
 *
 * @props variant - 버튼 스타일 변형 (primary, secondary, success, warning, danger, info)
 * @props size - 버튼 크기 (sm, md, lg)
 * @props type - HTML button 타입 (button, submit, reset)
 * @props disabled - 비활성화 상태
 * @props loading - 로딩 상태
 * @props fullWidth - 전체 너비 사용 여부
 * @props round - 둥근 모서리
 * @props circle - 원형 버튼
 * @props ghost - 고스트 스타일
 * @props secondary - 보조 스타일
 * @props tertiary - 3차 스타일
 * @props quaternary - 4차 스타일
 * @props color - 커스텀 색상
 * @props textColor - 텍스트 색상
 * @props borderColor - 테두리 색상
 * @props icon - 아이콘 컴포넌트
 * @props iconPlacement - 아이콘 위치 (left, right)
 * @emits click - 버튼 클릭 시 발생하는 이벤트
 */
interface Props {
  /** 버튼 스타일 변형 */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'default'
    | 'dashed'
    | 'text';
  /** 버튼 크기 */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
  /** HTML button 타입 */
  type?: 'button' | 'submit' | 'reset';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 둥근 모서리 */
  round?: boolean;
  /** 원형 버튼 */
  circle?: boolean;
  /** 고스트 스타일 */
  ghost?: boolean;
  /** 보조 스타일 */
  secondary?: boolean;
  /** 3차 스타일 */
  tertiary?: boolean;
  /** 4차 스타일 */
  quaternary?: boolean;
  /** 커스텀 색상 */
  color?: string;
  /** 텍스트 색상 */
  textColor?: string;
  /** 테두리 색상 */
  borderColor?: string;
  /** 아이콘 컴포넌트 */
  icon?: () => any;
  /** 아이콘 위치 */
  iconPlacement?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  round: false,
  circle: false,
  ghost: false,
  secondary: false,
  tertiary: false,
  quaternary: false,
  iconPlacement: 'left',
});

interface Emits {
  /** 버튼 클릭 이벤트 */
  (e: 'click', event: MouseEvent): void;
}

const emit = defineEmits<Emits>();

/**
 * Naive UI 버튼 타입으로 변환
 */
const buttonType = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'primary';
    case 'secondary':
      return 'default';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'error';
    case 'info':
      return 'info';
    default:
      return 'default';
  }
});

/**
 * Naive UI 버튼 크기로 변환
 */
const buttonSize = computed(() => {
  switch (props.size) {
    case 'tiny':
      return 'tiny';
    case 'small':
      return 'small';
    case 'medium':
      return 'medium';
    case 'large':
      return 'large';
    default:
      return 'medium';
  }
});

/**
 * 버튼 클릭 이벤트를 처리합니다.
 * disabled나 loading 상태가 아닐 때만 이벤트를 발생시킵니다.
 * @param event - 마우스 클릭 이벤트
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>
