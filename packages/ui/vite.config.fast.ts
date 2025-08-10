import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateUI',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    target: 'esnext',
    minify: false, // 개발용으로는 압축 비활성화
    sourcemap: false, // 소스맵 비활성화
    rollupOptions: {
      external: ['vue', '@template/types', '@template/theme'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          '@template/theme': 'TemplateTheme',
        },
        exports: 'named',
        // 단일 번들로 생성
        preserveModules: false,
      },
    },
    cssCodeSplit: false,
    outDir: 'dist',
    assetsDir: '.',
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}); 