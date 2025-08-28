// 회원 관련 타입들을 별도 파일로 분리
export type MemberType = 'INDIVIDUAL' | 'CORPORATE';

export interface MemberApprovalRequest {
  memberType: MemberType;
  approvedAdminUser: string;
}

export interface MemberLoginRequest {
  memberType: MemberType;
  email: string;
  password: string;
}

export interface AccountInfo {
  accountNo: string;
  accountSequence: string;
  accountGrade: string;
  accountAlias: string;
  visible: string;
  visibleSequence: string;
}

export interface MemberInfo {
  memberId: number;
  email: string;
  memberType: MemberType;
  accountList: AccountInfo[];
}

export interface LoginResponse {
  status: string;
  code: number;
  data: {
    contents: MemberInfo[];
  };
}

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  status: string;
  code: number;
  data: string;
}

export interface EmailVerificationCodeRequest {
  email: string;
  verificationCode: string;
}

export interface EmailVerificationCodeResponse {
  status: string;
  code: number;
  data: string;
}
