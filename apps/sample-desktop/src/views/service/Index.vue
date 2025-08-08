<template>
  <div class="mx-auto w-[1440px] py-4">
    <MainCardContent class="p-6" title="고객지원" size="large">
      <template #content>
        <div>
          <BaseTabs
            direction="horizontal"
            v-model="modelValue"
            showContent
            size="md"
            variant="connected"
            :tabs="tabs"
          />
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import Notice from '@/components/service/Notice.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('tab1');
const tabs = [
  { value: 'tab1', label: '공지사항', content: Notice },
  { value: 'tab2', label: '이벤트', content: 'dd' },
  { value: 'tab3', label: '1:1 문의' },
  { value: 'tab4', label: '자주 묻는 질문' },
  { value: 'tab5', label: '이용가이드' },
];
</script>
