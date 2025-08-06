<template>
  <div class="flex min-h-screen items-center justify-center">
    <MainCardContent>
      <template #content>
        <BaseLogin />
      </template>
    </MainCardContent>
  </div>
</template>
<script lang="ts" setup>
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import BaseLogin from '@/components/auth/login/BaseLogin.vue';
</script>
