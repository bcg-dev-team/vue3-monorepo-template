<template>
  <div class="bg-primary px-6 pt-9 pb-6">
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">{{ userInfo.name }}</span>
    </div>
    <div class="mt-2">
      <span class="text-sm">마지막 로그인: {{ userInfo.lastLogin }}</span>
    </div>
  </div>
  <div class="p-6">
    <div class="flex flex-col gap-3">
      <div class="py-3 px-4 bg-bg-innerframe rounded-md">
        <span class="text-primary">:편지: </span>
        <span class="text-md font-medium">{{ userInfo.email }}</span>
      </div>
      <div class="py-3 px-4 bg-bg-innerframe rounded-md">
        <span class="text-primary">:전화: </span>
        <span class="text-md font-medium">{{ userInfo.phone }}</span>
      </div>
    </div>
    <div class="w-[282px] h-[48px] bg-primary rounded-md flex items-center justify-center mt-4">
      <span class="text-sm font-semibold">버튼 영역</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const userInfo = reactive({
  name: '김트레이더',
  lastLogin: '2025.07.22 14:30',
  email: 'traderkim@email.com',
  phone: '010-1234-5678',
});
</script>
