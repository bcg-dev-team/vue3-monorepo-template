import { ref, computed, readonly } from 'vue';

/**
 * 팝업 상태 타입 정의
 */
export interface PopupStateExtended {
  isOpen: boolean;
  title?: string;
  content?: string;
  description?: string;
  data?: unknown;
  config?: PopupConfig;
}

/**
 * 팝업 설정 타입 정의
 */
export interface PopupConfig {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'confirm' | 'alert';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  actions?: PopupAction[];
  alertVariant?: 'success' | 'info' | 'warning' | 'error';
}

/**
 * 팝업 액션 타입 정의
 */
export interface PopupAction {
  label: string;
  variant?: 'contained' | 'outlined';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: {
    name: string;
    size?: 'lg' | 'md' | 'sm';
    color?: string;
  };
  rightIcon?: {
    name: string;
    size?: 'lg' | 'md' | 'sm';
    color?: string;
  };
}

/**
 * 팝업 관리를 위한 composable
 * 
 * @param initialState - 초기 팝업 상태
 * @returns 팝업 상태와 관련 메서드들
 */
export function usePopup(initialState: Partial<PopupStateExtended> = {}) {
  const popupState = ref<PopupStateExtended>({
    isOpen: false,
    title: '',
    content: '',
    description: '',
    data: undefined,
    config: {
      size: 'md',
      variant: 'default',
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showCloseButton: true,
      actions: [],
    },
    ...initialState,
  });

  /**
   * 팝업 열기
   * @param options - 팝업 옵션
   */
  const openPopup = (options: Partial<PopupStateExtended> = {}) => {
    popupState.value = {
      ...popupState.value,
      ...options,
      isOpen: true,
    };
  };

  /**
   * 팝업 닫기
   */
  const closePopup = () => {
    popupState.value.isOpen = false;
  };

  /**
   * 팝업 토글
   */
  const togglePopup = () => {
    popupState.value.isOpen = !popupState.value.isOpen;
  };

  /**
   * 팝업 내용 업데이트
   * @param content - 새로운 내용
   */
  const updateContent = (content: string) => {
    popupState.value.content = content;
  };

  /**
   * 팝업 제목 업데이트
   * @param title - 새로운 제목
   */
  const updateTitle = (title: string) => {
    popupState.value.title = title;
  };

  /**
   * 팝업 설명 업데이트
   * @param description - 새로운 설명
   */
  const updateDescription = (description: string) => {
    popupState.value.description = description;
  };

  /**
   * 팝업 데이터 업데이트
   * @param data - 새로운 데이터
   */
  const updateData = (data: unknown) => {
    popupState.value.data = data;
  };

  /**
   * 팝업 설정 업데이트
   * @param config - 새로운 설정
   */
  const updateConfig = (config: Partial<PopupConfig>) => {
    popupState.value.config = {
      ...popupState.value.config,
      ...config,
    };
  };

  /**
   * 팝업 액션 업데이트
   * @param actions - 새로운 액션들
   */
  const updateActions = (actions: PopupAction[]) => {
    if (popupState.value.config) {
      popupState.value.config.actions = actions;
    }
  };

  /**
   * 확인 팝업 열기
   * @param options - 팝업 옵션
   */
  const openConfirmPopup = (options: {
    title?: string;
    content: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: PopupAction['variant'];
    cancelVariant?: PopupAction['variant'];
    size?: PopupConfig['size'];
  }) => {
    const {
      title = '확인',
      content,
      description,
      confirmText = '확인',
      cancelText = '취소',
      confirmVariant = 'contained',
      cancelVariant = 'outlined',
      size = 'md',
    } = options;

    const actions: PopupAction[] = [
      {
        label: cancelText,
        variant: cancelVariant,
        size: 'md',
      },
      {
        label: confirmText,
        variant: confirmVariant,
        size: 'md',
      },
    ];

    openPopup({
      title,
      content,
      description,
      config: {
        size,
        variant: 'confirm',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions,
      },
    });
  };

  /**
   * 알림 팝업 열기
   * @param options - 팝업 옵션
   */
  const openAlertPopup = (options: {
    title?: string;
    content: string;
    description?: string;
    variant: 'success' | 'info' | 'warning' | 'error';
    confirmText?: string;
    size?: PopupConfig['size'];
  }) => {
    const {
      title,
      content,
      description,
      variant,
      confirmText = '확인',
      size = 'md',
    } = options;

    const getButtonVariant = (alertVariant: string): PopupAction['variant'] => {
      switch (alertVariant) {
        case 'success':
          return 'contained';
        case 'info':
          return 'contained';
        case 'warning':
          return 'contained';
        case 'error':
          return 'contained';
        default:
          return 'contained';
      }
    };

    const actions: PopupAction[] = [
      {
        label: confirmText,
        variant: getButtonVariant(variant),
        size: 'md',
      },
    ];

    openPopup({
      title,
      content,
      description,
      config: {
        size,
        variant: 'alert',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions,
        alertVariant: variant,
      },
    });
  };

  /**
   * 팝업 완전 초기화
   */
  const resetPopup = () => {
    popupState.value = {
      isOpen: false,
      title: '',
      content: '',
      description: '',
      data: undefined,
      config: {
        size: 'md',
        variant: 'default',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions: [],
      },
    };
  };

  return {
    popupState: readonly(popupState),
    isOpen: computed(() => popupState.value.isOpen),
    title: computed(() => popupState.value.title),
    content: computed(() => popupState.value.content),
    description: computed(() => popupState.value.description),
    data: computed(() => popupState.value.data),
    config: computed(() => popupState.value.config),
    actions: computed(() => popupState.value.config?.actions || []),
    openPopup,
    closePopup,
    togglePopup,
    updateContent,
    updateTitle,
    updateDescription,
    updateData,
    updateConfig,
    updateActions,
    openConfirmPopup,
    openAlertPopup,
    resetPopup,
  };
} 