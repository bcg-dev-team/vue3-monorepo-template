import {
  MemberType,
  UseType,
  MemberApprovalRequest,
  MemberApprovalResponse,
  MemberLoginRequest,
  LoginResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeResponse,
  IndividualMemberJoinRequest,
  IndividualMemberJoinResponse,
  CorporateMemberJoinRequest,
  CorporateMemberJoinResponse,
  FindIdRequest,
  FindIdResponse,
  SmsVerificationRequest,
  SmsVerificationResponse,
  SmsVerificationCodeRequest,
  SmsVerificationCodeResponse,
} from '../types/user.types';
import { CustomAxiosInstance } from '../types';

export class UserService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
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

    return this.axios.post<MemberApprovalResponse>(`/members/${email}/approve`, requestBody); // 제네릭 타입 추가
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

    return this.axios.post<LoginResponse>('/auths/web/login', requestBody);
  }

  /**
   * 아이디 찾기
   * SMS 인증이 완료된 사용자의 마스킹된 이메일을 반환합니다. SMS 인증이 완료되지 않은 경우 오류를 반환합니다.
   * @param name - 사용자 이름
   * @param phoneNo - 휴대폰 번호
   * @returns 마스킹된 이메일 정보
   */
  findId(name: string, phoneNo: string) {
    const requestBody: FindIdRequest = {
      name,
      phoneNo,
    };

    return this.axios.post<FindIdResponse>('/members/find-id', requestBody);
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

    return this.axios.post<SmsVerificationResponse>('/members/sms/send', requestBody);
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

    return this.axios.post<SmsVerificationCodeResponse>('/members/sms/verify', requestBody);
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

    return this.axios.post<EmailVerificationResponse>('/members/email/send', requestBody);
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

    return this.axios.post<EmailVerificationCodeResponse>('/members/email/verify', requestBody);
  }

  /**
   * 개인회원 가입
   * 새로운 개인회원을 등록합니다. 개인정보와 신분증, 추가 신분증명서(선택사항)를 업로드하여 가입을 진행합니다.
   * @param individualMember - 개인회원 가입 요청 데이터 (개인정보 및 신분증 파일)
   * @returns 개인회원 가입 결과 (생성된 회원 ID 포함)
   */
  joinIndividualMember(individualMember: IndividualMemberJoinRequest) {
    const formData = new FormData();

    // 개인정보 객체를 JSON으로 직렬화하여 individualMember 키로 추가
    const individualMemberData = {
      ci: individualMember.ci,
      email: individualMember.email,
      password: individualMember.password,
      name: individualMember.name,
      phoneNo: individualMember.phoneNo,
      birth: individualMember.birth,
      firstNameEn: individualMember.firstNameEn,
      lastNameEn: individualMember.lastNameEn,
      address: individualMember.address,
      addressEn: individualMember.addressEn,
      detailAddress: individualMember.detailAddress,
      detailAddressEn: individualMember.detailAddressEn,
      zipCode: individualMember.zipCode,
    };

    formData.append('individualMember', JSON.stringify(individualMemberData));

    // 필수 파일: 신분증
    formData.append('idCard', individualMember.idCard);

    // 선택 파일: 추가 신분증명서
    if (individualMember.additionalIdDocument) {
      formData.append('additionalIdDocument', individualMember.additionalIdDocument);
    }

    return this.axios.post<IndividualMemberJoinResponse>('/members/join/individual', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 법인회원 가입
   * 새로운 법인회원을 등록합니다. 법인정보와 필수 서류들을 업로드하여 가입을 진행합니다.
   * @param corporateMember - 법인회원 가입 요청 데이터 (법인정보 및 필수 서류 파일들)
   * @returns 법인회원 가입 결과 (생성된 회원 ID 포함)
   */
  joinCorporateMember(corporateMember: CorporateMemberJoinRequest) {
    const formData = new FormData();

    // 법인정보 객체를 JSON으로 직렬화하여 corporateMember 키로 추가
    const corporateMemberData = {
      ci: corporateMember.ci,
      email: corporateMember.email,
      password: corporateMember.password,
      name: corporateMember.name,
      phoneNo: corporateMember.phoneNo,
      companyName: corporateMember.companyName,
      businessNumber: corporateMember.businessNumber,
      address: corporateMember.address,
      addressEn: corporateMember.addressEn,
      detailAddress: corporateMember.detailAddress,
      detailAddressEn: corporateMember.detailAddressEn,
      zipCode: corporateMember.zipCode,
      representativeFirstName: corporateMember.representativeFirstName,
      representativeLastName: corporateMember.representativeLastName,
      representativeBirth: corporateMember.representativeBirth,
    };

    formData.append('corporateMember', JSON.stringify(corporateMemberData));

    // 필수 파일들 추가
    formData.append('businessRegistration', corporateMember.businessRegistration);
    formData.append('corporateRepresentative', corporateMember.corporateRepresentative);
    formData.append('billPaymentCorporate', corporateMember.billPaymentCorporate);
    formData.append('shareholderRegister', corporateMember.shareholderRegister);
    formData.append(
      'corporateRepresentativePassport',
      corporateMember.corporateRepresentativePassport
    );

    if (corporateMember.additionalCorporateRepresentativePassport) {
      corporateMember.additionalCorporateRepresentativePassport.forEach((file) => {
        formData.append('additionalCorporateRepresentativePassport', file);
      });
    }

    return this.axios.post<CorporateMemberJoinResponse>('/members/join/corporate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
