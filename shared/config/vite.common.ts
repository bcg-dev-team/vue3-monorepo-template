import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * 공통 Vite 설정
 * 모든 앱에서 공유할 수 있는 기본 설정
 */
export const createCommonConfig = () => {
  return {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
    },
  };
};
