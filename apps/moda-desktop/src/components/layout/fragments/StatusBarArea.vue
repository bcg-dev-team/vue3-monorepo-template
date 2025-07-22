<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-12">
      <dl
        v-for="metric in financialMetrics"
        :key="metric.id"
        class="flex flex-col items-start gap-1"
      >
        <dt class="text-divider-muted text-[11px] tracking-[-0.1px]">{{ metric.label }}</dt>
        <dd class="text-white font-semibold tracking-[-0.35px]">{{ metric.value }}</dd>
      </dl>
    </div>
    <span class="text-divider-muted text-2xl">|</span>
    <div class="flex items-center gap-4">
      <!-- <button class="icon-btn p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <MyPageIcon class="w-5 h-5 text-gray-700" />
      </button>
      <button class="icon-btn p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <ModeLightIcon class="w-5 h-5 text-gray-700" />
      </button>
      <button class="icon-btn p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <LogoutIcon class="w-5 h-5 text-gray-700" />
      </button> -->
      <p class="text-white">아이콘 영역</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MyPageIcon, ModeLightIcon, LogoutIcon } from '@template/ui';

interface FinancialMetric {
  id: string;
  label: string;
  value: string;
}

const financialMetrics: FinancialMetric[] = [
  { id: 'available-margin', label: '사용 가능 증거금', value: '$2,500.00' },
  { id: 'margin', label: '증거금', value: '$0.00' },
  { id: 'deposit-balance', label: '평가 예탁잔고', value: '$25,000.00' },
  { id: 'pl-total', label: 'P/L 합계', value: '$0.00' },
  { id: 'margin-rate', label: '증거금율', value: '0.00%' },
];
</script>
