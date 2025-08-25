<template>
  <div class="gap-size-24 flex flex-col">
    <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[900px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">선택된 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 gap-size-48 flex"></div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[900px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">이체요청 상세</span>
          </div>
          <div class="mt-size-12 gap-size-16 gap-size-48 flex"></div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[900px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">입금정보 입력 상세</span>
          </div>
          <div class="mt-size-12 gap-size-16 gap-size-48 flex"></div>
        </div>
      </template>
    </MainCardContent>
    <div class="mt-size-24 flex justify-center">
      <BaseButton
        class="w-[240px]"
        label="거래내역 보러가기"
        variant="contained"
        size="lg"
        color="green"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TransferMenuState } from '@/components/accountManagement/accountManagement';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseButton } from '@template/ui';

const props = defineProps<{
  menuState?: TransferMenuState | null;
}>();
</script>
