<template>
  <AuthContent title="법인회원 가입" :description="corporateDescription[step].description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 8 }" :current="step" />
      </div>
    </template>
    <template #content>
      <CorporateTerms v-if="step === 0" v-model:step="step" />
      <CorporatePhone v-if="step === 1" v-model:step="step" />
      <CorporateEmailForm v-if="step === 2" v-model:step="step" />
      <CorporateEmailAuth v-if="step === 3" v-model:step="step" />
      <CorporateSetPassword v-if="step === 4" v-model:step="step" />
      <CorporateInfo v-if="step === 5" v-model:step="step" />
      <CorporateDocument v-if="step === 6" v-model:step="step" />
      <CorporateDocument2 v-if="step === 7" v-model:step="step" />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import CorporateSetPassword from '@/components/auth/signup/corporate/CorporateSetPassword.vue';
import CorporateEmailForm from '@/components/auth/signup/corporate/CorporateEmailForm.vue';
import CorporateEmailAuth from '@/components/auth/signup/corporate/CorporateEmailAuth.vue';
import CorporateDocument2 from '@/components/auth/signup/corporate/CorporateDocument2.vue';
import CorporateDocument from '@/components/auth/signup/corporate/CorporateDocument.vue';
import CorporateTerms from '@/components/auth/signup/corporate/CorporateTerms.vue';
import CorporatePhone from '@/components/auth/signup/corporate/CorporatePhone.vue';
import CorporateInfo from '@/components/auth/signup/corporate/CorporateInfo.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { BaseIcon, BaseStepper } from '@template/ui';
import { ref } from 'vue';

const step = ref(0);

type CorporateDescriptionProps = {
  description: string;
};

const corporateDescription: CorporateDescriptionProps[] = [
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
        구비서류의 스캔본을 제출해주세요.<br/>
        관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
        <p class='mt-size-12 text-font-12 text-blue'>※ 파일형식: .png, .jpg, .pdf / 파일 10MB 미만</p>
      `,
  },
  {
    description: `
        구비서류의 스캔본을 제출해주세요.<br/>
        관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
        <p class='mt-size-12 text-font-12 text-blue'>※ 파일형식: .png, .jpg, .pdf / 파일 10MB 미만</p>
      `,
  },
];
</script>
