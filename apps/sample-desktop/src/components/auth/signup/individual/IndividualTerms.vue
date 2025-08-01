<template>
  <AuthContent title="개인회원 가입" description="가입 약관을 확인해주세요.">
    <template #header>
      <div class="mb-12">탑 버튼 영역</div>
    </template>
    <template #content>
      <div class="mt-12">
        <div class="border-b-2 border-black pb-[10px]">
          <h2>가입 약관 동의</h2>
        </div>
        <div class="mt-6">체크박스 영역</div>
      </div>
      <div class="mt-[33px] w-[360px]">버튼 영역 다음</div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
