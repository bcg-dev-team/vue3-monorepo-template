<template>
  <NForm
    ref="formRef"
    :model="model"
    :rules="rules"
    :label-placement="labelPlacement"
    :label-width="labelWidth"
    :label-align="labelAlign"
    :show-label="showLabel"
    :show-require-mark="showRequireMark"
    :require-mark-placement="requireMarkPlacement"
    :show-feedback="showFeedback"
    :size="size"
    :disabled="disabled"
    :inline="inline"
    :show-message="showMessage"
    :autosize="autosize"
    :validate-on-rule-change="validateOnRuleChange"
    @submit="handleSubmit"
  >
    <slot />
  </NForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NForm } from 'naive-ui';
import type { FormInst, FormRules, FormItemRule } from 'naive-ui';

/**
 * BaseForm 컴포넌트
 *
 * Naive UI를 기반으로 한 재사용 가능한 폼 컴포넌트입니다.
 * 디자인 토큰을 활용하여 일관된 스타일을 제공합니다.
 *
 * @props model - 폼 데이터 모델
 * @props rules - 유효성 검증 규칙
 * @props labelPlacement - 라벨 배치
 * @props labelWidth - 라벨 너비
 * @props labelAlign - 라벨 정렬
 * @props showLabel - 라벨 표시 여부
 * @props showRequireMark - 필수 표시 여부
 * @props requireMarkPlacement - 필수 표시 위치
 * @props showFeedback - 피드백 표시 여부
 * @props size - 폼 크기
 * @props disabled - 비활성화 상태
 * @props inline - 인라인 모드
 * @props showMessage - 메시지 표시 여부
 * @props autosize - 자동 크기 조정
 * @props validateOnRuleChange - 규칙 변경 시 검증 여부
 * @emits submit - 폼 제출 시 발생하는 이벤트
 * @emits validation - 유효성 검증 시 발생하는 이벤트
 */
interface Props {
  /** 폼 데이터 모델 */
  model?: Record<string, any>;
  /** 유효성 검증 규칙 */
  rules?: FormRules;
  /** 라벨 배치 */
  labelPlacement?: 'left' | 'top';
  /** 라벨 너비 */
  labelWidth?: string | number;
  /** 라벨 정렬 */
  labelAlign?: 'left' | 'right';
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 필수 표시 여부 */
  showRequireMark?: boolean;
  /** 필수 표시 위치 */
  requireMarkPlacement?: 'right-hanging' | 'right' | 'left';
  /** 피드백 표시 여부 */
  showFeedback?: boolean;
  /** 폼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 인라인 모드 */
  inline?: boolean;
  /** 메시지 표시 여부 */
  showMessage?: boolean;
  /** 자동 크기 조정 */
  autosize?: boolean | { minRows?: number; maxRows?: number };
  /** 규칙 변경 시 검증 여부 */
  validateOnRuleChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  model: () => ({}),
  rules: () => ({}),
  labelPlacement: 'left',
  labelWidth: 'auto',
  labelAlign: 'left',
  showLabel: true,
  showRequireMark: true,
  requireMarkPlacement: 'right-hanging',
  showFeedback: true,
  size: 'medium',
  disabled: false,
  inline: false,
  showMessage: true,
  autosize: false,
  validateOnRuleChange: true,
});

interface Emits {
  /** 폼 제출 이벤트 */
  (e: 'submit', values: Record<string, any>): void;
  /** 유효성 검증 이벤트 */
  (e: 'validation', valid: boolean, errors: Record<string, any>): void;
}

const emit = defineEmits<Emits>();

// 폼 참조
const formRef = ref<FormInst | null>(null);

/**
 * 폼 제출을 처리합니다.
 * @param e - 제출 이벤트
 */
const handleSubmit = (e: Event) => {
  // 폼 제출 로직은 외부에서 처리
  emit('submit', props.model);
};

/**
 * 폼 유효성 검증을 수행합니다.
 * @param callback - 검증 완료 후 콜백
 */
const validate = (callback?: (valid: boolean, errors: Record<string, any>) => void) => {
  if (formRef.value) {
    formRef.value.validate((errors) => {
      const valid = !errors;
      const errorData = errors || {};

      emit('validation', valid, errorData);

      if (callback) {
        callback(valid, errorData);
      }
    });
  }
};

/**
 * 특정 필드의 유효성 검증을 수행합니다.
 * @param paths - 검증할 필드 경로들
 * @param callback - 검증 완료 후 콜백
 */
const validateField = (paths?: string[], callback?: (errors: Record<string, any>) => void) => {
  if (formRef.value) {
    formRef.value.validate((errors) => {
      const errorData = errors || {};

      if (callback) {
        callback(errorData);
      }
    });
  }
};

/**
 * 폼을 리셋합니다.
 */
const restoreValidation = () => {
  if (formRef.value) {
    formRef.value.restoreValidation();
  }
};

/**
 * 폼 메서드들을 외부로 노출
 */
defineExpose({
  validate,
  validateField,
  restoreValidation,
  formRef,
});
</script>

<style scoped>
.base-form {
  width: 100%;
}
</style>
