<template>
  <CorporateTerms v-if="step === 0" v-model:step="step" />
  <CorporatePhone v-if="step === 1" v-model:step="step" />
  <CorporateEmailForm v-if="step === 2" v-model:step="step" />
  <CorporateEmailAuth v-if="step === 3" v-model:step="step" />
  <CorporateSetPassword v-if="step === 4" v-model:step="step" />
  <CorporateInfo v-if="step === 5" v-model:step="step" />
  <CorporateDocument v-if="step === 6" v-model:step="step" />
  <CorporateDocument2 v-if="step === 7" v-model:step="step" />
  <SingUpComplete v-if="step === 8" v-model:step="step" />
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
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
