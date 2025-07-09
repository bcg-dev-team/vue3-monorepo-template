# @template/ui - Naive UI 기반 디자인 시스템

Vue 3 + Naive UI 기반의 디자인 토큰 기반 UI 컴포넌트 라이브러리입니다.

## 🎯 **목표**

1. **피그마와 코드의 간극 최소화**: 피그마를 Single Source of Truth로 활용
2. **Naive UI 기반 일관된 UX**: Naive UI의 강력한 컴포넌트 시스템 활용
3. **디자인 토큰 기반 테마**: 기존 디자인 토큰을 Naive UI 테마로 변환
4. **완전한 문서화**: Storybook을 통한 시각적 테스트 및 문서화

## 🏗️ **아키텍처**

### 디자인 토큰 구조

```
src/tokens/
├── base/           # 기본 토큰 (색상, 타이포그래피, 간격 등)
├── themes/         # 프로젝트별 테마
│   ├── default/    # 기본 테마
│   ├── project-a/  # 프로젝트 A 테마
│   └── project-b/  # 프로젝트 B 테마
├── components/     # 컴포넌트별 토큰
└── icons/          # 아이콘 토큰
```

### 컴포넌트 구조

```
src/components/
├── BaseButton.vue  # Naive UI 기반 버튼 래퍼
├── BaseInput.vue   # Naive UI 기반 입력 필드 래퍼
└── BaseForm.vue    # Naive UI 기반 폼 래퍼
```

**참고**: Naive UI의 모든 컴포넌트를 직접 사용할 수 있으며, 디자인 토큰 기반 테마가 적용됩니다.

## 🚀 **구축 로드맵**

### Phase 1: 디자인 토큰 관리 체계 구축

- [ ] 멀티 테마 지원 구조 설계
- [ ] Style Dictionary 설정 개선
- [ ] 피그마 토큰 추출 스크립트 개발
- [ ] 토큰 검증 시스템 구축

### Phase 2: 피그마 연동 자동화

- [ ] 피그마 API 연동 설정
- [ ] 토큰 자동 추출 스크립트
- [ ] 아이콘 SVG 추출 및 최적화
- [ ] CI/CD 파이프라인 구축

### Phase 3: 컴포넌트 시스템 구축

- [x] Naive UI 기반 컴포넌트 래퍼 개발 (BaseButton, BaseInput, BaseForm)
- [ ] 추가 컴포넌트 래퍼 개발
- [ ] Storybook 고급 설정
- [ ] 시각적 회귀 테스트 설정
- [ ] 접근성 테스트 자동화

### Phase 4: 문서화 및 배포

- [ ] 완전한 Storybook 문서화
- [ ] 컴포넌트 사용 가이드
- [ ] 디자인 시스템 가이드
- [ ] 배포 자동화

## 🛠️ **개발 가이드**

### 토큰 추가하기

```bash
# 1. 피그마에서 토큰 정의
# 2. 토큰 추출 스크립트 실행
pnpm run extract:tokens

# 3. Style Dictionary 빌드
pnpm run build:tokens
```

### 컴포넌트 개발하기

```bash
# 1. 컴포넌트 생성
pnpm run create:component --name Button

# 2. Storybook에서 개발
pnpm run storybook

# 3. 테스트 작성
pnpm run test
```

### 테마 추가하기

```bash
# 1. 테마 토큰 정의
# 2. 테마 등록
# 3. 빌드 및 배포
```

## 📦 **사용법**

### 설치

```bash
pnpm add @template/ui naive-ui
```

### 기본 사용법

```vue
<template>
  <div>
    <BaseButton variant="primary" @click="handleClick"> 클릭하세요 </BaseButton>

    <BaseInput v-model="inputValue" label="이름" placeholder="이름을 입력하세요" required />

    <BaseForm :model="formData" :rules="rules" @submit="handleSubmit">
      <!-- 폼 내용 -->
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, BaseInput, BaseForm } from '@template/ui';
import { ref } from 'vue';

const inputValue = ref('');
const formData = ref({
  name: '',
  email: '',
});

const rules = {
  name: {
    required: true,
    message: '이름을 입력해주세요',
    trigger: 'blur',
  },
};

const handleClick = () => {
  console.log('버튼 클릭됨');
};

const handleSubmit = (values: Record<string, any>) => {
  console.log('폼 제출:', values);
};
</script>
```

### Naive UI 컴포넌트 직접 사용

```vue
<template>
  <div>
    <NButton type="primary" @click="handleClick"> Naive UI 버튼 </NButton>

    <NInput v-model:value="inputValue" placeholder="입력하세요" />

    <NCard title="카드 제목"> 카드 내용 </NCard>
  </div>
</template>

<script setup lang="ts">
import { NButton, NInput, NCard } from '@template/ui';
import { ref } from 'vue';

const inputValue = ref('');

const handleClick = () => {
  console.log('버튼 클릭됨');
};
</script>
```

### 테마 적용

```typescript
import { createApp } from 'vue';
import { createNaiveTheme } from '@template/ui/themes';
import { NConfigProvider } from '@template/ui';

const app = createApp(App);

// 커스텀 테마 적용
const theme = createNaiveTheme();

app.component('NConfigProvider', NConfigProvider);
```

```vue
<template>
  <NConfigProvider :theme-overrides="theme">
    <App />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { createNaiveTheme } from '@template/ui/themes';

const theme = createNaiveTheme();
</script>
```

## 🧪 **테스팅**

### 시각적 테스트

```bash
# Storybook에서 시각적 테스트
pnpm run storybook

# 시각적 회귀 테스트
pnpm run test:visual
```

### 단위 테스트

```bash
# 컴포넌트 테스트
pnpm run test

# 커버리지 리포트
pnpm run test:coverage
```

### 접근성 테스트

```bash
# 접근성 검사
pnpm run test:a11y
```

## 📚 **문서**

- [디자인 토큰 가이드](./docs/tokens.md)
- [컴포넌트 개발 가이드](./docs/components.md)
- [테마 커스터마이징 가이드](./docs/themes.md)
- [Storybook 사용법](./docs/storybook.md)

## 🔧 **개발 환경 설정**

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# Storybook 실행
pnpm run storybook

# 빌드
pnpm run build
```
