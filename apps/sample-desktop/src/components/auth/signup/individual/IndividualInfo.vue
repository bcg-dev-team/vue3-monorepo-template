<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이름(한글)">
      <BaseInput size="md" disabled />
    </FormField>
    <FormField label="휴대폰번호">
      <BaseInput size="md" disabled />
    </FormField>
    <FormField label="생년월일">
      <BaseInput size="md" disabled />
    </FormField>
    <div class="gap-size-8 flex items-center">
      <FormField label="이름(영문)">
        <BaseInput size="md" placeholder="예) GILDONG" />
      </FormField>
      <FormField label="성(영문)">
        <BaseInput size="md" placeholder="예) HONG" />
      </FormField>
    </div>
    <FormField label="거주지 주소(한글)">
      <div class="gap-size-8 flex flex-col">
        <BaseInput size="md" placeholder="주소 검색" />
        <BaseInput size="md" placeholder="상세주소" />
      </div>
    </FormField>
    <FormField label="거주지 주소(영문)">
      <div class="gap-size-8 flex flex-col">
        <BaseInput size="md" placeholder="주소 검색" />
        <BaseInput size="md" placeholder="상세주소" />
      </div>
    </FormField>
  </div>
  <div class="mt-[33px] w-[360px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="router.push({ query: { step: 6 } })"
    />
  </div>
</template>
<script lang="ts" setup>
import FormField from '@/components/auth/common/FormField.vue';
import { BaseButton, BaseInput } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
