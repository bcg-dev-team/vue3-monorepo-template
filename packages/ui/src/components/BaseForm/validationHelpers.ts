import type { ValidationFunction, FormValidationRule, ValidationHelpers } from './types';

/**
 * 공통 유효성 검사 헬퍼 함수들
 * 재사용 가능한 유효성 검사 로직을 제공합니다.
 */

/**
 * 필수 입력 검사
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const required = (message = '필수 입력 항목입니다.'): ValidationFunction => {
  return (value: any) => {
    if (value === null || value === undefined) return message;
    if (typeof value === 'string' && value.trim() === '') return message;
    if (Array.isArray(value) && value.length === 0) return message;
    if (typeof value === 'object' && Object.keys(value).length === 0) return message;
    return true;
  };
};

/**
 * 이메일 형식 검사
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const email = (message = '올바른 이메일 형식을 입력해주세요.'): ValidationFunction => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리
    return emailRegex.test(value) || message;
  };
};

/**
 * 최소 길이 검사
 * @param length - 최소 길이
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const minLength = (length: number, message?: string): ValidationFunction => {
  const defaultMessage = `최소 ${length}자 이상 입력해주세요.`;
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리
    return value.length >= length || message || defaultMessage;
  };
};

/**
 * 최대 길이 검사
 * @param length - 최대 길이
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const maxLength = (length: number, message?: string): ValidationFunction => {
  const defaultMessage = `최대 ${length}자까지 입력 가능합니다.`;
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리
    return value.length <= length || message || defaultMessage;
  };
};

/**
 * 정규식 패턴 검사
 * @param regex - 정규식 패턴
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const pattern = (regex: RegExp, message = '형식이 올바르지 않습니다.'): ValidationFunction => {
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리
    return regex.test(value) || message;
  };
};

/**
 * 비밀번호 확인 검사
 * @param targetField - 비교할 필드명
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const confirm = (
  targetField: string,
  message = '비밀번호가 일치하지 않습니다.'
): ValidationFunction => {
  return (value: string, formData: Record<string, any>) => {
    if (!value) return true; // 빈 값은 required에서 처리
    return value === formData[targetField] || message;
  };
};

/**
 * 전화번호 형식 검사 (한국)
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const phoneNumber = (message = '올바른 전화번호 형식을 입력해주세요.'): ValidationFunction => {
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리
    const cleanValue = value.replace(/[^0-9]/g, '');
    return phoneRegex.test(cleanValue) || message;
  };
};

/**
 * 숫자 범위 검사
 * @param min - 최솟값
 * @param max - 최댓값
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const numberRange = (min: number, max: number, message?: string): ValidationFunction => {
  const defaultMessage = `${min}에서 ${max} 사이의 값을 입력해주세요.`;
  return (value: number) => {
    if (value === null || value === undefined) return true; // 빈 값은 required에서 처리
    const numValue = Number(value);
    if (isNaN(numValue)) return '숫자를 입력해주세요.';
    return (numValue >= min && numValue <= max) || message || defaultMessage;
  };
};

/**
 * 비밀번호 강도 검사
 * @param message - 커스텀 에러 메시지
 * @returns 유효성 검사 함수
 */
const passwordStrength = (
  message = '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.'
): ValidationFunction => {
  return (value: string) => {
    if (!value) return true; // 빈 값은 required에서 처리

    const hasMinLength = value.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    return (hasMinLength && hasLetter && hasNumber && hasSpecialChar) || message;
  };
};

/**
 * 커스텀 유효성 검사 함수 래퍼
 * @param validator - 유효성 검사 함수
 * @param message - 기본 에러 메시지
 * @returns 폼 유효성 검사 규칙
 */
const custom = <T>(validator: ValidationFunction<T>, message?: string): FormValidationRule<T> => {
  return {
    validator,
    message,
  };
};

/**
 * 여러 유효성 검사 규칙을 조합
 * @param rules - 유효성 검사 규칙 배열
 * @returns 조합된 유효성 검사 함수
 */
const combine = (...rules: ValidationFunction[]): ValidationFunction => {
  return (value: any, formData: Record<string, any>) => {
    for (const rule of rules) {
      const result = rule(value, formData);
      if (typeof result === 'string' || result === false) {
        return result;
      }
    }
    return true;
  };
};

// 유효성 검사 헬퍼 객체
export const validationHelpers: ValidationHelpers & {
  phoneNumber: typeof phoneNumber;
  numberRange: typeof numberRange;
  passwordStrength: typeof passwordStrength;
  combine: typeof combine;
} = {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  confirm,
  phoneNumber,
  numberRange,
  passwordStrength,
  custom,
  combine,
};

// 개별 함수들도 내보내기
export {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  confirm,
  phoneNumber,
  numberRange,
  passwordStrength,
  custom,
  combine,
};
