/**
 * Chart Widget API를 래핑하는 유틸리티 클래스
 * TradingView Chart Widget의 복잡한 API를 단순화하고 관리합니다.
 */

import type { TradingViewWidgetConfig, TradingViewWidget } from '@/types/tradingview';
import type { ChartConfig, ChartSymbolInfo } from './ChartConfig';
import Datafeed from '@/adapters/tradingview/datafeed.js';

export class ChartManager {
  private widget: TradingViewWidget | null = null;
  private currentSymbol: string = '';
  private currentInterval: string = '1';
  private currentSubscriberUID: string | null = null;
  private isInitialized: boolean = false;

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

    return new Promise((resolve, reject) => {
      this.waitForTradingView(() => {
        try {
          const widgetConfig: TradingViewWidgetConfig = {
            symbol: config.symbol,
            interval: config.interval,
            fullscreen: false,
            container: config.container,
            datafeed: Datafeed,
            library_path: '/charting_library/',
            width: config.width || '100%',
            height: config.height || '100%',
            locale: config.locale || 'ko',
            debug: config.debug || false,
            enabled_features: [
              'study_templates',
              'side_toolbar_in_fullscreen_mode',
              'header_compare',
              'compare_symbol',
              'show_spread_operators',
              'hide_price_scale_if_all_sources_hidden',
            ],
            disabled_features: [
              'use_localstorage_for_settings',
              'volume_force_overlay',
              'create_volume_indicator_by_default',
              'left_toolbar', // 왼쪽 도구모음 숨기기
              'header_widget', // 헤더 위젯 숨기기
              'right_toolbar', // 우측 도구모음 숨기기
              'main_series_scale_menu', // 오른쪽하단 설정버튼 숨기기
              'legend_inplace_edit', // 범례 수정 안보이게 (Symbol Search Dialog 숨기기)
            ],
            // 차트 스타일 오버라이드
            overrides: {
              // 'mainSeriesProperties.style': 2, // 2 = 라인 차트
              // 'scalesProperties.showRightScale': false, // 오른쪽 가격 스케일 숨기기
              // 'mainSeriesProperties.showPriceLine': false, // 가격 라인 숨기기
              'paneProperties.gridLinesMode': 'none', // 그리드 라인 숨기기
              'paneProperties.background': '#ffffff',
              'paneProperties.vertGridProperties.color': '#e6e6e6',
              'paneProperties.horzGridProperties.color': '#e6e6e6',
              'symbolWatermarkProperties.transparency': 90,
              'scalesProperties.textColor': '#191919',
              'scalesProperties.lineColor': '#b8b8b8',
              // 가격 스케일 표시 강제
              // 'scalesProperties.showSeriesLastValue': true,
              // 'scalesProperties.showStudyLastValue': true,
              // 'scalesProperties.fontSize': 12,
              // 시간 축 표시 형식 설정
              // 'timeScale.timeVisible': true,
              // 'timeScale.secondsVisible': false,
              // 'timeScale.rightOffset': 12,
              // 'timeScale.barSpacing': 3,
              // 'timeScale.fixLeftEdge': true,
              // 'timeScale.fixRightEdge': true,
              // 'timeScale.lockVisibleTimeRangeOnResize': true,
              // 'timeScale.rightBarStaysOnScroll': true,
              // 'timeScale.borderVisible': true,
              // 'timeScale.visible': true,
              // 'timeScale.tickMarkFormatter': {
              //   '1': '%H:%M', // 1분: 시:분
              //   '5': '%H:%M', // 5분: 시:분
              //   '15': '%H:%M', // 15분: 시:분
              //   '30': '%H:%M', // 30분: 시:분
              //   '60': '%m-%d %H:%M', // 1시간: 월-일 시:분
              //   '240': '%m-%d %H:%M', // 4시간: 월-일 시:분
              //   '1D': '%Y-%m-%d', // 1일: 년-월-일
              //   '1W': '%Y-%m-%d', // 1주: 년-월-일
              //   '1M': '%Y-%m', // 1개월: 년-월
              // },
            },
            studies_overrides: {},
            // charts_storage_url: 'https://saveload.tradingview.com',
            // charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            theme: config.theme || 'light',
            custom_css_url: '',
            loading_screen: { backgroundColor: '#ffffff' },
          };

          this.widget = new window.TradingView.widget(widgetConfig);

          this.widget?.onChartReady(() => {
            console.log('[ChartManager] Chart loaded successfully');
            this.isInitialized = true;
            this.setupChart();
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
    if (!this.widget) return;

    setTimeout(() => {
      try {
        const chart = this.widget!.chart();
        if (!chart) return;

        // 가격 스케일 설정
        this.setupPriceScale(chart);

        // 시간 축 설정
        this.setupTimeScale(chart);

        // 차트 새로고침
        this.refreshChart();
      } catch (error) {
        console.error('[ChartManager] Chart setup error:', error);
      }
    }, 1000);
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
   * 차트 정리 및 해제
   */
  destroy(): void {
    if (this.currentSymbol && this.currentSubscriberUID) {
      this.unsubscribeSymbol(this.currentSymbol);
    }

    if (this.widget) {
      try {
        this.widget.chart().remove();
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

// 싱글톤 인스턴스
export const chartManager = new ChartManager();
