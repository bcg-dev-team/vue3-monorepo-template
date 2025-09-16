/**
 * 차트 관련 타입 정의
 */

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
