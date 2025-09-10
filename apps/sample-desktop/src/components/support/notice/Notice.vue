<template>
  <div class="gap-size-64 flex">
    <div class="min-w-[500px]">
      <div class="gap-size-4 flex items-center">
        <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
        <BaseInput placeholder="검색어 입력 후 Enter" />
      </div>
    </div>
    <SupportDetail
      :chip="{ label: '업무공지', variant: 'grey' }"
      :date="'2025.05.26'"
      title="신용공여종목군 및 위탁증거금률 변경 안내(현대건설 외 3종목)"
      content="내용 영역"
    />
  </div>
</template>

<script setup lang="ts">
import SupportDetail from '@/components/support/common/SupportDetail.vue';
import { BaseInput, BaseInputSelect } from '@template/ui';
import { ref } from 'vue';

const selectedAccount = ref('전체');
const accountOptions = [
  { value: '전체', label: '전체' },
  { value: 'account2', label: '라이브계좌#2 110-81-345151' },
  { value: 'account3', label: '데모계좌#1 110-81-345152' },
];
</script>
