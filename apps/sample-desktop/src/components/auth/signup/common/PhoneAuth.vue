<template>
  <div class="gap-size-12">
    <BaseButton
      v-if="!status"
      size="lg"
      label="휴대폰 본인인증"
      variant="outlined"
      color="red"
      @click="status = true"
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
      :disabled="!status"
      @click="handleClickNext"
    />
  </div>
</template>
<script lang="ts" setup>
import { useSignupStore } from '@/stores/useSignupStore';
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const status = ref<boolean>(false);
const signupStore = useSignupStore();

const mockUserInfo = {
  ci: Date.now().toString(),
  name: '홍길동',
  phoneNo: '010-1234-5678',
  birth: '1990-01-01',
};

const handleClickNext = () => {
  signupStore.updateUserInfo(mockUserInfo);
  router.push({ query: { step: 2 } });
};
</script>
