<template>
  <div
    class="gap-size-48 bg-neutral-neutral000 border-bg-outline m-auto flex w-[460px] flex-col rounded-md border px-[50px] pb-[60px] pt-[50px]"
  >
    <div v-if="totalStep" class="flex items-center justify-between">
      <div class="cursor-pointer" @click="router.back()">
        <BaseIcon name="arrow-backward" size="md" />
      </div>
      <BaseStepper variant="dot" :dot-config="{ count: props.totalStep }" :current="currentStep" />
    </div>
    <div v-if="props.title">
      <div>
        <img class="h-[70px] w-auto" src="@/assets/logo/moda_logo.svg" alt="logo" />
      </div>
      <div class="mt-6">
        <h2 class="text-font-24 tracking-3 font-semibold">{{ props.title }}</h2>
        <p class="text-font-16 tracking-3 mt-3" v-html="props.description"></p>
      </div>
    </div>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseIcon, BaseStepper } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  title?: string;
  description?: string;
  totalStep?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  totalStep: undefined,
});

const currentStep = defineModel<number>('currentStep', { required: false });
</script>
