<template>
  <div class="flex min-h-screen items-center justify-center">
    <MainCardContent>
      <template #content>
        <ResetPasswordEmailForm v-if="step === 0" />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import ResetPasswordEmailForm from '@/components/auth/resetPassword/ResetPasswordEmailForm.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
