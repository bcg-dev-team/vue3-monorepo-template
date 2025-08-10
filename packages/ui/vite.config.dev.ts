import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import baseConfig from './vite.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    mode: 'development',
    build: {
      minify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue'],
            types: ['@template/types'],
            theme: ['@template/theme'],
          },
        },
      },
    },
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    },
  })
); 