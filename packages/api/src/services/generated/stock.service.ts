import {
  ResponseDataOrderStockResponse,
  ResponseDataPositionStockResponse,
  ResponseDataPossessionStockResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 종목 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class StockService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 보유종목 조회
   * 종목의 보유종목을 확인할 수 있다.(홈화면)
   * @param request - request
   * @returns 보유종목 조회 결과
   */
  getPossessionStocks(request: string) {
    return this.axios.get<ResponseDataPossessionStockResponse>(
      `/main/v1/stocks/possessions`,
      {
        params: {
          request,
        }
      }
    );
  }

  /**
   * 주문잔고 조회
   * 종목의 주문잔고를 확인할 수 있다.(홈화면)
   * @param request - request
   * @returns 주문잔고 조회 결과
   */
  getPositionStocks(request: string) {
    return this.axios.get<ResponseDataPositionStockResponse>(
      `/main/v1/stocks/positions`,
      {
        params: {
          request,
        }
      }
    );
  }

  /**
   * 주문종목 조회
   * 종목의 MetaData 를 확인할 수 있다.(홈화면, 종목쪽 조회 등 쓰임)
   * @param request - request
   * @returns 주문종목 조회 결과
   */
  getOrderStocks(request: string) {
    return this.axios.get<ResponseDataOrderStockResponse>(
      `/main/v1/stocks/orders`,
      {
        params: {
          request,
        }
      }
    );
  }
}
