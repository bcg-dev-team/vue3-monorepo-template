<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <BaseTable
          :headers="summaryHeaders"
          :data="summaryData"
          :selectable="true"
          :sortable="true"
        />
      </LabelContent>
    </div>
    <div>
      <LabelContent label="상세내역역" size="lg">
        <BaseTable
          :headers="detailHeaders"
          :data="detailData"
          :selectable="true"
          :sortable="true"
        />
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';

const summaryHeaders: TableHeader[] = [
  { key: 'currency', title: '통화', width: '120px', align: 'center' },
  { key: 'buy_quantity', title: '매입수량', width: '110px', align: 'right' },
  { key: 'buy_amount', title: '매입금액', width: '110px', align: 'right' },
  { key: 'buy_clear_quntity', title: '청산수량', width: '110px', align: 'right' },
  { key: 'buy_clear_amount', title: '청산금액', width: '110px', align: 'right' },
  { key: 'sell_quantity', title: '매도수량', width: '110px', align: 'right' },
  { key: 'sell_amount', title: '매도금액', width: '110px', align: 'right' },
  { key: 'sell_clear_quantity', title: '청산수량', width: '110px', align: 'right' },
  { key: 'sell_clear_amount', title: '청산금액', width: '110px', align: 'right' },
];

const summaryData: TableRow[] = [
  {
    id: 1,
    currency: 'JPY',
    buy_quantity: '1',
    buy_amount: '169,486',
    buy_clear_quntity: '0',
    buy_clear_amount: '0',
    sell_quantity: '1',
    sell_amount: '168,435',
    sell_clear_quantity: '0.5',
    sell_clear_amount: '84,717.50',
  },
  {
    id: 2,
    currency: 'NZD',
    buy_quantity: '100',
    buy_amount: '100',
    buy_clear_quntity: '100',
    buy_clear_amount: '100',
    sell_quantity: '100',
    sell_amount: '100',
    sell_clear_quantity: '100',
    sell_clear_amount: '100',
  },
];

const detailHeaders: TableHeader[] = [
  { key: 'orderDate', title: '주문일자', width: '120px', align: 'center' },
  { key: 'order', title: '주문', width: '80px', align: 'center' },
  { key: 'originalOrder', title: '원주문', width: '80px', align: 'center' },
  { key: 'execution', title: '체결', width: '80px', align: 'center' },
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'center' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'type', title: '구분', width: '80px', align: 'center' },
  { key: 'orderQuantity', title: '주문수량', width: '100px', align: 'right' },
  { key: 'orderPrice', title: '주문가격', width: '100px', align: 'right' },
  { key: 'executedQuantity', title: '체결수량', width: '100px', align: 'right' },
  { key: 'executedPrice', title: '체결가격', width: '100px', align: 'right' },
  { key: 'unexecuted', title: '미체결', width: '100px', align: 'right' },
  { key: 'correctionQuantity', title: '정정수량', width: '100px', align: 'right' },
  { key: 'cancellationQuantity', title: '취소수량', width: '100px', align: 'right' },
  { key: 'bidAskPrice', title: '호가', width: '100px', align: 'right' },
  { key: 'status', title: '상태', width: '80px', align: 'center' },
  { key: 'orderTime', title: '주문일시', width: '100px', align: 'center' },
  { key: 'confirmationTime', title: '확인일시', width: '100px', align: 'center' },
  { key: 'rejectionReason', title: '거부사유', width: '120px', align: 'center' },
];

const detailData: TableRow[] = [
  {
    id: 1,
    orderDate: '15:32:45',
    order: '1',
    originalOrder: '1',
    execution: '1',
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    type: '매수',
    orderQuantity: '1',
    orderPrice: '1.100',
    executedQuantity: '1.100',
    executedPrice: '1.100',
    unexecuted: '1.100',
    correctionQuantity: '1.100',
    cancellationQuantity: '1.100',
    bidAskPrice: '1.100',
    status: '-',
    orderTime: '1.100',
    confirmationTime: '1.100',
    rejectionReason: '-',
  },
  {
    id: 2,
    orderDate: '14:28:12',
    order: '2',
    originalOrder: '2',
    execution: '2',
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    type: '매도',
    orderQuantity: '1',
    orderPrice: '169.400',
    executedQuantity: '169.400',
    executedPrice: '169.400',
    unexecuted: '169.400',
    correctionQuantity: '169.400',
    cancellationQuantity: '169.400',
    bidAskPrice: '169.400',
    status: '-',
    orderTime: '169.400',
    confirmationTime: '169.400',
    rejectionReason: '-',
  },
  {
    id: 3,
    orderDate: '13:45:33',
    order: '1',
    originalOrder: '1',
    execution: '1',
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    type: '매수',
    orderQuantity: '1',
    orderPrice: '1.100',
    executedQuantity: '1.100',
    executedPrice: '1.100',
    unexecuted: '1.100',
    correctionQuantity: '1.100',
    cancellationQuantity: '1.100',
    bidAskPrice: '1.100',
    status: '-',
    orderTime: '1.100',
    confirmationTime: '1.100',
    rejectionReason: '-',
  },
  {
    id: 4,
    orderDate: '12:15:22',
    order: '2',
    originalOrder: '3',
    execution: '2',
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    type: '매도',
    orderQuantity: '1',
    orderPrice: '169.400',
    executedQuantity: '169.400',
    executedPrice: '169.400',
    unexecuted: '169.400',
    correctionQuantity: '169.400',
    cancellationQuantity: '169.400',
    bidAskPrice: '169.400',
    status: '-',
    orderTime: '169.400',
    confirmationTime: '169.400',
    rejectionReason: '-',
  },
  {
    id: 5,
    orderDate: '11:42:18',
    order: '1',
    originalOrder: '1',
    execution: '1',
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    type: '매수',
    orderQuantity: '1',
    orderPrice: '1.100',
    executedQuantity: '1.100',
    executedPrice: '1.100',
    unexecuted: '1.100',
    correctionQuantity: '1.100',
    cancellationQuantity: '1.100',
    bidAskPrice: '1.100',
    status: '-',
    orderTime: '1.100',
    confirmationTime: '1.100',
    rejectionReason: '-',
  },
  {
    id: 6,
    orderDate: '2025-05-20',
    order: '2',
    originalOrder: '2',
    execution: '2',
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    type: '매도',
    orderQuantity: '1',
    orderPrice: '169.400',
    executedQuantity: '169.400',
    executedPrice: '169.400',
    unexecuted: '169.400',
    correctionQuantity: '169.400',
    cancellationQuantity: '169.400',
    bidAskPrice: '169.400',
    status: '-',
    orderTime: '169.400',
    confirmationTime: '169.400',
    rejectionReason: '-',
  },
  {
    id: 7,
    orderDate: '2025-05-19',
    order: '1',
    originalOrder: '1',
    execution: '1',
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    type: '매수',
    orderQuantity: '1',
    orderPrice: '1.100',
    executedQuantity: '1.100',
    executedPrice: '1.100',
    unexecuted: '1.100',
    correctionQuantity: '1.100',
    cancellationQuantity: '1.100',
    bidAskPrice: '1.100',
    status: '-',
    orderTime: '1.100',
    confirmationTime: '1.100',
    rejectionReason: '-',
  },
];
</script>
