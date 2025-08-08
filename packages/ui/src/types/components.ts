/**
 * UI 패키지 공통 컴포넌트 타입 정의
 *
 * 분리 기준:
 * 1. 도메인 공통성: 여러 컴포넌트에서 실제로 사용되는 타입
 * 2. 복잡성: 3개 이상 + 의미적으로 복잡한 타입
 * 3. 유지보수성: 변경 가능성이 높은 타입
 */

import type { IconName } from './icons';

/**
 * [사용법]
 * - 일부 사이즈들만 쓰고 싶은 경우: Extract를 사용
 *   e.g. type ButtonSize = Extract<ComponentSize, 'lg' | 'sm'>;
 *
 * - 확장 사이즈를 함께 쓰고 싶은 경우: 유니온으로 결합
 *   e.g. type IconButtonSize = ComponentSize | ExtendedSize;
 *
 * - 특정 컴포넌트 전용 별칭으로 정의
 *   e.g. type TabsSize = Extract<ComponentSize, 'md' | 'lg'>;
 */

/**
 * UI 컴포넌트 기본 사이즈 타입
 * - lg: large (48px)
 * - md: medium (40px)
 * - sm: small (32px)
 */
export type ComponentSize = 'lg' | 'md' | 'sm';

/**
 * 확장 사이즈 타입 (필요시 확장)
 * - xl: extra large
 * - xxl: extra extra large
 * - xs: extra small
 * - xxs: extra extra small
 */
export type ExtendedSize = 'xl' | 'xxl' | 'xs' | 'xxs';

// 공통 타입들 (여러 컴포넌트에서 사용)
export type TextAlign = 'left' | 'center' | 'right';

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
export type ChipVariant = 'grey' | 'red' | 'green' | 'blue' | 'yellow' | 'purple';

// BaseChip 접근성 관련 타입
export type ChipRole = 'button';

// BaseChip 확장 타입
export interface ChipData {
  label: string;
  variant: ChipVariant;
  draggable?: boolean;
  icon?: string;
  avatar?: string;
  role?: ChipRole;
  tabindex?: number;
}
