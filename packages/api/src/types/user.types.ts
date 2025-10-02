// 회원 관련 타입들을 별도 파일로 분리
import { ApiSuccessResponse } from './api.types';

export type MemberType = 'INDIVIDUAL' | 'CORPORATE';

export interface MemberApprovalRequest {
  memberType: MemberType;
  approvedAdminUser: string;
}

export interface MemberApprovalResponse extends ApiSuccessResponse<string> {}

// 개인회원 가입 관련 타입
export interface PhoneNumber {
  value: string;
}

export interface IndividualMemberJoinRequest {
  // 개인정보
  ci: string;
  email: string;
  password: string;
  name: string;
  phoneNo: string;
  birth: string;
  firstNameEn: string;
  lastNameEn: string;
  address: string;
  addressEn: string;
  detailAddress: string;
  detailAddressEn: string;
  zipCode: string;

  // 파일 업로드
  idCard: File;
  additionalIdDocument?: File;
}

export interface IndividualMemberJoinResponse extends ApiSuccessResponse<{ id: number }> {}

// 법인회원 가입 관련 타입
export interface CorporateMemberJoinRequest {
  // 법인정보
  ci: string;
  email: string;
  password: string;
  name: string;
  phoneNo: string;
  companyName: string;
  businessNumber: string;
  address: string;
  addressEn: string;
  detailAddress: string;
  detailAddressEn: string;
  zipCode: string;
  representativeFirstName: string;
  representativeLastName: string;
  representativeBirth: string;

  // 파일 업로드 (모두 필수)
  businessRegistration: File;
  corporateRepresentative: File;
  billPaymentCorporate: File;
  shareholderRegister: File;
  corporateRepresentativePassport: File;

  // 선택 파일: 추가 법인대표 여권 사본 (배열로 여러 파일 업로드 가능)
  additionalCorporateRepresentativePassport?: File[];
}

export interface CorporateMemberJoinResponse extends ApiSuccessResponse<{ id: number }> {}

// 아이디 찾기 관련 타입
export interface FindIdRequest {
  name: string;
  phoneNo: string;
}

export interface FindIdResponse extends ApiSuccessResponse<{ email: string }> {}
