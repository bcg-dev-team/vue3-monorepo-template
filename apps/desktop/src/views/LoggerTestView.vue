<!--
  LoggerTest 컴포넌트
  커스텀 로거의 모든 기능을 테스트할 수 있는 컴포넌트
-->
<template>
  <div class="logger-test-view">
    <div class="px-padding-16 py-padding-24 container mx-auto">
      <h1 class="mb-padding-24 text-font-24 text-default font-bold">Logger 테스트</h1>

      <!-- 환경 정보 표시 -->
      <div
        class="mb-padding-16 rounded-default bg-blue-blue050 p-padding-16 border-blue-blue200 border"
      >
        <h2 class="mb-padding-8 text-font-18 text-blue font-semibold">현재 환경 정보</h2>
        <div class="text-font-14 text-blue">
          <p><strong>환경:</strong> {{ environmentInfo.environment }}</p>
          <p><strong>개발 환경:</strong> {{ environmentInfo.isDevelopment ? '예' : '아니오' }}</p>
          <p>
            <strong>프로덕션 환경:</strong> {{ environmentInfo.isProduction ? '예' : '아니오' }}
          </p>
          <p><strong>테스트 환경:</strong> {{ environmentInfo.isTest ? '예' : '아니오' }}</p>
        </div>
      </div>

      <!-- 기본 로깅 테스트 -->
      <div
        class="mb-padding-16 rounded-default bg-bg-default p-padding-16 border border-neutral-200"
      >
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">기본 로깅 테스트</h2>
        <div class="gap-padding-16 grid grid-cols-2 md:grid-cols-3">
          <button
            @click="testLog"
            class="rounded-default px-padding-16 py-padding-8 bg-neutral-500 text-white transition-colors hover:bg-neutral-600"
          >
            LOG 테스트
          </button>
          <button
            @click="testInfo"
            class="rounded-default px-padding-16 py-padding-8 bg-blue-500 text-white transition-colors hover:bg-blue-600"
          >
            INFO 테스트
          </button>
          <button
            @click="testWarn"
            class="rounded-default bg-primary-primary800 px-padding-16 py-padding-8 hover:bg-primary-primary-deep text-black transition-colors"
          >
            WARN 테스트
          </button>
          <button
            @click="testError"
            class="rounded-default bg-red-red800 px-padding-16 py-padding-8 hover:bg-red-red700 text-white transition-colors"
          >
            ERROR 테스트
          </button>
          <button
            @click="testDebug"
            class="rounded-default bg-purple-purple800 px-padding-16 py-padding-8 hover:bg-purple-purple700 text-white transition-colors"
          >
            DEBUG 테스트
          </button>
          <button
            @click="testTrace"
            class="rounded-default bg-primary-primary-deep px-padding-16 py-padding-8 hover:bg-primary-primary800 text-white transition-colors"
          >
            TRACE 테스트
          </button>
        </div>
      </div>

      <!-- 고급 기능 테스트 -->
      <div
        class="mb-padding-16 rounded-default bg-bg-default p-padding-16 border border-neutral-200"
      >
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">고급 기능 테스트</h2>
        <div class="gap-padding-16 grid grid-cols-2 md:grid-cols-4">
          <button
            @click="testAssert"
            class="rounded-default bg-green-green800 px-padding-16 py-padding-8 hover:bg-green-green700 text-white transition-colors"
          >
            Assert 테스트
          </button>
          <button
            @click="testTable"
            class="rounded-default bg-blue-blue800-deep px-padding-16 py-padding-8 hover:bg-blue-blue700 text-white transition-colors"
          >
            Table 테스트
          </button>
          <button
            @click="testGroup"
            class="rounded-default bg-green-green600 px-padding-16 py-padding-8 hover:bg-green-green700 text-white transition-colors"
          >
            Group 테스트
          </button>
          <button
            @click="testDir"
            class="rounded-default bg-purple-purple600 px-padding-16 py-padding-8 hover:bg-purple-purple700 text-white transition-colors"
          >
            Dir 테스트
          </button>
        </div>
      </div>

      <!-- 타이밍 및 카운팅 테스트 -->
      <div
        class="mb-padding-16 rounded-default bg-bg-default p-padding-16 border border-neutral-200"
      >
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">
          타이밍 및 카운팅 테스트
        </h2>
        <div class="gap-padding-16 grid grid-cols-2 md:grid-cols-4">
          <button
            @click="startTimer"
            class="rounded-default bg-blue-blue600 px-padding-16 py-padding-8 hover:bg-blue-blue700 text-white transition-colors"
          >
            타이머 시작
          </button>
          <button
            @click="endTimer"
            class="rounded-default bg-blue-blue700 px-padding-16 py-padding-8 hover:bg-blue-blue800 text-white transition-colors"
          >
            타이머 종료
          </button>
          <button
            @click="testCount"
            class="rounded-default bg-green-green600 px-padding-16 py-padding-8 hover:bg-green-green700 text-white transition-colors"
          >
            카운트 증가
          </button>
          <button
            @click="resetCount"
            class="rounded-default bg-green-green700 px-padding-16 py-padding-8 hover:bg-green-green800 text-white transition-colors"
          >
            카운트 리셋
          </button>
        </div>
      </div>

      <!-- 컴포넌트 로거 테스트 -->
      <div
        class="mb-padding-16 rounded-default bg-bg-default p-padding-16 border border-neutral-200"
      >
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">컴포넌트 로거 테스트</h2>
        <div class="gap-padding-16 grid grid-cols-2 md:grid-cols-3">
          <button
            @click="testComponentLogger"
            class="rounded-default bg-purple-purple800 px-padding-16 py-padding-8 hover:bg-purple-purple700 text-white transition-colors"
          >
            컴포넌트 로거 테스트
          </button>
          <button
            @click="testMultipleComponents"
            class="rounded-default bg-purple-purple700 px-padding-16 py-padding-8 hover:bg-purple-purple600 text-white transition-colors"
          >
            다중 컴포넌트 테스트
          </button>
          <button
            @click="clearConsole"
            class="rounded-default px-padding-16 py-padding-8 bg-neutral-600 text-white transition-colors hover:bg-neutral-700"
          >
            콘솔 지우기
          </button>
        </div>
      </div>

      <!-- 도움말 및 데모 -->
      <div
        class="mb-padding-16 rounded-default bg-bg-default p-padding-16 border border-neutral-200"
      >
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">도움말 및 데모</h2>
        <div class="gap-padding-16 grid grid-cols-2">
          <button
            @click="showHelp"
            class="rounded-default px-padding-16 py-padding-8 bg-neutral-500 text-white transition-colors hover:bg-neutral-600"
          >
            도움말 표시
          </button>
          <button
            @click="runDemo"
            class="rounded-default px-padding-16 py-padding-8 bg-neutral-600 text-white transition-colors hover:bg-neutral-700"
          >
            데모 실행
          </button>
        </div>
      </div>

      <!-- 사용법 안내 -->
      <div class="rounded-default bg-bg-surface p-padding-16 border border-neutral-200">
        <h2 class="mb-padding-16 text-font-20 text-default font-semibold">사용법 안내</h2>
        <div class="space-y-padding-8 text-font-14 text-default-muted">
          <p>• <strong>개발 환경</strong>에서는 모든 로그 레벨이 활성화됩니다.</p>
          <p>• <strong>프로덕션 환경</strong>에서는 warn과 error만 활성화됩니다.</p>
          <p>• 각 버튼을 클릭하면 브라우저 콘솔에 스타일된 로그가 출력됩니다.</p>
          <p>• 개발자 도구의 콘솔 탭을 열어서 결과를 확인하세요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logger, getEnvironmentInfo } from '@template/utils';
