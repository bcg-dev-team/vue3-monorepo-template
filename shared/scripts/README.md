# shared/scripts

모노레포 빌드 및 유틸리티 스크립트들을 관리하는 디렉토리입니다.

## 📁 파일 구조

```
shared/scripts/
├── build-order.ts        # 빌드 순서 관리
├── optimize-icons.ts     # 아이콘 최적화
├── setup.ts             # 프로젝트 설정
├── tsconfig.json        # 스크립트용 TypeScript 설정
└── tsconfig.tsbuildinfo # TypeScript 빌드 정보
```

## 🔧 주요 스크립트

### build-order.ts

모노레포 패키지들의 빌드 순서를 관리하는 스크립트입니다.

```typescript
import { buildOrder } from './build-order'

// 빌드 순서 정의
const packages = [
  'types',      // 1. 타입 정의 (가장 먼저)
  'utils',      // 2. 유틸리티 함수
  'api',        // 3. API 클라이언트
  'theme',      // 4. 디자인 토큰
  'ui'          // 5. UI 컴포넌트 (마지막)
]

// 빌드 순서 검증
const order = buildOrder(packages)
console.log('빌드 순서:', order)

// 순환 의존성 검사
const hasCircularDependency = checkCircularDependencies(packages)
if (hasCircularDependency) {
  console.error('순환 의존성이 발견되었습니다!')
  process.exit(1)
}
```

### optimize-icons.ts

SVG 아이콘들을 최적화하는 스크립트입니다.

```typescript
import { optimizeIcons } from './optimize-icons'

// 아이콘 최적화 실행
optimizeIcons({
  inputDir: 'packages/ui/src/assets/icons',
  outputDir: 'packages/ui/src/assets/icons/optimized',
  options: {
    removeViewBox: false,
    removeTitle: true,
    removeDesc: true,
    removeEmptyAttrs: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeHiddenElems: true,
    removeEmptyLines: true,
    removeComments: true
  }
})
```

### setup.ts

프로젝트 초기 설정을 담당하는 스크립트입니다.

```typescript
import { setup } from './setup'

// 프로젝트 설정 실행
setup({
  // Git 설정
  git: {
    ignoreCase: false,
    hooks: true
  },
  
  // 의존성 설치
  install: {
    packageManager: 'pnpm',
    workspace: true
  },
  
  // 환경 변수 설정
  env: {
    NODE_ENV: 'development',
    VITE_API_BASE_URL: 'http://localhost:3000'
  }
})
```

## 🚀 사용법

### 빌드 순서 관리

```bash
# 빌드 순서 확인
pnpm tsx shared/scripts/build-order.ts

# 순환 의존성 검사
pnpm tsx shared/scripts/build-order.ts --check-circular
```

### 아이콘 최적화

```bash
# 아이콘 최적화 실행
pnpm tsx shared/scripts/optimize-icons.ts

# 특정 디렉토리만 최적화
pnpm tsx shared/scripts/optimize-icons.ts --input=./icons --output=./optimized
```

### 프로젝트 설정

```bash
# 프로젝트 초기 설정
pnpm tsx shared/scripts/setup.ts

# 개발 환경 설정
pnpm tsx shared/scripts/setup.ts --env=development
```

## 🛠️ 개발

### 새 스크립트 추가

1. `shared/scripts/` 디렉토리에 TypeScript 파일 생성
2. 필요한 의존성 설치
3. `package.json`에 스크립트 명령어 추가

### 예시: 새 스크립트

```typescript
// shared/scripts/generate-docs.ts
import { generateDocs } from './generate-docs'

const main = async () => {
  try {
    await generateDocs({
      input: 'packages/ui/src/components',
      output: 'docs/components',
      template: 'storybook'
    })
    console.log('문서 생성 완료!')
  } catch (error) {
    console.error('문서 생성 실패:', error)
    process.exit(1)
  }
}

main()
```

### package.json에 스크립트 추가

```json
{
  "scripts": {
    "build:order": "tsx shared/scripts/build-order.ts",
    "optimize:icons": "tsx shared/scripts/optimize-icons.ts",
    "setup": "tsx shared/scripts/setup.ts",
    "generate:docs": "tsx shared/scripts/generate-docs.ts"
  }
}
```

## 📋 스크립트 가이드라인

### 1. 에러 처리

```typescript
const main = async () => {
  try {
    // 스크립트 로직
  } catch (error) {
    console.error('스크립트 실행 실패:', error)
    process.exit(1)
  }
}
```

### 2. 로깅

```typescript
import { logger } from './utils/logger'

logger.info('스크립트 시작')
logger.success('작업 완료')
logger.warn('경고 메시지')
logger.error('에러 메시지')
```

### 3. 설정 파일

```typescript
// config.ts
export interface ScriptConfig {
  input?: string
  output?: string
  options?: Record<string, unknown>
}

export const defaultConfig: ScriptConfig = {
  input: './src',
  output: './dist',
  options: {}
}
```

### 4. CLI 옵션

```typescript
import { parseArgs } from 'node:util'

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    verbose: { type: 'boolean' }
  }
})

console.log('입력 디렉토리:', values.input)
console.log('출력 디렉토리:', values.output)
```

## 🔗 관련 파일

- `package.json` - 스크립트 명령어 정의
- `tsconfig.json` - TypeScript 설정
- `eslint.config.js` - 코드 품질 검사

## 📝 라이센스

MIT License 