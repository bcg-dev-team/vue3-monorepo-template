<template>
  <div class="flex items-center justify-center min-h-screen">
    <MainCardContent>
      <template #content>
        <IndividualTerms />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
</script>
