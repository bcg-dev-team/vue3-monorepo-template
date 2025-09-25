<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <template #content>
          <div class="order-summary-table">
            <BaseDataGrid
              :column-defs="summaryColumnDefs"
              :row-data="[
                {
                  tradeCurrencyCd: 'USD',
                  longExecutionQuantity: 1000,
                  longExecutionPrice: 1350000,
                  reShortExecutionQuantity: 500,
                  reShortExecutionPrice: 675000,
                  shortExecutionQuantity: 800,
                  shortExecutionPrice: 1080000,
                  reLongExecutionQuantity: 300,
                  reLongExecutionPrice: 405000,
                },
                {
                  tradeCurrencyCd: 'USD',
                  longExecutionQuantity: 1000,
                  longExecutionPrice: 1350000,
                  reShortExecutionQuantity: 500,
                  reShortExecutionPrice: 675000,
                  shortExecutionQuantity: 800,
                  shortExecutionPrice: 1080000,
                  reLongExecutionQuantity: 300,
                  reLongExecutionPrice: 405000,
                },
              ]"
              :height="200"
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
          <!-- <BaseTable
            :headers="detailHeaders"
            :data="detailData"
            :selectable="true"
            :sortable="true"
          /> -->
          <div class="default-table">
            <div class="table-container">
              <!-- 데이터 그리드 -->
              <div class="table-wrapper">
                <BaseDataGrid
                  :column-defs="detailColumnDefs"
                  :row-data="[]"
                  :height="200"
                  :sortable="false"
                  :filterable="false"
                  :pagination="false"
                />

                <!-- 스크롤 컨트롤 버튼들 (주문일자 뒤에 위치) -->
                <div class="scroll-controls">
                  <button
                    class="scroll-btn left"
                    @click="scrollTable('left')"
                    :disabled="!canScrollLeft"
                  >
                    &lt;
                  </button>
                  <button
                    class="scroll-btn right"
                    @click="scrollTable('right')"
                    :disabled="!canScrollRight"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseDataGrid, type TableHeader, type TableRow } from '@template/ui';
import { OrderDetail, OrderSummary } from '@/types/api/trade.types';
import LabelContent from '@/components/common/LabelContent.vue';
import type { ColDef } from 'ag-grid-community';
import { computed, ref } from 'vue';

const props = defineProps<{
  summaryData: OrderSummary[];
  detailData: OrderDetail[];
}>();

// 컬럼 정의 (전체)
const allColumns: ColDef[] = [
  {
    headerName: '주문일자',
    field: 'orderDate',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '주문번호',
    field: 'orderNumber',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '체결일자',
    field: 'executionDate',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '체결번호',
    field: 'executionNumber',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '종목코드',
    field: 'symbolCode',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: 'L / S',
    field: 'positionCode',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '유형',
    field: 'orderTypeCode',
    width: 140,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '구분',
    field: 'tradeTypeCode',
    width: 60,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '주문수량',
    field: 'orderQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '배리어가격',
    field: 'barrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문가격',
    field: 'orderPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '이익실현배리어가격',
    field: 'takeProfitBarrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '손실제한배리어가격',
    field: 'stopLossBarrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '체결수량',
    field: 'executionQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '체결가격',
    field: 'executionPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문잔량',
    field: 'remainingQuantity',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '주문상태코드',
    field: 'orderStatusCode',
    width: 140,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '접수일시',
    field: 'receiptDateTime',
    width: 140,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '거부사유명',
    field: 'rejectionReason',
    width: 140,
    cellStyle: { textAlign: 'center' },
  },
];

// 시작 인덱스 (몇 번째 컬럼부터 보여줄지)
const startIndex = ref(0);
const visibleColumnCount = 16; // 화면에 보여줄 컬럼 수 고정

// 동적으로 보여질 컬럼들 계산
const detailColumnDefs = computed((): ColDef[] => {
  return allColumns.slice(startIndex.value, startIndex.value + visibleColumnCount);
});

// 컬럼 가시성 제어
const scrollTable = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    // 왼쪽 버튼: 시작 인덱스 감소 (최소 0)
    startIndex.value = Math.max(0, startIndex.value - 1);
  } else {
    // 오른쪽 버튼: 시작 인덱스 증가 (최대 전체 컬럼 수 - 보여줄 컬럼 수)
    startIndex.value = Math.min(allColumns.length - visibleColumnCount, startIndex.value + 1);
  }
};

