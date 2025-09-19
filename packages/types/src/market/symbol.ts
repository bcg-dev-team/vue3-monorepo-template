/**
 * 심볼 관련 타입 정의
 */

/**
 * 거래 심볼 인터페이스
 */
export interface TradingSymbol {
  symbol: string;
  ticker: string;
  description: string;
  exchange: string;
  type: string;
}

/**
 * 심볼 기본 정보
 */
// export interface SymbolInfo {
//   symbol: string;
//   name: string;
//   description: string;
//   exchange: string;
//   type: 'forex' | 'crypto' | 'stock' | 'commodity' | 'index';
// }

/**
 * 심볼 가격 데이터 (실시간)
 */
export interface SymbolData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp: number;
}

/**
 * 심볼 가격 히스토리
 */
// export interface SymbolPriceHistory {
//   symbol: string;
//   prices: SymbolData[];
//   timeframe: string;
//   startTime: number;
//   endTime: number;
// }

/**
 * 심볼 가격 정보 타입 (실시간 가격 데이터)
 */
export interface SymbolPrice {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

/**
 * TradingView 차트 바 데이터 (OHLCV)
 */
export interface TradingViewBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

/**
 * 차트 초기화 설정
 */
export interface ChartConfig {
  symbol: string;
  interval: string;
  container: string;
  width?: number | string;
  height?: number | string;
  theme?: 'light' | 'dark';
  locale?: string;
  debug?: boolean;
}

/**
 * 차트 심볼 정보
 */
export interface ChartSymbolInfo {
  symbol: string;
  interval: string;
  lastUpdate: number;
}

/**
 * 심볼 통계 정보
 */
// export interface SymbolStats {
//   symbol: string;
//   totalVolume: number;
//   averagePrice: number;
//   priceRange: {
//     high: number;
//     low: number;
//   };
//   volatility: number;
//   lastUpdated: number;
// }
