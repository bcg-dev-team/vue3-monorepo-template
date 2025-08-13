<template>
  <BaseTable :headers="headers" :data="data" :selectable="true" :sortable="true" />
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';

const headers: TableHeader[] = [
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'left' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'liquidationPL', title: '청산손익($)', width: '120px', align: 'right' },
  { key: 'commission', title: '수수료($)', width: '100px', align: 'right' },
];

const data: TableRow[] = [
  {
    id: 1,
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    liquidationPL: -621.93,
    commission: 0,
  },
  {
    id: 2,
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    liquidationPL: -14.38,
    commission: 0,
  },
];
</script>
