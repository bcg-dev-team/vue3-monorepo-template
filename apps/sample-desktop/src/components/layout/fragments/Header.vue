<template>
  <header class="fixed sticky left-0 right-0 top-0 z-[100] min-w-[1920px] bg-black">
    <div class="mx-auto flex w-[1920px] items-center justify-between py-[10px] pl-3 pr-6">
      <div class="flex shrink-0 items-center">
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
    </div>
  </header>
</template>

<script setup lang="ts">
import LoginButtonArea from '@/components/layout/fragments/LoginButtonArea.vue';
import StatusBarArea from '@/components/layout/fragments/StatusBarArea.vue';
import NavBar from '@/components/layout/fragments/NavBar.vue';
import { ref } from 'vue';

const isLogin = ref(false);
</script>
