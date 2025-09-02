<template>
  <div class="order-page">
    <!-- 좌측(20%) + 우측(80%) 분할 -->
    <BaseTwoWaySplitPane
      direction="horizontal"
      :min-sizes="{ first: 15, second: 85 }"
      :max-sizes="{ first: 15, second: 85 }"
      :push-other-panes="false"
    >
      <!-- 좌측 패널: 주문 목록 (20%) -->
      <template #first>
        <div class="order-list-panel">
          <div class="panel-header">
            <h2 class="panel-title">📋 종목 리스트</h2>
            <p class="panel-subtitle">전체 종목 리스트를 확인하세요</p>
          </div>
          <div class="panel-content">
            <div class="placeholder-content">
              <div class="placeholder-icon">📋</div>
              <p>주문 목록이 여기에 표시됩니다</p>
            </div>
          </div>
        </div>
      </template>

      <!-- 우측 패널: 중앙과 우측을 포함 (80%) -->
      <template #second>
        <!-- 중앙(75%) + 우측(25%) 분할 -->
        <BaseTwoWaySplitPane
          direction="horizontal"
          :min-sizes="{ first: 75, second: 25 }"
          :max-sizes="{ first: 75, second: 25 }"
          :push-other-panes="false"
        >
          <!-- 중앙 패널: 주문 차트 (75%) -->
          <template #first>
            <div class="order-detail-panel">
              <!-- 차트와 테이블을 8:2 vertical 분할 -->
              <BaseTwoWaySplitPane
                direction="vertical"
                :min-sizes="{ first: 75, second: 25 }"
                :max-sizes="{ first: 75, second: 25 }"
                :push-other-panes="false"
              >
                <!-- 위쪽: 차트 (75%) -->
                <template #first>
                  <div class="chart-panel">
                    <!-- <div class="panel-header">
                      <h2 class="panel-title">📊 주문 차트</h2>
                      <p class="panel-subtitle">주문 데이터 시각화</p>
                    </div> -->
                    <div class="panel-content">
                      <TradingViewChart :symbol="'ETH/EUR'" :interval="'1'" />
                    </div>
                  </div>
                </template>

                <!-- 아래쪽: 테이블 (25%) -->
                <template #second>
                  <div class="table-panel">
                    <!-- <div class="panel-header">
                      <h2 class="panel-title">📋 주문 내역</h2>
                      <p class="panel-subtitle">최근 주문 데이터</p>
                    </div> -->
                    <div class="panel-content">
                      <BaseDataGrid
                        :columnDefs="columnDefs"
                        :rowData="rowData"
                        :defaultColDef="defaultColDef"
                        :gridOptions="gridOptions"
                        :sortable="true"
                        :filterable="false"
                        :selectable="true"
                        :pagination="false"
                        :resizable="false"
                        :disalbeColumnAutoSize="false"
                        @grid-ready="onGridReady"
                        @sort-changed="onSortChanged"
                        @row-selected="onRowSelected"
                      />
                    </div>
                  </div>
                </template>
              </BaseTwoWaySplitPane>
            </div>
          </template>

          <!-- 우측 패널: 주문 처리 (25%) -->
          <template #second>
            <div class="order-action-panel">
              <RightPanel />
              <!-- <div class="panel-header">
                <h2 class="panel-title">⚡ 주문 패널</h2>
                <p class="panel-subtitle">주문 상태 변경 및 액션 패널</p>
              </div>
              <div class="panel-content">
                <div class="placeholder-content">
                  <div class="placeholder-icon">⚡</div>
                  <p>주문 처리 옵션이 여기에 표시됩니다</p>
                </div>
              </div> -->
            </div>
          </template>
        </BaseTwoWaySplitPane>
      </template>
    </BaseTwoWaySplitPane>
  </div>
</template>

<script setup lang="ts">
import type { GridOptions, ColDef, GridApi, Column } from 'ag-grid-community';
import TradingViewChart from '@/components/chart/TradingViewChart.vue';
import { BaseTwoWaySplitPane, BaseDataGrid } from '@template/ui';
import RightPanel from '@/components/order/RightPanel.vue';
import { ref, onMounted, onUnmounted } from 'vue';

// 테이블 데이터 타입 정의
interface PositionData {
  itemCode: string;
  currency: string;
  positionType: 'LONG' | 'SHORT';
  purchaseDate: string;
  quantity: number;
  price: number;
  currentPrice: number; // TODO: 실시간으로 변경되어야 하는 값
  profitLoss: number; // TODO: 실시간으로 변경되어야 하는 값
}

// 컬럼 정의
const columnDefs = ref<ColDef[]>([
  {
    headerName: '종목코드',
    field: 'itemCode',
    sortable: true,
    width: 100,
    cellStyle: { fontWeight: 'bold' },
  },
  {
    headerName: '통화',
    field: 'currency',
    sortable: true,
    width: 60,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: 'L/S',
    field: 'positionType',
    sortable: true,
    width: 70,
  },
  {
    headerName: '매입일자',
    field: 'purchaseDate',
    sortable: true,
    width: 90,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '수량',
    field: 'quantity',
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '가격',
    field: 'price',
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '현재가',
    field: 'currentPrice', // TODO: 실시간으로 변경되어야 하는 값
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '손익',
    field: 'profitLoss', // TODO: 실시간으로 변경되어야 하는 값
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right', fontWeight: 'bold' },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '액션',
    field: 'actions',
    sortable: false,
    width: 120,
  },
]);

