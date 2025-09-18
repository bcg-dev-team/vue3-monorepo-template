/**
 * 차트 관련 타입 정의
 * MSW 모킹에서 사용하는 차트 데이터 타입들
 */

// TradingView 차트 바 데이터
export interface TradingViewBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// API 응답 데이터 (CryptoCompare)
export interface CryptoCompareApiData {
  Response?: string;
  Message?: string;
  HasWarning?: boolean;
  Type?: number;
  RateLimit?: Record<string, any>;
  TimeTo?: number;
  TimeFrom?: number;
  FirstValueInArray?: boolean;
  ConversionType?: {
    type: string;
    conversionSymbol: string;
  };
  Data: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volumefrom?: number;
    volumeto?: number;
  }>;
}

// WebSocket 메시지 타입
export interface WebSocketMessage {
  type: 'subscription_success' | 'unsubscription_success' | 'price_update';
  symbol: string;
  timestamp: number;
  price?: number;
  high?: number;
  low?: number;
  volume?: number;
}

// 차트 설정 타입
export interface ChartConfig {
  symbol: string;
  resolution: string;
  limit: number;
  basePrice?: number;
}

// Bar 타입 (WebSocket용)
export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// 거래 심볼 타입
export interface TradingSymbol {
  symbol: string;
  ticker: string;
  description: string;
  exchange: string;
  type: string;
}

// 심볼 가격 정보 타입
export interface SymbolPrice {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

// 주문 데이터 타입
export interface OrderData {
  id: number;
  symbol: string;
  type: 'Buy' | 'Sell';
  price: number;
  quantity: number;
  status: 'Open' | 'Closed' | 'Pending' | 'Cancelled';
  time: string;
  createdAt: number;
}
