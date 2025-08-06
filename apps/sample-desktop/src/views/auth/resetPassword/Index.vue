<template>
  <ResetPasswordEmailForm v-if="step === 0" v-model:step="step" />
  <ResetPasswordEmailAuth v-if="step === 1" v-model:step="step" />
  <ResetPasswordNewPassword v-if="step === 2" v-model:step="step" />
  <ResetPasswordComplete v-if="step === 3" />
</template>

<script lang="ts" setup>
import ResetPasswordNewPassword from '@/components/auth/resetPassword/ResetPasswordNewPassword.vue';
import ResetPasswordEmailForm from '@/components/auth/resetPassword/ResetPasswordEmailForm.vue';
import ResetPasswordEmailAuth from '@/components/auth/resetPassword/ResetPasswordEmailAuth.vue';
import ResetPasswordComplete from '@/components/auth/resetPassword/ResetPasswordComplete.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
