<!-- Figma: Stepper/stepper -->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';
import './BaseStepper.scss';

/**
 * 페이지네이션 조인 컴포넌트 (점과 선으로 구성된 진행 상태 표시)
 *
 * @props variant - 변수 타입 (기본값: 'label')
 * @props stepLabelList - 스텝 라벨 리스트
 * @props count - 전체 인디케이터 개수 (기본값: 5)
 * @props current - 현재 활성 인덱스 (0부터 시작, 기본값: 0)
 */
interface Props {
  /** 변수 타입 */
  variant: 'label' | 'dot';
  /** 스텝 라벨 리스트 */
  stepLabelList?: string[];
  /** 전체 인디케이터 개수 */
  count?: number;
  /** 현재 활성 인덱스 (0부터 시작) */
  current?: number;
}
const sampleStep = ['유형 선택', '금액 입력', '승인 완료'];

const props = withDefaults(defineProps<Props>(), {
  variant: 'dot',
  stepLabelList: () => [],
  count: 5,
  current: 0,
});

// 인디케이터 배열 생성
const indicators = computed(() => {
  if (props.variant === 'label') {
    return props.stepLabelList.map((_, index) => index);
  } else {
    return Array.from({ length: props.count }, (_, index) => index);
  }
});

// 인디케이터 클래스
const getIndicatorClasses = (index: number) =>
  `pagination-join-indicator ${
    index === props.current
      ? 'pagination-join-line pagination-join-line-active'
      : 'pagination-join-dot pagination-join-dot-inactive'
  }`;
</script>

<template>
  <!-- dot variant -->
  <div
    v-if="variant === 'dot'"
    class="pagination-join"
    :data-name="`Stepper/stepper`"
    :aria-label="`Step ${current + 1}`"
  >
    <div v-for="index in indicators" :key="index" :class="getIndicatorClasses(index)" />
  </div>

  <!-- label variant -->
  <div
    v-else-if="variant === 'label'"
    class="relative flex items-center justify-center gap-6"
    :data-name="`Stepper/stepper`"
    :aria-label="`Step ${current + 1}`"
  >
    <template v-for="(label, index) in stepLabelList" :key="index">
      <div class="relative flex shrink-0 flex-col items-center justify-start gap-2">
        <!-- 스텝 아이콘 -->
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full p-2"
          :class="index <= current ? 'bg-bg-primary' : 'bg-bg-bg-surface'"
        >
          <BaseIcon v-if="index <= current" name="check-circle" />
          <span v-else class="text-default-muted-dark text-base font-normal">{{ index + 1 }}</span>
        </div>

        <!-- 스텝 라벨 -->
        <div
          class="whitespace-nowrap text-center text-[14px] font-medium leading-[18px] tracking-[-0.35px]"
          :class="
            index <= current ? 'text-[var(--chips-status-pending-text)]' : 'text-default-muted'
          "
        >
          {{ label }}
        </div>
      </div>

      <div v-if="index < stepLabelList.length - 1" class="bg-bg-bg-outline h-0.5 w-20 shrink-0" />
    </template>
  </div>
</template>
