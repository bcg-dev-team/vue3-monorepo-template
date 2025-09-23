import { ApiSuccessResponse } from './api.types';

/**
 * 계좌 정보 타입 정의
 */
export interface AccountInfo {
  /** 계좌번호 */
  accountNo: string;
  /** 계좌 시퀀스 */
  accountSequence: string;
  /** 계좌 등급 */
  accountGrade: string;
  /** 계좌 별칭 */
  accountAlias: string;
  /** 노출 여부 (Y/N) */
  visible: string;
  /** 노출 순서 */
  visibleSequence: string;
}

/**
 * 계좌 정보 조회 요청 파라미터
 */
export interface AccountInfoRequest {
  /** 회원 이메일 */
  email: string;
}

/**
 * 계좌 정보 조회 응답 데이터
 */
export interface AccountInfoResponseData {
  /** 계좌 목록 */
  accountList: AccountInfo[];
}

/**
 * 계좌 정보 조회 API 응답
 */
export interface AccountInfoResponse extends ApiSuccessResponse<AccountInfoResponseData> {}

/**
 * 계좌 개설 요청 데이터
 */
export interface AccountCreateRequest {
  /** 계좌 비밀번호 */
  accountPassword: string;
  /** 계좌 별칭  */
  accountAlias: string;
}

/**
 * 계좌 개설 응답 데이터
 */
export interface AccountCreateResponseData {
  /** 계좌번호 */
  accountNo: string;
  /** 계좌 시퀀스 */
  accountSequence: string;
  /** 노출 순서 */
  visibleSequence: string;
}

/**
 * 계좌 개설 API 응답
 */
export interface AccountCreateResponse extends ApiSuccessResponse<AccountCreateResponseData> {}

/**
 * 계좌 정보 변경 요청 데이터 (개별 계좌)
 */
export interface AccountUpdateInfo {
  /** 계좌번호 */
  accountNo: string;
  /** 계좌 별칭 */
  accountAlias?: string;
  /** 노출 여부 (Y/N) */
  visible?: string;
  /** 노출 순서 */
  visibleSequence?: string;
}

/**
 * 계좌 정보 변경 요청 데이터
 */
export interface AccountUpdateRequest {
  /** 이메일 주소 */
  email: string;
  /** 계좌 정보 목록 */
  accountInfos: AccountUpdateInfo[];
}

/**
 * 계좌 정보 변경 API 응답
 */
export interface AccountUpdateResponse extends ApiSuccessResponse<string> {}

/**
 * 계좌 비밀번호 변경 요청 데이터
 */
export interface AccountChangePasswordRequest {
  /** 이메일 주소 */
  email: string;
  /** 계좌번호 */
  accountNo: string;
  /** 변경 전 비밀번호 */
  beforeAccountPassword: string;
  /** 변경 후 비밀번호 */
  afterAccountPassword: string;
}

/**
 * 계좌 비밀번호 변경 API 응답
 */
export interface AccountChangePasswordResponse extends ApiSuccessResponse<string> {}
