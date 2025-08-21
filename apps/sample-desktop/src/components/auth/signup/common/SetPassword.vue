<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="비밀번호">
      <BaseInput
        v-model="state.password"
        size="md"
        placeholder="영문+숫자, 8~16자리 이상"
        :error="true"
        errorMessage="에러메시지"
      />
      <BaseProgressBar :strength-score="0" variant="password-strength" :show-label="true" />
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
        v-model="state.passwordCheck"
        size="md"
        placeholder="다시 입력해주세요"
        :error="true"
        errorMessage="비밀번호가 일치하지 않아요"
      />
    </FormField>
  </div>
  <div class="gap-size-12 mt-[33px] flex items-center">
    <BaseButton
      size="lg"
      label="가입 신청하기"
      variant="contained"
      color="primary"
      full-width
      @click="router.push({ query: { step: 5 } })"
    />
  </div>
</template>

<script lang="ts" setup>
import { BaseInput, BaseButton, BaseProgressBar } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter();

const state = reactive({
  password: '',
  passwordCheck: '',
});
</script>
