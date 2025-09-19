/**
 * 심볼 관련 유틸리티 함수들
 * 가격 계산, 기준값 관리, 증감률 계산 등을 담당
 */

import type { TradingSymbol, SymbolData } from '@template/types';

/**
 * 심볼별 기준값(어제 종가) 반환
 * @param ticker - 심볼 티커
 * @returns 기준 가격
 */
export const getBasePrice = (ticker: string): number => {
  // 심볼별 기본 기준값 설정
  const basePrices: Record<string, number> = {
    EURUSD: 1.085,
    GBPUSD: 1.265,
    USDJPY: 149.5,
    USDCHF: 0.875,
    USDCAD: 1.365,
    AUDUSD: 0.655,
    NZDUSD: 0.605,
    EURGBP: 0.855,
    EURJPY: 162.0,
    GBPJPY: 189.0,
    AUDJPY: 98.0,
    NZDJPY: 90.5,
    EURCHF: 0.945,
    EURCAD: 1.485,
    EURAUD: 1.655,
    EURNZD: 1.795,
    GBPCHF: 1.105,
    GBPCAD: 1.725,
    GBPAUD: 1.955,
    GBPNZD: 2.095,
    AUDCHF: 0.575,
    AUDCAD: 0.885,
    AUDNZD: 1.085,
    NZDCHF: 0.535,
    NZDCAD: 0.825,
    CADCHF: 0.645,
    CHFJPY: 171.0,
    CADJPY: 109.5,
    BTCUSD: 50000,
    ETHUSD: 3000,
    XRPUSD: 0.5,
    XAUUSD: 2000,
    XAGUSD: 25.0,
    USOil: 75.0,
    UKOil: 75.0,
    AAPL: 180.0,
    GOOGL: 140.0,
    MSFT: 350.0,
    AMZN: 150.0,
    TSLA: 250.0,
  };

  return basePrices[ticker] || 100;
};

/**
 * 가격을 적절한 소수점 자릿수로 포맷팅
 * @param price - 포맷팅할 가격
 * @returns 포맷팅된 가격 문자열
 */
export const formatPrice = (price: number): string => {
  if (price < 1) {
    return price.toFixed(4);
  } else if (price < 100) {
    return price.toFixed(2);
  } else {
    return price.toFixed(0);
  }
};

/**
 * 실시간 가격 정보 가져오기 (NaN 방지)
 * @param ticker - 심볼 티커
 * @param marketData - 시장 데이터 배열
 * @returns 포맷팅된 가격 문자열 또는 '-'
 */
export const getSymbolPrice = (ticker: string, marketData: readonly SymbolData[]): string => {
  const marketDataForSymbol = marketData.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return '-';

  const price = marketDataForSymbol.price;

  // 유효한 가격인지 검증 (숫자이고 NaN이 아니며 양수)
  if (typeof price !== 'number' || isNaN(price) || price <= 0) {
    return '-';
  }

  return formatPrice(price);
};

/**
 * 기준값 대비 증감률 계산 (NaN 방지)
 * @param ticker - 심볼 티커
 * @param marketData - 시장 데이터 배열
 * @returns 증감률 문자열 또는 '-'
 */
export const getSymbolChangeFromBase = (
  ticker: string,
  marketData: readonly SymbolData[]
): string => {
  const marketDataForSymbol = marketData.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return '-';

  const basePrice = getBasePrice(ticker);
  const currentPrice = marketDataForSymbol.price;

  // 유효한 가격인지 검증
  if (typeof currentPrice !== 'number' || isNaN(currentPrice) || currentPrice <= 0) {
    return '-';
  }

  if (typeof basePrice !== 'number' || isNaN(basePrice) || basePrice <= 0) {
    return '-';
  }

  const changePercent = ((currentPrice - basePrice) / basePrice) * 100;

  // NaN 체크
  if (isNaN(changePercent)) {
    return '-';
  }

  return changePercent.toFixed(2);
};

/**
 * 기준값 대비 증감률에 따른 CSS 클래스 반환
 * @param ticker - 심볼 티커
 * @param marketData - 시장 데이터 배열
 * @param getProfitLossClass - 수익/손실 클래스 반환 함수
 * @returns CSS 클래스명
 */
export const getChangeFromBaseClass = (
  ticker: string,
  marketData: readonly SymbolData[],
  getProfitLossClass: (value: number) => string
): string => {
  const marketDataForSymbol = marketData.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return 'neutral';

  const basePrice = getBasePrice(ticker);
  const currentPrice = marketDataForSymbol.price;

  // 유효한 가격인지 검증
  if (typeof currentPrice !== 'number' || isNaN(currentPrice) || currentPrice <= 0) {
    return 'neutral';
  }

  if (typeof basePrice !== 'number' || isNaN(basePrice) || basePrice <= 0) {
    return 'neutral';
  }

  const changePercent = ((currentPrice - basePrice) / basePrice) * 100;

  // NaN 체크
  if (isNaN(changePercent)) {
    return 'neutral';
  }

  return getProfitLossClass(changePercent);
};

/**
 * 심볼 필터링 (탭별, 검색어별)
 * @param symbols - 전체 심볼 배열
 * @param activeTab - 활성 탭
 * @param searchQuery - 검색어
 * @param favorites - 관심 종목 Set
 * @returns 필터링된 심볼 배열
 */
export const filterSymbols = (
  symbols: TradingSymbol[],
  activeTab: string,
  searchQuery: string,
  favorites: Set<string>
): TradingSymbol[] => {
  let filtered = symbols;

  // 탭별 필터링
  if (activeTab === 'favorite') {
    filtered = filtered.filter((symbol) => favorites.has(symbol.ticker));
  } else if (activeTab === 'holding') {
    // FIXME: 보유 종목 데이터 연동 필요
    // 현재는 암호화폐만 보유 종목으로 표시
    filtered = filtered.filter((symbol) => symbol.type === 'crypto');
  }

  // 검색 필터링
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (symbol) =>
        symbol.ticker.toLowerCase().includes(query) ||
        symbol.description.toLowerCase().includes(query)
    );
  }

  return filtered;
};
