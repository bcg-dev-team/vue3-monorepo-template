<!-- BaseList - 접근성과 기능성을 고려한 리스트 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseList - 접근성과 기능성을 고려한 리스트 컴포넌트
 *
 * @props items - 리스트 아이템 배열
 * @props selectable - 아이템 선택 가능 여부
 * @props multiSelect - 다중 선택 가능 여부
 * @props dense - 조밀한 간격 사용 여부
 * @props disablePadding - 패딩 비활성화 여부
 * @props subheader - 서브헤더 텍스트
 * @props selectedItems - 선택된 아이템 ID들
 * @props variant - 리스트 스타일 (default, outlined, elevated)
 * @props size - 리스트 크기 (sm, md, lg)
 * @emits itemSelect - 아이템 선택 이벤트
 * @emits itemClick - 아이템 클릭 이벤트
 */
import type { ListItem, ListItemAction } from '../../types/components';
import type { IconName } from '../../types/icons';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref, nextTick } from 'vue';
import './BaseList.scss';

interface Props {
  /** 리스트 아이템 배열 */
  items: ListItem[];
  /** 아이템 선택 가능 여부 */
  selectable?: boolean;
  /** 다중 선택 가능 여부 */
  multiSelect?: boolean;
  /** 조밀한 간격 사용 여부 */
  dense?: boolean;
  /** 패딩 비활성화 여부 */
  disablePadding?: boolean;
  /** 서브헤더 텍스트 */
  subheader?: string;
  /** 선택된 아이템 ID들 */
  selectedItems?: (string | number)[];
  /** 리스트 스타일 */
  variant?: 'default' | 'outlined' | 'elevated';
  /** 리스트 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 로딩 상태 여부 */
  isLoading?: boolean;
  /** 스켈레톤 아이템 개수 */
  skeletonItems?: number;
}

interface Emits {
  (e: 'itemSelect', itemId: string | number, selected: boolean): void;
  (e: 'itemClick', item: ListItem): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  multiSelect: false,
  dense: false,
  disablePadding: false,
  selectedItems: () => [],
  variant: 'default',
  size: 'md',
  isLoading: false,
  skeletonItems: 5,
});

const emit = defineEmits<Emits>();

// 포커스 관리
const focusedItemId = ref<string | number | null>(null);
const listRef = ref<HTMLElement>();

/**
 * 아이템 선택 처리
 * @param itemId - 선택할 아이템 ID
 * @param selected - 선택 상태
 */
const handleItemSelect = (itemId: string | number, selected: boolean) => {
  if (!props.selectable) return;

  emit('itemSelect', itemId, selected);
};

/**
 * 아이템 클릭 처리
 * @param item - 클릭된 아이템
 */
const handleItemClick = (item: ListItem) => {
  emit('itemClick', item);
};

/**
 * 키보드 내비게이션 처리
 * @param event - 키보드 이벤트
 * @param currentIndex - 현재 아이템 인덱스
 */
const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
  const itemCount = props.items.length;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % itemCount;
      focusItem(props.items[nextIndex].id);
      break;
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
      focusItem(props.items[prevIndex].id);
      break;
    case 'Home':
      event.preventDefault();
      if (itemCount > 0) {
        focusItem(props.items[0].id);
      }
      break;
    case 'End':
      event.preventDefault();
      if (itemCount > 0) {
        focusItem(props.items[itemCount - 1].id);
      }
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      const currentItem = props.items[currentIndex];
      if (props.selectable) {
        const isSelected = props.selectedItems.includes(currentItem.id);
        handleItemSelect(currentItem.id, !isSelected);
      }
      handleItemClick(currentItem);
      break;
  }
};

/**
 * 특정 아이템에 포커스 설정
 * @param itemId - 포커스할 아이템 ID
 */
const focusItem = async (itemId: string | number) => {
  focusedItemId.value = itemId;
  await nextTick();

  const itemElement = listRef.value?.querySelector(`[data-item-id="${itemId}"]`) as HTMLElement;
  if (itemElement) {
    itemElement.focus();
  }
};

/**
 * 아이템이 선택되었는지 확인
 * @param itemId - 확인할 아이템 ID
 * @returns 선택 여부
 */
const isItemSelected = (itemId: string | number) => {
  return props.selectedItems.includes(itemId);
};

/**
 * 리스트 클래스 계산
 */
const listClasses = computed(() => {
  const classes = ['base-list'];

  if (props.dense) classes.push('base-list--dense');
  if (props.disablePadding) classes.push('base-list--no-padding');
  if (props.variant !== 'default') classes.push(`base-list--${props.variant}`);
  if (props.size !== 'md') classes.push(`base-list--${props.size}`);

  return classes.join(' ');
});

