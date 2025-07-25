<!--
  Figma 컴포넌트: Table/Body-Input (node-id: 74-1059)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev
-->
<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import BaseInputText from '../BaseInput/BaseInputText.vue';

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

// 색상은 CSS 변수로 처리
const cellStyle = computed(() => ({
  backgroundColor: 'var(--table-type1-body-bg)',
  borderBottomColor: 'var(--table-type1-body-border)',
}));

const checkboxStyle = computed(() => {
  if (props.checked) {
    return {
      backgroundColor: 'var(--input-check-radio-selected-bg)',
    };
  }
  return {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--input-color-border-static)',
  };
});

// 레이아웃/간격/상태는 Tailwind class로 처리
const containerClasses = computed(() => {
  return 'relative w-full h-full';
});

const borderClasses = computed(() => {
  return 'absolute border-b border-solid inset-0 pointer-events-none';
});

const contentClasses = computed(() => {
  return 'flex flex-row items-center relative size-full';
});

const paddingClasses = computed(() => {
  return 'box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-2 relative size-full';
});

const labelClasses = computed(() => {
  return 'font-regular leading-[0] not-italic relative shrink-0 text-input-color-text-static text-base leading-tight tracking-wide text-left text-nowrap';
});

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
  <div :class="containerClasses" :style="cellStyle" data-name="Table/Body-Input">
    <div :class="borderClasses" />
    <div :class="contentClasses">
      <div :class="paddingClasses">
        <!-- 라벨 -->
        <div v-if="label" :class="labelClasses">
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
            <svg class="w-4 h-4" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
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
          class="relative rounded-[3px] shrink-0 size-[22px] cursor-pointer"
          @click="handleCheckboxChange(!checked)"
        >
          <div
            v-if="checked"
            class="absolute left-0.5 overflow-clip rounded-[3px] size-[18px] top-0.5"
            :style="checkboxStyle"
          >
            <svg
              class="absolute left-[-2px] size-6 top-[-2px]"
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
            class="absolute border left-0.5 rounded-[3px] size-[18px] top-0.5"
            :style="checkboxStyle"
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