import { ref, onMounted } from 'vue';

// 환경 정보
const environmentInfo = ref(getEnvironmentInfo());

// 컴포넌트 로거 생성
const componentLogger = logger.createComponentLogger('LoggerTestView');

// 기본 로깅 테스트
const testLog = () => {
  logger.log('일반 로그 메시지입니다', { timestamp: Date.now(), user: 'test-user' });
};

const testInfo = () => {
  logger.info('정보 메시지입니다', { action: 'button-click', component: 'LoggerTestView' });
};

const testWarn = () => {
  logger.warn('경고 메시지입니다', { warning: 'This is a test warning' });
};

const testError = () => {
  logger.error('에러 메시지입니다', new Error('Test error for demonstration'));
};

const testDebug = () => {
  logger.debug('디버그 메시지입니다 (개발 환경에서만 표시)', { debug: true });
};

const testTrace = () => {
  logger.trace('스택 트레이스 메시지입니다');
};

// 고급 기능 테스트
const testAssert = () => {
  logger.assert(2 + 2 === 4, '수학 연산이 올바릅니다');
  logger.assert(2 + 2 === 5, '수학 연산이 틀렸습니다');
};

const testTable = () => {
  const sampleData = [
    { name: '홍길동', age: 25, city: '서울' },
    { name: '김철수', age: 30, city: '부산' },
    { name: '이영희', age: 28, city: '대구' },
  ];
  logger.table(sampleData);
};

