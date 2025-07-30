# @template/ui

Headless UI + Tailwind CSS 기반 UI 컴포넌트 패키지입니다. 재사용 가능한 컴포넌트들을 제공하며 Storybook을 통한 문서화를 지원합니다.

## 📦 설치

```bash
pnpm add @template/ui
```

## 🚀 사용법

### 기본 사용법

```vue
<template>
  <BaseButton variant="primary" size="md" @click="handleClick">
    클릭하세요
  </BaseButton>
</template>

<script setup lang="ts">
import { BaseButton } from '@template/ui'

const handleClick = () => {
  console.log('버튼 클릭됨!')
}
</script>
```

### 컴포넌트 전체 가져오기

```typescript
import { 
  BaseButton,
  BaseInput,
  BaseTable,
  BaseIcon,
  BaseCheckbox,
  BaseChip,
  BasePagination,
  BaseTabs
} from '@template/ui'
```

### 개별 컴포넌트 가져오기

```typescript
// 특정 컴포넌트만 가져오기
import { BaseButton } from '@template/ui/components/BaseButton'
import { BaseInput } from '@template/ui/components/BaseInput'
```

## 📁 파일 구조

```
src/
├── index.ts              # 메인 진입점
├── components/           # UI 컴포넌트들
│   ├── BaseButton/       # 버튼 컴포넌트
│   │   ├── BaseButton.vue
│   │   ├── BaseButton.scss
│   │   ├── BaseFileUploadButton.vue
│   │   └── __stories__/
│   │       ├── BaseButton.stories.ts
│   │       └── BaseFileUploadButton.stories.ts
│   ├── BaseInput/        # 입력 컴포넌트
│   │   ├── BaseInput.vue
│   │   ├── BaseInput.scss
│   │   ├── BaseInputCalendar.vue
│   │   ├── BaseInputSelect.vue
│   │   └── __stories__/
│   │       ├── BaseInput.stories.ts
│   │       ├── BaseInputCalendar.stories.ts
│   │       └── BaseInputSelect.stories.ts
│   ├── BaseTable/        # 테이블 컴포넌트
│   │   ├── BaseTable.vue
│   │   ├── BaseTableBody.vue
│   │   ├── BaseTableCell.vue
│   │   ├── BaseTableHeader.vue
│   │   └── __stories__/
│   │       ├── BaseTable.stories.ts
│   │       ├── BaseTableBody.stories.ts
│   │       └── BaseTableCell.stories.ts
│   ├── BaseIcon/         # 아이콘 컴포넌트
│   │   ├── BaseIcon.vue
│   │   ├── BaseIcon.scss
│   │   ├── iconRegistry.ts
│   │   ├── icons/
│   │   │   ├── HomeIcon.vue
│   │   │   ├── PlusIcon.vue
│   │   │   └── index.ts
│   │   └── __stories__/
│   │       └── BaseIcon.stories.ts
│   ├── BaseCheckbox/     # 체크박스 컴포넌트
│   ├── BaseChips/        # 칩 컴포넌트
│   ├── BasePagination/   # 페이지네이션 컴포넌트
│   ├── BaseTabs/         # 탭 컴포넌트
│   └── index.ts
├── composables/          # Vue 컴포저블
│   ├── index.ts
│   ├── useBreakpoint.ts
│   ├── useForm.ts
│   ├── useModal.ts
│   └── useTheme.ts
├── assets/               # 정적 자산
│   └── icons/            # SVG 아이콘들
├── types/                # 타입 정의
│   ├── components.ts
│   ├── icons.ts
│   └── svg.d.ts
└── stories/              # Storybook 스토리
    ├── DesignTokens.stories.ts
    └── Foundations/
```

## 🔧 주요 컴포넌트

### BaseButton

```vue
<template>
  <!-- 기본 버튼 -->
  <BaseButton>기본 버튼</BaseButton>
  
  <!-- 변형 버튼 -->
  <BaseButton variant="primary">Primary 버튼</BaseButton>
  <BaseButton variant="secondary">Secondary 버튼</BaseButton>
  <BaseButton variant="outline">Outline 버튼</BaseButton>
  
  <!-- 크기 -->
  <BaseButton size="sm">작은 버튼</BaseButton>
  <BaseButton size="md">중간 버튼</BaseButton>
  <BaseButton size="lg">큰 버튼</BaseButton>
  
  <!-- 상태 -->
  <BaseButton disabled>비활성화 버튼</BaseButton>
  <BaseButton loading>로딩 버튼</BaseButton>
</template>
```

