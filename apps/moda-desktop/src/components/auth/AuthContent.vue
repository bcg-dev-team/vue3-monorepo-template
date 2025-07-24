<template>
  <div class="px-[50px] pt-[50px] pb-[60px]">
    <slot name="header" />
    <div>
      <img class="h-[70px] w-auto" src="@/assets/logo/moda_logo.svg" alt="logo" />
    </div>
    <div class="mt-6">
      <h2 class="text-3xl font-semibold">{{ props.title }}</h2>
      <p class="mt-3 font-regular text-lg">{{ props.description }}</p>
    </div>
    <slot name="content" />
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
