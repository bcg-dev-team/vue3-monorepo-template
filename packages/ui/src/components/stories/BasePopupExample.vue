<template>
  <div class="popup-example">
    <h2>BasePopup 사용 예시</h2>
    
    <div class="example-section">
      <h3>1. 기본 팝업</h3>
      <button @click="openDefaultPopup" class="example-button">
        기본 팝업 열기
      </button>
    </div>

    <div class="example-section">
      <h3>2. 확인 팝업</h3>
      <button @click="openConfirmPopup" class="example-button">
        확인 팝업 열기
      </button>
    </div>

    <div class="example-section">
      <h3>3. 알림 팝업</h3>
      <div class="alert-buttons">
        <button @click="openSuccessAlert" class="example-button success">
          성공 알림
        </button>
        <button @click="openErrorAlert" class="example-button error">
          오류 알림
        </button>
        <button @click="openWarningAlert" class="example-button warning">
          경고 알림
        </button>
        <button @click="openInfoAlert" class="example-button info">
          정보 알림
        </button>
      </div>
    </div>

    <div class="example-section">
      <h3>4. Composable 사용</h3>
      <button @click="openComposableConfirm" class="example-button">
        Composable 확인 팝업
      </button>
      <button @click="openComposableAlert" class="example-button">
        Composable 알림 팝업
      </button>
    </div>

    <!-- 기본 팝업 -->
    <BasePopup
      :is-open="defaultPopup.isOpen"
      :title="defaultPopup.title"
      :description="defaultPopup.description"
      :size="defaultPopup.size"
      @close="defaultPopup.isOpen = false"
    >
      <p>이것은 기본 팝업의 내용입니다.</p>
      <p>여러 줄의 텍스트를 포함할 수 있습니다.</p>
    </BasePopup>

    <!-- 확인 팝업 -->
    <BasePopup
      :is-open="confirmPopup.isOpen"
      :title="confirmPopup.title"
      :description="confirmPopup.description"
      :variant="confirmPopup.variant"
      :actions="confirmPopup.actions"
      @close="confirmPopup.isOpen = false"
      @action="handleConfirmAction"
    >
      {{ confirmPopup.content }}
    </BasePopup>

    <!-- 알림 팝업 -->
    <BasePopup
      :is-open="alertPopup.isOpen"
      :title="alertPopup.title"
      :description="alertPopup.description"
      :variant="alertPopup.variant"
      :alert-variant="alertPopup.alertVariant"
      :actions="alertPopup.actions"
      @close="alertPopup.isOpen = false"
      @action="handleAlertAction"
    >
      {{ alertPopup.content }}
    </BasePopup>

    <!-- Composable 팝업 -->
    <BasePopup
      :is-open="composablePopup.isOpen"
      :title="composablePopup.title"
      :description="composablePopup.description"
      :variant="composablePopup.variant"
      :alert-variant="composablePopup.alertVariant"
      :actions="composablePopup.actions"
      @close="closeComposablePopup"
      @action="handleComposableAction"
    >
      {{ composablePopup.content }}
    </BasePopup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import BasePopup from '../BasePopup/BasePopup.vue';
import { usePopup } from '../../composables/usePopup';

// 기본 팝업 상태
const defaultPopup = reactive({
  isOpen: false,
  title: '기본 팝업',
  description: '기본 팝업의 설명입니다.',
  size: 'md' as const,
});

// 확인 팝업 상태
const confirmPopup = reactive({
  isOpen: false,
  title: '확인',
  description: '작업을 확인하는 팝업입니다.',
  variant: 'confirm' as const,
  content: '정말로 이 작업을 수행하시겠습니까?',
  actions: [
    {
      label: '취소',
      variant: 'outline' as const,
      size: 'regular' as const,
    },
    {
      label: '확인',
      variant: 'primary' as const,
      size: 'regular' as const,
    },
  ],
});

// 알림 팝업 상태
const alertPopup = reactive({
  isOpen: false,
  title: '',
  description: '',
  variant: 'alert' as const,
  alertVariant: 'success' as const,
  content: '',
  actions: [
    {
      label: '확인',
      variant: 'primary' as const,
      size: 'regular' as const,
    },
  ],
});

