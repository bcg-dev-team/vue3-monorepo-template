<template>
  <LabelContent label="보유 포지션" size="lg">
    <template #count>
      <div
        class="rounded-xs flex h-[18px] w-[15px] items-center justify-center bg-[var(--trade-long-background)]"
      >
        <span class="text-red text-[11px] font-medium">2</span>
      </div>
    </template>
    <template #content>
      <BaseTable :headers="headers" :data="data" :selectable="true" :sortable="true" />
    </template>
  </LabelContent>
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';

const headers: TableHeader[] = [
  { key: 'symbol', title: '심볼', width: '120px', align: 'left' },
  { key: 'bookQuantity', title: '장부수량', width: '100px', align: 'right' },
  { key: 'bookPrice', title: '장부가격', width: '100px', align: 'right' },
  { key: 'liquidationAvailable', title: '청산가능', width: '100px', align: 'right' },
  { key: 'currentPrice', title: '현재가', width: '100px', align: 'right' },
  { key: 'unrealizedPL', title: '평가손익($)', width: '120px', align: 'right' },
  { key: 'liquidationPL', title: '청산손익($)', width: '120px', align: 'right' },
  { key: 'tradingPL', title: '매매손익($)', width: '120px', align: 'right' },
  { key: 'returnRate', title: '수익률(%)', width: '100px', align: 'right' },
  { key: 'swap', title: '스왑($)', width: '80px', align: 'right' },
  { key: 'commission', title: '수수료($)', width: '80px', align: 'right' },
  { key: 'netPL', title: '순손익($)', width: '120px', align: 'right' },
  { key: 'netReturnRate', title: '순수익률(%)', width: '100px', align: 'right' },
];

const data: TableRow[] = [
  {
    id: 1,
    symbol: 'EURUSD',
    bookQuantity: 1.5,
    bookPrice: 1.10088,
    liquidationAvailable: 1.5,
    currentPrice: 1.07951,
    unrealizedPL: -621.93,
    liquidationPL: -2.93,
    tradingPL: 32.1,
    returnRate: 10.1,
    swap: 2.0,
    commission: 2.0,
    netPL: 30.81,
    netReturnRate: 8.1,
  },
  {
    id: 2,
    symbol: 'GBPUSD',
    bookQuantity: 2.5,
    bookPrice: 1.17845,
    liquidationAvailable: 2.5,
    currentPrice: 1.17892,
    unrealizedPL: 117.5,
    liquidationPL: 117.5,
    tradingPL: 32.1,
    returnRate: 10.1,
    swap: 2.0,
    commission: 2.0,
    netPL: 30.81,
    netReturnRate: 8.1,
  },
];
</script>
