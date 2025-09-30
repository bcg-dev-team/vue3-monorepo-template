/**
 * 차트 테마 관련 유틸리티
 */

import type { ChartSettings } from '@template/types';

/**
 * 테마 색상 정의
 */
export const CHART_THEME_COLORS = {
  // FIXME: 프로젝트 글로벌 테마 반영
  greenRed: {
    up: '#00a22f',
    down: '#f63338',
    name: 'greenRed' as const,
  },
  redBlue: {
    up: '#f63338',
    down: '#0067ef',
    name: 'redBlue' as const,
  },
} as const;

/**
 * 테마에 따른 TradingView overrides 생성
 */
export function generateThemeOverrides(theme: 'greenRed' | 'redBlue'): Record<string, any> {
  const colors = CHART_THEME_COLORS[theme];

  const overrides: Record<string, any> = {
    // 캔들스틱 스타일 강제 설정
    // FIXME: 차트 종류 기획에 따라 수정 필요

    'mainSeriesProperties.style': 1, // 1 = 캔들스틱
    // 캔들 색상 속성들
    'mainSeriesProperties.candleStyle.upColor': colors.up,
    'mainSeriesProperties.candleStyle.downColor': colors.down,
    'mainSeriesProperties.candleStyle.borderUpColor': colors.up,
    'mainSeriesProperties.candleStyle.borderDownColor': colors.down,
    'mainSeriesProperties.candleStyle.wickUpColor': colors.up,
    'mainSeriesProperties.candleStyle.wickDownColor': colors.down,
  };

  return overrides;
}

/**
 * 설정에서 테마 추출
 */
export function getThemeFromSettings(settings: ChartSettings): 'greenRed' | 'redBlue' {
  return settings.basic.theme;
}

/**
 * 테마 색상 가져오기
 */
export function getThemeColors(theme: 'greenRed' | 'redBlue') {
  return CHART_THEME_COLORS[theme];
}

/**
 * CSS에서 사용할 테마 색상 변수 생성
 */
export function generateThemeCSSVariables(theme: 'greenRed' | 'redBlue'): Record<string, string> {
  const colors = CHART_THEME_COLORS[theme];

  return {
    '--chart-theme-up-color': colors.up,
    '--chart-theme-down-color': colors.down,
  };
}
