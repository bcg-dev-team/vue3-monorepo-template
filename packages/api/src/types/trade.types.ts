import { ApiSuccessResponse } from './api.types';

export interface TradeOrderListRequest {
  accountNo: string;
  accountPassword: string;
  orderStartDate: string;
  orderEndDate: string;
  orderCd: string;
  positionCd: string;
  nextKey: number;
}

export interface OrderSummary {
  tradeCurrencyCd: string;
  longExecutionQuantity: number;
  longExecutionPrice: number;
  reShortExecutionQuantity: number;
  reShortExecutionPrice: number;
  shortExecutionQuantity: number;
  shortExecutionPrice: number;
  reLongExecutionQuantity: number;
  reLongExecutionPrice: number;
}

export interface OrderDetail {
  orderDate: string;
  orderNo: string;
  executionDate: string;
  executionNo: string;
  stockCd: string;
  positionCd: string;
  orderTypeCd: string;
  sideCd: string;
  orderQuantity: number;
  barrierPrice: number;
  orderPrice: number;
  profitRealizationBarrierPrice: number;
  lossCutBarrierPrice: number;
  executionQuantity: number;
  executionPrice: number;
  orderBalance: number;
  orderStatusCd: string;
  receptionDate: string;
  rejectReason: string;
}

export interface TradeOrderListData {
  hasNext: boolean;
  nextKey: number;
  summary: OrderSummary[];
  details: OrderDetail[];
}

export interface TradeOrderListResponse extends ApiSuccessResponse<TradeOrderListData> {}

export interface TradePaymentsHistoryRequest {
  accountNo: string;
  accountPassword: string;
  orderStartDate: string;
  orderEndDate: string;
  nextKey: number;
}

export interface TradePaymentsHistorySummary {
  tradeCurrencyCd: string;
  longExecutionQuantity: number;
  longExecutionPrice: number;
  reShortExecutionQuantity: number;
  reShortExecutionPrice: number;
  shortExecutionQuantity: number;
  shortExecutionPrice: number;
  reLongExecutionQuantity: number;
  reLongExecutionPrice: number;
}
export interface TradePaymentsHistoryDetail {
  orderDate: string;
  orderNo: string;
  executionDate: string;
  executionNo: string;
  stockCd: string;
  positionCd: string;
  orderTypeCd: string;
  sideCd: string;
  orderQuantity: number;
  barrierPrice: number;
  orderPrice: number;
  profitRealizationBarrierPrice: number;
  lossCutBarrierPrice: number;
  executionQuantity: number;
  executionPrice: number;
  orderBalance: number;
  orderStatusCd: string;
  receptionDate: string;
  rejectReason: string;
}

export interface TradePaymentsHistoryData {
  hasNext: boolean;
  nextKey: string;
  details: TradePaymentsHistoryDetail[];
}

export interface TradePaymentsHistoryResponse
  extends ApiSuccessResponse<TradePaymentsHistoryData> {}

export interface TradeProfitAndLossRequest {
  accountNo: string;
  accountPassword: string;
  orderStartDate: string;
  orderEndDate: string;
  nextKey: number;
}

export interface TradeProfitAndLossSummary {
  longAcquisitionPrice: number;
  longLiquidationPrice: number;
  longLiquidationProfitLoss: number;
  longLiquidationProfitPercent: number;
  longSwapCharge: number;
  longExecutionCharge: number;
  longLiquidationNetProfitLoss: number;
  longLiquidationNetProfitPercent: number;
  shortAcquisitionPrice: number;
  shortLiquidationPrice: number;
  shortLiquidationProfitLoss: number;
  shortLiquidationProfitPercent: number;
  shortSwapCharge: number;
  shortExecutionCharge: number;
  shortLiquidationNetProfitLoss: number;
  shortLiquidationNetProfitPercent: number;
  nextKey: number;
}

export interface TradeProfitAndLossDetail {
  liquidationDate: string;
  symbolCd: string;
  orderCd: string;
  purchasePrice: number;
  liquidationPrice: number;
  liquidationQuantity: number;
  liquidationProfitLoss: number;
  swapCharge: number;
  tradeCharge: number;
  liquidationNetProfitLoss: number;
  purchaseDate: string;
}

export interface TradeProfitAndLossData {
  hasNext: boolean;
  nextKey: number;
  summary: TradeProfitAndLossSummary;
  details: TradeProfitAndLossDetail[];
}

export interface TradeProfitAndLossResponse extends ApiSuccessResponse<TradeProfitAndLossData> {}
