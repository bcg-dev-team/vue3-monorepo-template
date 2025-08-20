import type { AxiosError } from 'axios';

// axios 타입들도 export
export type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

/**
 * 토큰을 반환하는 함수 타입
 * 각 앱에서 인증 토큰을 제공하는 방식으로 구현
 */
export type TokenResolver = () => string | Promise<string> | undefined;

/**
 * 에러 처리를 담당하는 함수 타입
 * 각 앱에서 에러 상황에 맞는 처리를 구현
 */
export type ErrorHandler = (error: AxiosError) => Promise<void> | void;
