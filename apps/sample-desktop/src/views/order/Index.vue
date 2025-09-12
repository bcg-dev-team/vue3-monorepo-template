<template>
  <div class="order-page min-w-[1920px]">
    <!-- 실시간 설정 패널 -->
    <RealtimeConfigPanel />

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
          <SymbolList
            :selected-symbol="selectedSymbol.selectedSymbol.value"
            @symbol-select="handleSymbolSelect"
          />
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
                        :symbol="selectedSymbol.selectedSymbol.value"
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
              <RightPanel :selected-symbol="selectedSymbol.selectedSymbol.value" />
            </div>
          </template>
        </BaseTwoWaySplitPane>
      </template>
    </BaseTwoWaySplitPane>
  </div>
</template>

<script setup lang="ts">
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import RealtimeConfigPanel from '@/components/order/RealtimeConfigPanel.vue';
import { useMockRealtimeData } from '@/composables/useMockRealtimeData';
import TradingViewChart from '@/components/chart/TradingViewChart.vue';
import type { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { BaseTwoWaySplitPane, BaseDataGrid } from '@template/ui';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import SymbolList from '@/components/order/SymbolList.vue';
import RightPanel from '@/components/order/RightPanel.vue';
import type { TradingSymbol } from '@/types/tradingview';
import { getAllSymbols } from '@template/mocks';
import './Index.scss';

// 상태 관리
const tradingViewChartRef = ref<InstanceType<typeof TradingViewChart> | null>(null);

// 선택된 심볼의 시장 데이터 사용
const { marketData, addVisibleSymbols, unsubscribeAll } = selectedSymbol;

// 실시간 시장 데이터 가져오기
const {
  marketData: realtimeMarketData,
  isConnected,
  connectionStatus,
} = useMockRealtimeData({
  symbols: getAllSymbols().map((symbol) => symbol.ticker),
  autoConnect: true,
});

// 이벤트 핸들러
const handleSymbolSelect = (symbol: TradingSymbol) => {
  selectedSymbol.setSelectedSymbol(symbol.ticker);

  if (
    tradingViewChartRef.value &&
    typeof tradingViewChartRef.value.changeChartSymbol === 'function'
  ) {
    tradingViewChartRef.value.changeChartSymbol(symbol.ticker);
  }
};

// 테이블 데이터 타입 정의 (실시간 데이터 기반)
interface DisplayPositionData {
  id: string;
  itemCode: string;
  currency: string;
  positionType: 'LONG' | 'SHORT';
  purchaseDate: string;
  quantity: number;
  price: number;
  currentPrice: number; // 실시간 데이터에서 가져옴
  profitLoss: number; // 실시간 계산됨
}

// 컬럼 정의
const columnDefs = ref<ColDef[]>([
  {
    headerName: '종목코드',
    field: 'itemCode',
    sortable: true,
    width: 100,
    headerClass: 'text-center',
    cellStyle: {
      textAlign: 'center' as const,
    },
  },
  {
    headerName: '통화',
    field: 'currency',
    sortable: true,
    width: 60,
    headerClass: 'text-center',
    cellStyle: { textAlign: 'center' as const },
  },
  {
    headerName: 'L/S',
    field: 'positionType',
    sortable: true,
    width: 70,
    headerClass: 'text-center',
    cellStyle: { textAlign: 'center' as const },
  },
  {
    headerName: '매입일자',
    field: 'purchaseDate',
    sortable: true,
    width: 90,
    headerClass: 'text-center',
    cellStyle: { textAlign: 'center' as const },
  },
  {
    headerName: '수량',
    field: 'quantity',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
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
    headerClass: 'text-center',
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
    headerClass: 'text-center',
    cellStyle: {
      textAlign: 'right' as const,
    },
    valueFormatter: (params: any) => {
      return params.value.toLocaleString();
    },
  },
  {
    headerName: '손익',
    field: 'profitLoss',
    sortable: true,
    width: 80,
    headerClass: 'text-center',
    cellStyle: (params: any) => {
      const value = params.value;
      const baseStyle = { textAlign: 'right' as const };
      if (value > 0) {
        return { ...baseStyle, color: 'var(--font-color-red)' }; // 수익 - 빨간색
      } else if (value < 0) {
        return { ...baseStyle, color: 'var(--font-color-blue)' }; // 손실 - 파란색
      } else {
        return { ...baseStyle, color: 'var(--font-color-default)' }; // 무손익 - 회색
      }
    },
    valueFormatter: (params: any) => {
      const value = params.value;
      return value.toLocaleString();
    },
  },
  {
    headerName: '액션',
    field: 'actions',
    sortable: false,
    width: 120,
    headerClass: 'text-center',
    cellStyle: { textAlign: 'center' as const },
  },
]);

// 기본 컬럼 설정
const defaultColDef = ref({});

// 그리드 옵션
const gridOptions = ref<GridOptions>({
  suppressRowClickSelection: false, // deprecated 속성 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거
});

// 시장 데이터를 기반으로 한 테이블 데이터 (포지션 대신 시장 데이터 표시)
const rowData = computed<DisplayPositionData[]>(() => {
  return marketData.value.slice(0, 10).map((market: any, index: number) => ({
    id: `market_${index}`,
    itemCode: market.symbol,
    currency: market.symbol.substring(0, 3),
    positionType: 'MARKET' as const,
    purchaseDate: new Date().toISOString().split('T')[0],
    quantity: 0,
    price: market.price,
    currentPrice: Math.round(market.price * 100) / 100,
    profitLoss: Math.round(market.change * 100) / 100,
  }));
});

// 그리드 API 참조
const gridApi = ref<GridApi | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  console.log('🎬 onGridReady 호출됨!', params);
  gridApi.value = params.api;
  console.log('🎬 gridApi.value 설정됨:', !!gridApi.value);

  // BaseDataGrid 컴포넌트에서 자동으로 sizeColumnsToFit을 처리하므로
  // 여기서는 추가 처리 불필요

  // 🎯 AG Grid 가시성 감지 설정
  console.log('🎯 setupGridVisibilityObserver 호출 시작');
  setupGridVisibilityObserver();
  console.log('🎯 setupGridVisibilityObserver 호출 완료');
};

