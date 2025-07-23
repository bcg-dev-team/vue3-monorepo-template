import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Node.js 환경에서 MSW 설정 (테스트용)
 * Node.js 환경에서 네트워크 요청을 가로채고 모킹합니다.
 */
export const server = setupServer(...handlers);