// Composable 팝업
const { 
  isOpen: composablePopupIsOpen,
  title: composablePopupTitle,
  description: composablePopupDescription,
  config: composablePopupConfig,
  actions: composablePopupActions,
  openConfirmPopup: openComposableConfirmPopup,
  openAlertPopup: openComposableAlertPopup,
  closePopup: closeComposablePopup,
} = usePopup();

const composablePopup = reactive({
  isOpen: composablePopupIsOpen,
  title: composablePopupTitle,
  description: composablePopupDescription,
  variant: computed(() => composablePopupConfig.value?.variant || 'default'),
  alertVariant: computed(() => composablePopupConfig.value?.alertVariant || 'success'),
  actions: composablePopupActions,
  content: '',
});

// 팝업 열기 함수들
const openDefaultPopup = () => {
  defaultPopup.isOpen = true;
};

const openConfirmPopup = () => {
  confirmPopup.isOpen = true;
};

const openSuccessAlert = () => {
  alertPopup.title = '성공';
  alertPopup.description = '작업이 성공적으로 완료되었습니다.';
  alertPopup.alertVariant = 'success';
  alertPopup.content = '작업이 성공적으로 완료되었습니다.';
  (alertPopup.actions[0] as any).variant = 'green-solid';
  alertPopup.isOpen = true;
};

const openErrorAlert = () => {
  alertPopup.title = '오류';
  alertPopup.description = '작업 중 오류가 발생했습니다.';
  (alertPopup as any).alertVariant = 'error';
  alertPopup.content = '작업 중 오류가 발생했습니다.';
  (alertPopup.actions[0] as any).variant = 'red-solid';
  alertPopup.isOpen = true;
};

const openWarningAlert = () => {
  alertPopup.title = '경고';
  alertPopup.description = '주의가 필요한 작업입니다.';
  (alertPopup as any).alertVariant = 'warning';
  alertPopup.content = '주의가 필요한 작업입니다.';
  (alertPopup.actions[0] as any).variant = 'primary';
  alertPopup.isOpen = true;
};

const openInfoAlert = () => {
  alertPopup.title = '정보';
  alertPopup.description = '이것은 정보 알림입니다.';
  (alertPopup as any).alertVariant = 'info';
  alertPopup.content = '이것은 정보 알림입니다.';
  (alertPopup.actions[0] as any).variant = 'blue-solid';
  alertPopup.isOpen = true;
};

// Composable 팝업 열기
const openComposableConfirm = () => {
  openComposableConfirmPopup({
    title: 'Composable 확인',
    content: 'Composable을 사용한 확인 팝업입니다.',
    confirmText: '확인',
    cancelText: '취소',
    confirmVariant: 'primary',
    cancelVariant: 'outline',
  });
};

const openComposableAlert = () => {
  openComposableAlertPopup({
    title: 'Composable 알림',
    content: 'Composable을 사용한 알림 팝업입니다.',
    variant: 'success',
    confirmText: '확인',
  });
};

// 액션 핸들러들
const handleConfirmAction = (action: any, index: number) => {
  console.log('확인 팝업 액션:', action, index);
  if (index === 1) {
    console.log('확인 버튼 클릭됨');
  } else {
    console.log('취소 버튼 클릭됨');
  }
};

const handleAlertAction = (action: any, index: number) => {
  console.log('알림 팝업 액션:', action, index);
};

const handleComposableAction = (action: any, index: number) => {
  console.log('Composable 팝업 액션:', action, index);
};
</script>

<style scoped>
.popup-example {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 32px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #374151;
  font-size: 18px;
  font-weight: 600;
}

.example-button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.example-button:hover {
  background-color: #2563eb;
}

.example-button.success {
  background-color: #10b981;
}

.example-button.success:hover {
  background-color: #059669;
}

.example-button.error {
  background-color: #ef4444;
}

.example-button.error:hover {
  background-color: #dc2626;
}

.example-button.warning {
  background-color: #f59e0b;
}

.example-button.warning:hover {
  background-color: #d97706;
}

.example-button.info {
  background-color: #3b82f6;
}

.example-button.info:hover {
  background-color: #2563eb;
}

.alert-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style> 