<!--
  Figma 컴포넌트: Input/Search
  BaseInput을 확장한 검색 입력 컴포넌트
-->
<script setup lang="ts">
import { computed, watch, ref, nextTick } from 'vue';
import BaseInput from '../BaseInput.vue';
import type { CommonInputProps } from '../types';
import './InputSearch.scss';

/**
 * InputSearch - 검색 입력 컴포넌트
 *
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props clearable - 지우기 버튼 표시 여부 (기본값: true)
 * @props autoComplete - 자동완성 기능 여부 (기본값: false)
 * @props suggestions - 자동완성 제안 목록
 * @props debounce - 디바운스 시간 (ms, 기본값: 300)
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits search - 검색 실행 시 발생 (디바운스 적용)
 * @emits clear - 지우기 버튼 클릭 시 발생
 */
interface Props extends Omit<CommonInputProps, 'modelValue'> {
  clearable?: boolean;
  autoComplete?: boolean;
  suggestions?: string[];
  debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '검색어를 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  clearable: true,
  autoComplete: false,
  suggestions: () => [],
  debounce: 300,
});

// v-model을 위한 defineModel 사용
const modelValue = defineModel<string>('modelValue', { default: '' });

const emit = defineEmits<{
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'search', value: string): void;
  (e: 'clear'): void;
}>();

// 디바운스 타이머
let searchTimeout: NodeJS.Timeout | null = null;

// BaseInput 컴포넌트에 대한 ref
const baseInputRef = ref<InstanceType<typeof BaseInput> | null>(null);

/**
 * 지우기 버튼 클릭 처리 (MUI 방식)
 */
const handleClear = async () => {
  console.log('🧹 handleClear 시작:', { 
    beforeClear: modelValue.value,
    hasValue: hasValue.value 
  });
  
  // MUI와 동일한 방식: 즉시 값 클리어
  modelValue.value = '';
  
  console.log('🧹 modelValue 클리어 후:', { 
    afterClear: modelValue.value,
    hasValue: hasValue.value 
  });
  
  // DOM 업데이트 후 input 요소 값 클리어
  await nextTick();
  if (baseInputRef.value) {
    const inputElement = baseInputRef.value.$el?.querySelector('input') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
      console.log('🧹 DOM input 요소 클리어 완료');
    }
  }
  
  emit('clear');
  
  // 디바운스 타이머도 클리어
  if (searchTimeout) {
    clearTimeout(searchTimeout);
    searchTimeout = null;
  }
  
  console.log('🧹 handleClear 완료:', { 
    finalValue: modelValue.value,
    finalHasValue: hasValue.value 
  });
};

/**
 * 제안 선택 처리
 * @param suggestion - 선택된 제안
 */
const handleSuggestionSelect = (suggestion: string) => {
  modelValue.value = suggestion;
  emit('search', suggestion);
};

// 검색어가 있는지 확인 (MUI 방식)
const hasValue = computed(() => {
  const value = modelValue.value;
  console.log('🔍 hasValue 계산 시작:', { 
    value, 
    type: typeof value, 
    length: value?.toString().length,
    trimmed: value?.toString().trim(),
    trimmedLength: value?.toString().trim().length
  });
  
  // 더 엄격한 검증: undefined, null, 빈 문자열, 공백만 있는 문자열 체크
  if (!value) {
    console.log('🔍 hasValue 결과: false (값이 없음)');
    return false;
  }
  
  const stringValue = value.toString();
  if (stringValue.trim().length === 0) {
    console.log('🔍 hasValue 결과: false (공백만 있음)');
    return false;
  }
  
  console.log('🔍 hasValue 결과: true (값이 있음)');
  return true;
});

// 자동완성 제안 표시 여부
const showSuggestions = computed(() => {
  return props.autoComplete && props.suggestions.length > 0 && hasValue.value;
});

// modelValue 변경 감지를 위한 watcher (hasValue 정의 이후에 배치)
watch(modelValue, (newValue, oldValue) => {
  console.log('🔍 modelValue 변경 감지:', { 
    oldValue, 
    newValue, 
    oldType: typeof oldValue,
    newType: typeof newValue,
    hasValue: hasValue.value,
    oldHasValue: oldValue ? oldValue.toString().trim().length > 0 : false
  });
  
  // 디바운스된 검색 실행
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    if (newValue && newValue.trim()) {
      emit('search', newValue.trim());
    }
  }, props.debounce);
}, { immediate: true });
</script>

<template>
  <div class="input-search-container">
    <!-- 검색 입력 필드 -->
    <BaseInput
      ref="baseInputRef"
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="search"
      @input="(value: string) => console.log('📝 BaseInput input 이벤트:', { value, modelValue: modelValue.value })"
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
      <template #suffix>
        <button 
          v-if="clearable && hasValue" 
          type="button" 
          class="clear-button" 
          @click="handleClear" 
          aria-label="검색어 지우기"
        >
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

<style lang="scss" scoped>
// 브라우저 기본 search input의 clear 버튼 숨기기
:deep(input[type="search"]::-webkit-search-cancel-button) {
  display: none;
}

:deep(input[type="search"]::-webkit-search-decoration) {
  display: none;
}

:deep(input[type="search"]::-webkit-search-results-button) {
  display: none;
}

// Firefox용
:deep(input[type="search"]::-moz-search-clear) {
  display: none;
}

// Clear 버튼 스타일
.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-neutral-500, #6b7280);
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--color-neutral-700, #374151);
  }
  
  &:focus {
    outline: none;
    color: var(--color-neutral-700, #374151);
  }
}
</style>
