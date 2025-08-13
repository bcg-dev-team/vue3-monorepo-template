<template>
  <MainCardContent class="px-padding-36 py-padding-64">
    <template #content>
      <div class="gap-size-64 flex flex-col justify-center">
        <div class="flex items-center justify-center">stepper {{ menuState }}</div>
        <div class="gap-size-36 flex flex-col items-center justify-center">
          <SelectTransferMenu v-if="menuState === 'select'" :menuList="menuList" />
          <ApplyWithdrawal v-if="menuState === 'withdraw'" />
          <Transfer v-if="menuState === 'transfer'" />
          <Deposit v-if="menuState === 'deposit'" />
        </div>
      </div>
      <div v-if="menuState !== 'select'" class="gap-size-10 mt-size-24 flex justify-end">
        <BaseButton
          label="이전"
          variant="outlined"
          color="white"
          size="lg"
          :leftIcon="{ name: 'arrow-close', size: 'md' }"
          @click="menuState = 'select'"
        />
        <BaseButton
          label="다음"
          variant="contained"
          size="lg"
          :rightIcon="{ name: 'arrow-open', size: 'md' }"
          @click="menuState = 'withdraw'"
        />
      </div>
    </template>
  </MainCardContent>
</template>

<script setup lang="ts">
import SelectTransferMenu from '@/components/accountManagement/transfer/SelectTransferMenu.vue';
import ApplyWithdrawal from '@/components/accountManagement/transfer/ApplyWithdrawal.vue';
import Transfer from '@/components/accountManagement/transfer/Transfer.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import Deposit from '@/components/accountManagement/transfer/Deposit.vue';
import { BaseButton, type IconName } from '@template/ui';
import { ref } from 'vue';

const menuState = ref<'select' | 'withdraw' | 'transfer' | 'deposit'>('select');

const menuList = [
  {
    title: '출금신청하기',
    description: '등록된 계좌에서 현금으로<br />출금하실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 1~3 영업일' },
      { icon: 'withdraw', text: '수수료: $0.50' },
      { icon: 'check-sm', text: '최소금액: $10.00' },
    ],
    color: 'blue',
    click: () => {
      menuState.value = 'withdraw';
    },
  },
  {
    title: '이체하기',
    description: '내 다른 계좌로 금액을<br />옮기실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 즉시' },
      { icon: 'withdraw', text: '수수료: 무료' },
      { icon: 'check-sm', text: '최소금액: $1.00' },
    ],
    color: 'green',
    click: () => {
      menuState.value = 'transfer';
    },
  },
  {
    title: '입금하기',
    description: '내 다른 계좌로 금액을<br />옮기실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 1~3 영업일' },
      { icon: 'withdraw', text: '수수료: 무료' },
      { icon: 'check-sm', text: '최소금액: $10.00' },
    ],
    color: 'red',
    click: () => {
      menuState.value = 'deposit';
    },
  },
] as Array<{
  title: string;
  description: string;
  icon: IconName;
  info: Array<{ icon: IconName; text: string }>;
  color: 'blue' | 'green' | 'red';
  click: () => void;
}>;
</script>
