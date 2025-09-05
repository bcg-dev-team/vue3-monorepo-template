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
              <!-- FIXME: 실제 가격 데이터 연동 필요 -->
              <div class="price">1.17100</div>
              <div class="change" :class="getChangeClass()">
                <!-- FIXME: 실제 변동률 데이터 연동 필요 -->
                {{ getRandomChange() }}%
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
import type { TabItem } from '@template/ui';

interface Props {
  selectedSymbol?: string;
}

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectedSymbol: 'ETH/EUR',
});

const emit = defineEmits<Emits>();

// 상태 관리
const activeTab = ref('all');
const searchQuery = ref('');
const symbols = ref<TradingSymbol[]>([]);
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
    filtered = filtered.filter((symbol) => symbol.ticker.includes('BTC'));
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

const getChangeClass = () => {
  // FIXME: 실제 변동률에 따른 클래스 적용 필요
  return Math.random() > 0.5 ? 'positive' : 'negative';
};

const getRandomChange = () => {
  // FIXME: 실제 변동률 데이터로 교체 필요
  const change = (Math.random() - 0.5) * 2;
  return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
};

// 데이터 로드
const loadSymbols = async () => {
  try {
    // getAllSymbols 함수를 직접 import하여 사용
    const { getAllSymbols } = await import('@/adapters/tradingview/datafeed');
    symbols.value = await getAllSymbols();
  } catch (error) {
    console.error('Failed to load symbols:', error);
    // 에러 발생 시 기본 데이터 사용
    symbols.value = [
      {
        symbol: 'BTC/EUR',
        ticker: 'BTC/EUR',
        description: 'Bitcoin / Euro',
        exchange: 'Bitfinex',
        type: 'crypto',
      },
      {
        symbol: 'ETH/EUR',
        ticker: 'ETH/EUR',
        description: 'Ethereum / Euro',
        exchange: 'Bitfinex',
        type: 'crypto',
      },
    ];
  }
};

onMounted(() => {
  loadSymbols();
});
</script>
