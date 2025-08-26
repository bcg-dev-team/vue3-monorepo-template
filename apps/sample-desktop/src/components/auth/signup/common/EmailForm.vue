<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이메일주소(ID)">
      <BaseInput
        size="md"
        placeholder="example@email.com"
        errorMessage="이메일 형식이 올바르지 않아요"
        :error="true"
      />
    </FormField>
  </div>
  <div class="mt-[33px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="router.push({ query: { step: 3 } })"
    />
  </div>
</template>

<script lang="ts" setup>
import FormField from '@/components/auth/common/FormField.vue';
import { BaseInput, BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
