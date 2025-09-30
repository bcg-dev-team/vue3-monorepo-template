<template>
  <div
    class="bg-bg-bg-surface mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="open.all = !open.all"
  >
    <div class="text-[14px]">전체</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${open.all ? '' : 'rotate-[-90deg]'}`"
    />
  </div>
  <!-- 전체 종목 리스트 -->
  <div
    ref="symbolListRef"
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="open.all ? 'max-h-[42vh] opacity-100' : 'max-h-0 opacity-0'"
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

  <!-- 외환 -->
  <div
    class="bg-bg-bg-surface mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="open.forex = !open.forex"
  >
    <div class="text-[14px]">외환</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${open.forex ? '' : 'rotate-[-90deg]'}`"
    />
  </div>
  <!-- 외환 종목 리스트 -->
  <div
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="open.forex ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <!-- TODO: 외환 종목 데이터 연결 필요 -->
    <div class="symbol-item">
      <div class="symbol-content">
        <div class="symbol-info">
          <div class="symbol-icon">
            <BaseIcon name="chart-line" size="sm" />
          </div>
          <div class="symbol-name">EUR/USD</div>
        </div>
        <div class="symbol-values">
          <div class="price-info">
            <div class="price">1.0850</div>
            <div class="change text-green-500">+0.25%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 지수 -->
  <div
    class="bg-bg-bg-surface mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="open.indices = !open.indices"
  >
    <div class="text-[14px]">지수</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${open.indices ? '' : 'rotate-[-90deg]'}`"
    />
  </div>
  <!-- 지수 종목 리스트 -->
  <div
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="open.indices ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <!-- TODO: 지수 종목 데이터 연결 필요 -->
    <div class="symbol-item">
      <div class="symbol-content">
        <div class="symbol-info">
          <div class="symbol-icon">
            <BaseIcon name="chart-line" size="sm" />
          </div>
          <div class="symbol-name">S&P 500</div>
        </div>
        <div class="symbol-values">
          <div class="price-info">
            <div class="price">4,350.50</div>
            <div class="change text-red-500">-0.15%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 상품 -->
  <div
    class="bg-bg-bg-surface mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="open.commodities = !open.commodities"
  >
    <div class="text-[14px]">상품</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${open.commodities ? '' : 'rotate-[-90deg]'}`"
    />
  </div>
  <!-- 상품 종목 리스트 -->
  <div
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="open.commodities ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <!-- TODO: 상품 종목 데이터 연결 필요 -->
    <div class="symbol-item">
      <div class="symbol-content">
        <div class="symbol-info">
          <div class="symbol-icon">
            <BaseIcon name="chart-line" size="sm" />
          </div>
          <div class="symbol-name">Gold</div>
        </div>
        <div class="symbol-values">
          <div class="price-info">
            <div class="price">$1,950.30</div>
            <div class="change text-green-500">+1.20%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 가상화폐 -->
  <div
    class="bg-bg-bg-surface mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="open.crypto = !open.crypto"
  >
    <div class="text-[14px]">가상화폐</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${open.crypto ? '' : 'rotate-[-90deg]'}`"
    />
  </div>
  <!-- 가상화폐 종목 리스트 -->
  <div
    class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="open.crypto ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
  >
    <!-- TODO: 가상화폐 종목 데이터 연결 필요 -->
    <div class="symbol-item">
      <div class="symbol-content">
        <div class="symbol-info">
          <div class="symbol-icon">
            <BaseIcon name="chart-line" size="sm" />
          </div>
          <div class="symbol-name">BTC/USD</div>
        </div>
        <div class="symbol-values">
          <div class="price-info">
            <div class="price">$43,250.00</div>
            <div class="change text-green-500">+2.45%</div>
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
import { BaseRadioGroup, BaseInput, BaseIcon } from '@template/ui';
import { useSymbolData } from '@/composables/useSymbolData';
import { onMounted, onUnmounted, reactive } from 'vue';
import type { TradingSymbol } from '@template/types';
import type { RadioOption } from '@template/ui';

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
