<template>
  <div>
    <LabelContent label="상세내역" size="lg">
      <template #content>
        <div class="default-table">
          <!-- 데이터 그리드 -->
          <BaseDataGrid
            :column-defs="paymentDetailColumns"
            :row-data="props.detailData"
            :sortable="false"
            :filterable="false"
            :pagination="false"
          />
        </div>
      </template>
    </LabelContent>
  </div>
</template>
<script setup lang="ts">
import { paymentDetailColumns } from '@/components/transaction/constants/tableColumnDefs';
import LabelContent from '@/components/common/LabelContent.vue';
import { TradePaymentsHistoryDetail } from '@template/api';
import { BaseDataGrid } from '@template/ui';
import { onMounted } from 'vue';

const emits = defineEmits<{
  (e: 'loadInitialData'): void;
}>();

const props = defineProps<{
  detailData: TradePaymentsHistoryDetail[];
}>();

onMounted(() => {
  emits('loadInitialData');
});
</script>
