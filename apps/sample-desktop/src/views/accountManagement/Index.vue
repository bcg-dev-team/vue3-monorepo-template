<template>
  <div class="mx-auto w-[1440px] py-6">
    <MainCardContent class="p-6" title="계좌관리" size="lg">
      <template #content>
        <BaseTabs v-model="modelValue" size="lg" variant="underline" :tabs="tabs" />
      </template>
    </MainCardContent>
  </div>
</template>

<script setup lang="ts">
import TransferAccountMain from '@/components/accountManagement/transfer/TransferAccountMain.vue';
import CreateAccountMain from '@/components/accountManagement/create/CreateAccountMain.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('create');
const tabs = [
  {
    key: 'create',
    label: '계좌개설',
    component: CreateAccountMain,
  },
  {
    key: 'service',
    label: '출금/이체/입금',
    component: TransferAccountMain,
  },
  {
    key: 'history',
    label: '입출금내역',
    component: '',
  },
];
</script>

<style scoped></style>
/
