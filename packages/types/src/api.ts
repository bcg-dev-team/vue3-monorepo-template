// HTTP 메서드 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API 요청 설정
export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

// API 클라이언트 설정
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

// API 서비스 인터페이스
export interface ApiService<T = any> {
  getAll(
    params?: import('./common').PaginationParams
  ): Promise<import('./common').PaginatedResponse<T>>;
  getById(id: string): Promise<import('./common').ApiResponse<T>>;
  create(data: Partial<T>): Promise<import('./common').ApiResponse<T>>;
  update(id: string, data: Partial<T>): Promise<import('./common').ApiResponse<T>>;
  delete(id: string): Promise<import('./common').ApiResponse<void>>;
}

// API 에러 타입
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

// API 요청 상태
export interface ApiState<T = any> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, unknown>;
}
