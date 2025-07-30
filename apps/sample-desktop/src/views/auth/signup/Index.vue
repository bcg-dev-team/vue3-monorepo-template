<template>
  <div class="flex items-center justify-center min-h-screen">
    <MainCardContent>
      <template #content>
        <SignUpIntro />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import SignUpIntro from '@/components/auth/signup/SignUpIntro.vue';
</script>