### BaseInput

```vue
<template>
  <!-- 기본 입력 -->
  <BaseInput v-model="value" placeholder="입력하세요" />
  
  <!-- 라벨과 함께 -->
  <BaseInput 
    v-model="email" 
    label="이메일" 
    type="email" 
    placeholder="example@email.com"
    :error="emailError"
  />
  
  <!-- 검색 입력 -->
  <BaseInput 
    v-model="searchQuery" 
    type="search" 
    placeholder="검색어를 입력하세요"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@template/ui'

const value = ref('')
const email = ref('')
const searchQuery = ref('')
const emailError = ref('')

const handleSearch = (query: string) => {
  console.log('검색:', query)
}
</script>
```

### BaseTable

```vue
<template>
  <BaseTable :data="tableData" :columns="columns">
    <template #header="{ column }">
      <BaseTableHeader>{{ column.label }}</BaseTableHeader>
    </template>
    
    <template #body="{ row, column }">
      <BaseTableCell>{{ row[column.key] }}</BaseTableCell>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import { BaseTable, BaseTableHeader, BaseTableCell } from '@template/ui'

const tableData = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' }
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' }
]
</script>
```

### BaseIcon

```vue
<template>
  <!-- 기본 아이콘 -->
  <BaseIcon name="home" />
  
  <!-- 크기 지정 -->
  <BaseIcon name="plus" size="lg" />
  
  <!-- 색상 지정 -->
  <BaseIcon name="check" class="text-green-500" />
  
  <!-- 클릭 이벤트 -->
  <BaseIcon name="close" @click="handleClose" class="cursor-pointer" />
</template>

<script setup lang="ts">
import { BaseIcon } from '@template/ui'

const handleClose = () => {
  console.log('닫기 클릭')
}
</script>
```

## 🎣 컴포저블

### useBreakpoint

```typescript
import { useBreakpoint } from '@template/ui'

const { 
  isMobile, 
  isTablet, 
  isDesktop, 
  currentBreakpoint 
} = useBreakpoint()

// 반응형 로직
if (isMobile.value) {
  // 모바일 전용 로직
}
```

### useForm

```typescript
import { useForm } from '@template/ui'

const { 
  values, 
  errors, 
  touched, 
  handleSubmit, 
  setFieldValue, 
  setFieldError 
} = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  }),
  onSubmit: (values) => {
    console.log('폼 제출:', values)
  }
})
```

### useModal

```typescript
import { useModal } from '@template/ui'

const { 
  isOpen, 
  openModal, 
  closeModal, 
  toggleModal 
} = useModal()

// 모달 열기
openModal()

// 모달 닫기
closeModal()
```

## 🎨 디자인 시스템

### 색상 변형

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
```

### 간격 시스템

```typescript
type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### 타이포그래피

```typescript
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'
```

## 📚 Storybook

### 개발 서버 실행

```bash
# Storybook 개발 서버
pnpm storybook

# 외부 접근 허용
pnpm storybook:external

# 빌드
pnpm build-storybook
```

### 스토리 작성 예시

```typescript
// BaseButton.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { BaseButton } from './BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '재사용 가능한 버튼 컴포넌트입니다.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼'
  }
}
```

## 🛠️ 개발

### 빌드

```bash
# 테마 패키지 빌드 후 UI 빌드
pnpm build

# 개발 모드 (watch)
pnpm dev
```

### 테스트

```bash
# 테스트 실행
pnpm test

# UI 테스트
pnpm test:ui

# 커버리지 리포트
pnpm test:coverage
```

### Storybook 테스트

```bash
# Storybook 테스트
pnpm test-storybook
```

## 🔗 의존성

- **의존성**: `@template/theme`, `@template/types`
- **피어 의존성**: `vue`
- **개발 의존성**: `vite-svg-loader`, `tailwindcss`, `autoprefixer`, `postcss`

## 📝 라이센스

MIT License
