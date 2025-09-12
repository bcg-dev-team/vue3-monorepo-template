<template>
  <div class="symbol-list">
    <!-- BaseTabs 컴포넌트 사용 -->
    <BaseTabs
      v-model="activeTab"
      :tabs="tabs"
      variant="underline"
      size="md"
      :underline="true"
      :has-background="false"
      aria-label="종목 목록 탭"
      fullwidth
    />

    <!-- 검색 입력창 (탭 외부에 위치) -->
    <div class="search-container">
      <BaseInput
        v-model="searchQuery"
        placeholder="종목명, 종목코드 검색"
        size="sm"
        @update:model-value="handleSearch"
      />
    </div>

    <!-- 종목 리스트 (탭 패널 외부에 위치) -->
    <div ref="symbolListRef" class="symbol-list-container">
      <div
        v-for="symbol in filteredSymbols"
        :key="symbol.ticker"
        :data-ticker="symbol.ticker"
        class="symbol-item"
        :class="{ selected: currentSelectedSymbol === symbol.ticker }"
        @click="selectSymbol(symbol)"
      >
        <div class="symbol-content">
          <div class="symbol-info">
            <div class="symbol-icon">
              <!-- FIXME: 실제 종목별 아이콘으로 교체 필요 -->
              <BaseIcon name="chart-line" size="sm" />
            </div>
            <div class="symbol-name">{{ symbol.ticker }}</div>
          </div>
          <div class="symbol-values">
            <div class="price-info">
              <div class="price">{{ getSymbolPrice(symbol.ticker) }}</div>
              <div class="change" :class="getChangeFromBaseClass(symbol.ticker)">
                {{ getSymbolChangeFromBase(symbol.ticker) }}%
              </div>
            </div>
            <div class="favorite-icon" @click.stop="toggleFavorite(symbol.ticker)">
              <!-- FIXME: 'fav' 아이콘 추가 후 변경 -->
              <BaseIcon
                name="heart-thin"
                size="sm"
                :color="
                  isFavorite(symbol.ticker)
                    ? 'var(--font-color-red)'
                    : 'var(--background-bg-surface-muted)'
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import { ref, computed, onMounted, onUnmounted, markRaw, watch, nextTick } from 'vue';
import { useMockRealtimeData } from '@/composables/useMockRealtimeData';
import { BaseTabs, BaseInput, BaseIcon } from '@template/ui';
import type { TradingSymbol } from '@/types/tradingview';
import type { SymbolPrice } from '@template/mocks';
import { getAllSymbols } from '@template/mocks';
import type { TabItem } from '@template/ui';

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 선택된 심볼의 시장 데이터 사용
const {
  selectedSymbol: currentSelectedSymbol,
  marketData,
  isConnected,
  addVisibleSymbols,
  removeVisibleSymbols,
  unsubscribeAll,
} = selectedSymbol;

// 상태 관리
const activeTab = ref('all');
const searchQuery = ref('');
const symbols = ref<TradingSymbol[]>(getAllSymbols());
const favorites = ref<Set<string>>(new Set());

// BaseTabs용 탭 데이터 (빈 컴포넌트로 설정)
const tabs: TabItem[] = [
  {
    key: 'all',
    label: '전체',
  },
  {
    key: 'favorite',
    label: '관심',
  },
  {
    key: 'holding',
    label: '보유',
  },
];

// 계산된 속성
const filteredSymbols = computed(() => {
  let filtered = symbols.value;

  // 탭별 필터링
  if (activeTab.value === 'favorite') {
    filtered = filtered.filter((symbol) => favorites.value.has(symbol.ticker));
  } else if (activeTab.value === 'holding') {
    // FIXME: 보유 종목 데이터 연동 필요
    // 현재는 암호화폐만 보유 종목으로 표시
    filtered = filtered.filter((symbol) => symbol.type === 'crypto');
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (symbol) =>
        symbol.ticker.toLowerCase().includes(query) ||
        symbol.description.toLowerCase().includes(query)
    );
  }

  return filtered;
});

