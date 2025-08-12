<template>
  <div class="mx-auto w-[1440px] py-4">
    <MainCardContent class="p-6" title="고객지원" size="lg">
      <template #content>
        <div>
          <BaseTabs variant="underline" size="lg" :tabs="tabs" v-model="selectedTab" />
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import UserGuide from '@/components/service/guide/UserGuide.vue';
import Notice from '@/components/service/notice/Notice.vue';
import Event from '@/components/service/event/Event.vue';
import QnA from '@/components/service/qna/QnaMain.vue';
import Faq from '@/components/service/faq/Faq.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const selectedTab = ref('notice');

const tabs = {
  공지사항: {
    value: 'notice',
    component: Notice,
  },
  이벤트: {
    value: 'event',
    component: Event,
  },
  '1:1 문의': {
    value: 'qna',
    component: QnA,
  },
  '자주 묻는 질문': {
    value: 'faq',
    component: Faq,
  },
  이용가이드: {
    value: 'guide',
    component: UserGuide,
  },
};
</script>
