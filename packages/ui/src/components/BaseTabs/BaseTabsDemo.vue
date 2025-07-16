<!--
  BaseTabs 컴포넌트 사용 예시
  - Figma 디자인에 맞는 탭 컴포넌트 데모
-->
<script setup lang="ts">
import { ref } from 'vue';
import BaseTabs from './BaseTabs.vue';

const selectedTab = ref('tab1');

const tabs = [
  { value: 'tab1', label: '첫 번째 탭' },
  { value: 'tab2', label: '두 번째 탭' },
  { value: 'tab3', label: '세 번째 탭' },
  { value: 'tab4', label: '마지막 탭' },
];

const disabledTabs = [
  { value: 'tab1', label: '첫 번째 탭' },
  { value: 'tab2', label: '두 번째 탭', disabled: true },
  { value: 'tab3', label: '세 번째 탭' },
  { value: 'tab4', label: '마지막 탭' },
];

const handleTabChange = (value: string | number) => {
  selectedTab.value = String(value);
  console.log('선택된 탭:', value);
};
</script>

<template>
  <div class="space-y-8 p-6">
    <div>
      <h2 class="text-lg font-semibold mb-4">기본 탭</h2>
      <BaseTabs :tabs="tabs" v-model="selectedTab" @tab-click="handleTabChange" />
      <div class="mt-4 p-4 bg-gray-50 rounded-lg">
        <p>선택된 탭: {{ selectedTab }}</p>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">비활성화된 탭 포함</h2>
      <BaseTabs :tabs="disabledTabs" v-model="selectedTab" @tab-click="handleTabChange" />
      <div class="mt-4 p-4 bg-gray-50 rounded-lg">
        <p>선택된 탭: {{ selectedTab }}</p>
        <p class="text-sm text-gray-600">두 번째 탭은 비활성화되어 있습니다.</p>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">세로 방향</h2>
      <BaseTabs
        :tabs="tabs"
        v-model="selectedTab"
        direction="vertical"
        @tab-click="handleTabChange"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">다양한 크기</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Small Size</h3>
          <BaseTabs :tabs="tabs" v-model="selectedTab" size="sm" @tab-click="handleTabChange" />
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Medium Size (Default)</h3>
          <BaseTabs :tabs="tabs" v-model="selectedTab" size="md" @tab-click="handleTabChange" />
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Large Size</h3>
          <BaseTabs :tabs="tabs" v-model="selectedTab" size="lg" @tab-click="handleTabChange" />
        </div>
      </div>
    </div>
  </div>
</template>
