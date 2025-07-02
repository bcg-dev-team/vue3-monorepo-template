// API 관련 기능들을 export
export * from './client';
export * from './services';
export * from './types';

// 기본 API 클라이언트 인스턴스
import { ApiClient } from './client';

/**
 * 기본 API 클라이언트 인스턴스
 */
export const apiClient = new ApiClient({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

export default apiClient;
