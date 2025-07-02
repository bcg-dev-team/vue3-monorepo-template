/**
 * API 클라이언트 클래스
 */
export class ApiClient {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
     * GET 요청
     */
    async get(url, params) {
        return this.request({
            method: 'GET',
            url,
            params,
        });
    }
    /**
     * POST 요청
     */
    async post(url, data) {
        return this.request({
            method: 'POST',
            url,
            data,
        });
    }
    /**
     * PUT 요청
     */
    async put(url, data) {
        return this.request({
            method: 'PUT',
            url,
            data,
        });
    }
    /**
     * PATCH 요청
     */
    async patch(url, data) {
        return this.request({
            method: 'PATCH',
            url,
            data,
        });
    }
    /**
     * DELETE 요청
     */
    async delete(url) {
        return this.request({
            method: 'DELETE',
            url,
        });
    }
    /**
     * 공통 요청 메서드
     */
    async request(config) {
        const { method, url, data, params, headers = {} } = config;
        try {
            // URL에 쿼리 파라미터 추가
            const fullUrl = this.buildUrl(url, params);
            // 요청 설정
            const requestConfig = {
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
            const responseData = await this.handleResponse(response);
            return {
                success: response.ok,
                data: responseData || undefined,
                statusCode: response.status,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * URL 빌드
     */
    buildUrl(url, params) {
        const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;
        if (!params)
            return fullUrl;
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
     * 응답 처리
     */
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            return response.json();
        }
        if (contentType?.includes('text/')) {
            return response.text();
        }
        return null;
    }
    /**
     * 에러 처리
     */
    handleError(error) {
        const apiError = {
            status: 0,
            message: 'Network error',
        };
        if (error.name === 'AbortError') {
            apiError.message = 'Request timeout';
        }
        else if (error instanceof TypeError) {
            apiError.message = 'Network error';
        }
        else {
            apiError.message = error.message || 'Unknown error';
        }
        return {
            success: false,
            error: apiError.message,
            statusCode: apiError.status,
        };
    }
    /**
     * 설정 업데이트
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    /**
     * 헤더 설정
     */
    setHeader(key, value) {
        this.config.headers = { ...this.config.headers, [key]: value };
    }
    /**
     * 인증 토큰 설정
     */
    setAuthToken(token) {
        this.setHeader('Authorization', `Bearer ${token}`);
    }
}
//# sourceMappingURL=ApiClient.js.map