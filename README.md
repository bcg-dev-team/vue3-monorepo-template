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

### 0. 개발 환경 설정

#### Git 설정 (필수)
이 프로젝트는 파일명의 대소문자를 구분하므로 다음 설정이 필요합니다:

```bash
# 대소문자 구분 설정 (모든 개발자가 실행해야 함)
git config core.ignorecase false
```

**중요:** 이 설정은 각 개발자가 개별적으로 실행해야 합니다. 설정하지 않으면 파일명 변경사항이 Git에서 추적되지 않을 수 있습니다.

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

#### 방법 1: Chat에서 직접 입력 (권장)

Cursor AI Chat 패널에서 다음 명령어들을 직접 입력:

```bash
# 간단한 키워드 (추천)
vue component
vue package
vue api
vue storybook
vue test
vue performance
vue pinia
vue vuetify
vue tailwind
vue e2e
vue bundle
vue docs

# 전체 명령어
vue:create-component
vue:create-package
vue:create-api-service
vue:create-storybook
vue:create-test
vue:add-performance
vue:create-pinia-store
vue:create-vuetify
vue:create-tailwind
vue:create-e2e
vue:optimize-bundle
vue:create-docs
```

#### 방법 2: 복사해서 붙여넣기

Cursor AI Chat 패널에서 다음 프롬프트들을 복사해서 붙여넣기:

```bash
# 모노레포 컴포넌트 생성
Create a Vue 3 component with TypeScript, performance optimizations, and Storybook integration. Follow the monorepo structure and include proper testing.

# 새로운 패키지 생성
Create a new package in the monorepo structure with proper TypeScript configuration, testing setup, and Storybook integration.

# API 서비스 생성
Create an API service with WebSocket multiplexing, data batching, and proper error handling. Include TypeScript types and comprehensive testing.

# 성능 최적화 컴포넌트 생성
Create a Vue 3 component optimized for performance with virtual scrolling, memory management, and real-time data handling.

# Storybook 스토리 생성
Create a comprehensive Storybook story for the current component with multiple variants, controls, and accessibility testing.

# 테스트 스위트 생성
Create a comprehensive test suite for the current file including unit tests, component tests, and performance tests.
```

#### 방법 3: 명령어 팔레트 (실험적)

일부 Cursor 버전에서는 다음 명령어들이 명령어 팔레트에 나타날 수 있습니다:

- `vue:create-component`
- `vue:create-package`
- `vue:create-api-service`
- `vue:create-storybook`
- `vue:create-test`

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
```

## 📚 문서

- [Cursor AI 명령어 사용법](./CURSOR_COMMANDS.md) - Cursor AI 명령어 상세 가이드
- [모바일 배포 가이드](./docs/mobile-deployment.md) - React Native 앱 배포 방법
- [순환 의존성 방지](./docs/circular-dependency-prevention.md) - 모노레포에서 순환 의존성 방지

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 있거나 질문이 있으시면 [Issues](../../issues)를 통해 문의해 주세요.

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
