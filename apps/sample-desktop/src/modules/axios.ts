import { createAxiosInstance, SecurityErrorCode, type AxiosError } from '@template/api';
import LocalStorageService from '@/service/localStorage/local-storage.service';
import LocalStorageKey from '@/service/localStorage/local-storage-key';
import { Logout } from '@/service/auth.service';
import { authService } from '@/service/api';

const tokenResolver = () => LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN) || undefined;

/**
 * 토큰 갱신 및 요청 재시도 처리
 * @param error - Axios 에러 객체
 * @returns 재시도 요청 결과 또는 에러
 */
const handleTokenRefresh = async (error: AxiosError): Promise<any> => {
  const expiredAccessToken = tokenResolver();

  // 토큰이 없으면 로그아웃
  if (!expiredAccessToken) {
    console.error('액세스 토큰이 없습니다.');
    Logout();
    return Promise.reject(error);
  }

  try {
    const result = await authService.refreshToken(expiredAccessToken);

    // 토큰 갱신 실패 시 로그아웃
    if (result.status !== 'success') {
      console.error('토큰 갱신 실패:', result);
      Logout();
      return Promise.reject(error);
    }

    // 새 토큰 저장
    LocalStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, result.data.accessToken);
    console.log('토큰 갱신 성공. 새 토큰이 저장되었습니다.');

    // 원래 요청 설정이 있으면 재시도
    if (error.config) {
      return api.request(error.config);
    }

    // 요청 설정이 없어도 토큰은 갱신되었으므로 로그아웃하지 않고 에러만 반환
    console.warn('토큰은 갱신되었으나 원래 요청을 재시도할 수 없습니다.');
    return Promise.reject(error);
  } catch (refreshError) {
    console.error('토큰 갱신 요청 실패:', refreshError);
    Logout();
    return Promise.reject(error);
  }
};

/**
 * Axios 에러 핸들러
 * @param error - Axios 에러 객체
 */
const errorHandler = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    const responseData = error.response.data as { code?: string; [key: string]: any };
    // 서버에서 에러 응답을 받은 경우 (상태 코드 포함)
    switch (error.response.status) {
      case 400:
        // Bad Request 처리
        alert('잘못된 요청입니다.');
        console.error('잘못된 요청입니다.');
        break;
      case 401:
        if (responseData.code === SecurityErrorCode.TOKEN_VALIDATION_FAILED.code) {
          return handleTokenRefresh(error);
        }
        break;
      case 403:
        // Forbidden 처리
        alert('접근 권한이 없습니다.');
        break;
      case 404:
        // Not Found 처리
        alert('페이지를 찾을 수 없습니다.');
        break;
      case 500:
        // Internal Server Error 처리
        alert('서버 오류가 발생했습니다.');
        break;
      default:
        alert('알 수 없는 에러가 발생했습니다.');
        console.error('기타 에러:', responseData);
    }
  } else if (error.request) {
    // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 문제 등)
    alert('서버로부터 응답을 받지 못했습니다.');
    console.error('서버로부터 응답을 받지 못했습니다.');
  } else {
    // 요청 설정 중 에러가 발생한 경우
    alert('요청 설정 중 오류가 발생했습니다.');
    console.error('요청 설정 중 오류가 발생했습니다.', error.message);
  }
  return Promise.reject(error); // 에러를 다시 reject하여 호출한 곳에서 처리할 수 있도록 함
};

const api = createAxiosInstance(tokenResolver, errorHandler);

export default api;
