<template>
  <AuthContent title="개인회원 가입" description="서비스 이용을 위해 먼저 본인인증을 해주세요.">
    <template #header>
      <div class="mb-12">탑 버튼 영역</div>
    </template>
    <template #content>
      <div class="mt-[33px] w-[360px]">버튼 영역 휴대폰 본인인증</div>
      <div class="mt-[33px] w-[360px]">버튼 영역 다음</div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
