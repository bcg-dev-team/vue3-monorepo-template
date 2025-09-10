# Logger 유틸리티 가이드

## 📋 개요

Vue 3 모노레포 프로젝트에서의 효율적인 로그 출력을 위한 커스텀 로거 유틸리티입니다.  환경 감지, 스타일링된 출력, 컴포넌트별 로깅 등의 기능을 제공합니다.

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

## 🔹 사용법

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

### TradingView DataFeed에서 사용

```typescript
// apps/sample-desktop/src/adapters/tradingview/datafeed.ts
import { logger } from '@template/utils';

// DataFeed 전용 로거 생성
const datafeedLogger = logger.createComponentLogger('DataFeed');

const datafeed: TradingViewDatafeed = {
  resolveSymbol: async (symbolName: string, onSymbolResolvedCallback, onResolveErrorCallback) => {
    datafeedLogger.info('resolveSymbol: Method call', { symbolName });
    
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    
    if (!symbolItem) {
      datafeedLogger.info('resolveSymbol: Cannot resolve symbol', { symbolName });
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    
    datafeedLogger.info('resolveSymbol: Symbol resolved', { symbolName });
    onSymbolResolvedCallback(symbolInfo);
  },
  
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    datafeedLogger.info('getBars: Method call', {
      symbolInfo,
      resolution,
      from: periodParams.from,
      to: periodParams.to,
    });
    
    try {
      // 데이터 처리 로직
      datafeedLogger.info(`getBars: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      datafeedLogger.info('getBars: Get error', { error });
      onErrorCallback(error as Error);
    }
  }
};
```

### LoggerTestView 컴포넌트에서 사용

```vue
<!-- apps/desktop/src/views/LoggerTestView.vue -->
<template>
  <div class="logger-test">
    <h1>Logger 테스트</h1>
    <div class="button-group">
      <button @click="testBasicLogging">기본 로깅 테스트</button>
      <button @click="testComponentLogger">컴포넌트 로거 테스트</button>
      <button @click="testAdvancedFeatures">고급 기능 테스트</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logger } from '@template/utils';

// 컴포넌트별 로거 생성
const componentLogger = logger.createComponentLogger('LoggerTestView');

const testBasicLogging = () => {
  logger.log('기본 로그 메시지');
  logger.info('정보 메시지', { timestamp: Date.now() });
  logger.warn('경고 메시지');
  logger.error('에러 메시지', new Error('테스트 에러'));
  logger.debug('디버그 메시지 (개발 환경에서만)');
};

const testComponentLogger = () => {
  componentLogger.log('컴포넌트 로그');
  componentLogger.info('컴포넌트 정보', { 
    component: 'LoggerTestView',
    mounted: true 
  });
  componentLogger.warn('컴포넌트 경고');
  componentLogger.error('컴포넌트 에러', new Error('컴포넌트 테스트 에러'));
};

const testAdvancedFeatures = () => {
  // 타이밍 테스트
  componentLogger.time('test-operation');
  setTimeout(() => {
    componentLogger.timeEnd('test-operation');
  }, 1000);
  
  // 카운팅 테스트
  componentLogger.count('test-action');
  componentLogger.count('test-action');
  
  // 그룹화 테스트
  componentLogger.group('테스트 그룹');
  componentLogger.log('그룹 내 로그 1');
  componentLogger.info('그룹 내 로그 2');
  componentLogger.groupEnd();
};
</script>
```

## 🔹 로그 레벨별 동작

| 환경 | LOG | INFO | WARN | ERROR | DEBUG | TRACE |
|------|-----|------|------|-------|-------|-------|
| 개발 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 프로덕션 | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

## 🔹 설계 아키텍처

### Logger 클래스 설계

```typescript
export class Logger {
  private environment: string;
  private logLevels: LogLevels;
  private counters: Map<string, number>;
  private timers: Map<string, number>;

