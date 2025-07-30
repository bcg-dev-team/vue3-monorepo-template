// 개선된 스트리밍 구조 예시
import { parseFullSymbol } from './helpers.js';

// MSW WebSocket 연결
let socket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

// 개선된 구독 구조: 심볼별 단일 구독 + Resolution별 Bar 관리
const symbolSubscriptions = new Map(); // 심볼별 구독 정보

// 심볼별 Bar 캐시 (Resolution별로 관리)
const barCache = new Map(); // key: "ETH~EUR~1", value: { lastBar, handlers }

// WebSocket 연결 초기화
function initializeSocket() {
  try {
    socket = new WebSocket('wss://stream.binance.com/ws/combined');

    socket.addEventListener('open', () => {
      console.log('[MSW WebSocket] 연결됨');
      reconnectAttempts = 0;
      resubscribeAll();
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        handleMSWMessage(data);
      } catch (error) {
        console.error('[MSW WebSocket] 메시지 파싱 오류:', error);
      }
    });
  } catch (error) {
    console.error('[MSW WebSocket] 초기화 오류:', error);
  }
}

// 개선된 메시지 처리
function handleMSWMessage(data) {
  if (data.type === 'price_update') {
    const bar = {
      time: data.timestamp,
      open: data.open || data.price,
      high: data.high || data.price,
      low: data.low || data.price,
      close: data.price,
      volume: data.volume || 1000,
    };

    // 해당 심볼의 모든 Resolution에 대해 Bar 업데이트
    updateBarsForSymbol(data.symbol, bar);
  }
}

// 심볼별 모든 Resolution Bar 업데이트
function updateBarsForSymbol(symbol, realtimeBar) {
  // 해당 심볼의 모든 Resolution 찾기
  const symbolKeys = Array.from(barCache.keys()).filter((key) => key.startsWith(symbol));

  symbolKeys.forEach((cacheKey) => {
    const [symbolPart, resolution] = cacheKey.split('~');
    const cacheItem = barCache.get(cacheKey);

    if (cacheItem) {
      const updatedBar = createOrUpdateBar(realtimeBar, cacheItem.lastBar, resolution);

      // 캐시 업데이트
      cacheItem.lastBar = updatedBar;

      // 해당 Resolution의 모든 핸들러에 데이터 전송
      cacheItem.handlers.forEach((handler) => {
        try {
          handler.callback(updatedBar);
        } catch (error) {
          console.error(`[MSW WebSocket] 핸들러 콜백 오류:`, error);
        }
      });
    }
  });
}

// Resolution별 Bar 생성/업데이트
function createOrUpdateBar(realtimeBar, lastBar, resolution) {
  const timeInterval = getTimeInterval(resolution);
  const barTimeInSeconds = Math.floor(realtimeBar.time / 1000);
  const currentBarStart = Math.floor(barTimeInSeconds / timeInterval) * timeInterval;

  if (!lastBar) {
    // 첫 번째 Bar 생성
    return {
      time: currentBarStart * 1000,
      open: realtimeBar.close,
      high: realtimeBar.close,
      low: realtimeBar.close,
      close: realtimeBar.close,
      volume: realtimeBar.volume,
    };
  }

  const lastBarTimeInSeconds = Math.floor(lastBar.time / 1000);
  const lastBarStart = Math.floor(lastBarTimeInSeconds / timeInterval) * timeInterval;

  if (currentBarStart > lastBarStart) {
    // 새로운 Bar 생성
    return {
      time: currentBarStart * 1000,
      open: realtimeBar.close,
      high: realtimeBar.close,
      low: realtimeBar.close,
      close: realtimeBar.close,
      volume: realtimeBar.volume,
    };
  } else {
    // 기존 Bar 업데이트
    return {
      ...lastBar,
      high: Math.max(lastBar.high, realtimeBar.high || realtimeBar.close),
      low: Math.min(lastBar.low, realtimeBar.low || realtimeBar.close),
      close: realtimeBar.close,
      volume: lastBar.volume + (realtimeBar.volume || 1000),
    };
  }
}

// 시간 간격 계산
function getTimeInterval(resolution) {
  switch (resolution) {
    case '1':
      return 60;
    case '5':
      return 5 * 60;
    case '15':
      return 15 * 60;
    case '30':
      return 30 * 60;
    case '60':
      return 60 * 60;
    case '240':
      return 4 * 60 * 60;
    case '1D':
      return 24 * 60 * 60;
    case '1W':
      return 7 * 24 * 60 * 60;
    case '1M':
      return 30 * 24 * 60 * 60;
    default:
      return 24 * 60 * 60;
  }
}

