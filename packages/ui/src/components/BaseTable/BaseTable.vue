<!-- Figma: Table -->
<script setup lang="ts">
import type { TableHeader, TableRow } from '../../types/components';
import { computed } from 'vue';
import './BaseTable.scss';

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

// 행 클래스 (선택 상태에 따라)
const getRowClasses = (rowId: string | number) => {
  const classes = ['table-row'];

  if (isRowSelected(rowId)) {
    classes.push('table-row-selected');
  }

  return classes.join(' ');
};
</script>

<template>
  <div class="table" data-name="Table">
    <!-- 헤더 -->
    <div class="table-header">
      <slot name="header">
        <div class="header-row">
          <div
            v-for="header in headers"
            :key="header.key"
            :style="{ width: header.width || 'auto' }"
            class="cell-container"
          >
            <div class="cursor-pointer" @click="handleSort(header.key)">
              <slot name="header-cell" :header="header">
                <div class="cell-content">
                  <div class="header-cell">
                    <div class="header-border" />
                    <div class="header-content">
                      <div class="header-padding">
                        <div class="header-text">
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
    <div class="table-body">
      <slot name="body">
        <div
          v-for="row in data"
          :key="row.id"
          :class="getRowClasses(row.id)"
          @click="handleRowSelect(row.id)"
        >
          <div
            v-for="header in headers"
            :key="header.key"
            :style="{ width: header.width || 'auto' }"
            class="cell-container"
          >
            <slot name="body-cell" :row="row" :header="header" :value="row[header.key]">
              <div class="cell-content">
                <div class="body-cell">
                  <div class="body-border" />
                  <div class="body-content">
                    <div class="body-padding">
                      <div class="body-text">
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
