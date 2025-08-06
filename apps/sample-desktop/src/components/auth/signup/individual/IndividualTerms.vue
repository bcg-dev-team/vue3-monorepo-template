<template>
  <AuthContent title="개인회원 가입" description="가입 약관을 확인해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BasePaginationJoin :count="4" :current="0" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="border-b-2 border-black pb-[10px]">
          <h2 class="text-font-14 font-semibold">가입 약관 동의</h2>
        </div>
        <div class="mt-6">
          <div class="p-size-12 border-bg-outline rounded-[10px] border">
            <CheckBoxLabel v-model:isChecked="isChecked">
              <span class="text-font-15 font-semibold">모든 약관에 동의합니다.</span>
            </CheckBoxLabel>
          </div>
          <div class="gap-size-8 px-size-12 mt-size-8 flex flex-col">
            <CheckBoxLabel v-model:isChecked="isChecked">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div class="font-medium">
                  서비스 이용 약관 동의
                  <span class="text-red">(필수)</span>
                </div>
                <div class="gap-size-2 flex items-center">
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="sm" />
                </div>
              </div>
            </CheckBoxLabel>
            <CheckBoxLabel v-model:isChecked="isChecked">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div class="font-medium">
                  개인정보 수집 및 이용 동의
                  <span class="text-red">(필수)</span>
                </div>
                <div class="gap-size-2 flex items-center">
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="sm" />
                </div>
              </div>
            </CheckBoxLabel>
            <CheckBoxLabel v-model:isChecked="isChecked">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div class="font-medium">
                  마케팅 활용 및 광고성 정보 수신 동의
                  <span class="text-default-muted">(선택)</span>
                </div>
                <div class="gap-size-2 flex items-center">
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="sm" />
                </div>
              </div>
            </CheckBoxLabel>
          </div>
        </div>
        <div class="mt-[33px]">
          <BaseButton size="regular" label="가입하기" variant="primary" @click="step = 1" />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import { BaseIcon, BasePaginationJoin, BaseButton } from '@template/ui';
import CheckBoxLabel from '@/components/auth/common/CheckBoxLabel.vue';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref } from 'vue';

const isChecked = ref(false);

const step = defineModel<number>('step', { required: true });
</script>
