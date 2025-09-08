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
  ColumnAutoSizeModule,
  ClientSideRowModelApiModule,
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
  ColumnAutoSizeModule,
  ClientSideRowModelApiModule,
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
  (e: 'grid-ready', params: { api: any }): void;
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

  // 컬럼 너비 최적화 (v31+ 권장 방식)
  minWidth: 50, // 최소 너비 설정
  maxWidth: undefined, // 최대 너비 제한 해제
  flex: 1, // 유연한 너비 분배 (자동으로 컨테이너 너비에 맞춤)
  autoHeaderHeight: true, // 헤더 높이 자동 조정

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

  // v31+ 권장 설정
  suppressColumnVirtualisation: false, // 컬럼 가상화 활성화
  suppressRowVirtualisation: false, // 행 가상화 활성화
  enableBrowserTooltips: true, // 브라우저 툴팁 활성화

  // 성능 최적화: 행 ID 추적을 위한 getRowId 함수
  getRowId: (params: any) => {
    // 데이터에 고유 ID가 있는 경우 사용
    if (params.data && params.data.id) {
      return params.data.id;
    }
    // 고유 ID가 없는 경우 인덱스 기반으로 생성
    return `row-${params.node.rowIndex}`;
  },

  ...props.gridOptions,
}));

// 그리드 API 참조
const gridApi = ref<any | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  gridApi.value = params.api;

  // 컬럼 너비 최적화 (v31+ 안전한 방식)
  setTimeout(() => {
    try {
      // 기본 sizeColumnsToFit 사용 (가장 안전한 방법)
      params.api.sizeColumnsToFit();
    } catch (error) {
      console.warn('sizeColumnsToFit 호출 실패:', error);
      // API가 사용 불가능한 경우 무시
    }
  }, 100);

  // 윈도우 리사이즈 이벤트 리스너 추가
  const handleResize = () => {
    setTimeout(() => {
      try {
        params.api.sizeColumnsToFit();
      } catch (error) {
        console.warn('리사이즈 시 sizeColumnsToFit 호출 실패:', error);
      }
    });
  };

  window.addEventListener('resize', handleResize);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거를 위해 저장
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  // Grid API만 전달 (Column API는 deprecated)
  emit('grid-ready', { api: params.api });
};

// 정렬 변경 이벤트
const onSortChanged = (event: any) => {
  emit('sort-changed', event);
};

// 그리드 API 노출 (ref를 통해 접근 가능)
defineExpose({
  gridApi,
});
</script>

<style scoped>
.grid-container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
