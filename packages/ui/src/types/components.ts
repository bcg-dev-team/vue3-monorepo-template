/**
 * UI 패키지 공통 컴포넌트 타입 정의
 */

import type { IconName } from './icons';

// BaseTable
export interface TableHeader {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
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

// BaseButton
export interface ButtonIconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}
export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'red'
  | 'blue'
  | 'pill'
  | 'light-solid'
  | 'red-solid'
  | 'blue-solid'
  | 'disabled';
export type ButtonSize = 'regular' | 'small' | 'pill' | 'small-inner';

// BaseInput
export type InputStatus = 'Static' | 'Focus' | 'Error' | 'Filled' | 'Disabled';
