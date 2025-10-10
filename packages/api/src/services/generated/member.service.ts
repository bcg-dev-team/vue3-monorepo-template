import {
  MemberApproveRequest,
  MemberFindIdRequest,
  MemberPasswordChangeRequest,
  ResponseDataMemberFindIdResponse,
  ResponseDataMemberJoinResponse,
  ResponseDataObject,
  ResponseDataString,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 멤버 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class MemberService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 회원승인(추후 BO로 이동)
   * 회원가입된 아이디의 승인한다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원한다.
   * @param email - 이메일
   * @returns 회원승인(추후 BO로 이동) 결과
   */
  approve(email: string, request: MemberApproveRequest) {
    return this.axios.post<ResponseDataString>(
      `/main/v1/members/${email}/approve`,
      request
    );
  }

  /**
   * 비밀번호 변경
   * 인증이 완료된 사용자의 비밀번호를 새로운 비밀번호로 변경한다. 이메일 인증이 완료되지 않은 경우 오류를 반환한다.
   * @returns 비밀번호 변경 결과
   */
  changePassword(request: MemberPasswordChangeRequest) {
    return this.axios.post<ResponseDataObject>(
      `/main/v1/members/password/change`,
      request
    );
  }

  /**
   * 개인회원 가입
   * 새로운 개인회원을 등록한다.

필수 파일:
- idCard: 신분증 (필수)

선택 파일:
- additionalIdDocument: 주민등록초본 or 관공서 납부영수증 (선택사항)
	 - swagger 내부에서 테스트 시 파일이 없다면, Send empty value 를 해제하고 테스트해야 한다.

   * @returns 개인회원 가입 결과
   */
  joinIndividual() {
    return this.axios.post<ResponseDataMemberJoinResponse>(
      `/main/v1/members/join/individual`
    );
  }

  /**
   * 법인회원 가입
   * 새로운 법인회원을 등록한다.

필수 파일:
- businessRegistration: 사업자등록증명원 (필수)

- corporateRepresentative: 법인 대표 초본 (필수)

- billPaymentCorporate: 법인명 공과금 납부서 (필수)

- shareholderRegister: 주주 명부 (필수)

- corporateRepresentativePassport: 법인대표 여권 사본 (필수)

선택 파일:
- additionalCorporateRepresentativePassport: 다른 법인 대표 여권 사본 (선택사항)
	 - swagger 내부에서 테스트 시 파일이 없다면, Send empty value 를 해제하고 테스트해야 한다.

   * @returns 법인회원 가입 결과
   */
  joinCorporate() {
    return this.axios.post<ResponseDataMemberJoinResponse>(
      `/main/v1/members/join/corporate`
    );
  }

  /**
   * 아이디 찾기
   * SMS 인증이 완료된 사용자의 마스킹된 이메일을 반환한다. SMS 인증이 완료되지 않은 경우 오류를 반환한다.
   * @returns 아이디 찾기 결과
   */
  findId(request: MemberFindIdRequest) {
    return this.axios.post<ResponseDataMemberFindIdResponse>(
      `/main/v1/members/find-id`,
      request
    );
  }
}
