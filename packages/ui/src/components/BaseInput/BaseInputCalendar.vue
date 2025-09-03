<script setup lang="ts">
import { ElDatePicker } from 'element-plus';
import 'element-plus/dist/index.css';
import { h, shallowRef } from 'vue';

interface Props {
  /**
   * 선택된 날짜 (v-model)
   */
  modelValue?: string;
  /**
   * 플레이스홀더 텍스트
   * @default 'YYYY-MM-DD'
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 비활성화할 날짜를 결정하는 함수
   */
  disabledDate?: (date: Date) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: 'YYYY-MM-DD',
  disabled: false,
  disabledDate: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'change', value: string | null): void;
}>();

const customPrefix = shallowRef({
  render() {
    return h('p', '');
  },
});

const customSuffix = shallowRef({
  render() {
    return h('p', '');
  },
});

const handleDateChange = (value: string | null) => {
  if (value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(value);

    if (selectedDate > today) {
      emit('update:modelValue', null);
      emit('change', null);
      return;
    }
  }

  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <ElDatePicker
    :model-value="props.modelValue"
    type="date"
    :placeholder="props.placeholder"
    class="input-date"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :prefix-icon="customPrefix"
    :suffix-icon="customSuffix"
    :disabled="props.disabled"
    :disabled-date="props.disabledDate"
    @update:model-value="handleDateChange"
    :editable="false"
  />
</template>

<style>
.el-date-editor.el-input.input-date {
  width: 100%;
  height: 42px;
  .el-input__wrapper {
    height: 48px;
    border-radius: 6px !important;
    border: 1px solid var(--input-color-border-static) !important;

    &.is-focus {
      box-shadow: 0 0 0 1px var(--input-color-border-focus) inset !important;
    }

    .el-input__prefix {
      display: none;
    }
    .el-input__inner {
      margin-left: 15px;
      font-size: 16px;
      border: none !important;
    }

    .el-input__suffix {
      display: flex;
      align-items: center;
      height: 100%;

      &::after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        /* TODO: 이미지 불러오기 안됨. 수정 필요 */
        /* background-image: url('/packages/ui/src/assets/icons/calendar.svg'); */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 10px;
      }
    }
  }
}
</style>
