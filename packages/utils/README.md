# @template/utils

공통 유틸리티 함수 패키지입니다. 모노레포 전체에서 사용되는 헬퍼 함수들을 제공합니다.

## 📦 설치

```bash
pnpm add @template/utils
```

## 🚀 사용법

```typescript
import { 
  formatCurrency, 
  validateEmail, 
  formatDate,
  debounce 
} from '@template/utils'

// 통화 포맷팅
const price = formatCurrency(1234567) // "₩1,234,567"

// 이메일 검증
const isValid = validateEmail('user@example.com') // true

// 날짜 포맷팅
const formattedDate = formatDate(new Date(), 'yyyy-MM-dd') // "2024-01-15"

// 디바운스 함수
const debouncedSearch = debounce((query: string) => {
  // 검색 로직
}, 300)
```

## 📁 파일 구조

```
src/
├── index.ts              # 메인 진입점
├── validation.ts         # 검증 유틸리티
├── date.ts              # 날짜/시간 유틸리티
├── string.ts            # 문자열 유틸리티
├── format.ts            # 포맷팅 유틸리티
├── storage.ts           # 로컬 스토리지 유틸리티
├── crypto.ts            # 암호화 유틸리티
├── composables/         # Vue 컴포저블
│   ├── index.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
└── __tests__/           # 테스트 파일들
```

## 🔧 주요 기능

### 검증 (Validation)

```typescript
import { 
  validateEmail, 
  validatePassword, 
  validatePhoneNumber 
} from '@template/utils'

// 이메일 검증
validateEmail('user@example.com') // true
validateEmail('invalid-email') // false

// 비밀번호 검증
validatePassword('StrongPass123!') // true
validatePassword('weak') // false

// 전화번호 검증
validatePhoneNumber('010-1234-5678') // true
validatePhoneNumber('123-456-789') // false
```

### 날짜/시간 (Date/Time)

```typescript
import { 
  formatDate, 
  formatRelativeTime, 
  parseDate,
  addDays 
} from '@template/utils'

// 날짜 포맷팅
formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss') // "2024-01-15 14:30:00"

// 상대적 시간
formatRelativeTime(new Date(Date.now() - 60000)) // "1분 전"

// 날짜 파싱
const date = parseDate('2024-01-15') // Date 객체

// 날짜 계산
const tomorrow = addDays(new Date(), 1)
```

### 문자열 (String)

```typescript
import { 
  truncate, 
  capitalize, 
  slugify,
  generateRandomString 
} from '@template/utils'

// 문자열 자르기
truncate('긴 텍스트입니다', 10) // "긴 텍스트..."

// 첫 글자 대문자
capitalize('hello world') // "Hello world"

// 슬러그 생성
slugify('Hello World!') // "hello-world"

// 랜덤 문자열 생성
generateRandomString(8) // "aB3x9K2m"
```

### 포맷팅 (Format)

```typescript
import { 
  formatCurrency, 
  formatNumber, 
  formatFileSize,
  formatPhoneNumber 
} from '@template/utils'

// 통화 포맷팅
formatCurrency(1234567) // "₩1,234,567"
formatCurrency(1234567, 'USD') // "$1,234,567"

// 숫자 포맷팅
formatNumber(1234567) // "1,234,567"

// 파일 크기 포맷팅
formatFileSize(1024) // "1 KB"
formatFileSize(1048576) // "1 MB"

// 전화번호 포맷팅
formatPhoneNumber('01012345678') // "010-1234-5678"
```

### 스토리지 (Storage)

```typescript
import { 
  setLocalStorage, 
  getLocalStorage, 
  removeLocalStorage,
  clearLocalStorage 
} from '@template/utils'

// 로컬 스토리지 저장
setLocalStorage('user', { id: 1, name: '홍길동' })

// 로컬 스토리지 조회
const user = getLocalStorage('user') // { id: 1, name: '홍길동' }

// 로컬 스토리지 삭제
removeLocalStorage('user')

// 로컬 스토리지 전체 삭제
clearLocalStorage()
```

### 암호화 (Crypto)

```typescript
import { 
  hashPassword, 
  verifyPassword, 
  encrypt,
  decrypt 
} from '@template/utils'

// 비밀번호 해싱
const hashedPassword = await hashPassword('myPassword123')

// 비밀번호 검증
const isValid = await verifyPassword('myPassword123', hashedPassword) // true

// 데이터 암호화
const encrypted = encrypt('sensitive data', 'secret-key')

// 데이터 복호화
const decrypted = decrypt(encrypted, 'secret-key') // "sensitive data"
```

## 🎣 Vue 컴포저블

### useDebounce

```typescript
import { useDebounce } from '@template/utils'

const { debouncedValue, debouncedFunction } = useDebounce('', 300)

// 검색 입력 예시
const handleSearch = (query: string) => {
  debouncedFunction(() => {
    // API 호출
    searchAPI(query)
  })
}
```

### useLocalStorage

```typescript
import { useLocalStorage } from '@template/utils'

const { value, setValue, removeValue } = useLocalStorage('theme', 'light')

// 테마 변경
setValue('dark')

// 테마 삭제
removeValue()
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
import { describe, it, expect } from 'vitest'
import { validateEmail, formatCurrency } from '@template/utils'

describe('Validation Utils', () => {
  it('should validate email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
  })
})

describe('Format Utils', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1234567)).toBe('₩1,234,567')
  })
})
```

## 🔗 의존성

- **의존성**: `@template/types`
- **피어 의존성**: 없음

## 📝 라이센스

MIT License 