<template>
  <div class="px-6 py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="large">
        <template #content>
          <div>
            <div></div>
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="large">
        <template #content>
          <div>
            요약
            <div></div>
            상세내역
          </div>
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
</script>
