/**
 * Chart Widget API를 래핑하는 유틸리티 클래스
 * TradingView Chart Widget의 복잡한 API를 단순화하고 관리합니다.
 */

import {
  needsFeaturesRecreation,
  getSymbolOverrideKeys,
  generateAllOverrides,
} from '@/utils/chart/TradingViewFeatures';
import {
  getThemeFromSettings,
  getThemeColors,
  generateThemeOverrides,
} from '@/utils/chart/ChartTheme';
import type { ChartConfig, ChartSymbolInfo, ChartSettings } from '@template/types';
import { buildWidgetConfig } from '@/utils/chart/ChartConfigBuilder';
import { generateChartManagerId } from '@/utils/chart/ChartUtils';
import type { TradingViewWidget } from '@/types/tradingview';
import { setupChart } from '@/utils/chart/ChartSetupUtils';

export class ChartManager {
  private widget: TradingViewWidget | null = null;
  private currentSymbol: string = '';
  private currentInterval: string = '1';
  private currentSubscriberUID: string | null = null;
  private isInitialized: boolean = false;
  private currentSettings: ChartSettings | null = null;
  private instanceId: string = '';
  // private containerId: string = '';
  // private lastConfig: ChartConfig | null = null;

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
    this.currentSettings = config.settings || null;

    return new Promise(async (resolve, reject) => {
      try {
        await this.loadTradingViewOnDemand();

        // 위젯 설정 생성
        const widgetConfig = buildWidgetConfig(config);

        this.widget = new window.TradingView.widget(widgetConfig);

        this.widget?.onChartReady(() => {
          this.isInitialized = true;
          setupChart(this.widget);

          // 차트 로드 완료 후 추가 설정 적용
          this.applyPostLoadSettings();

          resolve();
        });
      } catch (error) {
        console.error('[ChartManager] Failed to initialize chart:', error);
        reject(error);
      }
    });
  }

  /**
   * TradingView 라이브러리 동적 로드
   */
  private async loadTradingViewOnDemand(): Promise<void> {
    if (window.TradingView && window.TradingView.widget) {
      return;
    }

    // TradingView 메인 라이브러리 로드
    // 커스텀 Datafeed를 사용하므로 UDF 번들은 불필요
    await this.loadScript('/charting_library/charting_library.standalone.js');
  }

  /**
   * 스크립트 동적 로드 헬퍼
   */
  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * 심볼 변경
   */
  changeSymbol(symbol: string): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Changing symbol from', this.currentSymbol, 'to', symbol);

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
      console.error('[ChartManager] Symbol change failed');
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
      console.error('[ChartManager] Interval change failed');
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
        chart.refresh();
      }
    } catch (error) {
      console.error('[ChartManager] Chart refresh failed');
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
      console.error('[ChartManager] Volume indicator remove failed');
    }
  }

  /**
   * 테스트용 지표 추가
   */
  addTestIndicators(): void {
    if (!this.isInitialized || !this.widget) {
      console.warn('[ChartManager] Cannot add test indicators: chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.createStudy !== 'function') {
        console.warn('[ChartManager] Chart createStudy method not available');
        return;
      }

      const theme = this.currentSettings ? getThemeFromSettings(this.currentSettings) : 'redBlue';
      const themeColors = getThemeColors(theme);

      const studyOverrides = {
        'volume.color.0': themeColors.up,
        'volume.color.1': themeColors.down,
        'volume.transparency': 50,
      };

      chart.createStudy('Volume', false, false, {}, null, studyOverrides);
      console.log('[ChartManager] Test indicators added successfully');
    } catch (error) {
      console.warn('[ChartManager] Failed to add test indicators:', error);
    }
  }

  /**
   * 테스트용 지표 제거
   */
  removeAllIndicators(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Cannot remove indicators: chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.getAllStudies !== 'function') {
        console.warn('[ChartManager] Chart getAllStudies method not available');
        return;
      }

      const studies = chart.getAllStudies();
      const volumeStudy = studies.find((s: any) => s.name === 'Volume');

      if (volumeStudy && typeof chart.removeEntity === 'function') {
        chart.removeEntity(volumeStudy.id);
        console.log('[ChartManager] Test indicators removed successfully');
      }
    } catch (error) {
      console.warn('[ChartManager] Failed to remove test indicators:', error);
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

        chart.applyOverrides(overrides);
      } else {
        console.warn('[ChartManager] Chart applyOverrides method not available');
      }
    } catch (error) {
      console.error('[ChartManager] Failed to apply chart overrides');
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

    this.currentSettings = settings;

    try {
      // 차트 오버라이드 적용
      const overrides = generateAllOverrides(settings);
      const theme = getThemeFromSettings(settings);
      const themeOverrides = generateThemeOverrides(theme);
      const allOverrides = { ...overrides, ...themeOverrides };

      this.applyChartOverrides(allOverrides);

      // 차트 새로고침으로 테마 변경 적용
      setTimeout(() => {
        this.refreshChart();
      }, 100);
    } catch (error) {
      console.error('[ChartManager] Error applying chart settings');
    }
  }

  /**
   * 현재 설정 가져오기
   */
  getCurrentSettings(): ChartSettings | null {
    // 깊은 복사로 독립된 객체 반환 (참조 문제 방지)
    return this.currentSettings ? JSON.parse(JSON.stringify(this.currentSettings)) : null;
  }

  /**
   * 설정 변경으로 인한 차트 재생성이 필요한지 확인
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
   * 설정을 TradingView overrides로 변환
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
   * 차트 로드 완료 후에만 적용 가능한 설정들
   * 차트 위젯이 완전히 초기화된 후 실행되는 설정
   *
   * 현재는 테스트용 지표 추가만 구현
   * TODO: 추후 다음 설정들의 필요에 따라 구현
   *  - 크로스헤어 설정
   *  - 저장된 레이아웃 복원
   *  - 사용자 정의 지표 추가
   *  - 드로잉 도구 설정
   */
  private applyPostLoadSettings(): void {
    // 테스트용 볼륨 지표 추가
    // TODO: 지표 테스트 시 주석 해제
    // this.addTestIndicators();
    // TODO: 차트 설정(this.currentSettings)을 사용한 추가 설정 적용
    // if (this.currentSettings) {
    //   // 저장된 지표 복원
    //   // 드로잉 도구 복원
    //   // 사용자 정의 설정 적용
    // }
    /**
     * TODO: 크로스헤어 설정 업데이트 로직 구현
     */
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
        console.error('[ChartManager] Chart destroy failed');
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
