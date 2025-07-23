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

    // 모든 구독자에게 데이터 전송
    channelToSubscription.forEach((subscriptionItem, channelString) => {
      console.log('[MSW WebSocket] 구독 확인:', { channelString, dataSymbol: data.symbol });

      // 심볼 매칭 개선
      const parts = channelString.split('~');
      const channelSymbol = parts.length >= 4 ? `${parts[2]}${parts[3]}` : '';
      const symbolMatches =
        data.symbol === channelSymbol ||
        channelString.includes(data.symbol) ||
        (data.symbol === 'ETHEUR' && channelSymbol === 'ETHEUR') ||
        (data.symbol === 'BTCEUR' && channelSymbol === 'BTCEUR');

      if (symbolMatches && subscriptionItem.lastDailyBar) {
        const resolution = subscriptionItem.resolution;
        const lastBar = subscriptionItem.lastDailyBar;

        // 해상도에 따른 시간 간격 계산
        let timeInterval;
        switch (resolution) {
          case '1':
            timeInterval = 60;
            break; // 1분
          case '5':
            timeInterval = 5 * 60;
            break; // 5분
          case '15':
            timeInterval = 15 * 60;
            break; // 15분
          case '30':
            timeInterval = 30 * 60;
            break; // 30분
          case '60':
            timeInterval = 60 * 60;
            break; // 1시간
          case '240':
            timeInterval = 4 * 60 * 60;
            break; // 4시간
          case '1D':
            timeInterval = 24 * 60 * 60;
            break; // 1일
          case '1W':
            timeInterval = 7 * 24 * 60 * 60;
            break; // 1주
          case '1M':
            timeInterval = 30 * 24 * 60 * 60;
            break; // 1개월
          default:
            timeInterval = 24 * 60 * 60; // 기본값: 1일
        }

        // 현재 Bar의 시작 시간 계산
        const currentBarStart = Math.floor(bar.time / timeInterval) * timeInterval;
        const lastBarStart = Math.floor(lastBar.time / timeInterval) * timeInterval;

        let updatedBar;
        if (currentBarStart > lastBarStart) {
          // 새로운 Bar 생성
          updatedBar = {
            time: currentBarStart,
            open: bar.open || bar.close,
            high: bar.high || bar.close,
            low: bar.low || bar.close,
            close: bar.close,
            volume: bar.volume || 1000,
          };
          console.log('[MSW WebSocket] 새로운 Bar 생성:', updatedBar);
        } else {
          // 기존 Bar 업데이트
          updatedBar = {
            ...lastBar,
            high: Math.max(lastBar.high, bar.high || bar.close),
            low: Math.min(lastBar.low, bar.low || bar.close),
            close: bar.close,
            volume: lastBar.volume + (bar.volume || 1000),
          };
          console.log('[MSW WebSocket] 기존 Bar 업데이트:', updatedBar);
        }

        // 캐시 업데이트
        subscriptionItem.lastDailyBar = updatedBar;

        // 모든 핸들러에 데이터 전송
        console.log('[MSW WebSocket] 핸들러 수:', subscriptionItem.handlers.length);
        subscriptionItem.handlers.forEach((handler, index) => {
          try {
            handler.callback(updatedBar);
          } catch (error) {
            console.error(`[MSW WebSocket] 핸들러 ${index} 콜백 오류:`, error);
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
    // channelString에서 심볼 정보 추출 (예: "msw~BINANCE~ETH~EUR")
    const parts = channelString.split('~');
    const symbol = parts.length >= 4 ? `${parts[2]}${parts[3]}` : 'BTCUSDT'; // 기본값

    const subscribeMessage = {
      type: 'subscribe',
      symbol: symbol,
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
    // channelString에서 심볼 정보 추출
    const parts = channelString.split('~');
    const symbol = parts.length >= 4 ? `${parts[2]}${parts[3]}` : 'BTCUSDT';

    const unsubscribeMessage = {
      type: 'unsubscribe',
      symbol: symbol,
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

  console.log('[subscribeOnStream] 파싱된 심볼:', parsedSymbol);
  console.log('[subscribeOnStream] 채널 문자열:', channelString);

  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    // 이미 구독된 채널이면 핸들러만 추가
    subscriptionItem.handlers.push(handler);
    console.log('[subscribeOnStream] 기존 구독에 핸들러 추가:', channelString);
    console.log('[subscribeOnStream] 현재 핸들러 수:', subscriptionItem.handlers.length);
    return;
  }

  // 새로운 구독 생성
  const currentTime = Math.floor(Date.now() / 1000);
  const defaultPrice = parsedSymbol.fromSymbol === 'ETH' ? 2800 : 50000; // ETH는 2800, BTC는 50000

  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar: lastDailyBar || {
      time: currentTime,
      open: defaultPrice,
      high: defaultPrice,
      low: defaultPrice,
      close: defaultPrice,
      volume: 1000,
    },
    handlers: [handler],
  };

  console.log('[subscribeOnStream] 새 구독 생성:', {
    channelString,
    resolution,
    defaultPrice,
    currentTime,
    handlerCount: subscriptionItem.handlers.length,
  });

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
    details: Array.from(channelToSubscription.entries()).map(([channel, sub]) => ({
      channel,
      resolution: sub.resolution,
      handlerCount: sub.handlers.length,
      lastBar: sub.lastDailyBar,
    })),
  };
}

// 브라우저 콘솔에서 사용할 수 있는 전역 디버깅 함수들
if (typeof window !== 'undefined') {
  window.debugTradingView = {
    getSubscriptionStatus,
    isConnected,
    reconnect,
    logSubscriptions: () => {
      const status = getSubscriptionStatus();
      console.log('=== TradingView 구독 상태 ===');
      console.log('연결 상태:', status.connected);
      console.log('총 구독자 수:', status.subscriberCount);
      console.log('구독 상세:', status.details);
    },
  };
}
