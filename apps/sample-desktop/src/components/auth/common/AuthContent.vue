<template>
  <div
    class="gap-size-48 bg-neutral-neutral000 border-bg-outline m-auto flex w-[460px] flex-col rounded-md border px-[50px] pb-[60px] pt-[50px]"
  >
    <slot name="header" />
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
interface Props {
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
});
</script>
