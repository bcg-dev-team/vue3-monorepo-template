<!--
  Figma 테이블 데모 컴포넌트
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev
-->
<script setup lang="ts">
import { ref } from 'vue';
import BaseTable from './BaseTable.vue';
import BaseTableHeader from './BaseTableHeader.vue';
import BaseTableCell from './BaseTableCell.vue';
import BaseTableInputCell from './BaseTableInputCell.vue';

/**
 * 테이블 데모 컴포넌트
 * Figma 디자인을 반영한 실제 테이블 예시
 */

// 샘플 데이터
const tableData = ref([
  {
    id: 1,
    label: '글씨',
    inputValue: '회',
    buttonText: 'Button',
    checked: false,
  },
  {
    id: 2,
    label: '텍스트',
    inputValue: '',
    buttonText: 'Button',
    checked: true,
  },
  {
    id: 3,
    label: '입력',
    inputValue: '값',
    buttonText: 'Button',
    checked: false,
  },
]);

const handleInputUpdate = (rowId: number, value: string) => {
  const row = tableData.value.find((item) => item.id === rowId);
  if (row) {
    row.inputValue = value;
  }
};

const handleButtonClick = (rowId: number) => {
  console.log('버튼 클릭:', rowId);
};

const handleCheckboxChange = (rowId: number, checked: boolean) => {
  const row = tableData.value.find((item) => item.id === rowId);
  if (row) {
    row.checked = checked;
  }
};
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-input-color-text-static">테이블 데모</h2>

    <!-- Figma 디자인 기반 테이블 -->
    <div class="border border-table-type1-body-border rounded-lg overflow-hidden">
      <!-- 헤더 -->
      <div class="flex w-full">
        <div class="flex-1">
          <BaseTableHeader title="총 회원수(명)" type="type1" align="center" />
        </div>
      </div>

      <!-- 바디 -->
      <div class="w-full">
        <div v-for="row in tableData" :key="row.id" class="flex w-full">
          <div class="flex-1">
            <BaseTableInputCell
              :label="row.label"
              :value="row.inputValue"
              :button-text="row.buttonText"
              :show-checkbox="true"
              :checked="row.checked"
              @update="(value) => handleInputUpdate(row.id, value)"
              @button-click="() => handleButtonClick(row.id)"
              @checkbox-change="(checked) => handleCheckboxChange(row.id, checked)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 데이터 상태 표시 -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">현재 데이터 상태:</h3>
      <pre class="text-sm">{{ JSON.stringify(tableData, null, 2) }}</pre>
    </div>
  </div>
</template>
