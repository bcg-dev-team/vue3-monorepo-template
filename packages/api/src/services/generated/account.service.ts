import {
  AccountCreateRequest,
  AccountInfoUpdateRequest,
  AccountUpdatePwdRequest,
  ResponseDataAccountCreateResponse,
  ResponseDataAccountInfoResponse,
  ResponseDataString,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 계좌 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class AccountService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 계좌 정보 조회
   * 회원의 계좌 정보를 조회한다.
   * @returns 계좌 정보 조회 결과
   */
  getAccountInfo() {
    return this.axios.get<ResponseDataAccountInfoResponse>(
      `/main/v1/accounts/info`
    );
  }

  /**
   * 계좌 정보 변경
   * 계좌 정보(별칭, 표시여부, 표시순번)를 변경한다.
   * @returns 계좌 정보 변경 결과
   */
  updateAccountInfo(request: AccountInfoUpdateRequest) {
    return this.axios.put<ResponseDataString>(
      `/main/v1/accounts/info`,
      request
    );
  }

  /**
   * 계좌 비밀번호 변경
   * 개설한 계좌의 비밀번호를 변경한다.
   * @returns 계좌 비밀번호 변경 결과
   */
  updatePassword(request: AccountUpdatePwdRequest) {
    return this.axios.put<ResponseDataString>(
      `/main/v1/accounts/change-pw`,
      request
    );
  }

  /**
   * 계좌 개설
   * 회원가입 후 계좌를 개설한다. 기존 계좌의 존재여부와 상관없이 원장서버로 요청을 보낸다.
   * @returns 계좌 개설 결과
   */
  createAccount(request: AccountCreateRequest) {
    return this.axios.post<ResponseDataAccountCreateResponse>(
      `/main/v1/accounts/create`,
      request
    );
  }
}
