<template>
  <div class="flex flex-col gap-[33px]">
    <FormField label="신분증 (주민증록증 또는 운전면허증)*">
      <BaseFileUploadButton
        status="hover"
        @file-selected="handleFileSelected"
        @remove="handleFileRemove"
      />
    </FormField>
    <div>
      <div class="mt-size-12 gap-size-4 flex items-center">
        <span class="text-font-16 font-semibold">신분증의 주소가 현 주소와 다른가요?</span>
        <BaseCheckbox v-model="isChecked" />
      </div>
      <div v-if="isChecked" class="gap-size-12 mt-size-4 flex flex-col">
        <span class="text-font-14">
          <span class="font-medium">주민등록 초본(영문)</span> 또는
          <span class="font-medium">관공서 납부영수증</span>을 제출해주세요.
        </span>
        <BaseFileUploadButton status="hover" />
      </div>
    </div>
    <div class="">
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
import { useSignupStore } from '@/stores/useSignupStore';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';

const signupStore = useSignupStore();
const router = useRouter();

const isChecked = ref<boolean>(false);

const state = reactive({
  idCard: null as File | null,
  additionalIdDocument: null as File | null,
});

const handleFileSelected = (file: File) => {
  state.idCard = file;
  console.log(file);
};

const handleFileRemove = (file: File) => {
  state.idCard = null;
  console.log(file);
};

const handleSubmit = () => {
  if (state.idCard) {
    signupStore.uploadIndividualDocument(state.idCard, state.additionalIdDocument);
    router.push({ name: 'sign-up-complete' });
  }
};
</script>
