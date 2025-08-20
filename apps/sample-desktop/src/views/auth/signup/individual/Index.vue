<template>
  <AuthContent title="개인회원 가입" description="가입 약관을 확인해주세요.">
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
import { ref } from 'vue';

const step = ref(0);
</script>
