<!-- Figma: Table -->
<script setup lang="ts">
import type { TableHeader, TableRow } from '../../types/components';
import { computed } from 'vue';

/**
 * 테이블 컴포넌트
 *
 * @props headers - 헤더 데이터 배열
 * @props data - 테이블 데이터 배열
 * @props selectable - 행 선택 가능 여부
 * @props sortable - 정렬 가능 여부
 * @emits rowSelect - 행 선택 이벤트
 * @emits sort - 정렬 이벤트
 */

interface Props {
  /** 헤더 데이터 배열 */
  headers: TableHeader[];
  /** 테이블 데이터 배열 */
  data: TableRow[];
  /** 행 선택 가능 여부 */
  selectable?: boolean;
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 선택된 행 ID들 */
  selectedRows?: (string | number)[];
}

interface Emits {
  (e: 'rowSelect', rowId: string | number, selected: boolean): void;
  (e: 'sort', key: string, direction: 'asc' | 'desc'): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  sortable: false,
  selectedRows: () => [],
});

const emit = defineEmits<Emits>();

const handleRowSelect = (rowId: string | number) => {
  const isSelected = props.selectedRows.includes(rowId);
  emit('rowSelect', rowId, !isSelected);
};

const handleSort = (key: string) => {
  if (!props.sortable) return;
  // 기본적으로 오름차순으로 정렬
  emit('sort', key, 'asc');
};

const isRowSelected = (rowId: string | number) => {
  return props.selectedRows.includes(rowId);
};

// 정적 색상은 Tailwind arbitrary value로 처리 (성능 최적화)
const tableClasses = computed(() => {
  return 'w-full border rounded-lg overflow-hidden border-[var(--neutral-neutral200)]';
});

const tableHeaderClasses = computed(() => {
  return 'w-full bg-[var(--neutral-neutral100)] border-b border-[var(--neutral-neutral200)]';
});

const tableBodyClasses = computed(() => {
  return 'w-full bg-[var(--neutral-neutral000)]';
});

const headerCellClasses = computed(() => {
  return 'relative w-full h-full';
});

const headerBorderClasses = computed(() => {
  return 'absolute border-b border-solid inset-0 pointer-events-none';
});

const headerContentClasses = computed(() => {
  return 'flex flex-row items-center relative size-full';
});

const headerPaddingClasses = computed(() => {
  return 'box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-3 relative size-full';
});

const headerTextClasses = computed(() => {
  return 'flex flex-col font-medium justify-center leading-0 not-italic relative shrink-0 text-neutral-neutral800 text-font-14 text-left text-nowrap tracking-1';
});

const bodyCellClasses = computed(() => {
  return 'relative w-full h-full';
});

const bodyBorderClasses = computed(() => {
  return 'absolute border-x border-solid inset-0 pointer-events-none';
});

const bodyContentClasses = computed(() => {
  return 'flex flex-row items-center relative size-full';
});

const bodyPaddingClasses = computed(() => {
  return 'box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-3 relative size-full';
});

const bodyTextClasses = computed(() => {
  return 'font-regular leading-0 not-italic relative shrink-0 text-neutral-neutral800 text-font-14 text-left text-nowrap tracking-3';
});

const rowClasses = computed(() => {
  return 'flex w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer';
});

// 동적 스타일 (조건부 변경이 필요한 경우만)
const selectedRowStyle = computed(() => ({
  backgroundColor: 'var(--blue-blue050)',
}));
</script>

<template>
  <div :class="tableClasses" data-name="Table">
    <!-- 헤더 -->
    <div :class="tableHeaderClasses">
      <slot name="header">
        <div class="flex w-full">
          <div
            v-for="header in headers"
            :key="header.key"
            :style="{ width: header.width || 'auto' }"
            class="flex-1"
          >
            <div class="cursor-pointer" @click="handleSort(header.key)">
              <slot name="header-cell" :header="header">
                <div class="h-12">
                  <div :class="headerCellClasses">
                    <div :class="headerBorderClasses" />
                    <div :class="headerContentClasses">
                      <div :class="headerPaddingClasses">
                        <div :class="headerTextClasses">
                          <span class="block whitespace-pre">{{ header.title }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- 바디 -->
    <div :class="tableBodyClasses">
      <slot name="body">
        <div
          v-for="row in data"
          :key="row.id"
          :class="rowClasses"
          :style="isRowSelected(row.id) ? selectedRowStyle : {}"
          @click="handleRowSelect(row.id)"
        >
          <div
            v-for="header in headers"
            :key="header.key"
            :style="{ width: header.width || 'auto' }"
            class="flex-1"
          >
            <slot name="body-cell" :row="row" :header="header" :value="row[header.key]">
              <div class="h-12">
                <div :class="bodyCellClasses">
                  <div :class="bodyBorderClasses" />
                  <div :class="bodyContentClasses">
                    <div :class="bodyPaddingClasses">
                      <div :class="bodyTextClasses">
                        <span class="block whitespace-pre">{{ row[header.key] }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
