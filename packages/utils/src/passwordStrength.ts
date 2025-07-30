import type { ZxcvbnResult, PasswordStrengthDisplay } from '@template/types';
import zxcvbn from 'zxcvbn';

/**
 * zxcvbn을 사용하여 비밀번호 강도를 분석합니다.
 *
 * @param password - 분석할 비밀번호
 * @param userInputs - 사용자 입력값들 (이메일, 이름 등) - 이 값들이 비밀번호에 포함되면 강도가 낮아집니다
 * @returns zxcvbn 분석 결과
 */
export function analyzePasswordStrength(password: string, userInputs: string[] = []): ZxcvbnResult {
  return zxcvbn(password, userInputs);
}

/**
 * zxcvbn 결과를 UI에서 표시하기 위한 형태로 변환합니다.
 *
 * @param result - zxcvbn 분석 결과
 * @returns UI 표시용 비밀번호 강도 정보
 */
export function getPasswordStrengthDisplay(result: ZxcvbnResult): PasswordStrengthDisplay {
  const strengthMap = {
    0: {
      label: '매우 약함' as const,
      color: 'red' as const,
      progressColor: 'bg-red-500',
    },
    1: {
      label: '약함' as const,
      color: 'orange' as const,
      progressColor: 'bg-orange-500',
    },
    2: {
      label: '보통' as const,
      color: 'yellow' as const,
      progressColor: 'bg-yellow-500',
    },
    3: {
      label: '강함' as const,
      color: 'light-green' as const,
      progressColor: 'bg-green-400',
    },
    4: {
      label: '매우 강함' as const,
      color: 'green' as const,
      progressColor: 'bg-green-600',
    },
  };

  const strength = strengthMap[result.score];

  return {
    score: result.score,
    label: strength.label,
    color: strength.color,
    progressColor: strength.progressColor,
    feedback: [result.feedback.warning, ...result.feedback.suggestions].filter(Boolean),
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
  };
}

/**
 * 비밀번호가 충분히 강한지 확인합니다.
 *
 * @param password - 확인할 비밀번호
 * @param userInputs - 사용자 입력값들
 * @param minScore - 최소 요구 점수 (기본값: 2 - 보통)
 * @returns 비밀번호 강도가 충분한지 여부
 */
export function isPasswordStrongEnough(
  password: string,
  userInputs: string[] = [],
  minScore: 0 | 1 | 2 | 3 | 4 = 2
): boolean {
  const result = analyzePasswordStrength(password, userInputs);
  return result.score >= minScore;
}

/**
 * 비밀번호 강도에 따른 권장사항을 반환합니다.
 *
 * @param password - 분석할 비밀번호
 * @param userInputs - 사용자 입력값들
 * @returns 권장사항 배열
 */
export function getPasswordRecommendations(password: string, userInputs: string[] = []): string[] {
  const result = analyzePasswordStrength(password, userInputs);
  const recommendations: string[] = [];

  // 기본 권장사항
  if (password.length < 8) {
    recommendations.push('비밀번호를 8자 이상으로 설정하세요');
  }

  if (password.length < 12) {
    recommendations.push('더 안전한 비밀번호를 위해 12자 이상을 권장합니다');
  }

  if (!/[a-z]/.test(password)) {
    recommendations.push('소문자를 포함하세요');
  }

  if (!/[A-Z]/.test(password)) {
    recommendations.push('대문자를 포함하세요');
  }

  if (!/\d/.test(password)) {
    recommendations.push('숫자를 포함하세요');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    recommendations.push('특수문자를 포함하세요');
  }

  // zxcvbn 피드백 추가
  if (result.feedback.warning) {
    recommendations.push(result.feedback.warning);
  }

  recommendations.push(...result.feedback.suggestions);

  return [...new Set(recommendations)]; // 중복 제거
}
