# @template/api

Axios 기반의 API 통신 라이브러리 패키지입니다. HTTP 클라이언트, 인터셉터, 에러 핸들링을 포함한 완전한 API 통신 솔루션을 제공합니다.

## 📦 설치

```bash
pnpm add @template/api
```

## 🚀 사용법

### 기본 설정

```typescript
import { createAxiosInstance } from '@template/api'
import type { AxiosError } from '@template/api'

// 토큰 해결자 함수 (인증 토큰을 반환)
const tokenResolver = () => {
  // 로컬 스토리지, 세션 스토리지, 쿠키 등에서 토큰 가져오기
  return localStorage.getItem('accessToken') || undefined
}

// 에러 핸들러 함수
const errorHandler = async (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 인증 실패 시 로그인 페이지로 리다이렉트
        window.location.href = '/login'
        break
      case 403:
        logger.error('접근 권한이 없습니다.')
        break
      case 500:
        logger.error('서버 오류가 발생했습니다.')
        break
      default:
        logger.error('API 오류:', error.message)
    }
  }
}

// Axios 인스턴스 생성
const api = createAxiosInstance(tokenResolver, errorHandler)
```

### 서비스 클래스 생성

```typescript
// packages/api/src/services/user/user.service.ts
import { AxiosInstance } from 'axios'

export class UserService {
  private axios: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  // 사용자 목록 조회
  async getUsers(params?: { page?: number; limit?: number }) {
    return this.axios.get('/users', { params })
  }

  // 사용자 상세 조회
  async getUserById(userId: string) {
    return this.axios.get(`/users/${userId}`)
  }

  // 사용자 생성
  async createUser(userData: CreateUserRequest) {
    return this.axios.post('/users', userData)
  }

  // 사용자 정보 업데이트
  async updateUser(userId: string, userData: UpdateUserRequest) {
    return this.axios.put(`/users/${userId}`, userData)
  }

  // 사용자 삭제
  async deleteUser(userId: string) {
    return this.axios.delete(`/users/${userId}`)
  }

  // 사용자 상태 변경
  async updateUserStatus(userId: string, status: UserStatus) {
    return this.axios.patch(`/users/${userId}/status`, { status })
  }

  // 사용자 프로필 이미지 업로드
  async uploadProfileImage(userId: string, imageFile: File) {
    const formData = new FormData()
    formData.append('image', imageFile)
    
    return this.axios.post(`/users/${userId}/profile-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
```

### 서비스 export

```typescript
// packages/api/src/services/index.ts
export { UserService } from './user/user.service'
export { ProductService } from './product/product.service'
export { OrderService } from './order/order.service'
export { ExampleService } from './example/example.service'
```

### 앱에서 사용하기

```typescript
// apps/desktop/src/service/index.ts
import { UserService, ProductService } from '@template/api'
import api from './axios'

// 서비스 인스턴스 생성
export const userService = new UserService(api)
export const productService = new ProductService(api)
```

```typescript
// apps/desktop/src/components/UserList.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService } from '@/service'

const users = ref([])
const loading = ref(false)

const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await userService.getUsers({ page: 1, limit: 10 })
    users.value = response.data
  } catch (error) {
    logger.error('사용자 목록 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
```

## 📁 파일 구조

```
src/
├── index.ts                    # 메인 진입점
├── plugin/                     # Axios 플러그인
│   └── axios.ts               # Axios 인스턴스 생성 및 설정
├── services/                   # API 서비스 레이어
│   ├── index.ts               # 서비스 export
│   ├── example/               # 예시 서비스
│   │   └── example.service.ts
│   ├── user/                  # 사용자 관련 서비스
│   │   └── user.service.ts
│   ├── product/               # 상품 관련 서비스
│   │   └── product.service.ts
│   └── order/                 # 주문 관련 서비스
│       └── order.service.ts
├── types/                      # API 관련 타입
│   ├── index.ts
│   └── axios.ts               # Axios 관련 타입 정의
└── __tests__/                  # 테스트 파일들
```

## 🔧 주요 기능

### createAxiosInstance

Axios 인스턴스를 생성하고 인터셉터를 설정합니다.

```typescript
import { createAxiosInstance } from '@template/api'

const api = createAxiosInstance(
  tokenResolver,    // 토큰 해결자 함수
  errorHandler      // 에러 핸들러 함수
)
```

#### 토큰 해결자 (TokenResolver)

```typescript
// 기본 토큰 해결자
const tokenResolver = () => {
  return localStorage.getItem('accessToken')
}

// 비동기 토큰 해결자 (토큰 갱신 등)
const tokenResolver = async () => {
  const token = localStorage.getItem('accessToken')
  if (token && isTokenExpired(token)) {
    const newToken = await refreshToken()
    return newToken
  }
  return token
}

// 토큰이 없는 경우
const tokenResolver = () => undefined
```

#### 에러 핸들러 (ErrorHandler)

```typescript
// 기본 에러 핸들러
const errorHandler = async (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        logger.error('잘못된 요청:', data)
        break
      case 401:
        // 토큰 만료 시 갱신 시도
        await refreshToken()
        break
      case 403:
        logger.error('접근 권한 없음')
        break
      case 404:
        logger.error('리소스를 찾을 수 없음')
        break
      case 500:
        logger.error('서버 오류')
        break
      default:
        logger.error('알 수 없는 오류:', status)
    }
  } else if (error.request) {
    logger.error('네트워크 오류')
  } else {
    logger.error('요청 설정 오류:', error.message)
  }
}
```

### HTTP 메서드 지원

모든 HTTP 메서드를 지원하며, 각각에 맞는 적절한 설정을 제공합니다.

```typescript
// GET 요청
const response = await api.get('/users', { params: { page: 1 } })

// POST 요청
const response = await api.post('/users', { name: '홍길동', email: 'hong@example.com' })

// PUT 요청
const response = await api.put('/users/1', { name: '김철수' })

// PATCH 요청
const response = await api.patch('/users/1', { status: 'active' })

// DELETE 요청
await api.delete('/users/1')

// 커스텀 헤더가 필요한 요청
const response = await api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### 인터셉터

요청과 응답을 가로채서 처리할 수 있습니다.

```typescript
// 요청 인터셉터 (토큰 자동 추가)
instance.interceptors.request.use(
  async (config) => {
    if (tokenResolver) {
      const token = await tokenResolver()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 (에러 처리)
instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (errorHandler) {
      await errorHandler(error)
    }
    return Promise.reject(error)
  }
)
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
import { createAxiosInstance } from '@template/api'

describe('createAxiosInstance', () => {
  it('should create axios instance with interceptors', () => {
    const tokenResolver = vi.fn(() => 'test-token')
    const errorHandler = vi.fn()
    
    const instance = createAxiosInstance(tokenResolver, errorHandler)
    
    expect(instance).toBeDefined()
    expect(instance.interceptors.request).toBeDefined()
    expect(instance.interceptors.response).toBeDefined()
  })
})
```

## 🔧 설정 옵션

### 기본 설정

```typescript
const defaultConfig = {
  timeout: 5000,
  headers: { 
    'Content-Type': 'application/json' 
  }
}
```


## 🔗 의존성

- **의존성**: `@template/types`, `@template/utils`, `axios`
- **피어 의존성**: 없음

## 📝 라이센스

MIT License 