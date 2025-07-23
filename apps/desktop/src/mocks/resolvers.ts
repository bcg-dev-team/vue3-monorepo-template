import { HttpResponse, type HttpResponseResolver, type PathParams } from 'msw';

/**
 * 사용자 상세 정보 조회 API 모킹
 */
export const mockUserDetail: HttpResponseResolver<PathParams, any> = async ({
  request,
  params,
  cookies,
}) => {
  const { user_id } = params as { user_id: string };

  // GET 요청에서는 request body를 읽지 않습니다
  console.log(`[MSW] 사용자 조회 요청: ${user_id}`);

  return HttpResponse.json({
    user_id,
    user_name: 'User Name',
    email: `user${user_id}@example.com`,
    created_at: new Date().toISOString(),
  });
};

/**
 * TradingView 차트 데이터 조회 API 모킹 (CryptoCompare API 형태)
 */
export const mockHistoricalData: HttpResponseResolver<PathParams, any> = async ({
  request,
  params,
  cookies,
}) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // 쿼리 파라미터 추출
  const exchange = searchParams.get('e') || 'Bitfinex';
  const fromSymbol = searchParams.get('fsym') || 'BTC';
  const toSymbol = searchParams.get('tsym') || 'USDT';
  const toTs = parseInt(searchParams.get('toTs') || String(Math.floor(Date.now() / 1000)));
  const limit = parseInt(searchParams.get('limit') || '100');

  console.log(`[MSW TradingView] 차트 데이터 요청:`, {
    exchange,
    fromSymbol,
    toSymbol,
    toTs,
    limit,
  });

  // 현재 시간부터 역순으로 OHLC 데이터 생성
  const bars = generateOHLCData(toTs, limit);

  return HttpResponse.json({
    Response: 'Success',
    Message: '',
    HasWarning: false,
    Type: 100,
    RateLimit: {},
    Data: bars,
    TimeTo: toTs,
    TimeFrom: bars.length > 0 ? bars[0].time : toTs,
    FirstValueInArray: true,
    ConversionType: {
      type: 'direct',
      conversionSymbol: '',
    },
  });
};

/**
 * OHLC 데이터 생성 함수
 */
function generateOHLCData(endTime: number, count: number) {
  const bars = [];
  const dayInSeconds = 24 * 60 * 60; // 1일 = 86400초
  let basePrice = 50000; // 시작 가격 (USDT)

  for (let i = count - 1; i >= 0; i--) {
    const time = endTime - i * dayInSeconds;

    // 가격 변동 시뮬레이션
    const volatility = 0.05; // 5% 변동성
    const change = (Math.random() - 0.5) * 2 * volatility * basePrice;

    const open = Math.max(100, basePrice + change);
    const close = Math.max(100, open + (Math.random() - 0.5) * 2000);
    const high = Math.max(open, close) + Math.random() * 1000;
    const low = Math.min(open, close) - Math.random() * 1000;

    bars.push({
      time,
      high: parseFloat(high.toFixed(2)),
      low: Math.max(100, parseFloat(low.toFixed(2))),
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volumefrom: parseFloat((Math.random() * 1000).toFixed(2)),
      volumeto: parseFloat((Math.random() * 50000000).toFixed(2)),
      conversionType: 'direct',
      conversionSymbol: '',
    });

    // 다음 봉의 시작 가격을 현재 봉의 종가로 설정
    basePrice = close;
  }

  return bars;
}
