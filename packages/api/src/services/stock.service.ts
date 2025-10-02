import { StockPositionRequest, StockPositionResponse } from '../types/stock.types';
import { CustomAxiosInstance } from '../types';

export class StockService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  getStockPosition(requestBody: StockPositionRequest) {
    return this.axios.get<StockPositionResponse>('/stocks/positions', {
      params: requestBody,
    });
  }
}