  constructor() {
    this.environment = getEnvironment();
    this.logLevels = this.getLogLevels();
    this.styles = this.getStyles();
    this.counters = new Map();
    this.timers = new Map();
  }
}
```

#### 핵심 설계 원칙

1. **싱글톤 패턴**: 전역에서 하나의 Logger 인스턴스만 사용
2. **클로저 활용**: 환경 설정과 상태를 캡슐화하여 메모리 효율성 확보
3. **메모이제이션**: 스타일과 로그 레벨 설정을 한 번만 계산하여 성능 최적화
4. **타입 안전성**: TypeScript 제네릭과 인터페이스로 완전한 타입 지원

### Component Logger 설계

```typescript
export interface ComponentLogger {
  log: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
  trace: (message: string, data?: unknown) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  count: (label: string) => void;
  group: (label: string) => void;
  groupEnd: () => void;
}

createComponentLogger(componentName: string): ComponentLogger {
  return {
    log: (message: string, data?: unknown) => 
      this.log(`[${componentName}] ${message}`, data),
    info: (message: string, data?: unknown) => 
      this.info(`[${componentName}] ${message}`, data),
    // ... 다른 메서드들
  };
}
```

#### Component Logger 설계 특징

1. **팩토리 패턴**: `createComponentLogger()` 메서드로 컴포넌트별 로거 생성
2. **클로저 캡슐화**: `componentName`을 클로저로 캡처하여 각 메서드에서 자동으로 접두사 추가
3. **메서드 위임**: 기본 Logger의 메서드를 래핑하여 컴포넌트명 자동 추가
4. **타입 안전성**: ComponentLogger 인터페이스로 일관된 API 보장

## 🔒 클로저 패턴

### **1. createComponentLogger 메서드 분석**

```typescript
// packages/utils/src/logger.ts
class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;
  private isProduction: boolean;
  private isTest: boolean;

  // 싱글톤 인스턴스
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // 클로저를 생성하는 메서드
  createComponentLogger(componentName: string): ComponentLogger {
    return {
      // 각 메서드가 클로저를 형성
      log: (message: string, data?: unknown) => this.log(`[${componentName}] ${message}`, data),
      info: (message: string, data?: unknown) => this.info(`[${componentName}] ${message}`, data),
      warn: (message: string, data?: unknown) => this.warn(`[${componentName}] ${message}`, data),
      error: (message: string, data?: unknown) => this.error(`[${componentName}] ${message}`, data),
      debug: (message: string, data?: unknown) => this.debug(`[${componentName}] ${message}`, data),
      trace: (message: string, data?: unknown) => this.trace(`[${componentName}] ${message}`, data),
      time: (label: string) => this.time(`${componentName}-${label}`),
      timeEnd: (label: string) => this.timeEnd(`${componentName}-${label}`),
      count: (label: string) => this.count(`${componentName}-${label}`),
      group: (label: string) => this.group(`[${componentName}] ${label}`),
      groupEnd: () => this.groupEnd(),
    };
  }
}
```

### **2. 클로저가 형성되는 과정**

```typescript
// 1. 싱글톤 Logger 인스턴스 생성
const logger = Logger.getInstance();

// 2. createComponentLogger 호출
const chartLogger = logger.createComponentLogger('TradingViewChart');

// 3. 클로저 형성 과정
// - componentName: 'TradingViewChart' (캡처된 변수)
// - this: logger 인스턴스 (캡처된 this 컨텍스트)
// - 각 메서드가 이 두 값을 "기억"함
```

### **3. 클로저의 메모리 구조**

```typescript
// 메모리에서의 실제 구조
Logger 인스턴스 (싱글톤)
├── isDevelopment: true
├── isProduction: false
├── isTest: false
└── log, info, warn, error, debug, trace, time, timeEnd, count, group, groupEnd 메서드들

