<template>
  <MainCardContent class="px-padding-36 py-padding-64">
    <template #content>
      <div class="gap-size-64 flex flex-col justify-center">
        <div class="flex items-center justify-center">
          <BaseStepper :labelConfig="steps" :current="step" variant="label" />
        </div>
        <div class="gap-size-36 flex flex-col items-center justify-center">
          <div class="gap-size-8 flex flex-col items-center justify-center">
            <span class="text-font-24 font-semibold">{{ menuTitle.title }}</span>
            <span class="text-font-14 text-default-muted-dark">{{ menuTitle.subTitle }}</span>
          </div>
          <SelectTransferMenu
            v-if="menuState === 'select'"
            :menuList="menuList"
            @menuClick="handleMenuClick"
          />
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
import type { TransferMenuItem } from '@/components/accountManagement/accountManagement';
import Transfer from '@/components/accountManagement/transfer/Transfer.vue';
import Complete from '@/components/accountManagement/transfer/Complete.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import Deposit from '@/components/accountManagement/transfer/Deposit.vue';
import { BaseButton, BaseStepper } from '@template/ui';
import { ref, computed } from 'vue';

interface TransferMenuTitle {
  title: string;
  subTitle: string;
}

interface TransferMenuButton {
  label: string;
  click: () => void;
}

type TransferMenuState = 'select' | 'withdraw' | 'transfer' | 'deposit' | 'complete';

const menuState = ref<TransferMenuState>('select');
const step = ref(0);

const steps = {
  stepLabelList: ['유형 선택', '금액 입력', '승인 완료'],
};

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
  },
] as Array<TransferMenuItem>;

/**
 * 메뉴 클릭 시 상태 변경 처리
 */
const handleMenuClick = (menu: TransferMenuItem) => {
  if (menu.title === '출금신청하기') {
    menuState.value = 'withdraw';
  } else if (menu.title === '이체하기') {
    menuState.value = 'transfer';
  } else if (menu.title === '입금하기') {
    menuState.value = 'deposit';
  }
};

const menuTitle = computed<TransferMenuTitle>(() => {
  if (menuState.value === 'withdraw') {
    return {
      title: '출금신청 금액 입력',
      subTitle: '출금 신청하실 금액을 입력해주세요',
    };
  } else if (menuState.value === 'transfer') {
    return {
      title: '이체금액 입력',
      subTitle: '이체하실 계좌와 금액을 입력해주세요',
    };
  } else if (menuState.value === 'deposit') {
    return {
      title: '입금정보 입력',
      subTitle: '입금하신 정보를 정확히 입력해주세요',
    };
  } else if (menuState.value === 'complete') {
    return {
      title: '완료되었습니다.',
      subTitle: '영업일 기준 1~3일 소요될 수 있습니다.',
    };
  } else {
    return {
      title: '유형 선택',
      subTitle: '입금과 출금, 이체 중 원하는 유형을 선택해주세요',
    };
  }
});

const buttonData = computed<TransferMenuButton>(() => {
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