// 메서드
const handleSearch = () => {
  // 검색 로직은 computed에서 처리됨
};

const selectSymbol = (symbol: TradingSymbol) => {
  // 전역 selectedSymbol 업데이트
  selectedSymbol.setSelectedSymbol(symbol.ticker);
  emit('symbol-select', symbol);
};

const toggleFavorite = (ticker: string) => {
  if (favorites.value.has(ticker)) {
    favorites.value.delete(ticker);
  } else {
    favorites.value.add(ticker);
  }
};

const isFavorite = (ticker: string) => {
  return favorites.value.has(ticker);
};

// 기준값(어제 종가) 생성 - 목 데이터
const getBasePrice = (ticker: string): number => {
  // 심볼별 기본 기준값 설정
  const basePrices: Record<string, number> = {
    EURUSD: 1.085,
    GBPUSD: 1.265,
    USDJPY: 149.5,
    USDCHF: 0.875,
    USDCAD: 1.365,
    AUDUSD: 0.655,
    NZDUSD: 0.605,
    EURGBP: 0.855,
    EURJPY: 162.0,
    GBPJPY: 189.0,
    AUDJPY: 98.0,
    NZDJPY: 90.5,
    EURCHF: 0.945,
    EURCAD: 1.485,
    EURAUD: 1.655,
    EURNZD: 1.795,
    GBPCHF: 1.105,
    GBPCAD: 1.725,
    GBPAUD: 1.955,
    GBPNZD: 2.095,
    AUDCHF: 0.575,
    AUDCAD: 0.885,
    AUDNZD: 1.085,
    NZDCHF: 0.535,
    NZDCAD: 0.825,
    CADCHF: 0.645,
    CHFJPY: 171.0,
    CADJPY: 109.5,
    BTCUSD: 50000,
    ETHUSD: 3000,
    XRPUSD: 0.5,
    XAUUSD: 2000,
    XAGUSD: 25.0,
    USOil: 75.0,
    UKOil: 75.0,
    AAPL: 180.0,
    GOOGL: 140.0,
    MSFT: 350.0,
    AMZN: 150.0,
    TSLA: 250.0,
  };

  return basePrices[ticker] || 100;
};

// 실시간 가격 정보 가져오기
const getSymbolPrice = (ticker: string): string => {
  const marketDataForSymbol = marketData.value.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return '0.00';

  // 가격 포맷팅 (소수점 자릿수 조정)
  if (marketDataForSymbol.price < 1) {
    return marketDataForSymbol.price.toFixed(4);
  } else if (marketDataForSymbol.price < 100) {
    return marketDataForSymbol.price.toFixed(2);
  } else {
    return marketDataForSymbol.price.toFixed(0);
  }
};

// 기준값 대비 증감률 계산
const getSymbolChangeFromBase = (ticker: string): string => {
  const marketDataForSymbol = marketData.value.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return '0.00';

  const basePrice = getBasePrice(ticker);
  const currentPrice = marketDataForSymbol.price;
  const changePercent = ((currentPrice - basePrice) / basePrice) * 100;

  return changePercent.toFixed(2);
};

// 기준값 대비 증감률 클래스
const getChangeFromBaseClass = (ticker: string): string => {
  const marketDataForSymbol = marketData.value.find((m) => m.symbol === ticker);
  if (!marketDataForSymbol) return 'neutral';

  const basePrice = getBasePrice(ticker);
  const currentPrice = marketDataForSymbol.price;
  const changePercent = ((currentPrice - basePrice) / basePrice) * 100;

  return changePercent > 0 ? 'positive' : changePercent < 0 ? 'negative' : 'neutral';
};

