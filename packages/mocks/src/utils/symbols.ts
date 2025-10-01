/**
 * 심볼 관련 유틸리티 함수들
 * 심볼 검색, 유효성 검사, 기준 가격 조회 등
 */

import { ALL_SYMBOLS, SYMBOL_BASE_PRICES } from '@template/types';
import type { TradingSymbol } from '@template/types';

/**
 * 심볼 목록을 가져오는 함수
 * @returns 전체 심볼 목록
 */
export function getAllSymbols(): TradingSymbol[] {
  return [...ALL_SYMBOLS];
}

/**
 * 특정 심볼을 검색하는 함수
 * @param query - 검색 쿼리
 * @returns 검색된 심볼 목록
 */
export function searchSymbols(query: string): TradingSymbol[] {
  const lowerQuery = query.toLowerCase();
  return ALL_SYMBOLS.filter(
    (symbol) =>
      symbol.ticker.toLowerCase().includes(lowerQuery) ||
      symbol.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 심볼이 유효한지 확인하는 함수
 * @param ticker - 확인할 심볼 티커
 * @returns 유효한 심볼인지 여부
 */
export function isValidSymbol(ticker: string): boolean {
  return ALL_SYMBOLS.some((symbol) => symbol.ticker === ticker);
}

/**
 * 심볼의 기준 가격만 가져오는 함수 (TradingView 차트용)
 * @param ticker - 심볼 티커
 * @returns 기준 가격
 */
export function getSymbolBasePrice(ticker: string): number {
  return SYMBOL_BASE_PRICES[ticker] || 100;
}

/**
 * 파싱된 심볼 정보 인터페이스
 */
export interface ParsedSymbol {
  exchange: string;
  fromSymbol: string;
  toSymbol: string;
}

/**
 * 암호화 쌍 심볼을 구문 분석하고 해당 심볼의 모든 부분을 반환하는 함수
 * @param fullSymbol - 전체 심볼 문자열 (예: "Bitfinex:BTC/USD", "BTC/USD", "EURTRY")
 * @returns 파싱된 심볼 정보 또는 null
 */
export function parseFullSymbol(fullSymbol: string): ParsedSymbol | null {
  // 1. 거래소:코인1/코인2 형식 (예: "Bitfinex:BTC/USD")
  let match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (match) {
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
  }

  // 2. 코인1/코인2 형식 (예: "BTC/USD")
  match = fullSymbol.match(/^(\w+)\/(\w+)$/);
  if (match) {
    return { exchange: 'Bitfinex', fromSymbol: match[1], toSymbol: match[2] };
  }

  // 3. 6자리 심볼 형식 (예: "EURTRY", "USDJPY")
  match = fullSymbol.match(/^([A-Z]{3})([A-Z]{3})$/);
  if (match) {
    return { exchange: 'Forex', fromSymbol: match[1], toSymbol: match[2] };
  }

  // 4. 3자리 심볼 + 숫자 형식 (예: "US30", "JPN225")
  match = fullSymbol.match(/^([A-Z]{3})(\d+)$/);
  if (match) {
    return { exchange: 'Index', fromSymbol: match[1], toSymbol: 'USD' };
  }

  // 5. 기타 심볼들 (예: "AAPL", "XAUUSD")
  if (fullSymbol.length <= 6) {
    // 암호화폐나 상품 심볼
    if (fullSymbol.includes('BTC') || fullSymbol.includes('ETH') || fullSymbol.includes('XRP')) {
      return { exchange: 'Crypto', fromSymbol: fullSymbol.replace('USD', ''), toSymbol: 'USD' };
    }
    if (fullSymbol.includes('XAU') || fullSymbol.includes('XAG') || fullSymbol.includes('Oil')) {
      return { exchange: 'Commodity', fromSymbol: fullSymbol.replace('USD', ''), toSymbol: 'USD' };
    }
    if (fullSymbol === 'AAPL') {
      return { exchange: 'Stock', fromSymbol: 'AAPL', toSymbol: 'USD' };
    }
  }

  return null;
}
