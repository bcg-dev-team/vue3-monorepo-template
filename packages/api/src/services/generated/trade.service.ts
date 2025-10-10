import {
  ResponseDataLiquidationHistoryResponse,
  ResponseDataOrderExecutionHistoryResponse,
  ResponseDataPaymentHistoryResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 거래 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class TradeService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 주문 체결 내역 조회
   * 거래 > 거래내역 > 주문체결 조회시 사용한다.
   * @param request - request
   * @returns 주문 체결 내역 조회 결과
   */
  getTradeOrdersHistory(request: string) {
    return this.axios.get<ResponseDataOrderExecutionHistoryResponse>(
      `/main/v1/trades`,
      {
        params: {
          request,
        }
      }
    );
  }

  /**
   * 결제내역 조회
   * 거래 > 거래내역 > 결제내역 조회시 사용한다.
   * @param request - request
   * @returns 결제내역 조회 결과
   */
  getPaymentHistory(request: string) {
    return this.axios.get<ResponseDataPaymentHistoryResponse>(
      `/main/v1/trades/payments`,
      {
        params: {
          request,
        }
      }
    );
  }

  /**
   * 청산손익 조회
   * 거래 > 거래내역 > 청산손익 조회시 사용한다.
   * @param request - request
   * @returns 청산손익 조회 결과
   */
  getLiquidationHistory(request: string) {
    return this.axios.get<ResponseDataLiquidationHistoryResponse>(
      `/main/v1/trades/liquidation/profit-loss`,
      {
        params: {
          request,
        }
      }
    );
  }
}
