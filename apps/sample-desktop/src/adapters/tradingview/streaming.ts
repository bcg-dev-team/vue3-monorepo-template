import { parseFullSymbol, type ParsedSymbol } from './helpers';
import { getDataSourceConfig } from '../../config/dataSource';

/**
 * WebSocket 연결 상태 타입
 */
type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

/**
 * TradingView Bar 데이터 인터페이스
 */
export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * 실시간 데이터 인터페이스
 */
interface RealtimeData {
  type: string;
  symbol: string;
  timestamp: number;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

/**
 * 구독 정보 인터페이스
 */
interface Subscription {
  symbol: string;
  resolution: string;
  lastBar: Bar | null;
  callback: (bar: Bar) => void;
}

/**
 * 심볼 정보 인터페이스
 */
interface SymbolInfo {
  full_name?: string;
  name?: string;
}

/**
 * 연결 상태 정보 인터페이스
 */
export interface ConnectionStatus {
  state: ConnectionState;
  connected: boolean;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  connectionDuration: number;
}

/**
 * 구독 상태 정보 인터페이스
 */
export interface SubscriptionStatus {
  connected: boolean;
  connectionState: ConnectionState;
  connectionDuration: number;
  reconnectAttempts: number;
  subscriptions: Array<{
    uid: string;
    symbol: string;
    resolution: string;
    lastBar: Bar | null;
  }>;
  symbolCounts: Record<string, number>;
  totalSubscriptions: number;
}

// MSW WebSocket 연결 (Binance 스트림 모킹)
let socket: WebSocket | null = null;
let reconnectAttempts: number = 0;
const maxReconnectAttempts: number = 5;

// 연결 상태 추적을 위한 변수들 추가
let connectionStartTime: number | null = null;
let connectionState: ConnectionState = 'disconnected';
let reconnectTimer: NodeJS.Timeout | null = null;
let connectionTimeout: NodeJS.Timeout | null = null;

// 단순화된 구독 구조: 각 구독을 독립적으로 관리
const subscriptions = new Map<string, Subscription>(); // key: subscriberUID, value: { symbol, resolution, lastBar, callback }

// 이벤트 핸들러 함수들을 별도로 정의하여 제거 가능하게 만듦
const handleOpen = () => {
  console.log('[MSW WebSocket] 연결됨');
  connectionState = 'connected';
  reconnectAttempts = 0;
  connectionStartTime = Date.now();

  // 연결 타임아웃 정리
  if (connectionTimeout) {
    clearTimeout(connectionTimeout);
    connectionTimeout = null;
  }

  // 기존 구독들 재구독
  resubscribeAll();
};

const handleClose = (event: CloseEvent): void => {
  console.log('[MSW WebSocket] 연결 종료:', {
    code: event.code,
    reason: event.reason,
    wasClean: event.wasClean,
  });

  connectionState = 'disconnected';
  socket = null;

  // 연결 끊김 원인 분석 및 사용자 알림
  analyzeDisconnectionReason(event);

  // 재연결 시도
  if (reconnectAttempts < maxReconnectAttempts) {
    connectionState = 'reconnecting';
    reconnectAttempts++;
    const delay = 1000 * Math.pow(2, reconnectAttempts); // 지수 백오프
    console.log(
      `[MSW WebSocket] ${delay}ms 후 재연결 시도 (${reconnectAttempts}/${maxReconnectAttempts})`
    );

    reconnectTimer = setTimeout(() => {
      initializeSocket();
    }, delay);
  } else {
    console.error('[MSW WebSocket] 최대 재연결 시도 횟수 초과');
  }
};

const handleError = (error: Event): void => {
  console.error('[MSW WebSocket] 오류:', error);
  connectionState = 'disconnected';

  // 에러 타입별 처리
  handleConnectionError(error);
};

const handleMessage = (event: MessageEvent): void => {
  try {
    const data: RealtimeData = JSON.parse(event.data);
    handleMSWMessage(data);
  } catch (error) {
    console.error('[MSW WebSocket] 메시지 파싱 오류:', error);
  }
};

/**
 * WebSocket 연결 초기화
 */
function initializeSocket(): void {
  // 데이터 소스 설정 확인
  const config = getDataSourceConfig();
  if (config.useWebSocket) {
    console.log('[TradingView Streaming] 실제 웹소켓 사용 - MSW WebSocket 비활성화');
    return;
  }

  try {
    // 기존 연결이 있다면 정리
    cleanupSocket();

    connectionState = 'connecting';
    connectionStartTime = Date.now();

    // TODO: 실제 Websocket 연동
    // MSW로 모킹된 Binance WebSocket 연결
    socket = new WebSocket('wss://stream.binance.com/ws/combined');

    // 이벤트 리스너 등록
    socket.addEventListener('open', handleOpen);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);

    // 연결 타임아웃 설정 (10초)
    connectionTimeout = setTimeout(() => {
      if (connectionState === 'connecting') {
        console.error('[MSW WebSocket] 연결 타임아웃');
        socket?.close();
      }
    }, 10000);
  } catch (error) {
    console.error('[MSW WebSocket] 초기화 오류:', error);
    connectionState = 'disconnected';
  }
}

