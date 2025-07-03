import type { BaseEntity } from './common';

/**
 * 사용자 관련 타입 정의
 * 사용자 관리에 필요한 모든 타입들을 정의합니다.
 */

/**
 * 사용자 역할 타입
 */
export type UserRole = 'admin' | 'user' | 'moderator';

/**
 * 사용자 인터페이스
 * 시스템의 사용자 정보를 나타냅니다.
 */
export interface User extends BaseEntity {
  /** 사용자 이메일 (고유값) */
  email: string;
  /** 이름 */
  firstName: string;
  /** 성 */
  lastName: string;
  /** 프로필 이미지 URL */
  avatar?: string;
  /** 계정 활성화 상태 */
  isActive: boolean;
  /** 사용자 역할 */
  role: UserRole;
  /** 마지막 로그인 일시 */
  lastLoginAt?: Date;
}

/**
 * 사용자 프로필 인터페이스
 * 사용자의 상세 정보를 포함합니다.
 */
export interface UserProfile {
  /** 사용자 ID */
  userId: string;
  /** 자기소개 */
  bio?: string;
  /** 전화번호 */
  phone?: string;
  /** 주소 정보 */
  address?: Address;
  /** 사용자 설정 */
  preferences: UserPreferences;
}

/**
 * 주소 인터페이스
 */
export interface Address {
  /** 도로명 주소 */
  street: string;
  /** 도시 */
  city: string;
  /** 주/도 */
  state: string;
  /** 우편번호 */
  zipCode: string;
  /** 국가 */
  country: string;
}

/**
 * 사용자 설정 인터페이스
 */
export interface UserPreferences {
  /** 언어 설정 */
  language: string;
  /** 시간대 설정 */
  timezone: string;
  /** 테마 설정 */
  theme: 'light' | 'dark' | 'auto';
  /** 알림 설정 */
  notifications: NotificationSettings;
}

/**
 * 알림 설정 인터페이스
 */
export interface NotificationSettings {
  /** 이메일 알림 활성화 */
  email: boolean;
  /** 푸시 알림 활성화 */
  push: boolean;
  /** SMS 알림 활성화 */
  sms: boolean;
  /** 마케팅 알림 활성화 */
  marketing: boolean;
}

/**
 * 사용자 생성 요청 인터페이스
 */
export interface CreateUserRequest {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string;
  /** 이름 */
  firstName: string;
  /** 성 */
  lastName: string;
  /** 사용자 역할 (기본값: 'user') */
  role?: UserRole;
}

/**
 * 사용자 정보 업데이트 요청 인터페이스
 */
export interface UpdateUserRequest {
  /** 이름 */
  firstName?: string;
  /** 성 */
  lastName?: string;
  /** 프로필 이미지 URL */
  avatar?: string;
  /** 계정 활성화 상태 */
  isActive?: boolean;
  /** 사용자 역할 */
  role?: UserRole;
}

/**
 * 사용자 필터 인터페이스
 * 사용자 목록 조회 시 필터링 조건을 정의합니다.
 */
export interface UserFilter {
  /** 검색어 (이름, 이메일, 성) */
  search?: string;
  /** 사용자 역할 필터 */
  role?: UserRole;
  /** 활성화 상태 필터 */
  isActive?: boolean;
  /** 생성일 시작 범위 */
  createdAfter?: Date;
  /** 생성일 종료 범위 */
  createdBefore?: Date;
}

/**
 * 사용자 관련 유틸리티 타입들
 */

/**
 * 사용자 생성 시 필요한 데이터 타입
 */
export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>;

/**
 * 사용자 업데이트 시 수정 가능한 데이터 타입
 */
export type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email'>>;

/**
 * 사용자 목록 응답 타입
 */
export type UserListResponse = User[];

/**
 * 사용자 상세 정보 응답 타입
 */
export type UserDetailResponse = User & { profile?: UserProfile };
