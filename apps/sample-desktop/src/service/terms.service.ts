import { TermsListResponse, TermsDetailResponse, TermsType } from '../types/api/terms.type';
import { AxiosInstance } from '@template/api';

export class TermsService {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 약관 목록 조회
   * 약관 목록을 조회합니다.
   * @returns 필수 약관과 선택 약관 목록
   */
  getTermsList() {
    return this.axios.get<TermsListResponse>('/api/v1/terms');
  }

  /**
   * 약관 상세 조회
   * 약관 내용을 조회합니다.
   * @param termsName - 조회할 약관명 (SERVICE_USAGE_TERMS, PERSONAL_INFO_COLLECTION 등)
   * @returns 약관 상세 내용 (시행일자 및 상세 내용)
   */
  getTermsDetail(termsName: TermsType) {
    return this.axios.get<TermsDetailResponse>(`/api/v1/terms/${termsName}`);
  }
}
