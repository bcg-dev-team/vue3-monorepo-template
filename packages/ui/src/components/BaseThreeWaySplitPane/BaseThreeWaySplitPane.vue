<template>
  <Splitpanes
    class="split-pane"
    :horizontal="direction === 'horizontal'"
    :vertical="direction === 'vertical'"
    @resized="emit('resize')"
  >
    <!-- Left Pane -->
    <Pane
      v-if="!collapsed.left"
      :min-size="minSizes.left"
      :max-size="maxSizes.left"
      :size="sizes.left"
      class="pane left-pane"
    >
      <slot name="left" />
      <button class="toggle-button left" @click="toggle('left')">Collapse</button>
    </Pane>

    <!-- Center Pane -->
    <Pane class="pane center-pane">
      <slot name="center" />
    </Pane>

    <!-- Right Pane -->
    <Pane
      v-if="!collapsed.right"
      :min-size="minSizes.right"
      :max-size="maxSizes.right"
      :size="sizes.right"
      class="pane right-pane"
    >
      <slot name="right" />
      <button class="toggle-button right" @click="toggle('right')">Collapse</button>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

interface MinSizes {
  left: number;
  right: number;
}

interface MaxSizes {
  left: number;
  right: number;
}

interface Props {
  direction?: 'horizontal' | 'vertical';
  minSizes?: MinSizes;
  maxSizes?: MaxSizes;
  breakpoint?: number;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  minSizes: () => ({ left: 10, right: 10 }),
  maxSizes: () => ({ left: 80, right: 80 }),
  breakpoint: 768,
});

const emit = defineEmits<{
  resize: [];
}>();

const collapsed = ref({ left: false, right: false });
const sizes = ref({ left: 20, right: 20 });

const toggle = (side: 'left' | 'right') => {
  collapsed.value[side] = !collapsed.value[side];
};

const updateCollapseByBreakpoint = () => {
  if (window.innerWidth < props.breakpoint) {
    collapsed.value.left = true;
  } else {
    collapsed.value.left = false;
  }
};

onMounted(() => {
  updateCollapseByBreakpoint();
  window.addEventListener('resize', updateCollapseByBreakpoint);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCollapseByBreakpoint);
});
</script>

<style scoped>
.split-pane {
  height: 100%;
  width: 100%;
}

.pane {
  transition: all 0.3s ease;
  position: relative;
}

.toggle-button {
  position: absolute;
  top: 10px;
  background: #eee;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
}

.toggle-button.left {
  right: 10px;
}

.toggle-button.right {
  left: 10px;
}

/* Resize 핸들 영역 개선 - 더 강력한 스타일 적용 */
:deep(.splitpanes__splitter) {
  background-color: #e0e0e0 !important;
  position: relative !important;
  transition: background-color 0.2s ease !important;
  border: none !important;
  outline: none !important;
}

:deep(.splitpanes__splitter:hover) {
  background-color: #2196f3 !important;
}

:deep(.splitpanes__splitter:active) {
  background-color: #1976d2 !important;
}

/* 수평 분할일 때 - 더 두껍게 */
:deep(.splitpanes--horizontal .splitpanes__splitter) {
  width: 12px !important;
  cursor: col-resize !important;
  min-width: 12px !important;
  max-width: 12px !important;
}

/* 수직 분할일 때 - 더 두껍게 */
:deep(.splitpanes--vertical .splitpanes__splitter) {
  height: 12px !important;
  cursor: row-resize !important;
  min-height: 12px !important;
  max-height: 12px !important;
}

/* Resize 핸들 중앙에 시각적 표시 추가 - 더 명확하게 */
:deep(.splitpanes__splitter::before) {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #666 !important;
  transition: background-color 0.2s ease !important;
  z-index: 1 !important;
}

:deep(.splitpanes--horizontal .splitpanes__splitter::before) {
  width: 3px !important;
  height: 30px !important;
}

:deep(.splitpanes--vertical .splitpanes__splitter::before) {
  width: 30px !important;
  height: 3px !important;
}

:deep(.splitpanes__splitter:hover::before) {
  background-color: #fff !important;
}

/* 추가적인 시각적 강화 */
:deep(.splitpanes__splitter) {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1) !important;
}

:deep(.splitpanes__splitter:hover) {
  box-shadow: inset 0 0 0 1px rgba(33, 150, 243, 0.3) !important;
}

/* splitpanes 기본 스타일 재정의 */
:deep(.splitpanes) {
  background-color: transparent !important;
}

:deep(.splitpanes__pane) {
  background-color: transparent !important;
}
</style>
