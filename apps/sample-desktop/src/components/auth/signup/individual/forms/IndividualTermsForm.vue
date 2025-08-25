<template>
  <AuthContent title="개인회원 가입" description="가입 약관을 확인해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="0" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" @submit="handleSubmit">
        <template #default="{ formData, validateField, submit }">
          <div>
            <div class="border-b-2 border-black pb-[10px]">
              <h2 class="text-font-14 font-semibold">가입 약관 동의</h2>
            </div>

            <div class="mt-6">
              <!-- 전체 동의 체크박스 -->
              <div class="p-size-12 border-bg-outline flex items-center rounded-[10px] border">
                <BaseCheckbox
                  v-model="isAllChecked"
                  :indeterminate="isIndeterminate"
                  @click="toggleAll"
                >
                  <span class="text-font-15 font-semibold">모든 약관에 동의합니다.</span>
                </BaseCheckbox>
              </div>

              <!-- 개별 약관 동의 -->
              <div class="gap-size-8 px-size-12 mt-size-8 flex flex-col">
                <BaseCheckbox
                  v-model="formData.serviceAgreement"
                  @change="validateField('serviceAgreement')"
                >
                  <div class="text-font-12 flex w-full items-center justify-between">
                    <div>
                      서비스 이용 약관 동의
                      <span class="text-red font-medium">(필수)</span>
                    </div>
                    <div
                      class="gap-size-2 flex items-center"
                      @click.stop="showTermsDetail('service')"
                    >
                      상세보기
                      <BaseIcon name="arrow-right-thin" size="md" />
                    </div>
                  </div>
                </BaseCheckbox>

                <BaseCheckbox
                  v-model="formData.personalInfoAgreement"
                  @change="validateField('personalInfoAgreement')"
                >
                  <div class="text-font-12 flex w-full items-center justify-between">
                    <div>
                      개인정보 수집 및 이용 동의
                      <span class="text-red font-medium">(필수)</span>
                    </div>
                    <div
                      class="gap-size-2 flex items-center"
                      @click.stop="showTermsDetail('privacy')"
                    >
                      상세보기
                      <BaseIcon name="arrow-right-thin" size="md" />
                    </div>
                  </div>
                </BaseCheckbox>

                <BaseCheckbox v-model="formData.marketingAgreement">
                  <div class="text-font-12 flex w-full items-center justify-between">
                    <div>
                      마케팅 활용 및 광고성 정보 수신 동의
                      <span class="text-default-muted font-medium">(선택)</span>
                    </div>
                    <div
                      class="gap-size-2 flex items-center"
                      @click.stop="showTermsDetail('marketing')"
                    >
                      상세보기
                      <BaseIcon name="arrow-right-thin" size="md" />
                    </div>
                  </div>
                </BaseCheckbox>
              </div>
            </div>

            <!-- 제출 버튼 -->
            <div class="mt-[33px]">
              <BaseButton
                size="lg"
                label="가입하기"
                variant="contained"
                color="primary"
                :disabled="!formData.serviceAgreement || !formData.personalInfoAgreement"
                full-width
                @click="submit"
              />
            </div>
          </div>
        </template>
      </BaseForm>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseButton, BaseCheckbox, BaseForm } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { computed, ref } from 'vue';

/**
 * 개인회원 약관 동의 폼 컴포넌트
 * BaseForm을 사용하여 약관 동의 상태를 관리하고 유효성 검사를 수행
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: TermsFormData): void;
}

interface TermsFormData {
  serviceAgreement: boolean;
  personalInfoAgreement: boolean;
  marketingAgreement: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 폼 데이터
const formData = ref({
  serviceAgreement: false,
  personalInfoAgreement: false,
  marketingAgreement: false,
});

// 전체 선택 관련 computed
const isAllChecked = computed(() => {
  return (
    formData.value.serviceAgreement &&
    formData.value.personalInfoAgreement &&
    formData.value.marketingAgreement
  );
});

const isIndeterminate = computed(() => {
  const checkedCount = [
    formData.value.serviceAgreement,
    formData.value.personalInfoAgreement,
    formData.value.marketingAgreement,
  ].filter(Boolean).length;

  return checkedCount > 0 && checkedCount < 3;
});

/**
 * 전체 약관 동의 토글
 */
const toggleAll = () => {
  const newValue = !isAllChecked.value;
  formData.value.serviceAgreement = newValue;
  formData.value.personalInfoAgreement = newValue;
  formData.value.marketingAgreement = newValue;
};

/**
 * 약관 상세보기
 * @param type - 약관 타입
 */
const showTermsDetail = (type: 'service' | 'privacy' | 'marketing') => {
  console.log(`${type} 약관 상세보기`);
  // 약관 상세 모달 또는 페이지 이동 로직
};

/**
 * 이전 단계로 이동
 */
const goBack = () => {
  // 이전 페이지로 이동 (회원가입 타입 선택 페이지)
  console.log('이전 페이지로 이동');
};

/**
 * 폼 제출 처리
 * @param data - 폼 데이터
 */
const handleSubmit = (data: Record<string, any>) => {
  console.log('IndividualTermsForm의 handleSubmit 실행');
  const termsData: TermsFormData = {
    serviceAgreement: data.serviceAgreement,
    personalInfoAgreement: data.personalInfoAgreement,
    marketingAgreement: data.marketingAgreement,
  };

  emit('submit', termsData);
  emit('update:step', props.step + 1);
};
</script>