// 기본 컬럼 설정
const defaultColDef = ref({});

// 그리드 옵션
const gridOptions = ref<GridOptions>({});

// 테이블 데이터 (이미지 참고)
const rowData = ref<PositionData[]>([
  {
    itemCode: 'AUDUSD',
    currency: 'AUD',
    positionType: 'LONG',
    purchaseDate: '2025-08-12',
    quantity: 1,
    price: 1.10086,
    currentPrice: 1.10086, // TODO: 실시간으로 변경되어야 하는 값
    profitLoss: -2127, // TODO: 실시간으로 변경되어야 하는 값
  },
  {
    itemCode: 'AUDUSD',
    currency: 'AUD',
    positionType: 'SHORT',
    purchaseDate: '2025-08-12',
    quantity: 999999,
    price: 1.10086,
    currentPrice: 1.10086, // TODO: 실시간으로 변경되어야 하는 값
    profitLoss: 9999000000, // TODO: 실시간으로 변경되어야 하는 값
  },
  {
    itemCode: 'CHFJPY',
    currency: 'JPY',
    positionType: 'SHORT',
    purchaseDate: '2025-08-12',
    quantity: 1,
    price: 169435,
    currentPrice: 169435, // TODO: 실시간으로 변경되어야 하는 값
    profitLoss: -41, // TODO: 실시간으로 변경되어야 하는 값
  },
]);

// 그리드 API 참조
const gridApi = ref<GridApi | null>(null);
const columnApi = ref<Column | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  gridApi.value = params.api;
  columnApi.value = params.columnApi;

  // 그리드 크기 자동 조정
  params.api.sizeColumnsToFit();

  // 윈도우 리사이즈 이벤트 리스너 추가
  window.addEventListener('resize', () => {
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    });
  });
};

// 정렬 변경 이벤트
const onSortChanged = (event: any) => {
  console.log('Sort changed:', event);
};

// 행 선택 이벤트
const onRowSelected = (event: any) => {
  console.log('Row selected:', event);
};

// 청산 버튼 클릭 핸들러 (전역 함수로 등록)
const handleSettle = (itemCode: string) => {
  console.log('청산 요청:', itemCode);
  // TODO: 청산 로직 구현
};

// 시장가청산 버튼 클릭 핸들러 (전역 함수로 등록)
const handleMarketSettle = (itemCode: string) => {
  console.log('시장가청산 요청:', itemCode);
  // TODO: 시장가청산 로직 구현
};

// 전역 함수 등록 (버튼 클릭 이벤트 처리용)
onMounted(() => {
  (window as any).handleSettle = handleSettle;
  (window as any).handleMarketSettle = handleMarketSettle;
});

// 실시간 데이터 업데이트 함수 (예시)
const updateRealTimeData = () => {
  // TODO: WebSocket 또는 API를 통해 실시간 데이터 수신
  // TODO: 현재가, 손익 등 실시간으로 변경되어야 하는 값들 업데이트
  console.log('실시간 데이터 업데이트 필요');
};

// 컴포넌트 언마운트 시 전역 함수 제거
onUnmounted(() => {
  delete (window as any).handleSettle;
  delete (window as any).handleMarketSettle;
});
</script>

<style scoped>
.order-page {
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
}

.order-list-panel,
.order-detail-panel,
.order-action-panel {
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
}

.panel-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
}

.panel-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

.panel-content {
  flex: 1;
  display: block;
  width: 100%;
  height: 100%;
}

.placeholder-content {
  text-align: center;
  color: #6c757d;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.placeholder-content p {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

/* 좌측 패널 스타일 */
.order-list-panel {
  background-color: #f8f9fa;
}

/* 중앙 패널 스타일 */
.order-detail-panel {
  background-color: #ffffff;
}

.order-detail-panel .panel-content {
  padding: 0;
  display: block;
}

/* 차트 패널 스타일 */
.chart-panel {
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
}

.chart-panel .panel-content {
  padding: 0;
  display: block;
}

/* 테이블 패널 스타일 */
.table-panel {
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
}

.table-panel .panel-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  flex: 1;
}

/* 우측 패널 스타일 */
.order-action-panel {
  background-color: #f8f9fa;
}

/* splitpanes 기본 스타일 오버라이드 */
:deep(.splitpanes) {
  height: 100%;
}

:deep(.splitpanes__pane) {
  background: transparent !important;
  border: none !important;
}

:deep(.splitpanes__splitter) {
  background-color: #e9ecef !important;
  border: none !important;
  width: 2px !important;
}

:deep(.splitpanes__splitter:hover) {
  background-color: #6c757d !important;
}
</style>
