<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>
    <Field v-slot="{ field, errorMessage, meta }" :name="name" :value="modelValue">
      <input
        :id="id"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'base-input__field',
          {
            'base-input__field--error': errorMessage,
            'base-input__field--valid': meta.valid && meta.touched,
          },
        ]"
        @input="handleInput"
      />
    </Field>
    <ErrorMessage :name="name" class="base-input__error" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';

/**
 * BaseInput 컴포넌트
 *
 * Vee-Validate와 통합된 재사용 가능한 입력 필드 컴포넌트입니다.
 * 유효성 검증, 에러 표시, 성공 상태 등을 지원합니다.
 *
 * @props name - 필드 이름 (Vee-Validate에서 사용)
 * @props modelValue - v-model 바인딩 값
 * @props label - 입력 필드 라벨
 * @props type - HTML input 타입
 * @props placeholder - 플레이스홀더 텍스트
 * @props required - 필수 입력 여부
 * @props disabled - 비활성화 상태
 * @props id - HTML id 속성
 * @emits update:modelValue - 값 변경 시 발생하는 이벤트
 */
interface Props {
  /** 필드 이름 (Vee-Validate에서 사용) */
  name: string;
  /** v-model 바인딩 값 */
  modelValue?: string;
  /** 입력 필드 라벨 */
  label?: string;
  /** HTML input 타입 */
  type?: string;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** HTML id 속성 */
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  id: undefined,
});

interface Emits {
  /** 값 변경 시 발생하는 이벤트 */
  (e: 'update:modelValue', value: string): void;
}

const emit = defineEmits<Emits>();

/**
 * 입력 이벤트를 처리합니다.
 * @param event - 입력 이벤트
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  width: 100%;
}

.base-input__label {
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-font-size-sm);
  font-weight: var(--typography-font-weight-medium);
  color: var(--color-secondary-700);
}

.base-input__required {
  color: var(--color-error-500);
  margin-left: var(--spacing-1);
}

.base-input__field {
  padding: var(--spacing-3);
  border: 1px solid var(--color-secondary-300);
  border-radius: var(--spacing-1-5);
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-font-size-sm);
  transition: border-color 0.15s ease-in-out;
}

.base-input__field:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.base-input__field--error {
  border-color: var(--color-error-500);
}

.base-input__field--error:focus {
  border-color: var(--color-error-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input__field--valid {
  border-color: var(--color-success-500);
}

.base-input__field--valid:focus {
  border-color: var(--color-success-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.base-input__field:disabled {
  background-color: var(--color-secondary-50);
  cursor: not-allowed;
}

.base-input__error {
  font-family: var(--typography-font-family-sans);
  font-size: var(--typography-font-size-xs);
  color: var(--color-error-500);
  margin-top: var(--spacing-1);
}
</style>
