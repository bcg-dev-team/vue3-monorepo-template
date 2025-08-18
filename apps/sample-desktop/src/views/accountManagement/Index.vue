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

const modelValue = ref('transfer');
const tabs = {
  계좌개설: {
    value: 'create-account',
    icon: 'card',
    component: CreateAccountMain,
  },
  '출금/이체/입금': {
    value: 'transfer',
    icon: 'send',
    component: TransferAccountMain,
  },
  입출금내역: {
    value: 'deposit-history',
    icon: 'description',
  },
};
</script>

<style scoped></style>
/
