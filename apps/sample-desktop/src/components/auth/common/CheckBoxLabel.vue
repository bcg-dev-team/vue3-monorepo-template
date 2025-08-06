<template>
  <div class="gap-size-4 flex items-center">
    <BaseCheckbox v-model="isChecked" />
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { BaseCheckbox } from '@template/ui';

const isChecked = defineModel<boolean>('isChecked', { required: true });
</script>
