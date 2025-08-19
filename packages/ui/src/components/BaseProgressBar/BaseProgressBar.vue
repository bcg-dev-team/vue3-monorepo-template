<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 강도 표시를 위한 연속적 진행바 컴포넌트
-->
<template>
  <div class="base-progress-bar" :class="[`base-progress-bar--${variant}`]">
    <!-- 진행바 -->
    <div class="base-progress-bar__track" :class="trackColorClass">
      <div
        class="base-progress-bar__fill"
        :class="progressColorClass"
        :style="{
          width: `${progressPercentage}%`,
          borderRadius: props.variant === 'performance' ? '999px 0 0 999px' : '999px',
        }"
      />
    </div>

    <!-- 라벨 (선택사항) -->
    <div
      v-if="showLabel"
      class="base-progress-bar__label"
      :class="[`base-progress-bar__label--${variant}`, labelColorClass]"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** 진행률 (0-100) */
  value?: number;
  /** 최대값 */
  max?: number;
  /** 진행바 변형 */
  variant?: 'default' | 'password-strength' | 'performance';
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 커스텀 라벨 */
  label?: string;
  /** 비밀번호 강도 점수 (0-4) */
  strengthScore?: 0 | 1 | 2 | 3 | 4;
  /** 트랙 색상 클래스 */
  trackColorClass?: string;
  /** 채우기 색상 클래스 (기본 variant용) */
  fillColorClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  variant: 'default',
  showLabel: false,
  trackColorClass: 'bg-bg-bg-surface',
  fillColorClass: 'bg-blue-blue800-deep',
});

// 진행률 계산
const progressPercentage = computed(() => {
  if (props.variant === 'password-strength') {
    // 비밀번호 강도: 0-4 → 20%-100%
    const score = props.strengthScore || 0;
    return (score + 1) * 20; // 20%, 40%, 60%, 80%, 100%
  }

  // 일반 진행바: value/max 기반
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100);
});

// 진행바 색상 클래스 계산
const progressColorClass = computed(() => {
  if (props.variant === 'password-strength') {
    const score = props.strengthScore || 0;
    const colorClasses = [
      'bg-red-red800', // 0: 매우 약함
      'bg-red-red800', // 1: 약함
      'bg-primary-primary800', // 2: 보통
      'bg-blue-blue800-deep', // 3: 강함
      'bg-green-green800', // 4: 매우 강함
    ];
    return colorClasses[score];
  }

  return props.fillColorClass;
});

// 라벨 색상 클래스 계산
const labelColorClass = computed(() => {
  if (props.variant === 'password-strength') {
    const score = props.strengthScore || 0;
    const colorClasses = [
      'text-red', // 0: 매우 약함
      'text-red', // 1: 약함
      'text-primary', // 2: 보통
      'text-blue', // 3: 강함
      'text-green', // 4: 매우 강함
    ];
    return colorClasses[score];
  }

  return 'text-default';
});

// 라벨 텍스트 계산
const label = computed(() => {
  if (props.label) return props.label;

  if (props.variant === 'password-strength') {
    const labels = ['매우 약함', '약함', '보통', '강함', '매우 강함'];
    return labels[props.strengthScore || 0] || labels[0];
  } else if (props.variant === 'performance') {
    return;
  }

  return `${Math.round(progressPercentage.value)}%`;
});
</script>
