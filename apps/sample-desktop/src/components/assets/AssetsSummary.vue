<template>
  <div class="gap-size-48 flex w-full items-center">
    <div><BaseInput placeholder="input select 들어올 예정" /></div>
    <div class="gap-size-16 flex w-full items-center">
      <SubCardContent class="py-padding-12 pl-padding-24">
        <template #title>
          <span class="text-font-12 text-default-muted">총 자산</span>
        </template>
        <template #content>
          <span class="text-font-18 font-bold">$8,750.00</span>
        </template>
      </SubCardContent>
      <SubCardContent class="py-padding-12 pl-padding-24">
        <template #title>
          <span class="text-font-12 text-default-muted">사용 가능 증거금</span>
        </template>
        <template #content>
          <span class="text-font-18 font-bold">$2,500.</span>
        </template>
      </SubCardContent>
      <SubCardContent class="py-padding-12 pl-padding-24">
        <template #title>
          <span class="text-font-12 text-default-muted">사용중 증거금</span>
        </template>
        <template #content>
          <span class="text-font-18 font-bold">$1,250.00</span>
        </template>
      </SubCardContent>
      <SubCardContent class="py-padding-12 pl-padding-24">
        <template #title>
          <span class="text-font-12 text-default-muted">미실현 손익</span>
        </template>
        <template #content>
          <span class="text-font-18 text-red font-bold">+$325.50</span>
        </template>
      </SubCardContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import SubCardContent from '@/components/common/cards/SubCardContent.vue';
import { BaseInput } from '@template/ui';
</script>
