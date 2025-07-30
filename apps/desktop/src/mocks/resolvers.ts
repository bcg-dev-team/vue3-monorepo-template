import { HttpResponse, type HttpResponseResolver, type PathParams } from 'msw';

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
  const fromSymbol = searchParams.get('fsym') || 'ETH'; // 기본값을 ETH로 변경
  const toSymbol = searchParams.get('tsym') || 'EUR'; // 기본값을 EUR로 변경
  const toTs = parseInt(searchParams.get('toTs') || String(Math.floor(Date.now() / 1000)));
  const limit = parseInt(searchParams.get('limit') || '100');

  console.log(`[MSW TradingView] 차트 데이터 요청:`, {
    exchange,
    fromSymbol,
    toSymbol,
    toTs,
    limit,
  });

  // 시간 간격에 따른 데이터 생성
  // resolution 파라미터가 있으면 사용, 없으면 기본값
  const resolution = searchParams.get('resolution') || '1D';
  console.log(`[MSW TradingView] 해상도: ${resolution}, 데이터 개수: ${limit}`);

  // 현재 시간부터 역순으로 OHLC 데이터 생성
  const bars = generateOHLCData(toTs, limit, resolution);

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
function generateOHLCData(endTime: number, count: number, resolution: string = '1D') {
  const bars = [];
  let timeInterval: number;
  let basePrice = 50000; // 시작 가격 (USDT)

  // 해상도에 따른 시간 간격 설정
  switch (resolution) {
    case '1': // 1분
      timeInterval = 60;
      break;
    case '5': // 5분
      timeInterval = 5 * 60;
      break;
    case '15': // 15분
      timeInterval = 15 * 60;
      break;
    case '30': // 30분
      timeInterval = 30 * 60;
      break;
    case '60': // 1시간
      timeInterval = 60 * 60;
      break;
    case '240': // 4시간
      timeInterval = 4 * 60 * 60;
      break;
    case '1D': // 1일
      timeInterval = 24 * 60 * 60;
      break;
    case '1W': // 1주
      timeInterval = 7 * 24 * 60 * 60;
      break;
    case '1M': // 1개월 (30일로 근사)
      timeInterval = 30 * 24 * 60 * 60;
      break;
    default:
      timeInterval = 24 * 60 * 60; // 기본값: 1일
  }

  for (let i = count - 1; i >= 0; i--) {
    const time = endTime - i * timeInterval;

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
