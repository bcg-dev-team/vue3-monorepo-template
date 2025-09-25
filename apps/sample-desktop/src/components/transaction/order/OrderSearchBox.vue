<template>
  <div class="gap-size-8 pt-padding-24 flex items-end">
    <div class="gap-size-36 flex items-end">
      <div>
        <BaseRadioGroup
          v-model="positionCd"
          label="L / S"
          size="md"
          :options="[
            { value: POSITION_CODE.total, label: '전체' },
            { value: POSITION_CODE.long, label: 'LONG' },
            { value: POSITION_CODE.short, label: 'SHORT' },
          ]"
        />
      </div>
      <div>
        <BaseRadioGroup
          v-model="orderCd"
          label="구분"
          size="md"
          :options="[
            { value: ORDER_CODE.total, label: '전체' },
            { value: ORDER_CODE.buy, label: '매입' },
            { value: ORDER_CODE.clear, label: '청산' },
          ]"
        />
      </div>
      <div>
        <PeriodSelect title="주문일자" @period-change="handlePeriodChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { POSITION_CODE, ORDER_CODE } from '@/components/transaction/constants/searchBoxCod';
import PeriodSelect from '@/components/transaction/common/PeriodSelect.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { BaseRadioGroup } from '@template/ui';
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';

const tradeSearchStore = useTradeSearchStore();
const { positionCd, orderCd } = storeToRefs(tradeSearchStore);

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

onMounted(() => {
  // 마운트 시점에 기본값을 설정 (스토어 초기값은 빈 값)
  if (!positionCd.value) tradeSearchStore.setPositionCd(POSITION_CODE.total);
  if (!orderCd.value) tradeSearchStore.setOrderCd(ORDER_CODE.total);
});

onUnmounted(() => {
  tradeSearchStore.reset();
});
</script>