/**
 * 아이템 클래스 계산
 * @param itemId - 아이템 ID
 */
const getItemClasses = (itemId: string | number) => {
  const classes = ['base-list__item'];

  if (props.selectable) classes.push('base-list__item--selectable');
  if (isItemSelected(itemId)) classes.push('base-list__item--selected');
  if (focusedItemId.value === itemId) classes.push('base-list__item--focused');

  return classes.join(' ');
};

/**
 * 리스트 ARIA 속성 계산
 */
const listAriaAttributes = computed(() => ({
  role: 'listbox',
  'aria-multiselectable': props.multiSelect,
  'aria-label': props.subheader || '리스트',
}));

/**
 * 아이템 ARIA 속성 계산
 * @param itemId - 아이템 ID
 * @param index - 아이템 인덱스
 */
const getItemAriaAttributes = (itemId: string | number, index: number) => ({
  role: 'option',
  'aria-selected': isItemSelected(itemId),
  'aria-posinset': index + 1,
  'aria-setsize': props.items.length,
  'data-item-id': itemId,
  tabindex: focusedItemId.value === itemId ? 0 : -1,
});
</script>

<template>
  <div ref="listRef" :class="listClasses" v-bind="listAriaAttributes">
    <!-- 서브헤더 -->
    <div v-if="subheader" class="base-list__subheader" role="heading" aria-level="3">
      {{ subheader }}
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="base-list__loading">
      <div
        v-for="i in skeletonItems"
        :key="`skeleton-${i}`"
        class="base-list__item base-list__item--skeleton"
      >
        <div class="base-list__item-skeleton">
          <div class="base-list__item-skeleton-avatar"></div>
          <div class="base-list__item-skeleton-content">
            <div class="base-list__item-skeleton-title"></div>
            <div class="base-list__item-skeleton-subtitle"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 리스트 아이템들 -->
    <template v-else>
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :class="getItemClasses(item.id)"
        v-bind="getItemAriaAttributes(item.id, index)"
        @click="handleItemClick(item)"
        @keydown="handleKeyDown($event, index)"
        @focus="focusedItemId = item.id"
        @blur="focusedItemId = null"
      >
        <!-- 선택 체크박스 -->
        <div
          v-if="selectable"
          class="base-list__item-checkbox"
          @click.stop="handleItemSelect(item.id, !isItemSelected(item.id))"
        >
          <BaseIcon
            :name="isItemSelected(item.id) ? 'check-circle' : 'circle'"
            size="sm"
            :color="isItemSelected(item.id) ? 'var(--color-primary)' : 'var(--color-grey-400)'"
          />
        </div>

        <!-- 아이템 아바타/이미지 -->
        <div v-if="item.avatar || item.image" class="base-list__item-avatar">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="base-list__item-image"
          />
          <div v-else-if="item.avatar" class="base-list__item-avatar-text">
            {{ item.avatar }}
          </div>
        </div>

        <!-- 아이템 내용 -->
        <div class="base-list__item-content">
          <div class="base-list__item-title">
            {{ item.title }}
          </div>
          <div v-if="item.subtitle" class="base-list__item-subtitle">
            {{ item.subtitle }}
          </div>
          <div v-if="item.description" class="base-list__item-description">
            {{ item.description }}
          </div>
        </div>

        <!-- 아이템 액션 -->
        <div v-if="item.actions && item.actions.length > 0" class="base-list__item-actions">
          <button
            v-for="action in item.actions"
            :key="action.id"
            :class="[
              'base-list__item-action',
              `base-list__item-action--${action.variant || 'default'}`,
            ]"
            :disabled="action.disabled"
            :aria-label="action.ariaLabel || action.label"
            @click.stop="action.onClick?.(item)"
          >
            <BaseIcon v-if="action.icon" :name="action.icon" size="sm" />
            <span v-if="action.label">{{ action.label }}</span>
          </button>
        </div>

        <!-- 중첩 리스트 -->
        <div v-if="item.children && item.children.length > 0" class="base-list__item-children">
          <BaseList
            :items="item.children"
            :selectable="selectable"
            :multi-select="multiSelect"
            :dense="dense"
            :variant="variant"
            :size="size"
            @item-select="handleItemSelect"
            @item-click="handleItemClick"
          />
        </div>
      </div>
    </template>

    <!-- 빈 상태 -->
    <div
      v-if="!isLoading && items.length === 0"
      class="base-list__empty"
      role="status"
      aria-live="polite"
    >
      <BaseIcon name="info" size="md" color="var(--color-grey-400)" />
      <span>표시할 항목이 없습니다.</span>
    </div>
  </div>
</template>
