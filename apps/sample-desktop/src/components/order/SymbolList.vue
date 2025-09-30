<template>
  <div class="symbol-list">
    <!-- 종목 카테고리 -->
    <div class="category-container">
      <BaseRadioGroup
        v-model="activeTab"
        :options="categoryOptions"
        name="symbol-category"
        size="sm"
        variant="underline"
        fullwidth
      />
    </div>

    <!-- 검색 입력창 (탭 외부에 위치) -->
    <div class="search-container">
      <BaseInput
        v-model="searchQuery"
        placeholder="종목명, 종목코드 검색"
        size="sm"
        variant="search"
      />
    </div>

    <SearchTab
      v-if="searchQuery !== ''"
      @symbol-select="selectSymbol"
      :symbolSearchInput="searchQuery"
    />
    <div v-else>
      <AllTab v-if="activeTab === 'all'" @symbol-select="selectSymbol" />
      <WatchTab v-if="activeTab === 'favorite'" @symbol-select="selectSymbol" />
      <HoldsTab v-if="activeTab === 'holding'" @symbol-select="selectSymbol" />
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
import { BaseRadioGroup, BaseInput, BaseIcon } from '@template/ui';
import { useSymbolData } from '@/composables/useSymbolData';
import { onMounted, onUnmounted, reactive } from 'vue';
import type { TradingSymbol } from '@template/types';
import type { RadioOption } from '@template/ui';
import SearchTab from './tab/SearchTab.vue';
import WatchTab from './tab/WatchTab.vue';
import HoldsTab from './tab/HoldsTab.vue';
import AllTab from './tab/AllTab.vue';

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
  loadSymbols,
  addVisibleSymbols,
  unsubscribeAll,
} = useSymbolData();

// BaseRadioGroup용 카테고리 옵션
const categoryOptions: RadioOption[] = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'favorite',
    label: '관심',
  },
  {
    value: 'holding',
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
