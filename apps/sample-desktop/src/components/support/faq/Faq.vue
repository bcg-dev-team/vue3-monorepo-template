<template>
  <div class="gap-size-24 flex flex-col justify-center">
    <div class="bg-bg-bg-innerframe py-padding-36 border-bg-bg-outline rounded-[10px] border">
      <div class="gap-size-10 flex flex-col">
        <div class="gap-size-8 flex items-center justify-center">
          <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
          <BaseInput class="w-[360px]" size="sm" placeholder="검색어를 입력하세요." />
        </div>
        <div class="gap-size-24 flex items-center justify-center">
          <div>
            <span class="text-font-14 font-medium">추천 검색어:</span>
          </div>
          <div class="gap-size-24 flex items-center">
            <a
              class="text-font-14 text-default-muted underline"
              v-for="item in searchList"
              :key="item.value"
              :href="item.value"
              >{{ item.label }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <BaseTable
        :headers="headers"
        :data="data"
        :selectable="selectable"
        :sortable="sortable"
        @sort="handleSort"
        @rowSelect="handleRowSelect"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseInput, BaseTable, BaseInputSelect } from '@template/ui';
import { ref } from 'vue';
const selectable = true;
const sortable = true;

const selectedAccount = ref('회원 정보');
const accountOptions = [
  { value: 'account1', label: '회원 정보' },
  { value: 'account2', label: '라이브계좌#2 110-81-345151' },
  { value: 'account3', label: '데모계좌#1 110-81-345152' },
];

const headers: TableHeader[] = [
  { key: 'no', title: '번호', width: '100px', align: 'center' },
  { key: 'category', title: '카테고리', width: '160px', align: 'center' },
  { key: 'question', title: '질문', align: 'left' },
];

const data: TableRow[] = [
  {
    id: 1,
    no: '3',
    category: '회원정보',
    question: 'Q. MODA/신한은행 연계계좌의 연계출금 및 이체가 가능한가요?',
  },
  {
    id: 1,
    no: '2',
    category: '회원정보',
    question: 'Q. 해외선물은 어떤 통화로 거래하게 되나요?',
  },
  {
    id: 1,
    no: '1',
    category: '계좌관리',
    question: 'Q. 거래할 수 있는 해외선물에는 어떤 종목들이 있나요?',
  },
];

const searchList = [
  {
    label: '회원정보',
    value: '',
  },
  {
    label: '내정보 변경',
    value: '',
  },
  {
    label: '계좌관리',
    value: '',
  },
  {
    label: '거래',
    value: '',
  },
];

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  console.log(`Sorting by ${key} in ${direction} direction`);
};

const handleRowSelect = () => {
  type.value = 'detail';
};
</script>
