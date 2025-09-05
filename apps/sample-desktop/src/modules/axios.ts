import LocalStorageService from '@/service/localStorage/local-storage.service';
import LocalStorageKey from '@/service/localStorage/local-storage-key';
import { createAxiosInstance, AxiosError } from '@template/api';
import router from '@/router';

const tokenResolver = () => LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN) || undefined;

const errorHandler = async (error: AxiosError) => {
  if (error.response) {
    // 서버에서 에러 응답을 받은 경우 (상태 코드 포함)
    switch (error.response.status) {
      case 400:
        // Bad Request 처리
        alert('잘못된 요청입니다.');
        console.error('잘못된 요청입니다.');
        break;
      case 401:
        // Unauthorized 처리 (로그인 페이지로 리다이렉트 등)
        if (error.code === 'TOKEN_EXPIRED') {
          try {
            //TODO: 올바른 토큰 갱신 로직 구현 필요 - 현재 임시 구현
            const result = await api.post('/auth/refresh');

            if (result.status === 200) {
              LocalStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, result.data.accessToken);

              // 토큰 갱신 후 원래 요청을 재시도
              if (error.config) {
                // 새로운 토큰으로 원래 요청 재시도
                return api.request(error.config);
              }
            } else {
              console.error('토큰 갱신 실패:', error);
              await router.push('/login');
            }
          } catch (error) {
            console.error('토큰 갱신 요청 실패:', error);
            await router.push('/login');
          }
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
        console.error('기타 에러:', error.response.data);
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
