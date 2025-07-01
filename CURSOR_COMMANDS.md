# 🚀 Cursor AI 명령어 빠른 참조

## ⌨️ 키보드 단축키 (가장 빠른 방법)

| 단축키               | 기능              | 설명                                                  |
| -------------------- | ----------------- | ----------------------------------------------------- |
| `Cmd/Ctrl + Alt + C` | 컴포넌트 생성     | Vue 3 컴포넌트 + TypeScript + 성능 최적화 + Storybook |
| `Cmd/Ctrl + Alt + P` | 패키지 생성       | 모노레포 패키지 + TypeScript 설정 + 테스팅            |
| `Cmd/Ctrl + Alt + A` | API 서비스 생성   | WebSocket + 배칭 + 에러 처리 + 타입 정의              |
| `Cmd/Ctrl + Alt + S` | Storybook 스토리  | 컴포넌트 스토리 + 변형 + 컨트롤 + 접근성              |
| `Cmd/Ctrl + Alt + T` | 테스트 스위트     | 단위 테스트 + 컴포넌트 테스트 + 성능 테스트           |
| `Cmd/Ctrl + Alt + O` | 성능 최적화       | Virtual Scrolling + 메모이제이션 + 정리 작업          |
| `Cmd/Ctrl + Alt + U` | Pinia 스토어 생성 | TypeScript + 상태 관리 + getters + actions            |
| `Cmd/Ctrl + Alt + V` | Vuetify 컴포넌트  | Props + Events + Slots + 접근성                       |
| `Cmd/Ctrl + Alt + W` | Tailwind 컴포넌트 | 반응형 디자인 + 커스텀 유틸리티 + 스타일링 패턴       |
| `Cmd/Ctrl + Alt + E` | E2E 테스트 생성   | Cypress + 사용자 플로우 + 선택자 + 검증               |
| `Cmd/Ctrl + Alt + B` | 번들 최적화       | 코드 분할 + 트리 셰이킹 + 성능 개선                   |
| `Cmd/Ctrl + Alt + D` | 문서화 생성       | JSDoc + README + 사용 예시                            |

## 💬 Chat 패널 프롬프트

### 컴포넌트 개발

```bash
# Vue 3 컴포넌트 생성
"Create a Vue 3 component with TypeScript, performance optimizations, and Storybook integration. Follow the monorepo structure and include proper testing."

# Pinia 스토어 생성
"Create a Pinia store with TypeScript, proper state management, getters, actions, and comprehensive testing."

# Vuetify 컴포넌트 래퍼
"Create a Vuetify component wrapper with proper props, events, slots, and accessibility features."

# Tailwind CSS 컴포넌트
"Create a component using Tailwind CSS with responsive design, custom utilities, and proper styling patterns."
```

### 패키지 및 서비스

```bash
# 모노레포 패키지 생성
"Create a new package in the monorepo structure with proper TypeScript configuration, testing setup, and Storybook integration."

# API 서비스 생성
"Create an API service with WebSocket multiplexing, data batching, and proper error handling. Include TypeScript types and comprehensive testing."

# 도메인 설정 생성
"Create a domain configuration file with API endpoints, UI theme, feature flags, and performance settings."
```

### 테스팅 및 문서화

```bash
# 테스트 스위트 생성
"Create a comprehensive test suite for the current file including unit tests, component tests, and performance tests."

# E2E 테스트 생성
"Create a comprehensive Cypress E2E test for user flows with proper selectors, assertions, and error handling."

# Storybook 스토리 생성
"Create a comprehensive Storybook story for the current component with multiple variants, controls, and accessibility testing."

# 문서화 생성
"Create comprehensive documentation for the current component including JSDoc, README, and usage examples."
```

### 성능 및 최적화

```bash
# 성능 최적화 적용
"Add performance optimizations to the current component including virtual scrolling, memoization, and proper cleanup."

# 번들 최적화
"Analyze and optimize the current bundle size, implement code splitting, tree shaking, and performance improvements."

# 모노레포 설정
"Setup the complete monorepo structure with PNPM workspace, shared packages, and proper TypeScript configuration."

# Git 훅 설정
"Setup Git hooks with Husky, Conventional Commits validation, and pre-commit linting/formatting."
```

## 🎯 사용 팁

### 1. 컨텍스트 활용

- 파일을 열고 해당 파일에서 명령어 실행
- 선택한 코드가 있으면 자동으로 컨텍스트에 포함
- Chat 패널에서 "현재 파일을 기반으로..." 추가

### 2. 구체적인 요청

```bash
# 좋은 예시
"Create a user profile component with avatar, name, email, and role display. Include loading states and error handling."

# 나쁜 예시
"Create a component"
```

### 3. Rule 기반 프롬프트

```bash
# Vue 베스트 프랙티스 적용
"Following Vue best practices, create a..."

# TypeScript 엄격 모드 적용
"With strict TypeScript, create a..."

# 성능 최적화 포함
"With performance optimization, create a..."
```

## 🔧 문제 해결

### 명령어가 작동하지 않는 경우

1. **Cursor 재시작**: Cursor를 완전히 종료하고 재시작
2. **설정 확인**: `.vscode/settings.json` 파일이 올바른지 확인
3. **키보드 단축키**: `Cmd/Ctrl + Shift + V` 조합 사용
4. **Chat 패널**: 직접 프롬프트 입력

### 성능 이슈

1. **파일 크기**: 너무 큰 파일은 청크로 나누어 요청
2. **컨텍스트 제한**: 필요한 부분만 선택하여 요청
3. **단계별 요청**: 복잡한 작업은 여러 단계로 나누어 요청

## 📚 추가 리소스

- [Cursor AI 공식 문서](https://cursor.sh/docs)
- [Vue 3 공식 문서](https://vuejs.org/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Vite 가이드](https://vitejs.dev/guide/)

---

**💡 팁**: 가장 효과적인 방법은 키보드 단축키를 사용하는 것입니다. 자주 사용하는 명령어는 단축키로 설정하여 빠르게 접근하세요!
