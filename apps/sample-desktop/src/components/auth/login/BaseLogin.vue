<template>
  <AuthContent title="개인회원 가입">
    <template #content>
      <div>
        <div class="gap-size-16 flex flex-col">
          <FormField label="이메일주소(ID)">
            <BaseInput size="md" placeholder="example@email.com" />
          </FormField>
          <FormField label="비밀번호">
            <BaseInput size="md" placeholder="영문+숫자, 8~16자리 이상" />
          </FormField>
          <div class="flex items-center justify-between">
            <div>
              <BaseCheckbox v-model="isChecked"
                ><span class="text-font-13">아이디 저장</span>
              </BaseCheckbox>
            </div>
            <div class="gap-size-12 text-font-13 flex items-center">
              <a class="cursor-pointer underline" href="/auth/find-id">아이디 찾기</a>
              <span class="text-font-12 text-default-muted">|</span>
              <a class="cursor-pointer underline" href="/auth/reset-password">비밀번호 재설정</a>
            </div>
          </div>
        </div>
        <div class="mt-[33px]">
          <BaseButton size="lg" label="로그인" variant="contained" color="primary" full-width />
        </div>
        <div class="mt-6 flex justify-center">
          <a class="font-regular cursor-pointer text-[13px] underline" href="/auth/sign-up"
            >가입하기</a
          >
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { BaseInput, BaseButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { ref } from 'vue';

const isChecked = ref<boolean>(false);
</script>
