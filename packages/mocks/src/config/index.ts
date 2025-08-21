/**
 * MSW 모킹 설정
 */

export const mockConfig = {
  enabled: (import.meta as any)?.env?.DEV === true,
  delay: 100,
  onUnhandledRequest: 'warn' as const,
};
