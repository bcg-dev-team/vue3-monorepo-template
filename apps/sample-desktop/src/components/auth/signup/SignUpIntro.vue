<template>
  <AuthContent title="회원가입" description="개인회원과 법인회원 중 선택해주세요.">
    <template #content>
      <div class="gap-size-12 flex items-center justify-center">
        <BaseButton
          class="h-[80px]"
          :variant="type === 'individual' ? 'light-solid' : 'outline'"
          label="개인회원"
          @click="type = 'individual'"
        />
        <BaseButton
          class="h-[80px]"
          :variant="type === 'corporation' ? 'light-solid' : 'outline'"
          label="법인회원"
          @click="type = 'corporation'"
        />
      </div>
      <div class="mt-[33px] w-[360px]">
        <BaseButton
          size="regular"
          label="다음"
          :variant="type ? 'primary' : 'disabled'"
          @click="onClickNext"
        />
      </div>
      <div class="mt-6 flex justify-center">
        <a class="font-regular cursor-pointer text-[13px] underline">이미 아이디가 있어요</a>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import AuthContent from '@/components/auth/AuthContent.vue';
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const type = ref<'individual' | 'corporation' | null>(null);

const onClickNext = () => {
  if (type.value) {
  }
  if (type.value === 'individual') {
    router.push({ name: 'individual-sign-up' });
  } else if (type.value === 'corporation') {
    router.push({ name: 'corporate-sign-up' });
  }
};
</script>
