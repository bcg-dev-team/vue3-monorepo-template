/**
 * Chart Widget API를 래핑하는 유틸리티 클래스
 * TradingView Chart Widget의 복잡한 API를 단순화하고 관리합니다.
 */

import {
  generateTradingViewFeatures,
  generateAllOverrides,
  needsFeaturesRecreation,
  getSymbolOverrideKeys,
  logFeaturesConfiguration,
  logOverridesConfiguration,
} from '@/utils/chart/TradingViewFeatures';
import {
  generateThemeOverrides,
  getThemeFromSettings,
  getThemeColors,
} from '@/utils/chart/ChartTheme';
import type { TradingViewWidgetConfig, TradingViewWidget } from '@/types/tradingview';
import type { ChartConfig, ChartSymbolInfo, ChartSettings } from '@template/types';
import { generateChartManagerId } from '@/utils/chart/ChartUtils';

import Datafeed from '@/adapters/tradingview/datafeed.js';

export class ChartManager {
  private widget: TradingViewWidget | null = null;
  private currentSymbol: string = '';
  private currentInterval: string = '1';
  private currentSubscriberUID: string | null = null;
  private isInitialized: boolean = false;
  private containerId: string = '';
  private lastConfig: ChartConfig | null = null;
  private currentSettings: ChartSettings | null = null;
  private instanceId: string = '';

  constructor() {
    // 각 인스턴스마다 고유 ID 생성
    this.instanceId = generateChartManagerId();
    console.log(`[ChartManager] 새 인스턴스 생성: ${this.instanceId}`);
  }

