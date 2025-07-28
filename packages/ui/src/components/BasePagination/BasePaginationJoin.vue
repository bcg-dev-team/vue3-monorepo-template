<!-- Figma: Pagination/pagination-join -->
<script setup lang="ts">
import './BasePaginationJoin.scss';
import { computed } from 'vue';

/**
 * 페이지네이션 조인 컴포넌트 (점과 선으로 구성된 진행 상태 표시)
 *
 * @props count - 전체 인디케이터 개수 (기본값: 5)
 * @props current - 현재 활성 인덱스 (0부터 시작, 기본값: 0)
 */
interface Props {
  /** 전체 인디케이터 개수 */
  count?: number;
  /** 현재 활성 인덱스 (0부터 시작) */
  current?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  current: 0,
});

// 인디케이터 배열 생성
const indicators = computed(() => Array.from({ length: props.count }, (_, index) => index));

// 인디케이터 클래스
const getIndicatorClasses = (index: number) => {
  const baseClasses = 'pagination-join-indicator';

  if (index === props.current) {
    return `${baseClasses} pagination-join-line pagination-join-line-active`;
  } else {
    return `${baseClasses} pagination-join-dot pagination-join-dot-inactive`;
  }
};
</script>

<template>
  <div class="pagination-join" :data-name="`Pagination/pagination-join`">
    <!-- 동적으로 생성되는 인디케이터들 -->
    <div v-for="index in indicators" :key="index" :class="getIndicatorClasses(index)" />
  </div>
</template>