const testGroup = () => {
  logger.group('사용자 액션 그룹');
  logger.log('사용자가 로그인했습니다');
  logger.info('사용자 정보를 로드했습니다', { userId: 123 });
  logger.warn('세션이 곧 만료됩니다');
  logger.groupEnd();
};

const testDir = () => {
  const complexObject = {
    user: {
      id: 123,
      name: '홍길동',
      preferences: {
        theme: 'dark',
        language: 'ko',
      },
    },
    metadata: {
      createdAt: new Date(),
      version: '1.0.0',
    },
  };
  logger.dir(complexObject);
};

// 타이밍 및 카운팅 테스트
const startTimer = () => {
  logger.time('test-operation');
  componentLogger.info('타이머가 시작되었습니다');
};

const endTimer = () => {
  logger.timeEnd('test-operation');
  componentLogger.info('타이머가 종료되었습니다');
};

const testCount = () => {
  logger.count('button-click');
  componentLogger.log('카운트가 증가했습니다');
};

const resetCount = () => {
  logger.countReset('button-click');
  componentLogger.log('카운트가 리셋되었습니다');
};

// 컴포넌트 로거 테스트
const testComponentLogger = () => {
  componentLogger.log('컴포넌트 로거 테스트 메시지');
  componentLogger.info('컴포넌트 정보', { component: 'LoggerTestView' });
  componentLogger.warn('컴포넌트 경고');
  componentLogger.error('컴포넌트 에러', new Error('Component test error'));
};

const testMultipleComponents = () => {
  const userLogger = logger.createComponentLogger('UserService');
  const apiLogger = logger.createComponentLogger('ApiClient');

  userLogger.info('사용자 서비스 초기화');
  apiLogger.info('API 클라이언트 초기화');

  userLogger.log('사용자 데이터 로드 시작');
  apiLogger.log('API 요청 시작', { endpoint: '/api/users' });

  userLogger.warn('사용자 세션 만료 예정');
  apiLogger.error('API 요청 실패', new Error('Network error'));
};

const clearConsole = () => {
  logger.clear();
  componentLogger.info('콘솔이 지워졌습니다');
};

// 도움말 및 데모
const showHelp = () => {
  logger.help();
};

const runDemo = () => {
  logger.demo();
};

// 컴포넌트 마운트 시
onMounted(() => {
  componentLogger.info('LoggerTestView 컴포넌트가 마운트되었습니다', {
    environment: environmentInfo.value.environment,
    timestamp: new Date().toISOString(),
  });
});
</script>

<style scoped>
.logger-test-view {
  min-height: 100vh;
  background-color: var(--background-bg-default);
}
</style>
