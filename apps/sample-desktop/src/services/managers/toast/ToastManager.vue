<template>
  <BaseToast :message="currentMessage" :show="showToast" />
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/useToastStore';
import { BaseToast } from '@template/ui';
import { watch, ref } from 'vue';

const toastStore = useToastStore();
const showToast = ref(false);
const currentMessage = ref('');
let toastTimer: NodeJS.Timeout | null = null;

watch(
  () => toastStore.currentToast,
  (newToast) => {
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }

    if (newToast) {
      currentMessage.value = newToast.message;
      showToast.value = true;

      toastTimer = setTimeout(() => {
        showToast.value = false;

        setTimeout(() => {
          toastStore.removeCurrentToast();
        }, 300);
      }, newToast.duration || 1200);
    } else {
      showToast.value = false;
    }
  },
  { immediate: true }
);
</script>
