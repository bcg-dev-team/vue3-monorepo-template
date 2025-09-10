<template>
  <div class="gap-size-8 p-padding-24 flex items-end">
    <div class="gap-size-36 flex">
      <LabelContent label="계좌번호" size="md">
        <template #content>
          <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
        </template>
      </LabelContent>
      <LabelContent label="청산일자" size="md">
        <template #content>
          <div class="gap-size-4 flex items-center">
            <div>
              <BaseInputCalendar size="sm" />
            </div>
            <div>
              <BaseRadioGroup
                v-model="selectedType"
                size="md"
                :options="[
                  { value: 'today', label: '오늘' },
                  { value: 'weeks', label: '일주일' },
                  { value: 'months', label: '30일' },
                ]"
              />
            </div>
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
import { BaseInputSelect, BaseButton, BaseRadioGroup, BaseInputCalendar } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { ref } from 'vue';

const selectedAccount = ref('');
const accountOptions = [
  { value: 'account1', label: '라이브계좌#1 110-81-345150' },
  { value: 'account2', label: '라이브계좌#2 110-81-345151' },
  { value: 'account3', label: '데모계좌#1 110-81-345152' },
];

const selectedType = ref('today');
</script>
