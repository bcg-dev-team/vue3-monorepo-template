<template>
  <AuthContent title="개인회원 가입" description="서비스 이용을 위해 먼저 본인인증을 해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="4" :current="1" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-12">
          <BaseButton v-if="!status" size="regular" label="휴대폰 본인인증" variant="red" />
          <BaseButton
            v-else
            size="regular"
            label="인증완료"
            variant="green-solid"
            :rightIcon="{ name: 'arrow-right-thin' }"
          />
        </div>
        <div class="mt-[33px] flex flex-col">
          <BaseButton size="regular" label="다음" variant="primary" @click="step = 2" />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseButton } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref } from 'vue';

const step = defineModel<number>('step', { required: true });
const status = ref<boolean>(false);
</script>
