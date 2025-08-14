<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 입력 필드 컴포넌트
-->
<template>
  <div class="base-input-password">
    <!-- 비밀번호 입력 필드 -->
    <div class="base-input-password__input-container">
      <input
        v-model="inputValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="base-input-password__input"
        :class="{ error: !!error }"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- 비밀번호 표시/숨김 토글 버튼 -->
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
    </div>

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
  placeholder: '비밀번호를 입력하세요',
  disabled: false,
  error: false,
  required: false,
});

const emit = defineEmits<Emits>();

// 내부 입력값 (v-model 처리)
const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value: string) => emit('update:modelValue', value),
});

// 비밀번호 표시/숨김 상태
const showPassword = ref(false);

// 입력 타입 (password 또는 text)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'));

// 비밀번호 강도 계산
const passwordStrength = computed((): PasswordStrengthDisplay | null => {
  if (!props.strength && inputValue.value) {
    // 기본 강도 계산 로직 (간단한 버전)
    const password = inputValue.value;
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score += 1;
    else feedback.push('비밀번호는 8자 이상이어야 합니다');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('소문자를 포함해야 합니다');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('대문자를 포함해야 합니다');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('숫자를 포함해야 합니다');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
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
      score: score as 0 | 1 | 2 | 3 | 4,
      label,
      color,
      progressColor,
      feedback,
      crackTime,
    };
  }

  return props.strength || null;
});

// 비밀번호 표시/숨김 토글
const togglePasswordVisibility = () => {
  if (!props.disabled) {
    showPassword.value = !showPassword.value;
  }
};

// 이벤트 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit('input', value);
  emit('update:modelValue', value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 비밀번호 강도 변경 감지
watch(passwordStrength, (newStrength) => {
  emit('strength-change', newStrength);
});
</script>

<style scoped>
.base-input-password {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.base-input-password__input-container {
  position: relative;
  width: 100%;
}

.base-input-password__input {
  width: 100%;
  padding-right: 24px; /* Toggle button width */
  padding-left: 12px; /* Label width */
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-neutral-900, #1f2937);
  background-color: var(--color-neutral-50, #f9fafb);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-input-password__input:focus {
  outline: none;
  border-color: var(--color-primary-500, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input-password__input.error {
  border-color: var(--color-danger-500, #ef4444);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input-password__toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
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

.base-input-password__toggle--active .base-input-password__toggle-icon {
  color: var(--color-primary-500, #3b82f6);
}

.base-input-password__strength {
  margin-top: 4px;
}
</style>
