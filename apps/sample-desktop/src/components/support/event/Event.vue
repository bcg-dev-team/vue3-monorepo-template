<template>
  <div class="gap-size-64 flex">
    <div class="min-w-[500px]">
      <div class="gap-size-4 flex items-center">
        <BaseTabs variant="inner" :tabs="tabs" v-model="selectedTab" />
      </div>
    </div>
    <SupportDetail
      :chip="{ label: '이벤트', variant: 'grey' }"
      date="2025.05.01 ~ 2025.05.31"
      title="2025 해외선물옵션 환전우대 이벤트!"
      content="(이벤트 이미지 출력)"
    />
  </div>
</template>

<script setup lang="ts">
import SupportDetail from '@/components/support/common/SupportDetail.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const selectedTab = ref('inProgress');

const tabs = [
  {
    key: 'inProgress',
    label: '진행중',
  },
  {
    key: 'end',
    label: '종료',
  },
  {
    key: 'all',
    label: '전체',
  },
];
</script>
