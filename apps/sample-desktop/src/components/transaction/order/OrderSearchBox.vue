<template>
  <div class="gap-size-8 p-padding-24 flex items-end">
    <div class="gap-size-36 flex">
      <LabelContent label="L/S" size="md">
        <template #content>
          <BaseRadioGroup
            v-model="selectedType"
            size="md"
            :options="[
              { value: 'all', label: '전체' },
              { value: 'long', label: 'LONG' },
              { value: 'short', label: 'SHORT' },
            ]"
          />
        </template>
      </LabelContent>
      <LabelContent label="구분" size="md">
        <template #content>
          <BaseRadioGroup
            v-model="selectedPosition"
            size="md"
            :options="[
              { value: 'all', label: '전체' },
              { value: 'buy', label: '매입' },
              { value: 'clear', label: '청산' },
            ]"
          />
        </template>
      </LabelContent>
      <LabelContent label="주문일자" size="md">
        <template #content>
          <div class="gap-size-4 flex items-center">
            <BaseInputCalendar v-model="selectedCalendar" />
            <BaseRadioGroup
              v-model="selectedDate"
              size="md"
              :options="[
                { value: 'today', label: '오늘' },
                { value: 'weeks', label: '일주일' },
                { value: 'months', label: '30일' },
              ]"
            />
          </div>
        </template>
      </LabelContent>
    </div>
    <div>
      <BaseButton variant="contained" label="조회하기" size="md" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseInputCalendar, BaseButton, BaseRadioGroup } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { ref } from 'vue';

const selectedType = ref('all');
const selectedPosition = ref('all');
const selectedDate = ref('today');
const selectedCalendar = ref('');
</script>
