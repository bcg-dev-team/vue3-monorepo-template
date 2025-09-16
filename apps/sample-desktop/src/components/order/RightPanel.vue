<template>
  <div class="flex flex-col bg-white p-4">
    <!-- 계좌 선택 -->
    <div class="mt-3">
      <!-- TODO: BaseInputSelect로 대체될 영역-->
      <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
    </div>

    <!-- 통화 페어 섹션 -->
    <div
      class="h-13 relative mt-3 flex items-center justify-between rounded-md border border-[#0067ef] bg-[#f5f7f9] p-4"
    >
      <div class="flex w-52 flex-col gap-1">
        <div class="text-base font-semibold leading-5 tracking-[-0.35px] text-[#131313]">
          {{ currentSymbol }}
        </div>
        <div class="text-sm text-gray-600">
          {{ currentPrice.toFixed(5) }}
          <span :class="changePercent >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ changePercent >= 0 ? '+' : '' }}{{ changePercent.toFixed(2) }}%
          </span>
        </div>
      </div>
    </div>

    <!-- 주문 유형 선택 -->
    <div class="mt-3">
      <BaseRadioGroup v-model="selectedOrderType" :options="orderTypeOptions" name="orderType" />
    </div>

    <!-- 매도 매수 버튼 -->
    <div class="mt-2 flex gap-2">
      <button :class="buyButtonClasses" @click="handleBuyClick">
        <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매수</div>
        <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
          {{ buyPrice.toFixed(5) }}
        </div>
      </button>
      <button :class="sellButtonClasses" @click="handleSellClick">
        <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매도</div>
        <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
          {{ sellPrice.toFixed(5) }}
        </div>
      </button>
    </div>

    <!-- 매수 매도 진행바 -->
    <div class="mt-2 flex w-full flex-row items-start justify-start gap-2">
      <div
        class="h-1.5 rounded-[999px] bg-[var(--base-colors-red-red800)]"
        :style="progressBarStyles.buyBarStyle"
      ></div>
      <div
        class="h-1.5 rounded-[999px] bg-[var(--base-colors-blue-blue800-deep)]"
        :style="progressBarStyles.sellBarStyle"
      ></div>
    </div>

    <!-- 거래 정보 섹션 -->
    <div
      class="text-color-default mt-2 flex items-center justify-center gap-2 text-center text-[11px] leading-[14px] tracking-[-0.1px]"
    >
      <span class="whitespace-nowrap">스프레드: 0.4</span>
      <span>|</span>
      <span class="whitespace-nowrap">고가: 1.17496</span>
      <span>|</span>
      <span class="whitespace-nowrap">저가: 1.17151</span>
    </div>

    <!-- 수량 및 증거금율 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-3">
      <!-- 수량 입력 섹션 -->
      <div class="grid grid-cols-2 gap-2">
        <!-- 시장가: 수량만 -->
        <template v-if="selectedOrderType === 'market'">
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              수량(Lots)
            </div>
            <BaseInputStepper
              v-model="quantity"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
        </template>

        <!-- Limit: 진입가격, 수량 -->
        <template v-else-if="selectedOrderType === 'limit'">
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              진입가격 Pip
            </div>
            <BaseInputStepper
              v-model="entryPrice"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              수량(Lots)
            </div>
            <BaseInputStepper
              v-model="quantity"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
        </template>

        <!-- Stop: 배리어, 수량 -->
        <template v-else-if="selectedOrderType === 'stop'">
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              배리어
            </div>
            <BaseInputStepper
              v-model="barrier"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              수량(Lots)
            </div>
            <BaseInputStepper
              v-model="quantity"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
        </template>

        <!-- Stop Limit: 배리어, 수량, 진입가격 -->
        <template v-else-if="selectedOrderType === 'stopLimit'">
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              배리어
            </div>
            <BaseInputStepper
              v-model="barrier"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              수량(Lots)
            </div>
            <BaseInputStepper
              v-model="quantity"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-1">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              진입가격 Pip
            </div>
            <BaseInputStepper
              v-model="entryPrice"
              :min="0"
              :max="100"
              :step="0.01"
              variant="default"
            />
          </div>
        </template>
      </div>

      <!-- 증거금율 정보 섹션 -->
      <div class="w-full rounded-[8px] bg-[#f5f7f9] p-3">
        <div class="flex flex-col gap-2">
          <!-- 1 Lot 값 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">1 Lot 값</div>
            <div class="font-medium text-[#131313]">$650,840.00</div>
          </div>
          <!-- Pip Value -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">Pip Value</div>
            <div class="font-medium text-[#131313]">$100.00</div>
          </div>
          <!-- 최소 증거금 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">최소 증거금</div>
            <div class="font-medium text-[#131313]">$1,301.70</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 자동 청산 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-2">
      <button
        @click="isAutoLiquidationOpen = !isAutoLiquidationOpen"
        class="flex w-full cursor-pointer items-center justify-start"
      >
        <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px] text-[#131313]">
          자동 청산
        </div>
        <BaseIcon
          name="arrow-down"
          size="md"
          :class="{ 'rotate-180': isAutoLiquidationOpen }"
          class="transition-transform duration-200"
        />
      </button>

      <!-- 자동 청산 콘텐츠 -->
      <div
        v-if="isAutoLiquidationOpen"
        class="flex w-full flex-col gap-2 overflow-hidden transition-all duration-200"
      >
        <!-- Stop Loss & Take Profit 체크박스 -->
        <div class="flex w-full items-center justify-between">
          <div class="w-[150px]">
            <BaseCheckbox v-model="state.stopLoss">
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
                Stop Loss
              </div>
            </BaseCheckbox>
          </div>
          <div
            class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
          ></div>
          <div class="w-[150px]">
            <BaseCheckbox v-model="state.takeProfit">
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
                Take Profit
              </div>
            </BaseCheckbox>
          </div>
        </div>

        <!-- Stop Loss 입력 필드들 -->
        <div class="flex w-full flex-col gap-1">
          <!-- Stop Loss 핍 입력 -->
          <div class="flex h-8 w-full items-center justify-between gap-1">
            <div class="flex h-full w-[150px] items-center">
              <BaseInputStepper
                v-model="stopLossPip"
                :max="100"
                :step="0.00001"
                variant="default"
              />
            </div>

            <div
              class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
            >
              핍
            </div>
            <div class="flex h-full w-[150px] items-center">
              <BaseInputStepper
                v-model="takeProfitPip"
                :max="100"
                :step="0.00001"
                variant="default"
              />
            </div>
          </div>

          <!-- Stop Loss & Take Profit 가격 입력 -->
          <div class="flex h-8 w-full items-center justify-between gap-1">
            <div class="flex h-full w-[150px] items-center">
              <BaseInputStepper
                v-model="stopLossPrice"
                :min="0"
                :max="100"
                :step="0.00001"
                variant="range"
              />
            </div>

            <div
              class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
            >
              가격
            </div>
            <div class="flex h-full w-[150px] items-center">
              <BaseInputStepper
                v-model="takeProfitPrice"
                :min="0"
                :max="100"
                :step="0.00001"
                variant="range"
              />
            </div>
          </div>
        </div>

        <!-- Trailing Stop 체크박스 -->
        <div class="flex w-[150px] items-center gap-1">
          <BaseCheckbox v-model="state.trailingStop">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
              Trailing Stop
            </div>
          </BaseCheckbox>
        </div>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <div class="mt-3 flex w-full flex-col gap-2.5">
      <BaseButton label="주문 실행" :disabled="!isBuyActive && !isSellActive" />
    </div>

    <!-- 5단계 호가 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-2">
      <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px] text-[#131313]">
        5단계 호가
      </div>

      <!-- 호가 차트 -->
      <OrderBook />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseRadioGroup,
  BaseButton,
  BaseIcon,
  BaseCheckbox,
  BaseInputStepper,
  BaseInputSelect,
} from '@template/ui';
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';

