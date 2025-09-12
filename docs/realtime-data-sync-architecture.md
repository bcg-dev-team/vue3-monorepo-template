# 실시간 데이터 동기화 아키텍처

## 개요

이 문서는 Vue3 모노레포 프로젝트에서 실시간 데이터 동기화를 위한 3계층 아키텍처를 설명합니다.

## 아키텍처 구조

```
┌─────────────────────────────────────────────────────────────┐
│                    View Components Layer                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │   Chart     │ │    Grid     │ │ Order Panel │ │ Symbol  │ │
│  │ Component   │ │ Component   │ │ Component   │ │ List    │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│              Derived Calculations Layer                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │   Orders    │ │  Positions  │ │   Market    │ │ Account │ │
│  │Calculations │ │Calculations │ │Calculations │ │Calculations│ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                Realtime Data Store Layer                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │   Orders    │ │  Market     │ │  Positions  │ │ Account │ │
│  │    Data     │ │    Data     │ │    Data     │ │  Data   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              WebSocket Connection                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 1. Realtime Data Store Layer (Pinia)

### 핵심 구성요소

- **`useRealtimeDataStore`**: 실시간 데이터의 중앙 집중식 관리
- **`useWebSocket`**: WebSocket 연결 및 메시지 처리
- **타입 정의**: `realtime.ts`, `websocket.ts`

### 주요 기능

- WebSocket을 통한 실시간 데이터 수신
- 데이터 상태 관리 (orders, market, positions, account)
- 연결 상태 관리
- 에러 처리 및 재연결
- 데이터 구독/구독 해제

### 사용 예시

```typescript
import { useRealtimeDataStore } from '@template/utils/stores'

const realtimeStore = useRealtimeDataStore()

// WebSocket 연결
await realtimeStore.connectWebSocket('ws://localhost:8080/ws')

// 데이터 구독
realtimeStore.subscribeToData({
  symbols: ['BTC/USD', 'ETH/USD'],
  dataTypes: ['orders', 'market', 'positions', 'account']
})

// 실시간 데이터 접근
const orders = realtimeStore.orders
const marketData = realtimeStore.marketData
```

## 2. Derived Calculations Layer (Composables)

### 핵심 구성요소

- **`useOrderCalculations`**: 주문 관련 계산 및 통계
- **`usePositionCalculations`**: 포지션 관련 계산 및 리스크 분석
- **`useMarketCalculations`**: 시장 데이터 분석 및 트렌드
- **`useAccountCalculations`**: 계정 성과 및 리스크 분석

### 주요 기능

- 실시간 데이터 기반 계산
- 통계 및 성과 분석
- 리스크 분석
- 데이터 필터링 및 정렬
- 검색 기능

### 사용 예시

```typescript
import { useOrderCalculations } from '@template/utils/composables'

const orderCalculations = useOrderCalculations()

// 주문 통계
const statistics = orderCalculations.statistics.value
const performance = orderCalculations.performance.value

// 필터링된 주문
const filteredOrders = orderCalculations.orders.value

// 검색
const searchResults = orderCalculations.searchOrders('BTC')
```

## 3. View Components Layer

### 핵심 구성요소

- **`useRealtimeData`**: 통합된 실시간 데이터 인터페이스
- **`useRealtimeSync`**: 동기화 및 이벤트 관리
- **`useRealtimeEvents`**: 컴포넌트 간 이벤트 통신

### 주요 기능

- 실시간 데이터 구독
- 자동 동기화
- 이벤트 기반 업데이트
- 낙관적 업데이트
- 충돌 해결

### 사용 예시

```vue
<template>
  <div>
    <div v-if="isConnected" class="status-connected">
      실시간 연결됨
    </div>
    <div v-else class="status-disconnected">
      연결 끊김
    </div>
    
    <OrderList :orders="filteredOrders" />
    <PositionGrid :positions="filteredPositions" />
  </div>
</template>

<script setup lang="ts">
import { useRealtimeSync } from '@template/utils/composables'

const {
  isConnected,
  filteredOrders,
  filteredPositions,
  onOrderUpdate,
  onPositionUpdate
} = useRealtimeSync({
  symbols: ['BTC/USD', 'ETH/USD'],
  dataTypes: ['orders', 'positions'],
  enableEvents: true,
  enableAutoRefresh: true
})

