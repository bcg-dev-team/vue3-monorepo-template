/**
 * Modal 컴포넌트 관련 타입 정의
 */

import type { ModalSize, ModalVariant, AlertVariant, ModalAction } from '../../types/components';

/**
 * Modal 컴포넌트 Props
 */
export interface ModalProps {
  /**
   * 모달 열림 상태
   */
  isOpen: boolean;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 모달 크기
   */
  size?: ModalSize;
  /**
   * 모달 타입
   */
  variant?: ModalVariant;
  /**
   * 알림 타입 (variant가 'alert'일 때만 사용)
   */
  alertVariant?: AlertVariant;
  /**
   * 오버레이 클릭 시 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키 클릭 시 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
  /**
   * 모달 액션 버튼들
   */
  actions?: ModalAction[];
  /**
   * 취소 버튼 텍스트
   */
  cancelText?: string;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 표시 여부
   */
  showCancelButton?: boolean;
  /**
   * 확인 버튼 표시 여부
   */
  showConfirmButton?: boolean;
  /**
   * 버튼을 fullwidth로 표시할지 여부
   */
  fullWidth?: boolean;
}

/**
 * Modal 컴포넌트 Emits
 */
export interface ModalEmits {
  (e: 'close'): void;
  (e: 'back'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'action', action: ModalAction, index: number): void;
  (e: 'update:isOpen', value: boolean): void;
}

/**
 * ModalHeader 컴포넌트 Props
 */
export interface ModalHeaderProps {
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 뒤로가기 버튼 텍스트
   */
  backButtonText?: string;
  /**
   * 닫기 버튼 텍스트
   */
  closeButtonText?: string;
}

/**
 * ModalHeader 컴포넌트 Emits
 */
export interface ModalHeaderEmits {
  (e: 'back'): void;
  (e: 'close'): void;
}

/**
 * ModalContent 컴포넌트 Props
 */
export interface ModalContentProps {
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 알림 타입 (alert variant용)
   */
  alertVariant?: AlertVariant;
  /**
   * 알림 아이콘 표시 여부
   */
  showAlertIcon?: boolean;
}

/**
 * ModalContent 컴포넌트 Emits
 */
export interface ModalContentEmits {
  (e: 'content-click'): void;
}

/**
 * ModalFooter 컴포넌트 Props
 */
export interface ModalFooterProps {
  /**
   * 모달 액션 버튼들
   */
  actions?: ModalAction[];
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
  /**
   * 취소 버튼 텍스트
   */
  cancelText?: string;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 표시 여부
   */
  showCancelButton?: boolean;
  /**
   * 확인 버튼 표시 여부
   */
  showConfirmButton?: boolean;
  /**
   * 버튼을 fullwidth로 표시할지 여부
   */
  fullWidth?: boolean;
}

/**
 * ModalFooter 컴포넌트 Emits
 */
export interface ModalFooterEmits {
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'action', action: ModalAction, index: number): void;
}

/**
 * Modal 슬롯 타입
 */
export interface ModalSlots {
  /**
   * 기본 컨텐츠
   */
  default(): any[];
  /**
   * 헤더 영역
   */
  header(): any[];
  /**
   * 푸터 영역
   */
  footer(): any[];
  /**
   * 제목 영역
   */
  title(): any[];
  /**
   * 액션 영역
   */
  actions(): any[];
} 