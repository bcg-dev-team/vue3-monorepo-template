/**
 * 차트 관련 타입 정의
 * MSW 모킹용 차트 데이터 타입들만 정의
 *
 * @note 공통 타입은 @template/types에 정의되어 있음
 */

// 차트 API 응답 데이터
// CryptoCompare API 응답 형태 참고
// https://www.rubydoc.info/gems/cryptocompare/Cryptocompare/HistoDay
export interface ChartApiData {
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
// Bar 타입 (WebSocket용)
export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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
