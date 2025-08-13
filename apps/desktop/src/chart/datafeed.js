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

    // 심볼 타입에 따른 설정
    let pricescale = 100;
    let minmov = 1;
    let session = '24x7';

    switch (symbolItem.type) {
      case 'crypto':
        if (symbolItem.symbol.includes('ETH') || symbolItem.symbol.includes('BTC')) {
          pricescale = 100; // 암호화폐: 소수점 2자리 (예: 50000.12)
          minmov = 1;
        } else {
          pricescale = 100;
          minmov = 1;
        }
        break;
      case 'forex':
        if (symbolItem.symbol.includes('GBP') || symbolItem.symbol.includes('EUR')) {
          pricescale = 100000; // 외환: 소수점 5자리 (예: 1.12345)
          minmov = 1;
        } else {
          pricescale = 100000;
          minmov = 1;
        }
        break;
      case 'index':
        pricescale = 100; // 지수: 소수점 2자리 (예: 5000.50)
        minmov = 1;
        break;
      case 'commodity':
        pricescale = 1000; // 상품: 소수점 3자리 (예: 0.123)
        minmov = 1;
        break;
      default:
        pricescale = 100;
        minmov = 1;
        break;
    }

    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.ticker,
      name: symbolItem.symbol,
      full_name: symbolItem.symbol, // full_name 추가
      description: symbolItem.description,
      type: symbolItem.type,
      session: session,
      timezone: 'Etc/UTC',
      exchange: symbolItem.exchange,
      minmov: minmov,
      pricescale: pricescale,
      has_intraday: true,
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
      symbolInfo.minmov,
      'type:',
      symbolInfo.type
    );
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    console.log('[getBars]: full_name:', symbolInfo.full_name);
    console.log('[getBars]: resolution:', resolution);
    console.log('[getBars]: exchange:', symbolInfo.exchange);
    console.log('[getBars]: type:', symbolInfo.type);

    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    console.log('[getBars]: parsedSymbol:', parsedSymbol);

    if (!parsedSymbol) {
      console.error('[getBars]: 심볼 파싱 실패:', symbolInfo.full_name);
      onErrorCallback(new Error('Invalid symbol format'));
      return;
    }

    // 외환, 지수, 상품 심볼에 대해서는 모킹된 데이터 제공
    if (symbolInfo.exchange !== 'Bitfinex') {
      console.log(`[getBars]: ${symbolInfo.exchange} 거래소에 대해 모킹 데이터 생성 시작`);
      const mockBars = generateMockBars(symbolInfo, resolution, from, to);
      console.log(`[getBars]: 생성된 모킹 데이터:`, mockBars.length, '개 바');
      console.log(`[getBars]: 첫 번째 바:`, mockBars[0]);
      console.log(`[getBars]: 마지막 바:`, mockBars[mockBars.length - 1]);

      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...mockBars[mockBars.length - 1],
        });
      }
      console.log(`[getBars]: returned ${mockBars.length} mock bar(s) for ${symbolInfo.exchange}`);
      onHistoryCallback(mockBars, { noData: false });
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
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );
  },
  unsubscribeBars: (subscriberUID) => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

    // MSW WebSocket 스트림 구독 해제
    unsubscribeFromStream(subscriberUID);
  },
};

const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  // 데이터피드에서 지원하는 봉(resolution) 목록을 나타냅니다
  // 이미지 메시지와 일치하도록 설정: "1M, 5M, 15M, 30M, 60, 240, 1D, 1W, 1M"
  supported_resolutions: ['1', '5', '30', '60', '240', '1D', '1W', '1M'],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  // 사용자가 거래소를 선택할 경우 searchSymbols 메서드에서 사용되는 거래소 목록입니다
  exchanges: [
    { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
    { value: 'FX', name: 'FX', desc: 'Forex' },
    { value: 'INDEX', name: 'INDEX', desc: 'Index' },
    { value: 'COMMODITY', name: 'COMMODITY', desc: 'Commodity' },
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  // 사용자가 심볼 타입을 선택할 경우 searchSymbols 메서드에서 사용되는 심볼 타입 목록입니다
  symbols_types: [
    { name: 'crypto', value: 'crypto' },
    { name: 'forex', value: 'forex' },
    { name: 'index', value: 'index' },
    { name: 'commodity', value: 'commodity' },
  ],
  // Additional configuration for better price scale display
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  supports_search: true,
  supports_group_request: false,
};

// 시간 간격 매핑 함수
function getSupportedResolutions(symbol) {
  // 모든 심볼에 대해 동일한 시간 간격 지원
  return ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];
}

