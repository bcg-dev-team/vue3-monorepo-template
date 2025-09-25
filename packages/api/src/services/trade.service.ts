import {
  TradeOrderListRequest,
  TradeOrderListResponse,
  TradePaymentsHistoryRequest,
  TradePaymentsHistoryResponse,
  TradeProfitAndLossRequest,
  TradeProfitAndLossResponse,
} from '../types/trade.types';
import { CustomAxiosInstance } from '../types';

const BASE_URL = 'http://172.25.1.24:8080';

export class TradeService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  getTradeOrderList(requestBody: TradeOrderListRequest) {
    return this.axios.get<TradeOrderListResponse>(`${BASE_URL}/trades`, {
      params: requestBody,
    });
  }

  getTradePaymentsHistory(requestBody: TradePaymentsHistoryRequest) {
    return this.axios.get<TradePaymentsHistoryResponse>(`${BASE_URL}/trades/payments`, {
      params: requestBody,
    });
  }

  getTradeProfitAndLoss(requestBody: TradeProfitAndLossRequest) {
    return this.axios.get<TradeProfitAndLossResponse>(
      `${BASE_URL}/trades/liquidation/profit-loss`,
      {
        params: requestBody,
      }
    );
  }
}
