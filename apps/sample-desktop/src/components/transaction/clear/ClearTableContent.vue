<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <template #content>
          <div class="default-table">
            <!-- 데이터 그리드 -->
            <BaseDataGrid
              :column-defs="profitAndLossSummaryColumns"
              :row-data="summaryDataArray"
              :sortable="false"
              :filterable="false"
              :pagination="false"
            />
          </div>
        </template>
      </LabelContent>
    </div>
    <div>
      <LabelContent label="상세내역" size="lg">
        <template #content>
          <div class="default-table">
            <!-- 데이터 그리드 -->
            <BaseDataGrid
              :column-defs="profitAndLossDetailColumns"
              :row-data="props.detailData"
              :sortable="false"
              :filterable="false"
              :pagination="false"
            />
          </div>
        </template>
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  profitAndLossSummaryColumns,
  profitAndLossDetailColumns,
} from '@/components/transaction/constants/tableColumnDefs';
import { TradeProfitAndLossSummary, TradeProfitAndLossDetail } from '@template/api';
import { BaseDataGrid, type TableHeader, type TableRow } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { onMounted, computed } from 'vue';

const emits = defineEmits<{
  (e: 'loadInitialData'): void;
}>();

const props = defineProps<{
  summaryData: TradeProfitAndLossSummary;
  detailData: TradeProfitAndLossDetail[];
}>();

/**
 * 요약 데이터를 LONG/SHORT 타입별로 분리하여 배열로 변환
 */
const summaryDataArray = computed(() => {
  const { summaryData } = props;

  const longData = {
    type: 'LONG',
    acquisitionPrice: summaryData.longAcquisitionPrice,
    liquidationPrice: summaryData.longLiquidationPrice,
    liquidationProfitLoss: summaryData.longLiquidationProfitLoss,
    liquidationProfitPercent: summaryData.longLiquidationProfitPercent,
    swapCharge: summaryData.longSwapCharge,
    executionCharge: summaryData.longExecutionCharge,
    liquidationNetProfitLoss: summaryData.longLiquidationNetProfitLoss,
    liquidationNetProfitPercent: summaryData.longLiquidationNetProfitPercent,
  };

  const shortData = {
    type: 'SHORT',
    acquisitionPrice: summaryData.shortAcquisitionPrice,
    liquidationPrice: summaryData.shortLiquidationPrice,
    liquidationProfitLoss: summaryData.shortLiquidationProfitLoss,
    liquidationProfitPercent: summaryData.shortLiquidationProfitPercent,
    swapCharge: summaryData.shortSwapCharge,
    executionCharge: summaryData.shortExecutionCharge,
    liquidationNetProfitLoss: summaryData.shortLiquidationNetProfitLoss,
    liquidationNetProfitPercent: summaryData.shortLiquidationNetProfitPercent,
  };

  return [longData, shortData];
});

onMounted(() => {
  emits('loadInitialData');
});
</script>
