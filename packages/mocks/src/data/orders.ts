/**
 * 주문 데이터 생성 및 관리
 * 1만 건의 가짜 주문 데이터를 생성합니다.
 */

import type { OrderData } from '../types/chart.js';
import { ALL_SYMBOLS } from '@template/types';

/**
 * 랜덤 주문 데이터 생성
 * @param count - 생성할 데이터 개수
 * @returns 생성된 주문 데이터 배열
 */
export function generateOrderData(count: number = 10000): OrderData[] {
  const orders: OrderData[] = [];
  const orderTypes: Array<'Buy' | 'Sell'> = ['Buy', 'Sell'];
  const orderStatuses: Array<'Open' | 'Closed' | 'Pending' | 'Cancelled'> = [
    'Open',
    'Closed',
    'Pending',
    'Cancelled',
  ];

  // 상태별 가중치 (현실적인 분포)
  const statusWeights = {
    Open: 0.15, // 15%
    Closed: 0.7, // 70%
    Pending: 0.1, // 10%
    Cancelled: 0.05, // 5%
  };

  const now = Date.now();
  const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000; // 1년 전

  for (let i = 0; i < count; i++) {
    // 랜덤 심볼 선택
    const symbol = ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)];

    // 랜덤 주문 타입
    const type = orderTypes[Math.floor(Math.random() * orderTypes.length)];

    // 가중치 기반 상태 선택
    const random = Math.random();
    let cumulativeWeight = 0;
    let status: 'Open' | 'Closed' | 'Pending' | 'Cancelled' = 'Closed';

    for (const [statusKey, weight] of Object.entries(statusWeights)) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        status = statusKey as 'Open' | 'Closed' | 'Pending' | 'Cancelled';
        break;
      }
    }

    // 가격 생성 (심볼 타입에 따라 다른 범위)
    let basePrice = 100;
    if (symbol.type === 'crypto') {
      basePrice = symbol.ticker.includes('BTC') ? 45000 : 3000;
    } else if (symbol.type === 'forex') {
      basePrice = 1.0 + Math.random() * 0.5; // 1.0 ~ 1.5
    } else if (symbol.type === 'stock') {
      basePrice = 50 + Math.random() * 200; // 50 ~ 250
    } else if (symbol.type === 'commodity') {
      basePrice = symbol.ticker.includes('XAU') ? 1800 : 20; // Gold: 1800, Oil: 20
    }

    const price = basePrice * (0.8 + Math.random() * 0.4); // ±20% 변동

    // 수량 생성 (가격에 반비례)
    const maxQuantity = Math.floor(10000 / price);
    const quantity = Math.max(0.01, Math.random() * maxQuantity);

    // 랜덤 시간 생성 (1년 전 ~ 현재)
    const createdAt = oneYearAgo + Math.random() * (now - oneYearAgo);
    const date = new Date(createdAt);

    // 시간 포맷팅
    const time = date.toISOString().replace('T', ' ').substring(0, 19);

    orders.push({
      id: i + 1,
      symbol: symbol.ticker,
      type,
      price: Math.round(price * 100) / 100, // 소수점 2자리
      quantity: Math.round(quantity * 100) / 100, // 소수점 2자리
      status,
      time,
      createdAt: Math.floor(createdAt / 1000), // 초 단위 타임스탬프
    });
  }

  // 생성 시간 기준으로 정렬 (최신순)
  return orders.sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * 1만 건의 주문 데이터
 */
export const ORDER_DATA = generateOrderData(10000);

/**
 * 주문 데이터를 가져오는 함수
 * @param limit - 가져올 데이터 개수 (기본값: 100)
 * @param offset - 시작 인덱스 (기본값: 0)
 * @returns 주문 데이터 배열
 */
export function getOrderData(limit: number = 100, offset: number = 0): OrderData[] {
  return ORDER_DATA.slice(offset, offset + limit);
}

/**
 * 특정 심볼의 주문 데이터를 가져오는 함수
 * @param symbol - 심볼 티커
 * @param limit - 가져올 데이터 개수 (기본값: 100)
 * @returns 해당 심볼의 주문 데이터 배열
 */
export function getOrderDataBySymbol(symbol: string, limit: number = 100): OrderData[] {
  return ORDER_DATA.filter((order) => order.symbol === symbol).slice(0, limit);
}

/**
 * 주문 데이터 검색 함수
 * @param query - 검색 쿼리
 * @param limit - 가져올 데이터 개수 (기본값: 100)
 * @returns 검색된 주문 데이터 배열
 */
export function searchOrderData(query: string, limit: number = 100): OrderData[] {
  const lowerQuery = query.toLowerCase();
  return ORDER_DATA.filter(
    (order) =>
      order.symbol.toLowerCase().includes(lowerQuery) ||
      order.type.toLowerCase().includes(lowerQuery) ||
      order.status.toLowerCase().includes(lowerQuery)
  ).slice(0, limit);
}
