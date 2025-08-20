<template>
  <div class="gap-size-12">
    <BaseButton
      v-if="!status"
      size="lg"
      label="휴대폰 본인인증"
      variant="outlined"
      color="red"
      full-width
    />
    <BaseButton
      v-else
      size="lg"
      label="인증완료"
      full-width
      :rightIcon="{ name: 'check-circle', color: 'currentColor' }"
      :customClass="'custom-green-auth-complete'"
    />
  </div>
  <div class="mt-[33px] flex flex-col">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="step = 2"
    />
  </div>
</template>
<script lang="ts" setup>
import { BaseButton } from '@template/ui';
import { ref } from 'vue';

const step = defineModel<number>('step', { required: true });
const status = ref<boolean>(false);
</script>