  /**
   * Chart Widget 초기화
   */
  async initializeChart(config: ChartConfig): Promise<void> {
    if (this.isInitialized) {
      console.warn('[ChartManager] Chart is already initialized');
      return;
    }

    this.currentSymbol = config.symbol;
    this.currentInterval = config.interval;
    this.containerId = config.container;
    this.lastConfig = { ...config };
    this.currentSettings = config.settings || null;

    return new Promise((resolve, reject) => {
      this.waitForTradingView(() => {
        try {
          // 설정에 따른 features와 overrides 생성
          const features = config.settings
            ? generateTradingViewFeatures(config.settings)
            : generateTradingViewFeatures({
                basic: {
                  theme: 'redBlue',
                  precision: 'default',
                  timezone: 'Asia/Seoul',
                  locale: 'ko',
                },
                symbols: {
                  showSymbolName: true,
                  showChartValues: true,
                  showBarChangeValues: true,
                  showIndicatorNames: false,
                  showIndicatorValues: false,
                  showIndicatorArguments: false,
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

          let overrides = config.settings ? generateAllOverrides(config.settings) : {};

          // 테마 설정 추가
          if (config.settings) {
            const theme = getThemeFromSettings(config.settings);
            const themeOverrides = generateThemeOverrides(theme);
            overrides = { ...overrides, ...themeOverrides };

            console.log('[ChartManager] Applying chart settings:', config.settings);
            logOverridesConfiguration(overrides);
          }

          // 타임존 설정 적용
          let timezone = 'Asia/Seoul'; // 기본값
          if (config.settings?.basic.timezone) {
            timezone = config.settings.basic.timezone;
          }

          // locale 설정
          let locale = config.settings?.basic.locale || config.locale || 'ko';

          console.log('[ChartManager] Widget config settings:', {
            timezone,
            locale,
            precision: config.settings?.basic.precision,
            symbolSettings: config.settings?.symbols,
          });

          // Features 및 Overrides 로깅
          logFeaturesConfiguration(features);

          // 초기 설정을 위한 studies_overrides 준비
          const studiesOverrides = {};

          const widgetConfig: TradingViewWidgetConfig = {
            symbol: config.symbol,
            interval: config.interval,
            fullscreen: false,
            container: config.container,
            datafeed: Datafeed,
            library_path: '/charting_library/',
            width: config.width || '100%',
            height: config.height || '100%',
            locale: locale,
            debug: config.debug || false,
            enabled_features: features.enabledFeatures,
            disabled_features: features.disabledFeatures,
            overrides: overrides,
            studies_overrides: studiesOverrides,
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            // theme: 'light' - TradingView 위젯 기본 테마는 overrides로 제어
            custom_css_url: '',
            loading_screen: { backgroundColor: '#ffffff' },
            timezone: timezone, // 타임존 설정 적용
            // 추가 시간 관련 설정
            time_frames: [], // 필요시 커스텀 시간대 설정
          };

          this.widget = new window.TradingView.widget(widgetConfig);

          this.widget?.onChartReady(() => {
            console.log('[ChartManager] Chart loaded successfully');
            this.isInitialized = true;
            this.setupChart();

            // 차트 로드 완료 후 추가 설정 적용 (초기화 시점에 적용할 수 없는 설정들만)
            if (config.settings) {
              this.applyPostLoadSettings(config.settings);
            }

            resolve();
          });
        } catch (error) {
          console.error('[ChartManager] Failed to initialize chart:', error);
          reject(error);
        }
      });
    });
  }

  /**
   * TradingView 라이브러리 로드 대기
   */
  private waitForTradingView(callback: () => void): void {
    if (window.TradingView && window.TradingView.widget) {
      callback();
    } else {
      setTimeout(() => this.waitForTradingView(callback), 100);
    }
  }

  /**
   * 차트 설정 및 초기화
   */
  private setupChart(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Widget is not initialized');
      return;
    }

    // 더 안전한 차트 초기화를 위해 재귀적으로 시도
    const attemptSetup = (attempts: number = 0): void => {
      if (attempts > 10) {
        console.error('[ChartManager] Failed to setup chart after 10 attempts');
        return;
      }

      try {
        // 위젯이 존재하고 chart 메서드가 사용 가능한지 확인
        if (!this.widget || typeof this.widget.chart !== 'function') {
          console.warn(`[ChartManager] Chart method not ready, attempt ${attempts + 1}`);
          setTimeout(() => attemptSetup(attempts + 1), 500);
          return;
        }

        const chart = this.widget.chart();
        if (!chart) {
          console.warn(`[ChartManager] Chart instance not ready, attempt ${attempts + 1}`);
          setTimeout(() => attemptSetup(attempts + 1), 500);
          return;
        }

        console.log('[ChartManager] Chart setup successful');

        // 가격 스케일 설정
        this.setupPriceScale(chart);

        // 시간 축 설정
        this.setupTimeScale(chart);

        // 차트 새로고침
        this.refreshChart();
      } catch (error) {
        console.error(`[ChartManager] Chart setup error (attempt ${attempts + 1}):`, error);
        if (attempts < 10) {
          setTimeout(() => attemptSetup(attempts + 1), 500);
        }
      }
    };

    // 초기 설정 시도
    setTimeout(() => attemptSetup(), 1000);
  }

  /**
   * 가격 스케일 설정
   */
  private setupPriceScale(chart: any): void {
    try {
      if (chart.getPanes && chart.getPanes().length > 0) {
        const panes = chart.getPanes();
        const firstPane = panes[0];

        if (firstPane && typeof firstPane.getRightPriceScale === 'function') {
          const priceScale = firstPane.getRightPriceScale();
          if (priceScale) {
            console.log('[ChartManager] Setting up price scale');
            priceScale.setAutoScale(true);
            priceScale.setVisible(true);
          }
        }
      }
    } catch (error) {
      console.error('[ChartManager] Price scale setup error:', error);
    }
  }

  /**
   * 시간 축 설정
   */
  private setupTimeScale(chart: any): void {
    try {
      if (chart.timeScale) {
        const timeScale = chart.timeScale();
        if (timeScale) {
          console.log('[ChartManager] Setting up time scale');
          timeScale.setVisible(true);
          timeScale.setTimeVisible(true);
          timeScale.setSecondsVisible(false);
          timeScale.refresh();
        }
      }
    } catch (error) {
      console.error('[ChartManager] Time scale setup error:', error);
    }
  }

  /**
   * 심볼 변경
   */
  changeSymbol(symbol: string): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Changing symbol:', { from: this.currentSymbol, to: symbol });

    // 이전 심볼 구독 해제
    if (this.currentSymbol && this.currentSubscriberUID) {
      this.unsubscribeSymbol(this.currentSymbol);
    }

    this.currentSymbol = symbol;

    try {
      // 차트 심볼 변경
      this.widget.setSymbol(symbol, this.currentInterval);

      // 차트 새로고침으로 히스토리 데이터 재로드
      setTimeout(() => {
        this.refreshChart();
      }, 500);
    } catch (error) {
      console.error('[ChartManager] Symbol change error:', error);
    }
  }

  /**
   * 간격 변경
   */
  changeInterval(interval: string): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Changing interval:', { from: this.currentInterval, to: interval });

    this.currentInterval = interval;

    try {
      if (typeof this.widget.chart !== 'function') {
        console.warn('[ChartManager] Chart method not available');
        return;
      }

      const chart = this.widget.chart();
      if (chart && chart.timeScale) {
        const timeScale = chart.timeScale();
        if (timeScale) {
          timeScale.refresh();
        }
      }
    } catch (error) {
      console.error('[ChartManager] Interval change error:', error);
    }
  }

