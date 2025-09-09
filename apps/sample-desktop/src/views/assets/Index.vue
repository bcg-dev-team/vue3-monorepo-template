<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="내 자산" size="lg">
        <template #content>
          <div>
            <AssetsSummary />
          </div>
        </template>
      </MainCardContent>
      <CardLayoutHorizontal :columns="[4, 1]" gap="gap-3">
        <MainCardContent class="p-6">
          <template #content>
            <div>
              <HoldPosition />
            </div>
          </template>
        </MainCardContent>
        <MainCardContent class="p-6">
          <template #content>
            <div>
              <AssetsComposition />
            </div>
          </template>
        </MainCardContent>
      </CardLayoutHorizontal>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <LabelContent label="증거금 내역" size="lg">
            <template #content>
              <BaseTabs v-model="modelValue" size="md" variant="underline" :tabs="tabs" />
            </template>
          </LabelContent>
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import PositionTableContent from '@/components/assets/marginDetails/PositionTableContent.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import OrderTableContent from '@/components/assets/marginDetails/OrderTableContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import AssetsComposition from '@/components/assets/AssetsComposition.vue';
import AssetsSummary from '@/components/assets/AssetsSummary.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import HoldPosition from '@/components/assets/HoldPosition.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('position');

const tabs = [
  {
    key: 'position',
    label: '포지션',
    component: PositionTableContent,
  },
  {
    key: 'order',

    label: '주문',
    component: OrderTableContent,
  },
];
</script>