import type { RadioOption } from '@template/ui';
import { reactive, ref, computed } from 'vue';
import OrderBook from './OrderBook.vue';

interface Props {
  selectedSymbol?: string;
}

withDefaults(defineProps<Props>(), {
  selectedSymbol: 'EURUSD',
});

const state = reactive({
  stopLoss: false,
  takeProfit: false,
  trailingStop: false,
});

const isAutoLiquidationOpen = ref(false); // 자동 청산 토글 상태
const isBuyActive = ref(false); // 매수 버튼 토글 상태
const isSellActive = ref(false); // 매도 버튼 토글 상태
const selectedAccount = ref('account1'); // 선택된 계좌
const isDropdownOpen = ref(false); // 드롭다운 토글 상태

// 선택된 심볼의 실시간 가격 사용
const buyPrice = computed(() => {
  return selectedSymbol.buyPrice.value;
});

const sellPrice = computed(() => {
  return selectedSymbol.sellPrice.value;
});

// 선택된 심볼 정보
const currentSymbol = computed(() => {
  return selectedSymbol.selectedSymbol.value;
});

const currentPrice = computed(() => {
  return selectedSymbol.currentPrice.value;
});

const changePercent = computed(() => {
  return selectedSymbol.changePercent.value;
});

// 주문 입력 데이터
const quantity = ref(0);
const entryPrice = ref(0);
const barrier = ref(0);

