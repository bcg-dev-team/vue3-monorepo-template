import { parseFullSymbol } from './helpers.js';

// MSW WebSocket 연결 (Binance 스트림 모킹)
let socket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

// 단순화된 구독 구조: 각 구독을 독립적으로 관리
const subscriptions = new Map(); // key: subscriberUID, value: { symbol, resolution, lastBar, callback }

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

// 메시지 처리
function handleMSWMessage(data) {
  console.log('[handleMSWMessage] 받은 데이터:', data);

  if (data.type === 'price_update') {
    // MSW 가격 업데이트를 TradingView Bar 형식으로 변환
    const realtimeBar = {
      time: data.timestamp,
      open: data.open || data.price,
      high: data.high || data.price,
      low: data.low || data.price,
      close: data.price,
      volume: data.volume || 1000,
    };

    console.log('[handleMSWMessage] 변환된 realtimeBar:', realtimeBar);
    console.log('[handleMSWMessage] 현재 구독 목록:', Array.from(subscriptions.entries()));

    // 해당 심볼의 모든 구독에 대해 Bar 업데이트
    updateBarsForSymbol(data.symbol, realtimeBar);
  } else if (data.type === 'subscription_success') {
    console.log('[MSW WebSocket] 구독 성공:', data);
  } else if (data.type === 'unsubscription_success') {
    console.log('[MSW WebSocket] 구독 해제 성공:', data);
  }
}

