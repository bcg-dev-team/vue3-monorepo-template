# BaseInput 컴포넌트 라이브러리

BaseInput 컴포넌트 라이브러리는 Vue 3와 TypeScript를 기반으로 한 재사용 가능한 입력 컴포넌트들의 모음입니다. 모든 컴포넌트는 `BaseInput`을 기반으로 하며, Figma 디자인 시스템과 일관성을 유지합니다.

## 📁 디렉토리 구조

```
BaseInput/
├── BaseInput.vue              # 공통 베이스 컴포넌트
├── types.ts                   # 타입 정의
├── index.ts                   # 메인 export 파일
├── README.md                  # 이 파일
├── InputText/                 # 텍스트 입력 컴포넌트
│   ├── InputText.vue
│   ├── InputText.scss
│   └── stories/
├── InputSelect/               # 셀렉트 박스 컴포넌트
│   ├── InputSelect.vue
│   ├── InputSelect.scss
│   └── stories/
├── InputStepper/              # 스테퍼 입력 컴포넌트
│   ├── InputStepper.vue
│   ├── InputStepper.scss
│   └── stories/
├── InputCalendar/             # 날짜 입력 컴포넌트
│   ├── InputCalendar.vue
│   ├── InputCalendar.scss
│   └── stories/
├── InputPassword/             # 비밀번호 입력 컴포넌트
│   ├── InputPassword.vue
│   ├── InputPassword.scss
│   └── stories/
├── InputTel/                  # 전화번호 입력 컴포넌트
│   ├── InputTel.vue
│   ├── InputTel.scss
│   └── stories/
├── InputSearch/               # 검색 입력 컴포넌트
│   ├── InputSearch.vue
│   ├── InputSearch.scss
│   └── stories/
├── InputEmail/                # 이메일 입력 컴포넌트
│   ├── InputEmail.vue
│   ├── InputEmail.scss
│   └── stories/
└── InputNumber/               # 숫자 입력 컴포넌트
    ├── InputNumber.vue
    ├── InputNumber.scss
    └── stories/
```

## 🎯 설계 원칙

### 1. 컴포넌트 상속 구조
- **BaseInput**: 모든 입력 컴포넌트의 공통 베이스
- **특화 컴포넌트**: 각각의 입력 타입에 특화된 기능 제공
- **타입 안전성**: TypeScript를 통한 강력한 타입 체크

### 2. Props 구조
```typescript
// 공통 Props (CommonInputProps)
interface CommonInputProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  fullWidth?: boolean;
}

// 특화 Props (예: TextInputProps)
interface TextInputProps extends CommonInputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel';
}
```

### 3. 일관된 API
- 모든 컴포넌트는 `v-model` 지원
- 표준 이벤트 (`focus`, `blur`) 지원
- 일관된 스타일링과 접근성

## 🚀 설치 및 사용법

### 설치
```bash
# 이미 프로젝트에 포함되어 있음
import { 
  BaseInput, 
  InputText, 
  InputSelect, 
  InputStepper,
  InputCalendar,
  InputPassword,
  InputTel,
  InputSearch,
  InputEmail,
  InputNumber 
} from '@template/ui';
```

### 기본 사용법

#### InputText (기본 텍스트 입력)
```vue
<template>
  <InputText
    v-model="textValue"
    placeholder="텍스트를 입력하세요"
    :clearable="true"
    label="이름"
    helper-text="실명을 입력해주세요"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputText } from '@template/ui';

const textValue = ref('');
</script>
```

#### InputSelect (셀렉트 박스)
```vue
<template>
  <InputSelect
    v-model="selectedValue"
    :options="options"
    placeholder="옵션을 선택하세요"
    :multiple="false"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputSelect } from '@template/ui';

const selectedValue = ref('');
const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' }
];
</script>
```

#### InputStepper (숫자 증감)
```vue
<template>
  <InputStepper
    v-model="numberValue"
    :min="0"
    :max="100"
    :step="1"
    :show-buttons="true"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputStepper } from '@template/ui';

const numberValue = ref(0);
</script>
```

#### InputCalendar (날짜 선택)
```vue
<template>
  <InputCalendar
    v-model="dateValue"
    placeholder="날짜를 선택하세요"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputCalendar } from '@template/ui';

const dateValue = ref('');
const minDate = '2024-01-01';
const maxDate = '2024-12-31';
</script>
```

#### InputPassword (비밀번호 입력)
```vue
<template>
  <InputPassword
    v-model="passwordValue"
    placeholder="비밀번호를 입력하세요"
    :show-strength="true"
    :show-strength-label="true"
    @strength-change="handleStrengthChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputPassword } from '@template/ui';

const passwordValue = ref('');

const handleStrengthChange = (strength) => {
  console.log('비밀번호 강도:', strength);
};
</script>
```

