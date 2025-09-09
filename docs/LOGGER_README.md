# Logger 유틸리티 가이드

## 📋 개요

Vue 3 모노레포 프로젝트에서의 효율적인 로그 출력을 위한 커스텀 로거 유틸리티입니다. 환경 감지, 스타일링된 출력, 컴포넌트별 로깅 등 다양한 기능을 제공합니다.

## 🔹 주요 기능

### 1. 환경 인식 로깅 (Environment-Aware Logging)
- **자동 환경 감지**: 개발/프로덕션 환경을 자동으로 감지
- **개발 환경**: 모든 로그 레벨 활성화
- **프로덕션 환경**: warn과 error만 활성화 (다른 레벨은 비활성화)

### 2. 사전 스타일링 및 색상 코딩된 출력
- 각 로그 레벨별 고유한 색상과 스타일링
- `console.log('%c...')` 형식 사용으로 향상된 시각적 명확성
- 색상 코딩된 라벨:
  - **LOG**: 회색
  - **INFO**: 파란색
  - **WARN**: 노란색
  - **ERROR**: 빨간색
  - **DEBUG**: 보라색
  - **TRACE**: 주황색

### 3. 동적 메서드 사용
- 모든 주요 console 메서드 래핑: `log`, `info`, `warn`, `error`, `debug`, `trace`, `assert`, `dir`, `table`, `group` 등
- 간단한 API: `logger.log("message")` 또는 `logger.error("error message")`

### 4. 내장 문서화
- `logger.help()` - 사용 가능한 모든 메서드와 함께 포괄적인 도움말 표시
- `logger.demo()` - 모든 로깅 메서드의 예제 실행

### 5. 고급 기능
- **타이밍**: 스타일링된 출력과 함께 `logger.time()` 및 `logger.timeEnd()`
- **카운팅**: 추적과 함께 `logger.count()` 및 `logger.countReset()`
- **컴포넌트별 로거**: `logger.createComponentLogger('ComponentName')`
- **그룹화**: 정리된 출력을 위한 `logger.group()` 및 `logger.groupEnd()`

## 🔹 설치 및 사용

### 패키지 설치
```bash
# 이미 @template/utils 패키지에 포함되어 있습니다
pnpm install @template/utils
```

### 기본 사용법

```typescript
import { logger } from '@template/utils';

// 기본 로그
logger.log('기본 로그 메시지');
logger.info('정보 메시지', { timestamp: Date.now() });
logger.warn('경고 메시지');
logger.error('에러 메시지', new Error('에러 객체'));
logger.debug('디버그 메시지 (개발 환경에서만)');
```

### Vue 컴포넌트에서 사용

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { logger } from '@template/utils'

// 컴포넌트별 로거 생성
const componentLogger = logger.createComponentLogger('MyComponent')

onMounted(() => {
  componentLogger.info('컴포넌트가 마운트되었습니다')
})

const handleClick = () => {
  componentLogger.log('버튼이 클릭되었습니다', { timestamp: Date.now() })
}
</script>
```

## 🔹 사용 예제

### 컴포넌트별 로거 생성

```typescript
// 컴포넌트에서 사용
const componentLogger = logger.createComponentLogger('MyComponent');

componentLogger.log('컴포넌트 로그');
componentLogger.info('컴포넌트 정보', { component: 'MyComponent' });
```

### 고급 기능 사용

```typescript
// 타이밍
logger.time('operation-timer');
// ... 작업 수행 ...
logger.timeEnd('operation-timer');

// 카운팅
logger.count('user-action');
logger.count('user-action');
logger.countReset('user-action');

// 그룹화
logger.group('데이터 처리');
logger.log('데이터 로드 완료');
logger.info('처리 중...', { count: 100 });
logger.groupEnd();

// 테이블 출력
const data = [
    { name: '홍길동', age: 25 },
    { name: '김철수', age: 30 }
];
logger.table(data);
```

### 도움말 및 데모

```typescript
// 도움말 표시
logger.help();

