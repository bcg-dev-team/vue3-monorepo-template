import { ws } from 'msw';

/**
 * 심볼별 구독 상태 관리
 */
interface SubscriptionState {
  [symbol: string]: {
    active: boolean;
    interval: string;
    dataStream?: NodeJS.Timeout;
  };
}

const subscriptions: SubscriptionState = {};

/**
 * 실시간 차트 데이터 웹소켓 모킹
 */
export const mockChartDataConnection = (client: any, server: any) => {
  console.log('[MSW WebSocket] 차트 데이터 연결 수립');

  // 서버 연결 시뮬레이션 (실제 서버로 연결하지 않고 모킹)
  // server.connect(); // 실제 서버 연결이 필요한 경우 주석 해제

  // 클라이언트 메시지 처리
  client.addEventListener('message', (event: any) => {
    console.log('[MSW WebSocket] 클라이언트 메시지:', event.data);

    try {
      const message = JSON.parse(event.data);
      console.log('[MSW WebSocket] 파싱된 메시지:', message);

      // 구독 요청 처리
      if (message.type === 'subscribe') {
        console.log('[MSW WebSocket] 구독 요청 감지 - 심볼:', message.symbol);
        handleSubscribe(client, message);
      }

      // 구독 해제 요청 처리
      if (message.type === 'unsubscribe') {
        console.log('[MSW WebSocket] 구독 해제 요청 감지 - 심볼:', message.symbol);
        handleUnsubscribe(client, message);
      }
    } catch (error) {
      console.error('[MSW WebSocket] 메시지 파싱 오류:', error);
    }
  });

  // 연결 종료 시 모든 구독 정리
  client.addEventListener('close', () => {
    console.log('[MSW WebSocket] 연결 종료, 모든 구독 정리');
    Object.keys(subscriptions).forEach((symbol) => {
      if (subscriptions[symbol].dataStream) {
        clearInterval(subscriptions[symbol].dataStream);
      }
    });
  });
};

/**
 * 구독 요청 처리
 */
const handleSubscribe = (client: any, message: any) => {
  const { symbol, interval } = message;
  console.log(`[MSW WebSocket] ${symbol} 구독 시작 (${interval})`);

  // 기존 구독이 있다면 정리
  if (subscriptions[symbol] && subscriptions[symbol].dataStream) {
    console.log(`[MSW WebSocket] ${symbol} 기존 구독 정리 중...`);
    clearInterval(subscriptions[symbol].dataStream);
  }

  // 새로운 구독 등록
  subscriptions[symbol] = {
    active: true,
    interval,
  };

  console.log(
    `[MSW WebSocket] ${symbol} 구독 등록 완료. 현재 활성 구독:`,
    Object.keys(subscriptions)
  );

  // 구독 확인 응답
  client.send(
    JSON.stringify({
      type: 'subscription_success',
      symbol,
      interval,
      timestamp: Date.now(),
    })
  );

  // 해당 심볼의 데이터 스트림 시작
  startMockDataStream(client, symbol);
};

/**
 * 구독 해제 처리
 */
const handleUnsubscribe = (client: any, message: any) => {
  const { symbol } = message;
  console.log(`[MSW WebSocket] ${symbol} 구독 해제`);

  // 데이터 스트림 즉시 정리
  if (subscriptions[symbol] && subscriptions[symbol].dataStream) {
    console.log(`[MSW WebSocket] ${symbol} 데이터 스트림 즉시 정리`);
    clearInterval(subscriptions[symbol].dataStream);
    subscriptions[symbol].dataStream = undefined;
  }

  // 구독 상태 즉시 제거
  delete subscriptions[symbol];
  console.log(`[MSW WebSocket] ${symbol} 구독 상태 즉시 제거`);

  // 구독 해제 확인 응답
  client.send(
    JSON.stringify({
      type: 'unsubscription_success',
      symbol,
      timestamp: Date.now(),
    })
  );
};

/**
 * 심볼별 초기 가격 설정
 */
const getInitialPrice = (symbol: string): number => {
  switch (symbol) {
    case 'BTCUSDT':
      return 50000;
    case 'ETHUSDT':
      return 3000;
    case 'ETHEUR':
      return 2000; // EUR 기준 ETH 가격
    default:
      return 100;
  }
};