// 🎯 AG Grid 가시성 감지 설정
const setupGridVisibilityObserver = () => {
  console.log('🎯 setupGridVisibilityObserver 시작');
  if (!gridApi.value) {
    console.log('❌ gridApi.value가 없음');
    return;
  }

  // AG Grid의 실제 화면에 보이는 행들 감지 (AG Grid 34 버전 호환)
  const updateVisibleSymbols = () => {
    console.log('🔄 updateVisibleSymbols 실행');
    if (!gridApi.value) {
      console.log('❌ updateVisibleSymbols: gridApi.value가 없음');
      return;
    }

    try {
      // 🎯 AG Grid 34 버전 최적화 방법: getRenderedNodes() 사용
      const visibleNodes = gridApi.value.getRenderedNodes();
      console.log(`📊 전체 렌더링된 노드 수: ${visibleNodes.length}`);

      // 실제로 화면에 렌더링된 노드들만 필터링
      const actualVisibleNodes = visibleNodes.filter((node: any) => {
        // AG Grid v34에서는 rowVisible이 undefined일 수 있으므로 다른 조건 사용
        const isValid = node.rowIndex !== null && node.data && node.rowIndex >= 0;
        if (!isValid) {
          console.log('🚫 필터링된 노드:', {
            rowVisible: node.rowVisible,
            rowIndex: node.rowIndex,
            hasData: !!node.data,
            itemCode: node.data?.itemCode,
            isValid: isValid,
          });
        } else {
          console.log('✅ 유효한 노드:', {
            rowVisible: node.rowVisible,
            rowIndex: node.rowIndex,
            hasData: !!node.data,
            itemCode: node.data?.itemCode,
            isValid: isValid,
          });
        }
        return isValid;
      });
      console.log(`✅ 유효한 노드 수: ${actualVisibleNodes.length}`);

      // 화면에 보이는 종목들만 추출
      const visibleSymbols = actualVisibleNodes.map((node) => node.data?.itemCode).filter(Boolean);
      console.log(`🎯 추출된 종목들:`, visibleSymbols);

      if (visibleSymbols.length > 0) {
        addVisibleSymbols('AGGrid', visibleSymbols);
        console.log(`✅ AG Grid 가시성 감지 완료: ${visibleSymbols.length}개 종목`, visibleSymbols);
      } else {
        console.log('⚠️ 보이는 종목이 없음');
      }
    } catch (error) {
      console.error('❌ AG Grid 가시성 감지 오류:', error);

      // 폴백: 시장 데이터의 종목들을 가져오기
      const allSymbols = marketData.value.map((m: any) => m.symbol).filter(Boolean);
      if (allSymbols.length > 0) {
        addVisibleSymbols('AGGrid', allSymbols);
        console.log(`🔄 AG Grid 폴백: ${allSymbols.length}개 종목`, allSymbols);
      }
    }
  };

  // 그리드 이벤트 리스너 등록 (AG Grid 34 호환) - 필수 이벤트만 등록
  console.log('🎧 AG Grid 이벤트 리스너 등록');
  gridApi.value.addEventListener('viewportChanged', () => {
    console.log('👁️ viewportChanged 이벤트');
    updateVisibleSymbols();
  });
  gridApi.value.addEventListener('firstDataRendered', () => {
    console.log('🎬 firstDataRendered 이벤트');
    updateVisibleSymbols();
  });

  // 초기 실행
  console.log('⏰ 초기 실행 (100ms 후)');
  setTimeout(updateVisibleSymbols, 100);
};
// 정렬 변경 이벤트 (AG Grid 34 호환)
const onSortChanged = (event: any) => {
  console.log('🔄 onSortChanged 이벤트:', event);
  // 가시성 감지 업데이트
  if (gridApi.value) {
    console.log('⏰ 정렬 후 가시성 감지 업데이트 (100ms 후)');
    setTimeout(() => {
      if (gridApi.value) {
        console.log('🔄 정렬 후 가시성 감지 실행');
        const visibleNodes = gridApi.value.getRenderedNodes();
        const actualVisibleNodes = visibleNodes.filter((node: any) => {
          // AG Grid v34에서는 rowVisible이 undefined일 수 있으므로 다른 조건 사용
          return node.rowIndex !== null && node.data && node.rowIndex >= 0;
        });
        const visibleSymbols = actualVisibleNodes
          .map((node) => node.data?.itemCode)
          .filter(Boolean);
        console.log(`🎯 정렬 후 보이는 종목들:`, visibleSymbols);
        if (visibleSymbols.length > 0) {
          addVisibleSymbols('AGGrid', visibleSymbols);
          console.log(`✅ 정렬 후 가시성 감지 완료: ${visibleSymbols.length}개 종목`);
        }
      }
    }, 100);
  }
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

// 실시간 데이터 기반으로 테이블 데이터가 자동으로 업데이트됨
// 별도의 데이터 로드 함수는 필요 없음

// 전역 함수 등록 (버튼 클릭 이벤트 처리용)
onMounted(() => {
  (window as any).handleSettle = handleSettle;
  (window as any).handleMarketSettle = handleMarketSettle;
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  // 전역 함수 제거
  delete (window as any).handleSettle;
  delete (window as any).handleMarketSettle;

  // 모든 구독 해제
  console.log('[Index] 컴포넌트 언마운트 - 모든 구독 해제');
  unsubscribeAll();
});
</script>
