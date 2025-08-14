<!--
  Figma 컴포넌트: Input/Tel
  BaseInput을 확장한 전화번호 입력 컴포넌트
-->
<script setup lang="ts">
import type { CommonInputProps } from '../types';
import BaseInput from '../BaseInput.vue';
import { computed, ref } from 'vue';
import './InputTel.scss';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';

/**
 * InputTel - 전화번호 입력 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props disabled - 비활성화 여부
 * @props readonly - 읽기 전용 여부
 * @props fullWidth - 입력창을 부모의 100% 너비로 확장할지 여부
 * @props autoFormat - 자동 포맷팅 여부 (기본값: true)
 * @props format - 전화번호 포맷 (기본값: '###-####-####')
 * @props countryCode - 국가 코드 표시 여부 (기본값: false)
 * @props defaultCountry - 기본 국가 코드 (기본값: '+82')
 * @props showCountrySelector - 국가 선택 드롭다운 표시 여부 (기본값: false)
 * @props availableCountries - 사용 가능한 국가 목록
 * @emits update:modelValue - 입력값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props extends CommonInputProps {
  autoFormat?: boolean;
  format?: string;
  countryCode?: boolean;
  defaultCountry?: string;
  showCountrySelector?: boolean;
  availableCountries?: CountryOption[];
}

interface CountryOption {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '전화번호를 입력하세요',
  disabled: false,
  readonly: false,
  fullWidth: false,
  autoFormat: true,
  format: '###-####-####',
  countryCode: false,
  defaultCountry: '+82',
  showCountrySelector: false,
  availableCountries: () => [
    { code: 'KR', name: '대한민국', flag: '🇰🇷', dialCode: '+82' },
    { code: 'US', name: '미국', flag: '🇺🇸', dialCode: '+1' },
    { code: 'JP', name: '일본', flag: '🇯🇵', dialCode: '+81' },
    { code: 'CN', name: '중국', flag: '🇨🇳', dialCode: '+86' },
    { code: 'GB', name: '영국', flag: '🇬🇧', dialCode: '+44' },
  ],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

/**
 * 전화번호 포맷팅
 * @param value - 포맷팅할 전화번호
 * @returns 포맷팅된 전화번호
 */
const formatPhoneNumber = (value: string): string => {
  if (!props.autoFormat) return value;

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 포맷 적용
  let formatted = '';
  let numberIndex = 0;

  for (let i = 0; i < props.format.length && numberIndex < numbers.length; i++) {
    if (props.format[i] === '#') {
      formatted += numbers[numberIndex];
      numberIndex++;
    } else {
      formatted += props.format[i];
    }
  }

  return formatted;
};

/**
 * 입력값 처리
 * @param value - 입력값
 */
const handleInput = (value: string) => {
  const formattedValue = formatPhoneNumber(value);
  emit('update:modelValue', formattedValue);
};

/**
 * 전화번호 유효성 검사
 * @param value - 검사할 전화번호
 * @returns 유효성 여부
 */
const isValidPhoneNumber = (value: string): boolean => {
  const numbers = value.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
};

// 전화번호 유효성 상태
const isValid = computed(() => {
  if (!props.modelValue) return true;
  return isValidPhoneNumber(props.modelValue);
});

// 에러 메시지
const errorMessage = computed(() => {
  if (!props.modelValue) return '';
  if (!isValid.value) return '올바른 전화번호를 입력해주세요';
  return '';
});

// 국가 선택 관련 상태
const selectedCountry = ref(props.availableCountries.find(c => c.dialCode === props.defaultCountry) || props.availableCountries[0]);
const showCountryDropdown = ref(false);

// 국가 선택 처리
const selectCountry = (country: CountryOption) => {
  selectedCountry.value = country;
  showCountryDropdown.value = false;
  emit('update:modelValue', country.dialCode + ' ' + (props.modelValue || ''));
};
</script>

<template>
  <div class="input-tel-container">
    <!-- 국가 코드가 있는 경우 -->
    <div v-if="countryCode" class="input-tel-with-country">
      <div v-if="showCountrySelector" class="country-selector">
        <button
          type="button"
          class="country-selector-button"
          @click="showCountryDropdown = !showCountryDropdown"
          :disabled="disabled"
        >
          <span class="country-flag">{{ selectedCountry.flag }}</span>
          <span class="country-dial-code">{{ selectedCountry.dialCode }}</span>
          <BaseIcon name="arrow-down" size="sm" class="dropdown-icon" />
        </button>
        
        <!-- 국가 선택 드롭다운 -->
        <div v-if="showCountryDropdown" class="country-dropdown">
          <div
            v-for="country in availableCountries"
            :key="country.code"
            class="country-option"
            @click="selectCountry(country)"
          >
            <span class="country-flag">{{ country.flag }}</span>
            <span class="country-name">{{ country.name }}</span>
            <span class="country-dial-code">{{ country.dialCode }}</span>
          </div>
        </div>
      </div>
      <div v-else class="country-code">{{ selectedCountry.dialCode }}</div>
      
      <BaseInput
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :full-width="fullWidth"
        type="tel"
        :class="{ error: !isValid && modelValue }"
        @update:model-value="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <!-- 일반 전화번호 입력 -->
    <BaseInput
      v-else
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :full-width="fullWidth"
      type="tel"
      :class="{ error: !isValid && modelValue }"
      @update:model-value="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="input-tel-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-tel-container {
  position: relative;
}

.input-tel-with-country {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-code {
  padding: 8px 12px;
  background: var(--color-neutral-100, #f3f4f6);
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: 6px;
  font-weight: 500;
  color: var(--color-neutral-700, #374151);
  white-space: nowrap;
}

.country-selector {
  position: relative;
}

.country-selector-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-neutral-100, #f3f4f6);
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.country-selector-button:hover:not(:disabled) {
  background: var(--color-neutral-200, #e5e7eb);
  border-color: var(--color-neutral-400, #9ca3af);
}

.country-selector-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.country-flag {
  font-size: 16px;
}

.country-dial-code {
  font-weight: 500;
  color: var(--color-neutral-700, #374151);
}

.dropdown-icon {
  color: var(--color-neutral-500, #6b7280);
  transition: transform 0.2s ease;
}

.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.country-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.country-option:hover {
  background: var(--color-neutral-50, #f9fafb);
}

.country-name {
  flex: 1;
  color: var(--color-neutral-700, #374151);
}

.input-tel-error {
  color: var(--color-error-500, #dc2626);
  font-size: 12px;
  margin-top: 4px;
}
</style>
