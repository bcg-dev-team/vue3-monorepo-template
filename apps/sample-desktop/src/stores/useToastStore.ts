import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

interface ToastProps {
  message: string;
  duration?: number;
  show?: boolean;
}

/**
 * 토스트 메시지 큐 관리 스토어
 * 여러 토스트 메시지를 순차적으로 표시하기 위한 상태 관리
 */
export const useToastStore = defineStore('toast', () => {
  /**
   * 토스트 메시지 큐
   */
  const messageQueue = reactive<ToastProps[]>([]);

  /**
   * 현재 표시할 토스트 메시지
   */
  const currentToast = computed(() => messageQueue[0] || null);

  /**
   * 토스트 메시지를 큐에 추가
   * @param message - 표시할 메시지
   * @param duration - 표시 지속 시간 (기본값: 1200ms)
   */
  const addToast = (message: string, duration: number = 1200): void => {
    messageQueue.push({
      message,
      duration,
      show: true,
    });
  };

  /**
   * 현재 토스트 메시지를 큐에서 제거
   */
  const removeCurrentToast = (): void => {
    if (messageQueue.length > 0) {
      messageQueue.shift();
    }
  };

  /**
   * 모든 토스트 메시지 큐 초기화
   */
  const clearToastQueue = (): void => {
    messageQueue.splice(0, messageQueue.length);
  };

  return {
    messageQueue,
    currentToast,
    addToast,
    removeCurrentToast,
    clearToastQueue,
  };
});
