<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>
    <Field v-slot="{ field, errorMessage, meta }" :name="name" :value="modelValue">
      <input
        :id="id"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'base-input__field',
          {
            'base-input__field--error': errorMessage,
            'base-input__field--valid': meta.valid && meta.touched,
          },
        ]"
        @input="handleInput"
      />
    </Field>
    <ErrorMessage :name="name" class="base-input__error" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';

interface Props {
  name: string;
  modelValue?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  id: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.base-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.base-input__required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.base-input__field {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
}

.base-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input__field--error {
  border-color: #ef4444;
}

.base-input__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input__field--valid {
  border-color: #10b981;
}

.base-input__field--valid:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.base-input__field:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}

.base-input__error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}
</style>
