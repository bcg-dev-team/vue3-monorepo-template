<template>
  <AuthContent title="비밀번호 재설정" :description="resetPasswordDescription[step].description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 3 }" :current="step" />
      </div>
    </template>
    <template #content>
      <ResetPasswordEmailForm v-if="step === 0" v-model:step="step" />
      <ResetPasswordEmailAuth v-if="step === 1" v-model:step="step" />
      <ResetPasswordNewPassword v-if="step === 2" v-model:step="step" />
      <ResetPasswordComplete v-if="step === 3" />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import ResetPasswordNewPassword from '@/components/auth/resetPassword/ResetPasswordNewPassword.vue';
import ResetPasswordEmailForm from '@/components/auth/resetPassword/ResetPasswordEmailForm.vue';
import ResetPasswordEmailAuth from '@/components/auth/resetPassword/ResetPasswordEmailAuth.vue';
import ResetPasswordComplete from '@/components/auth/resetPassword/ResetPasswordComplete.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { BaseIcon, BaseStepper } from '@template/ui';
import { ref } from 'vue';

const step = ref(0);

type ResetPasswordDescriptionProps = {
  description?: string;
};

const resetPasswordDescription: ResetPasswordDescriptionProps[] = [
  {
    description: '비밀번호를 재설정하고자 하는 아이디를 입력해주세요',
  },
  {
    description: '보안을 위해 이메일 인증을 진행할게요',
  },
  {
    description: '새로운 비밀번호를 설정하세요',
  },
];
</script>
