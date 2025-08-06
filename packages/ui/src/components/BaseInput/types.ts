/**
 * BaseInput 컴포넌트의 공통 Props 타입 정의
 */
export interface BaseInputProps {
  /**
   * 입력값 (v-model)
   */
  modelValue?: string;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 입력 타입
   */
  type?: string;
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
