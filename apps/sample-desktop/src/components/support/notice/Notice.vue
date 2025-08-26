<template>
  <div class="gap-size-64 flex">
    <div class="min-w-[500px]">
      <div class="gap-size-4 flex items-center">
        <BaseInput placeholder="여긴 '셀렉트 박스'가 들어갈 거에요" />
        <BaseInput placeholder="검색어 입력 후 Enter" />
      </div>
    </div>
    <SupportDetail
      :chip="{ label: '업무공지', variant: 'grey' }"
      :date="'2025.05.26'"
      title="신용공여종목군 및 위탁증거금률 변경 안내(현대건설 외 3종목)"
      content="내용 영역"
    />
  </div>
</template>

<script setup lang="ts">
import SupportDetail from '@/components/support/common/SupportDetail.vue';
import { BaseInput } from '@template/ui';
</script>
