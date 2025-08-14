<template>
  <div class="gap-size-24 flex items-center">
    <div class="gap-size-48 flex items-center">
      <dl
        v-for="metric in financialMetrics"
        :key="metric.id"
        class="flex flex-col items-start gap-1"
      >
        <dt class="text-default-muted tracking-0 text-[11px]">{{ metric.label }}</dt>
        <dd class="tracking-3 font-semibold text-white">{{ metric.value }}</dd>
      </dl>
    </div>
    <div class="h-size-20 border-bg-divider-muted border" />
    <div class="flex items-center gap-4">
      <div
        class="bg-bg-bg-surface-muted flex h-[34px] w-[34px] items-center justify-center rounded-full"
      >
        <BaseIcon name="person" color="black" />
      </div>
      <BaseIcon name="mode-light" color="white" />
      <BaseIcon name="notification" color="white" />
      <BaseIcon name="logout" color="white" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon } from '@template/ui';

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
