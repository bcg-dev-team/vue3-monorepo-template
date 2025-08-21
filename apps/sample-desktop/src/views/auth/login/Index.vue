<template>
  <AuthContent title="로그인">
    <template #content>
      <BaseLogin />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import AuthContent from '@/components/auth/common/AuthContent.vue';
import BaseLogin from '@/components/auth/login/BaseLogin.vue';
</script>