ComponentLogger 객체 (chartLogger)
├── log: function (클로저)
│   ├── 캡처된 componentName: 'TradingViewChart'
│   ├── 캡처된 this: logger 인스턴스
│   └── 실행 시: this.log(`[TradingViewChart] ${message}`, data)
├── info: function (클로저)
│   ├── 캡처된 componentName: 'TradingViewChart'
│   ├── 캡처된 this: logger 인스턴스
│   └── 실행 시: this.info(`[TradingViewChart] ${message}`, data)
└── ... (다른 메서드들도 동일한 패턴)
```

## 🧠 클로저의 동작 원리

### **1. 변수 캡처 과정**

```typescript
// createComponentLogger가 호출될 때
createComponentLogger('TradingViewChart') {
  // 1. componentName = 'TradingViewChart' (지역 변수)
  // 2. this = logger 인스턴스 (메서드의 this 컨텍스트)

  return {
    // 3. 각 함수가 componentName과 this를 캡처
    log: (message: string, data?: unknown) => {
      // 이 함수는 componentName과 this를 "기억"함
      return this.log(`[${componentName}] ${message}`, data);
      //     ↑ 캡처된 this    ↑ 캡처된 componentName
    }
  };
}
```

### **2. 실행 시점의 동작**

```typescript
// chartLogger.info('차트 초기화') 호출 시
chartLogger.info('차트 초기화');

// 실제로는 다음이 실행됨:
// 1. 캡처된 componentName: 'TradingViewChart'
// 2. 캡처된 this: logger 인스턴스
// 3. this.info(`[TradingViewChart] 차트 초기화`, undefined)
// 4. logger.info('[TradingViewChart] 차트 초기화', undefined)
```

### **3. 여러 컴포넌트 로거의 독립성**

```typescript
// 각각 독립적인 클로저 생성
const chartLogger = logger.createComponentLogger('TradingViewChart');
const modalLogger = logger.createComponentLogger('BaseModal');

// chartLogger의 클로저
chartLogger.info('차트 초기화');
// → logger.info('[TradingViewChart] 차트 초기화', undefined)

// modalLogger의 클로저 (독립적)
modalLogger.info('모달 열기');
// → logger.info('[BaseModal] 모달 열기', undefined)
```

## 🧠 클로저의 메모리 관리

### **1. 메모리 참조 구조**

```typescript
// 메모리 참조 다이어그램
┌─────────────────────────────────────────────────────────────┐
│                    Logger (Singleton)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ instance: Logger                                    │    │
│  │ isDevelopment: true                                 │    │
│  │ isProduction: false                                 │    │
│  │ isTest: false                                       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              ↑ 참조
┌─────────────────────────────────────────────────────────────┐
│              ComponentLogger (chartLogger)                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ log: function (Closure)                             │    │
│  │ ├─ componentName: 'TradingViewChart' (Captured)     │    │
│  │ └─ this: Logger Instance (Captured)                 │    │
│  │                                                     │    │
│  │ info: function (Closure)                            │    │
│  │ ├─ componentName: 'TradingViewChart' (Captured)     │    │
│  │ └─ this: Logger Instance (Captured)                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### **2. 가비지 컬렉션과 생명주기**

```typescript
// 컴포넌트 마운트
const chartLogger = logger.createComponentLogger('TradingViewChart');
// → 새로운 ComponentLogger 객체 생성
// → 각 메서드가 Logger 인스턴스와 componentName을 캡처

// 컴포넌트 사용
chartLogger.info('차트 초기화');
// → 캡처된 값들을 사용하여 로그 출력

// 컴포넌트 언마운트
onUnmounted(() => {
  // chartLogger 변수가 스코프에서 제거됨
  // → ComponentLogger 객체가 가비지 컬렉션 대상이 됨
  // → 하지만 Logger 인스턴스는 여전히 참조되고 있으므로 유지됨
});
```

## ⚡ 클로저의 장점과 특징

### **1. 상태 캡슐화**

```typescript
// componentName과 Logger 인스턴스가 캡슐화됨
const chartLogger = logger.createComponentLogger('TradingViewChart');

// 외부에서 componentName에 직접 접근할 수 없음
// chartLogger.componentName // undefined (접근 불가)

// 하지만 내부에서는 사용 가능
chartLogger.info('테스트'); // '[TradingViewChart] 테스트' 출력
```

### **2. 메모리 효율성**

