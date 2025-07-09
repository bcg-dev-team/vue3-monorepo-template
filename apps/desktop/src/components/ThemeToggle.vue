<template>
  <div class="theme-toggle">
    <NButton
      :type="themeStore.isDark ? 'default' : 'primary'"
      size="small"
      @click="themeStore.toggleTheme"
    >
      <template #icon>
        <NIcon>
          <SunIcon v-if="themeStore.isDark" />
          <MoonIcon v-else />
        </NIcon>
      </template>
      {{ themeStore.isDark ? '라이트' : '다크' }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { useThemeStore } from '@template/theme';

// 간단한 아이콘 컴포넌트들
const SunIcon = () =>
  h(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
    },
    [
      h('circle', { cx: '12', cy: '12', r: '5' }),
      h('line', { x1: '12', y1: '1', x2: '12', y2: '3' }),
      h('line', { x1: '12', y1: '21', x2: '12', y2: '23' }),
      h('line', { x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64' }),
      h('line', { x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78' }),
      h('line', { x1: '1', y1: '12', x2: '3', y2: '12' }),
      h('line', { x1: '21', y1: '12', x2: '23', y2: '12' }),
      h('line', { x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36' }),
      h('line', { x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22' }),
    ]
  );

const MoonIcon = () =>
  h(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
    },
    [h('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })]
  );

const themeStore = useThemeStore();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
