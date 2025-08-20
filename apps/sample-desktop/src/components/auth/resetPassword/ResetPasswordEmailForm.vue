<template>
  <AuthContent
    title="비밀번호 재설정"
    description="비밀번호를 재설정하고자 하는 아이디를 입력해주세요"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 3 }" :current="0" />
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
            @click="step = 1"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseInput, BaseButton } from '@template/ui';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import FormField from '@/components/auth/common/FormField.vue';

const step = defineModel<number>('step', { required: true });
</script>
