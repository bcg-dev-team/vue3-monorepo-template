/**
 * 시장 데이터 관리 Composable
 * 실시간 시장 데이터 상태 관리 및 업데이트 처리
 */

import { getAllSymbols, getSymbolBasePrice } from '@template/mocks';
import { useRealtimeConfig } from './useRealtimeConfig';
import type { SymbolData } from '@template/types';
import { ref, readonly } from 'vue';

export function useMarketData() {
  // 시장 데이터 상태
  const marketData = ref<SymbolData[]>([]);

  // 실시간 설정 관리
  const realtimeConfig = useRealtimeConfig();

  // 시장 데이터 초기화
  const initializeMarketData = () => {
    const symbols = getAllSymbols();
    marketData.value = symbols.map((symbol) => {
      const basePrice = getSymbolBasePrice(symbol.ticker);
      return {
        symbol: symbol.ticker,
        price: basePrice,
        change: 0,
        changePercent: 0,
        volume: Math.floor(Math.random() * 10000) + 1000,
        high: basePrice * 1.02,
        low: basePrice * 0.98,
        open: basePrice,
        close: basePrice,
        timestamp: Date.now(),
      };
    });
  };

  // 차트 스트리밍 시스템에서 데이터를 받아서 시장 데이터 업데이트
  const updateMarketDataFromStream = (symbol: string, streamData: any) => {
    const dataIndex = marketData.value.findIndex((data) => data.symbol === symbol);
    if (dataIndex !== -1) {
      const currentData = marketData.value[dataIndex];
      const newPrice = streamData.close || streamData.price;
      const change = newPrice - currentData.price;
      const changePercent = (change / currentData.price) * 100;

      marketData.value[dataIndex] = {
        ...currentData,
        price: Math.round(newPrice * 100000) / 100000,
        change: Math.round(change * 100000) / 100000,
        changePercent: Math.round(changePercent * 100) / 100,
        high: Math.max(currentData.high, newPrice),
        low: Math.min(currentData.low, newPrice),
        volume: currentData.volume + (streamData.volume || 0),
        timestamp: streamData.time || Date.now(),
      };

      // console.log(`[useMarketData] ${symbol} 업데이트: ${currentData.price} → ${newPrice}`);
    } else {
      console.warn(`[useMarketData] ${symbol} 데이터를 찾을 수 없습니다!`);
    }
    recordMarketUpdate();
  };

  // 차트 스트리밍 시스템과 연동을 위한 전역 함수 등록
  const setupStreamingIntegration = () => {
    if (typeof window !== 'undefined') {
      // 전역 함수로 차트 스트리밍 데이터를 받을 수 있도록 설정
      (window as any).updateMarketDataFromStream = updateMarketDataFromStream;

      // 스트리밍 간격 설정 함수 등록
      (window as any).getStreamingInterval = () => {
        const config = realtimeConfig.getConfig();
        return config.market.interval;
      };
    }
  };

  // 시장 데이터 업데이트 기록
  const recordMarketUpdate = () => {
    realtimeConfig.recordUpdate('market');
  };

  // 특정 심볼의 데이터 가져오기
  const getSymbolData = (symbol: string): SymbolData | undefined => {
    return marketData.value.find((data) => data.symbol === symbol);
  };

  // 초기화
  initializeMarketData();
  setupStreamingIntegration();

  return {
    // 상태
    marketData: readonly(marketData),

    // 함수들
    initializeMarketData,
    updateMarketDataFromStream,
    setupStreamingIntegration,
    getSymbolData,
  };
}