// 버튼 활성화 상태 계산
const canScrollLeft = computed(() => startIndex.value > 0);
const canScrollRight = computed(() => startIndex.value < allColumns.length - visibleColumnCount);

const summaryColumnDefs = computed((): ColDef[] => [
  {
    headerName: '통화',
    field: 'tradeCurrencyCd',
    width: 120,
    pinned: 'left',
    cellStyle: { textAlign: 'center', fontWeight: 'bold' },
    headerClass: 'summary-header',
  },
  {
    headerName: '매수',
    headerClass: 'buy-header',
    children: [
      {
        headerName: '매입수량',
        field: 'longExecutionQuantity',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '매입금액',
        field: 'longExecutionPrice',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '청산수량',
        field: 'reShortExecutionQuantity',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
      {
        headerName: '청산금액',
        field: 'reShortExecutionPrice',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
      },
    ],
  } as any,
  {
    headerName: '매도',
    headerClass: 'sell-header',
    children: [
      {
        headerName: '매입수량',
        field: 'shortExecutionQuantity',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '매입금액',
        field: 'shortExecutionPrice',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '청산수량',
        field: 'reLongExecutionQuantity',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
      {
        headerName: '청산금액',
        field: 'reLongExecutionPrice',
        width: 110,
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
      },
    ],
  } as any,
]);
</script>

<style lang="scss" scoped>
/* ordersummary 클래스에만 적용되는 AG-Grid 스타일 */
.order-summary-table {
  /* AG-Grid 전체 테두리와 radius 제거 */
  :deep(.ag-root-wrapper) {
    border: none !important;
    border-radius: 0 !important;
  }

  :deep(.ag-header-group-cell) {
    border-bottom: 1px solid var(--table-type1-header-underline) !important;
  }

  :deep(.ag-header-cell) {
    border-bottom: 2px solid var(--table-type1-header-underline) !important;
  }

  :deep(.ag-cell) {
    border-bottom: 1px solid var(--table-type1-header-underline) !important;
  }

  /* AG-Grid 헤더 전체 가운데 정렬 */
  :deep(.ag-header-cell-label),
  :deep(.ag-header-group-cell-label) {
    justify-content: center !important;
    text-align: center !important;
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
  }

  /* 헤더 셀 전체 가운데 정렬 */
  :deep(.ag-header-cell),
  :deep(.ag-header-group-cell) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    font-family: 'Pretendard GOV', sans-serif !important;
    font-size: 12px;
    font-weight: 500;
    color: var(--font-color-default);
  }

  /* 매수/매도 그룹 헤더 특별 처리 */
  :deep(.buy-header),
  :deep(.sell-header) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }

  /* 매수 헤더 스타일 (연분홍 배경) */
  :deep(.buy-header) {
    background-color: var(--table-bg-red) !important;
  }

  /* 매도 헤더 스타일 (연한 파란색 배경) */
  :deep(.sell-header) {
    background-color: var(--table-bg-blue) !important;
  }

  /* 통화 헤더 스타일 */
  :deep(.summary-header) {
    background-color: var(--table-type2-header-bg) !important;
  }

  /* 데이터 영역 글자색 */
  :deep(.ag-cell) {
    color: var(--font-color-default) !important;
  }

  :deep(.ag-row .ag-cell) {
    background-color: var(--table-type2-body-bg) !important;
    color: var(--font-color-default) !important;
  }

  /* AG-Grid body viewport 배경색 */
  :deep(.ag-body-viewport) {
    color: var(--font-color-default) !important;
    background-color: var(--background-bg-default) !important;
  }
}

.default-table {
  .table-container {
    position: relative;
  }

  .scroll-controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 10;

    .scroll-btn {
      width: 30px;
      height: 32px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #ddd;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      pointer-events: auto;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.left {
        border-top-left-radius: 4px;
        margin-left: 120px; /* 주문일자 컬럼 너비만큼 오른쪽으로 이동 */
      }

      &.right {
        border-top-right-radius: 4px;
      }
    }
  }

  .table-wrapper {
    /* 스크롤 제거 - 컬럼 가시성으로 제어 */
  }
}
</style>
