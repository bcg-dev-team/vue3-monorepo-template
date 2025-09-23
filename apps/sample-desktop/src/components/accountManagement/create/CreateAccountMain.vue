<template>
  <MainCardContent class="p-padding-24 border-bg-bg-outline border">
    <template #content>
      <div class="gap-size-12 flex flex-col">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-font-18 font-medium">개설된 계좌</span>
          </div>
          <div>
            <BaseButton
              variant="contained"
              size="md"
              color="primary"
              :leftIcon="{ name: 'plus', size: 'md' }"
              label="새 계좌 등록"
              @click="showEnrollAccountCard = !showEnrollAccountCard"
            ></BaseButton>
          </div>
        </div>
        <div class="account-list gap-size-36 flex items-start">
          <template v-if="accountList.length > 0">
            <BaseList gap="12px">
              <BaseListItem
                clickable
                v-for="account in accountList"
                :key="account.accountNo"
                :selected="selectedAccount?.accountNo === account.accountNo"
                @click="selectedAccount = account"
              >
                <template #content>
                  <BaseListItemAvatar
                    :icon="{ name: 'card', size: 'md', color: 'var(--input-icon-white)' }"
                    size="lg"
                    variant="rounded"
                  />
                  <BaseListItemText
                    :primary="account.accountAlias"
                    :secondary="account.accountNo"
                  />

                  <div class="gap-size-12 flex items-center">
                    <BaseChip class="!rounded-[3px]" label="사용중" variant="blue" size="sm" />
                    <div><span class="text-font-18 font-semibold">$25,000.00</span></div>
                  </div>
                </template>
              </BaseListItem>
            </BaseList>
          </template>
          <template v-else>
            <div class="flex h-[590px] w-full items-center justify-center">
              <div class="text-default-muted text-font-14 text-center">
                <p>등록된 계좌가 아직 없어요</p>
                <p>새 계좌를 등록해보세요</p>
              </div>
            </div>
          </template>
          <div class="gap-size-16 flex w-full flex-col">
            <div class="w-full" v-if="showEnrollAccountCard">
              <EnrollAccountCard @createAccount="showEnrollAccountCard = false" />
            </div>
            <div class="w-full" v-if="selectedAccount">
              <AccountInfoDetail :account="selectedAccount" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>
<script setup lang="ts">
import {
  BaseButton,
  BaseList,
  BaseListItem,
  BaseListItemAvatar,
  BaseListItemText,
  BaseChip,
} from '@template/ui';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { AccountInfo, AccountCreateRequest } from '@template/api';
import EnrollAccountCard from './EnrollAccountCard.vue';
import AccountInfoDetail from './AccountInfoDetail.vue';
import { useUserStore } from '@/stores/useUserStore';
import { accountService } from '@/service/api';
import { ref, onMounted } from 'vue';
const userStore = useUserStore();

const accountList = ref<AccountInfo[]>([
  {
    accountNo: '110-81-345150',
    accountSequence: '1',
    accountGrade: '1',
    accountAlias: '전략99',
    visible: 'Y',
    visibleSequence: '1',
  },
  {
    accountNo: '110-81-345151',
    accountSequence: '2',
    accountGrade: '2',
    accountAlias: '전략88',
    visible: 'Y',
    visibleSequence: '2',
  },
  {
    accountNo: '110-81-345152',
    accountSequence: '3',
    accountGrade: '3',
    accountAlias: '전략77',
    visible: 'N',
    visibleSequence: '3',
  },
]);

const selectedAccount = ref<AccountInfo | null>(null);

const showEnrollAccountCard = ref(false);
const showAccountInfoDetail = ref(true);

const getAccountInfo = async () => {
  try {
    const res = await accountService.getAccountInfo();
    accountList.value = res.accountList;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAccountInfo();
});
</script>

<style scoped lang="scss">
.account-list {
  .list-item {
    border-radius: 10px;
    border: solid 0.5px var(--background-bg-outline);

    // 선택된 상태
    &.list-item--selected {
      background: none;
      box-shadow: inset 0 0 0 2px var(--base-colors-primary-primary800);
    }

    // 비활성화
    &.list-item--disabled {
      opacity: 1 !important;
      cursor: not-allowed !important;
      color: var(--font-color-default) !important;

      &:hover {
        background-color: var(--background-bg-default) !important;
      }

      // BaseListItemText의 비활성화 상태 스타일 오버라이드
      :deep(.list-item-text__primary) {
        color: var(--font-color-default) !important;
      }
    }

    &.list-item--clickable {
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--background-bg-surface);
      }

      &:active {
        background-color: var(--background-bg-outline);
      }

      &:focus {
        outline: none;
        outline-offset: 2px;
      }
    }

    .list-item-avatar {
      border: none !important;
      background: linear-gradient(135deg, #ffcc00, #ff8400) !important;
    }

    // 비활성화 상태일 때 아바타 배경색 변경
    &.list-item--disabled {
      :deep(.list-item-avatar) {
        background: var(--background-bg-surface-muted) !important;
      }
    }
  }
}
</style>
