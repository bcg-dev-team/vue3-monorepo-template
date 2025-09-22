import {
  AccountInfoRequest,
  AccountInfoResponse,
  AccountCreateRequest,
  AccountCreateResponse,
  AccountUpdateInfo,
  AccountUpdateResponse,
  AccountChangePasswordResponse,
} from '../types/account.types';
import { AxiosInstance } from '../types/axios';

export class AccountService {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /**
   * 계좌 정보 조회
   * 회원의 계좌 정보를 조회합니다.
   * @param email - 회원 이메일 주소
   * @returns 계좌 정보 목록
   */
  getAccountInfo(email: string) {
    const params: AccountInfoRequest = {
      email,
    };

    return this.axios.get<AccountInfoResponse>('/accounts/info', { params });
  }

  /**
   * 계좌 개설
   * 회원가입 후 계좌를 개설합니다. 기존 계좌의 존재여부와 상관없이 원장서버로 요청을 보냅니다.
   * @param email - 이메일 주소
   * @param accountPassword - 계좌 비밀번호
   * @param accountAlias - 계좌 별칭 (선택사항)
   * @returns 계좌 개설 결과 (계좌번호, 계좌 시퀀스, 노출 순서 포함)
   */
  createAccount(email: string, accountPassword: string, accountAlias?: string) {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('accountPassword', accountPassword);

    if (accountAlias) {
      formData.append('accountAlias', accountAlias);
    }

    return this.axios.post<AccountCreateResponse>('/accounts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 계좌 정보 변경
   * 계좌 정보(별칭, 표시여부, 표시순번)를 변경합니다.
   * @param email - 이메일 주소
   * @param accountInfos - 변경할 계좌 정보 목록
   * @returns 계좌 정보 변경 결과
   */
  updateAccountInfo(email: string, accountInfos: AccountUpdateInfo[]) {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('accountInfos', JSON.stringify(accountInfos));

    return this.axios.put<AccountUpdateResponse>('/accounts/info', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 계좌 비밀번호 변경
   * 개설한 계좌의 비밀번호를 변경합니다.
   * @param email - 이메일 주소
   * @param accountNo - 계좌번호
   * @param beforeAccountPassword - 변경 전 비밀번호
   * @param afterAccountPassword - 변경 후 비밀번호
   * @returns 계좌 비밀번호 변경 결과
   */
  changeAccountPassword(
    email: string,
    accountNo: string,
    beforeAccountPassword: string,
    afterAccountPassword: string
  ) {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('accountNo', accountNo);
    formData.append('beforeAccountPassword', beforeAccountPassword);
    formData.append('afterAccountPassword', afterAccountPassword);

    return this.axios.put<AccountChangePasswordResponse>('/accounts/change-pw', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
