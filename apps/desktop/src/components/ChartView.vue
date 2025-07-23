<template>
  <div id="tv_chart_container" style="width: 1000px; height: 600px"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import Datafeed from '../chart/datafeed.js';
import { BrokerMinimal } from '../chart/broker';

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
    window.tvWidget = new window.TradingView.widget({
      symbol: 'BTC/EUR',
      interval: '1D',
      fullscreen: false,
      container: 'tv_chart_container',
      datafeed: Datafeed,
      library_path: '/charting_library/',
      width: 1000,
      height: 700,
      locale: 'ko',
      debug: false,
      enabled_features: [
        'study_templates',
        'side_toolbar_in_fullscreen_mode',
        'header_compare',
        'compare_symbol',
      ],
      disabled_features: [
        'use_localstorage_for_settings',
        'volume_force_overlay',
        'create_volume_indicator_by_default',
      ],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      // 가격 스케일 및 차트 스타일 설정
      overrides: {
        'paneProperties.background': '#ffffff',
        'paneProperties.vertGridProperties.color': '#e6e6e6',
        'paneProperties.horzGridProperties.color': '#e6e6e6',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#191919',
        'scalesProperties.lineColor': '#b8b8b8',
        // 가격 스케일 표시 강제
        'scalesProperties.showSeriesLastValue': true,
        'scalesProperties.showStudyLastValue': true,
        'scalesProperties.fontSize': 12,
      },
      studies_overrides: {},
      // 차트 스타일
      theme: 'light',
      custom_css_url: '',
      loading_screen: { backgroundColor: '#ffffff' },
      broker_factory: function (host: any) {
        return new BrokerMinimal(host, Datafeed);
      },
    });

    // 차트 로드 완료 후 가격 스케일 설정 확인
    window.tvWidget.onChartReady(() => {
      console.log('[TradingView] 차트 로드 완료');

      // 가격 스케일 표시 강제 설정
      const chart = window.tvWidget.chart();
      const priceScale = chart.getPanes()[0].getRightPriceScale();

      if (priceScale) {
        console.log('[TradingView] 가격 스케일 설정 적용');
        priceScale.setAutoScale(true);
        priceScale.setVisible(true);
      }

      // 심볼 정보 확인
      const symbolInfo = chart.symbolExt();
      console.log('[TradingView] 현재 심볼 정보:', symbolInfo);

      // 차트 스타일 강제 새로고침
      setTimeout(() => {
        console.log('[TradingView] 차트 새로고침 실행');
        chart.refresh();
      }, 1000);
    });
  });
});
</script>
