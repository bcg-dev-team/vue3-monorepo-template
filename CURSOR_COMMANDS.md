# Cursor AI 명령어 사용법

## 🚀 **실제 동작하는 방법들**

### ✅ **방법 1: Chat에서 직접 입력 (가장 확실한 방법)**

1. **Cmd + L** 또는 **Cmd + K** - Chat 열기
2. 다음 중 하나를 **전체 입력**:
   - `vue:create-component` - Vue 컴포넌트 생성
   - `vue:create-test` - 테스트 생성
   - `vue:create-storybook` - Storybook 생성
   - `@commands` - 모든 명령어 목록 보기

### ✅ **방법 2: 간단한 키워드 사용 (추천)**

Chat에서 다음 키워드들만 입력:

- `vue component` - Vue 컴포넌트 생성
- `vue package` - 패키지 생성
- `vue api` - API 서비스 생성
- `vue storybook` - Storybook 스토리 생성
- `vue test` - 테스트 생성
- `vue performance` - 성능 최적화
- `vue pinia` - Pinia 스토어 생성
- `vue vuetify` - Vuetify 컴포넌트 생성
- `vue tailwind` - Tailwind 컴포넌트 생성
- `vue e2e` - E2E 테스트 생성
- `vue bundle` - 번들 최적화
- `vue docs` - 문서화 생성

### ✅ **방법 3: 명령어 팔레트에서 수동 검색**

1. **Cmd + Shift + P** - 명령어 팔레트 열기
2. `cursor` 입력
3. 원하는 명령어 선택

### ✅ **방법 4: 복사해서 붙여넣기**

다음 명령어들을 복사해서 Chat에 붙여넣기:

```bash
# Vue 컴포넌트 생성
Create a Vue 3 component with TypeScript, performance optimizations, and Storybook integration. Follow the monorepo structure and include proper testing.

# 패키지 생성
Create a new package in the monorepo structure with proper TypeScript configuration, testing setup, and Storybook integration.

# API 서비스 생성
Create an API service with WebSocket multiplexing, data batching, and proper error handling. Include TypeScript types and comprehensive testing.

# Storybook 스토리 생성
Create a comprehensive Storybook story for the current component with multiple variants, controls, and accessibility testing.

# 테스트 생성
Create a comprehensive test suite for the current file including unit tests, component tests, and performance tests.
```

## 📋 **사용 가능한 명령어**

### Vue 관련 명령어

- `vue:create-component` - Vue 3 컴포넌트 생성 (TypeScript + Storybook)
- `vue:create-package` - 새로운 패키지 생성
- `vue:create-api-service` - API 서비스 생성 (WebSocket 지원)
- `vue:create-storybook` - Storybook 스토리 생성
- `vue:create-test` - 종합 테스트 스위트 생성
- `vue:add-performance` - 성능 최적화 추가
- `vue:create-pinia-store` - Pinia 스토어 생성
- `vue:create-vuetify` - Vuetify 컴포넌트 래퍼 생성
- `vue:create-tailwind` - Tailwind CSS 컴포넌트 생성
- `vue:create-e2e` - Cypress E2E 테스트 생성
- `vue:optimize-bundle` - 번들 크기 및 성능 최적화
- `vue:create-docs` - 컴포넌트 문서 생성

## 🎯 **명령어 사용 예시**

### Vue 컴포넌트 생성

#### 기본 사용법

```bash
vue:create-component
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-component

사용자 프로필 카드 컴포넌트를 만들어주세요.
- 사용자 이름, 이메일, 아바타 이미지 표시
- 편집 모드 지원 (인라인 편집)
- 반응형 디자인 (모바일/데스크톱)
- 다크모드 지원
- 접근성 고려
```

#### 간단한 키워드로 사용

```bash
vue component

사용자 프로필 카드 컴포넌트를 만들어주세요.
- 사용자 이름, 이메일, 아바타 이미지 표시
- 편집 모드 지원 (인라인 편집)
- 반응형 디자인 (모바일/데스크톱)
- 다크모드 지원
- 접근성 고려
```

### 패키지 생성

#### 기본 사용법

```bash
vue:create-package
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-package

차트 라이브러리 패키지를 만들어주세요.
- 라인 차트, 바 차트, 파이 차트 지원
- 실시간 데이터 업데이트
- 커스터마이징 가능한 테마
- TypeScript 타입 정의
- Storybook 예시 포함
```

### API 서비스 생성

#### 기본 사용법

