<!--
  Figma 컴포넌트: Modal
  - Headless UI Dialog 기반으로 구현
  - 단일 컴포넌트로 모든 모달 타입 지원 (default, confirm, alert)
  - variant prop으로 모달 타입 구분
  - actions prop으로 동적 버튼 구성
  @figma Modal (node-id: 1801-17801, 1801-18102, 1801-18147)
-->
<script setup lang="ts">
import type {
  ModalSize,
  ModalVariant,
  AlertVariant,
  ModalAction,
  ButtonIconProps,
  IconName,
} from '../../types/components';
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

interface Props {
  /**
   * 모달 열림 상태
   */
  isOpen: boolean;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 모달 크기
   */
  size?: ModalSize;
  /**
   * 모달 타입
   */
  variant?: ModalVariant;
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
   * 모달 액션 버튼들
   */
  actions?: ModalAction[];
}

interface Emits {
  (e: 'close'): void;
  (e: 'action', action: ModalAction, index: number): void;
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

// 모달 크기 클래스 계산
const modalSizeClass = computed(() => `modal-size-${props.size}`);

// 모달 타입 클래스 계산
const modalVariantClass = computed(() => `modal-variant-${props.variant}`);

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
const handleActionClick = (action: ModalAction, index: number) => {
  emit('action', action, index);
  emit('close');
};

// Headless UI Dialog 닫기 핸들러
const handleClose = () => {
  emit('close');
};
</script>

<template>
  <Dialog :open="isOpen" @close="handleClose" class="modal-dialog">
    <!-- 배경 오버레이 -->
    <div class="modal-overlay" aria-hidden="true" />

    <!-- 모달 컨테이너 -->
    <div class="modal-container-wrapper">
      <DialogPanel :class="['modal-container', modalSizeClass, modalVariantClass]">
        <!-- 헤더 영역 -->
        <div v-if="title || showCloseButton" class="modal-header">
          <DialogTitle v-if="title" class="modal-title">
            {{ title }}
          </DialogTitle>
          <button
            v-if="showCloseButton"
            type="button"
            class="modal-close-button"
            @click="handleClose"
            aria-label="모달 닫기"
          >
            <BaseIcon name="arrow-close" size="md" />
          </button>
        </div>

        <!-- 컨텐츠 영역 -->
        <div class="modal-content">
          <!-- 알림 모달 아이콘 -->
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
          <DialogDescription v-if="description" class="modal-description">
            {{ description }}
          </DialogDescription>

          <!-- 기본 컨텐츠 -->
          <div v-if="$slots.default" class="modal-default-content">
            <slot />
          </div>

          <!-- 텍스트 컨텐츠 (alert, confirm variant용) -->
          <p v-else-if="variant === 'alert' || variant === 'confirm'" class="modal-message">
            <slot>{{ $attrs.content || '' }}</slot>
          </p>
        </div>

        <!-- 푸터 영역 (액션 버튼들) -->
        <div v-if="actions.length > 0 || $slots.footer" class="modal-footer">
          <slot name="footer">
            <div class="modal-actions">
              <BaseButton
                v-for="(action, index) in actions"
                :key="index"
                :variant="action.variant || 'contained'"
                :size="action.size || 'lg'"
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
