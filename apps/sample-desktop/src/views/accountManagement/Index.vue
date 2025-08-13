<template>
  <div class="mx-auto w-[1920px] py-6">
    <MainCardContent class="p-6" title="계좌관리" size="lg">
      <template #content>
        <BaseTabs
          direction="horizontal"
          v-model="modelValue"
          showContent
          size="md"
          variant="connected"
          :tabs="tabs"
        />
      </template>
    </MainCardContent>
  </div>
</template>

<script setup lang="ts">
import CreateAccountMain from '@/components/accountManagement/create/CreateAccountMain.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs, type TabItem } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('create-account');
const tabs = [
  { value: 'create-account', label: '계좌개설', content: CreateAccountMain },
  { value: 'withdrawal-apply', label: '출금신청', content: '' },
  { value: 'account-history', label: '입출금내역', content: '' },
  { value: 'deposit-info', label: '입금안내', content: '' },
] as TabItem[];
</script>

<style scoped></style>
