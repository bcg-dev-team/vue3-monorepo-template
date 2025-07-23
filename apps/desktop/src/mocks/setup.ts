import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './node';

/**
 * 테스트 환경에서 MSW 설정
 * 공식문서: https://mswjs.io/docs/quick-start
 */

// 모든 테스트 전에 서버 시작
beforeAll(() => {
  server.listen();
  console.log('🧪 테스트용 MSW 서버가 시작되었습니다.');
});

// 각 테스트 후에 핸들러 초기화
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 후에 서버 종료
afterAll(() => {
  server.close();
  console.log('🧪 테스트용 MSW 서버가 종료되었습니다.');
});
