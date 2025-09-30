<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="lg">
        <template #content>
          <div class="flex items-end gap-2">
            <BaseTabs v-model="modelValue" size="lg" variant="underline" :tabs="tabs" />
            <div class="mb-[1px]">
              <BaseButton variant="contained" label="조회하기" size="md" @click="handleSearch" />
            </div>
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <OrderTableContent
            v-if="modelValue === 'order'"
            :summaryData="orderSummaryData"
            :detailData="orderDetailData"
            @loadInitialData="handleSearch"
          />
          <ClearTableContent
            v-if="modelValue === 'clear'"
            :summaryData="profitAndLossSummaryData"
            :detailData="profitAndLossDetailData"
            @loadInitialData="handleSearch"
          />
          <HistoryTableContent v-if="modelValue === 'history'" />
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>

<script setup lang="ts">
import {
  OrderSummary,
  TradePaymentsHistorySummary,
  TradeProfitAndLossSummary,
  TradeProfitAndLossRequest,
  OrderDetail,
  TradePaymentsHistoryDetail,
  TradeProfitAndLossDetail,
  TradeOrderListRequest,
} from '@template/api';
import { initialProfitAndLossSummary } from '@/components/transaction/constants/initialData';
import HistoryTableContent from '@/components/transaction/history/HistoryTableContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import HistorySearchBox from '@/components/transaction/history/HistorySearchBox.vue';
import OrderTableContent from '@/components/transaction/order/OrderTableContent.vue';
import ClearTableContent from '@/components/transaction/clear/ClearTableContent.vue';
import OrderSearchBox from '@/components/transaction/order/OrderSearchBox.vue';
import ClearSearchBox from '@/components/transaction/clear/ClearSearchBox.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { BaseTabs, BaseButton } from '@template/ui';
import { useRouter, useRoute } from 'vue-router';
import { tradeService } from '@/service/api';
import { computed, ref } from 'vue';

type Tab = 'order' | 'clear' | 'history';

const router = useRouter();
const route = useRoute();
const modelValue = computed<Tab>({
  get: () => (route.params.transactionTab as Tab) || 'order',
  set: (val: Tab) => {
    if ((route.params.transactionTab as Tab | undefined) !== val) {
      router.push({ name: 'transaction', params: { transactionTab: val } });
    }
  },
});

const tabs = [
  {
    key: 'order',
    label: '주문체결',
    component: OrderSearchBox,
  },
  {
    key: 'clear',
    label: '청산손익',
    component: ClearSearchBox,
  },
  {
    key: 'history',
    label: '결제내역',
    component: HistorySearchBox,
  },
];

const tradeSearchStore = useTradeSearchStore();

const orderSummaryData = ref<OrderSummary[]>([]);
const orderDetailData = ref<OrderDetail[]>([]);
const profitAndLossSummaryData = ref<TradeProfitAndLossSummary>(initialProfitAndLossSummary);
const profitAndLossDetailData = ref<TradeProfitAndLossDetail[]>([]);

const handleSearch = async () => {
  try {
    if (modelValue.value === 'order') {
      const queryParams: TradeOrderListRequest = {
        accountNo: '250929000009',
        accountPassword: '123456',
        positionCd: tradeSearchStore.positionCd,
        orderCd: tradeSearchStore.orderCd,
        orderStartDate: tradeSearchStore.orderStartDate,
        orderEndDate: tradeSearchStore.orderEndDate,
        nextKey: 0,
      };
      const response = await tradeService.getTradeOrderList(queryParams);
      orderSummaryData.value = response.data.summary;
      orderDetailData.value = response.data.details;
    } else if (modelValue.value === 'clear') {
      const queryParams: TradeProfitAndLossRequest = {
        accountNo: '250929000009',
        accountPassword: '123456',
        orderStartDate: tradeSearchStore.orderStartDate,
        orderEndDate: tradeSearchStore.orderEndDate,
        nextKey: 0,
      };

      const response = await tradeService.getTradeProfitAndLoss(queryParams);
      profitAndLossSummaryData.value = response.data.summary;
      profitAndLossDetailData.value = response.data.details;
    } else if (modelValue.value === 'history') {
      //TODO: 결제내역 조회
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
:deep([role='tabpanel']) {
  padding: 0px !important;
}
</style>
