<template>
  <Header />
  <main class="flex-1 bg-bg-surface min-w-[1920px] w-full">
    <div class="w-[1920px] mx-auto">
      <slot />
    </div>
  </main>

  <Footer />
</template>
<script lang="ts" setup>
import Header from '@/components/layout/fragments/Header.vue';
import Footer from '@/components/layout/fragments/Footer.vue';
</script>
