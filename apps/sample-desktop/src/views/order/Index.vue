<template>
  <div class="order-page min-w-[1920px]">
    <!-- 좌측(20%) + 우측(80%) 분할 -->
    <BaseTwoWaySplitPane
      direction="horizontal"
      :min-sizes="{ first: 15, second: 85 }"
      :max-sizes="{ first: 15, second: 85 }"
      :push-other-panes="false"
    >
      <!-- 좌측 패널: 종목 리스트 (15%) -->
      <template #first>
        <div class="order-list-panel">
          <SymbolList :selected-symbol="selectedSymbol" @symbol-select="handleSymbolSelect" />
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
                      <TradingViewChart
                        ref="tradingViewChartRef"
                        :symbol="selectedSymbol"
                        :interval="'1'"
                      />
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
                      <!-- theme: 'quartz' | 'balham' | 'material' | 'alpine' -->
                      <BaseDataGrid
                        :columnDefs="columnDefs"
                        :rowData="rowData"
                        :defaultColDef="defaultColDef"
                        :gridOptions="gridOptions"
                        :sortable="true"
                        :filterable="false"
                        :pagination="false"
                        :resizable="false"
                        :disalbeColumnAutoSize="false"
                        theme="alpine"
                        @grid-ready="onGridReady"
                        @sort-changed="onSortChanged"
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
import TradingViewChart from '@/components/chart/TradingViewChart.vue';
import type { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { BaseTwoWaySplitPane, BaseDataGrid } from '@template/ui';
import SymbolList from '@/components/order/SymbolList.vue';
import RightPanel from '@/components/order/RightPanel.vue';
import type { TradingSymbol } from '@/types/tradingview';
import { ref, onMounted, onUnmounted } from 'vue';
import { getOrderData } from '@template/mocks';

// 상태 관리
const selectedSymbol = ref('EURTRY');
const tradingViewChartRef = ref<InstanceType<typeof TradingViewChart> | null>(null);

// 이벤트 핸들러
const handleSymbolSelect = (symbol: TradingSymbol) => {
  selectedSymbol.value = symbol.ticker;

  if (
    tradingViewChartRef.value &&
    typeof tradingViewChartRef.value.changeChartSymbol === 'function'
  ) {
    tradingViewChartRef.value.changeChartSymbol(symbol.ticker);
  }
};

// 테이블 데이터 타입 정의
interface PositionData {
  id: string; // 고유 ID 추가 (성능 최적화)
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
    cellStyle: { fontWeight: 'bold' as const },
  },
  {
    headerName: '통화',
    field: 'currency',
    sortable: true,
    width: 60,
    cellStyle: { textAlign: 'center' as const },
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
    cellStyle: { textAlign: 'center' as const },
  },
  {
    headerName: '수량',
    field: 'quantity',
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right' as const },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '가격',
    field: 'price',
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right' as const },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '현재가',
    field: 'currentPrice', // TODO: 실시간으로 변경되어야 하는 값
    sortable: true,
    width: 80,
    cellStyle: { textAlign: 'right' as const, fontWeight: 'bold' as const },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '손익',
    field: 'profitLoss',
    sortable: true,
    width: 80,
    cellStyle: (params: any) => {
      const value = params.value;
      if (value > 0) {
        return { color: 'var(--font-color-red)' }; // 수익 - 빨간색
      } else if (value < 0) {
        return { color: 'var(--font-color-blue)' }; // 손실 - 파란색
      } else {
        return { color: 'var(--font-color-default)' }; // 무손익 - 회색
      }
    },
    valueFormatter: (params: any) => {
      const value = params.value;
      const sign = value > 0 ? '+' : '';
      return `${sign}${value.toLocaleString()}`;
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

// 테이블 데이터 (mocks에서 가져오기)
const rowData = ref<PositionData[]>([]);

// 그리드 API 참조
const gridApi = ref<GridApi | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  gridApi.value = params.api;

  // BaseDataGrid 컴포넌트에서 자동으로 sizeColumnsToFit을 처리하므로
  // 여기서는 추가 처리 불필요
};

// 정렬 변경 이벤트
const onSortChanged = (event: any) => {
  console.log('Sort changed:', event);
};

// 행 선택 이벤트는 사용하지 않음 (selectable=false)

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

// 데이터 로드 함수
const loadOrderData = async () => {
  try {
    // mocks 패키지에서 주문 데이터 가져오기
    // test data size: 10000
    const orderData = getOrderData(10000, 0);

    // PositionData 형태로 변환
    rowData.value = orderData.map((order: any, index: number) => {
      const itemCode = order.symbol;
      const price = order.price;
      const quantity = order.quantity;
      const positionType = order.type === 'Buy' ? 'LONG' : 'SHORT';

      // 초기 현재가는 주문가와 동일하게 설정
      const currentPrice = price;

      // 초기 손익은 0 (현재가 = 주문가)
      const profitLoss = 0;

      return {
        id: `${itemCode}-${index}-${Date.now()}`, // 고유 ID 생성
        itemCode,
        currency: itemCode.substring(0, 3), // 심볼의 앞 3자리를 통화로 사용
        positionType,
        purchaseDate: order.time.split(' ')[0], // 날짜 부분만 추출
        quantity,
        price,
        currentPrice,
        profitLoss,
      };
    });

    // 초기 현재가 설정
    const symbols = [...new Set(rowData.value.map((item) => item.itemCode))];
    symbols.forEach((symbol) => {
      const firstOrder = rowData.value.find((item) => item.itemCode === symbol);
      if (firstOrder) {
        currentPrices.value[symbol] = firstOrder.price;
      }
    });
  } catch (error) {
    console.error('Failed to load order data:', error);
  }
};

// 실시간 업데이트 타이머
let realTimeInterval: NodeJS.Timeout | null = null;

// 성능 최적화를 위한 업데이트 제어
const isUpdating = ref(false);

// 전역 함수 등록 (버튼 클릭 이벤트 처리용)
onMounted(() => {
  loadOrderData();
  (window as any).handleSettle = handleSettle;
  (window as any).handleMarketSettle = handleMarketSettle;

  // 실시간 시세 업데이트 시작 (100ms마다)
  realTimeInterval = setInterval(updateRealTimeData, 100);
});

// 실시간 시세 시뮬레이션을 위한 심볼별 현재가 저장
const currentPrices = ref<Record<string, number>>({});

// 손익 계산 함수
const calculateProfitLoss = (
  orderPrice: number,
  currentPrice: number,
  quantity: number,
  positionType: 'LONG' | 'SHORT'
): number => {
  if (positionType === 'LONG') {
    // 롱 포지션: (현재가 - 주문가) * 수량
    return (currentPrice - orderPrice) * quantity;
  } else {
    // 숏 포지션: (주문가 - 현재가) * 수량
    return (orderPrice - currentPrice) * quantity;
  }
};

// 실시간 시세 업데이트 함수
const updateRealTimePrices = () => {
  if (isUpdating.value) return; // 업데이트 중이면 스킵
  isUpdating.value = true;

  try {
    // 기존 데이터의 심볼들을 추출
    const symbols = [...new Set(rowData.value.map((item) => item.itemCode))];

    // 심볼별로 가격 업데이트
    symbols.forEach((symbol) => {
      // 기존 가격이 없으면 주문가를 기준으로 설정
      if (!currentPrices.value[symbol]) {
        const firstOrder = rowData.value.find((item) => item.itemCode === symbol);
        if (firstOrder) {
          currentPrices.value[symbol] = firstOrder.price;
        }
      }

      // ±1% 범위에서 랜덤 변동 시뮬레이션 (변동폭 축소)
      const basePrice = currentPrices.value[symbol];
      const variation = (Math.random() - 0.5) * 0.02; // -1% ~ +1%
      const newPrice = basePrice * (1 + variation);

      currentPrices.value[symbol] = Math.round(newPrice * 100000) / 100000; // 소수점 5자리
    });

    // AG Grid API를 사용한 효율적인 업데이트 (하이브리드 접근법)
    if (gridApi.value) {
      const updatedRowNodes: any[] = [];
      const updatedItems: any[] = [];

      // 방법 1: 보이는 행만 처리 시도 (가장 효율적)
      try {
        const displayedRowModel = (gridApi.value as any).getDisplayedRowModel();
        if (displayedRowModel && displayedRowModel.getRows().length > 0) {
          // 보이는 행들만 처리
          displayedRowModel.getRows().forEach((rowNode: any) => {
            if (rowNode.data) {
              const item = rowNode.data;
              const currentPrice = currentPrices.value[item.itemCode] || item.price;
              const profitLoss = calculateProfitLoss(
                item.price,
                currentPrice,
                item.quantity,
                item.positionType
              );

              const roundedProfitLoss = Math.round(profitLoss * 100) / 100;

              // 값이 변경된 경우만 업데이트
              if (item.currentPrice !== currentPrice || item.profitLoss !== roundedProfitLoss) {
                const updatedItem = {
                  ...item,
                  currentPrice,
                  profitLoss: roundedProfitLoss,
                };

                // 로컬 데이터 업데이트 (ID 기반으로 찾기)
                const index = rowData.value.findIndex((dataItem) => dataItem.id === item.id);
                if (index !== -1) {
                  rowData.value[index] = updatedItem;
                }

                updatedRowNodes.push(rowNode);
                updatedItems.push(updatedItem);
              }
            }
          });

          // 셀 새로고침으로 효율적인 업데이트
          if (updatedRowNodes.length > 0) {
            gridApi.value.refreshCells({
              rowNodes: updatedRowNodes,
              columns: ['currentPrice', 'profitLoss'],
              force: true,
            });
          }
        } else {
          throw new Error('No displayed rows');
        }
      } catch (error) {
        // 방법 2: 전체 데이터 처리 (fallback)
        console.log('Falling back to full data update');

        rowData.value.forEach((item, index) => {
          const currentPrice = currentPrices.value[item.itemCode] || item.price;
          const profitLoss = calculateProfitLoss(
            item.price,
            currentPrice,
            item.quantity,
            item.positionType
          );

          const roundedProfitLoss = Math.round(profitLoss * 100) / 100;

          if (item.currentPrice !== currentPrice || item.profitLoss !== roundedProfitLoss) {
            const updatedItem = {
              ...item,
              currentPrice,
              profitLoss: roundedProfitLoss,
            };

            rowData.value[index] = updatedItem;
            updatedItems.push(updatedItem);
          }
        });

        // 트랜잭션 업데이트
        if (updatedItems.length > 0) {
          gridApi.value.applyTransactionAsync({
            update: updatedItems,
          });
        }
      }
    }
  } finally {
    isUpdating.value = false;
  }
};

// 실시간 데이터 업데이트 함수
const updateRealTimeData = () => {
  updateRealTimePrices();
  console.log('실시간 데이터 업데이트 완료');
};

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  // 실시간 업데이트 타이머 정리
  if (realTimeInterval) {
    clearInterval(realTimeInterval);
    realTimeInterval = null;
  }

  // 전역 함수 제거
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

/* AG Grid 기본 스타일 사용 */
</style>
