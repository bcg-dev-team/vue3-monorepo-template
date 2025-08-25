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
          <template v-if="step === 0">
            <SelectService @menuClick="handleMenuClick" />
          </template>
          <template v-if="step === 1">
            <ServiceInputForm :menuState="menuState" @stepChange="handleStepChange" />
          </template>
          <template v-if="step === 2">
            <ServiceComplete :menuState="menuState" />
          </template>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>

<script setup lang="ts">
import ServiceInputForm from '@/components/accountManagement/service/content/ServiceInputForm.vue';
import ServiceComplete from '@/components/accountManagement/service/content/ServiceComplete.vue';
import SelectService from '@/components/accountManagement/service/content/SelectService.vue';
import type { TransferMenuState } from '@/components/accountManagement/accountManagement';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseStepper } from '@template/ui';
import { ref, computed } from 'vue';

interface TransferMenuTitle {
  title: string;
  subTitle: string;
}

const step = ref(0);
const menuState = ref<TransferMenuState | null>(null);

const steps = {
  stepLabelList: ['유형 선택', '금액 입력', '승인 완료'],
};

/**
 * 메뉴 클릭 시 상태 변경 처리
 */
const handleMenuClick = (menu: string) => {
  menuState.value = menu as TransferMenuState;
  step.value = 1;
};

const handleStepChange = (newStep: number) => {
  step.value = newStep;
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
</script>
