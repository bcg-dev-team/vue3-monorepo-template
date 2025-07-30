# @template/types

공통 타입 정의 패키지입니다. 모노레포 전체에서 사용되는 TypeScript 타입들을 중앙에서 관리합니다.

## 📦 설치

```bash
pnpm add @template/types
```

## 🚀 사용법

```typescript
import type { 
  User, 
  ApiResponse, 
  PaginatedResponse,
  UserRole 
} from '@template/types'

// 사용자 정보 타입
const user: User = {
  id: 'user-123',
  firstName: '홍',
  lastName: '길동',
  email: 'hong@example.com',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

// API 응답 타입
const response: ApiResponse<User> = {
  data: user,
  message: '사용자 정보 조회 성공',
  success: true
}

// 페이지네이션 응답 타입
const paginatedResponse: PaginatedResponse<User> = {
  data: [user],
  message: '사용자 목록 조회 성공',
  success: true,
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
}
```

## 📁 파일 구조

```
src/
├── index.ts          # 메인 진입점
├── common.ts         # 공통 타입 정의
├── user.ts           # 사용자 관련 타입
├── auth.ts           # 인증 관련 타입
├── api.ts            # API 관련 타입
└── ui.ts             # UI 컴포넌트 타입
```

## 🔧 주요 타입

### BaseEntity
모든 엔티티의 기본 속성을 정의합니다.

```typescript
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
```

### User
사용자 정보를 나타내는 타입입니다.

```typescript
interface User extends BaseEntity {
  firstName: string
  lastName: string
  email: string
  role: UserRole
  isActive: boolean
}

type UserRole = 'admin' | 'user' | 'guest'
```

### ApiResponse
API 응답의 표준 형식을 정의합니다.

```typescript
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
```

### PaginatedResponse
페이지네이션이 포함된 API 응답 형식입니다.

```typescript
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

## 🛠️ 개발

### 빌드

```bash
# 타입 체크
pnpm type-check

# 빌드
pnpm build

# 개발 모드 (watch)
pnpm dev
```

### 테스트

```typescript
// 타입 가드 테스트 예시
import { isUser } from '@template/types'

const testUser = {
  id: 'test-123',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

console.log(isUser(testUser)) // true
```

## 📋 유틸리티 타입

### CreateUserRequest
사용자 생성 시 필요한 데이터 타입입니다.

```typescript
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
```

### UpdateUserRequest
사용자 정보 업데이트 시 필요한 데이터 타입입니다.

```typescript
type UpdateUserRequest = Partial<CreateUserRequest>
```

### AsyncState
비동기 상태를 관리하는 타입입니다.

```typescript
type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}
```

## 🔗 의존성

- **의존성**: 없음
- **피어 의존성**: 없음

## 📝 라이센스

MIT License 