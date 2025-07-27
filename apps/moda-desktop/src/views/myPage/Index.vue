<template>
  <div class="px-[240px] py-4">
    <CardLayoutHorizontal :columns="[330, 680, 382]" gap="gap-6">
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-1">
          <template #content>
            <UserInfo />
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2">
          <template #content>
            <UserAssetsInfo />
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2 p-6">
          <template #content>
            <div class="my-[220px]">빠른실행</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-2 p-6">
          <template #content>
            <div class="my-[220px]">개요|활동내역</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[180px]">현재 포지션</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[180px]">시장 뉴스</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[100px]">공지사항</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[100px]">자주 묻는 질문</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[80px]">이번주 성과</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[100px]">도움이 필요하세요?</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
    </CardLayoutHorizontal>
  </div>
</template>

<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import UserInfo from '@/components/mypage/UserInfo.vue';
import UserAssetsInfo from '@/components/mypage/UserAssetsInfo.vue';
</script>
