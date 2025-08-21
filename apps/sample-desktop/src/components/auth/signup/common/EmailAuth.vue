<template>
  <div>
    <div class="gap-size-12 flex items-center">
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
    class="mt-size-24 border-primary-primary800 bg-primary-primary100 p-size-8 text-font-12 rounded-md border"
  >
    <p>인증번호는 6자리 숫자이며, 유효기간은 10분입니다.</p>
    <p>메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
  </div>

  <div class="gap-size-12 mt-[33px] flex items-center">
    <BaseButton size="lg" label="인증 메일 재전송" variant="outlined" color="primary" full-width />
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="router.push({ query: { step: 4 } })"
    />
  </div>
  <div class="mt-size-16 flex items-center justify-center">
    <span class="text-font-14 text-default-muted cursor-pointer font-medium underline"
      >다른 이메일주소로 변경하기</span
    >
  </div>
</template>

<script lang="ts" setup>
import { BaseInput, BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
