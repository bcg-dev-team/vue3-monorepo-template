import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
      defaultImport: 'component',
    }),
    // 개발 시에는 타입 생성 비활성화
    ...(process.env.NODE_ENV === 'production' ? [
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
        outDir: 'dist',
        include: ['src/**/*'],
        exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts'],
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['src/*'],
          },
        },
      })
    ] : []),
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
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      external: ['vue', '@template/types', '@template/theme'],
      output: {
        globals: {
          vue: 'Vue',
          '@template/types': 'TemplateTypes',
          '@template/theme': 'TemplateTheme',
        },
        exports: 'named',
        // 개발 시에만 preserveModules 활성화
        ...(process.env.NODE_ENV === 'development' ? {
          preserveModules: true,
          preserveModulesRoot: 'src',
        } : {}),
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || 'asset';
        },
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "sass:color";`,
      },
    },
  },
  define: {
    __VUE_OPTIONS_API__: process.env.NODE_ENV === 'development',
    __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV === 'development',
  },
}); 