```typescript
// 싱글톤 Logger 인스턴스는 한 번만 생성
const logger = Logger.getInstance();

// 여러 ComponentLogger가 동일한 Logger 인스턴스 공유
const chartLogger = logger.createComponentLogger('TradingViewChart');
const modalLogger = logger.createComponentLogger('BaseModal');
// → 두 로거 모두 동일한 Logger 인스턴스를 참조
```

### **3. 함수형 프로그래밍 패턴**

```typescript
// createComponentLogger는 고차 함수(Higher-Order Function)
// - 함수를 반환하는 함수
// - 클로저를 통해 상태를 캡슐화

function createComponentLogger(componentName: string) {
  // 외부 함수의 매개변수를 캡처
  return {
    // 내부 함수들이 외부 함수의 변수에 접근
    log: (message: string) => this.log(`[${componentName}] ${message}`)
  };
}
```

## 🔧 실제 사용에서의 클로저 동작

### **1. 컴포넌트별 독립성**

```typescript
// TradingViewChart.vue
const chartLogger = logger.createComponentLogger('TradingViewChart');
// → componentName: 'TradingViewChart' 캡처

// LoggerTestView.vue
const componentLogger = logger.createComponentLogger('LoggerTestView');
// → componentName: 'LoggerTestView' 캡처 (독립적)

// 각각의 클로저는 서로 다른 componentName을 기억
chartLogger.info('차트 로딩');     // '[TradingViewChart] 차트 로딩'
componentLogger.info('테스트');    // '[LoggerTestView] 테스트'
```

### **2. 성능 최적화 전략**

```typescript
// 클로저를 통한 메모리 효율성
const datafeedLogger = logger.createComponentLogger('DataFeed');
// datafeedLogger는 'DataFeed' 문자열을 클로저로 캡처
// 각 호출 시마다 새로운 문자열 생성하지 않고 재사용

// 메모이제이션을 통한 성능 최적화
private readonly styles: Record<LogLevel, LogStyle>; // 한 번만 계산
private readonly LABELS = { ... } as const; // 상수로 최적화
```

#### 성능 최적화 전략

1. **상수 최적화**: `as const` 어서션으로 불변 객체 생성
2. **메모이제이션**: 스타일과 설정을 한 번만 계산하여 재사용
3. **지연 초기화**: 필요한 시점에만 객체 생성
4. **가비지 컬렉션 최적화**: 불필요한 객체 생성 최소화
5. **클로저 캡슐화**: 컴포넌트별 로거는 모듈 레벨에서 한 번만 생성
6. **싱글톤 패턴**: Logger 인스턴스를 전역에서 하나만 유지

## 🔹 모범 사례

1. **컴포넌트별 로거 사용**: 각 컴포넌트에서 고유한 로거 인스턴스 생성
2. **적절한 로그 레벨 선택**: 상황에 맞는 로그 레벨 사용
3. **구조화된 데이터 전달**: 객체 형태로 추가 정보 전달
4. **에러 객체 전달**: 에러 발생 시 Error 객체를 직접 전달
5. **그룹화 활용**: 관련 로그들을 그룹으로 정리
6. **클로저 활용**: 컴포넌트 로거는 모듈 레벨에서 한 번만 생성
7. **타입 안전성**: TypeScript 타입을 활용한 안전한 로깅

## 🔹 문제 해결

### 로그가 표시되지 않는 경우
1. 환경 설정 확인 (개발/프로덕션)
2. 브라우저 콘솔 필터링 설정 확인
3. 로그 레벨이 현재 환경에서 활성화되어 있는지 확인

### 성능 최적화
- 프로덕션 환경에서는 불필요한 로그가 자동으로 비활성화됨
- 복잡한 객체 로깅 시 성능 고려
- 대량의 로그 출력 시 그룹화 활용

## 🔹 테스트

LoggerTestView 컴포넌트를 통해 모든 기능을 테스트할 수 있습니다:

1. 개발 서버 실행: `pnpm dev`
2. 브라우저에서 `/logger-test` 경로로 이동
3. 각 버튼을 클릭하여 콘솔에서 결과 확인
