<template>
  <div class="gap-size-8 p-padding-24 flex items-end">
    <div class="gap-size-36 flex">
      <LabelContent label="계좌번호" size="md">
        <BaseInput size="sm" placeholder="input select 들어올 예정" />
      </LabelContent>
      <LabelContent label="결제일자" size="md">결제일자 탭 </LabelContent>
    </div>
    <div>
      <BaseButton variant="contained" label="조회하기" size="sm" />
    </div>
  </div>
</template>
<script setup lang="ts">
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseInput, BaseButton } from '@template/ui';
</script>
