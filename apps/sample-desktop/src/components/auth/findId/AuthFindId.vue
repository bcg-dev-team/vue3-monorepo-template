<template>
  <AuthContent title="아이디 찾기" description="회원정보에 등록된 정보를 입력해주세요">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :count="3" :current="0" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-16 flex flex-col">
          <FormField label="이름">
            <BaseInput size="md" />
          </FormField>
          <FormField label="휴대폰 번호">
            <div class="gap-size-8 flex items-center justify-between">
              <BaseInput size="md" placeholder="'-' 없이 입력" />
              <BaseButton size="lg" label="인증번호 발송" variant="contained" color="primary" />
            </div>
          </FormField>
          <FormField label="인증번호">
            <BaseInput
              size="md"
              :error="true"
              :errorMessage="'입력시간이 만료됐어요. 인증번호를 다시 발송해주세요.'"
            />
          </FormField>
        </div>
        <div class="mt-[33px]">
          <BaseButton
            size="lg"
            label="다음"
            variant="contained"
            color="primary"
            full-width
            @click="step = 1"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseInput, BaseButton, BaseStepper } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';

const step = defineModel<number>('step', { required: true });
</script>
