<template>
  <div class="mx-auto w-[1920px] py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="내 자산" size="lg">
        <template #content>
          <div>
            <div></div>
          </div>
        </template>
      </MainCardContent>
      <CardLayoutHorizontal :columns="[4, 1]" gap="gap-3">
        <MainCardContent class="p-6">
          <template #content>
            <div>
              보유 포지션
              <div></div>
            </div>
          </template>
        </MainCardContent>
        <MainCardContent class="p-6">
          <template #content>
            <div>
              자산구성
              <div></div>
            </div>
          </template>
        </MainCardContent>
      </CardLayoutHorizontal>

      <MainCardContent class="p-6" size="lg">
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
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
</script>
