# 🚀 Vue3 Monorepo Template

Vue 3 + TypeScript + Vite 기반의 모노레포 템플릿입니다. 성능 최적화, 실시간 데이터 처리, 그리고 포괄적인 테스팅 전략을 포함합니다.

## ✨ 주요 기능

- **🎯 Vue 3 Composition API**: 최신 Vue 3 기능 활용
- **📦 PNPM Workspace**: 효율적인 패키지 관리
- **⚡ 성능 최적화**: Virtual Scrolling, WebSocket 배칭, 메모리 관리
- **🎨 UI 프레임워크**: Vuetify 3 + TailwindCSS
- **🔧 상태 관리**: Pinia 3.x
- **🧪 포괄적 테스팅**: Vitest + Cypress + Storybook
- **📏 코드 품질**: ESLint + Prettier + Husky
- **📱 반응형 디자인**: 다중 패널 레이아웃

## 🏗️ 프로젝트 구조

```
vue3-monorepo-template/
├── apps/
│   ├── desktop/         # 데스크톱 웹 애플리케이션
│   ├── mobile/          # 모바일 웹 애플리케이션
│   └── mobile-native/   # React Native 네이티브 앱
├── packages/
│   ├── ui/              # 공통 UI 컴포넌트 라이브러리
│   ├── api/             # API 통신 모듈
│   ├── utils/           # 공통 유틸리티 함수
│   └── types/           # 공통 타입 정의
├── shared/              # 공통 설정 및 도구
│   ├── config/          # 설정 파일들
│   └── scripts/         # 빌드 스크립트
├── docs/                # 프로젝트 문서
└── .cursor/             # Cursor AI 설정
    └── rules/           # 기술별 베스트 프랙티스
```

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
# PNPM 설치 (권장)
npm install -g pnpm

# 프로젝트 의존성 설치
pnpm install
```

### 2. 개발 서버 실행

```bash
# 데스크톱 앱 개발 서버
pnpm dev:desktop

# 모바일 앱 개발 서버
pnpm dev:mobile

# 네이티브 앱 개발 서버
pnpm mobile:start

# UI 패키지 개발 서버
pnpm dev:ui
```

### 3. 빌드

```bash
# 전체 빌드
pnpm build:all

# 개별 앱 빌드
pnpm build:desktop
pnpm build:mobile
pnpm build:ui

# 네이티브 앱 빌드
pnpm mobile:build:android    # Android APK/AAB 빌드
pnpm mobile:build:ios        # iOS 빌드
```

## 🛠️ 개발 도구

### Cursor AI 명령어

이 프로젝트는 Cursor AI와 통합되어 있어 다음과 같은 방법으로 명령어를 사용할 수 있습니다:

#### 방법 1: 키보드 단축키 (권장)

```bash
# 컴포넌트 생성
Cmd/Ctrl + Alt + C

# 패키지 생성
Cmd/Ctrl + Alt + P

# API 서비스 생성
Cmd/Ctrl + Alt + A

# Storybook 스토리 생성
Cmd/Ctrl + Alt + S

# 테스트 스위트 생성
Cmd/Ctrl + Alt + T

# 성능 최적화
Cmd/Ctrl + Alt + O

# Pinia 스토어 생성
Cmd/Ctrl + Alt + U

# Vuetify 컴포넌트 생성
Cmd/Ctrl + Alt + V

# Tailwind 컴포넌트 생성
Cmd/Ctrl + Alt + W

# E2E 테스트 생성
Cmd/Ctrl + Alt + E

# 번들 최적화
Cmd/Ctrl + Alt + B

# 문서화 생성
Cmd/Ctrl + Alt + D
```

#### 방법 2: Chat 패널에서 직접 입력

Cursor AI Chat 패널에서 다음 프롬프트들을 직접 입력하여 사용:

```bash
# 모노레포 컴포넌트 생성
"Create a Vue 3 component with TypeScript, performance optimizations, and Storybook integration. Follow the monorepo structure and include proper testing."

# 새로운 패키지 생성
"Create a new package in the monorepo structure with proper TypeScript configuration, testing setup, and Storybook integration."

# API 서비스 생성
"Create an API service with WebSocket multiplexing, data batching, and proper error handling. Include TypeScript types and comprehensive testing."

# 성능 최적화 컴포넌트 생성
"Create a Vue 3 component optimized for performance with virtual scrolling, memory management, and real-time data handling."

# Storybook 스토리 생성
"Create a comprehensive Storybook story for the current component with multiple variants, controls, and accessibility testing."

# 테스트 스위트 생성
"Create a comprehensive test suite for the current file including unit tests, component tests, and performance tests."
```

#### 방법 3: 명령어 팔레트 (실험적)

일부 Cursor 버전에서는 다음 명령어들이 명령어 팔레트에 나타날 수 있습니다:

- `vue:create-monorepo-component`
- `vue:create-monorepo-package`
- `vue:create-api-service`
- `vue:create-performance-component`
- `vue:create-storybook-story`
- `vue:create-test-suite`

### 스크립트 명령어

```bash
# 개발
pnpm dev:desktop          # 데스크톱 앱 개발 서버
pnpm dev:mobile           # 모바일 앱 개발 서버
pnpm dev:ui               # UI 패키지 개발 서버

# 빌드
pnpm build:all            # 전체 빌드
pnpm build:desktop        # 데스크톱 앱 빌드
pnpm build:mobile         # 모바일 앱 빌드
pnpm build:ui             # UI 패키지 빌드

