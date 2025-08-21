/**
 * 차트 데이터 생성 유틸리티
 */

export function generateChartData(symbol: string, count: number = 100): any[] {
  const data = [];
  const now = Math.floor(Date.now() / 1000);
  const basePrice = symbol === 'BTC' ? 50000 : 3000;
  
  for (let i = count; i >= 0; i--) {
    const time = now - i * 60; // 1분 간격
    const change = (Math.random() - 0.5) * 0.02; // ±1% 변동
    const price = basePrice * (1 + change);
    
    data.push({
      time,
      open: price,
      high: price * (1 + Math.random() * 0.01),
      low: price * (1 - Math.random() * 0.01),
      close: price * (1 + (Math.random() - 0.5) * 0.005),
      volume: Math.floor(Math.random() * 10000)
    });
  }
  
  return data;
}
