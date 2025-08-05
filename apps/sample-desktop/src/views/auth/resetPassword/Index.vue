<template>
  <div class="flex min-h-screen items-center justify-center">
    <MainCardContent>
      <template #content>
        <ResetPasswordEmailForm v-if="step === 0" />
        <ResetPasswordEmailAuth v-if="step === 1" />
        <ResetPasswordNewPassword v-if="step === 2" />
      </template>
    </MainCardContent>
  </div>
</template>

<script lang="ts" setup>
import ResetPasswordNewPassword from '@/components/auth/resetPassword/ResetPasswordNewPassword.vue';
import ResetPasswordEmailForm from '@/components/auth/resetPassword/ResetPasswordEmailForm.vue';
import ResetPasswordEmailAuth from '@/components/auth/resetPassword/ResetPasswordEmailAuth.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