// Stop Loss & Take Profit 데이터
const stopLossPip = ref(0);
const stopLossPrice = ref(0);
const takeProfitPip = ref(0);
const takeProfitPrice = ref(0);

// 진행바 비율 계산
const progressBarRatio = computed(() => {
  const total = buyPrice.value + sellPrice.value;
  const buyRatio = (buyPrice.value / total) * 100;
  const sellRatio = (sellPrice.value / total) * 100;

  return {
    buyRatio,
    sellRatio,
  };
});

// 진행바 스타일 계산 (gap: 8px 유지)
const progressBarStyles = computed(() => {
  const { buyRatio, sellRatio } = progressBarRatio.value;

  return {
    buyBarStyle: {
      width: `${buyRatio}%`,
      flexShrink: 0,
    },
    sellBarStyle: {
      width: `${sellRatio}%`,
      flexShrink: 0,
    },
  };
});

// 실시간 계좌 정보 (목 데이터)
const accountOptions = computed(() => {
  return [
    {
      value: 'account1',
      label: '라이브계좌#1 110-81-345150 (USD 100,000)',
    },
  ];
});

const selectedAccountLabel = computed(() => {
  const option = accountOptions.value.find((opt) => opt.value === selectedAccount.value);
  return option?.label || '계좌를 선택하세요';
});

const selectAccount = (value: string) => {
  selectedAccount.value = value;
  isDropdownOpen.value = false;
};

const buyButtonClasses = computed(() => {
  const baseClasses = 'flex w-full flex-col items-center justify-center gap-1 rounded-md p-3 ';

  if (isBuyActive.value) {
    return `${baseClasses} bg-[var(--base-colors-red-red050)] text-[var(--base-colors-red-red800)] outline outline-1 outline-[var(--base-colors-red-red800)] outline-offset-[-2px]`;
  }

  return `${baseClasses} bg-[var(--button-red-background-none)]  text-[var(--base-colors-red-red800)]  `;
});

const sellButtonClasses = computed(() => {
  const baseClasses = 'flex w-full flex-col items-center justify-center gap-1 rounded-md  p-3 ';

  if (isSellActive.value) {
    return `${baseClasses} bg-[var(--base-colors-blue-blue050)] text-[var(--base-colors-blue-blue800-deep)] outline outline-1 outline-[var(--base-colors-blue-blue800-deep)] outline-offset-[-2px]`;
  }

  return `${baseClasses} bg-[var(--button-red-background-none)] text-[var(--base-colors-blue-blue800-deep)]`;
});

const handleBuyClick = () => {
  if (isSellActive.value) {
    isSellActive.value = false;
  }
  isBuyActive.value = !isBuyActive.value;
};

const handleSellClick = () => {
  if (isBuyActive.value) {
    isBuyActive.value = false;
  }
  isSellActive.value = !isSellActive.value;
};

const selectedOrderType = defineModel<string>('orderType', {
  default: 'market',
});

const orderTypeOptions: RadioOption[] = [
  {
    value: 'market',
    label: '시장가',
  },
  {
    value: 'limit',
    label: 'Limit',
  },
  {
    value: 'stop',
    label: 'Stop',
  },
  {
    value: 'stopLimit',
    label: 'Stop Limit',
  },
];
</script>
