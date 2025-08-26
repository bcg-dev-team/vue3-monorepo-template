<template>
  <div class="flex flex-col bg-white p-4">
    <div>
      <BaseInput />
    </div>

    <!-- 통화 페어 섹션 -->
    <div
      class="relative mt-3 flex items-center justify-between rounded-md border border-[#0067ef] bg-[#f5f7f9] p-4"
    >
      <div class="flex w-52 flex-col gap-1">
        <div class="text-base font-semibold leading-5 tracking-[-0.35px] text-[#131313]">
          EURUSD
        </div>
      </div>
      <div class="text-base font-semibold leading-5 tracking-[-0.35px] text-[#0067ef]">1.17100</div>
    </div>

    <!-- 주문 유형 선택 -->
    <div class="mt-2">
      <BaseRadioGroup
        v-model="selectedOrderType"
        :options="orderTypeOptions"
        label="주문 유형"
        name="orderType"
      />
    </div>

    <!-- 매도 매수 버튼 -->
    <div class="mt-2 flex gap-2">
      <BaseButton
        variant="outlined"
        color="red"
        size="lg"
        label="매도"
        subLabel="1.17100"
        customClass="h-16"
        fullWidth
      />
      <BaseButton
        variant="contained-grey"
        color="blue"
        size="lg"
        label="매수"
        subLabel="1.17096"
        customClass="h-16"
        fullWidth
      />
    </div>
    <BaseProgressBar variant="performance" value="75" max="100" class="mt-2" />
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
      <div class="flex flex-col gap-1">
        <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
          수량(Lots)
        </div>
        <div class="flex h-[34px] w-[168px] items-center">
          <!-- 수량 입력 필드 -->
          <div class="flex-1 rounded-l-[6px] border border-r-0 border-[#b4b6bb] bg-white px-3 py-2">
            <div class="text-[14px] font-normal leading-[18px] text-[#131313]">1.0</div>
          </div>
          <!-- 증가 버튼 -->
          <div
            class="flex items-center justify-center border border-[#b4b6bb] bg-white px-1 py-[9px]"
          >
            <BaseIcon name="plus" size="sm" />
          </div>
          <!-- 감소 버튼 -->
          <div
            class="flex items-center justify-center rounded-r-[6px] border border-l-0 border-[#b4b6bb] bg-white px-1 py-[9px]"
          >
            <BaseIcon name="minus" size="sm" />
          </div>
        </div>
      </div>

      <!-- 증거금율 정보 섹션 -->
      <div class="w-full rounded-[8px] bg-[#f5f7f9] p-3">
        <div class="flex flex-col gap-2">
          <!-- 1 Lot 값 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="font-normal tracking-[-0.35px] text-[#717375]">1 Lot 값</div>
            <div class="font-medium text-[#131313]">$650,840.00</div>
          </div>
          <!-- Pip Value -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="font-normal tracking-[-0.35px] text-[#717375]">Pip Value</div>
            <div class="font-medium text-[#131313]">$100.00</div>
          </div>
          <!-- 최소 증거금 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="font-normal tracking-[-0.35px] text-[#717375]">최소 증거금</div>
            <div class="font-medium text-[#131313]">$1,301.70</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 자동 청산 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-3">
      <!-- 자동 청산 헤더 -->
      <div class="flex w-full flex-col gap-2">
        <button class="flex w-full cursor-pointer items-center justify-start">
          <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px] text-[#131313]">
            자동 청산
          </div>
          <BaseIcon name="arrow-down" size="md" />
        </button>

        <!-- 자동 청산 콘텐츠 -->
        <div class="flex w-full flex-col gap-3">
          <!-- Stop Loss & Take Profit 체크박스 -->
          <div class="flex w-full items-center justify-between">
            <div class="flex w-[150px] items-center gap-1">
              <BaseCheckbox v-model="state.stopLoss" />
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
                Stop Loss
              </div>
            </div>
            <div
              class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
            ></div>
            <div class="flex w-[150px] items-center gap-1">
              <BaseCheckbox v-model="state.takeProfit" />
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
                Take Profit
              </div>
            </div>
          </div>

          <!-- Stop Loss 입력 필드들 -->
          <div class="flex w-full flex-col gap-1">
            <!-- 핍 입력 -->
            <div class="flex h-8 w-full items-center justify-between gap-1">
              <div class="flex h-full w-[150px] items-center">
                <div
                  class="flex-1 rounded-bl-[6px] rounded-tl-[6px] border border-r-0 border-[#b4b6bb] bg-white px-3 py-2"
                >
                  <div class="text-[13px] font-normal leading-[16px] text-[#131313]">-100.1</div>
                </div>
                <div
                  class="flex items-center justify-center border border-r-0 border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="plus" size="sm" />
                </div>
                <div
                  class="flex items-center justify-center rounded-br-[6px] rounded-tr-[6px] border border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="minus" size="sm" />
                </div>
              </div>
              <div
                class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
              >
                핍
              </div>
              <div class="flex h-full w-[150px] items-center">
                <div
                  class="flex-1 rounded-bl-[6px] rounded-tl-[6px] border border-r-0 border-[#b4b6bb] bg-white px-3 py-2"
                >
                  <div class="text-[13px] font-normal leading-[16px] text-[#131313]">-100.1</div>
                </div>
                <div
                  class="flex items-center justify-center border border-r-0 border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="plus" size="sm" />
                </div>
                <div
                  class="flex items-center justify-center rounded-br-[6px] rounded-tr-[6px] border border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="minus" size="sm" />
                </div>
              </div>
            </div>

            <!-- 가격 입력 -->
            <div class="flex h-8 w-full items-center justify-between gap-1">
              <div class="flex h-full w-[150px] items-center">
                <div
                  class="flex-1 rounded-bl-[6px] rounded-tl-[6px] border border-r-0 border-[#b4b6bb] bg-white px-3 py-2"
                >
                  <div class="text-[13px] font-normal leading-[16px] text-[#131313]">~1.18356</div>
                </div>
                <div
                  class="flex items-center justify-center border border-r-0 border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="plus" size="sm" />
                </div>
                <div
                  class="flex items-center justify-center rounded-br-[6px] rounded-tr-[6px] border border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="minus" size="sm" />
                </div>
              </div>
              <div
                class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px] text-[#131313]"
              >
                가격
              </div>
              <div class="flex h-full w-[150px] items-center">
                <div
                  class="flex-1 rounded-bl-[6px] rounded-tl-[6px] border border-r-0 border-[#b4b6bb] bg-white px-3 py-2"
                >
                  <div class="text-[13px] font-normal leading-[16px] text-[#131313]">~1.18356</div>
                </div>
                <div
                  class="flex items-center justify-center border border-r-0 border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="plus" size="sm" />
                </div>
                <div
                  class="flex items-center justify-center rounded-br-[6px] rounded-tr-[6px] border border-[#b4b6bb] bg-white px-1 py-2"
                >
                  <BaseIcon name="minus" size="sm" />
                </div>
              </div>
            </div>
          </div>

          <!-- Trailing Stop 체크박스 -->
          <button class="flex w-[150px] cursor-pointer items-center gap-1">
            <div class="flex w-[150px] items-center gap-1">
              <BaseCheckbox v-model="state.trailingStop" />
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px] text-[#131313]">
                Trailing Stop
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- 버튼 섹션 -->
      <div class="flex w-full flex-col gap-2.5">
        <BaseButton label="주문 실행" />
      </div>

      <!-- 5단계 호가 섹션 -->
      <div class="mt-6 flex w-full flex-col gap-2">
        <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px] text-[#131313]">
          5단계 호가
        </div>

        <!-- 호가 차트 -->
        <div class="flex flex-col items-center gap-1">
          <!-- 1단계 호가 -->
          <div class="flex h-6 w-full gap-1">
            <div class="flex h-6 w-full items-center justify-between text-xs">
              <div class="relative z-10">1.00</div>
              <div class="relative">
                <div class="relative z-10 mr-[9px]">1.16790</div>
                <div
                  class="absolute right-0 top-1/2 h-6 w-[5px] -translate-y-1/2 rounded bg-[#E0EDFF]"
                ></div>
              </div>
            </div>
            <div class="flex w-full items-center justify-between text-xs">
              <div class="relative">
                <div class="relative z-10 ml-[9px]">1.00</div>
                <div
                  class="absolute left-0 top-1/2 h-6 w-[5px] -translate-y-1/2 rounded bg-[#FFDBDC]"
                ></div>
              </div>
              <div class="relative z-10">1.16790</div>
            </div>
          </div>

          <!-- 2단계 호가 -->
          <div class="flex h-6 w-full gap-1">
            <div class="flex h-6 w-full items-center justify-between text-xs">
              <div class="relative z-10">1.00</div>
              <div class="relative">
                <div class="relative z-10 mr-[9px]">1.16790</div>
                <div
                  class="absolute right-0 top-1/2 h-6 w-[40px] -translate-y-1/2 rounded bg-[#E0EDFF]"
                ></div>
              </div>
            </div>
            <div class="flex w-full items-center justify-between text-xs">
              <div class="relative">
                <div class="relative z-10 ml-[9px]">1.00</div>
                <div
                  class="absolute left-0 top-1/2 h-6 w-[40px] -translate-y-1/2 rounded bg-[#FFDBDC]"
                ></div>
              </div>
              <div class="relative z-10">1.16790</div>
            </div>
          </div>

          <!-- 3단계 호가 -->
          <div class="flex h-6 w-full gap-1">
            <div class="flex h-6 w-full items-center justify-between text-xs">
              <div class="relative z-10">1.00</div>
              <div class="relative">
                <div class="relative z-10 mr-[9px]">1.16790</div>
                <div
                  class="absolute right-0 top-1/2 h-6 w-[60px] -translate-y-1/2 rounded bg-[#E0EDFF]"
                ></div>
              </div>
            </div>
            <div class="flex w-full items-center justify-between text-xs">
              <div class="relative">
                <div class="relative z-10 ml-[9px]">1.00</div>
                <div
                  class="absolute left-0 top-1/2 h-6 w-[60px] -translate-y-1/2 rounded bg-[#FFDBDC]"
                ></div>
              </div>
              <div class="relative z-10">1.16790</div>
            </div>
          </div>

          <!-- 4단계 호가 -->
          <div class="flex h-6 w-full gap-1">
            <div class="flex h-6 w-full items-center justify-between text-xs">
              <div class="relative z-10">1.00</div>
              <div class="relative">
                <div class="relative z-10 mr-[9px]">1.16790</div>
                <div
                  class="absolute right-0 top-1/2 h-6 w-[100px] -translate-y-1/2 rounded bg-[#E0EDFF]"
                ></div>
              </div>
            </div>
            <div class="flex w-full items-center justify-between text-xs">
              <div class="relative">
                <div class="relative z-10 ml-[9px]">1.00</div>
                <div
                  class="absolute left-0 top-1/2 h-6 w-[100px] -translate-y-1/2 rounded bg-[#FFDBDC]"
                ></div>
              </div>
              <div class="relative z-10">1.16790</div>
            </div>
          </div>

          <!-- 5단계 호가 -->
          <div class="flex h-6 w-full gap-1">
            <div class="flex h-6 w-full items-center justify-between text-xs">
              <div class="relative z-10">1.00</div>
              <div class="relative">
                <div class="relative z-10 mr-[9px]">1.16790</div>
                <div
                  class="absolute right-0 top-1/2 h-6 w-[150px] -translate-y-1/2 rounded bg-[#E0EDFF]"
                ></div>
              </div>
            </div>
            <div class="flex w-full items-center justify-between text-xs">
              <div class="relative z-10">
                <div class="relative z-10 ml-[9px]">1.00</div>
                <div
                  class="absolute left-0 top-1/2 h-6 w-[150px] -translate-y-1/2 rounded bg-[#FFDBDC]"
                ></div>
              </div>
              <div class="relative z-10">1.16790</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseRadioGroup,
  BaseButton,
  BaseIcon,
  BaseInput,
  BaseCheckbox,
  BaseProgressBar,
} from '@template/ui';
import type { RadioOption } from '@template/ui';
import { reactive } from 'vue';

const state = reactive({
  stopLoss: false,
  takeProfit: false,
  trailingStop: false,
});

/**
 * 주문 패널의 우측 섹션 컴포넌트
 * 통화 페어와 현재 가격을 표시하고 주문 유형을 선택할 수 있습니다.
 */
interface Props {
  currencyPair?: string;
  price?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currencyPair: 'EURUSD',
  price: '1.17100',
});

/**
 * 선택된 주문 유형
 */
const selectedOrderType = defineModel<string>('orderType', {
  default: 'market',
});

/**
 * 주문 유형 옵션들
 */
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

<style scoped>
/* Pretendard GOV 폰트가 없는 경우를 대비한 fallback */
.font-semibold {
  font-family:
    'Pretendard GOV',
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-weight: 600;
}
</style>
