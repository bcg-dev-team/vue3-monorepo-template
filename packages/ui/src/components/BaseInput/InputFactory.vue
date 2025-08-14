<!--
  InputFactory.vue
  모든 Input 타입을 통합 관리하는 Factory 컴포넌트
  
  Figma 컴포넌트: BaseInput (통합)
-->
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { CommonInputProps } from './types';
import './styles/_input-base.scss';

interface Props extends CommonInputProps {
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'number' | 'date' | 'select' | 'stepper';
  // Select 전용 props
  options?: Array<{ value: string; label: string }>;
  // Number, Stepper 전용 props
  min?: number;
  max?: number;
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  fullWidth: false,
});

const emit = defineEmits<{
  'update:model-value': [value: string | number];
  focus: [];
  blur: [];
  input: [event: Event];
}>();

// 단순 타입과 복잡한 타입 구분
const isSimpleType = computed(() =>
  ['text', 'email', 'search', 'tel', 'number'].includes(props.type)
);

// 복잡한 타입용 컴포넌트 동적 로딩
const complexComponent = computed(() => {
  switch (props.type) {
    case 'select':
      return defineAsyncComponent(() => import('./InputSelect/InputSelect.vue'));
    case 'date':
      return defineAsyncComponent(() => import('./InputCalendar/InputCalendar.vue'));
    case 'stepper':
      return defineAsyncComponent(() => import('./InputStepper/InputStepper.vue'));
    case 'password':
      return defineAsyncComponent(() => import('./InputPassword/InputPassword.vue'));
    default:
      return null;
  }
});

// 단순 타입용 클래스
const inputClasses = computed(() => [
  'input-base',
  { 'w-full': props.fullWidth, 'w-[200px]': !props.fullWidth },
  { disabled: props.disabled },
]);

// 복잡한 타입용 props
const complexProps = computed(() => {
  switch (props.type) {
    case 'select':
      return { options: props.options };
    case 'number':
    case 'stepper':
      return { min: props.min, max: props.max, step: props.step };
    default:
      return {};
  }
});

// 단순 타입 input 이벤트 핸들러
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('input', event);
  emit('update:model-value', target.value);
};
</script>

<template>
  <!-- 단순 타입은 HTML input 직접 사용 -->
  <input
    v-if="isSimpleType"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :min="type === 'number' ? min : undefined"
    :max="type === 'number' ? max : undefined"
    :step="type === 'number' ? step : undefined"
    :class="inputClasses"
    @input="handleInput"
    @focus="emit('focus')"
    @blur="emit('blur')"
  />

  <!-- 복잡한 타입은 별도 컴포넌트 사용 -->
  <component
    v-else
    :is="complexComponent"
    v-bind="{ ...$props, ...complexProps }"
    @update:model-value="emit('update:model-value', $event)"
    @focus="emit('focus')"
    @blur="emit('blur')"
    @input="emit('input', $event)"
  />
</template>
