import { ws } from 'msw';

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

      // 구독 요청 처리
      if (message.type === 'subscribe') {
        handleSubscribe(client, message);
      }

      // 구독 해제 요청 처리
      if (message.type === 'unsubscribe') {
        handleUnsubscribe(client, message);
      }
    } catch (error) {
      console.error('[MSW WebSocket] 메시지 파싱 오류:', error);
    }
  });

  // 주기적으로 모킹 데이터 전송
  startMockDataStream(client);
};

/**
 * 구독 요청 처리
 */
const handleSubscribe = (client: any, message: any) => {
  const { symbol, interval } = message;
  console.log(`[MSW WebSocket] ${symbol} 구독 시작 (${interval})`);

  // 구독 확인 응답
  client.send(
    JSON.stringify({
      type: 'subscription_success',
      symbol,
      interval,
      timestamp: Date.now(),
    })
  );
};

/**
 * 구독 해제 처리
 */
const handleUnsubscribe = (client: any, message: any) => {
  const { symbol } = message;
  console.log(`[MSW WebSocket] ${symbol} 구독 해제`);

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
 * 모킹 데이터 스트림 시작
 */
const startMockDataStream = (client: any) => {
  let currentPrice = 50000; // 시작 가격
  let dailyOpen = currentPrice;
  let dailyHigh = currentPrice;
  let dailyLow = currentPrice;
  let dailyVolume = 0;

  // 하루 시작 시간 (자정)
  let currentDayStart = Math.floor(Date.now() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);

  const interval = setInterval(() => {
    const now = Date.now();
    const todayStart = Math.floor(now / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);

    // 새로운 날이 시작되었는지 확인
    if (todayStart > currentDayStart) {
      currentDayStart = todayStart;
      dailyOpen = currentPrice;
      dailyHigh = currentPrice;
      dailyLow = currentPrice;
      dailyVolume = 0;
      console.log('[MSW WebSocket] 새로운 거래일 시작');
    }

    // 현실적인 가격 변동 (작은 변동성)
    const volatility = 0.002; // 0.2% 변동성
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    const newPrice = Math.max(100, currentPrice + change);

    // 일일 최고/최저 업데이트
    dailyHigh = Math.max(dailyHigh, newPrice);
    dailyLow = Math.min(dailyLow, newPrice);

    // 볼륨 추가
    const volumeIncrement = Math.random() * 50 + 10;
    dailyVolume += volumeIncrement;

    currentPrice = newPrice;

    // TradingView 형식에 맞는 데이터 생성
    const mockData = {
      type: 'price_update',
      symbol: 'BTCUSDT',
      price: Math.round(currentPrice * 100) / 100,
      open: Math.round(dailyOpen * 100) / 100,
      high: Math.round(dailyHigh * 100) / 100,
      low: Math.round(dailyLow * 100) / 100,
      volume: Math.round(dailyVolume * 100) / 100,
      timestamp: now,
    };

    console.log('[MSW WebSocket] 실시간 데이터 전송:', {
      price: mockData.price,
      change: (((currentPrice - dailyOpen) / dailyOpen) * 100).toFixed(2) + '%',
      volume: mockData.volume,
    });

    // 클라이언트로 데이터 전송
    client.send(JSON.stringify(mockData));
  }, 2000); // 2초마다 업데이트 (더 현실적)

  // 연결 종료 시 인터벌 정리
  client.addEventListener('close', () => {
    console.log('[MSW WebSocket] 연결 종료, 데이터 스트림 중단');
    clearInterval(interval);
  });
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
