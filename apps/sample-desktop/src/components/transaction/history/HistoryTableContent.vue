<template>
  <div>
    <LabelContent label="상세내역" size="lg">
      <BaseTable :headers="detailHeaders" :data="detailData" :selectable="true" :sortable="true" />
    </LabelContent>
  </div>
</template>
<script setup lang="ts">
import LabelContent from '@/components/transaction/common/LabelContent.vue';
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';

const detailHeaders: TableHeader[] = [
  { key: 'settlementDate', title: '결제일자', width: '120px', align: 'center' },
  { key: 'description', title: '적요명', width: '200px', align: 'left' },
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'center' },
  { key: 'currency', title: '통화', width: '80px', align: 'center' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'type', title: '유형', width: '100px', align: 'center' },
  { key: 'executedQuantity', title: '체결수량', width: '100px', align: 'right' },
  { key: 'executedPrice', title: '체결가격', width: '100px', align: 'right' },
  { key: 'executedAmount', title: '체결금액', width: '100px', align: 'right' },
  { key: 'settlementAmount', title: '결제금액($)', width: '120px', align: 'right' },
  { key: 'balanceQuantityBefore', title: '잔고수량 이전', width: '100px', align: 'right' },
  { key: 'balanceQuantityAfter', title: '잔고수량 이후', width: '100px', align: 'right' },
  { key: 'depositBefore', title: '예수금($) 이전', width: '120px', align: 'right' },
  { key: 'depositAfter', title: '예수금($) 이후', width: '120px', align: 'right' },
];

const detailData: TableRow[] = [
  {
    id: 1,
    settlementDate: '2025-05-20',
    description: '청산손익 적요출금',
    itemCode: '',
    currency: '',
    longShort: 'LONG',
    type: '적요출금',
    executedQuantity: '0',
    executedPrice: '0',
    executedAmount: '0',
    settlementAmount: '1',
    balanceQuantityBefore: '0',
    balanceQuantityAfter: '0',
    depositBefore: '100,034.5',
    depositAfter: '100,033.5',
  },
  {
    id: 2,
    settlementDate: '2025-05-20',
    description: '이체출금',
    itemCode: '',
    currency: '',
    longShort: 'SHORT',
    type: '출금',
    executedQuantity: '0',
    executedPrice: '0',
    executedAmount: '0',
    settlementAmount: '500',
    balanceQuantityBefore: '0',
    balanceQuantityAfter: '0',
    depositBefore: '100,033.5',
    depositAfter: '99,533.5',
  },
  {
    id: 3,
    settlementDate: '2025-05-20',
    description: '이체출금',
    itemCode: '',
    currency: '',
    longShort: 'SHORT',
    type: '출금',
    executedQuantity: '0',
    executedPrice: '0',
    executedAmount: '0',
    settlementAmount: '100',
    balanceQuantityBefore: '0',
    balanceQuantityAfter: '0',
    depositBefore: '99,533.5',
    depositAfter: '99,433.5',
  },
];
</script>
