<template>
  <AuthContent title="개인회원 가입" description="가입 약관을 확인해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="0" />
      </div>
    </template>
    <template #content>
      <div>
        <div class="border-b-2 border-black pb-[10px]">
          <h2 class="text-font-14 font-semibold">가입 약관 동의</h2>
        </div>
        <div class="mt-6">
          <div class="p-size-12 border-bg-outline rounded-[10px] border">
            <BaseCheckbox
              v-model="isAllChecked"
              :indeterminate="isIndeterminate"
              @click="toggleAll"
            >
              <span class="text-font-15 font-semibold">모든 약관에 동의합니다.</span>
            </BaseCheckbox>
          </div>
          <div class="gap-size-8 px-size-12 mt-size-8 flex flex-col">
            <BaseCheckbox v-model="state.serviceAgreement">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div>
                  서비스 이용 약관 동의
                  <span class="text-red font-medium">(필수)</span>
                </div>
                <div
                  class="gap-size-2 flex items-center"
                  @click.stop="
                    () => {
                      console.log('상세보기');
                    }
                  "
                >
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="md" />
                </div>
              </div>
            </BaseCheckbox>
            <BaseCheckbox v-model="state.personalInfoAgreement">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div>
                  개인정보 수집 및 이용 동의
                  <span class="text-red font-medium">(필수)</span>
                </div>
                <div
                  class="gap-size-2 flex items-center"
                  @click.stop="
                    () => {
                      console.log('상세보기');
                    }
                  "
                >
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="md" />
                </div>
              </div>
            </BaseCheckbox>
            <BaseCheckbox v-model="state.marketingAgreement">
              <div class="text-font-12 flex w-full items-center justify-between">
                <div>
                  마케팅 활용 및 광고성 정보 수신 동의
                  <span class="text-default-muted font-medium">(선택)</span>
                </div>
                <div
                  class="gap-size-2 flex items-center"
                  @click.stop="
                    () => {
                      console.log('상세보기');
                    }
                  "
                >
                  상세보기
                  <BaseIcon name="arrow-right-thin" size="md" />
                </div>
              </div>
            </BaseCheckbox>
          </div>
        </div>
        <div class="mt-[33px]">
          <BaseButton
            size="lg"
            label="가입하기"
            variant="contained"
            color="primary"
            :disabled="!state.serviceAgreement || !state.personalInfoAgreement"
            full-width
            @click="step = 1"
          />
        </div>
      </div>
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseButton } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { reactive, computed } from 'vue';

const state = reactive({
  serviceAgreement: false,
  personalInfoAgreement: false,
  marketingAgreement: false,
});

const isAllChecked = computed(() => {
  return state.serviceAgreement && state.personalInfoAgreement && state.marketingAgreement;
});

const isIndeterminate = computed(() => {
  return (
    (state.serviceAgreement || state.personalInfoAgreement || state.marketingAgreement) &&
    !isAllChecked.value
  );
});

const toggleAll = () => {
  const newValue = !isAllChecked.value;
  state.serviceAgreement = newValue;
  state.personalInfoAgreement = newValue;
  state.marketingAgreement = newValue;
};

const step = defineModel<number>('step', { required: true });
</script>
