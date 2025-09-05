# 🚀 Vue3 Monorepo Template

Vue 3 + TypeScript + Vite 기반의 모노레포 템플릿입니다.

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
│   ├── types/           # 공통 타입 정의
│   ├── mocks/           # API 모킹 (MSW 기반)
│   └── theme/           # 디자인 토큰 및 테마 관리
├── shared/              # 공통 설정 및 도구
│   ├── config/          # 설정 파일들
│   └── scripts/         # 빌드 스크립트
├── docs/                # 프로젝트 문서
└── .cursor/             # Cursor AI 설정
    └── rules/           # 기술별 베스트 프랙티스
```

## 📚 문서

### 📖 가이드
- [아키텍처 가이드](./docs/architecture.md) - 프로젝트 구조 및 패키지 관계
- [패키지 관리 가이드](./docs/package-management.md) - 패키지 추가/수정/삭제 방법
- [개발 환경 설정](./docs/development-setup.md) - 개발 환경 구축 방법
- [순환 의존성 방지](./docs/circular-dependency-prevention.md) - 순환 참조 방지 가이드

### 📦 Packages
- [@template/types](./packages/types/README.md) - 공통 타입 정의
- [@template/utils](./packages/utils/README.md) - 공통 유틸리티 함수
- [@template/api](./packages/api/README.md) - API 통신 라이브러리
- [@template/mocks](./packages/mocks/README.md) - API 모킹 (MSW 기반)
- [@template/theme](./packages/theme/README.md) - 디자인 토큰 및 테마 관리
- [@template/ui](./packages/ui/README.md) - UI 컴포넌트 라이브러리

### 🔧 Shared
- [shared/config](./shared/config/README.md) - 공통 설정 파일
- [shared/scripts](./shared/scripts/README.md) - 빌드 및 유틸리티 스크립트

## 🚀 빠른 시작

### 0. 개발 환경 설정

#### Git 설정 (필수)
이 프로젝트는 파일명의 대소문자를 구분하고 줄바꿈 문자를 일관되게 관리하므로 다음 설정이 필요합니다:

```bash
# 대소문자 구분 설정 (모든 개발자가 실행해야 함)
git config core.ignorecase false

# 줄바꿈 문자 설정 (운영체제별로 다름)
# Windows 사용자
git config --global core.autocrlf true

# Mac/Linux 사용자
git config --global core.autocrlf input
```

**중요:** 이 설정은 각 개발자가 개별적으로 실행해야 합니다. 설정하지 않으면 파일명 변경사항이 Git에서 추적되지 않거나 줄바꿈 문자 차이로 인한 불필요한 diff가 발생할 수 있습니다.

### 1. 의존성 설치

```bash
# PNPM 설치
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

# 테스팅 (TBD)
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

### WebSocket 배칭

실시간 데이터를 효율적으로 처리하기 위해 100ms 배칭을 구현합니다:

```typescript
const batchedMessages = useBatchedMessages(100);
```

## 📚 문서

- [Cursor AI 명령어 사용법](./CURSOR_COMMANDS.md) - Cursor AI 명령어 상세 가이드
- [모노레포 아키텍처 가이드](./docs/architecture.md) - 패키지 구조 및 데이터 흐름
- [모바일 배포 가이드](./docs/mobile-deployment.md) - React Native 앱 배포 방법
- [순환 의존성 방지](./docs/circular-dependency-prevention.md) - 모노레포에서 순환 의존성 방지

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
