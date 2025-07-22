<template>
  <nav class="flex items-center gap-9">
    <router-link
      v-for="menu in navMenus"
      :key="menu.id"
      :to="menu.to"
      class="text-white decoration-none text-lg font-semibold whitespace-nowrap"
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
  { id: 'order', text: '주문', to: '/packages' },
  { id: 'trade', text: '거래', to: '/development' },
  { id: 'assets', text: '자산', to: '/components' },
  { id: 'withdrawal', text: '출금신청', to: '/api-examples' },
  { id: 'support', text: '고객지원', to: '/theme-test' },
];
</script>
