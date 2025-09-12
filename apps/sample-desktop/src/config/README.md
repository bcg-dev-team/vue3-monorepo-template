# 데이터 소스 설정

이 디렉토리는 개발자가 Mock 데이터와 실제 웹소켓 데이터 소스 간을 쉽게 전환할 수 있도록 하는 설정 파일들을 포함합니다.

## 설정 방법

### 1. 코드에서 직접 설정

`src/config/dataSource.ts` 파일을 열고 `USE_REAL_WEBSOCKET` 값을 변경하세요:

```typescript
// Mock 데이터 사용 (기본값)
export const USE_REAL_WEBSOCKET = false;

// 실제 웹소켓 사용
export const USE_REAL_WEBSOCKET = true;
```

### 2. 환경 변수로 설정

`.env` 파일에 다음을 추가하세요:

```bash
# Mock 데이터 사용
VITE_USE_REAL_WEBSOCKET=false

# 실제 웹소켓 사용
VITE_USE_REAL_WEBSOCKET=true
```

## 설정 옵션

### 데이터 소스 선택
- `USE_REAL_WEBSOCKET = false`: MSW Mock 데이터 사용 (개발/테스트용)
- `USE_REAL_WEBSOCKET = true`: 실제 웹소켓 서버 연결

### 웹소켓 설정
```typescript
export const WEBSOCKET_CONFIG = {
  url: 'ws://172.25.1.24:9999/ws',  // 서버 주소
  reconnectAttempts: 5,              // 재연결 시도 횟수
  reconnectDelay: 1000,              // 재연결 지연 시간 (ms)
  heartbeatInterval: 30000,          // 하트비트 간격 (ms)
};
```

### 개발 설정
```typescript
export const DEV_CONFIG = {
  enableLogging: true,               // 콘솔 로그 활성화
  showConnectionStatus: true,        // 연결 상태 표시
  mockDataDelay: 100,                // Mock 데이터 생성 간격 (ms)
};
```

## 사용법

### 1. Mock 데이터로 개발
```typescript
// dataSource.ts
export const USE_REAL_WEBSOCKET = false;
```

### 2. 실제 웹소켓으로 테스트
```typescript
// dataSource.ts
export const USE_REAL_WEBSOCKET = true;
```

## 주의사항

1. **실제 웹소켓 사용 시**: 서버가 `ws://172.25.1.24:9999/ws`에서 실행 중이어야 합니다.
2. **Mock 데이터 사용 시**: MSW가 활성화되어 있어야 합니다.
3. **환경 변수 우선순위**: 환경 변수가 코드 설정보다 우선합니다.

## 디버깅

### 연결 상태 확인
브라우저 개발자 도구 콘솔에서 다음 로그를 확인하세요:

```
[useSelectedSymbol] MSW 구독 시작: EURUSD (ID: ...)
[useSelectedSymbol] 실제 웹소켓 구독 시작: EURUSD (ID: ...)
[RealWebSocket] 연결 성공
[RealWebSocket] 연결 오류: ...
```

### 네트워크 탭 확인
실제 웹소켓 사용 시 Network 탭에서 WebSocket 연결을 확인할 수 있습니다.
