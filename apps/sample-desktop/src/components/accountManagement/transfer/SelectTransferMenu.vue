<template>
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
