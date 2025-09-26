/**
 * TradingView 차트 Features 및 Overrides 관리 유틸리티
 */

import type { ChartSettings } from '@template/types';

/**
 * TradingView Features 설정 타입
 */
export interface TradingViewFeatures {
  enabledFeatures: string[];
  disabledFeatures: string[];
}

/**
 * 기본 활성화 기능들
 */
const DEFAULT_ENABLED_FEATURES = [
  'study_templates',
  'side_toolbar_in_fullscreen_mode',
  'header_compare',
  'compare_symbol',
  'show_spread_operators',
  'hide_price_scale_if_all_sources_hidden',
  // 범례 관련 기능들은 조건부로 활성화 (overrides와 함께 제어)
];

/**
 * 기본 비활성화 기능들
 */
const DEFAULT_DISABLED_FEATURES = [
  'use_localstorage_for_settings',
  'volume_force_overlay',
  'create_volume_indicator_by_default',
  'header_widget',
  'right_toolbar',
  'main_series_scale_menu',
  'header_symbol_search',
  'timeframes_toolbar',
  // 범례 편집은 기본 비활성화 (필요시 설정으로 활성화)
  'legend_inplace_edit',
  // 십자선 관련 features 시도 - 기본적으로 비활성화
  'hide_crosshair',
  'disable_crosshair',
  'no_crosshair',
];

/**
 * 트레이딩 관련 기능들
 */
const TRADING_FEATURES = {
  TRADING_PANEL: 'trading_panel',
  SHOW_ORDERS_ON_CHART: 'show_orders_on_chart',
} as const;

/**
 * 범례 관련 기능들
 */
const LEGEND_FEATURES = {
  LEGEND: 'legend',
  SHOW_LEGEND: 'show_legend',
  LEGEND_WIDGET: 'legend_widget',
  LEGEND_INPLACE_EDIT: 'legend_inplace_edit',
} as const;

/**
 * 설정에 따른 TradingView Features 생성
 */