/**
 * 소켓 정리 함수 (해제 시 필요한 리소스 정리)
 */
function cleanupSocket(): void {
  if (socket) {
    // 이벤트 리스너 제거
    socket.removeEventListener('open', handleOpen);
    socket.removeEventListener('close', handleClose);
    socket.removeEventListener('error', handleError);
    socket.removeEventListener('message', handleMessage);

    // 연결 종료
    socket.close(1000, 'Cleanup');
    socket = null;
  }

  // 타이머 정리
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (connectionTimeout) {
    clearTimeout(connectionTimeout);
    connectionTimeout = null;
  }

  connectionState = 'disconnected';
}

/**
 * 연결 끊김 원인 분석
 * @param event - CloseEvent 객체
 */
function analyzeDisconnectionReason(event: CloseEvent): void {
  const reasons: Record<number, string> = {
    1000: '정상 종료',
    1001: '서버 종료',
    1002: '프로토콜 오류',
    1003: '지원하지 않는 데이터 타입',
    1005: '상태 코드 없음',
    1006: '비정상 종료',
    1007: '데이터 타입 불일치',
    1008: '정책 위반',
    1009: '메시지가 너무 큼',
    1010: '클라이언트 확장 필요',
    1011: '서버 오류',
    1012: '서버 재시작',
    1013: '일시적 오류',
    1014: '잘못된 응답',
    1015: 'TLS 핸드셰이크 실패',
  };

  const reason = reasons[event.code] || '알 수 없는 이유';
  console.log(`[연결 끊김 분석] 코드: ${event.code}, 이유: ${reason}, 정상종료: ${event.wasClean}`);

  // 비정상 종료 시 추가 로깅
  if (!event.wasClean) {
    console.warn(`[MSW WebSocket] 비정상 연결 종료: ${reason}`);
  }
}

/**
 * 연결 에러 타입별 처리
 * @param error - 에러 이벤트
 */
function handleConnectionError(error: Event): void {
  const errorMessage = (error as any).message || '알 수 없는 오류';

  if (errorMessage.includes('DNS')) {
    console.error('DNS 해석 실패 - 네트워크 연결 확인 필요');
  } else if (errorMessage.includes('SSL') || errorMessage.includes('TLS')) {
    console.error('SSL/TLS 핸드셰이크 실패 - 인증서 문제');
  } else if (errorMessage.includes('timeout')) {
    console.error('연결 시간 초과');
  } else {
    console.error('연결 오류:', errorMessage);
  }
}

/**
 * MSW 메시지 처리
 * @param data - 받은 실시간 데이터
 */
function handleMSWMessage(data: RealtimeData): void {
  // console.log('[handleMSWMessage] 받은 데이터:', data);

  if (data.type === 'price_update') {
    // MSW 가격 업데이트를 TradingView Bar 형식으로 변환
    // 🎯 open은 이전 Bar의 종가를 사용하므로 여기서는 설정하지 않음
    const realtimeBar: Bar = {
      time: data.timestamp,
      open: data.price, // 임시값 (실제로는 사용되지 않음)
      high: data.high || data.price,
      low: data.low || data.price,
      close: data.price,
      volume: data.volume || 1000,
    };

    // console.log('[handleMSWMessage] 변환된 realtimeBar:', realtimeBar);
    // console.log('[handleMSWMessage] 현재 구독 목록:', Array.from(subscriptions.entries()));

    // 해당 심볼의 모든 구독에 대해 Bar 업데이트
    updateBarsForSymbol(data.symbol, realtimeBar);

    // useSelectedSymbol에 데이터 전달
    if (typeof window !== 'undefined' && (window as any).updateMarketDataFromStream) {
      (window as any).updateMarketDataFromStream(data.symbol, realtimeBar);
    }
  } else if (data.type === 'subscription_success') {
    console.log('[MSW WebSocket] 구독 성공:', data);
  } else if (data.type === 'unsubscription_success') {
    console.log('[MSW WebSocket] 구독 해제 성공:', data);
  }
}

