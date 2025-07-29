<template>
  <AuthContent title="개인회원 가입" description="정보를 입력해주세요.">
    <template #header>
      <div class="mb-12">탑 버튼 영역</div>
    </template>
    <template #content>
      <div class="mt-[33px] w-[360px]">버튼 영역 인증완료</div>
      <div class="mt-[33px] w-[360px] h-[676px]">개인정보 입력 영역</div>
      <div class="mt-[33px] w-[360px]">버튼 영역 다음</div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
