// 약관 타입 정의
import { ApiSuccessResponse } from './api.types';

export type TermsType =
  | 'SERVICE_USAGE_TERMS'
  | 'PERSONAL_INFO_COLLECTION'
  | 'LOCATION_BASED_SERVICE_TERMS'
  | 'PERSONAL_INFO_USAGE'
  | 'UNIQUE_ID_PROCESSING'
  | 'PERSONAL_INFO_THIRD_PARTY'
  | 'ELECTRONIC_FINANCE_TERMS'
  | 'MARKETING_NOTIFICATION'
  | 'TRADING_PRECAUTIONS_CONFIRM';

// 약관 목록 응답 타입
export interface TermsListResponse
  extends ApiSuccessResponse<{
    required: TermsType[];
    optional: TermsType[];
  }> {}

// 약관 상세 정보 타입
export interface TermsDetail {
  effectiveDate: string;
  detail: string;
}

// 약관 상세 조회 응답 타입
export interface TermsDetailResponse
  extends ApiSuccessResponse<{
    contents: TermsDetail[];
  }> {}
