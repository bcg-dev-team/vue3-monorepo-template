<template>
  <IndividualTerms v-if="step === 0" v-model:step="step" />
  <IndividualPhone v-if="step === 1" v-model:step="step" />
  <IndividualEmailForm v-if="step === 2" v-model:step="step" />
  <IndividualEmailAuth v-if="step === 3" v-model:step="step" />
  <IndividualSetPassword v-if="step === 4" v-model:step="step" />
  <IndividualInfo v-if="step === 5" v-model:step="step" />
  <IndividualDocument v-if="step === 6" v-model:step="step" />
  <SingUpComplete v-if="step === 7" v-model:step="step" />
</template>
<script lang="ts" setup>
import IndividualSetPassword from '@/components/auth/signup/individual/IndividualSetPassword.vue';
import IndividualEmailForm from '@/components/auth/signup/individual/IndividualEmailForm.vue';
import IndividualEmailAuth from '@/components/auth/signup/individual/IndividualEmailAuth.vue';
import IndividualDocument from '@/components/auth/signup/individual/IndividualDocument.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualPhone from '@/components/auth/signup/individual/IndividualPhone.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
