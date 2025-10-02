import {
  EmailVerificationRequest,
  EmailVerificationCodeRequest,
  LoginResponse,
  MemberLoginRequest,
  UseType,
  SmsVerificationResponse,
  SmsVerificationRequest,
  SmsVerificationCodeRequest,
  SmsVerificationCodeResponse,
  EmailVerificationResponse,
  EmailVerificationCodeResponse,
  RefreshTokenResponse,
} from '../types/auth.types';
import { CustomAxiosInstance } from '../types';

export class AuthService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 회원 웹 로그인
   * 승인된 아이디를 로그인합니다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원합니다.
   * @param email - 로그인할 이메일
   * @param password - 비밀번호
   * @returns 로그인 결과 (회원 정보 및 계좌 목록 포함)
   */
  webLogin(email: string, password: string) {
    const requestBody: MemberLoginRequest = {
      email,
      password,
    };

    return this.axios.post<LoginResponse>('/main/v1/auths/web/login', requestBody);
  }

  refreshToken(expiredAccessToken: string) {
    return this.axios.post<RefreshTokenResponse>('/main/v1/auths/web/refresh', {
      expiredAccessToken,
    });
  }

  /**
   * SMS 인증 코드 발송
   * 이름과 휴대폰 번호로 SMS 인증 코드를 발송합니다. useType으로 용도를 구분합니다.
   * @param name - 사용자 이름
   * @param phoneNo - 휴대폰 번호
   * @param useType - 사용 용도 (SIGN_UP | RESET_PASSWORD | FIND_ID)
   * @returns SMS 발송 결과
   */
  sendSmsVerification(name: string, phoneNo: string, useType: UseType) {
    const requestBody: SmsVerificationRequest = {
      name,
      phoneNo,
      useType,
    };

    return this.axios.post<SmsVerificationResponse>('/main/v1/auths/sms/send', requestBody);
  }

  /**
   * SMS 인증 코드 검증
   * 발송된 SMS 인증 코드를 검증합니다. useType으로 용도를 구분합니다.
   * @param name - 사용자 이름
   * @param phoneNo - 휴대폰 번호
   * @param verificationCode - 검증할 인증 코드
   * @param useType - 사용 용도 (SIGN_UP | RESET_PASSWORD | FIND_ID)
   * @returns SMS 인증 검증 결과
   */
  verifySmsCode(name: string, phoneNo: string, verificationCode: string, useType: UseType) {
    const requestBody: SmsVerificationCodeRequest = {
      name,
      phoneNo,
      verificationCode,
      useType,
    };

    return this.axios.post<SmsVerificationCodeResponse>('/main/v1/auths/sms/verify', requestBody);
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
      useType: 'SIGN_UP',
    };

    return this.axios.post<EmailVerificationResponse>('/main/v1/auths/email/send', requestBody);
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
      useType: 'SIGN_UP',
    };

    return this.axios.post<EmailVerificationCodeResponse>(
      '/main/v1/auths/email/verify',
      requestBody
    );
  }
}
