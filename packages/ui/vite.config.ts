import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
// import tailwindcss from '@tailwindcss/vite'; // 제거

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
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
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
