/*
 * datafeed api는 위젯 생성자에서 구현하고 datafeed 객체에 할당해야 하는 메서드 집합
 */

import type {
  TradingViewDatafeed,
  TradingViewBar,
  TradingViewSymbolInfo,
  TradingSymbol,
  TradingViewConfiguration,
  ChartPeriodParams,
  HistoryCallback,
  ErrorCallback,
  RealtimeCallback,
  ResetCacheCallback,
} from '@/types/tradingview';

import { subscribeOnStream, unsubscribeFromStream } from './streaming';
const lastBarsCache = new Map<string, TradingViewBar>();

const datafeed: TradingViewDatafeed = {
  onReady: (callback: (config: TradingViewConfiguration) => void): void => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  // TODO: Chart Widget 내장 검색 기능 불필요 시 내부 로직 제거
  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: TradingSymbol[]) => void
  ): Promise<void> => {
    console.log('[searchSymbols]: Method call');
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === '' || symbol.exchange === exchange;
      const fullName = `${symbol.exchange}:${symbol.ticker}`;
      const isFullSymbolContainsInput =
        fullName.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: TradingViewSymbolInfo) => void,
    onResolveErrorCallback: ErrorCallback,
    extension?: any
  ): Promise<void> => {
    console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    // Symbol information object
    const symbolInfo: TradingViewSymbolInfo = {
      ticker: symbolItem.ticker,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100, // 소수점 2자리 (예: 50000.12)
      has_intraday: true, // ETH/EUR은 분 단위 데이터 지원
      visible_plots_set: 'ohlc',
      has_weekly_and_monthly: false,
      // 심볼별 지원 시간 간격 설정
      supported_resolutions: getSupportedResolutions(symbolItem.ticker),
      volume_precision: 2,
      data_status: 'streaming',
      format: 'price', // 가격 형식 명시
    };
    console.log('[resolveSymbol]: Symbol resolved', symbolName);
    console.log('[resolveSymbol]: symbolInfo:', symbolInfo);
    console.log(
      '[resolveSymbol]: 가격 스케일 설정 - pricescale:',
      symbolInfo.pricescale,
      'minmov:',
      symbolInfo.minmov
    );
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    periodParams: ChartPeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ): Promise<void> => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    console.log('[getBars]: full_name:', symbolInfo.full_name);
    console.log('[getBars]: resolution:', resolution);

    try {
      // mocks 패키지의 TradingView 히스토리 데이터 생성 함수 사용
      const { generateTradingViewBars } = await import('@template/mocks');
      const bars: TradingViewBar[] = generateTradingViewBars(symbolInfo.name, from, to, resolution);

      if (firstDataRequest && bars.length > 0) {
        lastBarsCache.set(symbolInfo.full_name || symbolInfo.name, {
          ...bars[bars.length - 1],
        });
      }

      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      console.log('[getBars]: 첫 번째 바 데이터:', bars[0]);
      console.log('[getBars]: 마지막 바 데이터:', bars[bars.length - 1]);
      console.log('[getBars]: 가격 범위:', {
        min: Math.min(...bars.map((b) => b.low)),
        max: Math.max(...bars.map((b) => b.high)),
      });
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log('[getBars]: Get error', error);
      onErrorCallback(error as Error);
    }
  },

  subscribeBars: (
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    onRealtimeCallback: RealtimeCallback,
    subscriberUID: string,
    onResetCacheNeededCallback?: ResetCacheCallback
  ): void => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    console.log('[subscribeBars]: symbolInfo:', symbolInfo);
    console.log('[subscribeBars]: resolution:', resolution);

    // MSW WebSocket 스트림 구독 활성화
    const lastBar = lastBarsCache.get(symbolInfo.full_name || symbolInfo.name);
    const lastBarForStream = lastBar
      ? {
          ...lastBar,
          volume: lastBar.volume || 0,
        }
      : undefined;

    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarForStream
    );
  },

  unsubscribeBars: (subscriberUID: string): void => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

    // MSW WebSocket 스트림 구독 해제 활성화
    unsubscribeFromStream(subscriberUID);
  },
};

const configurationData: TradingViewConfiguration = {
  // Represents the resolutions for bars supported by your datafeed
  // 데이터피드에서 지원하는 봉(resolution) 목록을 나타냅니다
  // 이미지 메시지와 일치하도록 설정: "1M, 5M, 15M, 30M, 60, 240, 1D, 1W, 1M"
  supported_resolutions: ['1', '5', '30', '60', '240', '1D', '1W', '1M'],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  // 사용자가 거래소를 선택할 경우 searchSymbols 메서드에서 사용되는 거래소 목록입니다
  // exchanges: [
  //   { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
  //   { value: 'Binance', name: 'Binance', desc: 'Binance' },
  // ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  // 사용자가 심볼 타입을 선택할 경우 searchSymbols 메서드에서 사용되는 심볼 타입 목록입니다
  symbols_types: [{ name: 'crypto', value: 'crypto' }],
  // Additional configuration for better price scale display
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  // chart widget 내장 검색 기능
  supports_search: false,
  supports_group_request: false,
};

// 시간 간격 매핑 함수
// TODO: 세부 정책 결정 시 수정
function getSupportedResolutions(symbol: string): string[] {
  // 암호화폐는 모든 시간 간격 지원
  if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP')) {
    return ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }

  // 외환은 분 단위 제한
  if (symbol.length === 6 && /^[A-Z]{6}$/.test(symbol)) {
    return ['5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }

  // 주식은 일 단위 이상
  if (
    symbol.includes('AAPL') ||
    symbol.includes('US30') ||
    symbol.includes('NAS100') ||
    symbol.includes('JPN225')
  ) {
    return ['60', '240', '1D', '1W', '1M'];
  }

  // 상품은 일 단위 이상
  if (
    symbol.includes('Oil') ||
    symbol.includes('Gold') ||
    symbol.includes('XAU') ||
    symbol.includes('XAG')
  ) {
    return ['60', '240', '1D', '1W', '1M'];
  }

  // 기본 설정 사용
  return configurationData.supported_resolutions;
}

/**
 * MSW 환경에서 사용할 심볼 목록 가져오기
 */
export async function getAllSymbols(): Promise<TradingSymbol[]> {
  // mocks 패키지에서 실제 심볼 목록 가져오기
  const { getAllSymbols } = await import('@template/mocks');
  return getAllSymbols();
}

export default datafeed;
