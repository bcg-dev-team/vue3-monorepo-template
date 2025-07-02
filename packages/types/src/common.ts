// 공통 타입 정의
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingStateData<T = unknown> {
  state: LoadingState;
  data?: T;
  error?: string;
}

export type SortOrder = 'asc' | 'desc';

export type Locale = 'ko' | 'en' | 'ja' | 'zh';

export type Environment = 'development' | 'staging' | 'production';

// 기본 공통 타입 정의

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
