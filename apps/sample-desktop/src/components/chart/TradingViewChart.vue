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
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { generateContainerId } from '@/utils/chart/ChartUtils';

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

// 심볼 변경 감지
watch(
  () => props.symbol,
  (newSymbol) => {
    if (isChartReady.value) {
      console.log('[TradingView] Symbol changed:', newSymbol);
      chartManager.changeSymbol(newSymbol);
    }
  }
);

onMounted(async () => {
  try {
    // 글로벌 설정 가져오기
    const globalSettings = globalChartSettings.getGlobalChartSettings();

    // ChartManager를 글로벌 설정에 등록
    globalChartSettings.registerChartManager(chartManager);

    // ChartManager를 사용하여 차트 초기화 (글로벌 설정 포함)
    await chartManager.initializeChart({
      symbol: props.symbol,
      interval: '1', // 고정값
      container: containerId.value,
      width: '100%',
      height: '100%',
      // theme은 제거됨 - settings.basic.theme으로 캔들 색상 제어
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
  chartManager: chartManager, // ChartManager 인스턴스 노출
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 커스텀 트레이딩 오버레이 */
.trading-overlay {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none; /* 차트 상호작용 방해 방지 */
}

.trading-buttons {
  display: flex;
  align-items: center;
  gap: 6px; /* 간격 줄임 */
  margin-bottom: 6px; /* 간격 줄임 */
  pointer-events: auto; /* 버튼은 클릭 가능 */
  background: rgba(255, 255, 255, 0.7); /* 매우 연한 흰색 배경 */
  border-radius: 6px; /* 둥근 모서리 */
  padding: 4px 6px; /* 내부 여백 */
}

.sell-button {
  background: #f63338;
  color: white;
  border: none;
  border-radius: 3px; /* 둥글기 줄임 */
  padding: 6px 10px; /* 패딩 줄임 */
  font-size: 10px; /* 폰트 크기 줄임 */
  font-weight: 600;
  cursor: pointer;
  min-width: 50px; /* 최소 너비 줄임 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px; /* 간격 줄임 */
  transition: all 0.2s;
}

.sell-button:hover {
  background: #e02328;
  transform: translateY(-1px);
}

.buy-button {
  background: #0067ef;
  color: white;
  border: none;
  border-radius: 3px; /* 둥글기 줄임 */
  padding: 6px 10px; /* 패딩 줄임 */
  font-size: 10px; /* 폰트 크기 줄임 */
  font-weight: 600;
  cursor: pointer;
  min-width: 50px; /* 최소 너비 줄임 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px; /* 간격 줄임 */
  transition: all 0.2s;
}

.buy-button:hover {
  background: #0056d6;
  transform: translateY(-1px);
}

.spread {
  font-size: 9px; /* 폰트 크기 줄임 */
  color: #666;
  padding: 0 3px; /* 패딩 줄임 */
}

.volume-info {
  font-size: 9px; /* 폰트 크기 줄임 */
  color: #666;
  background: rgba(255, 255, 255, 0.9);
  padding: 3px 6px; /* 패딩 줄임 */
  border-radius: 3px; /* 둥글기 줄임 */
  pointer-events: auto;
}

.price {
  font-size: 11px; /* 폰트 크기 줄임 */
  font-weight: 700;
  color: white; /* 가격 텍스트 흰색 */
}

.label {
  font-size: 8px; /* 폰트 크기 줄임 */
  opacity: 0.9;
}

/* 컨테이너 스타일은 동적으로 생성된 ID에 적용됩니다 */
</style>
