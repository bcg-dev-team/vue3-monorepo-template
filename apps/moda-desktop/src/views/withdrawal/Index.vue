<template>
  <div class="p-6">
    <CardLayoutVertical class="gap-6">
      <MainCardContent title="출금신청" size="large">
        <template #content>
          <div class="flex items-center gap-3">
            <SubCardContent title="계좌번호">
              <template #content> <> </template>
            </SubCardContent>
            <p>></p>
            <SubCardContent title="받을 계좌번호">
              <template #content>
                <div class="flex items-center gap-2">
                  <BaseInputText
                    v-model="accountNumber"
                    :showIcon="false"
                    placeholder="계좌번호를 입력하세요"
                    class="w-[240px]"
                  />
                </div>
              </template>
            </SubCardContent>
            <p>></p>
            <SubCardContent title="신청금액">
              <template #content>
                <div class="flex items-center gap-2">
                  <BaseInputText
                    class="w-[140px]"
                    type="number"
                    size="small"
                    v-model="amount"
                    :showIcon="false"
                  />
                  <BaseButton
                    variant="outline"
                    size="small"
                    label="전액"
                    class="whitespace-nowrap"
                  />
                </div>
              </template>
            </SubCardContent>
            <p>></p>
            <BaseButton class="px-[43px]" variant="primary" label="신청하기" />
          </div>
        </template>
      </MainCardContent>

      <MainCardContent title="신청내역" size="large">
        <template #content>
          <BaseTable
            :headers="headers"
            :data="data"
            :selectable="selectable"
            :sortable="sortable"
            @sort="handleSort"
          />
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>

<script setup lang="ts">
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import SubCardContent from '@/components/ui/cards/SubCardContent.vue';
import { BaseButton, BaseTable, BaseInputText } from '@template/ui';
import type { TableHeader, TableRow } from '@template/ui';
import { ref } from 'vue';

const amount = ref('0');
const accountNumber = ref('');

const headers: TableHeader[] = [
  { key: 'date', title: '신청일자', width: '140px' },
  { key: 'account', title: '계좌번호', width: '200px', align: 'center' },
  { key: 'type', title: '구분', width: '422px', align: 'center' },
  { key: 'amount', title: '금액($)', width: '422px', align: 'right' },
  { key: 'apply', title: '신청일시', width: '220px', align: 'center' },
  { key: 'complete', title: '처리일시', width: '220px' },
  { key: 'note', title: '비고', width: '200px' },
];

const data: TableRow[] = [
  {
    id: 1,
    date: '2025-05-22',
    account: '002-01-000001',
    type: '출금',
    amount: '20,000',
    apply: '2025-05-22 14:02:10',
    complete: '2025-05-22 14:02:15',
    note: '-',
  },
  {
    id: 2,
    date: '2025-05-22',
    account: '002-01-000001',
    type: '이체',
    amount: '100',
    apply: '2025-05-13 13:30:57',
    complete: '2025-05-15 13:30:57',
    note: '-',
  },
];

const selectable = true;
const sortable = true;

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  console.log(`Sorting by ${key} in ${direction} direction`);
};
</script>

<style scoped></style>
