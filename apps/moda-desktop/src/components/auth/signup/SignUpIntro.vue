<template>
  <AuthContent title="회원가입" description="개인회원과 법인회원 중 선택해주세요.">
    <template #content>
      <div class="mt-12">버튼 영역 개인|법인</div>
      <div class="mt-[33px] w-[360px]">버튼 영역 다음</div>
      <div class="flex justify-center mt-6">
        <a class="underline text-[13px] font-regular cursor-pointer">이미 아이디가 있어요</a>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
