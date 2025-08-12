<script setup lang="ts">
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue';
import type { ComponentSize } from 'types/components';
import BaseTabList from './BaseTabList.vue';
import type { Component } from 'vue';
import { computed } from 'vue';

interface TabItem {
  value: string | number;
  component?: Component;
  icon?: string;
}

interface TabCategories {
  [categoryName: string]: TabItem;
}

interface Props {
  tabs: TabCategories;
  variant?: 'underline' | 'inner';
  size?: Extract<ComponentSize, 'lg' | 'md'>;
  underline?: boolean;
  hasBackground?: boolean;
  ariaLabel?: string;
}

// 현재 선택된 탭
const selectedTab = defineModel<string | number>({
  default: '',
});

const props = withDefaults(defineProps<Props>(), {
  tabs: () => ({}),
  variant: 'underline',
  underline: false,
  hasBackground: false,
  size: 'lg',
  ariaLabel: '탭 목록',
});

const tabEntries = computed(() => Object.entries(props.tabs));

// 탭 변경 핸들러
const handleTabChange = (index: number) => {
  const [, tab] = tabEntries.value[index] || [];
  if (tab) {
    selectedTab.value = tab.value;
  }
};
</script>

<template>
  <div>
    <TabGroup as="div" @change="handleTabChange">
      <TabList class="flex items-center" :aria-label="ariaLabel">
        <BaseTabList
          :tabs="tabs"
          :size="size"
          :variant="variant"
          :underline="underline"
          :hasBackground="hasBackground"
        />
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(tabItem, tabKey) in tabs"
          :key="tabKey"
          :class="['rounded-xl bg-white p-3']"
          role="tabpanel"
          :tabindex="0"
        >
          <component v-if="tabItem.component" :is="tabItem.component" />
          <div v-else class="text-center text-gray-500">탭 컨텐츠가 없습니다.</div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
