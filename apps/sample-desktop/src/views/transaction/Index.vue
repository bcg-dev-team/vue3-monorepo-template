<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="lg">
        <template #content>
          <div>
            <BaseTabs
              direction="horizontal"
              v-model="modelValue"
              showContent
              size="md"
              variant="connected"
              :tabs="tabs"
            />
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <OrderTableContent v-if="modelValue === 'order'" />
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import OrderTableContent from '@/components/transaction/order/OrderTableContent.vue';
import OrderSearchBox from '@/components/transaction/order/OrderSearchBox.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs, type TabItem } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('order');
const tabs = [
  { value: 'order', label: '주문체결', content: OrderSearchBox },
  { value: 'sell', label: '청산손익', content: '' },
  { value: 'history', label: '결제내역', content: '' },
] as TabItem[];
</script>
