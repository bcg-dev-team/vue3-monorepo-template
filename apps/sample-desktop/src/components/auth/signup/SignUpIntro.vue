<template>
  <AuthContent title="회원가입" description="개인회원과 법인회원 중 선택해주세요.">
    <template #content>
      <div>
        <div class="gap-size-12 flex items-center justify-center">
          <BaseButton
            class="h-[80px]"
            variant="outlined"
            :color="type === 'individual' ? 'primary' : 'white'"
            label="개인회원"
            full-width
            @click="type = 'individual'"
          />
          <BaseButton
            class="h-[80px]"
            variant="outlined"
            :color="type === 'corporation' ? 'primary' : 'white'"
            label="법인회원"
            full-width
            @click="type = 'corporation'"
          />
        </div>
        <div class="mt-[33px] w-[360px]">
          <BaseButton
            size="lg"
            label="다음"
            variant="contained"
            :disabled="!type"
            full-width
            @click="onClickNext"
          />
        </div>
        <div class="mt-6 flex justify-center">
          <a class="font-regular cursor-pointer text-[13px] underline">이미 아이디가 있어요</a>
        </div>
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
