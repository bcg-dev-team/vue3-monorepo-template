<template>
  <MainCardContent class="px-padding-36 py-padding-64">
    <template #content>
      <div class="gap-size-64 flex flex-col justify-center">
        <div class="flex items-center justify-center">stepper {{ menuState }}</div>
        <div class="gap-size-36 flex flex-col items-center justify-center">
          <div class="gap-size-8 flex flex-col items-center justify-center">
            <span class="text-font-24 font-semibold">{{ menuTitle.main }}</span>
            <span class="text-font-14 text-default-muted-dark">{{ menuTitle.sub }}</span>
          </div>
          <SelectTransferMenu v-if="menuState === 'select'" :menuList="menuList" />
          <ApplyWithdrawal v-if="menuState === 'withdraw'" />
          <Transfer v-if="menuState === 'transfer'" />
          <Deposit v-if="menuState === 'deposit'" />
          <Complete v-if="menuState === 'complete'" />
        </div>
      </div>
      <div
        v-if="menuState !== 'select' && menuState !== 'complete'"
        class="gap-size-10 mt-size-24 flex justify-end"
      >
        <BaseButton
          label="이전"
          variant="outlined"
          color="white"
          size="lg"
          :leftIcon="{ name: 'arrow-close', size: 'md' }"
          @click="menuState = 'select'"
        />
        <BaseButton
          :label="buttonData.label"
          variant="contained"
          size="lg"
          :rightIcon="{ name: 'arrow-open', size: 'md' }"
          @click="buttonData.click"
        />
      </div>
    </template>
  </MainCardContent>
</template>

<script setup lang="ts">
import SelectTransferMenu from '@/components/accountManagement/transfer/SelectTransferMenu.vue';
import ApplyWithdrawal from '@/components/accountManagement/transfer/ApplyWithdrawal.vue';
import Transfer from '@/components/accountManagement/transfer/Transfer.vue';
import Complete from '@/components/accountManagement/transfer/Complete.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import Deposit from '@/components/accountManagement/transfer/Deposit.vue';
import { BaseButton, type IconName } from '@template/ui';
import { ref, computed } from 'vue';

const menuState = ref<'select' | 'withdraw' | 'transfer' | 'deposit' | 'complete'>('select');

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

const menuTitle = computed(() => {
  if (menuState.value === 'withdraw') {
    return {
      main: '출금신청 금액 입력',
      sub: '출금 신청하실 금액을 입력해주세요',
    };
  } else if (menuState.value === 'transfer') {
    return {
      main: '이체금액 입력',
      sub: '이체하실 계좌와 금액을 입력해주세요',
    };
  } else if (menuState.value === 'deposit') {
    return {
      main: '입금정보 입력',
      sub: '입금하신 정보를 정확히 입력해주세요',
    };
  } else if (menuState.value === 'complete') {
    return {
      main: '완료되었습니다.',
      sub: '영업일 기준 1~3일 소요될 수 있습니다.',
    };
  } else {
    return {
      main: '유형 선택',
      sub: '입금과 출금, 이체 중 원하는 유형을 선택해주세요',
    };
  }
});

const buttonData = computed(() => {
  if (menuState.value === 'withdraw') {
    return {
      label: '출금 신청하기',
      click: () => {
        menuState.value = 'complete';
      },
    };
  } else if (menuState.value === 'transfer') {
    return {
      label: '이체 신청하기',
      click: () => {
        menuState.value = 'complete';
      },
    };
  } else if (menuState.value === 'deposit') {
    return {
      label: '입금정보 입력완료',
      click: () => {
        menuState.value = 'complete';
      },
    };
  } else {
    return {
      label: '다음',
      click: () => {
        console.log('click');
      },
    };
  }
});
</script>
