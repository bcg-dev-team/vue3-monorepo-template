<template>
  <div class="gap-size-8 p-padding-24 flex items-end">
    <div class="gap-size-36 flex">
      <LabelContent label="계좌번호" size="md">
        <template #content>
          <BaseInput size="sm" placeholder="input select 들어올 예정" />
        </template>
      </LabelContent>
      <LabelContent label="청산일자" size="md">
        <template #content>
          <div class="gap-size-4 flex items-center">
            <BaseInput size="sm" placeholder="input select 들어올 예정" />
            <BaseTabs v-model="orderDate" :tabs="orderDateTypes" size="sm" variant="inner" />
          </div>
        </template>
      </LabelContent>
    </div>
    <div>
      <BaseButton variant="contained" label="조회하기" size="sm" />
    </div>
  </div>
</template>
<script setup lang="ts">
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseInput, BaseButton, BaseTabs } from '@template/ui';
import { ref } from 'vue';

const orderDate = ref('all');

const orderDateTypes = {
  오늘: {
    value: 'today',
  },
  일주일: {
    value: 'week',
  },
  '30일': {
    value: 'month',
  },
  전체: {
    value: 'all',
  },
};
</script>
