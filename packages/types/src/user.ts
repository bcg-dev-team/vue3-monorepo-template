import type { BaseEntity } from './common';

// 사용자 관련 타입 정의
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  role: UserRole;
  lastLoginAt?: Date;
}

// 사용자 역할
export type UserRole = 'admin' | 'user' | 'moderator';

export interface UserProfile {
  userId: string;
  bio?: string;
  phone?: string;
  address?: Address;
  preferences: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
  role?: UserRole;
}

export interface UserFilter {
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
}
