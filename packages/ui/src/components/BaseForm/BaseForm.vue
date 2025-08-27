<template>
  <form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
    <slot
      :form-data="formData"
      :errors="errors"
      :is-valid="isFormValid"
      :validate-field="validateField"
      :submit="handleSubmit"
      :reset="handleReset"
    />
  </form>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

type ValidationResult = { isValid: true } | { isValid: false; message: string };

interface ValidationRule<T = unknown> {
  (value: T, formData?: Record<string, unknown>): ValidationResult;
}

/**
 * 재사용 가능한 폼 컴포넌트
 *
 * 폼 상태 관리, 유효성 검사, 제출 처리를 담당합니다.
 * 버튼은 포함하지 않고 이벤트만 제공하여 자유로운 레이아웃 구성이 가능합니다.
 *
 * @example
 * ```vue
 * <BaseForm
 *   v-model="formData"
 *   :validation-rules="validationRules"
 *   @submit="handleSubmit"
 * >
 *   <template #default="{ formData, errors, validateField, submit, isValid }">
 *     <BaseInput v-model="formData.email" />
 *     <p v-if="errors.email">{{ errors.email }}</p>
 *
 *     <div class="button-group">
 *       <BaseButton @click="submit" :disabled="!isValid">
 *         제출
 *       </BaseButton>
 *       <BaseButton variant="outlined" @click="otherAction">
 *         다른 액션
 *       </BaseButton>
 *     </div>
 *   </template>
 * </BaseForm>
 * ```
 */

interface Props {
  modelValue?: Record<string, any>;
  validationRules?: Record<string, ValidationRule<any>>;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

type FormFieldErrors = Record<string, string>;

interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void;
  (e: 'submit', formData: Record<string, any>): void | Promise<void>;
  (e: 'reset'): void;
  (e: 'validation-failed', errors: FormFieldErrors): void;
  (e: 'error', error: Error): void;
}

const emit = defineEmits<Emits>();

// 내부 상태
const errors = ref<FormFieldErrors>({});

// 폼 데이터 (v-model)
const formData = computed({
  get: () => props.modelValue || {},
  set: (value) => emit('update:modelValue', value),
});

/**
 * 개별 필드 유효성 검사
 * @param field - 검사할 필드명
 * @returns 유효성 여부
 */
const validateField = (field: string): boolean => {
  if (!props.validationRules || !props.validationRules[field]) {
    delete errors.value[field];
    return true;
  }

  const rule = props.validationRules[field];
  const value = formData.value[field];
  const result = rule(value);

  if (result.isValid) {
    delete errors.value[field];
    return true;
  }

  errors.value[field] = result.message;
  return false;
};

// 폼 유효성 상태
const isFormValid = computed(() => {
  if (props.disabled) return false;
  if (!props.validationRules) return true;

  // 모든 필드가 유효한지 체크
  return Object.keys(props.validationRules).every((field) => {
    const rule = props.validationRules![field];
    const value = formData.value[field];

    const result = rule(value);
    return result.isValid;
  });
});

/**
 * 폼 제출 처리
 */
const handleSubmit = async (): Promise<void> => {
  if (props.disabled) return;

  const hasErrors = Object.keys(errors.value).length > 0;

  if (hasErrors) {
    emit('validation-failed', { ...errors.value });
    return;
  }

  try {
    await emit('submit', { ...formData.value });
  } catch (error) {
    emit('error', error instanceof Error ? error : new Error('폼 제출 중 오류가 발생했습니다.'));
  }
};

/**
 * 폼 초기화 처리
 */
const handleReset = (): void => {
  if (props.disabled) return;

  errors.value = {};
  emit('reset');
};

// 입력값 변경 감지 및 유효성 검사 (개별 필드 감시)
watch(
  () =>
    props.validationRules
      ? Object.keys(props.validationRules).map((field) => formData.value[field])
      : [],
  (newValues, oldValues) => {
    if (!props.validationRules) return;

    if (!oldValues) {
      Object.keys(props.validationRules).forEach(validateField);
      return;
    }

    // 변경된 필드만 검사
    const fields = Object.keys(props.validationRules);
    fields.forEach((field, index) => {
      if (newValues[index] !== oldValues[index]) {
        validateField(field);
      }
    });
  }
);

// 외부에서 호출 가능한 메서드들 노출
defineExpose({
  validateField,
  reset: handleReset,
  submit: handleSubmit,
  isValid: isFormValid,
  errors,
});
</script>
