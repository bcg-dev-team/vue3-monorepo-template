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
    .transform((val) => val.replace(/[-\\s]/g, ''))
    .refine((val) => /^(\+82|0)[1-9][0-9]{7,8}$/.test(val), '올바른 전화번호 형식이 아닙니다');
export const urlSchema = z.string().min(1, 'URL을 입력해주세요').url('올바른 URL 형식이 아닙니다');
export const requiredStringSchema = z.string().min(1, '필수 입력 항목입니다');
export const numberRangeSchema = (min, max) => z.number().min(min, `최소 ${min} 이상이어야 합니다`).max(max, `최대 ${max} 이하여야 합니다`);
export const stringLengthSchema = (min, max) => z.string().min(min, `최소 ${min}자 이상이어야 합니다`).max(max, `최대 ${max}자 이하여야 합니다`);
// 한국 주민등록번호 검증 스키마
export const koreanSSNSchema = z
    .string()
    .min(1, '주민등록번호를 입력해주세요')
    .regex(/^\d{6}-\d{7}$/, '올바른 주민등록번호 형식이 아닙니다 (예: 123456-1234567)')
    .refine((ssn) => {
    const numbers = ssn.replace('-', '').split('').map(Number);
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += numbers[i] * weights[i];
    }
    const remainder = sum % 11;
    const checkDigit = remainder < 2 ? 0 : 11 - remainder;
    return numbers[12] === checkDigit;
}, '올바르지 않은 주민등록번호입니다');
// 신용카드 번호 검증 스키마 (Luhn 알고리즘)
export const creditCardSchema = z
    .string()
    .min(1, '카드 번호를 입력해주세요')
    .regex(/^\d{13,19}$/, '올바른 카드 번호 형식이 아닙니다')
    .refine((cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    let sum = 0;
    let isEven = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i]);
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}, '올바르지 않은 카드 번호입니다');
// 파일 검증 스키마들
export const fileSizeSchema = (maxSizeInMB) => z
    .instanceof(File)
    .refine((file) => file.size <= maxSizeInMB * 1024 * 1024, `파일 크기는 ${maxSizeInMB}MB 이하여야 합니다`);
export const fileTypeSchema = (allowedTypes) => z.instanceof(File).refine((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? allowedTypes.includes(extension) : false;
}, `허용되지 않는 파일 형식입니다. 허용 형식: ${allowedTypes.join(', ')}`);
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
export const emailValidationSchema = toTypedSchema(emailSchema);
export const passwordValidationSchema = toTypedSchema(passwordSchema);
export const phoneValidationSchema = toTypedSchema(phoneSchema);
export const urlValidationSchema = toTypedSchema(urlSchema);
export const loginValidationSchema = toTypedSchema(loginSchema);
export const registerValidationSchema = toTypedSchema(registerSchema);
export const userProfileValidationSchema = toTypedSchema(userProfileSchema);
// 유틸리티 함수들 (기존 함수들과의 호환성을 위해)
export function validateEmail(email) {
    try {
        emailSchema.parse(email);
        return true;
    }
    catch {
        return false;
    }
}
export function validatePassword(password) {
    try {
        passwordSchema.parse(password);
        return {
            isValid: true,
            score: 5,
            feedback: [],
        };
    }
    catch (error) {
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
export function validatePhone(phone) {
    try {
        phoneSchema.parse(phone);
        return true;
    }
    catch {
        return false;
    }
}
export function validateUrl(url) {
    try {
        urlSchema.parse(url);
        return true;
    }
    catch {
        return false;
    }
}
export function validateRequired(value) {
    if (value === null || value === undefined)
        return false;
    if (typeof value === 'string')
        return value.trim().length > 0;
    if (Array.isArray(value))
        return value.length > 0;
    return true;
}
//# sourceMappingURL=validation.js.map