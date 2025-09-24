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
    <div class="mb-[1px]">
      <BaseButton variant="contained" label="조회하기" size="md" @click="search" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { POSITION_CODE, ORDER_CODE } from '@/components/transaction/constants/searchBoxCod';
import PeriodSelect from '@/components/transaction/common/PeriodSelect.vue';
import { BaseButton, BaseRadioGroup } from '@template/ui';
import { ref } from 'vue';

const positionCd = ref(POSITION_CODE.total);
const orderCd = ref(ORDER_CODE.total);
const orderStartDate = ref('');
const orderEndDate = ref('');

/**
 * 기간 변경 이벤트 핸들러
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param periodType - 선택된 기간 타입
 */
const handlePeriodChange = (startDate: string, endDate: string) => {
  orderStartDate.value = startDate;
  orderEndDate.value = endDate;
};

const search = () => {
  console.log('orderCd', orderCd.value);
  console.log('positionCd', positionCd.value);
  console.log('orderStartDate', orderStartDate.value);
  console.log('orderEndDate', orderEndDate.value);
};
</script>
