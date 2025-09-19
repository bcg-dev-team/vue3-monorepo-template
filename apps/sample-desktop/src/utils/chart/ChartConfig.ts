/**
 * 차트 관련 타입 정의
 */

/**
 * 차트 설정 타입 정의
 */
export interface ChartSettings {
  basic: {
    theme: 'redBlue' | 'greenRed';
    precision: string;
    timezone: string;
    locale?: string; // 언어 설정
  };
  symbols: {
    showSymbolName: boolean;
    showChartValues: boolean;
    showBarChangeValues: boolean;
    showIndicatorNames: boolean; // 지표 이름 (Title)
    showIndicatorArguments: boolean; // 지표 매개변수
    showIndicatorValues: boolean; // 지표 값
  };
  scales: {
    showPriceLabels: boolean;
    showGridLines: boolean;
    gridLineMode: 'both' | 'vertical' | 'horizontal';
    verticalGridColor: string;
    horizontalGridColor: string;
    showCrosshair: boolean;
    crosshairColor: string;
  };
  trading: {
    showBuySellButtons: boolean;
    instantOrderExecution: boolean;
    showOrders: boolean;
  };
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
  locale?: string;
  debug?: boolean;
  settings?: ChartSettings; // 차트 설정 (테마, 정밀도, 타임존 등)
}

/**
 * 차트 심볼 정보
 */
export interface ChartSymbolInfo {
  symbol: string;
  interval: string;
  lastUpdate: number;
}
