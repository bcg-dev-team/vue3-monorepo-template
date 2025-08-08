<template>
  <div class="flex items-center gap-2">
    <BaseButton variant="contained" label="로그인" size="sm" color="cancel" pill />
    <BaseButton variant="contained" label="회원가입" size="sm" color="primary" pill />
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@template/ui';
</script>
