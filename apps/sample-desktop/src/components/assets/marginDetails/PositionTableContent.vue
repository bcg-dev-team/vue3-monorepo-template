<template>
  <BaseTable :headers="headers" :data="data" :selectable="true" :sortable="true" />
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';

const headers: TableHeader[] = [
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'left' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'quantity', title: '수량', width: '80px', align: 'right' },
  { key: 'price', title: '가격', width: '100px', align: 'right' },
  { key: 'margin', title: '증거금($)', width: '100px', align: 'right' },
  { key: 'valuationPL', title: '평가손익($)', width: '120px', align: 'right' },
  { key: 'commission', title: '수수료($)', width: '100px', align: 'right' },
  { key: 'marginRate', title: '증거금율(%)', width: '100px', align: 'right' },
];

const data: TableRow[] = [
  {
    id: 1,
    itemCode: 'AUDNZD',
    longShort: 'L',
    quantity: 0.5,
    price: 1.10088,
    margin: 63.29,
    valuationPL: -621.93,
    commission: 0,
    marginRate: 0.2,
  },
  {
    id: 2,
    itemCode: 'AUDUSD',
    longShort: 'S',
    quantity: 0.5,
    price: 169435,
    margin: 1.23,
    valuationPL: -14.38,
    commission: 0,
    marginRate: 0.2,
  },
  {
    id: 3,
    itemCode: 'AUDUSD',
    longShort: 'L',
    quantity: 0.5,
    price: 169435,
    margin: 1.23,
    valuationPL: -14.38,
    commission: 0,
    marginRate: 0.2,
  },
  {
    id: 4,
    itemCode: 'AUDUSD',
    longShort: 'S',
    quantity: 0.5,
    price: 169435,
    margin: 1.23,
    valuationPL: -14.38,
    commission: 0,
    marginRate: 0.2,
  },
];
</script>
