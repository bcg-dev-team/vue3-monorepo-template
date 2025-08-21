# @template/mocks

MSW 기반 API 모킹 패키지

## 설치

```bash
pnpm add @template/mocks
```

## 사용법

```typescript
import { startMocking } from '@template/mocks';

// 개발 환경에서 모킹 시작
if (import.meta.env.DEV) {
  startMocking();
}
```

## 기능

- HTTP API 모킹 (MSW)
- 차트 데이터 모킹
- 간단한 설정 관리
