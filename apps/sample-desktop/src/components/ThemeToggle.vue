<template>
  <div class="theme-toggle">
    <BaseButton
      :variant="themeStore.isDark ? 'outlined' : 'contained'"
      :color="themeStore.isDark ? 'grey' : 'primary'"
      size="sm"
      :label="themeStore.isDark ? '라이트' : '다크'"
      :left-icon="{
        name: 'star',
        size: 'sm',
        color: 'current',
      }"
      @click="themeStore.toggleTheme"
    />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@template/theme';
import { BaseButton } from '@template/ui';

const themeStore = useThemeStore();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
