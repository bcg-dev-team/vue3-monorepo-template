/* 
datafeed api는 위젯 생성자에서 구현하고 datafeed 객체에 할당해야 하는 메서드 집합
 */

import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';
import { subscribeOnStream, unsubscribeFromStream } from './streaming.js';

const lastBarsCache = new Map();

export default {
  onReady: (callback) => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
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
  // 데이터 피드가 구성되면 호출됨
  // 거래소,시간대,가격단위 등 기호정보를 검색한다.
  // 이 튜토리얼에서는 메서드 supported_resolutions: ['1D', '1W', '1M']에 값을 지정했습니다 onReady.
  // 라이브러리는 일일 값을 기반으로 주간 및 월간 값을 생성할 수 있습니다( ). 하지만 데이터 피드에 이러한 값이
  // 포함되지 않도록 하려면 를 설정 1D해야 합니다 .has_weekly_and_monthlyfalse
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    // Symbol information object
    const symbolInfo = {
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
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    console.log('[getBars]: full_name:', symbolInfo.full_name);
    console.log('[getBars]: resolution:', resolution);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    console.log('[getBars]: parsedSymbol:', parsedSymbol);

    if (!parsedSymbol) {
      console.error('[getBars]: 심볼 파싱 실패:', symbolInfo.full_name);
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
    const urlParameters = {
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
      const data = await makeApiRequest(`data/histoday?${query}`);
      if ((data.Response && data.Response === 'Error') || data.Data.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }
      let bars = [];
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
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
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
      onErrorCallback(error);
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    console.log('[subscribeBars]: symbolInfo:', symbolInfo);
    console.log('[subscribeBars]: resolution:', resolution);

    // MSW WebSocket 스트림 구독
    // subscribeOnStream(
    //   symbolInfo,
    //   resolution,
    //   onRealtimeCallback,
    //   subscriberUID,
    //   onResetCacheNeededCallback,
    //   lastBarsCache.get(symbolInfo.full_name)
    // );
  },
  unsubscribeBars: (subscriberUID) => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

    // MSW WebSocket 스트림 구독 해제
    // unsubscribeFromStream(subscriberUID);
  },
};

const configurationData = {
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
function getSupportedResolutions(symbol) {
  // ETH/EUR에 대해서는 이미지 메시지와 일치하는 시간 간격 설정
  if (symbol === 'ETH/EUR') {
    return ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }
  // 다른 심볼들은 기본 설정 사용
  return configurationData.supported_resolutions;
}

// Obtains all symbols for all exchanges supported by CryptoCompare API
// MSW 환경에서 사용할 심볼 목록 (모킹된 데이터)
async function getAllSymbols() {
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
