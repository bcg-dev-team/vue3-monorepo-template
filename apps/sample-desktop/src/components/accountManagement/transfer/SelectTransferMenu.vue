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
      @click="handleMenuClick(menu)"
    />
  </div>
</template>

<script setup lang="ts">
import TransferMenuButton from '@/components/accountManagement/transfer/TransferMenuButton.vue';
import type { TransferMenuItem } from '@/components/accountManagement/accountManagement';

const props = defineProps<{
  menuList: Array<TransferMenuItem>;
}>();

const emit = defineEmits<{
  (e: 'menuClick', menu: TransferMenuItem): void;
}>();

/**
 * 메뉴 클릭 시 이벤트 발생
 */
const handleMenuClick = (menu: TransferMenuItem) => {
  emit('menuClick', menu);
};
</script>
