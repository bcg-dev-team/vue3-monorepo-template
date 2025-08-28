import {
  MemberType,
  MemberApprovalRequest,
  MemberLoginRequest,
  LoginResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeResponse,
} from '../types/user.types';
import { AxiosInstance } from '@template/api';

export class UserService {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 회원승인 (추후 BO로 이동)
   * 회원가입된 아이디의 승인을 처리합니다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원합니다.
   * @param email - 승인할 회원의 이메일
   * @param memberType - 회원 타입 (INDIVIDUAL | CORPORATE)
   * @param approvedAdminUser - 승인하는 관리자 사용자 이메일
   * @returns 승인 결과
   */
  approveMember(email: string, memberType: MemberType, approvedAdminUser: string) {
    const requestBody: MemberApprovalRequest = {
      memberType,
      approvedAdminUser,
    };

    return this.axios.post(`/members/${email}/approve`, requestBody);
  }

  /**
   * 회원 로그인
   * 승인된 아이디를 로그인합니다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원합니다.
   * @param memberType - 회원 타입 (INDIVIDUAL | CORPORATE)
   * @param email - 로그인할 이메일
   * @param password - 비밀번호
   * @returns 로그인 결과 (회원 정보 및 계좌 목록 포함)
   */
  login(memberType: MemberType, email: string, password: string) {
    const requestBody: MemberLoginRequest = {
      memberType,
      email,
      password,
    };

    return this.axios.post<LoginResponse>('/members/login', requestBody);
  }

  /**
   * 이메일 인증 요청
   * 회원가입을 위한 이메일 인증 메일을 발송합니다. 동일 이메일로 유효한 미사용 토큰이 있으면 모두 만료 처리 후 새 토큰을 발급합니다.
   * @param email - 인증 메일을 발송할 이메일 주소
   * @returns 이메일 인증 요청 결과
   */
  requestEmailVerification(email: string) {
    const requestBody: EmailVerificationRequest = {
      email,
    };

    return this.axios.post<EmailVerificationResponse>('/members/email', requestBody);
  }

  /**
   * 이메일 인증 코드 검증
   * 회원가입용 발송된 인증 코드를 검증합니다. 규칙에 정의되지 않거나, 만료되었거나, 일치하지 않으면 오류를 반환합니다.
   * @param email - 인증 코드를 받은 이메일 주소
   * @param verificationCode - 검증할 인증 코드
   * @returns 인증 코드 검증 결과
   */
  verifyEmailCode(email: string, verificationCode: string) {
    const requestBody: EmailVerificationCodeRequest = {
      email,
      verificationCode,
    };

    return this.axios.post<EmailVerificationCodeResponse>('/members/email/verify', requestBody);
  }
}
