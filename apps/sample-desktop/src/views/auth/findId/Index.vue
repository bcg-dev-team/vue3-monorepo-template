<template>
  <AuthContent :title="findIdTitle[step].title" :description="findIdTitle[step].description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 2 }" :current="step" />
      </div>
    </template>
    <template #content>
      <AuthFindId v-if="step === 0" v-model:step="step" />
      <AuthFindIdResult v-if="step === 1" />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import AuthFindIdResult from '@/components/auth/findId/AuthFindIdResult.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import AuthFindId from '@/components/auth/findId/AuthFindId.vue';
import { BaseIcon, BaseStepper } from '@template/ui';
import type { AuthContentTitle } from '@/types/auth';
import { ref } from 'vue';

const step = ref(0);

const findIdTitle: AuthContentTitle[] = [
  {
    title: '아이디 찾기',
    description: '회원정보에 등록된 정보를 입력해주세요',
  },
  {
    title: '아이디 찾기 완료',
    description: '입력하신 정보와 일치하는 아이디를 찾았어요',
  },
];
</script>
