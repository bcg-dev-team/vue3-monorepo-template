<template>
  <AuthContent title="법인회원 가입" :description="description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="3" />
      </div>
    </template>
    <template #content>
      <div class="gap-size-16 flex flex-col">
        <FormField label="주주 명부(영문 공증 필요)">
          <BaseFileUploadButton status="hover" />
        </FormField>
        <FormField label="법인대표 여권 사본">
          <BaseFileUploadButton status="hover" />
        </FormField>
        <div>
          <div class="mt-size-12 gap-size-4 flex items-center">
            <span class="text-font-16 font-semibold">법인의 대표가 2명 이상인가요?</span>
            <BaseCheckbox v-model="isChecked" />
          </div>
          <div v-if="isChecked" class="gap-size-12 mt-size-4 flex flex-col">
            <span class="text-font-14"> 모든 법인대표들의 여권 사본을 각각 제출해주세요. </span>
            <BaseFileUploadButton status="hover" />
            <BaseButton
              size="sm"
              label=""
              variant="contained"
              :rightIcon="{ name: 'plus' }"
              color="cancel"
              full-width
            />
          </div>
        </div>
        <div class="mt-[33px]">
          <BaseButton
            size="lg"
            label="제출하기"
            variant="contained"
            color="primary"
            full-width
            @click="step = 8"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import {
  BaseIcon,
  BaseStepper,
  BaseButton,
  BaseFileUploadButton,
  BaseCheckbox,
} from '@template/ui';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import FormField from '@/components/auth/common/FormField.vue';
import { ref } from 'vue';

const step = defineModel<number>('step', { required: true });

const isChecked = ref<boolean>(false);
const fileUploadsCount = ref<number>(1);
const description = `
      가입에 필요한 서류를 제출해주세요.<br/>
      관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
      <p class='mt-size-12 text-font-12 text-blue'>&#8251; 파일형식: .png, .jpg, .pdf / 파일 사이즈 300KB 미만</p>
      `;
</script>
