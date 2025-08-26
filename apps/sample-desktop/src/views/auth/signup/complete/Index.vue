<template>
  <AuthContent class="!pb-[30px]">
    <template #content>
      <SingUpComplete />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
</script>
