<!--
  BaseFormControlLabel - Headless UI 패턴의 폼 컨트롤 라벨 컴포넌트
  체크박스와 라벨을 연결하는 순수한 로직만 제공하며, 레이아웃과 스타일링은 사용자가 자유롭게 구성
-->
<template>
  <div @click="toggle">
    <slot :checked="checked" :toggle="toggle" :disabled="disabled" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * BaseFormControlLabel - Headless UI 패턴의 폼 컨트롤 라벨 컴포넌트
 *
 * 체크박스와 라벨을 연결하는 순수한 로직만 제공합니다.
 * 레이아웃, 스타일링, 라벨 위치는 사용자가 자유롭게 구성할 수 있습니다.
 *
 * @example
 * ```vue
 * <!-- 기본 사용법 (상태 관리) -->
 * <BaseFormControlLabel v-model="agreed">
 *   <template #default="{ checked, toggle, disabled }">
 *     <BaseCheckbox :model-value="checked" @update:model-value="toggle" :disabled="disabled" />
 *     <span>이용약관에 동의합니다</span>
 *   </template>
 * </BaseFormControlLabel>
 *
 * <!-- 간편한 사용법 (props 전달) -->
 * <BaseFormControlLabel v-model="agreed">
 *   <BaseCheckbox v-model="agreed" />
 *   <span>이용약관에 동의합니다</span>
 * </BaseFormControlLabel>
 * ```
 */

interface Props {
  /**
   * 체크 상태 (v-model)
   */
  modelValue?: boolean;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'toggle', value: boolean): void;
}

const emit = defineEmits<Emits>();

// 단순하게 computed로 checked 상태 관리
const checked = computed(() => props.modelValue);

/**
 * 토글 함수 / 클릭 핸들러
 */
const toggle = (newValue?: boolean | MouseEvent) => {
  if (props.disabled) return;

  // MouseEvent인 경우 (클릭 이벤트) 토글, boolean인 경우 해당 값 설정
  const nextValue = typeof newValue === 'boolean' ? newValue : !checked.value;

  emit('update:modelValue', nextValue);
  emit('toggle', nextValue);
};

// 외부에서 접근할 수 있도록 노출
defineExpose({
  toggle,
  checked,
});
</script>
