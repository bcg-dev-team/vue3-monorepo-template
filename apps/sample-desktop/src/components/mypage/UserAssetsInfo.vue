<template>
  <div class="p-6">
    <div class="text-lg font-bold">공지사항</div>
    <div class="border-l-4 pl-6 pr-4 mt-6 border-button-primary-border">
      <div>
        <span class="text-md font-regular">총 자산</span>
      </div>
      <div>
        <span class="text-2xl font-bold">$125,847.32</span>
      </div>
    </div>
    <div class="border-l-4 pl-6 pr-4 mt-6 border-button-red-border">
      <div>
        <span class="text-md font-regular">오늘 손익</span>
      </div>
      <div>
        <span class="text-2xl font-bold text-trade-buy">+$1,847.32</span>
      </div>
    </div>
    <div class="mt-6 flex flex-col gap-3">
      <SubCardContent v-for="(item, index) in assetsInfo" :key="index">
        <template #content>
          <div class="flex items-center justify-between py-3 px-4">
            <span class="text-md font-regular text-divider-muted">{{ item.title }}</span>
            <span
              class="text-md font-semibold"
              :class="{ 'text-trade-buy': item.title === '총 손익' }"
              >{{ item.value }}</span
            >
          </div>
        </template>
      </SubCardContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubCardContent from '@/components/common/cards/SubCardContent.vue';

interface AssetsInfo {
  title: string;
  value: string;
}

const assetsInfo: AssetsInfo[] = [
  {
    title: '총 손익',
    value: '-$23,456.78',
  },
  {
    title: '승률',
    value: '68.5%',
  },
  {
    title: '총 거래',
    value: '1,257 건',
  },
];
</script>
