import { http, HttpResponse, ws } from 'msw';
import { mockHistoricalData } from './resolvers';
import { mockChartDataConnection } from './wsResolvers';

// 웹소켓 연결 설정
const chartDataWS = ws.link('wss://stream.binance.com/*');
const chatWS = ws.link('ws://localhost:3001/chat');
const realtimeChartWS = ws.link('ws://localhost:3001/realtime-chart');

// HTTP 및 WebSocket API 모킹
export const handlers = [
  // === HTTP 핸들러 ===

  http.post('/api/users', async ({ request }) => {
    const user = (await request.json()) as Record<string, any>;
    return HttpResponse.json(
      {
        id: Date.now(),
        ...user,
        created_at: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // === TradingView API 모킹 ===
  // CryptoCompare API 직접 모킹 (외부 API 인터셉트)
  http.get('https://min-api.cryptocompare.com/data/histoday', mockHistoricalData),

  // 로컬 API 경로로도 제공 (개발 편의성)
  http.get('/api/chart/histoday', mockHistoricalData),

  // === WebSocket 핸들러 ===
  // 실시간 차트 데이터 스트림 (Binance WebSocket API 모킹)
  chartDataWS.addEventListener('connection', ({ client, server }) => {
    mockChartDataConnection(client, server);
  }),

  // 실시간 차트 데이터용 WebSocket (Lightweight Charts용)
  realtimeChartWS.addEventListener('connection', ({ client, server }) => {
    mockRealtimeChartConnection(client, server);
  }),
];

// 실시간 차트 데이터 WebSocket 연결 모킹
const mockRealtimeChartConnection = (client: any, server: any) => {
  console.log('[MSW WebSocket] 실시간 차트 데이터 연결 수립');

  let dataStream: NodeJS.Timeout | null = null;
  let currentValue = 25;
  let baseTimestamp = Date.now(); // 기준 시간 고정

  // 클라이언트 메시지 처리
  client.addEventListener('message', (event: any) => {
    console.log('[MSW WebSocket] 실시간 차트 클라이언트 메시지:', event.data);

    try {
      const message = JSON.parse(event.data);
      console.log('[MSW WebSocket] 파싱된 실시간 차트 메시지:', message);

      // 구독 요청 처리
      if (message.type === 'subscribe') {
        console.log('[MSW WebSocket] 실시간 차트 구독 요청');
        handleRealtimeSubscribe(client, message);
      }

      // 구독 해제 요청 처리
      if (message.type === 'unsubscribe') {
        console.log('[MSW WebSocket] 실시간 차트 구독 해제 요청');
        handleRealtimeUnsubscribe(client, message);
      }
    } catch (error) {
      console.error('[MSW WebSocket] 실시간 차트 메시지 파싱 오류:', error);
    }
  });

  // 연결 종료 시 데이터 스트림 정리
  client.addEventListener('close', () => {
    console.log('[MSW WebSocket] 실시간 차트 연결 종료, 데이터 스트림 정리');
    if (dataStream) {
      clearInterval(dataStream);
    }
  });

  // 실시간 구독 처리
  const handleRealtimeSubscribe = (client: any, message: any) => {
    // 구독 확인 응답
    client.send(
      JSON.stringify({
        type: 'subscription_success',
        timestamp: Date.now(),
      })
    );

    // 실시간 데이터 스트림 시작
    dataStream = setInterval(() => {
      // 자연스러운 변동 생성 (이전 값 기준 ±2% 변동)
      const change = (Math.random() - 0.5) * 0.8;
      currentValue = currentValue + change;

      // 시간은 고정하고 값만 업데이트
      const data = {
        time: baseTimestamp, // 기준 시간 고정
        value: parseFloat(currentValue.toFixed(2)),
      };

      console.log('[MSW WebSocket] 실시간 차트 데이터 전송 (마지막 값 업데이트):', data);

      client.send(
        JSON.stringify({
          type: 'price_update',
          data,
        })
      );
    }, 1000); // 1초마다 업데이트
  };

  // 실시간 구독 해제 처리
  const handleRealtimeUnsubscribe = (client: any, message: any) => {
    if (dataStream) {
      clearInterval(dataStream);
      dataStream = null;
    }

    client.send(
      JSON.stringify({
        type: 'unsubscription_success',
        timestamp: Date.now(),
      })
    );
  };
};
