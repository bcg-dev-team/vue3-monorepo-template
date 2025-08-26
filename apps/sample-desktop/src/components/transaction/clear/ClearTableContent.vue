<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <template #content>
          <BaseTable
            :headers="summaryHeaders"
            :data="summaryData"
            :selectable="true"
            :sortable="true"
          />
        </template>
      </LabelContent>
    </div>
    <div>
      <LabelContent label="상세내역" size="lg">
        <template #content>
          <BaseTable
            :headers="detailHeaders"
            :data="detailData"
            :selectable="true"
            :sortable="true"
          />
        </template>
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseTable, type TableHeader, type TableRow } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';

const summaryHeaders: TableHeader[] = [
  { key: 'type', title: '구분', width: '100px', align: 'center' },
  { key: 'purchaseAmount', title: '매입금액($)', width: '120px', align: 'right' },
  { key: 'liquidationAmount', title: '청산금액($)', width: '120px', align: 'right' },
  { key: 'liquidationPnL', title: '청산손익($)', width: '120px', align: 'right' },
  { key: 'returnRate', title: '수익률(%)', width: '100px', align: 'right' },
  { key: 'commission', title: '수수료($)', width: '100px', align: 'right' },
  { key: 'swap', title: '스왑($)', width: '100px', align: 'right' },
  { key: 'netPnL', title: '순손익($)', width: '120px', align: 'right' },
  { key: 'netReturnRate', title: '순수익률(%)', width: '120px', align: 'right' },
];

const summaryData: TableRow[] = [
  {
    id: 1,
    type: 'LONG',
    purchaseAmount: '32,189.48',
    liquidationAmount: '34,120.85',
    liquidationPnL: '1,931.37',
    returnRate: '6.00',
    commission: '2.00',
    swap: '2',
    netPnL: '1,929.37',
    netReturnRate: '5.99',
  },
  {
    id: 2,
    type: 'SHORT',
    purchaseAmount: '59,409.18',
    liquidationAmount: '57,626.90',
    liquidationPnL: '-1,782.28',
    returnRate: '-3.00',
    commission: '2.00',
    swap: '2',
    netPnL: '-1,784.28',
    netReturnRate: '-3.00',
  },
];

const detailHeaders: TableHeader[] = [
  { key: 'liquidationDate', title: '청산일자', width: '120px', align: 'center' },
  { key: 'itemCode', title: '종목코드', width: '100px', align: 'center' },
  { key: 'longShort', title: 'L/S', width: '80px', align: 'center' },
  { key: 'purchasePrice', title: '매입가격', width: '100px', align: 'right' },
  { key: 'liquidationPrice', title: '청산가격', width: '100px', align: 'right' },
  { key: 'liquidationQuantity', title: '청산수량', width: '100px', align: 'right' },
  { key: 'liquidationPnL', title: '청산손익($)', width: '120px', align: 'right' },
  { key: 'commission', title: '수수료($)', width: '100px', align: 'right' },
  { key: 'swap', title: '스왑($)', width: '100px', align: 'right' },
  { key: 'netPnL', title: '순손익($)', width: '120px', align: 'right' },
  { key: 'purchaseTime', title: '매입일시', width: '140px', align: 'center' },
  { key: 'liquidationTime', title: '청산일시', width: '140px', align: 'center' },
];

const detailData: TableRow[] = [
  {
    id: 1,
    liquidationDate: '16:15:04',
    itemCode: 'AUDNZD',
    longShort: 'LONG',
    purchasePrice: '1.10088',
    liquidationPrice: '1.10089',
    liquidationQuantity: '0.5',
    liquidationPnL: '592.10',
    commission: '1.10',
    swap: '1.10',
    netPnL: '502.10',
    purchaseTime: '09:11:10',
    liquidationTime: '16:15:04',
  },
  {
    id: 2,
    liquidationDate: '2025-07-02',
    itemCode: 'CHFJPY',
    longShort: 'SHORT',
    purchasePrice: '169.435',
    liquidationPrice: '169.435',
    liquidationQuantity: '0.5',
    liquidationPnL: '16.94',
    commission: '1.10',
    swap: '16.94',
    netPnL: '-10.10',
    purchaseTime: '2025-06-30 13:29:50',
    liquidationTime: '15:30:22',
  },
];
</script>