/**
 * 심볼별 모든 구독 Bar 업데이트
 * @param symbol - 심볼명
 * @param realtimeBar - 실시간 Bar 데이터
 */
function updateBarsForSymbol(symbol: string, realtimeBar: Bar): void {
  let matchedCount = 0;
  const resolutionGroups = new Map<string, Bar[]>();

  // 해당 심볼의 모든 구독 찾기
  subscriptions.forEach((subscription, subscriberUID) => {
    if (subscription.symbol === symbol) {
      matchedCount++;

      const updatedBar = createOrUpdateBar(
        realtimeBar,
        subscription.lastBar,
        subscription.resolution
      );

      // 구독의 lastBar 업데이트
      subscription.lastBar = updatedBar;

      // resolution별로 Bar 수집 (연속성 검증용)
      if (!resolutionGroups.has(subscription.resolution)) {
        resolutionGroups.set(subscription.resolution, []);
      }
      resolutionGroups.get(subscription.resolution)!.push(updatedBar);

      // 콜백 호출
      try {
        subscription.callback(updatedBar);
      } catch (error) {
        console.error(`[MSW WebSocket] 구독 ${subscriberUID} 콜백 오류:`, error);
      }
    }
  });

  // 각 resolution별로 Bar 연속성 검증
  resolutionGroups.forEach((bars, resolution) => {
    if (bars.length > 1) {
      validateBarContinuity(bars, resolution);
    }
  });

  // console.log(
  //   `[updateBarsForSymbol] 완료: ${symbol} - ${matchedCount}개 구독, ${resolutionGroups.size}개 resolution`
  // );
}

/**
 * Resolution별 Bar 생성/업데이트 (연속성 보장)
 * @param realtimeBar - 실시간 Bar 데이터
 * @param lastBar - 마지막 Bar 데이터
 * @param resolution - 시간 해상도
 * @returns 업데이트된 Bar 데이터
 */
