<template>
  <div class="gap-size-8 p-padding-24 flex items-end">
    <div class="gap-size-36 flex">
      <LabelContent label="계좌번호" size="md">
        <template #content>
          <BaseInput size="sm" placeholder="input select 들어올 예정" />
        </template>
      </LabelContent>
      <LabelContent label="결제 일자" size="md">
        <template #content>
          <div class="gap-size-4 flex items-center">
            <div>
              <BaseInput size="sm" placeholder="input select 들어올 예정" />
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
import { BaseInput, BaseButton, BaseRadioGroup } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { ref } from 'vue';

const selectedType = ref('today');
</script>
