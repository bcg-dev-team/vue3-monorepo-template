<template>
  <div class="p-6">
    <div class="text-lg font-bold">공지사항</div>
    <div class="border-l-4 pl-6 pr-4 mt-6 border-button-primary-border">
      <div>
        <span class="text-md font-regular">총 자산</span>
      </div>
      <div>
        <span class="text-2xl font-bold">$125,847.32</span>
      </div>
    </div>
    <div class="border-l-4 pl-6 pr-4 mt-6 border-button-red-border">
      <div>
        <span class="text-md font-regular">오늘 손익</span>
      </div>
      <div>
        <span class="text-2xl font-bold text-trade-buy">+$1,847.32</span>
      </div>
    </div>
    <div class="mt-6 flex flex-col gap-3">
      <div class="py-3 px-4 bg-bg-innerframe rounded-md flex items-center justify-between">
        <span class="text-md font-regular text-divider-muted">총 손익</span>
        <span class="text-md font-semibold">+$23,456.78</span>
      </div>
      <div class="py-3 px-4 bg-bg-innerframe rounded-md flex items-center justify-between">
        <span class="text-md font-regular text-divider-muted">승률</span>
        <span class="text-md font-semibold">68.5%</span>
      </div>
      <div class="py-3 px-4 bg-bg-innerframe rounded-md flex items-center justify-between">
        <span class="text-md font-regular text-divider-muted">총 거래</span>
        <span class="text-md font-semibold">1,257 건</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
