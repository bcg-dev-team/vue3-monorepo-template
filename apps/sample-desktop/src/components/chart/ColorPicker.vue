<!-- 간단한 색상 선택 컴포넌트 -->
<template>
  <button
    :class="['color-picker', { disabled: disabled }]"
    :disabled="disabled"
    :title="title"
    @click="openColorPicker"
  >
    <div class="color-preview" :style="{ backgroundColor: modelValue }"></div>
    <input
      ref="colorInput"
      type="color"
      :value="modelValue"
      @input="handleColorChange"
      class="hidden-input"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue: string;
  disabled?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  title: '색상 선택',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const colorInput = ref<HTMLInputElement>();

const openColorPicker = () => {
  if (!props.disabled && colorInput.value) {
    colorInput.value.click();
  }
};

const handleColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newColor = target.value;

  emit('update:modelValue', newColor);
  emit('change', newColor);
};
</script>

<style scoped>
.color-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
  border: 1px solid #dadbdd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover:not(.disabled) {
    border-color: #999;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: #ffc300;
  }
}

.color-preview {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}
</style>
