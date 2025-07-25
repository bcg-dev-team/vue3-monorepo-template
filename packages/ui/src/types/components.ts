/**
 * UI 패키지 공통 컴포넌트 타입 정의
 *
 * 분리 기준:
 * 1. 도메인 공통성: 여러 컴포넌트에서 실제로 사용되는 타입
 * 2. 복잡성: 3개 이상 + 의미적으로 복잡한 타입
 * 3. 유지보수성: 변경 가능성이 높은 타입
 */

import type { IconName } from './icons';

// 공통 타입들 (여러 컴포넌트에서 사용)
export type TextAlign = 'left' | 'center' | 'right';
export type ComponentSize = 'sm' | 'md' | 'lg';

// IconName re-export
export type { IconName };

// BaseTable
export interface TableHeader {
  key: string;
  title: string;
  width?: string;
  align?: TextAlign;
  sortable?: boolean;
}
export interface TableRow {
  id: string | number;
  [key: string]: any;
}

// BaseTabs
export interface TabItem {
  value: string | number;
  label: string;
  disabled?: boolean;
  content?: string;
}

// BaseChip
export type ChipVariant = 'surface' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