// 심볼별 모든 구독 Bar 업데이트
function updateBarsForSymbol(symbol, realtimeBar) {
  let matchedCount = 0;

  // window.lastChartData 업데이트 (TradingPlatformView와 동기화)
  if (typeof window !== 'undefined') {
    if (!window.lastChartData) {
      window.lastChartData = {};
    }
    window.lastChartData[symbol] = realtimeBar;
    console.log(`[updateBarsForSymbol] window.lastChartData 업데이트: ${symbol}`, realtimeBar);

    // window.chartData도 업데이트 (ChartView와 동기화)
    if (!window.chartData) {
      window.chartData = {};
    }

    // 심볼 형식 통일 (슬래시 포함)
    let normalizedSymbol = symbol;
    if (symbol.length === 6 && !symbol.includes('/')) {
      // 6자리 연결 형식을 슬래시 형식으로 변환
      normalizedSymbol = `${symbol.substring(0, 3)}/${symbol.substring(3)}`;
    }

    // 기존 데이터가 있으면 업데이트, 없으면 새로 생성
    if (!window.chartData[normalizedSymbol]) {
      window.chartData[normalizedSymbol] = {};
    }

    // 차트별 데이터 저장
    if (!window.chartData[normalizedSymbol].charts) {
      window.chartData[normalizedSymbol].charts = {};
    }

    // 모든 관련 차트에 대해 데이터 업데이트
    const relatedCharts = [
      normalizedSymbol, // ETH/EUR 형식
      symbol, // ETHEUR 형식
      symbol.replace('/', ''), // 슬래시 제거된 형식
    ];

    // 각 구독자별로 차트 데이터 생성
    subscriptions.forEach((subscription, subscriberUID) => {
      if (subscription.symbol === symbol) {
        const chartKey = `chart_${subscriberUID}`;

        // 차트별로 약간 다른 가격 생성 (실제 거래소처럼)
        const priceVariation = (subscriberUID.charCodeAt(0) % 5) * 0.001; // 0~0.5% 변동
        const chartPrice = realtimeBar.close * (1 + priceVariation);

        relatedCharts.forEach((chartSymbol) => {
          if (chartSymbol) {
            if (!window.chartData[normalizedSymbol].charts[chartKey]) {
              window.chartData[normalizedSymbol].charts[chartKey] = {};
            }

            window.chartData[normalizedSymbol].charts[chartKey][chartSymbol] = {
              symbol: chartSymbol,
              price: chartPrice,
              time: realtimeBar.time,
              timestamp: Date.now(),
              source: 'streaming',
              subscriberUID: subscriberUID,
            };
          }
        });
      }
    });

    // 전체 심볼의 최신 가격 정보 업데이트
    window.chartData[normalizedSymbol].latestPrice = realtimeBar.close;
    window.chartData[normalizedSymbol].lastUpdate = Date.now();
    window.chartData[normalizedSymbol].symbol = normalizedSymbol;

    // 차트 데이터 변경 이벤트 발생
    window.dispatchEvent(
      new CustomEvent('chartDataUpdate', {
        detail: {
          symbol: normalizedSymbol,
          data: {
            symbol: normalizedSymbol,
            price: realtimeBar.close,
            time: realtimeBar.time,
            timestamp: Date.now(),
            source: 'streaming',
            allCharts: window.chartData[normalizedSymbol].charts,
          },
        },
      })
    );

    console.log(
      `[updateBarsForSymbol] window.chartData 업데이트: ${normalizedSymbol}`,
      window.chartData[normalizedSymbol]
    );
  }

  // 해당 심볼의 모든 구독 찾기
  subscriptions.forEach((subscription, subscriberUID) => {
    if (subscription.symbol === symbol) {
      matchedCount++;
      console.log('[updateBarsForSymbol] 매칭된 구독 발견:', subscriberUID);

      const updatedBar = createOrUpdateBar(
        realtimeBar,
        subscription.lastBar,
        subscription.resolution
      );

      // 구독의 lastBar 업데이트
      subscription.lastBar = updatedBar;

      // 콜백 호출
      try {
        subscription.callback(updatedBar);
      } catch (error) {
        console.error(`[MSW WebSocket] 구독 ${subscriberUID} 콜백 오류:`, error);
      }
    }
  });

  console.log('[updateBarsForSymbol] 완료:', { symbol, matchedCount });
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
    const newBar = {
      time: currentBarStart * 1000, // 밀리초 단위로 변환
      open: realtimeBar.close, // 새로운 Bar의 시작가는 현재 가격
      high: realtimeBar.close,
      low: realtimeBar.close,
      close: realtimeBar.close,
      volume: realtimeBar.volume || 1000,
    };
    console.log(
      `[${resolution}분봉] 새로운 Bar 생성:`,
      new Date(currentBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    );
    return newBar;
  } else {
    // 기존 Bar 업데이트
    return {
      ...lastBar,
      time: lastBar.time, // 기존 시간 유지 (이미 밀리초 단위)
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
      return 24 * 60 * 60; // 기본값: 1일
  }
}

// 모든 기존 구독 재구독
function resubscribeAll() {
  // 심볼별로 중복 제거하여 구독
  const uniqueSymbols = new Set();
  subscriptions.forEach((subscription) => {
    uniqueSymbols.add(subscription.symbol);
  });

  uniqueSymbols.forEach((symbol) => {
    sendSubscribeMessage(symbol);
  });
}

// 구독 메시지 전송
function sendSubscribeMessage(symbol) {
  console.log('[sendSubscribeMessage] 호출:', { symbol, socketState: socket?.readyState });

  if (socket && socket.readyState === WebSocket.OPEN) {
    const subscribeMessage = {
      type: 'subscribe',
      symbol: symbol,
    };

    console.log('[sendSubscribeMessage] 구독 요청:', subscribeMessage);
    socket.send(JSON.stringify(subscribeMessage));
    console.log('[sendSubscribeMessage] 메시지 전송 완료');
  } else {
    console.error('[sendSubscribeMessage] WebSocket이 연결되지 않음:', {
      socket: !!socket,
      readyState: socket?.readyState,
      expectedState: WebSocket.OPEN,
    });
  }
}

// 구독 해제 메시지 전송
function sendUnsubscribeMessage(symbol) {
  console.log('[sendUnsubscribeMessage] 호출:', { symbol, socketState: socket?.readyState });

  if (socket && socket.readyState === WebSocket.OPEN) {
    const unsubscribeMessage = {
      type: 'unsubscribe',
      symbol: symbol,
    };

    console.log('[sendUnsubscribeMessage] 구독 해제 요청:', unsubscribeMessage);
    socket.send(JSON.stringify(unsubscribeMessage));
  } else {
    console.error('[sendUnsubscribeMessage] WebSocket이 연결되지 않음');
  }
}

// 소켓 초기화 (모듈 로드 시)
initializeSocket();

// 현재 구독 상태 확인 (디버깅용)
export function getSubscriptionStatus() {
  const symbolCounts = new Map();
  subscriptions.forEach((subscription) => {
    const count = symbolCounts.get(subscription.symbol) || 0;
    symbolCounts.set(subscription.symbol, count + 1);
  });

  return {
    connected: isConnected(),
    subscriptions: Array.from(subscriptions.entries()).map(([uid, sub]) => ({
      uid,
      symbol: sub.symbol,
      resolution: sub.resolution,
      lastBar: sub.lastBar,
    })),
    symbolCounts: Object.fromEntries(symbolCounts),
    totalSubscriptions: subscriptions.size,
  };
}

// 구독 함수
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
  const symbol = `${parsedSymbol.fromSymbol}${parsedSymbol.toSymbol}`;

  // 기본 가격 설정 (차트별로 약간 다른 가격)
  const currentTime = Math.floor(Date.now() / 1000);
  let defaultPrice = parsedSymbol.fromSymbol === 'ETH' ? 2800 : 50000; // ETH는 2800, BTC는 50000

  // subscriberUID를 기반으로 차트별 가격 변동
  const chartVariation = (subscriberUID.charCodeAt(0) % 10) * 0.01; // 0~9% 변동
  defaultPrice = defaultPrice * (1 + chartVariation);

  // WebSocket 구독 상태 확인 (구독 추가 전에 확인)
  const symbolSubscribed = Array.from(subscriptions.values()).some((sub) => sub.symbol === symbol);

  const subscription = {
    symbol,
    resolution,
    lastBar: lastDailyBar || {
      time: currentTime * 1000,
      open: defaultPrice,
      high: defaultPrice,
      low: defaultPrice,
      close: defaultPrice,
      volume: 1000,
    },
    callback: onRealtimeCallback,
    subscriberUID, // 구독자 ID 추가
  };

  subscriptions.set(subscriberUID, subscription);

  // WebSocket 구독 (심볼이 아직 구독되지 않은 경우에만)
  if (!symbolSubscribed) {
    sendSubscribeMessage(symbol);
    console.log('[subscribeOnStream] 새로운 심볼 구독:', symbol);
  } else {
    console.log('[subscribeOnStream] 이미 구독된 심볼:', symbol);
  }
}

// 단순화된 구독 해제 함수
export function unsubscribeFromStream(subscriberUID) {
  console.log('[unsubscribeFromStream] 호출:', subscriberUID);

  const subscription = subscriptions.get(subscriberUID);
  if (!subscription) {
    console.log('[unsubscribeFromStream] 구독을 찾을 수 없음:', subscriberUID);
    return;
  }

  // 구독 제거
  subscriptions.delete(subscriberUID);

  // 해당 심볼의 다른 구독이 있는지 확인
  const symbolSubscribed = Array.from(subscriptions.values()).some(
    (sub) => sub.symbol === subscription.symbol
  );

  if (!symbolSubscribed) {
    // 심볼 구독 해제
    sendUnsubscribeMessage(subscription.symbol);
    console.log('[unsubscribeFromStream] 심볼 구독 해제:', subscription.symbol);
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
