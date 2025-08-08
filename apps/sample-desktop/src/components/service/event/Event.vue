<template>
  <div class="gap-size-64 flex">
    <div class="min-w-[500px]">
      <div class="gap-size-4 flex items-center">
        <BaseTabs
          direction="horizontal"
          v-model="modelValue"
          showContent
          size="md"
          variant="connected"
          :tabs="tabs"
        />
      </div>
    </div>
    <div
      class="bg-bg-bg-innerframe border-bg-bg-outline px-padding-48 py-padding-24 min-h-[794px] w-full rounded-[10px] border"
    >
      <div class="py-padding-16 gap-size-12 flex flex-col border-b">
        <div class="gap-size-12 flex items-center">
          <BaseChip label="업무공지" size="md" variant="grey" />
          <span class="text-font-13 text-default-muted">2025.05.26</span>
        </div>
        <div>
          <span class="text-font-18 font-medium"
            >신용공여종목군 및 위탁증거금률 변경 안내(현대건설 외 3종목)</span
          >
        </div>
      </div>
      <div class="py-padding-36">내용 영역</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseChip, BaseTabs } from '@template/ui';

import { ref } from 'vue';

const modelValue = ref('inProgress');
const tabs = [
  { value: 'inProgress', label: '진행중' },
  { value: 'end', label: '종료' },
  { value: 'all', label: '전체' },
];
</script>
