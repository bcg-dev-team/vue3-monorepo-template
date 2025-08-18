<!--
  ModalContent 컴포넌트
  - 모달의 컨텐츠 영역을 담당
  - 기본 슬롯과 설명을 포함
  - 알림 모달용 아이콘 지원
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import type { AlertVariant, IconName } from '../../types/components';
import './ModalContent.scss';

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

