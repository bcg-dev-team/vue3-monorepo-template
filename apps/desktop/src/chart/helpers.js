// Your CryptoCompare API key
export const apiKey = '50b312c44d36f6e5c3a72a852eff07a7f717e7264282270229c84c51693755b5';

// Makes requests to CryptoCompare API
// 이 함수는 crptocompare 에서만 적용되며 사용된다. 직접 데이터 피드를 구현할떄는 필요하지 않을수도있음
export async function makeApiRequest(path) {
  try {
    const url = new URL(`https://min-api.cryptocompare.com/${path}`);
    url.searchParams.append('api_key', apiKey);
    const response = await fetch(url.toString());
    return response.json();
  } catch (error) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// Generates a symbol ID from a pair of the coins
// 이 함수는 crptocompare 에서만 적용되며 사용된다. 직접 데이터 피드를 구현할떄는 필요하지 않을수도있음
export function generateSymbol(exchange, fromSymbol, toSymbol) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
  };
}

// 암호화 쌍 심볼을 구문 분석하고 해당 심볼의 모든 부분을 반환하는 함수
export function parseFullSymbol(fullSymbol) {
  console.log('[parseFullSymbol]: 파싱 시도:', fullSymbol);

  // 거래소:코인1/코인2 또는 코인1/코인2 모두 지원 (ChartView에서 사용하는 ETH/EUR 형식)
  const match = fullSymbol.match(/^(?:(\w+):)?(\w+)\/(\w+)$/);
  if (match) {
    const exchange = match[1] || 'Bitfinex';
    return { exchange: exchange, fromSymbol: match[2], toSymbol: match[3] };
  }

  // 외환 심볼 처리 (예: NZDCAD, GBPUSD, EURUSD)
  const forexMatch = fullSymbol.match(/^(?:(\w+):)?(\w{3})(\w{3})$/);
  if (forexMatch) {
    const exchange = forexMatch[1] || 'FX';
    return { exchange: exchange, fromSymbol: forexMatch[2], toSymbol: forexMatch[3] };
  }

  // 지수 심볼 처리 (예: US500)
  if (fullSymbol.includes('500') || fullSymbol.includes('INDEX')) {
    return { exchange: 'INDEX', fromSymbol: fullSymbol, toSymbol: 'USD' };
  }

  // 상품 심볼 처리 (예: COTTON)
  if (fullSymbol === 'COTTON') {
    return { exchange: 'COMMODITY', fromSymbol: 'COTTON', toSymbol: 'USD' };
  }

  console.warn('[parseFullSymbol]: 심볼을 파싱할 수 없습니다:', fullSymbol);
  return null;
}
