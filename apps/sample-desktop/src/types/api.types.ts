// 공통 API 응답 타입 정의
export interface ApiResponse<T = any> {
  status: string;
  code: number;
  data: T;
}

// 에러 응답 타입
export interface ApiError {
  status: string;
  code: number;
  message: string;
  details?: any;
}

// 페이징 관련 공통 타입
export interface PaginatedResponse<T> extends ApiResponse<{
  contents: T[];
  totalCount: number;
  page: number;
  size: number;
}> {}

// 성공/실패 여부만 필요한 경우
export type SimpleResponse = ApiResponse<string>;