// 모킹된 차트 데이터 생성 함수
function generateMockBars(symbolInfo, resolution, from, to) {
  console.log(`[generateMockBars] ${symbolInfo.symbol} 심볼에 대한 모킹 데이터 생성 시작`);
  console.log(`[generateMockBars] resolution: ${resolution}, from: ${from}, to: ${to}`);

  const bars = [];

  // 심볼별 기본 가격 및 특성 설정
  let basePrice = 1.0;
  let volatility = 0.01; // 기본 변동성

  switch (symbolInfo.type) {
    case 'crypto':
      if (symbolInfo.symbol.includes('ETH')) {
        basePrice = 50000; // ETH/EUR 기준
        volatility = 0.015; // ETH는 변동성이 높음
      } else if (symbolInfo.symbol.includes('BTC')) {
        basePrice = 80000; // BTC/EUR 기준
        volatility = 0.02; // BTC는 변동성이 매우 높음
      } else {
        basePrice = 50000;
        volatility = 0.01;
      }
      break;
    case 'forex':
      if (symbolInfo.symbol.includes('GBP')) {
        basePrice = 1.26; // GBP/USD
        volatility = 0.008; // 외환은 상대적으로 낮은 변동성
      } else if (symbolInfo.symbol.includes('EUR') && !symbolInfo.symbol.includes('GBP')) {
        basePrice = 1.08; // EUR/USD
        volatility = 0.006; // EUR/USD는 안정적
      } else {
        basePrice = 1.2;
        volatility = 0.01;
      }
      break;
    case 'index':
      basePrice = 5000;
      volatility = 0.012;
      break;
    case 'commodity':
      basePrice = 0.85;
      volatility = 0.018;
      break;
    default:
      basePrice = 50000;
      volatility = 0.01;
      break;
  }

  console.log(`[generateMockBars] 기본 가격: ${basePrice}, 변동성: ${volatility}`);

  // ChartView와 동일한 수준의 데이터 생성 (100-200개 정도)
  const dataPoints = Math.min(150, Math.floor((to - from) / (1000 * 60 * 5))); // 5분 간격으로 150개 제한

  let currentTime = from;
  let currentPrice = basePrice;

  // 각 차트마다 약간 다른 시작 가격과 변동성을 주기 위해 랜덤 시드 생성
  const randomSeed = Math.random() * 0.1 - 0.05; // -5% ~ +5% 변동
  currentPrice = basePrice * (1 + randomSeed);

  console.log(
    `[generateMockBars] 생성할 데이터 포인트: ${dataPoints}개, 시작 가격: ${currentPrice}`
  );

  for (let i = 0; i < dataPoints; i++) {
    // 심볼별 특성을 반영한 가격 변동 시뮬레이션
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(currentPrice * (1 + change), currentPrice * 0.99);

    // OHLC 데이터 생성 (심볼별 특성 반영)
    const open = currentPrice;
    const high = currentPrice * (1 + Math.random() * volatility * 0.5);
    const low = currentPrice * (1 - Math.random() * volatility * 0.5);
    const close = currentPrice * (1 + (Math.random() - 0.5) * volatility * 0.3);

    // 소수점 자릿수 조정 (심볼별로 다름)
    let precision = 2;
    if (symbolInfo.symbol.includes('GBP') || symbolInfo.symbol.includes('EUR')) {
      precision = 5; // 외환은 5자리
    } else if (symbolInfo.symbol.includes('ETH') || symbolInfo.symbol.includes('BTC')) {
      precision = 2; // 암호화폐는 2자리
    }

    bars.push({
      time: currentTime,
      open: parseFloat(open.toFixed(precision)),
      high: parseFloat(high.toFixed(precision)),
      low: parseFloat(low.toFixed(precision)),
      close: parseFloat(close.toFixed(precision)),
    });

    // 5분 간격으로 설정
    currentTime += 5 * 60 * 1000; // 5분을 밀리초로
  }

  console.log(`[generateMockBars] 생성 완료 - ${bars.length}개 바`);
  console.log(`[generateMockBars] 첫 번째 바:`, bars[0]);
  console.log(`[generateMockBars] 마지막 바:`, bars[bars.length - 1]);

  return bars;
}

// Obtains all symbols for all exchanges supported by CryptoCompare API
// MSW 환경에서 사용할 심볼 목록 (모킹된 데이터)
async function getAllSymbols() {
  // MSW 환경에서는 하드코딩된 심볼 목록 사용
  return [
    // 암호화폐 심볼
    {
      symbol: 'BTC/EUR',
      ticker: 'BTC/EUR',
      description: 'Bitcoin / Euro',
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
    // 외환 심볼 (슬래시 형식)
    {
      symbol: 'GBP/USD',
      ticker: 'GBP/USD',
      description: 'British Pound / US Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'EUR/USD',
      ticker: 'EUR/USD',
      description: 'Euro / US Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    // 외환 심볼 (연결 형식)
    {
      symbol: 'NZDCAD',
      ticker: 'NZDCAD',
      description: 'New Zealand Dollar / Canadian Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'GBPUSD',
      ticker: 'GBPUSD',
      description: 'British Pound / US Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'USDJPY',
      ticker: 'USDJPY',
      description: 'US Dollar / Japanese Yen',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'AUDUSD',
      ticker: 'AUDUSD',
      description: 'Australian Dollar / US Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'USDCAD',
      ticker: 'USDCAD',
      description: 'US Dollar / Canadian Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    {
      symbol: 'NZDUSD',
      ticker: 'NZDUSD',
      description: 'New Zealand Dollar / US Dollar',
      exchange: 'FX',
      type: 'forex',
    },
    // 지수 및 상품
    {
      symbol: 'US500',
      ticker: 'US500',
      description: 'US 500 Index',
      exchange: 'INDEX',
      type: 'index',
    },
    {
      symbol: 'COTTON',
      ticker: 'COTTON',
      description: 'Cotton Futures',
      exchange: 'COMMODITY',
      type: 'commodity',
    },
  ];
}
