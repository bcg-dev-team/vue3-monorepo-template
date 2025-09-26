/**
 * 차트 관련 앱 타입 정의
 * UI 특화된 설정이므로 앱 레벨에서 정의
 */
import type { ChartLayout } from '@template/types';
import type { IconName } from '@template/ui';

/**
 * 차트 레이아웃 UI 옵션 타입 (아이콘을 포함한 UI 특화 버전)
 */
export interface ChartLayoutUIOption {
  value: ChartLayout;
  icon: IconName;
  label?: string;
}

/**
 * 차트 레이아웃 UI 옵션
 */
export const CHART_LAYOUT_OPTIONS: ChartLayoutUIOption[] = [
  { value: '1x1', icon: 'cert', label: '1x1' },
  { value: '2x2', icon: 'cert', label: '2x2' },
  { value: '3x3', icon: 'cert', label: '3x3' },
  { value: '4x4', icon: 'cert', label: '4x4' },
] as const;
