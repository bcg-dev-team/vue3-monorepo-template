import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';

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

export const commonAlias = {
  '@template/ui': path.resolve(__dirname, '../../packages/ui/src'),
  '@template/types': path.resolve(__dirname, '../../packages/types/src'),
  '@template/utils': path.resolve(__dirname, '../../packages/utils/src'),
  '@template/api': path.resolve(__dirname, '../../packages/api/src'),
};
