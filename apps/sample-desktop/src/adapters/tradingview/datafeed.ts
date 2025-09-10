/* 
datafeed api는 위젯 생성자에서 구현하고 datafeed 객체에 할당해야 하는 메서드 집합
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
  CryptoCompareApiData,
} from '@/types/tradingview';

// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.ts';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { subscribeOnStream, unsubscribeFromStream } from './streaming';
import { logger } from '@template/utils';
const lastBarsCache = new Map<string, TradingViewBar>();

const datafeed: TradingViewDatafeed = {
  onReady: (callback: (config: TradingViewConfiguration) => void): void => {
    logger.info('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: TradingSymbol[]) => void
  ): Promise<void> => {
    logger.info('[searchSymbols]: Method call');
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
    logger.info('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    if (!symbolItem) {
      logger.info('[resolveSymbol]: Cannot resolve symbol', symbolName);
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
    logger.info('[resolveSymbol]: Symbol resolved', symbolName);
    logger.info('[resolveSymbol]: symbolInfo:', symbolInfo);
    logger.info('[resolveSymbol]: 가격 스케일 설정', {
      pricescale: symbolInfo.pricescale,
      minmov: symbolInfo.minmov,
    });
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
    logger.info('[getBars]: Method call', {
      symbolInfo,
      resolution,
      from,
      to,
    });
    logger.info('[getBars]: full_name:', symbolInfo.full_name);
    logger.info('[getBars]: resolution:', resolution);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name || symbolInfo.name);
    logger.info('[getBars]: parsedSymbol:', parsedSymbol);

    if (!parsedSymbol) {
      logger.error('[getBars]: 심볼 파싱 실패:', symbolInfo.full_name);
      onErrorCallback(new Error('Invalid symbol format'));
      return;
    }

    // 시간 간격별 데이터 요청 파라미터 조정
    let dataLimit = 2000;
    let timeMultiplier = 1;

    // 시간 간격에 따른 데이터 요청 조정
    if (resolution === '60' || resolution === '240') {
      // 1시간, 4시간 간격의 경우 더 많은 데이터 요청
      dataLimit = 5000;
      timeMultiplier = 1;
    } else if (resolution === '1D' || resolution === '1W' || resolution === '1M') {
      // 일/주/월 간격의 경우
      dataLimit = 1000;
      timeMultiplier = 1;
    } else {
      // 분 단위 간격의 경우
      dataLimit = 2000;
      timeMultiplier = 1;
    }

    const urlParameters: Record<string, string | number> = {
      e: symbolInfo.exchange,
      fsym: parsedSymbol.fromSymbol,
      tsym: parsedSymbol.toSymbol,
      toTs: to,
      limit: dataLimit,
      resolution: resolution, // 해상도 정보 추가
    };

    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');

    try {
      // 통합 API 엔드포인트 사용
      const apiEndpoint = 'data/history';

      const data: CryptoCompareApiData = await makeApiRequest(`${apiEndpoint}?${query}`);
      if ((data.Response && data.Response === 'Error') || data.Data.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }

      let bars: TradingViewBar[] = [];
      data.Data.forEach((bar) => {
        if (bar.time >= from && bar.time < to) {
          bars = [
            ...bars,
            {
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
            },
          ];
        }
      });

      if (firstDataRequest && bars.length > 0) {
        lastBarsCache.set(symbolInfo.full_name || symbolInfo.name, {
          ...bars[bars.length - 1],
        });
      }

      logger.info(`[getBars]: returned ${bars.length} bar(s)`);
      logger.info('[getBars]: 첫 번째 바 데이터:', bars[0]);
      logger.info('[getBars]: 마지막 바 데이터:', bars[bars.length - 1]);
      logger.info('[getBars]: 가격 범위:', {
        min: Math.min(...bars.map((b) => b.low)),
        max: Math.max(...bars.map((b) => b.high)),
      });
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      logger.info('[getBars]: Get error', error);
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
    logger.info('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    logger.info('[subscribeBars]: symbolInfo:', symbolInfo);
    logger.info('[subscribeBars]: resolution:', resolution);

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
    logger.info('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

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
  supports_search: true,
  supports_group_request: false,
};

// 시간 간격 매핑 함수
function getSupportedResolutions(symbol: string): string[] {
  // ETH/EUR에 대해서는 이미지 메시지와 일치하는 시간 간격 설정
  if (symbol === 'ETH/EUR') {
    return ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }
  // 다른 심볼들은 기본 설정 사용
  return configurationData.supported_resolutions;
}

// Obtains all symbols for all exchanges supported by CryptoCompare API
// MSW 환경에서 사용할 심볼 목록 (모킹된 데이터)
async function getAllSymbols(): Promise<TradingSymbol[]> {
  // MSW 환경에서는 하드코딩된 심볼 목록 사용
  return [
    {
      symbol: 'BTC/EUR',
      ticker: 'BTC/EUR',
      description: 'Bitcoin / Euro',
      exchange: 'Bitfinex',
      type: 'crypto',
    },
    {
      symbol: 'BTC/USD',
      ticker: 'BTC/USD',
      description: 'Bitcoin / US Dollar',
      exchange: 'Bitfinex',
      type: 'crypto',
    },
    {
      symbol: 'ETH/EUR',
      ticker: 'ETH/EUR',
      description: 'Ethereum / Euro',
      exchange: 'Bitfinex',
      type: 'crypto',
    },
    {
      symbol: 'ETH/USD',
      ticker: 'ETH/USD',
      description: 'Ethereum / US Dollar',
      exchange: 'Bitfinex',
      type: 'crypto',
    },
  ];
}

export default datafeed;
