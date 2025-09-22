<template>
  <MainCardContent class="px-padding-24 py-padding-36 border-bg-bg-outline border">
    <template #content>
      <div>
        <div>
          <span class="text-font-16 font-semibold">{{
            accoutInfoState ? '계좌정보 변경' : '계좌정보'
          }}</span>
        </div>
        <div class="mt-size-16">
          <form class="gap-size-16 flex flex-col">
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌 번호"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <span class="text-font-16 font-medium">{{ account.accountNo }}</span>
                </div>
              </template>
            </LabelContent>
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌별명"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div
                    v-if="!inputState.updateAccountName"
                    class="flex items-center justify-between"
                  >
                    <span class="text-font-16 font-medium">{{ account.accountAlias }}</span>
                    <BaseButton
                      v-if="!inputState.updateAccountName && !inputState.updateAccountPassword"
                      variant="chip"
                      color="grey"
                      label="변경하기"
                      @click="inputState.updateAccountName = true"
                    />
                  </div>
                  <BaseInput
                    v-else
                    size="sm"
                    type="text"
                    placeholder="10자 이내 입력"
                    :readonly="!inputState.updateAccountName"
                    v-model="accountAlias"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              :class="
                inputState.updateAccountPassword && 'pb-padding-16 border-bg-bg-outline border-b'
              "
              label="계좌 비밀번호"
              class="pb-padding-16 border-bg-bg-outline border-b"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div
                    v-if="!inputState.updateAccountPassword"
                    class="flex items-center justify-between"
                  >
                    <span class="text-font-16 font-medium">●●●●●●</span>
                    <BaseButton
                      v-if="!inputState.updateAccountPassword && !inputState.updateAccountName"
                      variant="chip"
                      color="grey"
                      label="변경하기"
                      @click="inputState.updateAccountPassword = true"
                    />
                  </div>
                  <BaseInput
                    v-else
                    size="sm"
                    type="text"
                    placeholder="10자 이내 입력"
                    :readonly="!inputState.updateAccountName"
                    v-model="accountPassword"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              v-if="inputState.updateAccountPassword"
              label="계좌 비밀번호 확인"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4 flex items-center justify-between">
                  <BaseInput class="w-[140px]" size="sm" type="text" placeholder="6자리 입력" />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              v-if="!accoutInfoState"
              :class="
                inputState.updateAccountPassword && 'pb-padding-16 border-bg-bg-outline border-b'
              "
              label="활성화 여부"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div class="flex items-center justify-between">
                    <span class="text-font-16 font-medium">계좌 활성화</span>
                    <div>토글이 들어올 영역</div>
                  </div>
                </div>
              </template>
            </LabelContent>

            <div v-if="accoutInfoState">
              <BaseButton
                variant="contained"
                size="lg"
                color="primary"
                label="계좌정보 변경하기"
                fullWidth
                @click="updateAccountInfo"
              />
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
import { computed, reactive, ref } from 'vue';
import { AccountInfo } from '@template/api';

const props = defineProps<{
  account: AccountInfo;
}>();

const accountAlias = ref('');
const accountPassword = ref('');
const accountPasswordCheck = ref('');

const inputState = reactive({
  updateAccountName: false,
  updateAccountPassword: false,
});

const updateAccountInfo = () => {
  if (inputState.updateAccountName) {
    // accountService.updateAccountInfo(
    //   props.account.email,
    //   props.account.accountNo,
    //   accountAlias.value
    // );
  }
  inputState.updateAccountName = false;
  inputState.updateAccountPassword = false;
};

const accoutInfoState = computed(() => {
  return inputState.updateAccountName || inputState.updateAccountPassword;
});
</script>
