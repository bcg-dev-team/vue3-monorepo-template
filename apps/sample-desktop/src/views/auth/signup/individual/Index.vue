<template>
  <!-- 약관 동의 단계 -->
  <IndividualTermsForm v-if="step === 0" v-model:step="step" @submit="handleTermsSubmit" />
  <!-- <IndividualTerms v-if="step === 0" v-model:step="step" /> -->

  <!-- 휴대폰 인증 단계 -->
  <IndividualPhoneForm v-if="step === 1" v-model:step="step" @submit="handlePhoneSubmit" />

  <!-- 이메일 입력 단계 -->
  <IndividualEmailForm v-if="step === 2" v-model:step="step" @submit="handleEmailSubmit" />

  <!-- 이메일 인증 단계 -->
  <IndividualEmailAuth v-if="step === 3" v-model:step="step" @submit="handleEmailAuthSubmit" />

  <!-- 비밀번호 설정 단계 -->
  <IndividualPasswordForm v-if="step === 4" v-model:step="step" @submit="handlePasswordSubmit" />

  <!-- 개인정보 입력 단계 -->
  <IndividualInfoForm v-if="step === 5" v-model:step="step" @submit="handleInfoSubmit" />

  <!-- 서류 제출 단계 -->
  <IndividualDocumentForm v-if="step === 6" v-model:step="step" @submit="handleDocumentSubmit" />

  <!-- 가입 완료 단계 -->
  <SingUpComplete v-if="step === 7" v-model:step="step" />
</template>

<script lang="ts" setup>
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';

import IndividualPasswordForm from '@/components/auth/signup/individual/forms/IndividualPasswordForm.vue';
import IndividualDocumentForm from '@/components/auth/signup/individual/forms/IndividualDocumentForm.vue';
import IndividualTermsForm from '@/components/auth/signup/individual/forms/IndividualTermsForm.vue';
import IndividualPhoneForm from '@/components/auth/signup/individual/forms/IndividualPhoneForm.vue';
import IndividualEmailForm from '@/components/auth/signup/individual/forms/IndividualEmailForm.vue';
import IndividualInfoForm from '@/components/auth/signup/individual/forms/IndividualInfoForm.vue';
import IndividualEmailAuth from '@/components/auth/signup/individual/IndividualEmailAuth.vue';
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';
import { ref, reactive } from 'vue';

/**
 * 개인회원 회원가입 통합 관리 컴포넌트
 * BaseForm을 사용한 각 단계별 폼 데이터를 수집하여 최종 회원가입 API 호출
 */

// 현재 단계
const step = ref(5);

// 전체 회원가입 데이터 통합 관리
const signUpData = reactive({
  // 약관 동의 정보
  terms: {
    serviceAgreement: false,
    personalInfoAgreement: false,
    marketingAgreement: false,
  },

  // 휴대폰 인증 정보
  phone: {
    number: '',
    isVerified: false,
    verificationMethod: 'sms', // or 'call'
  },

  // 이메일 정보
  email: {
    address: '',
    verificationCode: '',
    isVerified: false,
  },

  // 비밀번호 정보
  password: {
    password: '',
    passwordCheck: '',
  },

  // 개인정보
  personalInfo: {
    // 본인인증으로 받은 정보 (비활성화)
    koreanName: '',
    phoneNumber: '',
    birthDate: '',

    // 사용자 입력 정보
    englishFirstName: '',
    englishLastName: '',
    koreanAddress: '',
    koreanDetailAddress: '',
    englishAddress: '',
    englishDetailAddress: '',
  },

  // 서류 제출 정보
  documents: {
    idCard: null as File | null,
    additionalDocument: null as File | null,
    hasAddressDifference: false,
  },
});

/**
 * 각 단계별 데이터 수집 핸들러들
 */

const handleTermsSubmit = (data: typeof signUpData.terms) => {
  signUpData.terms = { ...data };
  console.log('약관 동의 완료:', data);
};

const handlePhoneSubmit = (data: typeof signUpData.phone) => {
  signUpData.phone = { ...data };
  console.log('휴대폰 인증 완료:', data);
};

const handleEmailSubmit = (data: typeof signUpData.email) => {
  signUpData.email = { ...data };
  console.log('이메일 설정 완료:', data);
};

const handleEmailAuthSubmit = (data: { verificationCode: string }) => {
  signUpData.email.verificationCode = data.verificationCode;
  signUpData.email.isVerified = true;
  console.log('이메일 인증 완료:', data);
};

const handlePasswordSubmit = (data: typeof signUpData.password) => {
  signUpData.password = { ...data };
  console.log('비밀번호 설정 완료:', data);
};

const handleInfoSubmit = (data: typeof signUpData.personalInfo) => {
  // 기존 본인인증 정보는 유지하고 새로운 정보만 업데이트
  signUpData.personalInfo = {
    ...signUpData.personalInfo,
    ...data,
  };
  console.log('개인정보 입력 완료:', data);
};

const handleDocumentSubmit = async (data: typeof signUpData.documents) => {
  signUpData.documents = { ...data };
  console.log('서류 업로드 완료:', data);

  // 최종 회원가입 API 호출
  try {
    await submitSignUp(signUpData);
    step.value = 7; // 완료 페이지로 이동
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 로직 (토스트 메시지, 모달 등)
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

/**
 * 최종 회원가입 API 호출
 * @param data - 전체 회원가입 폼 데이터
 */
async function submitSignUp(data: typeof signUpData) {
  console.log('최종 회원가입 데이터:', data);

  // FormData 생성 (파일 업로드 포함)
  const formData = new FormData();

  // 기본 정보 추가
  formData.append('terms', JSON.stringify(data.terms));
  formData.append('phone', JSON.stringify(data.phone));
  formData.append('email', JSON.stringify(data.email));
  formData.append('password', data.password.password);
  formData.append('personalInfo', JSON.stringify(data.personalInfo));

  // 파일 추가
  if (data.documents.idCard) {
    formData.append('idCard', data.documents.idCard);
  }
  if (data.documents.additionalDocument) {
    formData.append('additionalDocument', data.documents.additionalDocument);
  }

  // API 호출
  const response = await fetch('/api/auth/signup/individual', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입 실패');
  }

  return response.json();
}
</script>
