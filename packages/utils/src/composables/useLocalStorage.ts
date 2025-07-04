import { ref, watch, readonly, Ref } from 'vue';

/**
 * 로컬 스토리지 관리를 위한 composable
 *
 * @param key - 스토리지 키
 * @param defaultValue - 기본값
 * @returns 로컬 스토리지 상태와 관련 메서드들
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): {
  value: Ref<T>;
  update: (value: T) => void;
  reset: () => void;
  remove: () => void;
  has: () => boolean;
  read: () => T;
  write: (value: T) => void;
} {
  const stored = ref<T>(defaultValue);

  /**
   * 로컬 스토리지에서 값 읽기
   */
  const read = (): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  /**
   * 로컬 스토리지에 값 쓰기
   * @param value - 저장할 값
   */
  const write = (value: T): void => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  };

  /**
   * 로컬 스토리지에서 값 삭제
   */
  const remove = (): void => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  /**
   * 로컬 스토리지 값 존재 여부 확인
   */
  const has = (): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.warn(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  };

  /**
   * 로컬 스토리지 값 업데이트
   * @param value - 새로운 값
   */
  const update = (value: T): void => {
    stored.value = value;
    write(value);
  };

  /**
   * 로컬 스토리지 값 리셋
   */
  const reset = (): void => {
    stored.value = defaultValue;
    write(defaultValue);
  };

  // 초기값 읽기
  stored.value = read();

  // 값 변경 시 자동 저장
  watch(
    stored,
    (newValue) => {
      write(newValue as T);
    },
    { deep: true }
  );

  return {
    value: readonly(stored) as Ref<T>,
    update,
    reset,
    remove,
    has,
    read,
    write,
  };
}
