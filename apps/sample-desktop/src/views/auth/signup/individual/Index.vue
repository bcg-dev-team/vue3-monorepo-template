<template>
  <div class="flex min-h-screen items-center justify-center">
    <MainCardContent>
      <template #content>
        <IndividualTerms v-if="step === 0" v-model:step="step" />
        <IndividualPhone v-if="step === 1" v-model:step="step" />
        <IndividualInfo v-if="step === 2" v-model:step="step" />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualPhone from '@/components/auth/signup/individual/IndividualPhone.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { ref } from 'vue';

const step = ref(0);
</script>