function createOrUpdateBar(realtimeBar: Bar, lastBar: Bar | null, resolution: string): Bar {
  // 정확한 Bar 시작 시간 계산
  const currentBarStart = getBarStartTime(realtimeBar.time, resolution);

  if (!lastBar) {
    // 첫 번째 Bar 생성: 히스토리 데이터가 없는 경우
    const newBar: Bar = {
      time: currentBarStart * 1000,
      open: realtimeBar.close, // 첫 번째 Bar는 실시간 가격을 시가로 사용
      high: realtimeBar.close,
      low: realtimeBar.close,
      close: realtimeBar.close,
      volume: realtimeBar.volume,
    };

    console.log(
      `[${resolution}] 첫 번째 Bar 생성 (히스토리 없음):`,
      new Date(currentBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      `가격: ${realtimeBar.close}`
    );
    return newBar;
  }

  // 이전 Bar의 시작 시간 계산
  const lastBarStart = getBarStartTime(lastBar.time, resolution);

  if (currentBarStart > lastBarStart) {
    // 새로운 Bar 생성: 이전 Bar와 정확히 연결
    const openPrice = lastBar.close; // 🎯 핵심: 이전 Bar의 종가를 시가로 사용
    const closePrice = realtimeBar.close;

    const newBar: Bar = {
      time: currentBarStart * 1000,
      open: openPrice, // 🎯 이전 Bar의 종가
      high: Math.max(openPrice, closePrice), // 🎯 open과 close 중 높은 값
      low: Math.min(openPrice, closePrice), // 🎯 open과 close 중 낮은 값
      close: closePrice, // 🎯 실시간 가격
      volume: realtimeBar.volume || 0,
    };

    console.log(`[${resolution}] 새로운 Bar 생성:`, {
      이전Bar: new Date(lastBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      새Bar: new Date(currentBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      시간차: `${(currentBarStart - lastBarStart) / 60}분`,
      이전종가: openPrice,
      새시가: openPrice,
      새종가: closePrice,
      갭: openPrice === closePrice ? '없음' : `${Math.abs(openPrice - closePrice).toFixed(2)}`,
    });

    return newBar;
  } else if (currentBarStart === lastBarStart) {
    // 같은 Bar 내에서 업데이트: OHLC만 업데이트, 시간은 그대로
    const updatedBar: Bar = {
      ...lastBar,
      high: Math.max(lastBar.high, realtimeBar.high || realtimeBar.close),
      low: Math.min(lastBar.low, realtimeBar.low || realtimeBar.close),
      close: realtimeBar.close,
      volume: lastBar.volume + (realtimeBar.volume || 0),
    };

    return updatedBar;
  } else {
    // 시간이 뒤처진 경우 (네트워크 지연 등): 기존 Bar 유지
    console.warn(`[${resolution}] 시간 역전 감지:`, {
      현재시간: new Date(realtimeBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      Bar시간: new Date(lastBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      차이: `${(lastBar.time - realtimeBar.time) / 1000}초`,
    });

    return lastBar;
  }
}

/**
 * 정확한 Bar 시작 시간 계산
 * @param timestamp - Unix timestamp (밀리초)
 * @param resolution - 시간 해상도 문자열
 * @returns Bar 시작 시간 (초 단위)
 */
function getBarStartTime(timestamp: number, resolution: string): number {
  const timeInSeconds = Math.floor(timestamp / 1000);
  let interval: number;

  switch (resolution) {
    case '1':
      interval = 60;
      break; // 1분
    case '5':
      interval = 5 * 60;
      break; // 5분
    case '15':
      interval = 15 * 60;
      break; // 15분
    case '30':
      interval = 30 * 60;
      break; // 30분
    case '60':
      interval = 60 * 60;
      break; // 1시간
    case '240':
      interval = 4 * 60 * 60;
      break; // 4시간
    case '1D':
      interval = 24 * 60 * 60;
      break; // 1일
    case '1W':
      interval = 7 * 24 * 60 * 60;
      break; // 1주
    case '1M':
      interval = 30 * 24 * 60 * 60;
      break; // 1개월
    default:
      interval = 60;
  }

  // 정확한 Bar 시작 시간 계산 (interval의 배수로 맞춤)
  return Math.floor(timeInSeconds / interval) * interval;
}

/**
 * 시간 간격 계산 (초 단위)
 * @param resolution - 시간 해상도 문자열
 * @returns 초 단위 시간 간격
 */
function getTimeInterval(resolution: string): number {
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

/**
 * Bar 연속성 검증 (디버깅용)
 * @param bars - Bar 배열
 * @param resolution - 시간 해상도
 * @returns 연속성 검증 결과
 */
function validateBarContinuity(bars: Bar[], resolution: string): boolean {
  if (bars.length < 2) return true;

  const interval = getTimeInterval(resolution);

  for (let i = 1; i < bars.length; i++) {
    const prevBar = bars[i - 1];
    const currentBar = bars[i];

    const expectedTime = prevBar.time + interval * 1000;
    const timeDiff = Math.abs(currentBar.time - expectedTime);

    if (timeDiff > 1000) {
      // 1초 오차 허용
      console.error(`[${resolution}] Bar 연속성 오류:`, {
        prevBar: new Date(prevBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        currentBar: new Date(currentBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        expected: new Date(expectedTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        차이: `${timeDiff / 1000}초`,
      });
      return false;
    }
  }

  console.log(`[${resolution}] Bar 연속성 검증 통과: ${bars.length}개 Bar`);
  return true;
}

/**
 * 모든 기존 구독 재구독
 */
function resubscribeAll(): void {
  // 심볼별로 중복 제거하여 구독
  const uniqueSymbols = new Set<string>();
  subscriptions.forEach((subscription) => {
    uniqueSymbols.add(subscription.symbol);
  });

  uniqueSymbols.forEach((symbol) => {
    sendSubscribeMessage(symbol);
  });
}

/**
 * 구독 메시지 전송
 * @param symbol - 구독할 심볼명
 */
function sendSubscribeMessage(symbol: string): void {
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

/**
 * 구독 해제 메시지 전송
 * @param symbol - 구독 해제할 심볼명
 */
function sendUnsubscribeMessage(symbol: string): void {
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

/**
 * 현재 구독 상태 확인 (디버깅용)
 * @returns 구독 상태 정보
 */
export function getSubscriptionStatus(): SubscriptionStatus {
  const symbolCounts = new Map<string, number>();
  subscriptions.forEach((subscription) => {
    const count = symbolCounts.get(subscription.symbol) || 0;
    symbolCounts.set(subscription.symbol, count + 1);
  });

  return {
    connected: isConnected(),
    connectionState: connectionState,
    connectionDuration: connectionStartTime ? Date.now() - connectionStartTime : 0,
    reconnectAttempts: reconnectAttempts,
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

/**
 * 실시간 데이터 구독 함수
 * @param symbolInfo - 심볼 정보
 * @param resolution - 시간 해상도
 * @param onRealtimeCallback - 실시간 데이터 콜백
 * @param subscriberUID - 구독자 고유 ID
 * @param onResetCacheNeededCallback - 캐시 리셋 콜백 (사용 안함)
 * @param lastDailyBar - 마지막 일봉 데이터
 */
export function subscribeOnStream(
  symbolInfo: SymbolInfo,
  resolution: string,
  onRealtimeCallback: (bar: Bar) => void,
  subscriberUID: string,
  onResetCacheNeededCallback?: () => void,
  lastDailyBar?: Bar
): void {
  const symbolName = symbolInfo.full_name || symbolInfo.name || '';

  console.log('[subscribeOnStream] 호출:', {
    symbolInfo: symbolName,
    resolution,
    subscriberUID,
  });

  // 심볼 파싱 (MSW 버전)
  const parsedSymbol = parseFullSymbol(symbolName);
  if (!parsedSymbol) {
    console.error('[subscribeOnStream] 심볼 파싱 실패:', symbolName);
    return;
  }

  const symbol = `${parsedSymbol.fromSymbol}${parsedSymbol.toSymbol}`;

  // 기본 가격 설정
  const currentTime = Math.floor(Date.now() / 1000);
  const defaultPrice = parsedSymbol.fromSymbol === 'ETH' ? 2800 : 50000; // ETH는 2800, BTC는 50000

  // WebSocket 구독 상태 확인 (구독 추가 전에 확인)
  const symbolSubscribed = Array.from(subscriptions.values()).some((sub) => sub.symbol === symbol);

  const subscription: Subscription = {
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

/**
 * 구독 해제 함수
 * @param subscriberUID - 구독자 고유 ID
 */
export function unsubscribeFromStream(subscriberUID: string): void {
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

/**
 * WebSocket 연결 상태 확인
 * @returns 연결 상태 (true: 연결됨, false: 연결 안됨)
 */
export function isConnected(): boolean {
  return socket !== null && socket.readyState === WebSocket.OPEN;
}

/**
 * WebSocket 수동 재연결
 */
export function reconnect(): void {
  console.log('[수동 재연결] 시작');
  if (socket) {
    socket.close();
  }
  reconnectAttempts = 0;
  initializeSocket();
}

/**
 * 완전한 정리 함수 (페이지 언로드 시 호출)
 */
export function cleanup(): void {
  console.log('[완전 정리] 시작');

  // 소켓 정리
  cleanupSocket();

  // 구독 상태 정리
  subscriptions.clear();

  // 상태 초기화
  reconnectAttempts = 0;
  connectionStartTime = null;
  connectionState = 'disconnected';

  console.log('[완전 정리] 완료');
}

/**
 * 연결 상태 정보 가져오기
 * @returns 연결 상태 정보
 */
export function getConnectionState(): ConnectionStatus {
  return {
    state: connectionState,
    connected: isConnected(),
    reconnectAttempts: reconnectAttempts,
    maxReconnectAttempts: maxReconnectAttempts,
    connectionDuration: connectionStartTime ? Date.now() - connectionStartTime : 0,
  };
}
