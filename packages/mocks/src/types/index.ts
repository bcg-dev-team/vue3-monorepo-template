/**
 * 차트 모킹에 필요한 기본 타입들
 */

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ChartApiResponse {
  success: boolean;
  data: ChartData[];
  message?: string;
}
