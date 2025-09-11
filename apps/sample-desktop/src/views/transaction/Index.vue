<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="lg">
        <template #content>
          <div>
            <BaseTabs
              v-model="modelValue"
              size="lg"
              variant="underline"
              :tabs="tabs"
              @click="handleTabClick"
            />
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <router-view />
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
import ClearTableContent from '@/components/transaction/clear/ClearTableContent.vue';
import OrderSearchBox from '@/components/transaction/order/OrderSearchBox.vue';
import ClearSearchBox from '@/components/transaction/clear/ClearSearchBox.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

type Tab = 'order' | 'clear' | 'history';

const router = useRouter();
const modelValue = ref<Tab>((router.currentRoute.value.params.transactionTab as Tab) || 'order');

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

const handleTabClick = () => {
  router.push({ name: 'transaction', params: { transactionTab: modelValue.value } });
};
</script>