/**
 * 심볼별 변동성 설정
 */
const getVolatility = (symbol: string): number => {
  switch (symbol) {
    case 'BTCUSDT':
      return 0.4; // 0.2%
    case 'ETHUSDT':
      return 0.4; // 0.3% (ETH는 BTC보다 변동성이 조금 더 높음)
    case 'ETHEUR':
      return 0.4; // 0.3% (ETH는 BTC보다 변동성이 조금 더 높음)
    default:
      return 0.4;
  }
};

/**
 * 모킹 데이터 스트림 시작 (심볼별)
 */
const startMockDataStream = (client: any, symbol: string) => {
  let currentPrice = getInitialPrice(symbol);
  let barOpen = currentPrice;
  let barHigh = currentPrice;
  let barLow = currentPrice;
  let barVolume = 0;

  // 구독 정보에서 interval 가져오기
  const subscription = subscriptions[symbol];
  const interval = subscription?.interval || '1m';

  // interval에 따른 시간 간격 계산 (초 단위)
  let timeIntervalSeconds;
  switch (interval) {
    case '1m':
      timeIntervalSeconds = 60;
      break;
    case '5m':
      timeIntervalSeconds = 5 * 60;
      break;
    case '15m':
      timeIntervalSeconds = 15 * 60;
      break;
    case '30m':
      timeIntervalSeconds = 30 * 60;
      break;
    case '1h':
      timeIntervalSeconds = 60 * 60;
      break;
    case '4h':
      timeIntervalSeconds = 4 * 60 * 60;
      break;
    case '1D':
      timeIntervalSeconds = 24 * 60 * 60;
      break;
    default:
      timeIntervalSeconds = 60; // 기본값 1분
  }

  let currentBarStart =
    Math.floor(Date.now() / (timeIntervalSeconds * 1000)) * (timeIntervalSeconds * 1000);

  const updateInterval = setInterval(() => {
    // 구독이 비활성화되었는지 확인
    if (!subscriptions[symbol] || !subscriptions[symbol].active) {
      clearInterval(updateInterval);
      return;
    }

    const now = Date.now();
    const currentBar =
      Math.floor(now / (timeIntervalSeconds * 1000)) * (timeIntervalSeconds * 1000);

    // 새로운 Bar가 시작되었는지 확인
    if (currentBar > currentBarStart) {
      // 새로운 Bar 시작 - 이전 Bar 데이터를 전송
      const previousBarData = {
        type: 'price_update',
        symbol,
        price: currentPrice,
        open: barOpen,
        high: barHigh,
        low: barLow,
        volume: barVolume,
        timestamp: currentBarStart + 9 * 60 * 60 * 1000, // 한국 시간 (UTC+9)으로 변환
      };

      console.log(
        `[${symbol}] 새로운 ${interval} Bar 시작:`,
        new Date(currentBarStart).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      );

      // 이전 Bar 데이터 전송
      client.send(JSON.stringify(previousBarData));

      // 새로운 Bar 초기화
      currentBarStart = currentBar;
      barOpen = currentPrice;
      barHigh = currentPrice;
      barLow = currentPrice;
      barVolume = 0;
    }

    // 현실적인 가격 변동
    const volatility = getVolatility(symbol);
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    const newPrice = Math.max(100, currentPrice + change);

    // Bar 최고/최저 업데이트
    barHigh = Math.max(barHigh, newPrice);
    barLow = Math.min(barLow, newPrice);

    // 볼륨 추가 (심볼별로 다른 범위)
    const volumeRange = symbol === 'BTCUSDT' ? { min: 10, max: 50 } : { min: 20, max: 80 };
    const volumeIncrement = Math.random() * (volumeRange.max - volumeRange.min) + volumeRange.min;
    barVolume += volumeIncrement;

    currentPrice = newPrice;

    // 실시간 업데이트 데이터 (현재 Bar 내에서)
    const realtimeData = {
      type: 'price_update',
      symbol,
      price: Math.round(currentPrice * 100) / 100,
      open: Math.round(barOpen * 100) / 100,
      high: Math.round(barHigh * 100) / 100,
      low: Math.round(barLow * 100) / 100,
      volume: Math.round(barVolume * 100) / 100,
      timestamp: now + 9 * 60 * 60 * 1000, // 한국 시간 (UTC+9)으로 변환
    };

    // 실시간 데이터 전송 (Bar 내 업데이트)
    console.log(
      `[${symbol}] 현재 시간:`,
      new Date(now).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      `가격: ${realtimeData.price}`
    );

    client.send(JSON.stringify(realtimeData));
  }, 1000); // 1초마다 업데이트

  // 구독 상태에 인터벌 저장
  if (subscriptions[symbol]) {
    subscriptions[symbol].dataStream = updateInterval;
  }
};

