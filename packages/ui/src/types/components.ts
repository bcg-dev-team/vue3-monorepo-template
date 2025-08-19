/**
 * UI 패키지 공통 컴포넌트 타입 정의
 *
 * 분리 기준:
 * 1. 도메인 공통성: 여러 컴포넌트에서 실제로 사용되는 타입
 * 2. 복잡성: 3개 이상 + 의미적으로 복잡한 타입
 * 3. 유지보수성: 변경 가능성이 높은 타입
 */

import type { IconName } from './icons';
import type { Component } from 'vue';

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

// BaseButton
export type ButtonVariant = 'contained' | 'outlined';

/**
 * 버튼 아이콘 props 타입 (BaseButton, BasePopup 등에서 공통 사용)
 */
export interface ButtonIconProps {
  name: IconName;
  size?: ComponentSize;
  color?: string;
}

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
/**
 * BaseTabs 컴포넌트에서 사용하는 탭 아이템 인터페이스
 */
export interface TabItem {
  key: string;                // 시멘틱한 고유 식별자
  label: string;              // 탭에 표시될 텍스트
  component?: Component;      // 탭 패널에 표시될 컴포넌트
  icon?: IconName;           // 아이콘 (선택사항)
  disabled?: boolean;        // 비활성화 여부 (선택사항)
}

/**
 * BaseTabs 컴포넌트에서 사용하는 탭 스타일 variant 타입
 */
export type TabVariant = 'underline' | 'inner';

/**
 * BaseTabs 전용 사이즈 타입 별칭
 * - 현재 BaseTabs에서는 lg, md 두 사이즈만 사용합니다.
 */
export type TabsSize = Extract<ComponentSize, 'lg' | 'md'>;

// BaseChip
export type ChipVariant = 'grey' | 'red' | 'green' | 'blue' | 'yellow' | 'purple';

// BaseChip 확장 타입
export interface ChipData {
  label: string;
  variant: ChipVariant;
  icon?: string;
}

// BaseRadioGroup
/**
 * BaseRadioGroup 컴포넌트에서 사용하는 라디오 옵션 인터페이스
 */
export interface RadioOption<T = any> {
  value: T;                   // 옵션의 값
  label: string;              // 옵션에 표시될 텍스트
  icon?: IconName;           // 아이콘 (선택사항)
  disabled?: boolean;        // 비활성화 여부 (선택사항)
}

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
  variant?: ButtonVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ButtonIconProps;
  rightIcon?: ButtonIconProps;
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
// BaseSkeleton
export interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'shimmer';
  className?: string;
}

// 로딩 상태를 포함하는 컴포넌트 공통 타입
export interface LoadingComponentProps {
  isLoading?: boolean;
}

// 테이블 스켈레톤 전용 타입
export interface TableSkeletonProps extends LoadingComponentProps {
  skeletonRows?: number;
}

// 카드 스켈레톤 전용 타입
export interface CardSkeletonProps extends LoadingComponentProps {
  skeleton?: {
    showImage?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    showActions?: boolean;
  };
}
