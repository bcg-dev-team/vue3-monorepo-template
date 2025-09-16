/**
 * 공통 타입 정의
 * 프로젝트 전체에서 사용되는 기본 타입들을 정의합니다.
 */

/**
 * 객체의 모든 속성을 재귀적으로 선택적으로 만드는 유틸리티 타입
 * @template T - 대상 타입
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 로딩 상태를 나타내는 타입
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 로딩 상태와 데이터를 함께 관리하는 인터페이스
 * @template T - 데이터 타입
 */
export interface LoadingStateData<T = unknown> {
  /** 현재 로딩 상태 */
  state: LoadingState;
  /** 로드된 데이터 */
  data?: T;
  /** 에러 메시지 */
  error?: string;
}

/**
 * 정렬 순서 타입
 */
export type SortOrder = 'asc' | 'desc';

/**
 * 지원하는 언어 타입
 */
export type Locale = 'ko' | 'en' | 'ja' | 'zh';

/**
 * 환경 타입
 */
export type Environment = 'development' | 'staging' | 'production';

// 기본 공통 타입 정의

/**
 * 기본 엔티티 인터페이스
 * 모든 데이터베이스 엔티티가 상속받아야 하는 기본 구조
 */
export interface BaseEntity {
  /** 고유 식별자 */
  id: string;
  /** 생성 일시 */
  createdAt: Date;
  /** 수정 일시 */
  updatedAt: Date;
}

/**
 * 페이지네이션 파라미터 인터페이스
 */
export interface PaginationParams {
  /** 현재 페이지 번호 (1부터 시작) */
  page: number;
  /** 페이지당 항목 수 */
  limit: number;
  /** 정렬 기준 필드 */
  sortBy?: string;
  /** 정렬 순서 */
  sortOrder?: SortOrder;
}

/**
 * 페이지네이션된 응답 인터페이스
 * @template T - 데이터 타입
 */
export interface PaginatedResponse<T> {
  /** 데이터 배열 */
  data: T[];
  /** 전체 항목 수 */
  total: number;
  /** 현재 페이지 번호 */
  page: number;
  /** 페이지당 항목 수 */
  limit: number;
  /** 전체 페이지 수 */
  totalPages: number;
}

/**
 * API 응답 인터페이스
 * @template T - 응답 데이터 타입
 */
export interface ApiResponse<T = unknown> {
  /** 요청 성공 여부 */
  success: boolean;
  /** 응답 데이터 */
  data?: T;
  /** 응답 메시지 */
  message?: string;
  /** 에러 메시지 */
  error?: string;
  /** HTTP 상태 코드 */
  statusCode?: number;
}

/**
 * 선택 옵션 인터페이스
 * 드롭다운, 셀렉트 박스 등에서 사용
 */
export interface SelectOption {
  /** 표시될 라벨 */
  label: string;
  /** 실제 값 */
  value: string | number;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 유효성 검증 에러 인터페이스
 */
export interface ValidationError {
  /** 에러가 발생한 필드명 */
  field: string;
  /** 에러 메시지 */
  message: string;
}

/**
 * 폼 에러 인터페이스
 * 필드명을 키로 하고 에러 메시지를 값으로 하는 객체
 */
export interface FormErrors {
  [key: string]: string;
}

/**
 * 포지션 타입
 */
export type PositionType = 'LONG' | 'SHORT';
