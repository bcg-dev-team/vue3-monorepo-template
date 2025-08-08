<!--
  Figma 컴포넌트: Input/Search
  BaseInput을 확장한 검색 입력 컴포넌트
-->
<script setup lang="ts">
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed } from 'vue';
import './InputSearch.scss';

/**
 * InputSearch - 검색 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props clearable - 지우기 버튼 표시 여부 (기본값: true)
 * @props autoComplete - 자동완성 기능 여부 (기본값: false)
 * @props suggestions - 자동완성 제안 목록
 * @props debounce - 디바운스 시간 (ms, 기본값: 300)
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits search - 검색 실행 시 발생 (디바운스 적용)
 * @emits clear - 지우기 버튼 클릭 시 발생
 */
interface Props extends CommonInputProps {
  clearable?: boolean;
  autoComplete?: boolean;
  suggestions?: string[];
  debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '검색어를 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  clearable: true,
  autoComplete: false,
  suggestions: () => [],
  debounce: 300,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'search', value: string): void;
  (e: 'clear'): void;
}>();

// 디바운스 타이머
let searchTimeout: NodeJS.Timeout | null = null;

/**
 * 입력값 처리
 * @param value - 입력값
 */
const handleInput = (value: string) => {
  emit('update:modelValue', value);

  // 디바운스된 검색 실행
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    if (value.trim()) {
      emit('search', value.trim());
    }
  }, props.debounce);
};

/**
 * 지우기 버튼 클릭 처리
 */
const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};

/**
 * 제안 선택 처리
 * @param suggestion - 선택된 제안
 */
const handleSuggestionSelect = (suggestion: string) => {
  emit('update:modelValue', suggestion);
  emit('search', suggestion);
};

// 검색어가 있는지 확인
const hasValue = computed(() => {
  return props.modelValue && props.modelValue.trim().length > 0;
});

// 자동완성 제안 표시 여부
const showSuggestions = computed(() => {
  return props.autoComplete && props.suggestions.length > 0 && hasValue.value;
});
</script>

<template>
  <div class="input-search-container">
    <!-- 검색 입력 필드 -->
    <BaseInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="search"
      @update:model-value="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <!-- 검색 아이콘 (prefix slot) -->
      <template #prefix>
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.5 11.5L14.5 14.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>

      <!-- 지우기 버튼 (suffix slot) -->
      <template #suffix v-if="clearable && hasValue">
        <button type="button" class="clear-button" @click="handleClear" aria-label="검색어 지우기">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </template>
    </BaseInput>

    <!-- 자동완성 제안 목록 -->
    <div v-if="showSuggestions" class="suggestions-container">
      <ul class="suggestions-list">
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="suggestion-item"
          @click="handleSuggestionSelect(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