// 데이터 로드
const loadSymbols = async () => {
  try {
    // mocks 패키지에서 심볼 목록과 가격 데이터 가져오기
    const { getAllSymbols, getAllSymbolPrices } = await import('@template/mocks');
    symbols.value = getAllSymbols();

    // 실시간 데이터가 자동으로 업데이트되므로 별도의 가격 데이터 로드 불필요
  } catch (error) {
    console.error('Failed to load symbols:', error);
    // 에러 발생 시 기본 데이터 사용
    symbols.value = [
      {
        symbol: 'EURTRY',
        ticker: 'EURTRY',
        description: 'Euro / Turkish Lira',
        exchange: 'Forex',
        type: 'forex',
      },
      {
        symbol: 'USDSEK',
        ticker: 'USDSEK',
        description: 'US Dollar / Swedish Krona',
        exchange: 'Forex',
        type: 'forex',
      },
      {
        symbol: 'SUI30',
        ticker: 'SUI30',
        description: 'Swiss Market Index',
        exchange: 'Index',
        type: 'index',
      },
      {
        symbol: 'AUDJPY',
        ticker: 'AUDJPY',
        description: 'Australian Dollar / Japanese Yen',
        exchange: 'Forex',
        type: 'forex',
      },
    ];
  }
};

// 🎯 가시성 감지 및 성능 최적화
const symbolListRef = ref<HTMLElement>();
const visibleSymbols = ref<Set<string>>(new Set());

// Intersection Observer를 사용한 가시성 감지
let currentObserver: IntersectionObserver | null = null;

const setupVisibilityObserver = () => {
  if (!symbolListRef.value) return;

  // 기존 observer 정리
  if (currentObserver) {
    currentObserver.disconnect();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      console.log(`[SymbolList] 가시성 변경: ${entries.length}개 항목`);

      const addedSymbols: string[] = [];
      const removedSymbols: string[] = [];

      entries.forEach((entry) => {
        const ticker = entry.target.getAttribute('data-ticker');
        if (ticker) {
          if (entry.isIntersecting) {
            if (!visibleSymbols.value.has(ticker)) {
              visibleSymbols.value.add(ticker);
              addedSymbols.push(ticker);
              console.log(`[SymbolList] ${ticker} 보임`);
            }
          } else {
            if (visibleSymbols.value.has(ticker)) {
              visibleSymbols.value.delete(ticker);
              removedSymbols.push(ticker);
              console.log(`[SymbolList] ${ticker} 숨김`);
            }
          }
        }
      });

      // 추가된 종목들만 추가
      if (addedSymbols.length > 0) {
        addVisibleSymbols('SymbolList', addedSymbols);
      }

      // 제거된 종목들만 제거
      if (removedSymbols.length > 0) {
        removeVisibleSymbols('SymbolList', removedSymbols);
      }
    },
    {
      root: symbolListRef.value,
      rootMargin: '50px', // 50px 여유를 두고 미리 로드
      threshold: 0.1, // 10% 보이면 visible로 간주
    }
  );

  // 모든 종목 요소에 observer 적용
  const symbolElements = symbolListRef.value.querySelectorAll('.symbol-item');
  console.log(`[SymbolList] Observer 설정: ${symbolElements.length}개 요소`);
  symbolElements.forEach((element) => {
    observer.observe(element);
  });

  currentObserver = observer;
  return observer;
};

// filteredSymbols가 변경될 때마다 observer 재설정
watch(
  filteredSymbols,
  async () => {
    console.log(`[SymbolList] filteredSymbols 변경: ${filteredSymbols.value.length}개`);
    await nextTick(); // DOM 업데이트 대기
    setTimeout(() => {
      setupVisibilityObserver();
    }, 100);
  },
  { deep: true }
);

// 컴포넌트 마운트 시 가시성 감지 설정
onMounted(() => {
  // 약간의 지연을 두고 observer 설정 (DOM이 완전히 렌더링된 후)
  setTimeout(() => {
    setupVisibilityObserver();
  }, 100);
});

// 컴포넌트 언마운트 시 구독 해제
onUnmounted(() => {
  console.log('[SymbolList] 컴포넌트 언마운트 - 모든 구독 해제');
  unsubscribeAll();
});

// 실시간 데이터가 자동으로 업데이트되므로 별도의 데이터 로드 함수 불필요
</script>

<style scoped lang="scss">
@use './SymbolList.scss';
</style>
