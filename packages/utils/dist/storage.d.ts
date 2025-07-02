/**
 * 로컬 스토리지에 데이터 저장
 */
export declare function setLocalStorage<T>(key: string, value: T): void;
/**
 * 로컬 스토리지에서 데이터 가져오기
 */
export declare function getLocalStorage<T>(key: string, defaultValue?: T): T | null;
/**
 * 로컬 스토리지에서 데이터 삭제
 */
export declare function removeLocalStorage(key: string): void;
/**
 * 로컬 스토리지 전체 삭제
 */
export declare function clearLocalStorage(): void;
/**
 * 세션 스토리지에 데이터 저장
 */
export declare function setSessionStorage<T>(key: string, value: T): void;
/**
 * 세션 스토리지에서 데이터 가져오기
 */
export declare function getSessionStorage<T>(key: string, defaultValue?: T): T | null;
/**
 * 세션 스토리지에서 데이터 삭제
 */
export declare function removeSessionStorage(key: string): void;
/**
 * 세션 스토리지 전체 삭제
 */
export declare function clearSessionStorage(): void;
/**
 * 쿠키에 데이터 저장
 */
export declare function setCookie(name: string, value: string, days?: number, path?: string): void;
/**
 * 쿠키에서 데이터 가져오기
 */
export declare function getCookie(name: string): string | null;
/**
 * 쿠키에서 데이터 삭제
 */
export declare function removeCookie(name: string, path?: string): void;
/**
 * 스토리지 사용량 확인
 */
export declare function getStorageUsage(): {
    localStorage: number;
    sessionStorage: number;
    total: number;
};
/**
 * 스토리지 키 목록 가져오기
 */
export declare function getStorageKeys(storage?: 'local' | 'session'): string[];
//# sourceMappingURL=storage.d.ts.map