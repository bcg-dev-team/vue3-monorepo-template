<template>
  <div class="gap-size-36 p-padding-24 flex items-end">
    <LabelContent label="계좌번호" size="md">
      <BaseInput size="sm" placeholder="input select 들어올 예정" />
    </LabelContent>
    <LabelContent label="주문유형" size="md">주문유형 탭 </LabelContent>
    <LabelContent label="포지션" size="md">포지션 탭 </LabelContent>
    <LabelContent label="주문일자" size="md">주문일자 영역 </LabelContent>
    <BaseButton variant="contained" label="조회하기" size="sm" />
  </div>
</template>
<script setup lang="ts">
import LabelContent from '@/components/transaction/common/LabelContent.vue';
import { BaseInput, BaseButton } from '@template/ui';
</script>
