import { ApiSuccessResponse } from './api.types';
import { AccountInfo } from './account.types';
import { MemberType } from './user.types';

export type UseType = 'SIGN_UP' | 'RESET_PASSWORD' | 'FIND_ID';

export interface MemberLoginRequest {
  email: string;
  password: string;
}

export interface MemberInfo {
  memberId: number;
  email: string;
  memberType: MemberType;
  accountList: AccountInfo[];
}

export interface LoginResponse
  extends ApiSuccessResponse<{
    contents: MemberInfo[];
    tokenInfo: {
      accessToken: string;
    };
  }> {}

export interface RefreshTokenResponse
  extends ApiSuccessResponse<{
    accessToken: string;
  }> {}

export interface EmailVerificationRequest {
  email: string;
  useType: UseType;
}

export interface EmailVerificationResponse extends ApiSuccessResponse<string> {}

export interface EmailVerificationCodeRequest {
  email: string;
  verificationCode: string;
  useType: UseType;
}

export interface EmailVerificationCodeResponse extends ApiSuccessResponse<string> {}

// SMS 인증 관련 타입
export interface SmsVerificationRequest {
  name: string;
  phoneNo: string;
  useType: UseType;
}

export interface SmsVerificationResponse extends ApiSuccessResponse<{}> {}

export interface SmsVerificationCodeRequest {
  name: string;
  phoneNo: string;
  verificationCode: string;
  useType: UseType;
}

export interface SmsVerificationCodeResponse extends ApiSuccessResponse<{}> {}
