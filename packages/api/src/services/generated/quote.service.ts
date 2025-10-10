import {
  ResponseDataResponseListOrderBookResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 시세 정보 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class QuoteService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 5단계 호가 조회
   * 종목의 5단계 호가 정보를 조회합니다.
   * @param stockCode - 조회할 종목코드
   * @returns 5단계 호가 조회 결과
   */
  getOrderBook(stockCode: string) {
    return this.axios.get<ResponseDataResponseListOrderBookResponse>(
      `/main/v1/quote/${stockCode}/order-book`
    );
  }
}
