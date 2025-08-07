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
export type ChipVariant = 'surface' | 'primary';

// BasePopup
export type PopupSize = 'sm' | 'md' | 'lg' | 'xl';
export type PopupVariant = 'default' | 'confirm' | 'alert';
export type AlertVariant = 'success' | 'info' | 'warning' | 'error';

export interface PopupState {
  isOpen: boolean;
  title?: string;
  content?: string;
  description?: string;
  data?: unknown;
}

export interface PopupAction {
  label: string;
  variant?: 'primary' | 'outline' | 'red' | 'blue' | 'pill' | 'light-solid' | 'red-solid' | 'blue-solid' | 'green-solid' | 'cancel-solid' | 'disabled';
  size?: 'regular' | 'small' | 'pill' | 'small-inner';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: {
    name: IconName;
    size?: ComponentSize | 'xl';
    color?: string;
  };
  rightIcon?: {
    name: IconName;
    size?: ComponentSize | 'xl';
    color?: string;
  };
}

export interface PopupConfig {
  size?: PopupSize;
  variant?: PopupVariant;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  actions?: PopupAction[];
  alertVariant?: AlertVariant;
}
