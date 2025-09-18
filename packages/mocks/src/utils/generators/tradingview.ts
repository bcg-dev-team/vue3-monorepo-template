/**
 * TradingView 차트 데이터 생성기
 * 히스토리컬 차트 데이터 생성 및 변동성 계산
 */

import type { TradingViewBar } from '../../types/chart.js';
import { SYMBOL_LIST } from '../../data/symbols.js';
import { getSymbolBasePrice } from '../symbols.js';

/**
 * TradingView용 히스토리컬 바 데이터 생성 함수
 * @param symbol - 심볼명
 * @param from - 시작 시간 (Unix timestamp, 초 단위)
 * @param to - 종료 시간 (Unix timestamp, 초 단위)
 * @param resolution - 시간 해상도 ('1', '5', '15', '30', '60', '240', '1D', '1W', '1M')
 * @returns TradingView Bar 데이터 배열
 */
export function generateTradingViewBars(
  symbol: string,
  from: number,
  to: number,
  resolution: string
): TradingViewBar[] {
  const bars: TradingViewBar[] = [];
  const basePrice = getSymbolBasePrice(symbol);

  // 해상도에 따른 시간 간격 설정 (초 단위)
  let intervalSeconds = 60; // 기본 1분
  switch (resolution) {
    case '1':
      intervalSeconds = 60;
      break;
    case '5':
      intervalSeconds = 5 * 60;
      break;
    case '15':
      intervalSeconds = 15 * 60;
      break;
    case '30':
      intervalSeconds = 30 * 60;
      break;
    case '60':
      intervalSeconds = 60 * 60;
      break;
    case '240':
      intervalSeconds = 4 * 60 * 60;
      break;
    case '1D':
      intervalSeconds = 24 * 60 * 60;
      break;
    case '1W':
      intervalSeconds = 7 * 24 * 60 * 60;
      break;
    case '1M':
      intervalSeconds = 30 * 24 * 60 * 60;
      break;
  }

  let currentTime = from;
  let currentPrice = basePrice;

  // 심볼 타입에 따른 변동성 조정
  const symbolInfo = SYMBOL_LIST.find((s) => s.ticker === symbol);
  let volatilityFactor = 0.02; // 기본 2%

  if (symbolInfo) {
    switch (symbolInfo.type) {
      case 'crypto':
        volatilityFactor = 0.05; // 5% (높은 변동성)
        break;
      case 'forex':
        volatilityFactor = 0.01; // 1% (낮은 변동성)
        break;
      case 'stock':
        volatilityFactor = 0.03; // 3% (중간 변동성)
        break;
      case 'commodity':
        volatilityFactor = 0.025; // 2.5% (중간 변동성)
        break;
    }
  }

  while (currentTime < to) {
    // 랜덤 가격 변동 (심볼 타입별 변동성 적용)
    const variation = (Math.random() - 0.5) * volatilityFactor * 2;
    const open = currentPrice;
    const close = currentPrice * (1 + variation);
    const high = Math.max(open, close) * (1 + Math.random() * volatilityFactor * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * volatilityFactor * 0.5);

    bars.push({
      time: currentTime * 1000, // 밀리초로 변환
      open: Math.round(open * 100000) / 100000,
      high: Math.round(high * 100000) / 100000,
      low: Math.round(low * 100000) / 100000,
      close: Math.round(close * 100000) / 100000,
      volume: Math.floor(Math.random() * 1000000) + 10000, // 랜덤 거래량
    });

    currentPrice = close;
    currentTime += intervalSeconds;
  }

  return bars;
}
