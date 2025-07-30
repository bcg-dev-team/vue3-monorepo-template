<template>
  <div id="app" class="flex min-h-screen flex-col">
    <component :is="route.meta.layout || NoneLayout">
      <router-view />
    </component>
  </div>
</template>

<script setup lang="ts">
import NoneLayout from './components/layout/fragments/NoneLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
