<template>
  <AuthContent title="개인회원 가입" :description="individualDescription[step].description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 7 }" :current="step" />
      </div>
    </template>
    <template #content>
      <IndividualTerms v-if="step === 0" v-model:step="step" />
      <IndividualPhone v-if="step === 1" v-model:step="step" />
      <IndividualEmailForm v-if="step === 2" v-model:step="step" />
      <IndividualEmailAuth v-if="step === 3" v-model:step="step" />
      <IndividualSetPassword v-if="step === 4" v-model:step="step" />
      <IndividualInfo v-if="step === 5" v-model:step="step" />
      <IndividualDocument v-if="step === 6" v-model:step="step" />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import IndividualSetPassword from '@/components/auth/signup/individual/IndividualSetPassword.vue';
import IndividualEmailForm from '@/components/auth/signup/individual/IndividualEmailForm.vue';
import IndividualEmailAuth from '@/components/auth/signup/individual/IndividualEmailAuth.vue';
import IndividualDocument from '@/components/auth/signup/individual/IndividualDocument.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualPhone from '@/components/auth/signup/individual/IndividualPhone.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { BaseIcon, BaseStepper } from '@template/ui';
import type { AuthContentTitle } from '@/types/auth';
import { ref } from 'vue';

const step = ref(0);

const individualDescription: AuthContentTitle[] = [
  {
    description: '가입 약관을 확인해주세요.',
  },
  {
    description: '서비스 이용을 위해 먼저 본인인증을 해주세요.',
  },
  {
    description: '아이디로 사용할 이메일주소를 입력해주세요.',
  },
  {
    description: `메일함에서 인증 메일을 확인해주세요. <br/> 인증번호 6자리를 입력하면 회원가입이 완료돼요.`,
  },
  {
    description: '비밀번호를 설정해주세요.',
  },
  {
    description: '정보를 입력해주세요.',
  },
  {
    description: `
        가입에 필요한 서류를 제출해주세요.<br/>
        관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
        <p class='mt-size-12 text-font-12 text-blue'>※ 파일형식: .png, .jpg, .pdf / 파일 사이즈 300KB 미만</p>
      `,
  },
];
</script>
