<template>
  <div class="order-page min-w-[1920px]">
    <!-- 실시간 설정 패널 -->
    <RealtimeConfigPanel />

    <!-- 좌측(15%) + 우측(85%) 분할 -->
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

      <!-- 우측 패널: 중앙과 우측을 포함 (85%) -->
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
                    <div class="panel-content">
                      <TradingViewChart
                        ref="tradingViewChartRef"
                        :symbol="selectedSymbol.selectedSymbol.value"
                      />
                    </div>
                  </div>
                </template>

                <!-- 아래쪽: 테이블 (25%) -->
                <template #second>
                  <div class="table-panel">
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
import TradingViewChart from '@/components/chart/TradingViewChart.vue';
import { predefinedStyles, getProfitLossStyle } from '@template/utils';
import type { GridOptions, ColDef, GridApi } from 'ag-grid-community';
import { ref, onMounted, onUnmounted, shallowRef, watch } from 'vue';
import { BaseTwoWaySplitPane, BaseDataGrid } from '@template/ui';
import SymbolList from '@/components/order/SymbolList.vue';
import RightPanel from '@/components/order/RightPanel.vue';
import type { TradingSymbol } from '@template/types';
import type { PositionType } from '@template/types';
import { getOrderData } from '@template/mocks';
import './Index.scss';

// 상태 관리
const tradingViewChartRef = ref<InstanceType<typeof TradingViewChart> | null>(null);

// 선택된 심볼의 시장 데이터 사용
const { marketData, addVisibleSymbols, unsubscribeAll } = selectedSymbol;

// 이벤트 핸들러
const handleSymbolSelect = (symbol: TradingSymbol) => {
  selectedSymbol.setSelectedSymbol(symbol.ticker);

  // ChartService를 통한 심볼 변경
  if (tradingViewChartRef.value && tradingViewChartRef.value.isChartReady()) {
    tradingViewChartRef.value.changeChartSymbol(symbol.ticker);
  }
};

// 테이블 데이터 타입 정의 (실시간 데이터 기반)
interface DisplayPositionData {
  id: string;
  itemCode: string;
  currency: string;
  positionType: PositionType;
  purchaseDate: string;
  quantity: number;
  price: number;
  currentPrice: number; // 실시간 데이터
  profitLoss: number; // 실시간 데이터
}

// 컬럼 정의
const columnDefs = ref<ColDef[]>([
  {
    headerName: '종목코드',
    field: 'itemCode',
    sortable: true,
    width: 100,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: '통화',
    field: 'currency',
    sortable: true,
    width: 60,
    headerClass: 'text-center',
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: 'L/S',
    field: 'positionType',
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
    field: 'quantity',
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
    field: 'price',
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
    field: 'currentPrice', // 실시간 데이터
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
      return getProfitLossStyle(params.value, 'right');
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
    cellStyle: predefinedStyles.center,
  },
]);

// 기본 컬럼 설정
const defaultColDef = ref({});

// 그리드 옵션
const gridOptions = ref<GridOptions>({
  suppressRowClickSelection: false, // deprecated 속성 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거
});

// 주문 데이터를 기반으로 한 테이블 데이터
const rowData = shallowRef<DisplayPositionData[]>([]);

// 현재가 저장용 (실시간 업데이트용)
const currentPrices = ref<Record<string, number>>({});

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

// AG Grid 가시성 감지 디바운스 타이머
let gridDebounceTimer: NodeJS.Timeout | null = null;

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

// 실시간 데이터 업데이트 함수
const updateRealTimeData = () => {
  if (isUpdating.value) return;

  isUpdating.value = true;

  try {
    // 시장 데이터에서 현재가 업데이트 (안전한 검증)
    marketData.value.forEach((market: any) => {
      const symbol = market.symbol;
      const price = market.price;

      // 유효한 가격인지 검증 (숫자이고 NaN이 아니며 양수)
      if (
        currentPrices.value[symbol] !== undefined &&
        typeof price === 'number' &&
        !isNaN(price) &&
        price > 0
      ) {
        currentPrices.value[symbol] = price;
      }
    });

    // rowData 업데이트 (NaN 방지)
    rowData.value = rowData.value.map((item) => {
      // 현재가 가져오기 (유효한 실시간 가격이 있을 때만 업데이트)
      const realTimePrice = currentPrices.value[item.itemCode];
      const isValidPrice =
        realTimePrice &&
        typeof realTimePrice === 'number' &&
        !isNaN(realTimePrice) &&
        realTimePrice > 0;

      const currentPrice = isValidPrice ? realTimePrice : (item.currentPrice ?? item.price);

      // 수익/손실 계산 (유효한 가격이 있을 때만)
      const profitLoss = isValidPrice
        ? (currentPrice - item.price) * item.quantity
        : item.profitLoss;

      return {
        ...item,
        currentPrice,
        profitLoss,
      };
    });
  } catch (error) {
    console.error('실시간 데이터 업데이트 오류:', error);
  } finally {
    isUpdating.value = false;
  }
};

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

  // 그리드 이벤트 리스너 등록 (AG Grid 34 호환) - 필수 이벤트만 등록
  console.log('🎧 AG Grid 이벤트 리스너 등록');
  gridApi.value.addEventListener('viewportChanged', () => {
    console.log('👁️ viewportChanged 이벤트 (디바운스 적용)');
    debouncedUpdateVisibleSymbols();
  });
  gridApi.value.addEventListener('firstDataRendered', () => {
    console.log('🎬 firstDataRendered 이벤트');
    updateVisibleSymbols();
  });

  // 초기 실행
  console.log('⏰ 초기 실행 (100ms 후)');
  setTimeout(updateVisibleSymbols, 100);
};

// AG Grid 가시성 감지 디바운스 함수 (스크롤이 멈춘 후 300ms 후에 실행)
const debouncedUpdateVisibleSymbols = () => {
  if (gridDebounceTimer) {
    clearTimeout(gridDebounceTimer);
  }

  gridDebounceTimer = setTimeout(() => {
    updateVisibleSymbols();
    gridDebounceTimer = null;
  }, 300); // 300ms 디바운스
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

// 전역 함수 등록 (버튼 클릭 이벤트 처리용)
onMounted(() => {
  loadOrderData();
  (window as any).handleSettle = handleSettle;
  (window as any).handleMarketSettle = handleMarketSettle;

  // 실시간 시세 업데이트 시작 (100ms마다)
  realTimeInterval = setInterval(updateRealTimeData, 100);
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  // 실시간 업데이트 타이머 정리
  if (realTimeInterval) {
    clearInterval(realTimeInterval);
    realTimeInterval = null;
  }

  // AG Grid 디바운스 타이머 정리
  if (gridDebounceTimer) {
    clearTimeout(gridDebounceTimer);
    gridDebounceTimer = null;
  }

  // 전역 함수 제거
  delete (window as any).handleSettle;
  delete (window as any).handleMarketSettle;

  // 모든 구독 해제
  console.log('[Index] 컴포넌트 언마운트 - 모든 구독 해제');
  unsubscribeAll();
});
</script>
