<template>
  <ApplyWithdrawal v-if="menuState === 'withdraw'" />
  <Transfer v-if="menuState === 'transfer'" />
  <Deposit v-if="menuState === 'deposit'" />
  <div class="gap-size-10 mt-size-24 flex w-full justify-end">
    <BaseButton
      label="이전"
      variant="outlined"
      color="white"
      size="lg"
      :leftIcon="{ name: 'arrow-close', size: 'md' }"
      @click="emit('stepChange', 0)"
    />
    <BaseButton
      :label="nextButtonLabel"
      variant="contained"
      size="lg"
      :rightIcon="{ name: 'arrow-open', size: 'md' }"
      @click="emit('stepChange', 2)"
    />
  </div>
</template>
<script setup lang="ts">
import ApplyWithdrawal from '@/components/accountManagement/service/fragments/ApplyWithdrawal.vue';
import type { TransferMenuState } from '@/components/accountManagement/accountManagement';
import Transfer from '@/components/accountManagement/service/fragments/Transfer.vue';
import Deposit from '@/components/accountManagement/service/fragments/Deposit.vue';
import { BaseButton } from '@template/ui';
import { computed } from 'vue';

const props = defineProps<{
  menuState: TransferMenuState | null;
}>();

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
}>();

const nextButtonLabel = computed(() => {
  if (props.menuState === 'withdraw') {
    return '출금 신청하기';
  } else if (props.menuState === 'transfer') {
    return '이체 신청하기';
  } else if (props.menuState === 'deposit') {
    return '입금정보 입력완료';
  }
  return '다음';
});
</script>
