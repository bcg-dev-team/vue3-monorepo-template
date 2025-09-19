/**
 * 심볼 가격 데이터 생성기
 * 실시간 가격, 변동률, 거래량 등 생성
 */

import { SYMBOL_LIST, SYMBOL_BASE_PRICES } from '../../data/symbols.js';
import type { SymbolPrice } from '@template/types';
import { isValidSymbol } from '../symbols.js';

/**
 * 심볼별 가격 정보를 생성하는 함수
 * @param ticker - 심볼 티커
 * @returns 가격 정보
 */
export function generateSymbolPrice(ticker: string): SymbolPrice {
  const basePrice = SYMBOL_BASE_PRICES[ticker] || 100;

  // 가격 변동률 (-5% ~ +5%)
  const changePercent = (Math.random() - 0.5) * 10;
  const currentPrice = basePrice * (1 + changePercent / 100);
  const change = currentPrice - basePrice;

  // 24시간 고가/저가 (±2% 범위)
  const high24h = currentPrice * (1 + Math.random() * 0.02);
  const low24h = currentPrice * (1 - Math.random() * 0.02);

  // 거래량 (심볼 타입에 따라 다름)
  let baseVolume = 1000000;
  const symbol = SYMBOL_LIST.find((s) => s.ticker === ticker);
  if (symbol) {
    if (symbol.type === 'crypto') baseVolume = 50000000;
    else if (symbol.type === 'forex') baseVolume = 100000000;
    else if (symbol.type === 'stock') baseVolume = 1000000;
    else if (symbol.type === 'commodity') baseVolume = 5000000;
  }

  const volume = Math.floor(baseVolume * (0.5 + Math.random()));

  return {
    ticker,
    price: Math.round(currentPrice * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    volume,
    high24h: Math.round(high24h * 100) / 100,
    low24h: Math.round(low24h * 100) / 100,
  };
}

/**
 * 모든 심볼의 가격 정보를 가져오는 함수
 * @returns 모든 심볼의 가격 정보 배열
 */
export function getAllSymbolPrices(): SymbolPrice[] {
  return SYMBOL_LIST.map((symbol) => generateSymbolPrice(symbol.ticker));
}

/**
 * 특정 심볼의 가격 정보를 가져오는 함수
 * @param ticker - 심볼 티커
 * @returns 가격 정보 또는 null
 */
export function getSymbolPrice(ticker: string): SymbolPrice | null {
  if (!isValidSymbol(ticker)) {
    return null;
  }
  return generateSymbolPrice(ticker);
}