// 개선된 구독 함수
export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback,
  lastDailyBar
) {
  const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
  const symbolKey = `${parsedSymbol.fromSymbol}${parsedSymbol.toSymbol}`;
  const cacheKey = `${symbolKey}~${resolution}`;

  console.log('[subscribeOnStream] 개선된 구독:', {
    symbolKey,
    resolution,
    subscriberUID,
    cacheKey,
  });

  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  // 기존 캐시 확인
  let cacheItem = barCache.get(cacheKey);

  if (cacheItem) {
    // 기존 Resolution에 핸들러 추가
    cacheItem.handlers.push(handler);
    console.log(`[subscribeOnStream] 기존 Resolution에 핸들러 추가: ${cacheKey}`);
  } else {
    // 새로운 Resolution 캐시 생성
    cacheItem = {
      lastBar: lastDailyBar || createInitialBar(parsedSymbol),
      handlers: [handler],
    };
    barCache.set(cacheKey, cacheItem);
    console.log(`[subscribeOnStream] 새로운 Resolution 캐시 생성: ${cacheKey}`);
  }

  // WebSocket 구독은 심볼별로 하나만
  if (!symbolSubscriptions.has(symbolKey)) {
    symbolSubscriptions.set(symbolKey, {
      symbol: symbolKey,
      handlers: [], // WebSocket 핸들러는 별도 관리
    });

    // WebSocket 구독 요청
    sendSubscribeMessage(symbolKey);
  }
}

// 초기 Bar 생성
function createInitialBar(parsedSymbol) {
  const currentTime = Math.floor(Date.now() / 1000);
  const defaultPrice = parsedSymbol.fromSymbol === 'ETH' ? 2800 : 50000;

  return {
    time: currentTime * 1000,
    open: defaultPrice,
    high: defaultPrice,
    low: defaultPrice,
    close: defaultPrice,
    volume: 1000,
  };
}

// 구독 해제
export function unsubscribeFromStream(subscriberUID) {
  console.log('[unsubscribeFromStream] 개선된 구독 해제:', subscriberUID);

  // 모든 캐시에서 해당 핸들러 찾기
  for (const [cacheKey, cacheItem] of barCache.entries()) {
    const handlerIndex = cacheItem.handlers.findIndex((handler) => handler.id === subscriberUID);

    if (handlerIndex !== -1) {
      // 핸들러 제거
      cacheItem.handlers.splice(handlerIndex, 1);
      console.log(`[unsubscribeFromStream] 핸들러 제거: ${subscriberUID} from ${cacheKey}`);

      if (cacheItem.handlers.length === 0) {
        // 해당 Resolution의 마지막 핸들러였다면 캐시 제거
        barCache.delete(cacheKey);
        console.log(`[unsubscribeFromStream] Resolution 캐시 제거: ${cacheKey}`);

        // 해당 심볼의 모든 Resolution이 제거되었는지 확인
        const symbolKey = cacheKey.split('~')[0];
        const remainingResolutions = Array.from(barCache.keys()).filter((key) =>
          key.startsWith(symbolKey)
        );

        if (remainingResolutions.length === 0) {
          // 심볼 구독도 제거
          symbolSubscriptions.delete(symbolKey);
          sendUnsubscribeMessage(symbolKey);
          console.log(`[unsubscribeFromStream] 심볼 구독 완전 해제: ${symbolKey}`);
        }
      }
      break;
    }
  }
}

// 구독 상태 확인 (디버깅용)
export function getSubscriptionStatus() {
  return {
    symbolSubscriptions: Array.from(symbolSubscriptions.keys()),
    barCache: Array.from(barCache.entries()).map(([key, item]) => ({
      resolution: key,
      handlerCount: item.handlers.length,
      lastBar: item.lastBar,
    })),
    totalHandlers: Array.from(barCache.values()).reduce(
      (total, item) => total + item.handlers.length,
      0
    ),
  };
}

// WebSocket 메시지 전송 함수들
function sendSubscribeMessage(symbolKey) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const subscribeMessage = {
      type: 'subscribe',
      symbol: symbolKey,
      interval: '1m',
    };
    console.log('[MSW WebSocket] 구독 요청:', subscribeMessage);
    socket.send(JSON.stringify(subscribeMessage));
  }
}

function sendUnsubscribeMessage(symbolKey) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = {
      type: 'unsubscribe',
      symbol: symbolKey,
    };
    console.log('[MSW WebSocket] 구독 해제 요청:', unsubscribeMessage);
    socket.send(JSON.stringify(unsubscribeMessage));
  }
}

function resubscribeAll() {
  symbolSubscriptions.forEach((subscription, symbolKey) => {
    sendSubscribeMessage(symbolKey);
  });
}

// 초기화
initializeSocket();
