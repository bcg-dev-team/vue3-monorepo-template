# 차트 용어 가이드

차트에서 시간 간격을 나타내는 3가지 용어의 차이점을 정리합니다.

## 📝 핵심 용어들

### 1. **Timeframe**
- **쓰는 곳**: 사용자 인터페이스, 버튼, 드롭다운
- **예시**: `timeframe: "1h"`, `timeframe: "4h"`
- **용도**: 사용자가 차트에서 보는 시간 간격

```typescript
const handleTimeframeChange = (timeframe: string) => {
  emit('timeframe-change', timeframe);  // 1m, 5m, 1h, 1d
};
```

### 2. **Interval**
- **쓰는 곳**: TradingView API, 외부 API 호출
- **예시**: `interval: "1"`, `interval: "1D"`
- **용도**: 데이터를 요청할 때 사용하는 API 파라미터

```typescript
await chartManager.initializeChart({
  symbol: props.symbol,
  interval: '1',  // 1분
});
```

### 3. **Resolution**
- **쓰는 곳**: TradingView 라이브러리 내부
- **예시**: `resolution: "1"`, `resolution: "D"`
- **용도**: 차트를 그릴 때 시간 단위 설정

```typescript
function getBarStartTime(timestamp: number, resolution: string): number {
  // resolution을 사용해 Bar 시작 시간 계산
}
```

## 🎯 사용 요약

| **용도** | **사용 용어** | **예시** |
|---------|------------|---------|
| **UI** | `timeframe` | "1m", "5m", "1h", "1d" |
| **API 호출** | `interval` | "1", "5", "60", "1D" |
| **라이브러리** | `resolution` | "1", "5", "D", "W" |
