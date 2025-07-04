import { ref, computed, readonly } from 'vue';

/**
 * 모달 상태 타입 정의
 */
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
  data?: unknown;
}

/**
 * 모달 관리를 위한 composable
 *
 * @param initialState - 초기 모달 상태
 * @returns 모달 상태와 관련 메서드들
 */
export function useModal(initialState: Partial<ModalState> = {}) {
  const modalState = ref<ModalState>({
    isOpen: false,
    title: '',
    content: '',
    data: undefined,
    ...initialState,
  });

  /**
   * 모달 열기
   * @param options - 모달 옵션
   */
  const openModal = (options: Partial<ModalState> = {}) => {
    modalState.value = {
      ...modalState.value,
      ...options,
      isOpen: true,
    };
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    modalState.value.isOpen = false;
  };

  /**
   * 모달 토글
   */
  const toggleModal = () => {
    modalState.value.isOpen = !modalState.value.isOpen;
  };

  /**
   * 모달 내용 업데이트
   * @param content - 새로운 내용
   */
  const updateContent = (content: string) => {
    modalState.value.content = content;
  };

  /**
   * 모달 제목 업데이트
   * @param title - 새로운 제목
   */
  const updateTitle = (title: string) => {
    modalState.value.title = title;
  };

  /**
   * 모달 데이터 업데이트
   * @param data - 새로운 데이터
   */
  const updateData = (data: unknown) => {
    modalState.value.data = data;
  };

  /**
   * 모달 완전 초기화
   */
  const resetModal = () => {
    modalState.value = {
      isOpen: false,
      title: '',
      content: '',
      data: undefined,
    };
  };

  return {
    modalState: readonly(modalState),
    isOpen: computed(() => modalState.value.isOpen),
    title: computed(() => modalState.value.title),
    content: computed(() => modalState.value.content),
    data: computed(() => modalState.value.data),
    openModal,
    closeModal,
    toggleModal,
    updateContent,
    updateTitle,
    updateData,
    resetModal,
  };
}
