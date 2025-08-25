<template>
  <AuthContent title="개인회원 가입" description="아이디로 사용할 이메일주소를 입력해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="2" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" :validation-rules="validationRules" @submit="handleSubmit">
        <template #default="{ formData, errors, validateField, submit, isValid }">
          <div>
            <div class="gap-size-16 flex flex-col">
              <!-- 이메일 주소 입력 -->
              <FormField label="이메일주소(ID)">
                <BaseInput
                  v-model="formData.email"
                  size="md"
                  type="email"
                  placeholder="example@email.com"
                  :error="!!errors.email"
                  :errorMessage="errors.email"
                  @blur="validateField('email')"
                />
              </FormField>
            </div>

            <!-- 다음 버튼 -->
            <div class="mt-[33px]">
              <BaseButton
                size="lg"
                label="다음"
                variant="contained"
                color="primary"
                :disabled="!isValid"
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
  BaseInput,
  BaseButton,
  BaseForm,
  validationHelpers,
} from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref } from 'vue';

/**
 * 개인회원 이메일 설정 폼 컴포넌트
 * BaseForm을 사용하여 이메일 주소 입력을 처리
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: EmailFormData): void;
}

interface EmailFormData {
  email: string;
  verificationCode: string;
  isVerified: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 폼 데이터
const formData = ref({
  email: '',
  verificationCode: '',
  isVerified: false,
});

// 유효성 검사 규칙
const validationRules = {
  email: (value: string) => {
    // required 체크
    if (!value || value.trim() === '') {
      return '이메일 주소를 입력해주세요.';
    }

    // email 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return '올바른 이메일 형식을 입력해주세요.';
    }

    return true;
  },
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
const handleSubmit = async (data: Record<string, any>) => {
  const emailData: EmailFormData = {
    email: data.email,
    verificationCode: '',
    isVerified: false,
  };

  // 이메일 인증 메일 발송
  try {
    console.log('이메일 인증 메일 발송:', emailData.email);

    // 실제 API 호출
    // await sendVerificationEmail(emailData.email)

    emit('submit', emailData);
    emit('update:step', props.step + 1);
  } catch (error) {
    console.error('이메일 인증 메일 발송 실패:', error);
    alert('인증 메일 발송에 실패했습니다. 다시 시도해주세요.');
  }
};
</script>
