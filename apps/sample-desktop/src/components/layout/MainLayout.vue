<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>
<script lang="ts" setup>
import Header from '@/components/layout/fragments/Header.vue';
import Footer from '@/components/layout/fragments/Footer.vue';
</script>
