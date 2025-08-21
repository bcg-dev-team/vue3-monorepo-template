/**
 * 차트 API 모킹 핸들러
 */

import { http, HttpResponse } from 'msw';
import { generateChartData } from '../utils/index.js';
import type { ChartApiResponse } from '../types/index.js';

export const chartHandlers = [
  http.get('/api/chart/:symbol', async ({ params }) => {
    const { symbol } = params;
    const symbolStr = String(symbol);
    
    // 실제 API 호출 시뮬레이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = generateChartData(symbolStr, 100);
    
    const response: ChartApiResponse = {
      success: true,
      data,
      message: `${symbolStr} 차트 데이터`
    };
    
    return HttpResponse.json(response);
  })
];
