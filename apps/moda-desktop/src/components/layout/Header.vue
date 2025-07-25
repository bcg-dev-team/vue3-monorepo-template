<template>
  <header
    class="fixed flex justify-between items-center top-0 left-0 right-0 z-[100000] pl-3 pr-6 py-[10px] bg-black sticky"
  >
    <div class="flex items-center shrink-0">
      <div class="mr-9">
        <img class="h-10 w-auto" src="@/assets/logo/moda_logo.svg" alt="logo" />
      </div>
      <NavBar />
    </div>

    <div class="header-right">
      <StatusBarArea v-if="isLogin" />
      <LoginButtonArea v-else />
      <slot name="header-right" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LoginButtonArea from '@/components/layout/fragments/LoginButtonArea.vue';
import StatusBarArea from '@/components/layout/fragments/StatusBarArea.vue';
import NavBar from '@/components/layout/fragments/NavBar.vue';
import { ref } from 'vue';

const isLogin = ref(true);
</script>
