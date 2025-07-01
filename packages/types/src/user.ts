// 사용자 관련 타입 정의
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin',
  // eslint-disable-next-line no-unused-vars
  USER = 'user',
  // eslint-disable-next-line no-unused-vars
  MODERATOR = 'moderator',
}

export interface UserProfile extends Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'> {
  bio?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: Address;
}
