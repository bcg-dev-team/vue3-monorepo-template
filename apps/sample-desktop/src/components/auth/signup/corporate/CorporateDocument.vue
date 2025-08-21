<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="사업자등록증명원">
      <BaseFileUploadButton status="hover" />
    </FormField>
    <FormField label="법인대표초본(영문)">
      <BaseFileUploadButton status="hover" />
    </FormField>
    <FormField label="법인명 공과금 납부서">
      <BaseFileUploadButton status="hover" />
    </FormField>

    <div class="mt-[33px]">
      <BaseButton
        size="lg"
        label="다음"
        variant="contained"
        color="primary"
        full-width
        @click="router.push({ query: { step: 7 } })"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BaseButton, BaseFileUploadButton } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
