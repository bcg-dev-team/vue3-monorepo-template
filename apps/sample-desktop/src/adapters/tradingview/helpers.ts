/**
 * CryptoCompare API 키
 */
export const apiKey: string = '50b312c44d36f6e5c3a72a852eff07a7f717e7264282270229c84c51693755b5';

/**
 * CryptoCompare API 요청을 처리하는 함수
 * 이 함수는 CryptoCompare에서만 적용되며 사용된다. 직접 데이터 피드를 구현할 때는 필요하지 않을 수도 있음
 * @param path - API 경로
 * @returns API 응답 데이터
 * @throws {Error} API 요청 실패 시 에러
 */
export async function makeApiRequest(path: string): Promise<any> {
  try {
    const url = new URL(`https://min-api.cryptocompare.com/${path}`);
    url.searchParams.append('api_key', apiKey);
    const response = await fetch(url.toString());
    return response.json();
  } catch (error: any) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

/**
 * 심볼 정보 인터페이스
 */
export interface SymbolInfo {
  short: string;
}

/**
 * 코인 쌍에서 심볼 ID를 생성하는 함수
 * 이 함수는 CryptoCompare에서만 적용되며 사용된다. 직접 데이터 피드를 구현할 때는 필요하지 않을 수도 있음
 * @param exchange - 거래소 이름
 * @param fromSymbol - 기준 코인
 * @param toSymbol - 대상 코인
 * @returns 심볼 정보 객체
 */
export function generateSymbol(exchange: string, fromSymbol: string, toSymbol: string): SymbolInfo {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
  };
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
