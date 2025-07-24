<template>
  <div class="px-[240px]">
    <div class="p-4">
      <CardLayoutVertical class="gap-3">
        <MainCardContent></MainCardContent>
        <CardLayoutHorizontal class="grid-cols-3 gap-3">
          <MainCardContent class="col-span-1" title="상위등락률">
            <template #title-right> :버튼: </template>
          </MainCardContent>
          <MainCardContent class="col-span-1" title="주요글로벌인덱스">
            <template #title-right> :버튼: </template>
          </MainCardContent>
          <MainCardContent class="col-span-1" title="해외뉴스">
            <template #title-right> :버튼: </template>
          </MainCardContent>
        </CardLayoutHorizontal>
        <MainCardContent title="쉽게 읽는 투자정보" :isLink="true"></MainCardContent>
      </CardLayoutVertical>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
</script>
