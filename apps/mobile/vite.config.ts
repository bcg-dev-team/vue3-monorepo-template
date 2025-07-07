import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { commonAlias } from '../../shared/config/vite.common';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      ...commonAlias,
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
