<template>
  <nav class="flex items-center gap-9">
    <router-link
      v-for="menu in navMenus"
      :key="menu.id"
      :to="menu.to"
      class="decoration-none whitespace-nowrap text-lg font-semibold text-white"
      :class="{ '!text-primary': $route.path === menu.to }"
    >
      {{ menu.text }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
interface NavMenu {
  id: string;
  text: string;
  to: string;
}

const navMenus: NavMenu[] = [
  { id: 'home', text: '홈', to: '/' },
  { id: 'order', text: '주문', to: '/order' },
  { id: 'trade', text: '거래', to: '/transaction' },
  { id: 'assets', text: '자산', to: '/assets' },
  { id: 'withdrawal', text: '출금신청', to: '/withdrawal' },
  { id: 'support', text: '고객지원', to: '/service' },
];
</script>
