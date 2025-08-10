import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import baseConfig from './vite.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    mode: 'production',
    build: {
      minify: 'esbuild',
      sourcemap: false,
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
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    },
  })
); 