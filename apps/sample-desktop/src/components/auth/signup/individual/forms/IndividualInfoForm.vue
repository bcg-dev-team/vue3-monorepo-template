<template>
  <AuthContent title="개인회원 가입" description="정보를 입력해주세요.">
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="3" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" :validation-rules="validationRules" @submit="handleSubmit">
        <template #default="{ formData, errors, validateField, submit, isValid }">
          <div>
            <div class="gap-size-16 flex flex-col">
              <!-- 본인인증으로 받은 정보 (비활성화) -->
              <BaseFormLabel label="이름(한글)">
                <BaseInput
                  v-model="formData.koreanName"
                  size="md"
                  disabled
                  placeholder="본인인증으로 자동 입력됨"
                />
              </BaseFormLabel>

              <BaseFormLabel label="휴대폰번호">
                <BaseInput
                  v-model="formData.phoneNumber"
                  size="md"
                  disabled
                  placeholder="본인인증으로 자동 입력됨"
                />
              </BaseFormLabel>

              <BaseFormLabel label="생년월일">
                <BaseInput
                  v-model="formData.birthDate"
                  size="md"
                  disabled
                  placeholder="본인인증으로 자동 입력됨"
                />
              </BaseFormLabel>

              <!-- 사용자 입력 정보 -->
              <div class="gap-size-8 flex items-center">
                <BaseFormLabel label="이름(영문)">
                  <BaseInput
                    v-model="formData.englishFirstName"
                    size="md"
                    placeholder="예) GILDONG"
                    :error="!!errors.englishFirstName"
                    :errorMessage="errors.englishFirstName"
                    @blur="validateField('englishFirstName')"
                  />
                </BaseFormLabel>
                <BaseFormLabel label="성(영문)">
                  <BaseInput
                    v-model="formData.englishLastName"
                    size="md"
                    placeholder="예) HONG"
                    :error="!!errors.englishLastName"
                    :errorMessage="errors.englishLastName"
                    @blur="validateField('englishLastName')"
                  />
                </BaseFormLabel>
              </div>

              <!-- 거주지 주소 (한글) -->
              <BaseFormLabel label="거주지 주소(한글)">
                <div class="gap-size-8 flex flex-col">
                  <div class="flex gap-2">
                    <BaseInput
                      v-model="formData.koreanAddress"
                      size="md"
                      placeholder="주소 검색"
                      :error="!!errors.koreanAddress"
                      readonly
                    />
                    <BaseButton variant="outlined" size="md"> 검색 </BaseButton>
                  </div>
                  <BaseInput
                    v-model="formData.koreanDetailAddress"
                    size="md"
                    placeholder="상세주소"
                    :error="!!errors.koreanDetailAddress"
                    :errorMessage="errors.koreanDetailAddress"
                    @blur="validateField('koreanDetailAddress')"
                  />
                </div>
              </BaseFormLabel>

              <!-- 거주지 주소 (영문) -->
              <BaseFormLabel label="거주지 주소(영문)">
                <div class="gap-size-8 flex flex-col">
                  <div class="flex gap-2">
                    <BaseInput
                      v-model="formData.englishAddress"
                      size="md"
                      placeholder="주소 검색"
                      :error="!!errors.englishAddress"
                      readonly
                    />
                    <BaseButton variant="outlined" size="md"> 검색 </BaseButton>
                  </div>
                  <BaseInput
                    v-model="formData.englishDetailAddress"
                    size="md"
                    placeholder="상세주소"
                    :error="!!errors.englishDetailAddress"
                    :errorMessage="errors.englishDetailAddress"
                    @blur="validateField('englishDetailAddress')"
                  />
                </div>
              </BaseFormLabel>
            </div>

            <!-- 다음 버튼 -->
            <div class="mt-[33px] w-[360px]">
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
  BaseButton,
  BaseInput,
  BaseForm,
  BaseFormLabel,
} from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref, onMounted } from 'vue';

/**
 * 개인회원 개인정보 입력 폼 컴포넌트
 * BaseForm을 사용하여 개인정보 입력을 관리
 */

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: PersonalInfoFormData): void;
}

interface PersonalInfoFormData {
  koreanName: string;
  phoneNumber: string;
  birthDate: string;
  englishFirstName: string;
  englishLastName: string;
  koreanAddress: string;
  koreanDetailAddress: string;
  englishAddress: string;
  englishDetailAddress: string;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 폼 데이터
const formData = ref({
  // 본인인증으로 받은 정보 (자동 입력됨)
  koreanName: '',
  phoneNumber: '',
  birthDate: '',

  // 사용자 입력 정보
  englishFirstName: '',
  englishLastName: '',
  koreanAddress: '123',
  koreanDetailAddress: '',
  englishAddress: '123123',
  englishDetailAddress: '',
});

// 유효성 검사 규칙
const validationRules = {
  englishFirstName: (value: string) => {
    if (!value || value.trim() === '') {
      return '영문 이름을 입력해주세요.';
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return '영문만 입력 가능합니다.';
    }
    return true;
  },
  englishLastName: (value: string) => {
    if (!value || value.trim() === '') {
      return '영문 성을 입력해주세요.';
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return '영문만 입력 가능합니다.';
    }
    return true;
  },
  koreanAddress: (value: string) => {
    if (!value || value.trim() === '') {
      return '한글 주소를 선택해주세요.';
    }
    return true;
  },
  koreanDetailAddress: (value: string) => {
    if (!value || value.trim() === '') {
      return '한글 상세주소를 입력해주세요.';
    }
    return true;
  },
  englishAddress: (value: string) => {
    if (!value || value.trim() === '') {
      return '영문 주소를 선택해주세요.';
    }
    return true;
  },
  englishDetailAddress: (value: string) => {
    if (!value || value.trim() === '') {
      return '영문 상세주소를 입력해주세요.';
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
const handleSubmit = (data: Record<string, any>) => {
  const personalInfoData: PersonalInfoFormData = {
    koreanName: data.koreanName,
    phoneNumber: data.phoneNumber,
    birthDate: data.birthDate,
    englishFirstName: data.englishFirstName,
    englishLastName: data.englishLastName,
    koreanAddress: data.koreanAddress,
    koreanDetailAddress: data.koreanDetailAddress,
    englishAddress: data.englishAddress,
    englishDetailAddress: data.englishDetailAddress,
  };

  emit('submit', personalInfoData);
  emit('update:step', props.step + 1);
};

/**
 * 컴포넌트 마운트 시 본인인증 정보 로드
 */
onMounted(() => {
  // 실제로는 이전 단계에서 받은 본인인증 정보를 사용
  // 데모용으로 임시 데이터 설정
  formData.value.koreanName = '홍길동';
  formData.value.phoneNumber = '010-1234-5678';
  formData.value.birthDate = '1990-01-01';
});
</script>
