/**
 * 이메일 형식 검증
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도 검증
 */
export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // 최소 길이
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('비밀번호는 최소 8자 이상이어야 합니다');
  }

  // 대문자 포함
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('대문자를 포함해야 합니다');
  }

  // 소문자 포함
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('소문자를 포함해야 합니다');
  }

  // 숫자 포함
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('숫자를 포함해야 합니다');
  }

  // 특수문자 포함
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('특수문자를 포함해야 합니다');
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  };
}

/**
 * 전화번호 형식 검증
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+82|0)[1-9][0-9]{7,8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * URL 형식 검증
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 숫자 범위 검증
 */
export function validateNumberRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 문자열 길이 검증
 */
export function validateStringLength(str: string, min: number, max: number): boolean {
  return str.length >= min && str.length <= max;
}

/**
 * 필수 필드 검증
 */
export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * 한국 주민등록번호 검증
 */
export function validateKoreanSSN(ssn: string): boolean {
  const ssnRegex = /^\d{6}-\d{7}$/;
  if (!ssnRegex.test(ssn)) return false;

  const numbers = ssn.replace('-', '').split('').map(Number);
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += numbers[i] * weights[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  return numbers[12] === checkDigit;
}

/**
 * 신용카드 번호 검증 (Luhn 알고리즘)
 */
export function validateCreditCard(cardNumber: string): boolean {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleanNumber)) return false;

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
}

/**
 * 파일 크기 검증
 */
export function validateFileSize(fileSize: number, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
}

/**
 * 파일 타입 검증
 */
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}
