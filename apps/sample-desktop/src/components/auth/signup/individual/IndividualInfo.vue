<template>
  <AuthContent title="개인회원 가입" description="정보를 입력해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="4" :current="3" />
      </div>
    </template>
    <template #content>
      <div>
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
            size="large"
            label="다음"
            variant="contained"
            color="primary"
            full-width
            @click="step = 6"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseButton, BaseInput } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';

const step = defineModel<number>('step', { required: true });
</script>
