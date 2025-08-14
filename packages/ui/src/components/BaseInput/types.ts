/**
 * BaseInput 컴포넌트의 공통 Props 타입 정의
 */
export interface CommonInputProps {
  /**
   * 입력값 (v-model)
   */
  modelValue?: string;
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
 * 텍스트 입력 컴포넌트용 Props
 */
export interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel';
}

/**
 * 숫자 입력 컴포넌트용 Props
 */
export interface NumberInputProps extends CommonInputProps {
  type?: 'number';
}

/**
 * 날짜 입력 컴포넌트용 Props
 */
export interface DateInputProps extends CommonInputProps {
  type?: 'date' | 'datetime-local';
}
