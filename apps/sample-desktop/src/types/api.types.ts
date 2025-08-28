// 성공 응답 타입
export interface ApiSuccessResponse<T = any> {
  status: string;
  code: number;
  data: T;
}

// 에러 응답 타입
export interface ApiErrorResponse {
  status: string;
  code: number;
  message: string;
  errors?: any | null;
}
