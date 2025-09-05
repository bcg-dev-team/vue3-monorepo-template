<template>
  <div id="tv_chart_container" class="chart-wrapper"></div>
</template>

<script setup lang="ts">
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시

import Datafeed from '@/adapters/tradingview/datafeed.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  symbol?: string;
  interval?: string;
}

interface Emits {
  (e: 'chart-ready'): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  symbol: 'ETH/EUR', // datafeed.js의 getAllSymbols()와 일치하도록 수정
  interval: '1', // 1분 간격으로 변경 (지원되는 시간 간격 중 하나)
});

const tvWidget = ref<any>(null);
const currentSymbol = ref<string>(props.symbol);
const currentSubscriberUID = ref<string | null>(null);

// 심볼 변경 감지 및 즉시 구독 해제
watch(
  () => props.symbol,
  (newSymbol, oldSymbol) => {
    console.log('[TradingView] 심볼 변경 감지:', { oldSymbol, newSymbol });

    // 이전 심볼의 구독 즉시 해제
    if (oldSymbol) {
      console.log('[TradingView] 이전 심볼 구독 해제:', oldSymbol);
      // streaming.js의 심볼별 구독 해제 함수 호출
      if ((window as any).unsubscribeSymbol) {
        (window as any).unsubscribeSymbol(oldSymbol);
      }
      currentSubscriberUID.value = null;
    }

    currentSymbol.value = newSymbol;
  }
);

// 간격 변경 감지
watch(
  () => props.interval,
  (newInterval) => {
    if (tvWidget.value && tvWidget.value.chart) {
      const chart = tvWidget.value.chart();
      if (chart && typeof chart.timeScale === 'function') {
        const timeScale = chart.timeScale();
        if (timeScale) {
          console.log('[TradingView] 간격 변경 감지:', newInterval);
          timeScale.refresh();
        }
      }
    }
  }
);

onMounted(() => {
  function waitForTradingView(cb: () => void) {
    if (window.TradingView && window.TradingView.widget) {
      cb();
    } else {
      setTimeout(() => waitForTradingView(cb), 100);
    }
  }

  waitForTradingView(() => {
    // TradingView 차트 설정
    tvWidget.value = new window.TradingView.widget({
      symbol: props.symbol,
      interval: props.interval,
      fullscreen: false,
      container: 'tv_chart_container',
      datafeed: Datafeed,
      library_path: '/charting_library/',
      width: '100%',
      height: '100%',
      locale: 'ko',
      debug: false,
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
        // 'header_symbol_search', // 헤더 위젯 숨기기
        // 'header_settings', // 헤더 위젯 숨기기
        // 'header_quick_search', // 헤더 위젯 숨기기

        'right_toolbar', // 우측 도구모음 숨기기

        'main_series_scale_menu', // 오른쪽하단 설정버튼 숨기기
        'legend_inplace_edit', // 범례 수정 안보이게 (Symbol Search Dialog 숨기기)
      ],
      // charts_storage_url: 'https://saveload.tradingview.com',
      // charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      // 가격 스케일 및 차트 스타일 설정
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
      // 차트 스타일
      theme: 'light',
      custom_css_url: '',
      loading_screen: { backgroundColor: '#ffffff' },
    });

    // 차트 로드 완료 후 가격 스케일 설정 확인
    tvWidget.value.onChartReady(() => {
      console.log('[TradingView] 차트 로드 완료 - 심볼:', props.symbol);

      // chart-ready 이벤트 발생
      emit('chart-ready');

      // 차트가 완전히 로드될 때까지 잠시 대기
      setTimeout(() => {
        try {
          const chart = tvWidget.value.chart();

          // 차트와 패널이 존재하는지 확인
          if (chart && chart.getPanes && chart.getPanes().length > 0) {
            const panes = chart.getPanes();
            const firstPane = panes[0];

            // getRightPriceScale 메서드가 존재하는지 확인
            if (firstPane && typeof firstPane.getRightPriceScale === 'function') {
              const priceScale = firstPane.getRightPriceScale();

              if (priceScale) {
                console.log('[TradingView] 가격 스케일 설정 적용');
                priceScale.setAutoScale(true);
                priceScale.setVisible(true);
              } else {
                console.warn('[TradingView] 가격 스케일을 찾을 수 없습니다.');
              }
            } else {
              console.warn('[TradingView] getRightPriceScale 메서드를 사용할 수 없습니다.');
            }
          } else {
            console.warn('[TradingView] 차트 패널을 찾을 수 없습니다.');
          }

          // 심볼 정보 확인
          if (chart && typeof chart.symbolExt === 'function') {
            const symbolInfo = chart.symbolExt();
            console.log('[TradingView] 현재 심볼 정보:', symbolInfo);
          }

          // 시간 축 설정 강제 적용
          if (chart && typeof chart.timeScale === 'function') {
            const timeScale = chart.timeScale();
            if (timeScale) {
              console.log('[TradingView] 시간 축 설정 적용');
              timeScale.setVisible(true);
              timeScale.setTimeVisible(true);
              timeScale.setSecondsVisible(false);

              // 현재 간격에 따른 시간 표시 형식 설정
              const currentInterval = props.interval;
              console.log('[TradingView] 현재 간격:', currentInterval);

              // 시간 축 새로고침
              timeScale.refresh();
            }
          }

          // 차트 스타일 강제 새로고침
          if (chart && typeof chart.refresh === 'function') {
            console.log('[TradingView] 차트 새로고침 실행');
            chart.refresh();
          }
        } catch (error) {
          console.error('[TradingView] 차트 설정 중 오류 발생:', error);
        }
      }, 1000); // 1초 대기
    });
  });
});

// 차트 마크업 테이블 숨기기 (타입 안전하게 수정)
const rightScale = document.querySelector('.chart-markup-table') as HTMLElement;
if (rightScale) {
  rightScale.style.display = 'none';
}

// 차트 크기 조정을 위한 리사이즈 핸들러
const handleResize = () => {
  if (tvWidget.value && tvWidget.value.chart) {
    const chart = tvWidget.value.chart();
    if (chart && typeof chart.resize === 'function') {
      chart.resize();
    }
  }
};

// 윈도우 리사이즈 이벤트 리스너 추가
window.addEventListener('resize', handleResize);

// 차트 심볼 변경 메서드 (TradingView 위젯의 setSymbol을 래핑)
const changeChartSymbol = (symbol: string) => {
  if (tvWidget.value && typeof tvWidget.value.setSymbol === 'function') {
    try {
      console.log('[TradingView] 차트 심볼 변경:', symbol);
      tvWidget.value.setSymbol(symbol, props.interval);
      currentSymbol.value = symbol;
    } catch (error) {
      console.error('[TradingView] 차트 심볼 변경 중 오류 발생:', error);
    }
  } else {
    console.warn('[TradingView] 차트 심볼 변경 메서드를 사용할 수 없습니다.');
  }
};

// 컴포넌트 메서드 노출
defineExpose({
  changeChartSymbol,
});

// 컴포넌트 언마운트 시 이벤트 리스너 정리
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.chart-page canvas[style*='left: 0px'][style*='z-index: 2'] {
  display: none !important;
}
</style>
