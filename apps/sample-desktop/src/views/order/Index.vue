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
                      <BaseTable
                        :headers="orderTableHeaders"
                        :data="displayedOrderData"
                        :selectable="true"
                        :sortable="true"
                        @row-select="handleRowSelect"
                        @sort="handleSort"
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
import { BaseTwoWaySplitPane, BaseTable } from '@template/ui';
import SymbolList from '@/components/order/SymbolList.vue';
import RightPanel from '@/components/order/RightPanel.vue';
import type { TableHeader, TableRow } from '@template/ui';
import type { TradingSymbol } from '@/types/tradingview';
import { getOrderData } from '@template/mocks';
import { ref, computed, onMounted } from 'vue';

// 상태 관리
const selectedSymbol = ref('EURTRY');
const tradingViewChartRef = ref<InstanceType<typeof TradingViewChart> | null>(null);
const allOrderData = ref<TableRow[]>([]);

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

const orderTableHeaders: TableHeader[] = [
  { key: 'id', title: 'ID', width: '80px' },
  { key: 'symbol', title: 'Symbol', width: '120px' },
  { key: 'type', title: 'Type', width: '80px' },
  { key: 'price', title: 'Price', width: '100px' },
  { key: 'quantity', title: 'Quantity', width: '100px' },
  { key: 'status', title: 'Status', width: '100px' },
  { key: 'time', title: 'Time', width: '150px' },
];

const displayedOrderData = computed(() => {
  console.log('allOrderData.value', allOrderData.value);
  return allOrderData.value;
  // return allOrderData.value.slice(0, 100);
});

const handleRowSelect = (rowId: string | number, selected: boolean) => {
  console.log('Selected row:', rowId, 'Selected:', selected);
};

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  console.log('Sorted by:', key, 'Direction:', direction);

  // 실제 정렬 로직 구현
  allOrderData.value.sort((a, b) => {
    const aValue = a[key as keyof TableRow];
    const bValue = b[key as keyof TableRow];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (direction === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });
};

// 데이터 로드
const loadOrderData = async () => {
  try {
    // mocks 패키지에서 주문 데이터 가져오기 (처음 1000개)
    const orderData = getOrderData(1000, 0);

    // TableRow 형태로 변환
    allOrderData.value = orderData.map((order: any) => ({
      id: order.id,
      symbol: order.symbol,
      type: order.type,
      price: order.price,
      quantity: order.quantity,
      status: order.status,
      time: order.time,
    }));
  } catch (error) {
    console.error('Failed to load order data:', error);
    // 에러 발생 시 기본 데이터 사용
    allOrderData.value = [
      {
        id: 1,
        symbol: 'EURTRY',
        type: 'Buy',
        price: 32.0,
        quantity: 1000,
        status: 'Open',
        time: '2023-10-27 10:00',
      },
      {
        id: 2,
        symbol: 'USDSEK',
        type: 'Sell',
        price: 10.8,
        quantity: 1000,
        status: 'Closed',
        time: '2023-10-27 11:30',
      },
      {
        id: 3,
        symbol: 'SUI30',
        type: 'Buy',
        price: 12000,
        quantity: 1,
        status: 'Open',
        time: '2023-10-27 12:00',
      },
    ];
  }
};

onMounted(() => {
  loadOrderData();
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
  display: block;
  overflow: auto;
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
