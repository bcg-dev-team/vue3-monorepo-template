<template>
  <AuthContent title="새 비밀번호 설정" description="새로운 비밀번호를 설정하세요요">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="3" :current="2" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-16 flex flex-col">
          <FormField label="비밀번호">
            <BaseInput
              size="md"
              placeholder="영문+숫자, 8~16자리 이상"
              :error="true"
              errorMessage="에러메시지"
            />
          </FormField>
          <div
            class="mt-size-12 border-primary-primary800 bg-primary-primary100 p-size-8 text-font-12 text-default-muted-dark rounded-md border"
          >
            <p>8자 이상 입력해주세요</p>
            <p>영문 대/소문자, 숫자, 특수문자를 포함해주세요</p>
            <p>연속된 문자나 반복 문자는 피해주세요</p>
          </div>
          <FormField label="비밀번호 확인">
            <BaseInput
              size="md"
              placeholder="다시 입력해주세요"
              :error="true"
              errorMessage="비밀번호가 일치하지 않아요"
            />
          </FormField>
        </div>
        <div class="gap-size-12 mt-[33px] flex items-center">
          <BaseButton size="regular" label="다음" variant="disabled" />
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseInput, BaseButton } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';
</script>
