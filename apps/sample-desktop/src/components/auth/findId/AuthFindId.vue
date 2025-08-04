<template>
  <AuthContent title="아이디 찾기" description="회원정보에 등록된 정보를 입력해주세요">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="3" :current="0" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-16 flex flex-col">
          <div class="gap-size-4 flex flex-col">
            <span>이름</span>
            <BaseInput size="md" />
          </div>
          <div class="gap-size-4 flex flex-col">
            <span>휴대폰 번호</span>
            <div class="gap-size-8 flex items-center justify-between">
              <BaseInput class="w-[245px]" size="md" placeholder="'-' 없이 입력" />
              <BaseButton size="regular" label="인증번호 발송" variant="disabled" />
            </div>
          </div>
          <div class="gap-size-4 flex flex-col">
            <span>인증번호</span>
            <BaseInput
              size="md"
              :error="true"
              errorMessage="입력시간이 만료됐어요. 인증번호를 다시 발송해주세요."
            />
          </div>
        </div>
        <div class="mt-[33px]">
          <BaseButton class="w-full" size="regular" label="다음" variant="disabled" />
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseInput, BaseButton } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
