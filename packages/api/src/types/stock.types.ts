import { ApiSuccessResponse } from './api.types';

export interface StockPositionRequest {
  accountNo: string;
  stockCd: string;
  nextKey: number;
}

export interface StockPositionSymbol {
  stockCd: string;
  tradeCurrencyCd: string;
  positionCd: string;
  purchaseDate: string;
  accountBookQuantity: number;
  liquidationPossibleQuantity: number;
  accountBookPrice: number;
  currentPrice: number;
  assessmentProfitLoss: number;
  stockGroupCd: string;
  positionNo: string;
}

export interface StockPositionData {
  hasNext: boolean;
  nextKey: number;
  symbols: StockPositionSymbol[];
}

export interface StockPositionResponse extends ApiSuccessResponse<StockPositionData> {}
