<template>
  <div class="order-page">
    <!-- 좌측(20%) + 우측(80%) 분할 -->
    <BaseTwoWaySplitPane
      direction="horizontal"
      :min-sizes="{ first: 20, second: 80 }"
      :max-sizes="{ first: 20, second: 80 }"
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
                      <BaseTable
                        :headers="orderTableHeaders"
                        :data="orderTableData"
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
import RightPanel from '@/components/order/RightPanel.vue';
import type { TableHeader, TableRow } from '@template/ui';
import { logger } from '@template/utils';

const orderTableHeaders: TableHeader[] = [
  { key: 'id', title: 'ID', width: '80px' },
  { key: 'symbol', title: 'Symbol', width: '120px' },
  { key: 'type', title: 'Type', width: '80px' },
  { key: 'price', title: 'Price', width: '100px' },
  { key: 'quantity', title: 'Quantity', width: '100px' },
  { key: 'status', title: 'Status', width: '100px' },
  { key: 'time', title: 'Time', width: '150px' },
];

const orderTableData: TableRow[] = [
  {
    id: 1,
    symbol: 'BTC/USD',
    type: 'Buy',
    price: 50000,
    quantity: 0.01,
    status: 'Open',
    time: '2023-10-27 10:00',
  },
  {
    id: 2,
    symbol: 'ETH/EUR',
    type: 'Sell',
    price: 300,
    quantity: 1.5,
    status: 'Closed',
    time: '2023-10-27 11:30',
  },
  {
    id: 3,
    symbol: 'XRP/JPY',
    type: 'Buy',
    price: 100,
    quantity: 1000,
    status: 'Open',
    time: '2023-10-27 12:00',
  },
];

const handleRowSelect = (rowId: string | number, selected: boolean) => {
  logger.info('Selected row', { rowId, selected });
};

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  logger.info('Sorted by', { key, direction });
};
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
