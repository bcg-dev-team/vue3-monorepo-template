<template>
  <div class="flex min-h-screen items-center justify-center">
    <MainCardContent>
      <template #content>
        <AuthFindId v-if="step === 0" />
        <AuthFindIdResult v-if="step === 1" />
      </template>
    </MainCardContent>
  </div>
</template>

<script lang="ts" setup>
import AuthFindIdResult from '@/components/auth/findId/AuthFindIdResult.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import AuthFindId from '@/components/auth/findId/AuthFindId.vue';
import { ref } from 'vue';

const step = ref(1);
</script>
