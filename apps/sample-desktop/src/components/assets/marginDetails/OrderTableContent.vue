<template>
  <BaseTable :headers="headers" :data="data" :selectable="true" :sortable="true" />
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';

const headers: TableHeader[] = [
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'left' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'category', title: '구분', width: '80px', align: 'center' },
  { key: 'margin', title: '증거금($)', width: '100px', align: 'right' },
];

const data: TableRow[] = [
  {
    id: 1,
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    category: '매수',
    margin: 63.29,
  },
  {
    id: 2,
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    category: '매도',
    margin: 1.23,
  },
];
</script>
