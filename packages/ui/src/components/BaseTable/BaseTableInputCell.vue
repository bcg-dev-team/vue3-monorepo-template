<!--
  Figma 컴포넌트: Table/Body-Input (node-id: 74-1059)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev
-->
<script setup lang="ts">
import BaseInputText from '../BaseInput/BaseInputText.vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import { computed } from 'vue';

/**
 * 입력 필드가 포함된 테이블 셀 컴포넌트
 *
 * @props label - 셀 라벨
 * @props placeholder - 입력 필드 플레이스홀더
 * @props value - 입력 필드 값
 * @props buttonText - 버튼 텍스트
 * @props showCheckbox - 체크박스 표시 여부
 * @props checked - 체크박스 상태
 * @emits update - 입력 값 변경 이벤트
 * @emits buttonClick - 버튼 클릭 이벤트
 * @emits checkboxChange - 체크박스 상태 변경 이벤트
 */
interface Props {
  /** 셀 라벨 */
  label?: string;
  /** 입력 필드 플레이스홀더 */
  placeholder?: string;
  /** 입력 필드 값 */
  value?: string;
  /** 버튼 텍스트 */
  buttonText?: string;
  /** 체크박스 표시 여부 */
  showCheckbox?: boolean;
  /** 체크박스 상태 */
  checked?: boolean;
}

interface Emits {
  (e: 'update', value: string): void;
  (e: 'buttonClick'): void;
  (e: 'checkboxChange', checked: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '텍스트',
  value: '',
  buttonText: 'Button',
  showCheckbox: false,
  checked: false,
});

const emit = defineEmits<Emits>();

const handleInputUpdate = (value: string) => {
  emit('update', value);
};

const handleButtonClick = () => {
  emit('buttonClick');
};

const handleCheckboxChange = (checked: boolean) => {
  emit('checkboxChange', checked);
};
</script>

<template>
  <div class="table-input-cell relative h-full w-full" data-name="Table/Body-Input">
    <div
      class="table-input-cell-border pointer-events-none absolute inset-0 border-b border-solid"
    />
    <div class="relative flex h-full w-full flex-row items-center">
      <div
        class="table-input-cell-padding relative flex h-full w-full flex-row items-center justify-start gap-2.5"
      >
        <!-- 라벨 -->
        <div
          v-if="label"
          class="table-input-cell-label relative flex flex-shrink-0 flex-col justify-center whitespace-nowrap text-left text-sm font-normal leading-none"
        >
          <span class="block whitespace-pre">{{ label }}</span>
        </div>

        <!-- 버튼 -->
        <BaseButton
          v-if="buttonText"
          variant="light-solid"
          size="small-inner"
          :label="buttonText"
          @click="handleButtonClick"
        >
          <template #icon>
            <svg
              class="table-input-button-icon"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 5V7M7 7V9M7 7H9M7 7H5M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          {{ buttonText }}
        </BaseButton>

        <!-- 체크박스 -->
        <div
          v-if="showCheckbox"
          class="table-input-checkbox relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border border-solid transition-all duration-150"
          @click="handleCheckboxChange(!checked)"
        >
          <div
            v-if="checked"
            class="table-input-checkbox-inner-checked relative flex h-5 w-5 items-center justify-center rounded-[3px] border border-solid transition-all duration-150"
          >
            <svg
              class="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.50071 13.3801L16.3957 6.48438L17.4571 7.54502L9.50071 15.5014L4.72705 10.7277L5.7877 9.66706L9.50071 13.3801Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            v-else
            class="table-input-checkbox-inner-unchecked relative flex h-5 w-5 items-center justify-center rounded-[3px] border border-solid transition-all duration-150"
          />
        </div>

        <!-- 입력 필드 -->
        <BaseInputText
          :model-value="value"
          :placeholder="placeholder"
          class="flex-1"
          @update:model-value="handleInputUpdate"
        />
      </div>
    </div>
  </div>
</template>
