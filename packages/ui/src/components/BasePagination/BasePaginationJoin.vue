<!--
  Figma 컴포넌트: Icon/pagination-join (node-id: 152-4581)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=152-4581&m=dev
  - status(페이지 수): 기본 5개, n개로 확장 가능
  - current(활성 인덱스): 0부터 시작
  - 디자인 토큰: bg-surface-muted(#dadbdd), primary(#ffc300), radius-pill(rounded-full)
-->
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /**
   * 전체 indicator 개수 (페이지 수)
   *
   * 기본값은 5개이며, 2개 이상 10개 이하로 설정할 수 있습니다.
   *
   * @description 페이지네이션에서 총 페이지 수를 나타내는 indicator의 개수입니다. 기본값은 5개이며, 2개 이상 10개 이하로 설정할 수 있습니다.
   * @default 5
   * @minimum 2
   * @maximum 10
   */
  count?: number;
  /**
   * 현재 활성 인덱스 (0부터 시작)
   *
   * @description 현재 선택된 페이지의 인덱스입니다. 0부터 시작하며, count보다 작은 값이어야 합니다.
   * @default 0
   * @minimum 0
   */
  current?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  current: 0,
});

const items = computed(() => Array.from({ length: props.count }));
</script>

<template>
  <div class="flex flex-row gap-2 items-center justify-start p-0 h-4 min-h-4">
    <template v-for="(_, idx) in items" :key="idx">
      <div
        v-if="idx === current"
        class="bg-icon-on h-2 w-10 rounded-full shrink-0 transition-all duration-200"
        style="min-height: 0.5rem; min-width: 2.5rem"
      />
      <div
        v-else
        class="bg-bg-surface-muted h-2 w-2 rounded-full shrink-0 transition-all duration-200"
        style="min-height: 0.5rem; min-width: 0.5rem"
      />
    </template>
  </div>
</template>
