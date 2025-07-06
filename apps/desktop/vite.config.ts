import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@template/ui': resolve(__dirname, '../../packages/ui/src'),
      '@template/types': resolve(__dirname, '../../packages/types/src'),
      '@template/utils': resolve(__dirname, '../../packages/utils/src'),
      '@template/api': resolve(__dirname, '../../packages/api/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