// 데모 실행
logger.demo();
```

## 🔹 환경 지원

### 브라우저 환경
- `localhost` 또는 개발 도메인을 개발 환경으로 감지
- 프로덕션 도메인을 프로덕션 환경으로 감지

### Node.js 환경
- `process.env.NODE_ENV` 사용
- 크로스 플랫폼: 두 환경에서 원활하게 작동

## 🔹 파일 구조

```
packages/
├── utils/
│   ├── src/
│   │   ├── logger.ts          # 메인 로거 유틸리티
│   │   ├── env.ts             # 환경 감지 유틸리티
│   │   └── index.ts           # 패키지 진입점
│   └── package.json
apps/
├── desktop/
│   ├── src/
│   │   ├── views/
│   │   │   └── LoggerTestView.vue  # 로거 테스트 컴포넌트
│   │   └── router/
│   │       └── index.ts            # 라우터 설정
│   └── package.json
└── docs/
    └── LOGGER_README.md       # 이 문서
```

## 🔹 컴포넌트 통합 예제

### FileUploader 컴포넌트에서 사용

```vue
<template>
  <div class="file-uploader">
    <!-- 컴포넌트 템플릿 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { logger } from '@template/utils';

// 컴포넌트별 로거 생성
const componentLogger = logger.createComponentLogger('FileUploader');

const handleFileUpload = (file: File) => {
  componentLogger.info('파일 업로드 시작', { 
    fileName: file.name, 
    fileSize: file.size 
  });
  
  try {
    // 파일 처리 로직
    componentLogger.log('파일 처리 완료');
  } catch (error) {
    componentLogger.error('파일 처리 실패', error);
  }
};
</script>
```

## 🔹 로그 레벨별 동작

| 환경 | LOG | INFO | WARN | ERROR | DEBUG | TRACE |
|------|-----|------|------|-------|-------|-------|
| 개발 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 프로덕션 | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

## 🔹 모범 사례

1. **컴포넌트별 로거 사용**: 각 컴포넌트에서 고유한 로거 인스턴스 생성
2. **적절한 로그 레벨 선택**: 상황에 맞는 로그 레벨 사용
3. **구조화된 데이터 전달**: 객체 형태로 추가 정보 전달
4. **에러 객체 전달**: 에러 발생 시 Error 객체를 직접 전달
5. **그룹화 활용**: 관련 로그들을 그룹으로 정리

## 🔹 문제 해결

### 로그가 표시되지 않는 경우
1. 환경 설정 확인 (개발/프로덕션)
2. 브라우저 콘솔 필터링 설정 확인
3. 로그 레벨이 현재 환경에서 활성화되어 있는지 확인

### 성능 최적화
- 프로덕션 환경에서는 불필요한 로그가 자동으로 비활성화됨
- 복잡한 객체 로깅 시 성능 고려
- 대량의 로그 출력 시 그룹화 활용

## 🔹 ESLint 설정

프로젝트의 ESLint 설정에서 logger 유틸리티 파일에 대해 `no-console` 규칙이 비활성화되어 있습니다:

```javascript
// eslint.config.js
{
  files: ['packages/utils/src/logger.ts', 'packages/utils/src/env.ts'],
  rules: {
    'no-console': 'off',
  },
}
```

## 🔹 테스트

LoggerTestView 컴포넌트를 통해 모든 기능을 테스트할 수 있습니다:

1. 개발 서버 실행: `pnpm dev`
2. 브라우저에서 `/logger-test` 경로로 이동
3. 각 버튼을 클릭하여 콘솔에서 결과 확인

## 🔹 업데이트 내역

- **v1.0.0**: 초기 버전 - 기본 로깅 기능
- **v1.1.0**: 컴포넌트별 로거 추가
- **v1.2.0**: 고급 기능 (타이밍, 카운팅, 그룹화) 추가
- **v1.3.0**: 환경 감지 및 스타일링 개선
- **v1.4.0**: TypeScript 지원 및 모노레포 통합

---

**참고**: 이 로거는 Vue 3 + Vite + TypeScript 환경에서 최적화되어 있으며, 개발 과정에서 더 나은 디버깅 경험을 제공합니다.
