<template>
  <div class="default-table">
    <BaseDataGrid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      :sortable="true"
      :filterable="false"
      :pagination="false"
      :resizable="false"
      :disalbeColumnAutoSize="false"
      theme="alpine"
    />
  </div>
</template>

<script setup lang="ts">
import { predefinedStyles, getProfitLossStyle } from '@template/utils';
import { BaseDataGrid, ColDef, GridOptions } from '@template/ui';
import { CustomTypes } from '@template/api';

type StockPositionSymbol = CustomTypes.StockPositionSymbol;
import { ref, onMounted, onUnmounted } from 'vue';
import { stockService } from '@/service/api';

// 그리드 옵션
const gridOptions = ref<GridOptions>({
  suppressRowClickSelection: false, // deprecated 속성 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거
});

const rowData = ref<StockPositionSymbol[]>([]);

// 컬럼 정의
const columnDefs = ref<ColDef[]>([
  {
    headerName: '종목코드',
    field: 'stockCd',
    sortable: true,
    width: 100,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: '통화',
    field: 'tradeCurrencyCd',
    sortable: true,
    width: 60,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: 'L / S',
    field: 'positionCd',
    sortable: true,
    width: 70,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: '매입일자',
    field: 'purchaseDate',
    sortable: true,
    width: 90,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: '수량',
    field: 'accountBookQuantity',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '청산가능수량',
    field: 'liquidationPossibleQuantity',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '가격',
    field: 'accountBookPrice',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '현재가',
    field: 'currentPrice',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: {
      textAlign: 'right' as const,
    },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '평가손익',
    field: 'assessmentProfitLoss',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) => {
      const value = params.value;
      return value.toLocaleString();
    },
  },
  {
    headerName: '',
    field: 'actions',
    sortable: false,
    width: 120,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
]);

const loadStockPositionData = async () => {
  const response = await stockService.getStockPosition({
    accountNo: '250929000009',
    stockCd: '',
    nextKey: 0,
  });

  rowData.value = response.data.symbols;
};

onMounted(() => {
  loadStockPositionData();
  console.log('OrderBalanceTable');
});

onUnmounted(() => {
  console.log('OrderBalanceTable unmounted');
});
</script>
