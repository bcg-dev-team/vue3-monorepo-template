<template>
  <form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
    <!-- Form Content Slot -->
    <slot
      :form-data="formData"
      :errors="errors"
      :is-valid="isFormValid"
      :is-submitting="isSubmitting"
      :validate-field="validateField"
      :submit="handleSubmit"
      :reset="handleReset"
    />
  </form>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';

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
 *   <template #default="{ formData, errors, validateField, submit, isValid, isSubmitting }">
 *     <BaseInput v-model="formData.email" @blur="validateField('email')" />
 *     <p v-if="errors.email">{{ errors.email }}</p>
 *
 *     <div class="button-group">
 *       <BaseButton @click="submit" :disabled="!isValid || isSubmitting">
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
  validationRules?: Record<string, any>;
  validateOnBlur?: boolean;
  validateOnInput?: boolean;
  validateOnMount?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validateOnBlur: true,
  validateOnInput: false,
  validateOnMount: false,
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
const isSubmitting = ref(false);
const errors = ref<FormFieldErrors>({});
const hasBeenSubmitted = ref(false);

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

  console.log('validateField 실행', field);

  const rule = props.validationRules[field];
  const value = formData.value[field];

  try {
    // rule이 함수인 경우만 처리 (validationHelpers.combine 결과)
    if (typeof rule === 'function') {
      const result = rule(value, formData.value);

      if (typeof result === 'string') {
        errors.value[field] = result;
        return false;
      } else if (result === false) {
        errors.value[field] = '유효하지 않은 값입니다.';
        return false;
      }

      delete errors.value[field];
      return true;
    }

    // 기존 로직 (rule이 객체인 경우)
    const result = rule.validator(value, formData.value);

    if (typeof result === 'string') {
      errors.value[field] = result;
      return false;
    } else if (result === false) {
      errors.value[field] = rule.message || '유효하지 않은 값입니다.';
      return false;
    }

    delete errors.value[field];
    return true;
  } catch (error) {
    console.error('Validation error for field:', field, error);
    errors.value[field] = '유효성 검사 중 오류가 발생했습니다.';
    return false;
  }
};

/**
 * 전체 폼 유효성 검사
 * @returns 폼 전체 유효성 여부
 */
const validateForm = (): boolean => {
  if (!props.validationRules) return true;

  let isValid = true;
  for (const field in props.validationRules) {
    if (!validateField(field)) {
      isValid = false;
    }
  }

  return isValid;
};

// 폼 유효성 상태
const isFormValid = computed(() => {
  if (props.disabled) return false;
  if (!props.validationRules) return true;

  // 모든 필드가 유효한지 체크
  return Object.keys(props.validationRules).every((field) => {
    const rule = props.validationRules![field];
    const value = formData.value[field];

    const result = rule(value, formData.value);
    return result === true; // 정확히 true일 때만 유효
  });
});

/**
 * 폼 제출 처리
 */
const handleSubmit = async (): Promise<void> => {
  if (props.disabled || isSubmitting.value) return;

  hasBeenSubmitted.value = true;

  // 전체 유효성 검사
  if (!validateForm()) {
    emit('validation-failed', { ...errors.value });
    return;
  }

  isSubmitting.value = true;

  try {
    await emit('submit', { ...formData.value });
  } catch (error) {
    emit('error', error instanceof Error ? error : new Error('폼 제출 중 오류가 발생했습니다.'));
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * 폼 초기화 처리
 */
const handleReset = (): void => {
  if (props.disabled || isSubmitting.value) return;

  errors.value = {};
  hasBeenSubmitted.value = false;
  emit('reset');
};

// 입력값 변경 감지 및 유효성 검사
watch(
  () => formData.value,
  (newData, oldData) => {
    if (!props.validationRules || !oldData) return;

    // 변경된 필드들에 대해서만 유효성 검사 수행
    for (const field in newData) {
      if (newData[field] !== oldData[field]) {
        if (props.validateOnInput || (hasBeenSubmitted.value && props.validateOnBlur)) {
          validateField(field);
        }
      }
    }
  },
  { deep: true }
);

// 마운트 시 유효성 검사
onMounted(() => {
  if (props.validateOnMount) {
    validateForm();
  }
});

// 외부에서 호출 가능한 메서드들 노출
defineExpose({
  validateField,
  validateForm,
  reset: handleReset,
  submit: handleSubmit,
  isValid: isFormValid,
  isSubmitting,
  errors,
});
</script>
