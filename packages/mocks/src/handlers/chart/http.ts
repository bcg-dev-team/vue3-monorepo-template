/**
 * HTTP 요청 모킹 핸들러 (기존 tradingview.ts)
 * 통합된 /data/history 엔드포인트로 모든 시간대 데이터를 처리합니다.
 */

import type { ChartApiData } from '../../types/chart.js';
import { http, HttpResponse } from 'msw';

/**
 * resolution에 따른 시간 간격 계산
 * @param resolution - TradingView resolution 값
 * @returns 초 단위 시간 간격
 */
function getTimeInterval(resolution: string): number {
  // resolution이 숫자인 경우 분 단위
  if (/^\d+$/.test(resolution)) {
    return parseInt(resolution) * 60;
  }

  // 특수 resolution 처리
  switch (resolution) {
    case '1D':
      return 24 * 60 * 60; // 1일
    case '1W':
      return 7 * 24 * 60 * 60; // 1주
    case '1M':
      return 30 * 24 * 60 * 60; // 1개월 (대략)
    default:
      return 60; // 기본값: 1분
  }
}

/**
 * resolution에 따른 기본 데이터 개수 계산
 * @param resolution - TradingView resolution 값
 * @returns 기본 데이터 개수
 */
function getDefaultLimit(resolution: string): number {
  if (/^\d+$/.test(resolution)) {
    const minutes = parseInt(resolution);
    if (minutes <= 30) return 1440; // 분 단위: 하루치
    return 168; // 장시간 분 단위: 일주일치
  }

  switch (resolution) {
    case '60':
    case '240':
      return 168; // 시간 단위: 일주일치
    case '1D':
      return 365; // 일 단위: 1년치
    case '1W':
      return 52; // 주 단위: 1년치
    case '1M':
      return 24; // 월 단위: 2년치
    default:
      return 365;
  }
}

/**
 * resolution에 따른 변동성 계산
 * @param resolution - TradingView resolution 값
 * @returns 변동성 비율
 */
function getVolatility(resolution: string): number {
  if (/^\d+$/.test(resolution)) {
    const minutes = parseInt(resolution);
    if (minutes <= 5) return 0.002; // 단기간: 낮은 변동성
    if (minutes <= 30) return 0.005; // 중기간: 중간 변동성
    return 0.01; // 장기간: 높은 변동성
  }

  switch (resolution) {
    case '60':
    case '240':
      return 0.02; // 시간 단위
    case '1D':
      return 0.05; // 일 단위
    case '1W':
      return 0.08; // 주 단위
    case '1M':
      return 0.15; // 월 단위
    default:
      return 0.05;
  }
}

/**
 * 통합 히스토리 데이터 생성
 * @param symbol - 심볼 (예: BTC, ETH)
 * @param resolution - 시간 해상도
 * @param limit - 데이터 개수
 * @param basePrice - 기준 가격
 */
function generateHistoryData(
  symbol: string,
  resolution: string,
  limit: number,
  basePrice: number = 50000
): ChartApiData['Data'] {
  const data = [];
  const now = Math.floor(Date.now() / 1000);
  const timeInterval = getTimeInterval(resolution);
  const volatility = getVolatility(resolution);

  let currentPrice = basePrice;

  for (let i = limit; i >= 0; i--) {
    const time = now - i * timeInterval;

    // 가격 변동성 시뮬레이션
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + change);

    // OHLC 데이터 생성
    const open = currentPrice;
    const high = open * (1 + Math.random() * (volatility * 0.6));
    const low = open * (1 - Math.random() * (volatility * 0.6));
    const close = low + Math.random() * (high - low);

    // 거래량은 시간대에 따라 조정
    const baseVolume = resolution === '1D' ? 1000000 : /^\d+$/.test(resolution) ? 10000 : 100000;

    data.push({
      time,
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      volumefrom: Math.floor(Math.random() * baseVolume),
      volumeto: Math.floor(Math.random() * baseVolume * 50),
    });

    currentPrice = close;
  }

  return data;
}

/**
 * 정확한 심볼 매칭을 위한 기본 가격 조회 함수
 * @param fsym - 기본 심볼 (예: ETH)
 * @param tsym - 견적 심볼 (예: EUR, USD)
 * @returns 기본 가격
 */
function getBasePrice(fsym: string, tsym: string): number {
  // 1. 정확한 심볼 매칭 (우선순위 1)
  const exactSymbol = `${fsym}${tsym}`;
  if (symbolBasePrices[exactSymbol]) {
    console.log(`[MSW] 정확한 심볼 매칭: ${exactSymbol} → ${symbolBasePrices[exactSymbol]}`);
    return symbolBasePrices[exactSymbol];
  }

  // 2. 부분 매칭 (우선순위 2) - 기존 호환성 유지
  if (symbolBasePrices[fsym]) {
    console.log(`[MSW] 부분 심볼 매칭: ${fsym} → ${symbolBasePrices[fsym]}`);
    return symbolBasePrices[fsym];
  }

  // 3. 기본값 (우선순위 3)
  console.log(`[MSW] 기본값 사용: ${fsym}/${tsym} → 1000`);
  return 1000;
}

