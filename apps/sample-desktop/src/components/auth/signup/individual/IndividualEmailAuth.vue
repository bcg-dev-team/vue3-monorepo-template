<template>
  <AuthContent
    title="개인회원 가입"
    description="메일함에서 인증 메일을 확인해주세요. <br/> 인증번호 6자리를 입력하면 회원가입이 완료돼요."
  >
    <template #header>
      <div class="flex items-center justify-between">
        <BaseIcon name="arrow-backward" size="md" @click="goBack" />
        <BaseStepper variant="dot" :dot-config="{ count: 4 }" :current="2" />
      </div>
    </template>
    <template #content>
      <BaseForm v-model="formData" :validation-rules="validationRules" @submit="handleSubmit">
        <template #default="{ formData, submit, isValid }">
          <div>
            <!-- 인증번호 입력 -->
            <div>
              <div class="gap-size-12 flex items-center">
                <BaseInput v-model="formData.digit1" size="md" maxlength="1" ref="input1" />
                <BaseInput v-model="formData.digit2" size="md" maxlength="1" ref="input2" />
                <BaseInput v-model="formData.digit3" size="md" maxlength="1" ref="input3" />
                <BaseInput v-model="formData.digit4" size="md" maxlength="1" ref="input4" />
                <BaseInput v-model="formData.digit5" size="md" maxlength="1" ref="input5" />
                <BaseInput v-model="formData.digit6" size="md" maxlength="1" ref="input6" />
              </div>
              <span class="text-font-12 text-red tracking-3">남은 시간: 10:00</span>
            </div>

            <!-- 안내 메시지 -->
            <div
              class="mt-size-24 border-primary-primary800 bg-primary-primary100 p-size-8 text-font-12 rounded-md border"
            >
              <p>인증번호는 6자리 숫자이며, 유효기간은 10분입니다.</p>
              <p>메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
            </div>

            <div class="gap-size-12 mt-[33px] flex items-center">
              <BaseButton
                size="lg"
                label="인증 메일 재전송"
                variant="outlined"
                color="primary"
                full-width
              />
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

            <div class="mt-size-16 flex items-center justify-center">
              <span class="text-font-14 text-default-muted cursor-pointer font-medium underline">
                다른 이메일주소로 변경하기
              </span>
            </div>
          </div>
        </template>
      </BaseForm>
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseStepper, BaseInput, BaseButton, BaseForm } from '@template/ui';
import AuthContent from '@/components/auth/AuthContent.vue';
import { ref, computed } from 'vue';

interface Props {
  step: number;
}

interface Emits {
  (e: 'update:step', step: number): void;
  (e: 'submit', data: { verificationCode: string }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 입력 필드 참조
const input1 = ref<HTMLInputElement>();
const input2 = ref<HTMLInputElement>();
const input3 = ref<HTMLInputElement>();
const input4 = ref<HTMLInputElement>();
const input5 = ref<HTMLInputElement>();
const input6 = ref<HTMLInputElement>();

// 폼 데이터
const formData = ref({
  digit1: '',
  digit2: '',
  digit3: '',
  digit4: '',
  digit5: '',
  digit6: '',
});

// 전체 인증번호 computed
const verificationCode = computed(() => {
  return (
    formData.value.digit1 +
    formData.value.digit2 +
    formData.value.digit3 +
    formData.value.digit4 +
    formData.value.digit5 +
    formData.value.digit6
  );
});

// 유효성 검사 규칙
const validationRules = {
  digit1: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
  digit2: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
  digit3: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
  digit4: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
  digit5: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
  digit6: (value: string) => (value && value.trim() !== '') || '인증번호를 입력해주세요.',
};

/**
 * 이전 단계로 이동
 */
const goBack = () => {
  emit('update:step', props.step - 1);
};

/**
 * 폼 제출 처리
 */
const handleSubmit = (data: Record<string, any>) => {
  const code = verificationCode.value;

  if (code.length !== 6) {
    alert('6자리 인증번호를 모두 입력해주세요.');
    return;
  }

  // 실제 인증 API 호출
  // 데모용으로 123456을 유효한 코드로 처리
  emit('submit', { verificationCode: code });
  emit('update:step', props.step + 1);
};
</script>
