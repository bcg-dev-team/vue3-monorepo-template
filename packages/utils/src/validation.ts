import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

// 기본 검증 스키마들
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식이 아닙니다');

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[A-Z]/, '대문자를 포함해야 합니다')
  .regex(/[a-z]/, '소문자를 포함해야 합니다')
  .regex(/\d/, '숫자를 포함해야 합니다')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, '특수문자를 포함해야 합니다');

export const phoneSchema = z
  .string()
  .min(1, '전화번호를 입력해주세요')
  .transform((val) => val.replace(/[-\s]/g, ''))
  .refine((val) => {
    // 국내 전화번호 패턴 (간단한 버전)
    // 휴대폰: 010, 011, 016, 017, 018, 019
    // 지역번호: 02, 031-064
    // 국제번호: +82로 시작하는 경우
    if (val.startsWith('+82')) {
      val = val.substring(3); // +82 제거
    }
    if (val.startsWith('0')) {
      val = val.substring(1); // 앞의 0 제거
    }

    // 휴대폰: 1로 시작하고 10자리
    if (val.startsWith('1') && val.length === 10) {
      return ['0', '1', '6', '7', '8', '9'].includes(val[1]);
    }

    // 서울: 2로 시작하고 9자리
    if (val.startsWith('2') && val.length === 9) {
      return true;
    }

    // 지방: 3-6으로 시작하고 10자리
    if (['3', '4', '5', '6'].includes(val[0]) && val.length === 10) {
      return true;
    }

    return false;
  }, '올바른 전화번호 형식이 아닙니다');

export const urlSchema = z.string().min(1, 'URL을 입력해주세요').url('올바른 URL 형식이 아닙니다');

export const requiredStringSchema = z.string().min(1, '필수 입력 항목입니다');

export const numberRangeSchema = (min: number, max: number) =>
  z.number().min(min, `최소 ${min} 이상이어야 합니다`).max(max, `최대 ${max} 이하여야 합니다`);

export const stringLengthSchema = (min: number, max: number) =>
  z.string().min(min, `최소 ${min}자 이상이어야 합니다`).max(max, `최대 ${max}자 이하여야 합니다`);

// 한국 주민등록번호 검증 스키마 (형식만 검증)
export const koreanSSNSchema = z
  .string()
  .min(1, '주민등록번호를 입력해주세요')
  .regex(/^\d{6}-\d{7}$/, '올바른 주민등록번호 형식이 아닙니다 (예: 123456-1234567)');

// 신용카드 번호 검증 스키마 (형식만 검증 - 16자리만 허용)
export const creditCardSchema = z
  .string()
  .min(1, '카드 번호를 입력해주세요')
  .refine((val) => /^\d{16}$/.test(val), '올바른 카드 번호 형식이 아닙니다 (16자리 숫자)');

// 파일 검증 스키마들
export const fileSizeSchema = (maxSizeInMB: number) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= maxSizeInMB * 1024 * 1024,
      `파일 크기는 ${maxSizeInMB}MB 이하여야 합니다`
    );

export const fileTypeSchema = (allowedTypes: string[]) =>
  z.instanceof(File).refine(
    (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension ? allowedTypes.includes(extension) : false;
    },
    `허용되지 않는 파일 형식입니다. 허용 형식: ${allowedTypes.join(', ')}`
  );

// 복합 스키마들
export const loginSchema = z.object({
  email: emailSchema,
  password: requiredStringSchema,
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: requiredStringSchema,
    firstName: requiredStringSchema,
    lastName: requiredStringSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const userProfileSchema = z.object({
  firstName: requiredStringSchema,
  lastName: requiredStringSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: z.string().max(500, '자기소개는 500자 이하여야 합니다').optional(),
});

// Vee-Validate용 스키마 변환 (타입 주석 추가)
export const emailValidationSchema = toTypedSchema(emailSchema) as any;
export const passwordValidationSchema = toTypedSchema(passwordSchema) as any;
export const phoneValidationSchema = toTypedSchema(phoneSchema) as any;
export const urlValidationSchema = toTypedSchema(urlSchema) as any;
export const loginValidationSchema = toTypedSchema(loginSchema) as any;
export const registerValidationSchema = toTypedSchema(registerSchema) as any;
export const userProfileValidationSchema = toTypedSchema(userProfileSchema) as any;

// 유틸리티 함수들 (기존 함수들과의 호환성을 위해)
export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  try {
    passwordSchema.parse(password);
    return {
      isValid: true,
      score: 5,
      feedback: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        score: 0,
        feedback: error.errors.map((e) => e.message),
      };
    }
    return {
      isValid: false,
      score: 0,
      feedback: ['비밀번호 검증에 실패했습니다'],
    };
  }
}

export function validatePhone(phone: string): boolean {
  try {
    phoneSchema.parse(phone);
    return true;
  } catch {
    return false;
  }
}

export function validateUrl(url: string): boolean {
  try {
    urlSchema.parse(url);
    return true;
  } catch {
    return false;
  }
}

export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
