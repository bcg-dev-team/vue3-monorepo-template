// 인증 관련 타입 정의

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// zxcvbn 비밀번호 강도 분석 관련 타입 정의

export interface ZxcvbnResult {
  score: 0 | 1 | 2 | 3 | 4;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crack_times_display: {
    online_throttling_100_per_hour: string | number;
    online_no_throttling_10_per_second: string | number;
    offline_slow_hashing_1e4_per_second: string | number;
    offline_fast_hashing_1e10_per_second: string | number;
  };
  sequence: Array<{
    pattern: string;
    i: number;
    j: number;
    token: string;
    matched_word: string;
    rank: number;
    dictionary_name: string;
    reversed: boolean;
    l33t: boolean;
    guesses: number;
    guesses_log10: number;
  }>;
  calc_time: number;
}

export interface PasswordStrengthDisplay {
  score: 0 | 1 | 2 | 3 | 4;
  label: '매우 약함' | '약함' | '보통' | '강함' | '매우 강함';
  color: 'red' | 'orange' | 'yellow' | 'light-green' | 'green';
  progressColor: string;
  feedback: string[];
  crackTime: string | number;
}
