<template>
  <IndividualTerms v-if="step === 0" v-model:step="step" />
  <IndividualPhone v-if="step === 1" v-model:step="step" />
  <IndividualEmailForm v-if="step === 2" v-model:step="step" />
  <IndividualEmailAuth v-if="step === 3" v-model:step="step" />
  <IndividualSetPassword v-if="step === 4" v-model:step="step" />

  <!-- 개인정보 입력 단계 -->
  <IndividualInfo v-if="step === 5" v-model:step="step" @submit="handleInfoSubmit" />

  <!-- 서류 제출 단계 -->
  <IndividualDocument v-if="step === 6" v-model:step="step" @submit="handleDocumentSubmit" />

  <!-- 가입 완료 단계 -->
  <SingUpComplete v-if="step === 7" v-model:step="step" />
</template>

<script lang="ts" setup>
import IndividualSetPassword from '@/components/auth/signup/individual/IndividualSetPassword.vue';
import IndividualEmailForm from '@/components/auth/signup/individual/IndividualEmailForm.vue';
import IndividualEmailAuth from '@/components/auth/signup/individual/IndividualEmailAuth.vue';
import IndividualDocument from '@/components/auth/signup/individual/IndividualDocument.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualPhone from '@/components/auth/signup/individual/IndividualPhone.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';

import { ref, reactive } from 'vue';

/**
 * 개인회원 회원가입 통합 관리 컴포넌트
 * BaseForm을 사용한 각 단계별 폼 데이터를 수집하여 최종 회원가입 API 호출
 */

// 현재 단계
const step = ref(0);

// 전체 회원가입 데이터 통합 관리
const signUpData = reactive({
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
    // await submitSignUp(signUpData);
    step.value = 7; // 완료 페이지로 이동
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 로직 (토스트 메시지, 모달 등)
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};
</script>
