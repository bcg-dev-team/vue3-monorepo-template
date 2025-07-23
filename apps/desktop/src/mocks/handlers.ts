import { http, HttpResponse, ws } from 'msw';
import { mockUserDetail, mockHistoricalData } from './resolvers';
import { mockChartDataConnection, mockChatConnection } from './wsResolvers';

// 웹소켓 연결 설정
const chartDataWS = ws.link('wss://stream.binance.com/*');
const chatWS = ws.link('ws://localhost:3001/chat');

// HTTP 및 WebSocket API 모킹
export const handlers = [
  // === HTTP 핸들러 ===
  // 사용자 상세 정보 조회
  http.get('/api/user/:user_id', mockUserDetail),

  // 예시: 추가 API 엔드포인트들
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: '김철수', email: 'kim@example.com' },
      { id: 2, name: '이영희', email: 'lee@example.com' },
      { id: 3, name: '박민수', email: 'park@example.com' },
    ]);
  }),

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

  // 채팅 웹소켓 (예시)
  chatWS.addEventListener('connection', ({ client, server }) => {
    mockChatConnection(client, server);
  }),
];
