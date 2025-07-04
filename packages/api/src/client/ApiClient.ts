import type {
  ApiRequestConfig,
  ApiClientConfig,
  ApiResponse,
  ApiError,
  HttpMethod,
} from '@template/types';

/**
 * API 클라이언트 클래스
 * HTTP 요청을 처리하고 API 통신을 담당합니다.
 *
 * @example
 * ```typescript
 * const apiClient = new ApiClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000
 * });
 *
 * const response = await apiClient.get<User>('/users/1');
 * ```
 */
export class ApiClient {
  /** API 클라이언트 설정 */
  private config: ApiClientConfig;

  /**
   * API 클라이언트 생성자
   * @param config - API 클라이언트 설정
   */
  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      ...config,
    };
  }

  /**
   * GET 요청을 수행합니다.
   * @param url - 요청 URL
   * @param params - 쿼리 파라미터
   * @returns API 응답
   * @template T - 응답 데이터 타입
   */
  async get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
    });
  }

  /**
   * POST 요청을 수행합니다.
   * @param url - 요청 URL
   * @param data - 요청 데이터
   * @returns API 응답
   * @template T - 응답 데이터 타입
   */
  async post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
    });
  }

  /**
   * PUT 요청을 수행합니다.
   * @param url - 요청 URL
   * @param data - 요청 데이터
   * @returns API 응답
   * @template T - 응답 데이터 타입
   */
  async put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
    });
  }

  /**
   * PATCH 요청을 수행합니다.
   * @param url - 요청 URL
   * @param data - 요청 데이터
   * @returns API 응답
   * @template T - 응답 데이터 타입
   */
  async patch<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
    });
  }

  /**
   * DELETE 요청을 수행합니다.
   * @param url - 요청 URL
   * @returns API 응답
   * @template T - 응답 데이터 타입
   */
  async delete<T = unknown>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
    });
  }

  /**
   * 공통 요청 메서드
   * 모든 HTTP 요청의 기본 로직을 처리합니다.
   * @param config - 요청 설정
   * @returns API 응답
   * @template T - 응답 데이터 타입
   * @private
   */
  private async request<T = unknown>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { method, url, data, params, headers = {} } = config;

    try {
      // URL에 쿼리 파라미터 추가
      const fullUrl = this.buildUrl(url, params);

      // 요청 설정
      const requestConfig: RequestInit = {
        method,
        headers: {
          ...this.config.headers,
          ...headers,
        },
        credentials: this.config.withCredentials ? 'include' : 'same-origin',
      };

      // Body 추가 (GET, DELETE 제외)
      if (data && method !== 'GET' && method !== 'DELETE') {
        requestConfig.body = JSON.stringify(data);
      }

      // 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      requestConfig.signal = controller.signal;

      // 요청 실행
      const response = await fetch(fullUrl, requestConfig);
      clearTimeout(timeoutId);

      // 응답 처리
      const responseData = await this.handleResponse<T>(response);

      return {
        success: response.ok,
        data: responseData || undefined,
        statusCode: response.status,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * URL을 빌드합니다.
   * @param url - 기본 URL
   * @param params - 쿼리 파라미터
   * @returns 완성된 URL
   * @private
   */
  private buildUrl(url: string, params?: Record<string, unknown>): string {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;

    if (!params) return fullUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${fullUrl}?${queryString}` : fullUrl;
  }

  /**
   * 응답을 처리합니다.
   * @param response - Fetch API 응답 객체
   * @returns 파싱된 응답 데이터
   * @template T - 응답 데이터 타입
   * @private
   */
  private async handleResponse<T>(response: Response): Promise<T | null> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      try {
        const data = await response.json();
        return this.validateResponseData<T>(data);
      } catch (error) {
        console.warn('JSON 파싱 실패:', error);
        return null;
      }
    }

    if (contentType?.includes('text/')) {
      const text = await response.text();
      return text as T;
    }

    return null;
  }

  /**
   * 응답 데이터 유효성 검사
   * @param data - 검사할 데이터
   * @returns 검증된 데이터 또는 null
   * @template T - 예상 데이터 타입
   * @private
   */
  private validateResponseData<T>(data: unknown): T | null {
    // 기본적인 유효성 검사
    if (data === null || data === undefined) {
      return null;
    }

    // 여기에 더 구체적인 타입 검증 로직을 추가할 수 있습니다
    // 예: 스키마 검증, 필수 필드 확인 등

    return data as T; // 여전히 타입 단언이 필요하지만, 검증 후 사용
  }

  /**
   * 에러를 처리합니다.
   * @param error - 발생한 에러
   * @returns 에러 응답
   * @private
   */
  private handleError<T>(error: unknown): ApiResponse<T> {
    const apiError: ApiError = {
      status: 0,
      message: 'Network error',
    };

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        apiError.message = 'Request timeout';
      } else if (error instanceof TypeError) {
        apiError.message = 'Network error';
      } else {
        apiError.message = error.message || 'Unknown error';
      }
    }

    return {
      success: false,
      error: apiError.message,
      statusCode: apiError.status,
    };
  }

  /**
   * 클라이언트 설정을 업데이트합니다.
   * @param newConfig - 새로운 설정
   */
  updateConfig(newConfig: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 헤더를 설정합니다.
   * @param key - 헤더 키
   * @param value - 헤더 값
   */
  setHeader(key: string, value: string): void {
    this.config.headers = { ...this.config.headers, [key]: value };
  }

  /**
   * 인증 토큰을 설정합니다.
   * @param token - JWT 토큰
   */
  setAuthToken(token: string): void {
    this.setHeader('Authorization', `Bearer ${token}`);
  }

  /**
   * 인증 토큰을 제거합니다.
   */
  removeAuthToken(): void {
    const headers = { ...this.config.headers };
    delete headers.Authorization;
    this.config.headers = headers;
  }
}
