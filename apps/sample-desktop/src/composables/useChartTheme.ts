/**
 * 차트 테마 글로벌 상태 관리
 */

import type { ChartSettings } from '@/utils/chart/ChartConfig';
import { CHART_THEME_COLORS } from '@/utils/chart/ChartTheme';
import { ref, reactive, watch, readonly } from 'vue';

// 글로벌 차트 설정 상태
const globalChartSettings = reactive<ChartSettings>({
  basic: {
    theme: 'redBlue', // 기본 테마
    precision: 'default',
    timezone: 'Asia/Seoul',
    locale: 'ko', // 기본 언어 설정
  },
  symbols: {
    showSymbolName: true, // 종목명 표시 - 기본적으로 활성화
    showChartValues: true, // 차트 값 표시 - 기본적으로 활성화
    showBarChangeValues: true, // 봉 변화값 표시 - 기본적으로 활성화
    showIndicatorNames: true, // 지표 이름 표시 - 기본적으로 활성화
    showIndicatorArguments: false, // 지표 매개변수 표시 - 기본적으로 비활성화
    showIndicatorValues: false, // 지표 값 표시 - 지표 없을 때는 비활성화
  },
  scales: {
    showPriceLabels: true,
    showGridLines: false,
    gridLineMode: 'both',
    verticalGridColor: '#e6e6e6',
    horizontalGridColor: '#e6e6e6',
    showCrosshair: true,
    crosshairColor: '#8f9299',
  },
  trading: {
    showBuySellButtons: false,
    instantOrderExecution: false,
    showOrders: false,
  },
});

// 등록된 차트 매니저들 추적
const registeredChartManagers = new Set<any>();

/**
 * 차트 테마 글로벌 관리 composable
 */
export function useChartTheme() {
  /**
   * 차트 매니저 등록
   */
  const registerChartManager = (chartManager: any) => {
    registeredChartManagers.add(chartManager);
    console.log('[useChartTheme] Chart manager registered. Total:', registeredChartManagers.size);
  };

  /**
   * 차트 매니저 등록 해제
   */
  const unregisterChartManager = (chartManager: any) => {
    registeredChartManagers.delete(chartManager);
    console.log('[useChartTheme] Chart manager unregistered. Total:', registeredChartManagers.size);
  };

  /**
   * 글로벌 설정 가져오기
   */
  const getGlobalSettings = (): ChartSettings => {
    return { ...globalChartSettings };
  };

  /**
   * 글로벌 설정 업데이트 (모든 차트에 적용)
   */
  const updateGlobalSettings = async (newSettings: ChartSettings) => {
    // 글로벌 설정 업데이트
    Object.assign(globalChartSettings, newSettings);

    console.log('[useChartTheme] === GLOBAL SETTINGS UPDATE STARTED ===');
    console.log('[useChartTheme] Updating settings for', registeredChartManagers.size, 'charts');
    console.log('[useChartTheme] New symbol settings:', {
      showSymbolName: newSettings.symbols.showSymbolName,
      showChartValues: newSettings.symbols.showChartValues,
      showBarChangeValues: newSettings.symbols.showBarChangeValues,
      showIndicatorValues: newSettings.symbols.showIndicatorValues,
      showIndicatorArguments: newSettings.symbols.showIndicatorArguments,
    });

    // 모든 등록된 차트 매니저에 설정 적용
    const promises = Array.from(registeredChartManagers).map(async (chartManager) => {
      try {
        if (chartManager && typeof chartManager.applyChartSettings === 'function') {
          // 재생성 필요 여부 확인
          const needsRecreation =
            typeof chartManager.needsRecreation === 'function'
              ? chartManager.needsRecreation(newSettings)
              : false;

          console.log('[useChartTheme] Chart recreation check:', {
            needsRecreation: needsRecreation,
            hasNeedsRecreationMethod: typeof chartManager.needsRecreation === 'function',
            hasApplyChartSettings: typeof chartManager.applyChartSettings === 'function',
            hasApplyChartOverrides: typeof chartManager.applyChartOverrides === 'function',
          });

          if (needsRecreation) {
            console.log('[useChartTheme] 🔄 RECREATING CHART - Features change detected');
            await chartManager.applyChartSettings(newSettings);
          } else {
            // overrides만 적용하는 경우 (모든 설정 포함)
            console.log('[useChartTheme] ⚡ APPLYING OVERRIDES - No recreation needed');
            if (typeof chartManager.applyChartOverrides === 'function') {
              // ChartManager의 convertSettingsToOverrides를 통해 모든 설정 적용
              if (typeof chartManager.convertSettingsToOverrides === 'function') {
                const allOverrides = chartManager.convertSettingsToOverrides(newSettings);
                chartManager.applyChartOverrides(allOverrides);
              } else {
                // fallback: 테마만 적용
                const { generateThemeOverrides, getThemeFromSettings } = await import(
                  '@/utils/chart/ChartTheme'
                );
                const theme = getThemeFromSettings(newSettings);
                const themeOverrides = generateThemeOverrides(theme);
                chartManager.applyChartOverrides(themeOverrides);
              }
            }
          }
        }
      } catch (error) {
        console.error('[useChartTheme] Failed to apply settings to chart:', error);
      }
    });

    await Promise.all(promises);

    // 로컬 스토리지에 저장
    localStorage.setItem('global-chart-settings', JSON.stringify(newSettings));
    console.log('[useChartTheme] === GLOBAL SETTINGS UPDATE COMPLETED ===');
  };

  /**
   * 테마만 변경 (빠른 적용)
   */
  const changeTheme = async (theme: 'greenRed' | 'redBlue') => {
    const newSettings = { ...globalChartSettings };
    newSettings.basic.theme = theme;
    await updateGlobalSettings(newSettings);
  };

  /**
   * 로컬 스토리지에서 설정 로드
   */
  const loadSettingsFromStorage = () => {
    try {
      const saved = localStorage.getItem('global-chart-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(globalChartSettings, parsed);
        console.log(
          '[useChartTheme] Settings loaded from storage:',
          globalChartSettings.basic.theme
        );
      }
    } catch (error) {
      console.error('[useChartTheme] Failed to load settings from storage:', error);
    }
  };

  /**
   * 현재 테마 색상 가져오기
   */
  const getCurrentThemeColors = () => {
    return CHART_THEME_COLORS[globalChartSettings.basic.theme];
  };

  // 초기화 시 설정 로드
  loadSettingsFromStorage();

  return {
    globalChartSettings: readonly(globalChartSettings),
    registerChartManager,
    unregisterChartManager,
    getGlobalSettings,
    updateGlobalSettings,
    changeTheme,
    loadSettingsFromStorage,
    getCurrentThemeColors,
  };
}

// 싱글톤 인스턴스
let chartThemeInstance: ReturnType<typeof useChartTheme> | null = null;

/**
 * 싱글톤 차트 테마 인스턴스 가져오기
 */
export function getChartThemeInstance() {
  if (!chartThemeInstance) {
    chartThemeInstance = useChartTheme();
  }
  return chartThemeInstance;
}
