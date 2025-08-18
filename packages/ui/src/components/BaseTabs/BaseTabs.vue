<script setup lang="ts">
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue';
import type { TabItem, TabVariant, TabsSize } from 'types/components';
import BaseTabList from './BaseTabList.vue';
import { computed } from 'vue';

interface Props {
  tabs: TabItem[];
  variant?: TabVariant;
  size?: TabsSize;
  underline?: boolean;
  hasBackground?: boolean;
  ariaLabel?: string;
}

// 현재 선택된 탭 key
const selectedTabKey = defineModel<string>({
  default: '',
});

const props = withDefaults(defineProps<Props>(), {
  tabs: () => ([]),
  variant: 'underline',
  underline: false,
  hasBackground: false,
  size: 'lg',
  ariaLabel: '탭 목록',
});

// 기본값 설정: 첫 번째 탭을 기본 선택
const defaultSelectedTabKey = computed(() => {
  if (props.tabs.length > 0 && !selectedTabKey.value) {
    return props.tabs[0].key;
  }
  return selectedTabKey.value;
});

// 현재 선택된 탭의 인덱스
const selectedTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.key === defaultSelectedTabKey.value);
});

// 탭 변경 핸들러
const handleTabChange = (index: number) => {
  const tab = props.tabs[index];
  if (tab && !tab.disabled) {
    selectedTabKey.value = tab.key;
  }
};
</script>

<template>
  <div>
    <TabGroup 
      as="div" 
      :selectedIndex="selectedTabIndex"
      @change="handleTabChange"
    >
      <TabList class="flex items-center" :aria-label="ariaLabel">
        <BaseTabList
          :tabs="tabs"
          :size="size"
          :variant="variant"
          :underline="underline"
          :hasBackground="hasBackground"
          :selectedTabKey="defaultSelectedTabKey"
        />
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="tabItem in tabs"
          :key="tabItem.key"
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
