<template>
  <div class="px-6 py-4">
    <CardLayoutVertical class="gap-3">
      <MainCardContent class="p-6" title="내 자산" size="large">
        <template #content>
          <div>
            <div></div>
          </div>
        </template>
      </MainCardContent>
      <CardLayoutHorizontal class="grid-cols-5 gap-3">
        <MainCardContent class="col-span-4 p-6">
          <template #content>
            <div>
              보유 포지션
              <div></div>
            </div>
          </template>
        </MainCardContent>
        <MainCardContent class="col-span-1 p-6">
          <template #content>
            <div>
              자산구성
              <div></div>
            </div>
          </template>
        </MainCardContent>
      </CardLayoutHorizontal>

      <MainCardContent class="p-6" size="large">
        <template #content>
          <div>
            증거금 내역
            <div></div>
          </div>
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
</script>
