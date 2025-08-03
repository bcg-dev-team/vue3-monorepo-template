<script setup lang="ts">
/**
 * BaseSwitch - Figma 토글 스위치 컴포넌트 1:1 구현 (Headless UI Switch 활용)
 * @props modelValue - 토글 상태 (true: On, false: Off)
 * @props size - 스위치 크기 (small: 20px, regular: 24px)
 * @props disabled - 비활성화 여부
 * @emits update:modelValue - 토글 상태 변경 이벤트
 * @figma Button/Toggle(20px) (node-id: 36-182)
 */
import { Switch } from '@headlessui/vue';
import { computed } from 'vue';
import './BaseSwitch.scss';

interface Props {
  /**
   * 토글 상태
   * - true: On 상태
   * - false: Off 상태
   */
  modelValue: boolean;
  /**
   * 스위치 크기
   * - small: 20px 높이 (작은 토글)
   * - regular: 24px 높이 (기본 토글)
   */
  size?: 'small' | 'regular';
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'regular',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// 스위치 클래스 계산
const switchClasses = computed(() => {
  const classes = [
    'base-switch',
    'relative inline-flex cursor-pointer transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  ];

  if (props.size === 'small') {
    classes.push('w-[34px] h-[20px]');
  } else {
    classes.push('w-[50px] h-[24px]');
  }

  if (props.disabled) {
    classes.push('base-switch--disabled');
  }

  return classes.join(' ');
});

// 배경 클래스 계산
const backgroundClasses = computed(() => {
  const classes = [
    'base-switch__background',
    'absolute inset-0 rounded-full transition-all duration-200',
  ];

  if (props.modelValue) {
    classes.push('base-switch__background--on');
  } else {
    classes.push('base-switch__background--off');
  }

  return classes.join(' ');
});

// 썸 클래스 계산
const thumbClasses = computed(() => {
  const classes = [
    'base-switch__thumb',
    'absolute rounded-full transition-all duration-200',
  ];

  if (props.size === 'small') {
    // 20px 크기: 14px 썸
    classes.push('w-[14px] h-[14px] top-[3px]');
    if (props.modelValue) {
      classes.push('translate-x-[17px]'); // On 상태: 오른쪽으로 이동
    } else {
      classes.push('translate-x-[3px]'); // Off 상태: 왼쪽에 위치
    }
  } else {
    // 24px 크기: 20px 썸
    classes.push('w-[20px] h-[20px] top-[2px]');
    if (props.modelValue) {
      classes.push('translate-x-[28px]'); // On 상태: 오른쪽으로 이동
    } else {
      classes.push('translate-x-[2px]'); // Off 상태: 왼쪽에 위치
    }
  }

  return classes.join(' ');
});
</script>

<template>
  <Switch
    :model-value="modelValue"
    :disabled="disabled"
    :class="switchClasses"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <!-- 배경 -->
    <div :class="backgroundClasses" />

    <!-- 썸 (토글 핸들) -->
    <div :class="thumbClasses" />

    <!-- 스크린 리더용 라벨 -->
    <span class="sr-only">Toggle switch</span>
  </Switch>
</template> 