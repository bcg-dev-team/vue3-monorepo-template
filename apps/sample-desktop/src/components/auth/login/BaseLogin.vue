<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이메일주소(ID)">
      <BaseInput size="md" placeholder="example@email.com" />
    </FormField>
    <FormField label="비밀번호">
      <BaseInput size="md" placeholder="영문+숫자, 8~16자리 이상" />
    </FormField>
    <div class="flex items-center justify-between">
      <div>
        <BaseCheckbox v-model="isChecked">
          <span class="text-font-13">아이디 저장</span>
        </BaseCheckbox>
      </div>
      <div class="gap-size-12 flex items-center">
        <Anchor size="sm" to="find-id">아이디 찾기</Anchor>
        <span class="text-font-12 text-default-muted">|</span>
        <Anchor size="sm" to="reset-password">비밀번호 재설정</Anchor>
      </div>
    </div>
  </div>
  <div class="mt-[33px]">
    <BaseButton
      size="lg"
      label="로그인"
      variant="contained"
      color="primary"
      full-width
      @click="handleLogin"
    />
  </div>
  <div class="mt-6 flex justify-center">
    <Anchor size="sm" to="sign-up">가입하기</Anchor>
  </div>
</template>

<script lang="ts" setup>
import LocalStorageService from '@/service/localStorage/local-storage.service';
import LocalStorageKey from '@/service/localStorage/local-storage-key';
import { BaseInput, BaseButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import Anchor from '@/components/common/Anchor.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isChecked = ref<boolean>(false);

const handleLogin = () => {
  LocalStorageService.setItem(LocalStorageKey.TOKEN, 'Authorized Token');
  router.push({ name: 'home' });
};
</script>
