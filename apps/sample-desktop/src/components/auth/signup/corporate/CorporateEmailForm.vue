<template>
  <AuthContent title="법인회원 가입" description="아이디로 사용할 이메일주소를 입력해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="2" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="gap-size-16 flex flex-col">
          <FormField label="이메일주소(ID)">
            <BaseInput
              size="md"
              placeholder="example@email.com"
              errorMessage="이메일 형식이 올바르지 않아요"
              :error="true"
            />
          </FormField>
        </div>
        <div class="mt-[33px]">
          <BaseButton
            size="lg"
            label="다음"
            variant="contained"
            color="primary"
            full-width
            @click="step = 3"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseInput, BaseButton } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';

const step = defineModel<number>('step', { required: true });
</script>
