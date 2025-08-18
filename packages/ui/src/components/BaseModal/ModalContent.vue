<!--
  ModalContent 컴포넌트
  - 모달의 컨텐츠 영역을 담당
  - 기본 슬롯과 설명을 포함
  - 알림 모달용 아이콘 지원
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import type { AlertVariant, IconName } from '../../types/components';

interface Props {
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 알림 타입 (alert variant용)
   */
  alertVariant?: AlertVariant;
  /**
   * 알림 아이콘 표시 여부
   */
  showAlertIcon?: boolean;
}

interface Emits {
  (e: 'content-click'): void;
}

defineProps<Props>();
defineEmits<Emits>();

// 알림 아이콘 매핑
const getAlertIcon = (variant: AlertVariant): IconName => {
  switch (variant) {
    case 'success':
      return 'check-circle';
    case 'info':
      return 'settings';
    case 'warning':
      return 'star';
    case 'error':
      return 'trash';
    default:
      return 'settings';
  }
};

// 알림 색상 클래스
const getAlertColorClass = (variant: AlertVariant) => `alert-${variant}`;
</script>

<template>
  <main class="modal-content">
    <!-- 알림 모달 아이콘 -->
    <div 
      v-if="showAlertIcon && alertVariant" 
      :class="['alert-icon-container', getAlertColorClass(alertVariant)]"
    >
      <BaseIcon
        :name="getAlertIcon(alertVariant)"
        size="lg"
        :color="`var(--alert-${alertVariant}-icon-color)`"
      />
    </div>

    <!-- 설명 (접근성용) -->
    <p v-if="description" class="modal-description">
      {{ description }}
    </p>

    <!-- 기본 컨텐츠 -->
    <div class="modal-default-content">
      <slot />
    </div>
  </main>
</template>

<style scoped>
.modal-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--modal-content-bg, #ffffff);
}

.alert-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.alert-icon-container.alert-success {
  background-color: var(--alert-success-bg, #f0fdf4);
  color: var(--alert-success-color, #166534);
}

.alert-icon-container.alert-info {
  background-color: var(--alert-info-bg, #eff6ff);
  color: var(--alert-info-color, #1d4ed8);
}

.alert-icon-container.alert-warning {
  background-color: var(--alert-warning-bg, #fffbeb);
  color: var(--alert-warning-color, #92400e);
}

.alert-icon-container.alert-error {
  background-color: var(--alert-error-bg, #fef2f2);
  color: var(--alert-error-color, #dc2626);
}

.modal-description {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--modal-description-color, #6b7280);
  line-height: 1.5;
}

.modal-default-content {
  color: var(--modal-text-color, #111827);
  line-height: 1.6;
}

.modal-default-content :deep(h1),
.modal-default-content :deep(h2),
.modal-default-content :deep(h3),
.modal-default-content :deep(h4),
.modal-default-content :deep(h5),
.modal-default-content :deep(h6) {
  margin: 0 0 0.75rem 0;
  color: var(--modal-heading-color, #111827);
}

.modal-default-content :deep(p) {
  margin: 0 0 0.75rem 0;
}

.modal-default-content :deep(p:last-child) {
  margin-bottom: 0;
}

.modal-default-content :deep(ul),
.modal-default-content :deep(ol) {
  margin: 0 0 0.75rem 0;
  padding-left: 1.5rem;
}

.modal-default-content :deep(li) {
  margin-bottom: 0.25rem;
}
</style> 