#### InputTel (전화번호 입력)
```vue
<template>
  <InputTel
    v-model="phoneValue"
    placeholder="전화번호를 입력하세요"
    :auto-format="true"
    :country-code="true"
    default-country="+82"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputTel } from '@template/ui';

const phoneValue = ref('');
</script>
```

#### InputSearch (검색 입력)
```vue
<template>
  <InputSearch
    v-model="searchValue"
    placeholder="검색어를 입력하세요"
    :clearable="true"
    :auto-complete="true"
    :suggestions="suggestions"
    :debounce="300"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputSearch } from '@template/ui';

const searchValue = ref('');
const suggestions = ['검색어1', '검색어2', '검색어3'];

const handleSearch = (value) => {
  console.log('검색 실행:', value);
};
</script>
```

#### InputEmail (이메일 입력)
```vue
<template>
  <InputEmail
    v-model="emailValue"
    placeholder="이메일을 입력하세요"
    :auto-complete="true"
    :domain-suggestions="domainSuggestions"
    :validate-on-blur="true"
    @validation="handleValidation"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputEmail } from '@template/ui';

const emailValue = ref('');
const domainSuggestions = ['gmail.com', 'naver.com', 'daum.net'];

const handleValidation = (isValid, errorMessage) => {
  console.log('유효성 검사:', isValid, errorMessage);
};
</script>
```

#### InputNumber (숫자 입력)
```vue
<template>
  <InputNumber
    v-model="numberValue"
    placeholder="숫자를 입력하세요"
    :min="0"
    :max="1000"
    :precision="2"
    :allow-negative="false"
    format="currency"
  />
</template>

<script setup>
import { ref } from 'vue';
import { InputNumber } from '@template/ui';

const numberValue = ref('');
</script>
```

## 📋 Props 상세 가이드

### 공통 Props (CommonInputProps)

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `modelValue` | `string` | `''` | 입력값 (v-model) |
| `placeholder` | `string` | `''` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `readonly` | `boolean` | `false` | 읽기 전용 여부 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 여부 |

### InputText Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel'` | `'text'` | 입력 타입 |
| `label` | `string` | `undefined` | 라벨 텍스트 |
| `helperText` | `string` | `undefined` | 도움말 텍스트 |
| `errorMessage` | `string` | `undefined` | 에러 메시지 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `clearable` | `boolean` | `false` | 지우기 버튼 표시 여부 |
| `required` | `boolean` | `false` | 필수 입력 여부 |

### InputSelect Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `options` | `Option[]` | `[]` | 선택 옵션 목록 |
| `multiple` | `boolean` | `false` | 다중 선택 여부 |

### InputStepper Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `min` | `number` | `0` | 최소값 |
| `max` | `number` | `undefined` | 최대값 |
| `step` | `number` | `1` | 증감 단위 |
| `showButtons` | `boolean` | `true` | 증감 버튼 표시 여부 |

### InputCalendar Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `minDate` | `string` | `undefined` | 최소 선택 가능 날짜 |
| `maxDate` | `string` | `undefined` | 최대 선택 가능 날짜 |
| `format` | `string` | `'YYYY-MM-DD'` | 날짜 포맷 |

### InputPassword Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `showStrength` | `boolean` | `true` | 비밀번호 강도 표시 여부 |
| `showStrengthLabel` | `boolean` | `true` | 비밀번호 강도 라벨 표시 여부 |
| `showStrengthDetails` | `boolean` | `false` | 비밀번호 강도 상세 정보 표시 여부 |
| `showCrackTime` | `boolean` | `false` | 크랙 시간 표시 여부 |
| `strength` | `PasswordStrengthDisplay \| null` | `null` | 비밀번호 강도 정보 |

### InputTel Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `autoFormat` | `boolean` | `true` | 자동 포맷팅 여부 |
| `format` | `string` | `'###-####-####'` | 전화번호 포맷 |
| `countryCode` | `boolean` | `false` | 국가 코드 표시 여부 |
| `defaultCountry` | `string` | `'+82'` | 기본 국가 코드 |

### InputSearch Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `clearable` | `boolean` | `true` | 지우기 버튼 표시 여부 |
| `autoComplete` | `boolean` | `false` | 자동완성 여부 |
| `suggestions` | `string[]` | `[]` | 자동완성 제안 목록 |
| `debounce` | `number` | `300` | 디바운스 시간 (ms) |

### InputEmail Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `autoComplete` | `boolean` | `true` | 자동완성 여부 |
| `domainSuggestions` | `string[]` | `['gmail.com', 'naver.com', 'daum.net', 'hanmail.net']` | 도메인 제안 목록 |
| `validateOnBlur` | `boolean` | `true` | 블러 시 유효성 검사 여부 |

### InputNumber Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `min` | `number` | `undefined` | 최소값 |
| `max` | `number` | `undefined` | 최대값 |
| `step` | `number` | `1` | 증감 단위 |
| `precision` | `number` | `0` | 소수점 자릿수 |
| `allowNegative` | `boolean` | `false` | 음수 허용 여부 |
| `format` | `'number' \| 'currency' \| 'percentage'` | `'number'` | 숫자 포맷팅 |

