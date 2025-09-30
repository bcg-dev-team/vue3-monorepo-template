<template>
  <div class="gap-size-8 pt-padding-24 flex items-end">
    <div class="gap-size-36 flex items-end">
      <div>
        <PeriodSelect title="결제일자" @period-change="handlePeriodChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PeriodSelect from '@/components/transaction/common/PeriodSelect.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { onUnmounted } from 'vue';

const tradeSearchStore = useTradeSearchStore();

/**
 * 기간 변경 이벤트 핸들러
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param periodType - 선택된 기간 타입
 */
/**
 * 기간 변경 시 스토어에 시작/종료일을 저장합니다.
 * @param startDate - 시작 날짜(yyyy-MM-dd)
 * @param endDate - 종료 날짜(yyyy-MM-dd)
 */
const handlePeriodChange = (startDate: string, endDate: string) => {
  tradeSearchStore.setOrderPeriod(startDate, endDate);
};

onUnmounted(() => {
  tradeSearchStore.reset();
});
</script>
