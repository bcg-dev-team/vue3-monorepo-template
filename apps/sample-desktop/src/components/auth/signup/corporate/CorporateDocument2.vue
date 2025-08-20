<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="주주 명부(영문 공증 필요)">
      <BaseFileUploadButton status="hover" />
    </FormField>
    <FormField label="법인대표 여권 사본">
      <BaseFileUploadButton status="hover" />
    </FormField>
    <div>
      <div class="mt-size-12 gap-size-4 flex items-center">
        <span class="text-font-16 font-semibold">법인의 대표가 2명 이상인가요?</span>
        <BaseCheckbox v-model="isChecked" />
      </div>
      <div v-if="isChecked" class="gap-size-12 mt-size-4 flex flex-col">
        <span class="text-font-14"> 모든 법인대표들의 여권 사본을 각각 제출해주세요. </span>
        <BaseFileUploadButton status="hover" />
        <BaseButton
          size="sm"
          label=""
          variant="contained"
          :rightIcon="{ name: 'plus' }"
          color="cancel"
          full-width
        />
      </div>
    </div>
    <div class="mt-[33px]">
      <BaseButton
        size="lg"
        label="제출하기"
        variant="contained"
        color="primary"
        full-width
        @click="handleSubmit"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BaseButton, BaseFileUploadButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isChecked = ref<boolean>(false);

const handleSubmit = () => {
  router.replace({ name: 'sign-up-complete' });
};
</script>
