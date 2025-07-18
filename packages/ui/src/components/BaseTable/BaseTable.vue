<!-- Figma: Table -->
<script setup lang="ts">
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
export interface TableHeader {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

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

const tableClasses = computed(() => {
  return 'w-full border border-[#dadbdd] rounded-lg overflow-hidden';
});

const tableHeaderClasses = computed(() => {
  return 'w-full';
});

const tableBodyClasses = computed(() => {
  return 'w-full';
});
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
                  <div class="bg-[#f5f6f6] relative w-full h-full">
                    <div
                      class="absolute border-[#dadbdd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
                    />
                    <div class="flex flex-row items-center relative size-full">
                      <div
                        class="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-3 relative size-full"
                      >
                        <div
                          class="flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] text-left text-nowrap tracking-[-0.63px]"
                        >
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
          class="flex w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          :class="{ 'bg-[#e8f0fa]': isRowSelected(row.id) }"
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
                <div class="bg-[#ffffff] relative w-full h-full">
                  <div
                    class="absolute border-[#dadbdd] border-[1px_0px] border-solid inset-0 pointer-events-none"
                  />
                  <div class="flex flex-row items-center relative size-full">
                    <div
                      class="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-3 relative size-full"
                    >
                      <div
                        class="font-regular leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] text-left text-nowrap tracking-[-0.35px]"
                      >
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
