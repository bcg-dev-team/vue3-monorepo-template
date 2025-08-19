<!-- BaseListItemAvatar - 리스트 아이템 내부에서 사용하는 아바타 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseListItemAvatar - 리스트 아이템 내부에서 사용하는 아바타 컴포넌트
 *
 * 이 컴포넌트는 BaseListItem의 content 슬롯 내부에서 사용되어야 합니다.
 *
 * @props src - 아바타 이미지 URL
 * @props alt - 이미지 대체 텍스트
 * @props size - 아바타 크기 (sm, md, lg)
 * @props variant - 아바타 스타일 (circular, rounded, square)
 * @props icon - 직접 표시할 BaseIcon (src보다 우선순위 높음)
 * @props fallback - 이미지 로드 실패 시 표시할 텍스트 또는 아이콘
 * @props color - 아바타 색상 테마 (primary, red, blue, green, purple, custom)
 * @props backgroundColor - 커스텀 배경색 (color가 custom일 때 사용)
 * @props iconColor - 커스텀 아이콘 색상 (color가 custom일 때 사용)
 * @emits error - 이미지 로드 실패 시 발생
 */
import type { ButtonIconProps } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref } from 'vue';

interface Props {
  /** 아바타 이미지 URL */
  src?: string;
  /** 이미지 대체 텍스트 */
  alt?: string;
  /** 아바타 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 아바타 스타일 */
  variant?: 'circular' | 'rounded' | 'square';
  /** 직접 표시할 BaseIcon (src보다 우선순위 높음) */
  icon?: ButtonIconProps;
  /** 이미지 로드 실패 시 표시할 텍스트 또는 아이콘 */
  fallback?: string | ButtonIconProps;
  /** 아바타 색상 테마 */
  color?: 'default' | 'primary' | 'red' | 'blue' | 'green' | 'purple' | 'custom';
  /** 커스텀 배경색 (color가 custom일 때 사용) */
  backgroundColor?: string;
  /** 커스텀 아이콘 색상 (color가 custom일 때 사용) */
  iconColor?: string;
}

interface Emits {
  (e: 'error', error: Event): void;
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: '',
  size: 'md',
  variant: 'circular',
  icon: undefined,
  fallback: undefined,
  color: 'default',
  backgroundColor: undefined,
  iconColor: undefined,
});

const emit = defineEmits<Emits>();

const imageError = ref(false);

/**
 * 아바타 클래스 계산
 */
const avatarClasses = computed(() => {
  const classes = ['list-item-avatar'];

  classes.push(`list-item-avatar--${props.size}`);
  classes.push(`list-item-avatar--${props.variant}`);

  if (props.color !== 'default') {
    classes.push(`list-item-avatar--${props.color}`);
  }

  if (imageError.value) {
    classes.push('list-item-avatar--error');
  }

  return classes.join(' ');
});

/**
 * 아바타 크기 스타일 계산
 */
const avatarSize = computed(() => {
  const sizeMap = {
    sm: 'var(--base-size-size-40)',
    md: '44px',
    lg: 'var(--base-size-size-48)',
  };
  return sizeMap[props.size];
});

/**
 * 커스텀 스타일 계산
 */
const customStyles = computed(() => {
  if (props.color !== 'custom') return {};

  const styles: Record<string, string> = {};

  if (props.backgroundColor) {
    styles['--custom-background-color'] = props.backgroundColor;
  }

  if (props.iconColor) {
    styles['--custom-icon-color'] = props.iconColor;
  }

  return styles;
});

/**
 * 폴백 콘텐츠 렌더링
 */
const fallbackContent = computed(() => {
  if (!props.fallback) return null;

  if (typeof props.fallback === 'string') {
    return props.fallback;
  }

  return props.fallback;
});

/**
 * 이미지 에러 처리
 */
const handleImageError = (event: Event) => {
  imageError.value = true;
  emit('error', event);
};

/**
 * 이미지 로드 성공 처리
 */
const handleImageLoad = () => {
  imageError.value = false;
};
</script>

<template>
  <div :class="avatarClasses" :style="[{ width: avatarSize, height: avatarSize }, customStyles]">
    <!-- 직접 지정된 아이콘이 있는 경우 (최우선) -->
    <div v-if="icon" class="list-item-avatar__icon">
      <BaseIcon
        :name="icon.name"
        :size="icon.size || 'md'"
        class="list-item-avatar__icon-content"
      />
    </div>

    <!-- 이미지가 있고 에러가 없는 경우 -->
    <img
      v-else-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="list-item-avatar__image"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <!-- 폴백 콘텐츠 (이미지가 없거나 에러가 있는 경우) -->
    <div v-else class="list-item-avatar__fallback">
      <!-- 아이콘 폴백 -->
      <BaseIcon
        v-if="typeof fallback === 'object'"
        :name="fallback.name"
        :size="fallback.size || 'md'"
        class="list-item-avatar__fallback-icon"
      />
      <!-- 텍스트 폴백 -->
      <span v-else-if="typeof fallback === 'string'" class="list-item-avatar__fallback-text">
        {{ fallback }}
      </span>
      <!-- 기본 폴백 (사용자 아이콘) -->
      <BaseIcon v-else name="person" size="md" class="list-item-avatar__fallback-icon" />
    </div>
  </div>
</template>
