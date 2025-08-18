<!--
  BaseModal 컴포넌트 (하이브리드 접근법)
  - Headless UI Dialog 기반으로 구현
  - 헤더, 컨텐츠, 푸터를 서브 컴포넌트로 분리
  - 슬롯을 통한 완전한 커스터마이징 지원
  - 기존 기능과의 호환성 유지
  @figma Modal (node-id: 1801-17801, 1801-18102, 1801-18147)
-->
<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue';
import { computed, ref, watch, nextTick, useSlots } from 'vue';
import ModalHeader from './ModalHeader.vue';
import ModalContent from './ModalContent.vue';
import ModalFooter from './ModalFooter.vue';
import type {
  ModalProps,
  ModalEmits
} from './types';
import './BaseModal.scss';

interface Props extends ModalProps {}

interface Emits extends ModalEmits {}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  size: 'md',
  variant: 'default',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showBackButton: false,
  showCloseButton: true,
  showDefaultFooter: true,
  actions: () => [],
  cancelText: '취소',
  confirmText: '확인',
  showCancelButton: true,
  showConfirmButton: true,
  fullWidth: true
});

const emit = defineEmits<Emits>();

// 모달 컨테이너 ref
const modalContainer = ref<HTMLElement>();

// 모달 크기 클래스 계산
const modalSizeClass = computed(() => `modal-size-${props.size}`);

// 모달 타입 클래스 계산
const modalVariantClass = computed(() => `modal-variant-${props.variant}`);

// 슬롯 존재 여부 확인
const hasHeaderSlot = computed(() => !!useSlots().header);
const hasFooterSlot = computed(() => !!useSlots().footer);

// 모달이 열릴 때 포커스 설정
watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen && modalContainer.value) {
      await nextTick();
      // 모달이 열릴 때 모달 컨테이너에 포커스
      modalContainer.value.focus();
    }
  }
});

// 이벤트 핸들러들
const handleClose = () => {
  emit('close');
  emit('update:isOpen', false);
};

const handleBack = () => {
  emit('back');
};

const handleCancel = () => {
  emit('cancel');
  handleClose();
};

const handleConfirm = () => {
  emit('confirm');
  handleClose();
};

const handleAction = (action: any, index: number) => {
  emit('action', action, index);
};

// 오버레이 클릭 핸들러
const handleOverlayClick = (event: Event) => {
  if (props.closeOnOverlayClick && event.target === event.currentTarget) {
    handleClose();
  }
};

// ESC 키 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape') {
    handleClose();
  }
};
</script>

<template>
  <Dialog :open="isOpen" @close="handleClose" class="modal-dialog" @keydown="handleKeydown">
    <!-- 배경 오버레이 -->
    <div class="modal-overlay" aria-hidden="true" @click="handleOverlayClick" />

    <!-- 모달 컨테이너 -->
    <div class="modal-container-wrapper">
      <DialogPanel
        ref="modalContainer"
        :class="['modal-container', modalSizeClass, modalVariantClass]"
        tabindex="-1"
      >
        <!-- 헤더 영역 -->
        <ModalHeader
          v-if="hasHeaderSlot || title || showCloseButton || showBackButton"
          :title="title"
          :show-back-button="showBackButton"
          :show-close-button="showCloseButton"
          @back="handleBack"
          @close="handleClose"
        >
          <template #title>
            <slot name="title" />
          </template>
          <template #actions>
            <slot name="actions" />
          </template>
        </ModalHeader>

        <!-- 컨텐츠 영역 -->
        <ModalContent
          :description="description"
          :alert-variant="alertVariant"
          :show-alert-icon="variant === 'alert'"
        >
          <slot />
        </ModalContent>

        <!-- 푸터 영역 -->
        <ModalFooter
          v-if="hasFooterSlot || actions.length > 0 || showDefaultFooter"
          :actions="actions"
          :show-default-footer="showDefaultFooter"
          :cancel-text="cancelText"
          :confirm-text="confirmText"
          :show-cancel-button="showCancelButton"
          :show-confirm-button="showConfirmButton"
          :full-width="fullWidth"
          @cancel="handleCancel"
          @confirm="handleConfirm"
          @action="handleAction"
        >
          <template #default>
            <slot name="footer" />
          </template>
        </ModalFooter>
      </DialogPanel>
    </div>
  </Dialog>
</template>
