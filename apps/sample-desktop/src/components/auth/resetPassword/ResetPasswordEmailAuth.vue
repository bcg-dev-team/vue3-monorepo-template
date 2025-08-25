<template>
  <div
    class="bg-bg-bg-innerframe gap-size-8 flex flex-col items-center justify-center rounded-md p-4"
  >
    <span class="text-font-14 font-normal"> 인증번호 전송 이메일 주소 </span>
    <span class="text-font-18 font-semibold"> traderkim@email.com </span>
  </div>
  <div>
    <div class="gap-size-12 mt-size-12 flex items-center">
      <BaseInput size="md" />
      <BaseInput size="md" />
      <BaseInput size="md" />
      <BaseInput size="md" />
      <BaseInput size="md" />
      <BaseInput size="md" />
    </div>
    <div class="mt-size-8 flex items-center justify-end">
      <span class="text-font-12 text-red tracking-3">남은 시간: 10:00</span>
    </div>
  </div>
  <div
    class="mt-size-12 border-primary-primary800 bg-primary-primary100 p-size-8 gap-size-4 flex items-start rounded-md border"
  >
    <BaseIcon name="info" size="sm" color="var(--chips-status-pending-text)" />
    <div class="text-font-12 text-[var(--chips-status-pending-text)]">
      <p>인증번호는 6자리 숫자이며, 유효기간은 10분입니다.</p>
      <p>메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
    </div>
  </div>

  <div class="gap-size-12 mt-[33px] flex items-center">
    <BaseButton
      size="lg"
      label="인증번호 전송"
      variant="contained"
      color="primary"
      full-width
      @click="router.push({ query: { step: 2 } })"
    />
    <BaseButton
      size="lg"
      label="취소"
      variant="contained"
      color="grey"
      full-width
      @click="router.push({ name: 'login' })"
    />
  </div>
  <div class="mt-size-16 flex items-center justify-center">
    <span class="text-font-14 cursor-pointer font-medium underline">인증번호 재전송</span>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput, BaseButton, BaseIcon } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
