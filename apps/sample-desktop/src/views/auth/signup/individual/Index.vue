<template>
  <div class="flex items-center justify-center min-h-screen">
    <MainCardContent>
      <template #content>
        <IndividualTerms v-if="step === 1" />
        <IndividualPhone v-if="step === 2" />
        <IndividualInfo v-if="step === 3" />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualPhone from '@/components/auth/signup/individual/IndividualPhone.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import { ref } from 'vue';

const step = ref(3);
</script>
