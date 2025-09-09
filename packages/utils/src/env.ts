/**
 * 환경 감지 유틸리티
 * 애플리케이션 전체에서 일관된 환경 감지를 제공합니다
 *
 * @author ygpark
 * @created-with Cursor AI
 */

/**
 * 현재 환경을 가져옵니다
 * @returns {string} 환경 이름 ('development', 'production', 'test', etc.)
 */
export function getEnvironment(): string {
  // 1. NODE_ENV 우선 확인
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  // 2. Vite 환경 변수 확인
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    const viteEnv = (import.meta as any).env;
    if (viteEnv.MODE) {
      return viteEnv.MODE;
    }
    if (viteEnv.DEV !== undefined) {
      return viteEnv.DEV ? 'development' : 'production';
    }
  }

  // 3. 기본값은 production
  return 'production';
}

/**
 * 현재 환경이 개발 환경인지 확인합니다
 * @returns {boolean} 개발 환경이면 true
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * 현재 환경이 프로덕션 환경인지 확인합니다
 * @returns {boolean} 프로덕션 환경이면 true
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * 현재 환경이 테스트 환경인지 확인합니다
 * @returns {boolean} 테스트 환경이면 true
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}

/**
 * 환경 정보 객체를 가져옵니다
 * @returns {Object} 환경 정보
 */
export function getEnvironmentInfo() {
  const env = getEnvironment();

  return {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test',
    nodeEnv: typeof process !== 'undefined' ? process.env?.NODE_ENV : undefined,
    viteMode: typeof import.meta !== 'undefined' ? (import.meta as any).env?.MODE : undefined,
    viteDev: typeof import.meta !== 'undefined' ? (import.meta as any).env?.DEV : undefined,
  };
}

// Default export
export default {
  getEnvironment,
  isDevelopment,
  isProduction,
  isTest,
  getEnvironmentInfo,
};
