<template>
  <form class="base-form" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import type { FormContext } from 'vee-validate';

interface Props {
  initialValues?: Record<string, any>;
  validationSchema?: any;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
  validationSchema: undefined,
  onSubmit: undefined,
});

const emit = defineEmits<{
  submit: [values: Record<string, any>];
  error: [errors: Record<string, any>];
}>();

const handleSubmit = async (values: Record<string, any>) => {
  try {
    if (props.onSubmit) {
      await props.onSubmit(values);
    }
    emit('submit', values);
  } catch (error) {
    emit('error', error as Record<string, any>);
  }
};
</script>

<style scoped>
.base-form {
  width: 100%;
}
</style>
