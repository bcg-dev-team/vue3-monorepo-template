<template>
  <MainCardContent class="px-padding-24 py-padding-36 border-primary-primary800 border-2">
    <template #content>
      <div>
        <div>
          <span class="text-font-16 font-semibold">새 계좌 등록</span>
        </div>
        <div class="mt-size-16">
          <form class="gap-size-16 flex flex-col">
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌별명"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    size="sm"
                    type="text"
                    placeholder="10자 이내 입력"
                    v-model="state.accountAlias"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              label="계좌 비밀번호"
              class="pb-padding-16 border-bg-bg-outline border-b"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="number"
                    placeholder="6자리 입력"
                    v-model="state.accountPassword"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              label="계좌 비밀번호 확인"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="number"
                    placeholder="6자리 입력"
                    v-model="state.accountPasswordCheck"
                  />
                </div>
              </template>
            </LabelContent>

            <div>
              <div class="flex items-center justify-between gap-4">
                <BaseButton
                  variant="contained"
                  size="lg"
                  color="primary"
                  label="계좌 등록하기"
                  :disabled="
                    state.accountAlias === '' ||
                    state.accountPassword === '' ||
                    state.accountPasswordCheck === '' ||
                    state.accountPassword !== state.accountPasswordCheck
                  "
                  fullWidth
                  @click="handleCreateAccount"
                />
                <BaseButton
                  variant="outlined"
                  size="lg"
                  color="white"
                  label="취소"
                  fullWidth
                  @click="emit('cancel')"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseButton, BaseInput } from '@template/ui';
import { accountService } from '@/service/api';
import { reactive } from 'vue';

const state = reactive({
  accountAlias: '',
  accountPassword: '',
  accountPasswordCheck: '',
});
const emit = defineEmits<{
  (e: 'createAccount'): void;
  (e: 'cancel'): void;
}>();

const handleCreateAccount = async () => {
  const requestData = {
    accountPassword: state.accountPassword,
    accountAlias: state.accountAlias,
  };
  try {
    const res = await accountService.createAccount(requestData);

    if (res.status === 'success') {
      emit('createAccount');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
