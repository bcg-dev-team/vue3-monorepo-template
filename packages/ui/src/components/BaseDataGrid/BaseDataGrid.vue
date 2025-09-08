<template>
  <div v-if="isReady" class="grid-container">
    <AgGridVue
      :theme="theme"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      :style="gridStyle"
      @grid-ready="onGridReady"
      @sort-changed="onSortChanged"
    />
  </div>
  <div v-else class="grid-placeholder" :style="gridStyle">
    <!-- 로딩 상태나 플레이스홀더 -->
  </div>
</template>

<script setup lang="ts">
// 250k (gzipped: 70k) - cellRenderer 지원을 위한 모듈 추가
import {
  ModuleRegistry,
  CellStyleModule,
  HighlightChangesModule,
  ClientSideRowModelModule,
  themeQuartz,
  themeBalham,
  themeMaterial,
  themeAlpine,
} from 'ag-grid-community';
import type { GridOptions, ColDef } from 'ag-grid-community';

// 635.9k (gzipped: 177.4k) - 전체 모듈 (사용하지 않음)
// import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

// AG-Grid 모듈 등록 - cellRenderer 지원을 위한 기본 모듈
ModuleRegistry.registerModules([
  ClientSideRowModelModule, // 기본 행 모델 (필수)
  CellStyleModule,
  HighlightChangesModule,
  // agAnimateShowChangeCellRenderer는 내장 렌더러로 별도 모듈 불필요
]);

/**
 * BaseDataGrid 컴포넌트 Props
 */
interface Props {
  /** 컬럼 정의 배열 */
  columnDefs: ColDef[];
  /** 테이블 데이터 배열 */
  rowData: any[];
  /** 기본 컬럼 설정 */
  defaultColDef?: Partial<ColDef>;
  /** 그리드 옵션 */
  gridOptions?: Partial<GridOptions>;
  /** 그리드 높이 (기본값: 100%) */
  height?: string | number;
  /** 그리드 너비 (기본값: 100%) */
  width?: string | number;
  /** 정렬 가능 여부 (기본값: true) */
  sortable?: boolean;
  /** 필터링 가능 여부 (기본값: false) */
  filterable?: boolean;
  /** 페이지네이션 사용 여부 (기본값: false) */
  pagination?: boolean;
  /** 컬럼 리사이징 가능 여부 (기본값: true) */
  resizable?: boolean;
  /** 테마 선택 (기본값: 'quartz') */
  theme?: 'quartz' | 'balham' | 'material' | 'alpine';
}

/**
 * BaseDataGrid 컴포넌트 Emits
 */
interface Emits {
  /** 그리드 준비 완료 시 발생 */
  (e: 'grid-ready', params: { api: any; columnApi: any }): void;
  /** 정렬 변경 시 발생 */
  (e: 'sort-changed', event: any): void;
}

const props = withDefaults(defineProps<Props>(), {
  defaultColDef: () => ({}),
  gridOptions: () => ({}),
  height: '100%',
  width: '100%',
  sortable: true,
  filterable: false,
  pagination: false,
  resizable: true,
  theme: 'quartz',
});

const emit = defineEmits<Emits>();

// 테마 매핑
const themeMap = {
  quartz: themeQuartz,
  balham: themeBalham,
  material: themeMaterial,
  alpine: themeAlpine,
};

// 선택된 테마
const theme = computed(() => themeMap[props.theme]);

const isReady = ref(false);

// 컴포넌트 마운트 후 지연된 렌더링
onMounted(() => {
  // 상위 컴포넌트들의 레이아웃이 완료될 때까지 대기
  nextTick(() => {
    setTimeout(() => {
      isReady.value = true;
    }, 0);
  });
});

// 그리드 스타일 계산
const gridStyle = computed(() => {
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width;

  return {
    height,
    width,
  };
});

// 기본 컬럼 설정
const defaultColDef = computed(() => ({
  resizable: props.resizable,
  filter: props.filterable,
  floatingFilter: props.filterable,
  suppressMenu: !props.filterable,
  sortable: props.sortable,

  // 컬럼 너비 최적화
  minWidth: 50, // 최소 너비 설정
  maxWidth: undefined, // 최대 너비 제한 해제
  flex: 1, // 유연한 너비 분배

  ...props.defaultColDef,
}));

// 그리드 옵션
const gridOptions = computed(() => ({
  animateRows: true,
  enableCellTextSelection: true,
  suppressRowClickSelection: true, // 행 선택 기능 비활성화
  pagination: props.pagination,
  domLayout: 'normal',
  suppressHorizontalScroll: false,

  ...props.gridOptions,
}));

// 그리드 API 참조
const gridApi = ref<any | null>(null);
const columnApi = ref<any | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  gridApi.value = params.api;
  columnApi.value = params.columnApi;

  // 컬럼 너비 최적화를 한 번에 처리
  setTimeout(() => {
    const allColumns = params.columnApi.getAllColumns();
    if (allColumns && allColumns.length > 0) {
      // 전체 너비를 컬럼 수로 나누어 균등 분배
      const containerWidth = params.api.getContainerWidth();
      const columnCount = allColumns.length;
      const equalWidth = Math.floor(containerWidth / columnCount);

      allColumns.forEach((column: any) => {
        if (column.getColDef().width === undefined) {
          params.columnApi.setColumnWidth(column, equalWidth);
        }
      });
    }

    // 컬럼 너비 최적화 후 한 번만 호출
    params.api.sizeColumnsToFit();
  }, 100);

  // 윈도우 리사이즈 이벤트 리스너 추가
  const handleResize = () => {
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    });
  };

  window.addEventListener('resize', handleResize);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거를 위해 저장
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  emit('grid-ready', { api: params.api, columnApi: params.columnApi });
};

// 정렬 변경 이벤트
const onSortChanged = (event: any) => {
  emit('sort-changed', event);
};

// 그리드 API 노출 (ref를 통해 접근 가능)
defineExpose({
  gridApi,
  columnApi,
});
</script>

<style scoped>
.grid-container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
