<template>
  <AuthContent title="개인회원 가입" description="비밀번호를 설정해주세요.">
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
              <!-- 비밀번호 입력 -->
              <FormField label="비밀번호">
                <BaseInput
                  v-model="formData.password"
                  size="md"
                  type="password"
                  placeholder="영문+숫자, 8~16자리 이상"
                  :error="!!errors.password"
                  :errorMessage="errors.password"
                  @blur="validateField('password')"
                  @input="updatePasswordStrength"
                />

                <!-- 비밀번호 강도 표시 -->
                <BaseProgressBar
                  :strength-score="passwordStrength.score"
                  variant="password-strength"
                  :show-label="true"
                  class="mt-2"
                />
              </FormField>

              <!-- 비밀번호 규칙 안내 -->
              <div
                class="mt-size-12 border-primary-primary800 bg-primary-primary100 p-size-8 text-font-12 text-default-muted-dark rounded-md border"
              >
                <div class="flex items-center gap-1">
                  <span :class="passwordStrength.hasMinLength ? 'text-green' : 'text-default-muted'"
                    >✓</span
                  >
                  <p>8자 이상 입력해주세요</p>
                </div>
                <div class="flex items-center gap-1">
                  <span :class="passwordStrength.hasLetter ? 'text-green' : 'text-default-muted'"
                    >✓</span
                  >
                  <p>영문 대/소문자를 포함해주세요</p>
                </div>
                <div class="flex items-center gap-1">
                  <span :class="passwordStrength.hasNumber ? 'text-green' : 'text-default-muted'"
                    >✓</span
                  >
                  <p>숫자를 포함해주세요</p>
                </div>
                <div class="flex items-center gap-1">
                  <span
                    :class="passwordStrength.hasSpecialChar ? 'text-green' : 'text-default-muted'"
                    >✓</span
                  >
                  <p>특수문자를 포함해주세요</p>
                </div>
                <div class="flex items-center gap-1">
                  <span
                    :class="passwordStrength.hasNoSequence ? 'text-green' : 'text-default-muted'"
                    >✓</span
                  >
                  <p>연속된 문자나 반복 문자는 피해주세요</p>
                </div>
              </div>

              <!-- 비밀번호 확인 입력 -->
              <FormField label="비밀번호 확인">
                <BaseInput
                  v-model="formData.passwordCheck"
                  size="md"
                  type="password"
                  placeholder="다시 입력해주세요"
                  :error="!!errors.passwordCheck"
                  :errorMessage="errors.passwordCheck"
                  @blur="validateField('passwordCheck')"
                />
              </FormField>
            </div>

            <!-- 다음 버튼 -->
            <div class="gap-size-12 mt-[33px] flex items-center">
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
  BaseProgressBar,
  BaseForm,
  validationHelpers,
} from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref, reactive, computed } from 'vue';

/**
 * 개인회원 비밀번호 설정 폼 컴포넌트
 * BaseForm을 사용하여 비밀번호 설정 및 강도 검사를 처리
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: PasswordFormData): void;
}

interface PasswordFormData {
  password: string;
  passwordCheck: string;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 폼 데이터
const formData = ref({
  password: '',
  passwordCheck: '',
});

// 비밀번호 강도 정보
const passwordStrength = reactive({
  score: 0,
  hasMinLength: false,
  hasLetter: false,
  hasNumber: false,
  hasSpecialChar: false,
  hasNoSequence: false,
});

// 유효성 검사 규칙
const validationRules = {
  password: validationHelpers.combine(
    validationHelpers.required('비밀번호를 입력해주세요.'),
    validationHelpers.passwordStrength()
  ),
  passwordCheck: validationHelpers.combine(
    validationHelpers.required('비밀번호 확인을 입력해주세요.'),
    validationHelpers.confirm('password', '비밀번호가 일치하지 않습니다.')
  ),
};

/**
 * 비밀번호 강도 업데이트
 */
const updatePasswordStrength = () => {
  const password = formData.value.password;

  // 각 조건 확인
  passwordStrength.hasMinLength = password.length >= 8;
  passwordStrength.hasLetter = /[a-zA-Z]/.test(password);
  passwordStrength.hasNumber = /[0-9]/.test(password);
  passwordStrength.hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // 연속된 문자나 반복 문자 체크
  passwordStrength.hasNoSequence = !hasSequentialChars(password) && !hasRepeatingChars(password);

  // 점수 계산 (0-4)
  const conditions = [
    passwordStrength.hasMinLength,
    passwordStrength.hasLetter,
    passwordStrength.hasNumber,
    passwordStrength.hasSpecialChar,
    passwordStrength.hasNoSequence,
  ];

  passwordStrength.score = conditions.filter(Boolean).length - 1; // 0-4 범위로 조정
};

/**
 * 연속된 문자 체크
 * @param password - 검사할 비밀번호
 */
const hasSequentialChars = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    const char1 = password.charCodeAt(i);
    const char2 = password.charCodeAt(i + 1);
    const char3 = password.charCodeAt(i + 2);

    if (char2 === char1 + 1 && char3 === char2 + 1) {
      return true;
    }
  }
  return false;
};

/**
 * 반복된 문자 체크
 * @param password - 검사할 비밀번호
 */
const hasRepeatingChars = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
      return true;
    }
  }
  return false;
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
  const passwordData: PasswordFormData = {
    password: data.password,
    passwordCheck: data.passwordCheck,
  };

  emit('submit', passwordData);
  emit('update:step', props.step + 1);
};
</script>
