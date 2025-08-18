<template>
  <AuthContent title="법인회원 가입" :description="description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="3" />
      </div>
    </template>
    <template #content>
      <div class="gap-size-16 flex flex-col">
        <FormField label="사업자등록증명원">
          <BaseFileUploadButton status="hover" />
        </FormField>
        <FormField label="법인대표초본(영문)">
          <BaseFileUploadButton status="hover" />
        </FormField>
        <FormField label="법인명 공과금 납부서">
          <BaseFileUploadButton status="hover" />
        </FormField>

        <div class="mt-[33px]">
          <BaseButton
            size="lg"
            label="다음"
            variant="contained"
            color="primary"
            full-width
            @click="step = 7"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseButton, BaseFileUploadButton } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';

const step = defineModel<number>('step', { required: true });

const description = `
      구비서류의 스캔본을 제출해주세요.<br/>
      관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
      <p class='mt-size-12 text-font-12 text-blue'>&#8251; 파일형식: .png, .jpg, .pdf / 파일 사이즈 300KB 미만</p>
      `;
</script>