## 🎨 스타일링

### CSS 변수 (Design Tokens)
모든 컴포넌트는 Figma 디자인 시스템의 토큰을 사용합니다:

```css
/* 입력 필드 기본 스타일 */
.base-input-field {
  color: var(--input-text-primary);
  background-color: var(--input-bg-primary);
  border-color: var(--input-border-static);
}

/* 포커스 상태 */
.base-input-field:focus {
  border-color: var(--input-border-focus);
}

/* 비활성화 상태 */
.base-input-field:disabled {
  color: var(--input-text-disabled);
  background-color: var(--input-bg-disabled);
  border-color: var(--input-border-disabled);
}
```

### 커스텀 스타일링
각 컴포넌트는 자체 SCSS 파일을 가지고 있어 필요에 따라 스타일을 커스터마이징할 수 있습니다:

```scss
// InputText.scss 예시
.input-text-container {
  .input-text-label {
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .input-text-helper {
    color: var(--text-secondary);
    font-size: 12px;
    margin-top: 4px;
  }
  
  .input-text-error {
    color: var(--color-error);
    font-size: 12px;
    margin-top: 4px;
  }
}
```

## 🔧 고급 사용법

### 슬롯 활용
BaseInput은 세 가지 슬롯을 제공합니다:

```vue
<template>
  <BaseInput v-model="value">
    <!-- prefix: 입력창 내부 왼쪽 -->
    <template #prefix>
      <BaseIcon name="search" />
    </template>
    
    <!-- suffix: 입력창 내부 오른쪽 -->
    <template #suffix>
      <BaseIcon name="calendar" />
    </template>
    
    <!-- append: 입력창 외부 오른쪽 -->
    <template #append>
      <button type="button">확인</button>
    </template>
  </BaseInput>
</template>
```

### 이벤트 처리
모든 컴포넌트는 표준 이벤트를 지원합니다:

```vue
<template>
  <InputText
    v-model="value"
    @focus="handleFocus"
    @blur="handleBlur"
    @update:modelValue="handleInput"
  />
</template>

<script setup>
const handleFocus = (event) => {
  console.log('포커스:', event);
};

const handleBlur = (event) => {
  console.log('블러:', event);
};

const handleInput = (value) => {
  console.log('입력값 변경:', value);
};
</script>
```

### 유효성 검사
일부 컴포넌트는 내장 유효성 검사를 제공합니다:

```vue
<template>
  <InputEmail
    v-model="email"
    @validation="handleValidation"
  />
</template>

<script setup>
const handleValidation = (isValid, errorMessage) => {
  if (!isValid) {
    console.error('이메일 형식 오류:', errorMessage);
  }
};
</script>
```

## 🧪 테스트

### Storybook
각 컴포넌트는 Storybook 스토리를 포함하고 있습니다:

```bash
# Storybook 실행
pnpm storybook

# 특정 컴포넌트 스토리 확인
# http://localhost:6006/?path=/story/components-inputtext--default
```

### 단위 테스트
```bash
# 테스트 실행
pnpm test

# 특정 컴포넌트 테스트
pnpm test InputText
```

## 🔄 개발 가이드

### 새로운 Input 컴포넌트 추가하기

1. **디렉토리 생성**
```bash
mkdir InputCustom
cd InputCustom
touch InputCustom.vue InputCustom.scss
mkdir stories
touch stories/InputCustom.stories.ts
```

2. **컴포넌트 구현**
```vue
<!-- InputCustom.vue -->
<template>
  <BaseInput
    v-model="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :full-width="fullWidth"
    @update:modelValue="$emit('update:modelValue', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <!-- 커스텀 슬롯 -->
  </BaseInput>
</template>

<script setup lang="ts">
import BaseInput from '../BaseInput.vue';
import type { CommonInputProps } from '../types';

interface Props extends CommonInputProps {
  // 커스텀 props
}

const props = withDefaults(defineProps<Props>(), {
  // 기본값 설정
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();
</script>

<style lang="scss" scoped>
@import './InputCustom.scss';
</style>
```

3. **타입 정의 추가** (필요한 경우)
```typescript
// types.ts에 추가
export interface CustomInputProps extends CommonInputProps {
  // 커스텀 타입 정의
}
```

4. **Export 추가**
```typescript
// index.ts에 추가
export { default as InputCustom } from './InputCustom/InputCustom.vue';
```

5. **Storybook 스토리 작성**
```typescript
// stories/InputCustom.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import InputCustom from '../InputCustom.vue';

const meta: Meta<typeof InputCustom> = {
  title: 'Components/InputCustom',
  component: InputCustom,
  parameters: {
    docs: {
      description: {
        component: '커스텀 입력 컴포넌트 설명'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '커스텀 입력'
  }
};
```

## 📚 추가 리소스

- [Figma 디자인 시스템](링크)
- [Vue 3 Composition API 가이드](https://vuejs.org/guide/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
