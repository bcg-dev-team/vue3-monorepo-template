# BaseInput 컴포넌트 라이브러리

BaseInput 컴포넌트 라이브러리는 Vue 3와 TypeScript를 기반으로 한 재사용 가능한 입력 컴포넌트들의 모음입니다. **Factory 패턴**을 사용하여 모든 Input 타입을 통합 관리하며, Figma 디자인 시스템과 일관성을 유지합니다.

## 🎯 설계 원칙

### 1. Factory 패턴
- **InputFactory**: 단일 컴포넌트로 모든 Input 타입 지원
- **타입별 분기**: 단순한 타입은 HTML input 직접 사용, 복잡한 타입은 별도 컴포넌트 사용
- **일관된 API**: 모든 타입이 동일한 props와 이벤트를 지원

### 2. 컴포넌트 분류
- **단순 타입**: `text`, `email`, `search`, `tel`, `number` (HTML input 직접 사용)
- **복잡한 타입**: `select`, `date`, `stepper`, `password` (별도 컴포넌트 사용)

### 3. Props 구조
```typescript
interface CommonInputProps {
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  fullWidth?: boolean;
}

interface InputFactoryProps extends CommonInputProps {
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'number' | 'date' | 'select' | 'stepper';
  options?: Array<{ value: string; label: string; disabled?: boolean }>; // select용
  min?: number; // number, stepper용
  max?: number; // number, stepper용
  step?: number; // number, stepper용
}
```

## 📁 디렉토리 구조

```
BaseInput/
├── InputFactory.vue              # 🆕 Factory 컴포넌트 (모든 타입 통합)
├── types.ts                      # 타입 정의
├── index.ts                      # 메인 export 파일
├── README.md                     # 이 파일
├── styles/
│   └── _input-base.scss         # 🆕 공통 스타일
├── InputSelect/                  # ✅ 유지 (Headless UI 적용)
│   ├── InputSelect.vue
│   └── InputSelect.scss
├── InputCalendar/                # ✅ 유지 (날짜 선택기)
│   ├── InputCalendar.vue
│   └── InputCalendar.scss
├── InputStepper/                 # ✅ 유지 (증감 버튼)
│   ├── InputStepper.vue
│   └── InputStepper.scss
├── InputPassword/                # ✅ 유지 (비밀번호 토글)
│   ├── InputPassword.vue
│   └── InputPassword.scss
└── __stories__/
    └── InputFactory.stories.ts   # 🆕 Factory 스토리
```

## 🚀 설치 및 사용법

### 설치
```bash
# 이미 프로젝트에 포함되어 있음
import { BaseInput } from '@template/ui';
```

### 기본 사용법 (Factory 패턴)

```vue
<template>
  <!-- 단순 타입들 -->
  <BaseInput v-model="textValue" type="text" placeholder="텍스트 입력" />
  <BaseInput v-model="emailValue" type="email" placeholder="이메일 입력" />
  <BaseInput v-model="searchValue" type="search" placeholder="검색어 입력" />
  <BaseInput v-model="telValue" type="tel" placeholder="전화번호 입력" />
  <BaseInput v-model="numberValue" type="number" :min="0" :max="100" :step="1" />
  
  <!-- 복잡한 타입들 -->
  <BaseInput 
    v-model="selectValue" 
    type="select" 
    :options="[
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' }
    ]"
    placeholder="선택해주세요"
  />
  
  <BaseInput v-model="dateValue" type="date" />
  <BaseInput v-model="stepperValue" type="stepper" :min="0" :max="100" :step="5" />
  <BaseInput v-model="passwordValue" type="password" placeholder="비밀번호 입력" />
</template>
```

### 개별 컴포넌트 사용 (기존 방식)

```vue
<template>
  <InputSelect v-model="selectValue" :options="options" />
  <InputCalendar v-model="dateValue" />
  <InputStepper v-model="stepperValue" :min="0" :max="100" :step="5" />
  <InputPassword v-model="passwordValue" />
</template>
```

## 🎨 스타일링

### 공통 스타일
```scss
.input-base {
  @apply px-3 py-2 border border-gray-300 rounded-md transition-all duration-200;
  @apply text-sm text-gray-900 placeholder-gray-500;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
  @apply disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500;
}
```

### 타입별 스타일
- **단순 타입**: `input-base` 클래스 상속
- **복잡한 타입**: 각각의 전용 스타일 + `input-base` 상속

