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
    <div class="symbol-list-container">
      <div
        v-for="symbol in filteredSymbols"
        :key="symbol.ticker"
        class="symbol-item"
        :class="{ selected: selectedSymbol === symbol.ticker }"
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
              <div class="change" :class="getChangeClass(symbol.ticker)">
                {{ getSymbolChange(symbol.ticker) }}%
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
import { BaseTabs, BaseInput, BaseIcon } from '@template/ui';
import type { TradingSymbol } from '@/types/tradingview';
import { ref, computed, onMounted, markRaw } from 'vue';
import type { SymbolPrice } from '@template/mocks';
import type { TabItem } from '@template/ui';

interface Props {
  selectedSymbol?: string;
}

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectedSymbol: 'EURTRY',
});

const emit = defineEmits<Emits>();

// 상태 관리
const activeTab = ref('all');
const searchQuery = ref('');
const symbols = ref<TradingSymbol[]>([]);
const symbolPrices = ref<Map<string, SymbolPrice>>(new Map());
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

const getSymbolPrice = (ticker: string): string => {
  const priceData = symbolPrices.value.get(ticker);
  if (!priceData) return '0.00';

  // 가격 포맷팅 (소수점 자릿수 조정)
  if (priceData.price < 1) {
    return priceData.price.toFixed(4);
  } else if (priceData.price < 100) {
    return priceData.price.toFixed(2);
  } else {
    return priceData.price.toFixed(0);
  }
};

const getSymbolChange = (ticker: string): string => {
  const priceData = symbolPrices.value.get(ticker);
  if (!priceData) return '0.00';

  const change = priceData.changePercent;
  return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
};

const getChangeClass = (ticker: string): string => {
  const priceData = symbolPrices.value.get(ticker);
  if (!priceData) return 'neutral';

  return priceData.changePercent > 0
    ? 'positive'
    : priceData.changePercent < 0
      ? 'negative'
      : 'neutral';
};

// 데이터 로드
const loadSymbols = async () => {
  try {
    // mocks 패키지에서 심볼 목록과 가격 데이터 가져오기
    const { getAllSymbols, getAllSymbolPrices } = await import('@template/mocks');
    symbols.value = getAllSymbols();

    // 가격 데이터 로드
    const prices = getAllSymbolPrices();
    const priceMap = new Map<string, SymbolPrice>();
    prices.forEach((price: SymbolPrice) => {
      priceMap.set(price.ticker, price);
    });
    symbolPrices.value = priceMap;
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

onMounted(() => {
  loadSymbols();
});
</script>
