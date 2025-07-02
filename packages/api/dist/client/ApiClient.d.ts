import type { ApiClientConfig, ApiResponse } from '@template/types';
/**
 * API 클라이언트 클래스
 */
export declare class ApiClient {
    private config;
    constructor(config: ApiClientConfig);
    /**
     * GET 요청
     */
    get<T = any>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    /**
     * POST 요청
     */
    post<T = any>(url: string, data?: any): Promise<ApiResponse<T>>;
    /**
     * PUT 요청
     */
    put<T = any>(url: string, data?: any): Promise<ApiResponse<T>>;
    /**
     * PATCH 요청
     */
    patch<T = any>(url: string, data?: any): Promise<ApiResponse<T>>;
    /**
     * DELETE 요청
     */
    delete<T = any>(url: string): Promise<ApiResponse<T>>;
    /**
     * 공통 요청 메서드
     */
    private request;
    /**
     * URL 빌드
     */
    private buildUrl;
    /**
     * 응답 처리
     */
    private handleResponse;
    /**
     * 에러 처리
     */
    private handleError;
    /**
     * 설정 업데이트
     */
    updateConfig(newConfig: Partial<ApiClientConfig>): void;
    /**
     * 헤더 설정
     */
    setHeader(key: string, value: string): void;
    /**
     * 인증 토큰 설정
     */
    setAuthToken(token: string): void;
}
//# sourceMappingURL=ApiClient.d.ts.map