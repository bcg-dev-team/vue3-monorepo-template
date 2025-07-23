import { parseFullSymbol } from './helpers.js';

// MSW WebSocket 연결 (Binance 스트림 모킹)
let socket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const channelToSubscription = new Map();

// WebSocket 연결 초기화
function initializeSocket() {
  try {
    // MSW로 모킹된 Binance WebSocket 연결
    socket = new WebSocket('wss://stream.binance.com/ws/combined');

    socket.addEventListener('open', () => {
      console.log('[MSW WebSocket] 연결됨');
      reconnectAttempts = 0;

      // 기존 구독들 재구독
      resubscribeAll();
    });

    socket.addEventListener('close', (reason) => {
      console.log('[MSW WebSocket] 연결 종료:', reason);
      socket = null;

      // 재연결 시도
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        const delay = 1000 * Math.pow(2, reconnectAttempts); // 지수 백오프
        console.log(
          `[MSW WebSocket] ${delay}ms 후 재연결 시도 (${reconnectAttempts}/${maxReconnectAttempts})`
        );

        setTimeout(() => {
          initializeSocket();
        }, delay);
      }
    });

    socket.addEventListener('error', (error) => {
      console.error('[MSW WebSocket] 오류:', error);
    });

    // MSW에서 오는 메시지 처리
    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[MSW WebSocket] 메시지 수신:', data);
        handleMSWMessage(data);
      } catch (error) {
        console.error('[MSW WebSocket] 메시지 파싱 오류:', error);
      }
    });
  } catch (error) {
    console.error('[MSW WebSocket] 초기화 오류:', error);
  }
}

// MSW WebSocket 메시지 처리
function handleMSWMessage(data) {
  if (data.type === 'price_update') {
    // MSW 가격 업데이트를 TradingView Bar 형식으로 변환
    const bar = {
      time: Math.floor(data.timestamp / 1000), // 밀리초를 초로 변환
      open: data.open || data.price,
      high: data.high || data.price,
      low: data.low || data.price,
      close: data.price,
      volume: data.volume || 1000,
    };

    console.log('[MSW WebSocket] 변환된 Bar 데이터:', bar);

    // 모든 구독자에게 데이터 전송
    channelToSubscription.forEach((subscriptionItem, channelString) => {
      // 심볼 매칭 (간단한 버전, 실제로는 더 정교해야 함)
      const symbolMatches =
        data.symbol === 'BTCUSDT' || data.symbol === 'BTCEUR' || channelString.includes('BTC');

      if (symbolMatches && subscriptionItem.lastDailyBar) {
        // 현재 날의 Bar인지 새로운 날의 Bar인지 확인
        const lastBarTime = subscriptionItem.lastDailyBar.time;
        const currentDayStart = Math.floor(bar.time / 86400) * 86400; // 하루 시작 시간
        const lastBarDayStart = Math.floor(lastBarTime / 86400) * 86400;

        let updatedBar;
        if (currentDayStart > lastBarDayStart) {
          // 새로운 날의 첫 Bar
          updatedBar = {
            ...bar,
            time: currentDayStart,
          };
          console.log('[MSW WebSocket] 새로운 일일 Bar 생성:', updatedBar);
        } else {
          // 기존 Bar 업데이트
          updatedBar = {
            ...subscriptionItem.lastDailyBar,
            high: Math.max(subscriptionItem.lastDailyBar.high, bar.high),
            low: Math.min(subscriptionItem.lastDailyBar.low, bar.low),
            close: bar.close,
            volume: subscriptionItem.lastDailyBar.volume + bar.volume,
          };
          console.log('[MSW WebSocket] 기존 Bar 업데이트:', updatedBar);
        }

        // 캐시 업데이트
        subscriptionItem.lastDailyBar = updatedBar;

        // 모든 핸들러에 데이터 전송
        subscriptionItem.handlers.forEach((handler) => {
          try {
            handler.callback(updatedBar);
          } catch (error) {
            console.error('[MSW WebSocket] 콜백 오류:', error);
          }
        });
      }
    });
  } else if (data.type === 'subscription_success') {
    console.log('[MSW WebSocket] 구독 성공:', data);
  } else if (data.type === 'unsubscription_success') {
    console.log('[MSW WebSocket] 구독 해제 성공:', data);
  }
}