// 이벤트 핸들러
onOrderUpdate((order) => {
  console.log('주문 업데이트:', order)
})

onPositionUpdate((position) => {
  console.log('포지션 업데이트:', position)
})
</script>
```

## 이벤트 기반 업데이트 시스템

### 이벤트 타입

```typescript
type RealtimeEventType = 
  | 'order_created'
  | 'order_updated'
  | 'order_cancelled'
  | 'order_filled'
  | 'position_opened'
  | 'position_closed'
  | 'position_updated'
  | 'market_data_updated'
  | 'account_updated'
  | 'connection_changed'
  | 'error_occurred'
```

### 이벤트 사용 예시

```typescript
import { useRealtimeEvents } from '@template/utils/composables'

const realtimeEvents = useRealtimeEvents()

// 이벤트 구독
const subscriptionId = realtimeEvents.subscribe('order_updated', (data) => {
  console.log('주문 업데이트:', data.order)
})

// 이벤트 발생
realtimeEvents.emit('order_created', { order: newOrder })

// 이벤트 대기
const orderData = await realtimeEvents.waitFor('order_filled', 5000)
```

## 데이터 흐름

1. **WebSocket 수신**: 서버에서 실시간 데이터 수신
2. **Store 업데이트**: Pinia store에서 데이터 상태 업데이트
3. **계산 실행**: Derived Calculations Layer에서 계산 실행
4. **이벤트 발생**: 변경사항을 이벤트로 전파
5. **컴포넌트 업데이트**: View Components에서 반응형 업데이트

## 성능 최적화

### 1. 데이터 정규화
- 중복 데이터 제거
- 효율적인 데이터 구조 사용

### 2. 선택적 구독
- 필요한 데이터만 구독
- 불필요한 리렌더링 방지

### 3. 메모이제이션
- 계산 결과 캐싱
- 복잡한 계산 최적화

### 4. 배치 처리
- 여러 업데이트를 배치로 처리
- UI 업데이트 최적화

## 에러 처리

### 1. 연결 에러
- 자동 재연결
- 연결 상태 표시
- 에러 로깅

### 2. 데이터 에러
- 데이터 검증
- 에러 복구
- 사용자 알림

### 3. 동기화 에러
- 충돌 해결
- 낙관적 업데이트 롤백
- 상태 복원

## 모니터링 및 디버깅

### 1. 연결 상태 모니터링
```typescript
const { isConnected, connectionStatus, lastSyncTime } = useRealtimeSync()

console.log('연결 상태:', connectionStatus.value)
console.log('마지막 동기화:', lastSyncTime.value)
```

### 2. 동기화 통계
```typescript
const { getSyncStats } = useRealtimeSync()

const stats = getSyncStats()
console.log('동기화 통계:', stats)
```

### 3. 이벤트 로깅
```typescript
realtimeEvents.subscribe('error_occurred', (data) => {
  console.error('실시간 에러:', data.error)
  // 에러 로깅 서비스에 전송
})
```

## 확장성

### 1. 새로운 데이터 타입 추가
- 타입 정의 추가
- Store에 데이터 관리 로직 추가
- 계산 composable 구현

### 2. 새로운 계산 로직 추가
- 기존 composable 확장
- 새로운 composable 생성

### 3. 새로운 이벤트 타입 추가
- 이벤트 타입 정의
- 이벤트 핸들러 구현

## 보안 고려사항

### 1. WebSocket 보안
- WSS 사용
- 인증 토큰 검증
- 메시지 암호화

### 2. 데이터 검증
- 입력 데이터 검증
- 타입 안전성 보장
- 악의적 데이터 차단

### 3. 접근 제어
- 사용자 권한 확인
- 데이터 접근 제한
- 민감한 정보 보호

## 결론

이 3계층 아키텍처는 실시간 데이터 동기화를 위한 확장 가능하고 유지보수가 용이한 구조를 제공합니다. 각 계층은 명확한 책임을 가지며, 느슨한 결합을 통해 독립적으로 개발하고 테스트할 수 있습니다.

