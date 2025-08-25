<template>
  <AuthContent title="개인회원 가입" description="서비스 이용을 위해 먼저 본인인증을 해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="1" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" :validation-rules="validationRules" @submit="handleSubmit">
        <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting }">
          <div>
            <!-- 본인인증 버튼 -->
            <div class="gap-size-12">
              <BaseButton
                v-if="!formData.isVerified"
                size="lg"
                label="휴대폰 본인인증"
                variant="outlined"
                color="red"
                full-width
                @click="startPhoneVerification"
              />
              <BaseButton
                v-else
                size="lg"
                label="인증완료"
                full-width
                :rightIcon="{ name: 'check-circle', color: 'currentColor' }"
                :customClass="'custom-green-auth-complete'"
                disabled
              />
            </div>

            <!-- 인증 진행 중일 때 추가 정보 표시 -->
            <div v-if="showVerificationDetails" class="mt-6">
              <div class="gap-size-16 flex flex-col">
                <!-- 휴대폰 번호 입력 -->
                <div>
                  <label class="text-font-14 mb-2 block font-medium">휴대폰 번호</label>
                  <BaseInput
                    v-model="formData.number"
                    size="md"
                    placeholder="010-0000-0000"
                    @blur="validateField('number')"
                  />
                  <p v-if="errors.number" class="text-red text-font-12 mt-1">
                    {{ errors.number }}
                  </p>
                </div>

                <!-- 인증 방법 선택 -->
                <div>
                  <label class="text-font-14 mb-2 block font-medium">인증 방법</label>
                  <div class="gap-size-8 flex">
                    <BaseButton
                      variant="outlined"
                      :color="formData.verificationMethod === 'sms' ? 'primary' : 'default'"
                      @click="formData.verificationMethod = 'sms'"
                    >
                      SMS 인증
                    </BaseButton>
                    <BaseButton
                      variant="outlined"
                      :color="formData.verificationMethod === 'call' ? 'primary' : 'default'"
                      @click="formData.verificationMethod = 'call'"
                    >
                      ARS 인증
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- 다음 버튼 -->
            <div class="mt-[33px] flex flex-col">
              <BaseButton
                size="lg"
                label="다음"
                variant="contained"
                color="primary"
                :disabled="!isValid || isSubmitting"
                :loading="isSubmitting"
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
import {
  BaseIcon,
  BaseStepper,
  BaseButton,
  BaseInput,
  BaseForm,
  validationHelpers,
} from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref } from 'vue';

/**
 * 개인회원 휴대폰 인증 폼 컴포넌트
 * BaseForm을 사용하여 휴대폰 인증 정보를 관리
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: PhoneFormData): void;
}

interface PhoneFormData {
  number: string;
  isVerified: boolean;
  verificationMethod: 'sms' | 'call';
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 인증 상세 정보 표시 여부
const showVerificationDetails = ref(false);

// 폼 데이터
const formData = ref({
  number: '',
  isVerified: false,
  verificationMethod: 'sms' as 'sms' | 'call',
});

// 유효성 검사 규칙
const validationRules = {
  number: validationHelpers.combine(
    validationHelpers.required('휴대폰 번호를 입력해주세요.'),
    validationHelpers.phoneNumber()
  ),
  isVerified: validationHelpers.custom(
    (value: boolean) => value === true || '휴대폰 본인인증을 완료해주세요.'
  ),
};

/**
 * 휴대폰 인증 시작
 */
const startPhoneVerification = () => {
  showVerificationDetails.value = true;

  // 실제 본인인증 서비스 연동 로직
  // 예: NICE, KCB 등의 본인인증 서비스
  console.log('휴대폰 본인인증 시작');

  // 데모용: 3초 후 인증 완료 처리
  setTimeout(() => {
    formData.value.isVerified = true;
    formData.value.number = '010-1234-5678'; // 인증된 번호로 자동 설정
    showVerificationDetails.value = false;
    console.log('휴대폰 인증 완료');
  }, 3000);
};

/**
 * 이전 단계로 이동
 */
const goBack = () => {
  emit('update:step', props.step - 1);
};

/**
 * 폼 제출 처리
 * @param data - 폼 데이터
 */
const handleSubmit = (data: Record<string, any>) => {
  const phoneData: PhoneFormData = {
    number: data.number,
    isVerified: data.isVerified,
    verificationMethod: data.verificationMethod,
  };

  emit('submit', phoneData);
  emit('update:step', props.step + 1);
};
</script>
