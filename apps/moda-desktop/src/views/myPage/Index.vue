<template>
  <div class="px-[240px] py-4">
    <CardLayoutHorizontal class="grid-cols-10 gap-6">
      <CardLayoutVertical class="col-span-2 gap-3">
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[100px]">내정보</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2">
          <template #content>
            <div class="my-[220px]">공지사항</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2">
          <template #content>
            <div class="my-[220px]">빠른실행</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical class="col-span-5 gap-3">
        <MainCardContent class="row-span-2">
          <template #content>
            <div class="my-[220px]">개요|활동내역</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[180px]">현재 포지션</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[180px]">시장 뉴스</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical class="col-span-3 gap-3">
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[100px]">공지사항</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[100px]">자주 묻는 질문</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[80px]">이번주 성과</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="my-[100px]">도움이 필요하세요?</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
    </CardLayoutHorizontal>
  </div>
</template>

<script setup lang="ts">
import MainCardContent from '@/components/ui/cards/MainCardContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
</script>
