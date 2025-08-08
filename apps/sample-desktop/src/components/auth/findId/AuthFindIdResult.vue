<template>
  <AuthContent title="아이디 찾기 완료" description="입력하신 정보와 일치하는 아이디를 찾았어요">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="3" :current="1" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-24 flex flex-col">
          <div class="gap-size-4 flex flex-col">
            <span class="text-font-14 font-medium">검색 정보</span>
            <div class="bg-bg-bg-innerframe gap-size-10 p-size-16 flex flex-col rounded-md">
              <div class="flex items-center justify-between">
                <span class="text-font-14 font-normal">이름</span>
                <span class="text-font-14 font-medium">김트레이더</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-font-14 font-normal">휴대폰번호</span>
                <span class="text-font-14 font-medium">010-1234-5678</span>
              </div>
            </div>
          </div>
          <div class="gap-size-4 flex flex-col">
            <span class="text-font-14 font-medium">찾은 아이디(이메일주소)</span>
            <div class="bg-bg-bg-innerframe gap-size-10 p-size-16 flex flex-col rounded-md">
              <div class="flex items-center justify-between">
                <span class="text-font-16 font-medium">traderkim@email.com</span>
                <span class="text-font-16 font-medium">:copy:</span>
              </div>
            </div>
          </div>
        </div>
        <div class="gap-size-8 mt-[33px] flex w-full items-center justify-center">
          <BaseButton
            size="lg"
            label="비밀번호 재설정"
            variant="outlined"
            color="primary"
            full-width
          />
          <BaseButton size="lg" label="로그인" variant="contained" color="primary" full-width />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script setup lang="ts">
import { BaseButton, BaseIcon, BasePaginationJoin } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
