<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 입력 필드 컴포넌트
-->
<template>
  <div class="base-input-password">
    <!-- 비밀번호 입력 필드 -->
    <div class="base-input-password__input-wrapper">
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
      v-if="showStrength && strength"
      :strength="strength"
      :show-label="showStrengthLabel"
      :show-details="showStrengthDetails"
      class="base-input-password__strength"
    />
  </div>
</template>

<script setup lang="ts">
import BasePasswordStrength from '../BasePasswordStrength/BasePasswordStrength.vue';
import type { PasswordStrengthDisplay } from '@template/types';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { ref, computed, watch } from 'vue';
import BaseInput from './BaseInput.vue';

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

// 이벤트 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  inputValue.value = value;
  emit('update:modelValue', value);
  emit('input', value);
  emit('strength-change', props.strength);
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

.base-input-password__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.base-input-password__input {
  flex: 1;
  padding-right: 40px; /* 토글 버튼 공간 확보 */
}

.base-input-password__toggle {
  position: absolute;
  right: 8px;
  top: 50%;
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

.base-input-password__strength {
  margin-top: 4px;
}
</style>