## 🔧 Props

### 공통 Props
| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `modelValue` | `string \| number` | `undefined` | 입력값 (v-model) |
| `placeholder` | `string` | `undefined` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `readonly` | `boolean` | `false` | 읽기 전용 여부 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 여부 |

### 타입별 Props
| Prop | 타입 | 기본값 | 지원 타입 | 설명 |
|------|------|--------|-----------|------|
| `type` | `string` | `'text'` | 모든 타입 | 입력 타입 |
| `options` | `Array` | `[]` | `select` | 선택 옵션들 |
| `min` | `number` | `undefined` | `number`, `stepper` | 최소값 |
| `max` | `number` | `undefined` | `number`, `stepper` | 최대값 |
| `step` | `number` | `undefined` | `number`, `stepper` | 증감 단위 |

## 📡 Events

| Event | Payload | 설명 |
|-------|---------|------|
| `update:model-value` | `value: string \| number` | 값 변경 시 발생 |
| `focus` | - | 포커스 시 발생 |
| `blur` | - | 블러 시 발생 |
| `input` | `event: Event` | 입력 시 발생 |

## 🎯 사용 시나리오

### 1. 단일 Input 사용
```vue
<BaseInput v-model="username" type="text" placeholder="사용자명" />
```

### 2. 폼에서 다양한 타입 사용
```vue
<template>
  <form @submit="handleSubmit" class="space-y-4">
    <BaseInput v-model="form.email" type="email" placeholder="이메일" required />
    <BaseInput v-model="form.password" type="password" placeholder="비밀번호" required />
    <BaseInput v-model="form.phone" type="tel" placeholder="전화번호" />
    <BaseInput 
      v-model="form.category" 
      type="select" 
      :options="categories"
      placeholder="카테고리 선택"
    />
    <BaseInput v-model="form.age" type="number" :min="18" :max="100" />
    <BaseInput v-model="form.birthdate" type="date" />
    
    <button type="submit">제출</button>
  </form>
</template>
```

### 3. 반응형 레이아웃
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <BaseInput v-model="firstName" type="text" placeholder="이름" :fullWidth="true" />
    <BaseInput v-model="lastName" type="text" placeholder="성" :fullWidth="true" />
  </div>
</template>
```

## 🚀 성능 최적화

### 1. 동적 컴포넌트 로딩
- 복잡한 타입 컴포넌트는 `defineAsyncComponent`로 지연 로딩
- 번들 크기 최적화

### 2. 조건부 렌더링
- 단순 타입은 HTML input 직접 사용
- 복잡한 타입만 별도 컴포넌트 사용

### 3. Props 최적화
- 필요한 props만 전달
- 불필요한 리렌더링 방지

## 🔍 마이그레이션 가이드

### 기존 코드에서 Factory 패턴으로 변경

**Before (기존 방식):**
```vue
<InputText v-model="textValue" placeholder="텍스트" />
<InputEmail v-model="emailValue" placeholder="이메일" />
<InputSelect v-model="selectValue" :options="options" />
```

**After (Factory 패턴):**
```vue
<BaseInput v-model="textValue" type="text" placeholder="텍스트" />
<BaseInput v-model="emailValue" type="email" placeholder="이메일" />
<BaseInput v-model="selectValue" type="select" :options="options" />
```

## 🧪 테스트

### Storybook
- 모든 타입별 스토리 제공
- 상태별 스토리 (기본, 비활성화, 읽기 전용, 전체 너비)
- 자동 문서화 (`autodocs` 태그)

### 단위 테스트
```typescript
// InputFactory.test.ts
describe('InputFactory', () => {
  it('단순 타입은 HTML input을 렌더링해야 함', () => {
    // 테스트 구현
  })
  
  it('복잡한 타입은 해당 컴포넌트를 렌더링해야 함', () => {
    // 테스트 구현
  })
})
```

## 🔮 향후 계획

1. **추가 타입 지원**: `textarea`, `file`, `range` 등
2. **검증 기능**: 내장 유효성 검사 및 에러 표시
3. **테마 지원**: 다크/라이트 모드
4. **접근성 개선**: ARIA 라벨, 키보드 네비게이션
5. **국제화**: 다국어 지원

## 📚 참고 자료

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Headless UI](https://headlessui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