/**
 * 현재 활성 구독 상태 조회
 */
export const getActiveSubscriptions = () => {
  return Object.keys(subscriptions).filter((symbol) => subscriptions[symbol].active);
};

/**
 * 테스트용: 모든 구독 강제 해제
 */
export const clearAllSubscriptions = () => {
  Object.keys(subscriptions).forEach((symbol) => {
    if (subscriptions[symbol].dataStream) {
      clearInterval(subscriptions[symbol].dataStream);
    }
  });
  Object.keys(subscriptions).forEach((key) => delete subscriptions[key]);
  console.log('[MSW WebSocket] 모든 구독이 강제 해제되었습니다.');
};

/**
 * 테스트용: 특정 심볼의 구독 상태 확인
 */
export const isSubscribed = (symbol: string): boolean => {
  return subscriptions[symbol]?.active || false;
};

/**
 * 테스트용: 구독 상태 정보 출력
 */
export const logSubscriptionStatus = () => {
  console.log('[MSW WebSocket] 현재 구독 상태:');
  if (Object.keys(subscriptions).length === 0) {
    console.log('  - 활성 구독 없음');
  } else {
    Object.entries(subscriptions).forEach(([symbol, state]) => {
      console.log(`  - ${symbol}: ${state.active ? '활성' : '비활성'} (${state.interval})`);
    });
  }
};

/**
 * 채팅 웹소켓 모킹 (예시)
 */
export const mockChatConnection = (client: any, server: any) => {
  console.log('[MSW WebSocket] 채팅 연결 수립');

  client.addEventListener('message', (event: any) => {
    try {
      const message = JSON.parse(event.data);

      // 채팅 메시지 에코백
      client.send(
        JSON.stringify({
          type: 'chat_message',
          user: 'MockUser',
          message: `Echo: ${message.text}`,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('[MSW WebSocket] 채팅 메시지 처리 오류:', error);
    }
  });
};

/*
테스트 예시 코드:

// 1. BTCUSDT 구독 시작
ws.send(JSON.stringify({
  type: 'subscribe',
  symbol: 'BTCUSDT',
  interval: '1m'
}));

// 2. ETHUSDT 구독 시작 (BTCUSDT는 계속 활성)
ws.send(JSON.stringify({
  type: 'subscribe',
  symbol: 'ETHUSDT',
  interval: '1m'
}));

// 3. BTCUSDT 구독 해제 (ETHUSDT만 활성)
ws.send(JSON.stringify({
  type: 'unsubscribe',
  symbol: 'BTCUSDT'
}));

// 4. ETHUSDT 구독 해제 (모든 구독 해제)
ws.send(JSON.stringify({
  type: 'unsubscribe',
  symbol: 'ETHUSDT'
}));

// 5. 구독 상태 확인 (브라우저 콘솔에서)
import { getActiveSubscriptions, logSubscriptionStatus, isSubscribed } from './mocks/wsResolvers';
logSubscriptionStatus();
console.log('활성 구독:', getActiveSubscriptions());
console.log('BTCUSDT 구독 중?', isSubscribed('BTCUSDT'));
console.log('ETHUSDT 구독 중?', isSubscribed('ETHUSDT'));

// 6. 모든 구독 강제 해제 (테스트용)
import { clearAllSubscriptions } from './mocks/wsResolvers';
clearAllSubscriptions();
*/
