import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateUI',
      fileName: 'index',
      formats: ['es'],
    },
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', '@template/types', 'naive-ui'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          'naive-ui': 'naive',
        },
        exports: 'named',
        preserveModules: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
