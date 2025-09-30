<template>
  <div
    ref="symbolListRef"
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
  >
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
</template>
<script setup lang="ts">
import {
  getProfitLossClass,
  getSymbolPrice,
  getSymbolChangeFromBase,
  getChangeFromBaseClass,
} from '@template/utils';
import { useSymbolVisibility } from '@/composables/useSymbolVisibility';
import { useSymbolData } from '@/composables/useSymbolData';
import { onMounted, onUnmounted, reactive } from 'vue';
import type { TradingSymbol } from '@template/types';
import { BaseIcon } from '@template/ui';

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

// 카테고리 열림/닫힘 상태 관리
const open = reactive({
  all: true,
  forex: false,
  indices: false,
  commodities: false,
  crypto: false,
});

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
@use '../SymbolList.scss';
</style>
