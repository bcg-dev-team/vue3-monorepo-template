<!--
  Figma 컴포넌트: Popup
  - Headless UI Dialog 기반으로 구현
  - 단일 컴포넌트로 모든 팝업 타입 지원 (default, confirm, alert)
  - variant prop으로 팝업 타입 구분
  - actions prop으로 동적 버튼 구성
  @figma Popup (node-id: 1801-17801, 1801-18102, 1801-18147)
-->
<script setup lang="ts">
import type { 
  PopupSize, 
  PopupVariant, 
  AlertVariant, 
  PopupAction,
  IconName 
} from '../../types/components';
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';
import './BasePopup.scss';

interface Props {
  /**
   * 팝업 열림 상태
   */
  isOpen: boolean;
  /**
   * 팝업 제목
   */
  title?: string;
  /**
   * 팝업 설명 (접근성용)
   */
  description?: string;
  /**
   * 팝업 크기
   */
  size?: PopupSize;
  /**
   * 팝업 타입
   */
  variant?: PopupVariant;
  /**
   * 알림 타입 (variant가 'alert'일 때만 사용)
   */
  alertVariant?: AlertVariant;
  /**
   * 오버레이 클릭 시 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키 클릭 시 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 팝업 액션 버튼들
   */
  actions?: PopupAction[];
}

interface Emits {
  (e: 'close'): void;
  (e: 'action', action: PopupAction, index: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  size: 'md',
  variant: 'default',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  actions: () => [],
});

const emit = defineEmits<Emits>();

// 팝업 크기 클래스 계산
const popupSizeClass = computed(() => `popup-size-${props.size}`);

// 팝업 타입 클래스 계산
const popupVariantClass = computed(() => `popup-variant-${props.variant}`);

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

// 액션 버튼 클릭 핸들러
const handleActionClick = (action: PopupAction, index: number) => {
  emit('action', action, index);
  emit('close');
};

// Headless UI Dialog 닫기 핸들러
const handleClose = () => {
  emit('close');
};
</script>

<template>
  <Dialog 
    :open="isOpen" 
    @close="handleClose"
    class="popup-dialog"
  >
    <!-- 배경 오버레이 -->
    <div class="popup-overlay" aria-hidden="true" />

    <!-- 팝업 컨테이너 -->
    <div class="popup-container-wrapper">
      <DialogPanel :class="['popup-container', popupSizeClass, popupVariantClass]">
        <!-- 헤더 영역 -->
        <div v-if="title || showCloseButton" class="popup-header">
          <DialogTitle v-if="title" class="popup-title">
            {{ title }}
          </DialogTitle>
          <button
            v-if="showCloseButton"
            type="button"
            class="popup-close-button"
            @click="handleClose"
            aria-label="팝업 닫기"
          >
            <BaseIcon name="arrow-close" size="md" />
          </button>
        </div>

        <!-- 컨텐츠 영역 -->
        <div class="popup-content">
          <!-- 알림 팝업 아이콘 -->
          <div 
            v-if="variant === 'alert' && alertVariant" 
            :class="['alert-icon-container', getAlertColorClass(alertVariant)]"
          >
            <BaseIcon
              :name="getAlertIcon(alertVariant)"
              size="lg"
              :color="`var(--alert-${alertVariant}-icon-color)`"
            />
          </div>

          <!-- 설명 (접근성용) -->
          <DialogDescription v-if="description" class="popup-description">
            {{ description }}
          </DialogDescription>

          <!-- 기본 컨텐츠 -->
          <div v-if="$slots.default" class="popup-default-content">
            <slot />
          </div>

          <!-- 텍스트 컨텐츠 (alert, confirm variant용) -->
          <p v-else-if="variant === 'alert' || variant === 'confirm'" class="popup-message">
            <slot>{{ $attrs.content || '' }}</slot>
          </p>
        </div>

        <!-- 푸터 영역 (액션 버튼들) -->
        <div v-if="actions.length > 0 || $slots.footer" class="popup-footer">
          <slot name="footer">
            <div class="popup-actions">
              <BaseButton
                v-for="(action, index) in actions"
                :key="index"
                :variant="action.variant || 'outline'"
                :size="action.size || 'regular'"
                :label="action.label"
                :disabled="action.disabled"
                :is-loading="action.loading"
                :left-icon="action.leftIcon"
                :right-icon="action.rightIcon"
                @click="handleActionClick(action, index)"
              />
            </div>
          </slot>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template> 