import {
  AccountInfoRequest,
  AccountInfoResponse,
  AccountCreateRequest,
  AccountCreateResponse,
  AccountUpdateInfo,
  AccountUpdateResponse,
  AccountChangePasswordResponse,
} from '../types/account.types';
import { CustomAxiosInstance } from '../types/axios';

export class AccountService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 계좌 정보 조회
   * 회원의 계좌 정보를 조회합니다.
   * @returns 계좌 정보 목록
   */
  getAccountInfo() {
    return this.axios.get<AccountInfoResponse>('/main/v1/accounts/info');
  }

  /**
   * 계좌 개설
   * 회원가입 후 계좌를 개설합니다. 기존 계좌의 존재여부와 상관없이 원장서버로 요청을 보냅니다.
   * @param request - 계좌 개설 요청 데이터
   * @returns 계좌 개설 결과 (계좌번호, 계좌 시퀀스, 노출 순서 포함)
   */
  createAccount(request: AccountCreateRequest) {
    return this.axios.post<AccountCreateResponse>('/main/v1/accounts/create', request);
  }

  /**
   * 계좌 정보 변경
   * 계좌 정보(별칭, 표시여부, 표시순번)를 변경합니다.
   * @param accountInfos - 변경할 계좌 정보 목록
   * @returns 계좌 정보 변경 결과
   */
  updateAccountInfo(accountInfos: AccountUpdateInfo[]) {
    const requestData = {
      accountInfos,
    };

    return this.axios.put<AccountUpdateResponse>('/main/v1/accounts/info', requestData);
  }

  /**
   * 계좌 비밀번호 변경
   * 개설한 계좌의 비밀번호를 변경합니다.
   * @param accountNo - 계좌번호
   * @param beforeAccountPassword - 변경 전 비밀번호
   * @param afterAccountPassword - 변경 후 비밀번호
   * @returns 계좌 비밀번호 변경 결과
   */
  changeAccountPassword(
    accountNo: string,
    beforeAccountPassword: string,
    afterAccountPassword: string
  ) {
    const requestBody = {
      accountNo,
      beforeAccountPassword,
      afterAccountPassword,
    };

    return this.axios.put<AccountChangePasswordResponse>(
      '/main/v1/accounts/change-pw',
      requestBody
    );
  }
}
