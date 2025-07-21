<template>
  <header
    class="fixed flex justify-between items-center top-0 left-0 right-0 z-[100000] pl-3 pr-6 py-[10px] bg-black"
  >
    <div class="flex items-center shrink-0">
      <div class="mr-9">
        <img class="h-10 w-auto" src="../../assets/logo/moda_logo.svg" alt="logo" />
      </div>
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
    </div>

    <div class="header-right">
      <slot name="header-right" />
    </div>
  </header>
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
