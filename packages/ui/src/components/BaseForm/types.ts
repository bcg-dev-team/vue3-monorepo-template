/**
 * BaseForm 컴포넌트 관련 타입 정의
 */

// 폼 데이터 타입 (제네릭)
export type FormData = Record<string, any>;

// 폼 필드 에러 타입
export type FormFieldErrors = Record<string, string>;

type ValidationResult = { isValid: true } | { isValid: false; message: string };

// 유효성 검사 함수 타입
export type ValidationFunction<T = any> = (
  value: T,
  formData: FormData
) => ValidationResult | Promise<ValidationResult>;

// 유효성 검사 규칙 타입 (함수형 또는 객체형)
export type FormValidationRule<T = any> =
  | ValidationFunction<T>
  | {
      validator: ValidationFunction<T>;
      message?: string;
    };

// 유효성 검사 규칙 집합
export type FormValidationRules = Record<string, FormValidationRule>;

// BaseForm Props 타입
export interface BaseFormProps {
  /** 폼 데이터 (v-model) */
  modelValue?: FormData;

  /** 유효성 검사 규칙 */
  validationRules?: FormValidationRules;

  /** blur 이벤트 시 유효성 검사 여부 */
  validateOnBlur?: boolean;

  /** input 이벤트 시 유효성 검사 여부 */
  validateOnInput?: boolean;

  /** 마운트 시 유효성 검사 여부 */
  validateOnMount?: boolean;

  /** 폼 크기 */
  size?: 'small' | 'medium' | 'large';

  /** 폼 비활성화 여부 */
  disabled?: boolean;
}

// BaseForm Emits 타입
export interface BaseFormEmits {
  /** v-model 업데이트 */
  (e: 'update:modelValue', value: FormData): void;

  /** 폼 제출 */
  (e: 'submit', formData: FormData): void | Promise<void>;

  /** 폼 초기화 */
  (e: 'reset'): void;

  /** 유효성 검사 실패 */
  (e: 'validation-failed', errors: FormFieldErrors): void;

  /** 에러 발생 */
  (e: 'error', error: Error): void;
}

// 폼 슬롯에서 사용할 수 있는 props
export interface FormSlotProps {
  formData: FormData;
  errors: FormFieldErrors;
  isValid: boolean;
  isSubmitting: boolean;
  validateField: (field: string) => boolean;
  submit: () => Promise<void>;
  reset: () => void;
}

// BaseForm 인스턴스에서 노출되는 메서드들
export interface BaseFormExposed {
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  reset: () => void;
  submit: () => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
  errors: FormFieldErrors;
}

// 공통 유효성 검사 함수들
export interface ValidationHelpers {
  required: (message?: string) => ValidationFunction;
  email: (message?: string) => ValidationFunction;
  minLength: (length: number, message?: string) => ValidationFunction;
  maxLength: (length: number, message?: string) => ValidationFunction;
  pattern: (regex: RegExp, message?: string) => ValidationFunction;
  confirm: (targetField: string, message?: string) => ValidationFunction;
  custom: <T>(validator: ValidationFunction<T>, message?: string) => FormValidationRule<T>;
}
