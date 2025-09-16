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
              <div class="price">{{ getPrice(symbol.ticker) }}</div>
              <div class="change" :class="getChangeClass(symbol.ticker)">
                {{ getChange(symbol.ticker) }}%
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
import {
  getProfitLossClass,
  getSymbolPrice,
  getSymbolChangeFromBase,
  getChangeFromBaseClass,
} from '@template/utils';
import { useSymbolVisibility } from '@/composables/useSymbolVisibility';
import { BaseTabs, BaseInput, BaseIcon } from '@template/ui';
import { useSymbolData } from '@/composables/useSymbolData';
import type { TradingSymbol } from '@template/types';
import { onMounted, onUnmounted } from 'vue';
import type { TabItem } from '@template/ui';

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 심볼 데이터 관리
const {
  activeTab,
  searchQuery,
  currentSelectedSymbol,
  marketData,
  filteredSymbols,
  selectSymbol: selectSymbolData,
  toggleFavorite,
  isFavorite,
  handleSearch,
  loadSymbols,
  addVisibleSymbols,
  unsubscribeAll,
} = useSymbolData();

// BaseTabs용 탭 데이터
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

// 가시성 관리
const { symbolListRef } = useSymbolVisibility(addVisibleSymbols, filteredSymbols);

// 메서드
const selectSymbol = (symbol: TradingSymbol) => {
  selectSymbolData(symbol);
  emit('symbol-select', symbol);
};

// 가격 및 증감률 계산 함수들 (utils 함수 사용)
const getPrice = (ticker: string) => getSymbolPrice(ticker, marketData.value);
const getChange = (ticker: string) => getSymbolChangeFromBase(ticker, marketData.value);
const getChangeClass = (ticker: string) =>
  getChangeFromBaseClass(ticker, marketData.value, getProfitLossClass);

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadSymbols();
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  unsubscribeAll();
});
</script>

<style scoped lang="scss">
@use './SymbolList.scss';
</style>
