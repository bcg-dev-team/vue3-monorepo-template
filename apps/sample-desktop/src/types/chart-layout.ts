/**
 * 차트 레이아웃 UI 타입 정의
 * 레이아웃 선택 UI 컴포넌트에서 사용하는 타입들
 */
import type { ChartLayout } from '@template/types';
import type { IconName } from '@template/ui';

/**
 * 차트 레이아웃 UI 옵션 타입
 */
export interface ChartLayoutOption {
  value: ChartLayout;
  icon: IconName;
  label?: string;
}

/**
 * 차트 레이아웃 UI 옵션
 */
export const CHART_LAYOUT_OPTIONS: ChartLayoutOption[] = [
  { value: '1x1', icon: 'cert', label: '1x1' },
  { value: '2x2', icon: 'cert', label: '2x2' },
  { value: '3x3', icon: 'cert', label: '3x3' },
  { value: '4x4', icon: 'cert', label: '4x4' },
] as const;
