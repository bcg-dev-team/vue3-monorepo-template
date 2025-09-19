/**
 * 거래 가능한 심볼 목록 및 기준 가격 데이터
 */

import type { TradingSymbol } from '@template/types';

/**
 * 전체 심볼 목록
 * 제공된 심볼 목록을 TradingSymbol 형태로 변환합니다.
 */
export const SYMBOL_LIST: TradingSymbol[] = [
  'EURTRY',
  'USDSEK',
  'SUI30',
  'AUDJPY',
  'GBPJPY',
  'AAPL',
  'XRPUSD',
  'GBPAUD',
  'NOKSEK',
  'CHFPLN',
  'US30',
  'UKOil',
  'EURNZD',
  'GBPNOK',
  'AUDCAD',
  'EURHUF',
  'XAGUSD',
  'GBPEUR',
  'NZDCAD',
  'JPN225',
  'EURUSD',
  'ESP35',
  'EURHKD',
  'AUDCHF',
  'DKKJPY',
  'NZDUSD',
  'GER30',
  'CHFNOK',
  'GBPCAD',
  'EURSEK',
  'EURCAD',
  'EURGBP',
  'GBPDKK',
  'GBPCHF',
  'MXNJPY',
  'GBPSEK',
  'HKG33',
  'USDCZK',
  'PLNJPY',
  'USDCAD',
  'AUS200',
  'USDDKK',
  'TRYJPY',
  'EURAUD',
  'EURSGD',
  'CHFSEK',
  'NZDAUD',
  'GBPUSD',
  'USOil',
  'EURNOK',
  'CADJPY',
  'NZDJPY',
  'GBPPLN',
  'FRA40',
  'CHFJPY',
  'EURCHF',
  'GBPNZD',
  'EURPLN',
  'CADCHF',
  'EURZAR',
  'EURJPY',
  'USDCHF',
  'EUSTX50',
  'XAUUSD',
  'UK100',
  'USDJPY',
  'USDNOK',
  'USDSGD',
  'EURCZK',
  'NOKDKK',
  'USDTRY',
  'NZDCHF',
  'SGDJPY',
  'USDHKD',
  'ETHUSD',
  'AUDUSD',
  'NAS100',
].map((ticker, index) => {
  // 심볼 타입 분류
  let type = 'forex';
  let exchange = 'Forex';
  let description = ticker;

  if (ticker.includes('BTC') || ticker.includes('ETH') || ticker.includes('XRP')) {
    type = 'crypto';
    exchange = 'Crypto';
    description = `${ticker.split('USD')[0]} / US Dollar`;
  } else if (
    ticker.includes('Oil') ||
    ticker.includes('Gold') ||
    ticker.includes('XAU') ||
    ticker.includes('XAG')
  ) {
    type = 'commodity';
    exchange = 'Commodity';
    description = ticker.includes('Oil') ? 'Oil' : ticker.includes('XAU') ? 'Gold' : 'Silver';
  } else if (
    ticker.includes('AAPL') ||
    ticker.includes('US30') ||
    ticker.includes('NAS100') ||
    ticker.includes('JPN225')
  ) {
    type = 'stock';
    exchange = 'Stock';
    description = ticker.includes('AAPL')
      ? 'Apple Inc.'
      : ticker.includes('US30')
        ? 'Dow Jones 30'
        : ticker.includes('NAS100')
          ? 'NASDAQ 100'
          : ticker.includes('JPN225')
            ? 'Nikkei 225'
            : ticker;
  } else if (ticker.length === 6 && /^[A-Z]{6}$/.test(ticker)) {
    // 6자리 알파벳은 대부분 외환
    const base = ticker.substring(0, 3);
    const quote = ticker.substring(3, 6);
    description = `${base} / ${quote}`;
  }

  return {
    symbol: ticker,
    ticker,
    description,
    exchange,
    type,
  };
});

/**
 * 심볼별 기본 가격 설정 (실제 시장 가격 근사치)
 */
export const SYMBOL_BASE_PRICES: Record<string, number> = {
  // 암호화폐
  BTCUSD: 50000,
  ETHUSD: 3000,
  XRPUSD: 0.5,

  // 외환 - 주요 통화쌍
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
  XAGUSD: 25.0,
  GBPEUR: 1.19,
  JPN225: 33000,
  EURHKD: 8.2,
  DKKJPY: 22.0,
  GER30: 16000,
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
  NAS100: 15000,

  // 주식
  AAPL: 180.0,

  // 상품
  UKOil: 75.0,

  // 지수
  US30: 35000,
  ESP35: 9500,
  SUI30: 12000,
};