export function generateTradingViewFeatures(settings: ChartSettings): TradingViewFeatures {
  const enabledFeatures = [...DEFAULT_ENABLED_FEATURES];
  const disabledFeatures = [...DEFAULT_DISABLED_FEATURES];

  // 중복 제거를 위한 Set 사용
  const enabledSet = new Set(enabledFeatures);
  const disabledSet = new Set(disabledFeatures);

  // 범례 표시 여부 결정 - 모든 범례 항목 포함
  const showAnyLegend =
    settings.symbols.showSymbolName ||
    settings.symbols.showChartValues ||
    settings.symbols.showBarChangeValues ||
    settings.symbols.showIndicatorNames ||
    settings.symbols.showIndicatorArguments ||
    settings.symbols.showIndicatorValues;

  // 범례 기능 조건부 활성화 - features로 확실히 제어
  if (showAnyLegend) {
    // 범례 관련 기능들을 활성화
    enabledSet.add(LEGEND_FEATURES.LEGEND);
    enabledSet.add(LEGEND_FEATURES.SHOW_LEGEND);
    disabledSet.delete(LEGEND_FEATURES.LEGEND);
    disabledSet.delete(LEGEND_FEATURES.SHOW_LEGEND);

    console.log('[TradingViewFeatures] Enabling legend features - legend needed');
  } else {
    // 범례 관련 기능들을 완전히 비활성화
    disabledSet.add(LEGEND_FEATURES.LEGEND);
    disabledSet.add(LEGEND_FEATURES.SHOW_LEGEND);
    disabledSet.add(LEGEND_FEATURES.LEGEND_WIDGET);
    enabledSet.delete(LEGEND_FEATURES.LEGEND);
    enabledSet.delete(LEGEND_FEATURES.SHOW_LEGEND);
    enabledSet.delete(LEGEND_FEATURES.LEGEND_WIDGET);

    console.log('[TradingViewFeatures] Disabling legend features - no legend needed');
  }

  // 차트 값 표시 설정에 따른 범례 편집 기능
  if (settings.symbols.showChartValues) {
    enabledSet.add(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);
    disabledSet.delete(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);
  } else {
    disabledSet.add(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);
    enabledSet.delete(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);
  }

  // 십자선 설정에 따른 features 제어 - 여러 가능한 feature 이름 시도
  if (settings.scales.showCrosshair) {
    // 십자선 표시 시 관련 features 제거/추가
    disabledSet.delete('hide_crosshair');
    disabledSet.delete('disable_crosshair');
    disabledSet.delete('no_crosshair');
    enabledSet.add('crosshair');
    enabledSet.add('show_crosshair');
    console.log('[TradingViewFeatures] Enabling crosshair - removing disable features');
  } else {
    // 십자선 숨김 시 관련 features 추가
    disabledSet.add('hide_crosshair');
    disabledSet.add('disable_crosshair');
    disabledSet.add('no_crosshair');
    enabledSet.delete('crosshair');
    enabledSet.delete('show_crosshair');
    console.log('[TradingViewFeatures] Disabling crosshair - adding disable features');
  }

  // 트레이딩 기능 설정
  if (settings.trading.showBuySellButtons) {
    enabledSet.add(TRADING_FEATURES.TRADING_PANEL);
    disabledSet.delete(TRADING_FEATURES.TRADING_PANEL);
  } else {
    disabledSet.add(TRADING_FEATURES.TRADING_PANEL);
    enabledSet.delete(TRADING_FEATURES.TRADING_PANEL);
  }

  if (settings.trading.showOrders) {
    enabledSet.add(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
    disabledSet.delete(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
  } else {
    disabledSet.add(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
    enabledSet.delete(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
  }

  return {
    enabledFeatures: Array.from(enabledSet),
    disabledFeatures: Array.from(disabledSet),
  };
}

/**
 * 기본 TradingView Overrides 생성
 */
export function generateBasicOverrides(): Record<string, any> {
  return {
    // 기본 패널 설정
    'paneProperties.gridLinesMode': 'none',
    'paneProperties.background': '#ffffff',
    'paneProperties.vertGridProperties.color': '#e6e6e6',
    'paneProperties.horzGridProperties.color': '#e6e6e6',

    // 심볼 워터마크 설정
    'symbolWatermarkProperties.transparency': 90,

    // 스케일 설정
    'scalesProperties.textColor': '#191919',
    'scalesProperties.lineColor': '#b8b8b8',

    // 범례는 features로 제어하고, overrides는 세부 설정만 담당
    // 'paneProperties.legendProperties.showLegend': false, // features로 제어
    'scalesProperties.showSeriesLastValue': false, // 기본적으로 차트 값 비표시

    // 십자선 기본 비활성화 (설정에 따라 override됨) - TradingView 공식 API 사용
    'crosshair.mode': 0, // 0: 비활성화
    'crosshair.visible': false,
    'crosshairProperties.visible': false,
  };
}

/**
 * 심볼 및 지표 관련 Overrides 생성
 */
export function generateSymbolOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 범례 표시 여부 결정 - 모든 범례 항목 포함
  const showAnyLegend =
    settings.symbols.showSymbolName ||
    settings.symbols.showChartValues ||
    settings.symbols.showBarChangeValues ||
    settings.symbols.showIndicatorNames ||
    settings.symbols.showIndicatorArguments ||
    settings.symbols.showIndicatorValues;

  // 1. 범례 전체 표시 여부
  overrides['paneProperties.legendProperties.showLegend'] = showAnyLegend;

  // 2. 종목명 표시 (시리즈 제목)
  overrides['paneProperties.legendProperties.showSeriesTitle'] = settings.symbols.showSymbolName;

  // 3. 차트 값 표시 (OHLC 값만) - 범례에서 OHLC 표시
  overrides['paneProperties.legendProperties.showSeriesOHLC'] = settings.symbols.showChartValues;

  // 4. 봉 변화값 표시 (변화값/비율) - 여러 속성 시도
  // TradingView에서 변화값과 OHLC를 분리하는 속성들 시도
  overrides['paneProperties.legendProperties.showBarChange'] = settings.symbols.showBarChangeValues;
  overrides['paneProperties.legendProperties.showPriceChange'] =
    settings.symbols.showBarChangeValues;
  overrides['paneProperties.legendProperties.showPercentChange'] =
    settings.symbols.showBarChangeValues;
  overrides['paneProperties.legendProperties.showSeriesChange'] =
    settings.symbols.showBarChangeValues;

  // 5. 지표 관련 설정 - 올바른 매핑
  overrides['paneProperties.legendProperties.showStudyTitles'] =
    settings.symbols.showIndicatorNames; // 지표 이름 (Title)
  overrides['paneProperties.legendProperties.showStudyArguments'] =
    settings.symbols.showIndicatorArguments; // 지표 매개변수
  overrides['paneProperties.legendProperties.showStudyValues'] =
    settings.symbols.showIndicatorValues; // 지표 값

  // 디버깅을 위한 로그
  console.log('[TradingViewFeatures] Symbol overrides generated:', {
    showChartValues: settings.symbols.showChartValues,
    showAnyLegend: showAnyLegend,
    showSymbolName: settings.symbols.showSymbolName,
    showBarChangeValues: settings.symbols.showBarChangeValues,
    showIndicatorValues: settings.symbols.showIndicatorValues,
    showIndicatorArguments: settings.symbols.showIndicatorArguments,
    generatedOverrides: overrides,
  });

  return overrides;
}

/**
 * 축 및 눈금선 관련 Overrides 생성
 */
export function generateScalesOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 가격 라벨 표시 (축의 가격 스케일 표시)
  overrides['scalesProperties.showRightScale'] = settings.scales.showPriceLabels;
  overrides['scalesProperties.showLeftScale'] = settings.scales.showPriceLabels;

  // 현재 가격 표시 (우측 현재 값) - "종목 가격" 설정으로 제어
  overrides['scalesProperties.showSeriesLastValue'] = settings.scales.showPriceLabels;

  // 격자선 설정 - 개별 방향 제어
  if (settings.scales.showGridLines) {
    // 격자선 모드에 따른 설정
    const gridMode = settings.scales.gridLineMode;

    // TradingView에서 사용하는 정확한 격자선 모드 값들
    if (gridMode === 'both') {
      // 수직 + 수평 모두 표시 - 여러 가능한 값 시도
      overrides['paneProperties.gridLinesMode'] = 'both';
      overrides['paneProperties.vertGridProperties.visible'] = true;
      overrides['paneProperties.horzGridProperties.visible'] = true;
    } else if (gridMode === 'vertical') {
      // 수직선만 표시 - 여러 가능한 값 시도
      overrides['paneProperties.gridLinesMode'] = 'vert';
      overrides['paneProperties.vertGridProperties.visible'] = true;
      overrides['paneProperties.horzGridProperties.visible'] = false;
    } else if (gridMode === 'horizontal') {
      // 수평선만 표시 - 여러 가능한 값 시도
      overrides['paneProperties.gridLinesMode'] = 'horz';
      overrides['paneProperties.vertGridProperties.visible'] = false;
      overrides['paneProperties.horzGridProperties.visible'] = true;
    }

    // 격자선 색상 설정
    overrides['paneProperties.vertGridProperties.color'] = settings.scales.verticalGridColor;
    overrides['paneProperties.horzGridProperties.color'] = settings.scales.horizontalGridColor;
  } else {
    // 격자선 완전 비활성화
    overrides['paneProperties.gridLinesMode'] = 'none';
    overrides['paneProperties.vertGridProperties.visible'] = false;
    overrides['paneProperties.horzGridProperties.visible'] = false;
  }

  console.log('[TradingViewFeatures] Grid lines settings:', {
    showGridLines: settings.scales.showGridLines,
    gridLineMode: settings.scales.gridLineMode,
    appliedOverrides: {
      'paneProperties.gridLinesMode': overrides['paneProperties.gridLinesMode'],
      'paneProperties.vertGridProperties.visible':
        overrides['paneProperties.vertGridProperties.visible'],
      'paneProperties.horzGridProperties.visible':
        overrides['paneProperties.horzGridProperties.visible'],
    },
  });

  // 십자선 설정 - TradingView 공식 API 사용
  if (settings.scales.showCrosshair) {
    // 십자선 활성화 - mode 1 (기본 모드)
    overrides['crosshair.mode'] = 1;
    overrides['crosshair.color'] = settings.scales.crosshairColor;
    overrides['crosshair.width'] = 1;
    overrides['crosshair.style'] = 0; // 실선

    // 기존 속성명들도 함께 시도 (호환성)
    overrides['crosshairProperties.visible'] = true;
    overrides['crosshairProperties.color'] = settings.scales.crosshairColor;
  } else {
    // 십자선 비활성화 - mode 0
    overrides['crosshair.mode'] = 0;

    // 기존 속성명들도 함께 시도 (호환성)
    overrides['crosshairProperties.visible'] = false;
    overrides['crosshair.visible'] = false;
  }

  console.log('[TradingViewFeatures] Crosshair settings:', {
    showCrosshair: settings.scales.showCrosshair,
    crosshairColor: settings.scales.crosshairColor,
    appliedOverrides: {
      'crosshair.mode': overrides['crosshair.mode'],
      'crosshair.color': overrides['crosshair.color'],
      'crosshair.visible': overrides['crosshair.visible'],
      'crosshairProperties.visible': overrides['crosshairProperties.visible'],
    },
  });

  return overrides;
}

/**
 * 기본 설정 관련 Overrides 생성
 */
export function generateBasicSettingsOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 가격 정밀도 설정
  if (settings.basic.precision !== 'default') {
    const precision = parseInt(settings.basic.precision);
    if (!isNaN(precision)) {
      const priceScale = Math.pow(10, precision);
      overrides['mainSeriesProperties.minTick'] = `${priceScale},1,false`;
    }
  }

  // 타임존 설정
  if (settings.basic.timezone) {
    overrides['timezone'] = settings.basic.timezone;
  }

  // 시간 형식 설정 (24시간 고정)
  overrides['scalesProperties.timeVisible'] = true;

  return overrides;
}

/**
 * 모든 Overrides를 통합하여 생성
 */
export function generateAllOverrides(settings: ChartSettings): Record<string, any> {
  const basicOverrides = generateBasicOverrides();
  const symbolOverrides = generateSymbolOverrides(settings);
  const scalesOverrides = generateScalesOverrides(settings);
  const basicSettingsOverrides = generateBasicSettingsOverrides(settings);

  // 테마 관련 overrides는 ChartTheme.ts에서 처리
  return {
    ...basicOverrides,
    ...symbolOverrides,
    ...scalesOverrides,
    ...basicSettingsOverrides,
  };
}

/**
 * 설정 변경이 Features 재생성을 필요로 하는지 확인
 */
export function needsFeaturesRecreation(
  currentSettings: ChartSettings,
  newSettings: ChartSettings
): boolean {
  // 축 및 눈금선 변경사항 확인 (안전한 접근)
  const gridLinesChange =
    currentSettings.scales?.showGridLines !== newSettings.scales.showGridLines;
  const gridLineModeChange =
    currentSettings.scales?.gridLineMode !== newSettings.scales.gridLineMode;
  const crosshairChange =
    currentSettings.scales?.showCrosshair !== newSettings.scales.showCrosshair;
  const priceLabelsChange =
    currentSettings.scales?.showPriceLabels !== newSettings.scales.showPriceLabels;

  // 트레이딩 변경사항 확인
  const tradingButtonsChange =
    currentSettings.trading.showBuySellButtons !== newSettings.trading.showBuySellButtons;
  const tradingOrdersChange = currentSettings.trading.showOrders !== newSettings.trading.showOrders;

  // 차트 재생성이 꼭 필요한 경우만 확인
  // 대부분의 UI 설정은 overrides로 적용 가능
  const needsRecreation =
    gridLineModeChange || // 격자선 모드 변경 (API 제한)
    tradingOrdersChange; // 주문 표시 변경 (테마 변경 필요)

  // 재생성 필요성 변경사항만 로깅
  console.log('[TradingViewFeatures] 🔍 RECREATION CHECK:', {
    gridLineModeChange,
    tradingOrdersChange,
    needsRecreation,
  });

  // 불필요한 상세 로그는 제거하고 핵심 로직만 유지

  return needsRecreation;
}

/**
 * 심볼 관련 override 키들 필터링
 */
export function getSymbolOverrideKeys(overrides: Record<string, any>): string[] {
  return Object.keys(overrides).filter(
    (key) =>
      key.includes('legend') || key.includes('showSeriesLastValue') || key.includes('showLastValue')
  );
}

/**
 * Features 설정 로깅을 위한 유틸리티
 */
export function logFeaturesConfiguration(features: TradingViewFeatures): void {
  console.log('[TradingViewFeatures] Configuration:', {
    enabledLegendFeatures: features.enabledFeatures.filter((f) => f.includes('legend')),
    disabledLegendFeatures: features.disabledFeatures.filter((f) => f.includes('legend')),
    enabledTradingFeatures: features.enabledFeatures.filter((f) => f.includes('trading')),
    disabledTradingFeatures: features.disabledFeatures.filter((f) => f.includes('trading')),
    totalEnabledFeatures: features.enabledFeatures.length,
    totalDisabledFeatures: features.disabledFeatures.length,
  });
}

/**
 * Overrides 설정 로깅을 위한 유틸리티
 */
export function logOverridesConfiguration(overrides: Record<string, any>): void {
  const symbolKeys = getSymbolOverrideKeys(overrides);
  const symbolOverrides = symbolKeys.reduce((obj: any, key) => {
    obj[key] = overrides[key];
    return obj;
  }, {});

  console.log('[TradingViewFeatures] Overrides configuration:', {
    totalOverrides: Object.keys(overrides).length,
    symbolRelatedKeys: symbolKeys,
    symbolOverrides: symbolOverrides,
    timezone: overrides['timezone'],
    minTick: overrides['mainSeriesProperties.minTick'],
  });
}
