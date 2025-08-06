<template>
  <AuthFindId v-if="step === 0" v-model:step="step" />
  <AuthFindIdResult v-if="step === 1" />
</template>

<script lang="ts" setup>
import AuthFindIdResult from '@/components/auth/findId/AuthFindIdResult.vue';
import AuthFindId from '@/components/auth/findId/AuthFindId.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
