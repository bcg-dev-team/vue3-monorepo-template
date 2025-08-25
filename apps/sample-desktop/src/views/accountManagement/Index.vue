<template>
  <div class="mx-auto w-[1440px] py-6">
    <MainCardContent class="p-6" title="계좌관리" size="lg">
      <template #content>
        <BaseTabs
          v-model="modelValue"
          size="lg"
          variant="underline"
          :tabs="tabs"
          @click="handleTabClick"
        />
      </template>
    </MainCardContent>
  </div>
</template>

<script setup lang="ts">
import AccountServiceMain from '@/components/accountManagement/service/AccountServiceMain.vue';
import CreateAccountMain from '@/components/accountManagement/create/CreateAccountMain.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
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
    component: AccountServiceMain,
  },
  {
    key: 'history',
    label: '입출금내역',
    component: '',
  },
];

const handleTabClick = () => {
  router.push({
    name: 'account-management-tab',
    params: { accountManagementTab: modelValue.value },
  });
};
</script>
