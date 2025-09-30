<template>
  <div class="chart-container">
    <!-- TradingView 차트 -->
    <div :id="containerId" class="chart-wrapper"></div>

    <!-- FIXME: 기획 검토를 위한 매수/매도 임시 구현. 기획 결정 시 수정 -->
    <div v-if="showTradingButtons" class="trading-overlay">
      <div class="trading-buttons">
        <button class="sell-button" @click="handleSell">
          <div class="price">{{ sellPrice }}</div>
          <div class="label">SELL</div>
        </button>
        <div class="spread">{{ spread }}</div>
        <button class="buy-button" @click="handleBuy">
          <div class="price">{{ buyPrice }}</div>
          <div class="label">BUY</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGlobalChartSettingsInstance } from '@/composables/useGlobalChartSettings';
import { ChartManager } from '@/services/managers/ui/ChartManager';
import { generateContainerId } from '@/utils/chart/ChartUtils';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import './TradingViewChart.scss';

interface Props {
  symbol?: string;
  chartId?: string;
}

interface Emits {
  (e: 'chart-ready'): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  symbol: 'EURTRY',
  chartId: '',
});

const isChartReady = ref<boolean>(false);

// 각 차트마다 별도의 ChartManager 인스턴스 생성
const chartManager = new ChartManager();

// 글로벌 차트 설정 인스턴스 가져오기
const globalChartSettings = getGlobalChartSettingsInstance();

// 매수/매도 버튼 표시 여부
// FIXME: 기획 검토를 위한 임시 구현. 기획 결정 시 수정
const showTradingButtons = computed(() => {
  const globalSettings = globalChartSettings.getGlobalChartSettings();
  // 차트 로딩 완료 후에 표시
  return isChartReady.value && globalSettings.trading.showBuySellButtons;
});

// FIXME: 실제 가격 데이터 연동
const sellPrice = ref('240.15');
const buyPrice = ref('240.43');
const spread = ref('0.28');

// 고유한 컨테이너 ID 생성
const containerId = computed(() => {
  return generateContainerId(props.chartId);
});

// 커스텀 트레이딩 핸들러
const handleSell = () => {
  console.log('[TradingView] Sell button clicked:', {
    symbol: props.symbol,
    price: sellPrice.value,
  });
  // TODO: 실제 매도 로직 구현
};

const handleBuy = () => {
  console.log('[TradingView] Buy button clicked:', {
    symbol: props.symbol,
    price: buyPrice.value,
  });
  // TODO: 실제 매수 로직 구현
};

onMounted(async () => {
  try {
    // 글로벌 설정 가져오기
    const globalSettings = globalChartSettings.getGlobalChartSettings();

    // ChartManager를 글로벌 설정에 등록
    globalChartSettings.registerChartManager(chartManager);

    // ChartManager를 사용하여 차트 초기화 및 글로벌 설정 적용
    await chartManager.initializeChart({
      symbol: props.symbol,
      interval: '1', // 고정값
      container: containerId.value,
      width: '100%',
      height: '100%',
      locale: 'ko',
      debug: false,
      settings: globalSettings, // 글로벌 설정 적용
    });

    isChartReady.value = true;
    emit('chart-ready');
    console.log(
      '[TradingView] Chart initialized with global settings for container:',
      containerId.value
    );
    console.log('[TradingView] Applied theme:', globalSettings.basic.theme);
  } catch (error) {
    console.error('[TradingView] Chart initialization failed:', error);
  }
});

onUnmounted(() => {
  // 글로벌 설정에서 차트 매니저 등록 해제
  globalChartSettings.unregisterChartManager(chartManager);

  chartManager.destroy();
  isChartReady.value = false;
  console.log('[TradingView] Chart destroyed');
});

// 외부에서 차트 심볼 변경을 위한 메서드 노출
defineExpose({
  changeChartSymbol: (symbol: string) => {
    if (isChartReady.value) {
      chartManager.changeSymbol(symbol);
    }
  },
  refreshChart: () => {
    if (isChartReady.value) {
      chartManager.refreshChart();
    }
  },
  isChartReady: () => isChartReady.value,
  // ChartManager 인스턴스 노출
  chartManager: chartManager,
});
</script>