  /**
   * 차트 새로고침
   */
  refreshChart(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    try {
      if (typeof this.widget.chart !== 'function') {
        console.warn('[ChartManager] Chart method not available');
        return;
      }

      const chart = this.widget.chart();
      if (chart && typeof chart.refresh === 'function') {
        console.log('[ChartManager] Refreshing chart');
        chart.refresh();
      }
    } catch (error) {
      console.error('[ChartManager] Chart refresh error:', error);
    }
  }

  /**
   * 볼륨 지표 제거
   */
  removeVolumeIndicator(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.getAllStudies !== 'function') {
        console.warn('[ChartManager] Chart getAllStudies method not available');
        return;
      }

      // 볼륨 지표 제거
      const studies = chart.getAllStudies();
      const volumeStudy = studies.find((s: any) => s.name === 'Volume');

      if (volumeStudy && typeof chart.removeEntity === 'function') {
        chart.removeEntity(volumeStudy.id);
        console.log('[ChartManager] Volume indicator removed');
      }
    } catch (error) {
      console.error('[ChartManager] Volume indicator remove error:', error);
    }
  }

  /**
   * 테스트용 볼륨 지표 추가
   * 차트가 완전히 로드된 후에 호출되므로 setTimeout 없이 안전하게 실행됩니다.
   */
  addTestIndicators(): void {
    console.log(`[ChartManager:${this.instanceId}] 테스트 볼륨 지표 추가`);

    if (!this.isInitialized || !this.widget) {
      console.warn('[ChartManager] Chart not ready for indicators');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.createStudy !== 'function') {
        console.warn('[ChartManager] Chart createStudy method not available');
        return;
      }

      // 현재 설정에서 테마 색상 가져오기
      const theme = this.currentSettings ? getThemeFromSettings(this.currentSettings) : 'redBlue';
      const themeColors = getThemeColors(theme);

      const studyOverrides = {
        'volume.color.0': themeColors.up, // 상승 볼륨 색상 (테마 색상)
        'volume.color.1': themeColors.down, // 하락 볼륨 색상 (테마 색상)
        'volume.transparency': 50,
      };

      chart.createStudy('Volume', false, false, [], null, studyOverrides);

      console.log(`[ChartManager:${this.instanceId}] 테스트 볼륨 지표 추가 완료:`, {
        up: themeColors.up,
        down: themeColors.down,
      });
    } catch (error) {
      console.error('[ChartManager] Error adding test volume indicator:', error);
    }
  }

  /**
   * 볼륨 지표 제거 (테스트용)
   */
  removeAllIndicators(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.getAllStudies !== 'function') {
        console.warn('[ChartManager] Chart getAllStudies method not available');
        return;
      }

      // 볼륨 지표만 제거 (테스트용)
      const studies = chart.getAllStudies();
      const volumeStudy = studies.find((s: any) => s.name === 'Volume');

      if (volumeStudy && typeof chart.removeEntity === 'function') {
        chart.removeEntity(volumeStudy.id);
        console.log('[ChartManager] Volume indicator removed');
      }
    } catch (error) {
      console.error('[ChartManager] Volume indicator remove error:', error);
    }
  }

  /**
   * 차트 설정 적용 (overrides)
   */
  applyChartOverrides(overrides: Record<string, any>): void {
    if (!this.widget || !this.isInitialized) {
      console.warn('[ChartManager] Chart is not initialized');
      return;
    }

    try {
      if (typeof this.widget.chart !== 'function') {
        console.warn('[ChartManager] Chart method not available');
        return;
      }

      const chart = this.widget.chart();
      if (chart && typeof chart.applyOverrides === 'function') {
        // 심볼 관련 override 로깅
        const symbolKeys = getSymbolOverrideKeys(overrides);
        const symbolOverrides = symbolKeys.reduce((obj: any, key) => {
          obj[key] = overrides[key];
          return obj;
        }, {});

        console.log('[ChartManager] Applying overrides:', {
          totalKeys: Object.keys(overrides).length,
          symbolRelatedKeys: symbolKeys,
          symbolOverrides: symbolOverrides,
          timezone: overrides['timezone'],
          minTick: overrides['mainSeriesProperties.minTick'],
          upColor: overrides['mainSeriesProperties.upColor'],
        });

        chart.applyOverrides(overrides);
        console.log('[ChartManager] Chart overrides successfully applied');

        // override 적용 후 검증
        setTimeout(() => {
          console.log('[ChartManager] Verifying overrides were applied...');
        }, 500);

        // 일부 설정이 실제로 적용되었는지 검증 (가능한 경우)
        setTimeout(() => {
          try {
            if (overrides['timezone']) {
              console.log(
                '[ChartManager] Timezone override verification - applied:',
                overrides['timezone']
              );
            }
            if (overrides['mainSeriesProperties.minTick']) {
              console.log(
                '[ChartManager] MinTick override verification - applied:',
                overrides['mainSeriesProperties.minTick']
              );
            }
          } catch (error) {
            console.log('[ChartManager] Override verification failed (this is normal):', error);
          }
        }, 500);
      } else {
        console.warn('[ChartManager] Chart applyOverrides method not available');
      }
    } catch (error) {
      console.error('[ChartManager] Failed to apply chart overrides:', error);
    }
  }

  /**
   * 설정 기반 차트 업데이트
   */
  async applyChartSettings(settings: ChartSettings): Promise<void> {
    if (!this.widget || !this.isInitialized) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Applying new chart settings...');
    this.currentSettings = settings;

    try {
      // 차트 오버라이드 적용
      const overrides = generateAllOverrides(settings);
      const theme = getThemeFromSettings(settings);
      const themeOverrides = generateThemeOverrides(theme);
      const allOverrides = { ...overrides, ...themeOverrides };

      this.applyChartOverrides(allOverrides);

      // 차트 새로고침으로 테마 변경 완전 적용
      setTimeout(() => {
        this.refreshChart();
      }, 100);

      console.log('[ChartManager] Chart settings applied successfully');
    } catch (error) {
      console.error('[ChartManager] Error applying chart settings:', error);
    }
  }

  /**
   * 현재 설정 가져오기
   */
  getCurrentSettings(): ChartSettings | null {
    // 깊은 복사로 독립된 객체 반환 (참조 문제 방지)
    return this.currentSettings ? JSON.parse(JSON.stringify(this.currentSettings)) : null;
  }

  // 12시간 형식 관련 메서드 제거됨 - TradingView에서 제한적 지원

  /**
   * 설정 변경이 재생성을 필요로 하는지 확인
   */
  needsRecreation(newSettings: ChartSettings): boolean {
    if (!this.currentSettings) return true;

    const needsRecreation = needsFeaturesRecreation(this.currentSettings, newSettings);

    if (needsRecreation) {
      console.log('[ChartManager] Recreation needed due to trading feature changes:', {
        showBuySellButtons:
          this.currentSettings.trading.showBuySellButtons !==
          newSettings.trading.showBuySellButtons,
        showOrders: this.currentSettings.trading.showOrders !== newSettings.trading.showOrders,
      });
    } else {
      console.log('[ChartManager] Settings can be applied via overrides (no recreation needed)');
    }

    return needsRecreation;
  }

  /**
   * 설정을 TradingView overrides로 변환 (유틸리티 함수 사용)
   */
  public convertSettingsToOverrides(settings: ChartSettings): Record<string, any> {
    const basicOverrides = generateAllOverrides(settings);
    const theme = getThemeFromSettings(settings);
    const themeOverrides = generateThemeOverrides(theme);

    return { ...basicOverrides, ...themeOverrides };
  }

  /**
   * 심볼 구독
   */
  subscribeSymbol(symbol: string, callback: (data: any) => void): string {
    if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
      const subscriptionId = (window as any).mockWebSocketManager.subscribe(symbol, callback);
      this.currentSubscriberUID = subscriptionId;
      console.log('[ChartManager] Subscribed to symbol:', symbol, 'ID:', subscriptionId);
      return subscriptionId;
    }
    return '';
  }

  /**
   * 심볼 구독 해제
   */
  unsubscribeSymbol(symbol: string): void {
    if (typeof window !== 'undefined' && (window as any).unsubscribeSymbol) {
      (window as any).unsubscribeSymbol(symbol);
      this.currentSubscriberUID = null;
      console.log('[ChartManager] Unsubscribed from symbol:', symbol);
    }
  }

  /**
   * 현재 심볼 정보 가져오기
   */
  getCurrentSymbolInfo(): ChartSymbolInfo {
    return {
      symbol: this.currentSymbol,
      interval: this.currentInterval,
      lastUpdate: Date.now(),
    };
  }

  /**
   * 차트 위젯 인스턴스 가져오기
   */
  getWidget(): TradingViewWidget | null {
    return this.widget;
  }

  /**
   * 초기화 상태 확인
   */
  isChartReady(): boolean {
    return this.isInitialized && this.widget !== null;
  }

  /**
   * 차트 로드 후에만 적용할 수 있는 설정들
   * 테스트용 볼륨 지표 추가 및 기타 로드 후 설정을 처리합니다.
   */
  private applyPostLoadSettings(settings: ChartSettings): void {
    console.log('[ChartManager] Applying post-load settings');

    // 테스트용 볼륨 지표 추가
    this.addTestIndicators();

    // 기타 로드 후 설정들
    if (settings.scales?.showCrosshair !== undefined) {
      this.updateCrosshairSettings(settings.scales.showCrosshair);
    }
  }

  /**
   * 크로스헤어 설정 업데이트
   */
  private updateCrosshairSettings(showCrosshair: boolean): void {
    if (!this.widget || !this.isInitialized) return;

    try {
      const chart = this.widget.chart();
      if (chart) {
        chart.setVisibleRange({
          from: chart.timeScale().getVisibleRange()?.from,
          to: chart.timeScale().getVisibleRange()?.to,
        });
      }
    } catch (error) {
      console.error('[ChartManager] Error updating crosshair settings:', error);
    }
  }

  /**
   * 차트 정리 및 해제
   */
  destroy(): void {
    if (this.currentSymbol && this.currentSubscriberUID) {
      this.unsubscribeSymbol(this.currentSymbol);
    }

    if (this.widget) {
      try {
        if (typeof this.widget.chart === 'function') {
          const chart = this.widget.chart();
          if (chart && typeof chart.remove === 'function') {
            chart.remove();
          }
        }
      } catch (error) {
        console.error('[ChartManager] Chart destroy error:', error);
      }
    }

    this.widget = null;
    this.isInitialized = false;
    this.currentSymbol = '';
    this.currentInterval = '1';
    this.currentSubscriberUID = null;

    console.log('[ChartManager] Chart destroyed');
  }
}
