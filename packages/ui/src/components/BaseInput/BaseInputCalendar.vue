<script setup lang="ts">
import { ElDatePicker } from 'element-plus';
import 'element-plus/dist/index.css';

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

const handleDateChange = (value: string | null) => {
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
    :disabled="props.disabled"
    :disabled-date="props.disabledDate"
    @update:model-value="handleDateChange"
    :editable="false"
    :clearable="false"
  />
</template>

<style>
.el-date-editor.el-input.input-date {
  width: 100%;
  height: 42px;
  .el-input__wrapper {
    height: 42px;
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
      padding-right: 40px;
      font-size: 16px;
      border: none !important;
    }

    .el-input__suffix {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;

      &::after {
        content: '';
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background-image: url('../../assets/icons/calendar.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>
