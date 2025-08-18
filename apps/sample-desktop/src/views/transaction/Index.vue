<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="lg">
        <template #content>
          <div>
            <BaseTabs v-model="modelValue" size="lg" variant="underline" :tabs="tabs" />
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <OrderTableContent v-if="modelValue === 'order'" />
          <ClearTableContent v-if="modelValue === 'clear'" />
          <HistoryTableContent v-if="modelValue === 'history'" />
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import HistoryTableContent from '@/components/transaction/history/HistoryTableContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import HistorySearchBox from '@/components/transaction/history/HistorySearchBox.vue';
import OrderTableContent from '@/components/transaction/order/OrderTableContent.vue';
import ClearTableContent from '@/components/transaction/clear/ClearTbaleContent.vue';
import OrderSearchBox from '@/components/transaction/order/OrderSearchBox.vue';
import ClearSearchBox from '@/components/transaction/clear/ClearSearchBox.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('order');

const tabs = {
  주문체결: {
    value: 'order',
    component: OrderSearchBox,
  },
  청산손익: {
    value: 'clear',
    component: ClearSearchBox,
  },
  결제내역: {
    value: 'history',
    component: HistorySearchBox,
  },
};
</script>
