<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 입력 필드 컴포넌트
-->
<template>
  <div class="base-input-password">
    <!-- 비밀번호 입력 필드 -->
    <BaseInput
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="!!error"
      :label="label"
      :required="required"
      class="base-input-password__input"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <!-- 비밀번호 표시/숨김 토글 버튼 (suffix slot) -->
      <template #suffix>
        <button
          type="button"
          class="base-input-password__toggle"
          :class="{ 'base-input-password__toggle--active': showPassword }"
          @click="togglePasswordVisibility"
          :disabled="disabled"
        >
          <BaseIcon
            :name="showPassword ? 'eye' : 'eye' /* TODO: eye-close 아이콘 추가 */"
            size="sm"
            class="base-input-password__toggle-icon"
          />
        </button>
      </template>
    </BaseInput>

    <!-- 비밀번호 강도 표시 -->
    <BasePasswordStrength
      v-if="showStrength && passwordStrength"
      :strength="passwordStrength"
      :show-label="showStrengthLabel"
      :show-details="showStrengthDetails"
      :show-crack-time="showCrackTime"
      class="base-input-password__strength"
    />
  </div>
</template>

<script setup lang="ts">
import BasePasswordStrength from '../../BasePasswordStrength/BasePasswordStrength.vue';
import type { PasswordStrengthDisplay } from '@template/types';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import type { CommonInputProps } from '../types';
import { ref, computed, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import './InputPassword.scss';

interface Props {
  /** 입력값 */
  modelValue?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 여부 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 라벨 */
  label?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 비밀번호 강도 표시 여부 */
  showStrength?: boolean;
  /** 비밀번호 강도 라벨 표시 여부 */
  showStrengthLabel?: boolean;
  /** 비밀번호 강도 상세 정보 표시 여부 */
  showStrengthDetails?: boolean;
  /** 크랙 시간 표시 여부 */
  showCrackTime?: boolean;
  /** 비밀번호 강도 정보 (외부에서 전달) */
  strength?: PasswordStrengthDisplay | null;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'strength-change', strength: PasswordStrengthDisplay | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  showStrength: true,
  showStrengthLabel: true,
  showStrengthDetails: false,
  showCrackTime: false,
  strength: null,
});

const emit = defineEmits<Emits>();

// 내부 상태
const inputValue = ref(props.modelValue);
const showPassword = ref(false);

// 입력 타입 계산
const inputType = computed(() => {
  return showPassword.value ? 'text' : 'password';
});

// 비밀번호 강도 계산 (간단한 로직)
const passwordStrength = computed((): PasswordStrengthDisplay | null => {
  if (!inputValue.value) return null;
  
  const password = inputValue.value;
  let score: 0 | 1 | 2 | 3 | 4 = 0;
  const feedback: string[] = [];
  
  // 길이 체크
  if (password.length >= 8) score = Math.min(score + 1, 4) as 0 | 1 | 2 | 3 | 4;
  else feedback.push('비밀번호는 8자 이상이어야 합니다');
  
  // 대문자 포함
  if (/[A-Z]/.test(password)) score = Math.min(score + 1, 4) as 0 | 1 | 2 | 3 | 4;
  else feedback.push('대문자를 포함해야 합니다');
  
  // 소문자 포함
  if (/[a-z]/.test(password)) score = Math.min(score + 1, 4) as 0 | 1 | 2 | 3 | 4;
  else feedback.push('소문자를 포함해야 합니다');
  
  // 숫자 포함
  if (/\d/.test(password)) score = Math.min(score + 1, 4) as 0 | 1 | 2 | 3 | 4;
  else feedback.push('숫자를 포함해야 합니다');
  
  // 특수문자 포함
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score = Math.min(score + 1, 4) as 0 | 1 | 2 | 3 | 4;
  else feedback.push('특수문자를 포함해야 합니다');
  
  // 강도 레벨 결정
  let label: '매우 약함' | '약함' | '보통' | '강함' | '매우 강함' = '매우 약함';
  let color: 'red' | 'orange' | 'yellow' | 'light-green' | 'green' = 'red';
  let progressColor = '#dc2626';
  
  if (score === 0) {
    label = '매우 약함';
    color = 'red';
    progressColor = '#dc2626';
  } else if (score === 1) {
    label = '약함';
    color = 'orange';
    progressColor = '#ea580c';
  } else if (score === 2) {
    label = '보통';
    color = 'yellow';
    progressColor = '#ca8a04';
  } else if (score === 3) {
    label = '강함';
    color = 'light-green';
    progressColor = '#65a30d';
  } else if (score === 4) {
    label = '매우 강함';
    color = 'green';
    progressColor = '#16a34a';
  }
  
  // 크랙 시간 계산 (간단한 예시)
  let crackTime = '';
  if (score <= 1) crackTime = '즉시';
  else if (score <= 2) crackTime = '몇 초';
  else if (score <= 3) crackTime = '몇 분';
  else if (score <= 4) crackTime = '몇 시간';
  else crackTime = '몇 년';
  
  return {
    score,
    label,
    color,
    progressColor,
    feedback,
    crackTime
  };
});

// 이벤트 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  inputValue.value = value;
  emit('update:modelValue', value);
  emit('input', value);
  emit('strength-change', passwordStrength.value);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// modelValue 변경 감시
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue || '';
  }
);

// 초기값 설정
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue || '';
  },
  { immediate: true }
);
</script>

<style scoped>
.base-input-password {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.base-input-password__input {
  width: 100%;
}

.base-input-password__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.base-input-password__toggle:hover {
  background-color: var(--color-neutral-100, #f5f6f6);
}

.base-input-password__toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.base-input-password__toggle-icon {
  color: var(--color-neutral-600, #5a5c5e);
}

.base-input-password__strength {
  margin-top: 4px;
}
</style>