// 모든 기존 구독 재구독
function resubscribeAll() {
  channelToSubscription.forEach((subscriptionItem, channelString) => {
    sendSubscribeMessage(channelString, subscriptionItem);
  });
}

// 구독 메시지 전송
function sendSubscribeMessage(channelString, subscriptionItem) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const subscribeMessage = {
      type: 'subscribe',
      symbol: 'BTCUSDT', // 기본 심볼
      interval: subscriptionItem.resolution || '1D',
      channel: channelString,
    };

    console.log('[MSW WebSocket] 구독 요청:', subscribeMessage);
    socket.send(JSON.stringify(subscribeMessage));
  }
}

// 구독 해제 메시지 전송
function sendUnsubscribeMessage(channelString) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = {
      type: 'unsubscribe',
      channel: channelString,
    };

    console.log('[MSW WebSocket] 구독 해제 요청:', unsubscribeMessage);
    socket.send(JSON.stringify(unsubscribeMessage));
  }
}

// 소켓 초기화 (모듈 로드 시)
initializeSocket();

// MSW WebSocket 구독
export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback,
  lastDailyBar
) {
  console.log('[subscribeOnStream] 호출:', {
    symbolInfo: symbolInfo.full_name,
    resolution,
    subscriberUID,
  });

  // 심볼 파싱 (MSW 버전)
  const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
  const channelString = `msw~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;

  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    // 이미 구독된 채널이면 핸들러만 추가
    subscriptionItem.handlers.push(handler);
    console.log('[subscribeOnStream] 기존 구독에 핸들러 추가:', channelString);
    return;
  }

  // 새로운 구독 생성
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar: lastDailyBar || {
      time: Math.floor(Date.now() / 1000),
      open: 50000,
      high: 50000,
      low: 50000,
      close: 50000,
      volume: 1000,
    },
    handlers: [handler],
  };

  channelToSubscription.set(channelString, subscriptionItem);
  console.log('[subscribeOnStream] 새 구독 생성:', channelString);

  // MSW WebSocket으로 구독 메시지 전송
  sendSubscribeMessage(channelString, subscriptionItem);
}

// MSW WebSocket 구독 해제
export function unsubscribeFromStream(subscriberUID) {
  console.log('[unsubscribeFromStream] 호출:', subscriberUID);

  // subscriberUID와 일치하는 구독 찾기
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // 핸들러 제거
      subscriptionItem.handlers.splice(handlerIndex, 1);
      console.log(`[unsubscribeFromStream] 핸들러 제거: ${subscriberUID} from ${channelString}`);

      if (subscriptionItem.handlers.length === 0) {
        // 마지막 핸들러였다면 채널 구독 해제
        console.log('[unsubscribeFromStream] 채널 구독 완전 해제:', channelString);

        // MSW WebSocket으로 구독 해제 메시지 전송
        sendUnsubscribeMessage(channelString);

        // 메모리에서 제거
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}

// MSW WebSocket 연결 상태 확인
export function isConnected() {
  return socket && socket.readyState === WebSocket.OPEN;
}

// MSW WebSocket 수동 재연결
export function reconnect() {
  if (socket) {
    socket.close();
  }
  reconnectAttempts = 0;
  initializeSocket();
}

// 현재 구독 상태 확인 (디버깅용)
export function getSubscriptionStatus() {
  return {
    connected: isConnected(),
    subscriptions: Array.from(channelToSubscription.keys()),
    subscriberCount: Array.from(channelToSubscription.values()).reduce(
      (total, sub) => total + sub.handlers.length,
      0
    ),
  };
}
