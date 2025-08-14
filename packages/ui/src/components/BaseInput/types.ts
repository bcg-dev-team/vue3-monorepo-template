/**
 * BaseInput 컴포넌트의 공통 Props 타입 정의
 */
export interface CommonInputProps {
  /**
   * 입력값 (v-model)
   */
  modelValue?: string | number;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 읽기 전용 여부
   * @default false
   */
  readonly?: boolean;
  /**
   * 입력창을 부모의 100% 너비로 확장할지 여부 (기본값: false, false일 때는 w-[200px])
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * InputFactory 컴포넌트용 Props
 * 모든 Input 타입을 통합 관리
 */
export interface InputFactoryProps extends CommonInputProps {
  /**
   * 입력 타입
   */
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'number' | 'date' | 'select' | 'stepper';
  /**
   * Select 전용: 선택 옵션들
   */
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  /**
   * Number, Stepper 전용: 최소값
   */
  min?: number;
  /**
   * Number, Stepper 전용: 최대값
   */
  max?: number;
  /**
   * Number, Stepper 전용: 증감 단위
   */
  step?: number;
}

/**
 * 텍스트 입력 컴포넌트용 Props (단순 타입)
 */
export interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel';
}

/**
 * 숫자 입력 컴포넌트용 Props (단순 타입)
 */
export interface NumberInputProps extends CommonInputProps {
  type?: 'number';
  min?: number;
  max?: number;
  step?: number;
}

/**
 * 날짜 입력 컴포넌트용 Props (복잡한 타입)
 */
export interface DateInputProps extends CommonInputProps {
  type?: 'date' | 'datetime-local';
}

/**
 * Select 입력 컴포넌트용 Props (복잡한 타입)
 */
export interface SelectInputProps extends CommonInputProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

/**
 * Stepper 입력 컴포넌트용 Props (복잡한 타입)
 */
export interface StepperInputProps extends CommonInputProps {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Password 입력 컴포넌트용 Props (복잡한 타입)
 */
export interface PasswordInputProps extends CommonInputProps {
  showToggle?: boolean;
}
