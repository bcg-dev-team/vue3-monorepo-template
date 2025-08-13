<template>
  <div class="gap-size-8 flex flex-col items-center justify-center">
    <span class="text-font-24 font-semibold">유형 선택</span>
    <span class="text-font-14 text-default-muted-dark">
      입금과 출금, 이체 중 원하는 유형을 선택해주세요
    </span>
  </div>
  <div class="gap-size-24 flex">
    <TransferMenuButton
      v-for="menu in props.menuList"
      :key="menu.title"
      :title="menu.title"
      :description="menu.description"
      :icon="menu.icon"
      :info="menu.info"
      :color="menu.color"
      @click="menu.click"
    />
  </div>
</template>

<script setup lang="ts">
import TransferMenuButton from '@/components/accountManagement/transfer/TransferMenuButton.vue';
import { type IconName } from '@template/ui';

const props = defineProps<{
  menuList: Array<{
    title: string;
    description: string;
    icon: IconName;
    info: Array<{ icon: IconName; text: string }>;
    color: 'blue' | 'green' | 'red';
    click: () => void;
  }>;
}>();
</script>
