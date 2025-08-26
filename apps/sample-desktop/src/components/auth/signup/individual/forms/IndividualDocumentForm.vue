<template>
  <AuthContent title="개인회원 가입" :description="description">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="3" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" :validation-rules="validationRules" @submit="handleSubmit">
        <template #default="{ formData, errors, validateField, submit, isValid }">
          <div class="flex flex-col gap-[33px]">
            <!-- 신분증 업로드 -->
            <FormField label="신분증 (주민등록증 또는 운전면허증)*">
              <BaseFileUploadButton
                :status="formData.idCard ? 'success' : 'hover'"
                @file-selected="handleIdCardUpload"
              />
              <p v-if="errors.idCard" class="text-red text-font-12 mt-1">
                {{ errors.idCard }}
              </p>
              <p v-if="formData.idCard" class="text-green text-font-12 mt-1">
                파일 업로드 완료: {{ formData.idCard.name }}
              </p>
            </FormField>

            <!-- 주소 차이 확인 -->
            <div>
              <div class="mt-size-12 gap-size-4 flex items-center">
                <span class="text-font-16 font-semibold">신분증의 주소가 현 주소와 다른가요?</span>
                <BaseCheckbox
                  v-model="formData.hasAddressDifference"
                  @change="validateField('hasAddressDifference')"
                />
              </div>

              <!-- 추가 서류 업로드 (조건부) -->
              <div v-if="formData.hasAddressDifference" class="gap-size-12 mt-size-4 flex flex-col">
                <span class="text-font-14">
                  <span class="font-medium">주민등록 초본(영문)</span> 또는
                  <span class="font-medium">관공서 납부영수증</span>을 제출해주세요.
                </span>
                <BaseFileUploadButton
                  :status="formData.additionalDocument ? 'success' : 'hover'"
                  @file-selected="handleAdditionalDocumentUpload"
                />
                <p v-if="errors.additionalDocument" class="text-red text-font-12 mt-1">
                  {{ errors.additionalDocument }}
                </p>
                <p v-if="formData.additionalDocument" class="text-green text-font-12 mt-1">
                  파일 업로드 완료: {{ formData.additionalDocument.name }}
                </p>
              </div>
            </div>

            <!-- 제출 버튼 -->
            <div class="">
              <BaseButton
                size="lg"
                label="제출하기"
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
  BaseButton,
  BaseFileUploadButton,
  BaseCheckbox,
  BaseForm,
  validationHelpers,
} from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref, computed } from 'vue';

/**
 * 개인회원 서류 제출 폼 컴포넌트
 * BaseForm을 사용하여 필요한 서류 업로드를 관리
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: DocumentFormData): void;
}

interface DocumentFormData {
  idCard: File | null;
  additionalDocument: File | null;
  hasAddressDifference: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 폼 데이터
const formData = ref({
  idCard: null as File | null,
  additionalDocument: null as File | null,
  hasAddressDifference: false,
});

// 동적 유효성 검사 규칙
const validationRules = {
  idCard: (value: File | null) => {
    if (value !== null) return true;
    return '신분증을 업로드해주세요.';
  },
  additionalDocument: (value: File | null) => {
    // 주소가 다른 경우에만 필수 검사
    if (!formData.value.hasAddressDifference) return true;
    if (value !== null) return true;
    return '추가 서류를 업로드해주세요.';
  },
};

// 설명 텍스트
const description = `
  가입에 필요한 서류를 제출해주세요.<br/>
  관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
  <p class='mt-size-12 text-font-12 text-blue'>&#8251; 파일형식: .png, .jpg, .pdf / 파일 사이즈 300KB 미만</p>
`;

/**
 * 신분증 파일 업로드 처리
 * @param file - 업로드된 파일
 */
const handleIdCardUpload = (file: File) => {
  // 파일 유효성 검사
  if (!validateFile(file)) {
    return;
  }

  formData.value.idCard = file;
  console.log('신분증 파일 업로드:', file.name);
};

/**
 * 추가 서류 파일 업로드 처리
 * @param file - 업로드된 파일
 */
const handleAdditionalDocumentUpload = (file: File) => {
  // 파일 유효성 검사
  if (!validateFile(file)) {
    return;
  }

  formData.value.additionalDocument = file;
  console.log('추가 서류 파일 업로드:', file.name);
};

/**
 * 파일 유효성 검사
 * @param file - 검사할 파일
 */
const validateFile = (file: File): boolean => {
  // 파일 형식 검사
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    alert('허용되지 않는 파일 형식입니다. (.png, .jpg, .pdf만 가능)');
    return false;
  }
  console.log('file', file);

  // 파일 크기 검사 (300KB = 300 * 1024 bytes)
  const maxSize = 300 * 1024;
  if (file.size > maxSize) {
    alert('파일 크기가 300KB를 초과합니다.');
    return false;
  }

  return true;
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
  const documentData: DocumentFormData = {
    idCard: data.idCard,
    additionalDocument: data.additionalDocument,
    hasAddressDifference: data.hasAddressDifference,
  };

  emit('submit', documentData);
  // step 업데이트는 부모 컴포넌트에서 처리 (API 호출 후)
};
</script>
