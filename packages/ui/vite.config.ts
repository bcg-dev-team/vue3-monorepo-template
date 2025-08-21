import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
      defaultImport: 'component',
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: false, // 순환참조 방지를 위해 false로 변경
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateUI',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', '@template/types', '@template/theme'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          '@template/theme': 'TemplateTheme',
        },
        exports: 'named',
        preserveModules: true,
      },
    },
    cssCodeSplit: false,
    outDir: 'dist',
    assetsDir: '.',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
