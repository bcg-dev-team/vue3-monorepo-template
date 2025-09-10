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
      <BaseMenu :items="menuItems" @select="handleMenuSelect">
        <template #trigger>
          <div
            class="bg-bg-bg-surface-muted flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full"
          >
            <BaseIcon name="person" color="var(--input-icon-default)" />
          </div>
        </template>
      </BaseMenu>
      <BaseIcon
        v-if="isDark"
        name="mode-dark"
        color="white"
        class="cursor-pointer"
        @click="toggleTheme"
      />
      <BaseIcon
        v-else
        name="mode-light"
        color="white"
        class="cursor-pointer"
        @click="toggleTheme"
      />
      <BaseIcon name="notification" color="white" class="cursor-pointer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LocalStorageService from '@/service/localStorage/local-storage.service';
import LocalStorageKey from '@/service/localStorage/local-storage-key';
import { BaseIcon, useTheme, BaseMenu } from '@template/ui';
import { useRouter } from 'vue-router';

interface FinancialMetric {
  id: string;
  label: string;
  value: string;
}
const { isDark, toggleTheme } = useTheme();

const financialMetrics: FinancialMetric[] = [
  { id: 'available-margin', label: '사용 가능 증거금', value: '$2,500.00' },
  { id: 'margin', label: '증거금', value: '$0.00' },
  { id: 'deposit-balance', label: '평가 예탁잔고', value: '$25,000.00' },
  { id: 'pl-total', label: 'P/L 합계', value: '$0.00' },
  { id: 'margin-rate', label: '증거금율', value: '0.00%' },
];

const router = useRouter();

const handleLogout = () => {
  LocalStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
  router.push({ name: 'login' });
};

const menuItems = [
  {
    label: '마이페이지',
    value: 'mypage',
  },
  {
    label: '계좌 관리',
    value: 'account-management',
  },
  {
    label: '로그아웃',
    value: 'logout',
  },
];

const handleMenuSelect = (item: any) => {
  if (item.value === 'logout') {
    handleLogout();
  } else {
    router.push({ name: item.value });
  }
};
</script>
