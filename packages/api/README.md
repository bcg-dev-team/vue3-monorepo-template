# @template/api

API 통신 라이브러리 패키지입니다. HTTP 클라이언트, 인터셉터, 에러 핸들링을 포함한 완전한 API 통신 솔루션을 제공합니다.

## 📦 설치

```bash
pnpm add @template/api
```

## 🚀 사용법

```typescript
import { ApiClient } from '@template/api'
import type { User, ApiResponse } from '@template/types'

// API 클라이언트 인스턴스 생성
const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 사용자 정보 조회
const getUser = async (userId: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`)
  return response.data
}

// 사용자 생성
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData)
  return response.data
}

// 사용자 정보 업데이트
const updateUser = async (userId: string, userData: UpdateUserRequest): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, userData)
  return response.data
}

// 사용자 삭제
const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/users/${userId}`)
}
```

## 📁 파일 구조

```
src/
├── index.ts              # 메인 진입점
├── client/               # HTTP 클라이언트
│   ├── index.ts
│   └── ApiClient.ts      # 메인 API 클라이언트
├── services/             # API 서비스 레이어
│   └── index.ts
├── types/                # API 관련 타입
│   └── index.ts
└── __tests__/            # 테스트 파일들
```

## 🔧 주요 기능

### ApiClient

HTTP 요청을 처리하는 메인 클라이언트입니다.

```typescript
import { ApiClient } from '@template/api'

const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

// GET 요청
const response = await apiClient.get('/users')

// POST 요청
const response = await apiClient.post('/users', { name: '홍길동' })

// PUT 요청
const response = await apiClient.put('/users/1', { name: '김철수' })

// DELETE 요청
await apiClient.delete('/users/1')

// PATCH 요청
const response = await apiClient.patch('/users/1', { status: 'active' })
```

### 인터셉터

요청과 응답을 가로채서 처리할 수 있습니다.

```typescript
// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰 추가
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답 처리
    return response
  },
  (error) => {
    // 에러 응답 처리
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      refreshToken()
    }
    return Promise.reject(error)
  }
)
```

### 에러 핸들링

```typescript
import { ApiError } from '@template/api'

try {
  const user = await getUser('user-123')
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API 에러:', error.message)
    console.error('상태 코드:', error.status)
    console.error('응답 데이터:', error.data)
  }
}
```

### 타입 안전성

TypeScript를 활용한 완전한 타입 안전성을 제공합니다.

```typescript
import type { User, CreateUserRequest, ApiResponse } from '@template/types'

// 타입이 지정된 API 호출
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData)
  return response.data
}

// 사용 시 타입 추론
const newUser = await createUser({
  firstName: '홍',
  lastName: '길동',
  email: 'hong@example.com',
  role: 'user',
  isActive: true
})
// newUser는 User 타입으로 추론됨
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

```bash
# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# 커버리지 리포트
pnpm test:coverage
```

### 테스트 예시

```typescript
import { describe, it, expect, vi } from 'vitest'
import { ApiClient } from '@template/api'

describe('ApiClient', () => {
  it('should make GET request successfully', async () => {
    const apiClient = new ApiClient({
      baseURL: 'https://api.example.com'
    })

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { id: 1, name: 'Test' } })
      })
    ) as any

    const response = await apiClient.get('/users/1')
    expect(response.data).toEqual({ id: 1, name: 'Test' })
  })
})
```

## 🔧 설정 옵션

### ApiClientConfig

```typescript
interface ApiClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
  retryCount?: number
  retryDelay?: number
}
```

### 기본 설정

```typescript
const defaultConfig: ApiClientConfig = {
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  retryCount: 3,
  retryDelay: 1000
}
```

## 🔗 의존성

- **의존성**: `@template/types`, `@template/utils`
- **피어 의존성**: 없음

## 📝 라이센스

MIT License 