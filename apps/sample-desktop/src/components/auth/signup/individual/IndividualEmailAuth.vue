<template>
  <AuthContent
    title="개인회원 가입"
    description="메일함에서 인증 메일을 확인해주세요. <br/> 인증번호 6자리를 입력하면 회원가입이 완료돼요."
  >
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="4" :current="2" />
      </div>
    </template>
    <template #content>
      <div>
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
          <BaseButton
            size="lg"
            label="인증 메일 재전송"
            variant="outlined"
            color="primary"
            full-width
          />
          <BaseButton
            size="lg"
            label="다음"
            variant="contained"
            color="primary"
            full-width
            @click="step = 4"
          />
        </div>
        <div class="mt-size-16 flex items-center justify-center">
          <span class="text-font-14 text-default-muted cursor-pointer font-medium underline"
            >다른 이메일주소로 변경하기</span
          >
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseInput, BaseButton } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
const step = defineModel<number>('step', { required: true });
</script>
