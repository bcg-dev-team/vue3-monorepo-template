import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { commonAlias } from '../../shared/config/vite.common';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        ...commonAlias,
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/posts': {
          target: env.VITE_EXAMPLE_URL,
          changeOrigin: true,
        },
      },
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
        sourcemap: true,
    },  
  };
});
