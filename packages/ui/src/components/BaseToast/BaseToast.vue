<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="visible"
        class="fixed left-1/2 top-1/2 z-[1400] min-w-[200px] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
        role="alert"
        aria-live="polite"
      >
        <div
          class="relative flex items-center justify-center gap-[10px] rounded-[5px] border border-[#caccce] bg-white px-[68px] py-[42px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]"
        >
          <p
            class="m-0 whitespace-nowrap text-center text-[16px] font-normal leading-[24px] text-[#131313]"
          >
            {{ message }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

/**
 * 화면 정중앙에 표시되는 토스트 컴포넌트
 *
 * @props message - 표시할 메시지 텍스트
 * @props show - 토스트 표시 여부
 */
interface Props {
  /** 표시할 메시지 텍스트 */
  message: string;
  /** 토스트 표시 여부 */
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const visible = ref(false);

// show prop 변경 감시
watch(
  () => props.show,
  (newShow) => {
    visible.value = newShow;
  },
  { immediate: true }
);
</script>