/**
 * 심볼별 기본 가격 설정
 * 실제 심볼 목록을 기반으로 한 현실적인 가격 설정
 */
const symbolBasePrices: Record<string, number> = {
  // 암호화폐 (Crypto)
  BTCUSD: 50000,
  ETHUSD: 3000,
  XRPUSD: 0.5,

  // 외환 (Forex) - 주요 통화쌍
  EURUSD: 1.05,
  GBPUSD: 1.25,
  USDJPY: 150.0,
  USDCHF: 0.9,
  USDCAD: 1.35,
  AUDUSD: 0.65,
  NZDUSD: 0.6,
  EURGBP: 0.84,
  EURJPY: 157.5,
  EURCHF: 0.945,
  EURCAD: 1.42,
  EURAUD: 1.62,
  EURNZD: 1.75,
  GBPJPY: 187.5,
  GBPCHF: 1.125,
  GBPCAD: 1.69,
  GBPAUD: 1.92,
  GBPNZD: 2.08,
  AUDJPY: 97.5,
  AUDCHF: 0.585,
  AUDCAD: 0.88,
  AUDNZD: 1.08,
  NZDJPY: 90.0,
  NZDCHF: 0.54,
  NZDCAD: 0.81,
  CADJPY: 111.0,
  CADCHF: 0.67,
  CHFJPY: 166.7,

  // 기타 외환
  EURTRY: 32.0,
  USDSEK: 10.8,
  NOKSEK: 0.95,
  GBPNOK: 13.2,
  EURHUF: 390.0,
  GBPEUR: 1.19,
  EURHKD: 8.2,
  DKKJPY: 22.0,
  CHFNOK: 11.5,
  EURSEK: 11.4,
  GBPDKK: 8.7,
  MXNJPY: 8.5,
  GBPSEK: 13.5,
  HKG33: 18000,
  USDCZK: 23.0,
  PLNJPY: 37.5,
  AUS200: 7500,
  USDDKK: 6.9,
  TRYJPY: 4.8,
  EURSGD: 1.44,
  CHFSEK: 12.6,
  NZDAUD: 1.08,
  USOil: 75.0,
  EURNOK: 11.2,
  GBPPLN: 4.95,
  FRA40: 7500,
  EURPLN: 4.16,
  EURZAR: 19.5,
  EUSTX50: 4500,
  XAUUSD: 2000.0,
  UK100: 7500,
  USDNOK: 10.7,
  USDSGD: 1.37,
  EURCZK: 24.5,
  NOKDKK: 0.65,
  USDTRY: 30.0,
  SGDJPY: 109.5,
  USDHKD: 7.8,

  // 주식 (Stock)
  AAPL: 180.0,

  // 상품 (Commodity)
  UKOil: 75.0,
  XAGUSD: 25.0,

  // 지수 (Index)
  US30: 35000,
  ESP35: 9500,
  SUI30: 12000,

  // 부분 매칭 (기존 호환성 유지)
  BTC: 50000,
  ETH: 3000,
  XRP: 0.5,
  EUR: 1.05,
  GBP: 1.25,
  USD: 1.0,
  JPY: 150.0,
  CHF: 0.9,
  CAD: 1.35,
  AUD: 0.65,
  NZD: 0.6,
};

/**
 * HTTP API 모킹 핸들러들
 */
export const chartHttpHandlers = [
  // 통합 data/history API 모킹
  http.get('https://min-api.cryptocompare.com/data/history', ({ request }) => {
    const url = new URL(request.url);
    const fsym = url.searchParams.get('fsym') || 'EUR';
    const tsym = url.searchParams.get('tsym') || 'TRY';
    const resolution = url.searchParams.get('resolution') || '1D';
    const limit = parseInt(url.searchParams.get('limit') || getDefaultLimit(resolution).toString());
    const toTs = url.searchParams.get('toTs');

    console.log('[MSW] HTTP history 요청:', { fsym, tsym, resolution, limit, toTs });

    const basePrice = getBasePrice(fsym, tsym);
    const historyData = generateHistoryData(fsym, resolution, limit, basePrice);

    let filteredData = historyData;
    if (toTs) {
      const toTimestamp = parseInt(toTs);
      filteredData = historyData.filter((item) => item.time <= toTimestamp);
    }

    const response: ChartApiData = {
      Response: 'Success',
      Message: '',
      HasWarning: false,
      Type: 100,
      RateLimit: {},
      Data: filteredData,
      TimeTo: toTs ? parseInt(toTs) : Math.floor(Date.now() / 1000),
      TimeFrom: filteredData[0]?.time || 0,
      FirstValueInArray: true,
      ConversionType: {
        type: 'direct',
        conversionSymbol: '',
      },
    };

    console.log(
      `[MSW] ${fsym}/${tsym} ${resolution} 히스토리 데이터 ${filteredData.length}개 반환`
    );
    return HttpResponse.json(response);
  }),
];
