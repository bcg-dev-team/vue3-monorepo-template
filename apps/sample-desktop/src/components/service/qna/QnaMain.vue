<template>
  <div class="gap-size-16 pb-padding-130 flex flex-col">
    <QnaRegister v-if="type === 'register'" v-model:type="type" />
    <QnaDetail v-else-if="type === 'detail'" v-model:type="type" />
    <QnaList v-else v-model:type="type" />
  </div>
</template>
<script setup lang="ts">
import QnaRegister from '@/components/service/qna/QnaRegister.vue';
import QnaDetail from '@/components/service/qna/QnaDetail.vue';
import QnaList from '@/components/service/qna/QnaList.vue';
import { ref } from 'vue';

const type = ref<'register' | 'detail' | null>(null);
</script>