```bash
vue:create-api-service
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-api-service

사용자 관리 API 서비스를 만들어주세요.
- 사용자 CRUD 작업
- JWT 인증 토큰 관리
- 실시간 알림 (WebSocket)
- 에러 핸들링 및 재시도 로직
- 요청/응답 인터셉터
```

### Storybook 스토리 생성

#### 기본 사용법

```bash
vue:create-storybook
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-storybook

현재 컴포넌트의 Storybook 스토리를 만들어주세요.
- 모든 props 조합에 대한 스토리
- 다크모드/라이트모드 변형
- 모바일/데스크톱 뷰포트
- 접근성 테스트 케이스
- 인터랙션 테스트
```

### 테스트 생성

#### 기본 사용법

```bash
vue:create-test
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-test

현재 컴포넌트의 종합 테스트를 만들어주세요.
- Props 검증 테스트
- 이벤트 발생 테스트
- 사용자 인터랙션 테스트
- 에러 상태 테스트
- 성능 테스트 (렌더링 시간)
```

### Pinia 스토어 생성

#### 기본 사용법

```bash
vue:create-pinia-store
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:create-pinia-store

쇼핑 카트 스토어를 만들어주세요.
- 상품 추가/제거/수량 변경
- 할인 쿠폰 적용
- 배송비 계산
- 로컬 스토리지 동기화
- 실시간 재고 확인
```

### 성능 최적화

#### 기본 사용법

```bash
vue:add-performance
```

#### 구체적인 요구사항과 함께 사용

```bash
vue:add-performance

현재 컴포넌트에 성능 최적화를 적용해주세요.
- 가상 스크롤링 (1000개 이상 아이템)
- 이미지 지연 로딩
- 메모이제이션 (computed, watch)
- 이벤트 디바운싱
- 메모리 누수 방지
```

## 🎯 **권장 워크플로우**

### Vue 컴포넌트 개발

1. **Cmd + L** - Chat 열기
2. `vue component` 입력 - 컴포넌트 생성 요청
3. 구체적인 요구사항 설명 추가
4. AI가 TypeScript, 성능 최적화, Storybook이 포함된 컴포넌트 생성
5. `vue storybook` 입력 - Storybook 스토리 생성
6. `vue test` 입력 - 테스트 생성

### 패키지 개발

1. **Cmd + L** - Chat 열기
2. `vue package` 입력 - 패키지 생성
3. 구체적인 요구사항 설명 추가
4. AI가 모노레포 구조에 맞는 패키지 생성

## ⚠️ **문제 해결**

### 명령어가 보이지 않는 경우

1. **Cursor AI IDE를 완전히 재시작** (Cmd + Q 후 다시 실행)
2. **Cmd + L**로 Chat 열고 `@commands` 입력하여 명령어 목록 확인
3. 명령어 팔레트에서 `cursor` 검색

### Chat에서 포커스가 빠져나가는 경우

- **Cmd + L** 또는 **Cmd + K**로 Chat을 다시 열고 명령어 입력
- 간단한 키워드 사용 (예: `vue component`)

### 명령어 실행이 안 되는 경우

1. **Cursor AI IDE 완전 재시작**
2. Chat에서 `@commands` 입력하여 명령어 목록 확인
3. 명령어 팔레트에서 `cursor` 검색

## 💡 **최고의 사용법**

**가장 확실하고 빠른 방법:**

1. **Cmd + L** - Chat 열기
2. `vue component` 입력 (간단한 키워드)
3. **Enter 키** - AI가 컴포넌트 생성
4. **추가 요구사항 설명** - 구체적인 기능 요청

**또는 전체 명령어 입력:**

1. **Cmd + L** - Chat 열기
2. `vue:create-component` 입력 (전체 명령어)
3. **Enter 키** - AI가 컴포넌트 생성
4. **추가 요구사항 설명** - 구체적인 기능 요청

이 방법들이 가장 안정적이고 빠릅니다!

---

## 📝 **빠른 참조 - 복사해서 사용하세요**

### 간단한 키워드 (추천)

```
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
```

### 전체 명령어

```
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

### 긴 프롬프트 (복사해서 붙여넣기)

```
Create a Vue 3 component with TypeScript, performance optimizations, and Storybook integration. Follow the monorepo structure and include proper testing.
```

### 구체적인 요구사항 예시

```
사용자 프로필 카드 컴포넌트를 만들어주세요.
- 사용자 이름, 이메일, 아바타 이미지 표시
- 편집 모드 지원 (인라인 편집)
- 반응형 디자인 (모바일/데스크톱)
- 다크모드 지원
- 접근성 고려
```
