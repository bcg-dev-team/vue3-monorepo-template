<template>
  <AuthContent class="!pb-[30px]">
    <template #content>
      <ResetPasswordComplete />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import ResetPasswordComplete from '@/components/auth/resetPassword/ResetPasswordComplete.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
</script>
