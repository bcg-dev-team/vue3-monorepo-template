import {
  TradeOrderListRequest,
  TradeOrderListResponse,
  TradePaymentsHistoryRequest,
  TradePaymentsHistoryResponse,
  TradeProfitAndLossRequest,
  TradeProfitAndLossResponse,
} from '../types/trade.types';
import { CustomAxiosInstance } from '../types';

export class TradeService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  getTradeOrderList(requestBody: TradeOrderListRequest) {
    return this.axios.get<TradeOrderListResponse>('/main/v1/trades', {
      params: requestBody,
    });
  }

  getTradePaymentsHistory(requestBody: TradePaymentsHistoryRequest) {
    return this.axios.get<TradePaymentsHistoryResponse>('/main/v1/trades/payments', {
      params: requestBody,
    });
  }

  getTradeProfitAndLoss(requestBody: TradeProfitAndLossRequest) {
    return this.axios.get<TradeProfitAndLossResponse>('/main/v1/trades/liquidation/profit-loss', {
      params: requestBody,
    });
  }
}