# 테스팅
pnpm test                 # 전체 테스트 실행
pnpm test:unit            # 단위 테스트만
pnpm test:e2e             # E2E 테스트만
pnpm test:coverage        # 커버리지 리포트

# 코드 품질
pnpm lint                 # ESLint 검사 및 수정
pnpm format               # Prettier 포맷팅
pnpm type-check           # TypeScript 타입 검사

# Storybook
pnpm storybook            # Storybook 개발 서버
pnpm build-storybook      # Storybook 빌드
```

## 🎯 성능 최적화

### Virtual Scrolling

대용량 데이터셋을 효율적으로 처리하기 위해 `vue-virtual-scroller`를 사용합니다:

```vue
<template>
  <RecycleScroller :items="items" :item-size="50" key-field="id">
    <template #default="{ item }">
      <div class="item">{{ item.name }}</div>
    </template>
  </RecycleScroller>
</template>
```

### WebSocket 배칭

실시간 데이터를 효율적으로 처리하기 위해 100ms 배칭을 구현합니다:

```typescript
const batchedMessages = useBatchedMessages(100);
const ws = useWebSocket('ws://localhost:8080', {
  onMessage: (data) => batchedMessages.add(data),
});
```

### 메모리 관리

컴포넌트 언마운트 시 적절한 정리 작업을 수행합니다:

```typescript
onUnmounted(() => {
  // WebSocket 연결 해제
  ws.disconnect();
  // 타이머 정리
  clearInterval(timer);
  // 이벤트 리스너 제거
  window.removeEventListener('resize', handleResize);
});
```

## 🧪 테스팅 전략

### 단위 테스트 (Vitest)

비즈니스 로직과 유틸리티 함수를 테스트합니다:

```typescript
describe('User Store', () => {
  it('should fetch users successfully', async () => {
    const store = useUserStore();
    await store.fetchUsers();
    expect(store.users).toHaveLength(2);
  });
});
```

### 컴포넌트 테스트 (Vue Test Utils)

Vue 컴포넌트를 테스트합니다:

```typescript
describe('BaseButton', () => {
  it('should emit click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

### E2E 테스트 (Cypress)

사용자 플로우를 테스트합니다:

```typescript
describe('User Management', () => {
  it('should create new user', () => {
    cy.visit('/users');
    cy.get('[data-testid="create-user-btn"]').click();
    // 폼 작성 및 제출
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## 📦 패키지 구조

### @template/ui

재사용 가능한 UI 컴포넌트 라이브러리:

```typescript
import { BaseButton, BaseCard, BaseDataTable } from '@template/ui'

// 사용 예시
<BaseButton variant="primary" @click="handleClick">
  클릭하세요
</BaseButton>
```

### @template/api

API 통신 모듈:

```typescript
import { userApi } from '@template/api';

// 사용 예시
const users = await userApi.getUsers({ page: 1, limit: 20 });
```

### @template/utils

공통 유틸리티 함수:

```typescript
import { formatDate, debounce } from '@template/utils';

// 사용 예시
const formattedDate = formatDate(new Date(), 'ko-KR');
const debouncedSearch = debounce(searchFunction, 300);
```

### @template/types

공통 타입 정의:

```typescript
import type { User, ApiResponse } from '@template/types';

// 사용 예시
const user: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
};
```

## 🔧 설정 파일

### TypeScript 설정

각 패키지별로 독립적인 TypeScript 설정을 가집니다:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### Vite 설정

모노레포에 최적화된 Vite 설정:

```typescript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@template/ui': resolve(__dirname, '../../packages/ui'),
      '@template/api': resolve(__dirname, '../../packages/api'),
      '@template/utils': resolve(__dirname, '../../packages/utils'),
      '@template/types': resolve(__dirname, '../../packages/types'),
    },
  },
});
```

## 🎨 UI/UX 가이드라인

### 디자인 시스템

Vuetify 3와 TailwindCSS를 조합하여 일관된 디자인 시스템을 구축합니다:

```vue
<template>
  <v-card class="card-hover">
    <v-card-title class="text-h6">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
```

### 반응형 디자인

다중 패널 레이아웃과 브레이크포인트를 활용합니다:

```vue
<template>
  <div class="grid-responsive">
    <div class="col-span-1 lg:col-span-2">
      <!-- 메인 콘텐츠 -->
    </div>
    <div class="col-span-1">
      <!-- 사이드바 -->
    </div>
  </div>
</template>
```

## 📚 문서화

### Storybook

모든 컴포넌트에 대한 인터랙티브 문서:

```typescript
export default {
  title: 'Components/BaseButton',
  component: BaseButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error'],
    },
  },
};
```

### JSDoc

함수와 컴포넌트에 대한 상세한 문서:

```typescript
/**
 * 사용자 정보를 포맷팅합니다.
 * @param user - 포맷팅할 사용자 객체
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷팅된 사용자 정보 문자열
 */
export function formatUser(user: User, locale = 'ko-KR'): string {
  // 구현...
}
```

### 커밋 컨벤션

Conventional Commits를 따릅니다:

- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 코드 스타일 변경
- `refactor:` 코드 리팩토링
- `test:` 테스트 추가/수정
- `chore:` 빌드 프로세스 또는 보조 도구 변경

## Used Technology

이 템플릿은 다음 기술들을 기반으로 합니다:

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify](https://vuetifyjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://cypress.io/)
- [Storybook](https://storybook.js.org/)

---
