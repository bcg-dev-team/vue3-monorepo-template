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
import Notice from '@/components/service/notice/Notice.vue';
import Event from '@/components/service/event/Event.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('notice');
const tabs = [
  { value: 'notice', label: '공지사항', content: Notice },
  { value: 'event', label: '이벤트', content: Event },
  { value: 'qna', label: '1:1 문의' },
  { value: 'faq', label: '자주 묻는 질문' },
  { value: 'guide', label: '이용가이드' },
];
</script>
