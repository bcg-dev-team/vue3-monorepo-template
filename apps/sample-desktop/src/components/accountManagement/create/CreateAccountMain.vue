<template>
  <MainCardContent class="p-padding-24 border-bg-bg-outline border">
    <template #content>
      <div class="gap-size-12 flex flex-col">
        <div class="flex items-center">
          <div class="w-full">
            <span class="text-font-18 font-medium">개설된 계좌</span>
          </div>
          <div>
            <BaseButton
              variant="contained"
              size="md"
              color="primary"
              :leftIcon="{ name: 'plus', size: 'md' }"
              label="새 계좌 등록"
              @click="((showEnrollAccountCard = !showEnrollAccountCard), (selectedAccount = null))"
            ></BaseButton>
          </div>
        </div>
        <div class="gap-size-36 flex items-start">
          <div class="w-1/2">
            <template v-if="accountList.length > 0">
              <div class="mb-2 flex justify-end">
                <BaseButton
                  size="sm"
                  color="white"
                  variant="outlined"
                  :label="showAccountOrderChange ? '변경 완료' : '계좌 순서 변경'"
                  :leftIcon="{
                    name: showAccountOrderChange ? 'check-sm' : 'arrow-updown',
                    size: 'md',
                  }"
                  @click="handleAccountOrderChange"
                >
                </BaseButton>
              </div>
              <BaseList gap="12px">
                <!-- 활성화된 계좌들 (드래그 가능) -->
                <draggable
                  v-model="activeAccounts"
                  v-bind="dragOptions"
                  item-key="accountNo"
                  tag="ul"
                  @start="drag = true"
                  MODA
                  @end="onDragEnd"
                  class="account-list draggable-list flex flex-col gap-2"
                >
                  <template #item="{ element: account }">
                    <BaseListItem
                      clickable
                      :key="account.accountNo"
                      :selected="selectedAccount?.accountNo === account.accountNo"
                      :class="{
                        'draggable-item': true,
                        'flip-list-item': !drag,
                        'drag-mode-active': showAccountOrderChange,
                      }"
                      @click="((selectedAccount = account), (showEnrollAccountCard = false))"
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
                          <div><span class="text-font-18 font-semibold">$25,000.00</span></div>
                        </div>
                        <div
                          v-if="showAccountOrderChange"
                          class="drag-handle flex cursor-move items-center opacity-50 transition-opacity hover:opacity-100"
                        >
                          <BaseIcon name="grap" size="md" color="var(--font-color-muted)" />
                        </div>
                      </template>
                    </BaseListItem>
                  </template>
                </draggable>

                <div
                  v-for="account in disabledAccounts"
                  :key="account.accountNo"
                  class="account-list gap-2"
                >
                  <BaseListItem
                    clickable
                    :selected="selectedAccount?.accountNo === account.accountNo"
                    @click="selectedAccount = account"
                    :disabled="true"
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
                        <div><span class="text-font-18 font-semibold">$25,000.00</span></div>
                      </div>
                    </template>
                  </BaseListItem>
                </div>
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
          </div>
          <div class="gap-size-16 flex w-1/2 flex-col">
            <div class="w-full" v-if="showEnrollAccountCard">
              <EnrollAccountCard @createAccount="showEnrollAccountCard = false" />
            </div>
            <div class="w-full" v-if="selectedAccount">
              <AccountInfoDetail
                :key="selectedAccount.accountNo"
                :account="selectedAccount"
                @updateAccountName="updateAccountName"
                @updateAccountActive="updateAccountActive"
              />
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
  BaseIcon,
} from '@template/ui';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import EnrollAccountCard from './EnrollAccountCard.vue';
import AccountInfoDetail from './AccountInfoDetail.vue';
import { useUserStore } from '@/stores/useUserStore';
import { accountService } from '@/service/api';
import { ref, onMounted, computed } from 'vue';
import { AccountInfo } from '@template/api';
import draggable from 'vuedraggable';
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
    visible: 'Y',
    visibleSequence: '3',
  },
  {
    accountNo: '110-81-345153',
    accountSequence: '4',
    accountGrade: '4',
    accountAlias: '전략66',
    visible: 'Y',
    visibleSequence: '4',
  },
  {
    accountNo: '110-81-151533',
    accountSequence: '5',
    accountGrade: '4',
    accountAlias: '전략55',
    visible: 'N',
    visibleSequence: '5',
  },
  {
    accountNo: '110-81-151534',
    accountSequence: '6',
    accountGrade: '5',
    accountAlias: '전략4',
    visible: 'N',
    visibleSequence: '6',
  },
]);

const selectedAccount = ref<AccountInfo | null>(null);

const showEnrollAccountCard = ref(false);
const showAccountOrderChange = ref(false);
const drag = ref(false);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: !showAccountOrderChange.value, // showAccountOrderChange가 false면 드래그 비활성화
    ghostClass: 'ghost',
  };
});

// 활성화된 계좌를 위한 별도의 ref
const activeAccounts = ref<AccountInfo[]>([]);

// 활성화된 계좌와 비활성화된 계좌를 분리하는 computed
const disabledAccounts = computed(() =>
  accountList.value
    .filter((account) => account.visible === 'N')
    .sort((a, b) => parseInt(a.visibleSequence) - parseInt(b.visibleSequence))
);

// activeAccounts를 업데이트하는 함수
const updateActiveAccounts = () => {
  activeAccounts.value = accountList.value
    .filter((account) => account.visible === 'Y')
    .sort((a, b) => parseInt(a.visibleSequence) - parseInt(b.visibleSequence));
};

/**
 * 드래그 앤 드롭 완료 시 호출되는 함수
 * visibleSequence를 새로운 순서에 맞게 업데이트합니다.
 */
const onDragEnd = async () => {
  drag.value = false;

  // 드래그된 순서에 따라 visibleSequence 업데이트
  activeAccounts.value.forEach((account, index) => {
    const originalIndex = accountList.value.findIndex((acc) => acc.accountNo === account.accountNo);
    if (originalIndex !== -1) {
      accountList.value[originalIndex] = {
        ...account,
        visibleSequence: (index + 1).toString(),
      };
    }
  });

  console.log(
    '활성화된 계좌 순서가 변경되었습니다:',
    activeAccounts.value.map((acc) => ({
      accountAlias: acc.accountAlias,
      visibleSequence: acc.visibleSequence,
    }))
  );
  console.log('현재 accountList.value', accountList.value);
};

const getAccountInfo = async () => {
  try {
    const res = await accountService.getAccountInfo();
    accountList.value = res.data.data.accountList;
  } catch (error) {
    console.error('계좌 정보 조회 실패:', error);
  }
};

const updateAccountActive = async (isActive: boolean) => {
  console.log('계좌 활성화 상태 변경:', isActive ? 'Y' : 'N');

  if (selectedAccount.value) {
    selectedAccount.value.visible = isActive ? 'Y' : 'N';

    const accountIndex = accountList.value.findIndex(
      (acc) => acc.accountNo === selectedAccount.value!.accountNo
    );

    if (accountIndex !== -1) {
      accountList.value[accountIndex].visible = isActive ? 'Y' : 'N';
      console.log('accountList 업데이트 완료:', accountList.value[accountIndex]);

      // activeAccounts 즉시 업데이트
      updateActiveAccounts();
    }

    // 계좌 정보 변경 요청(활성화 상태)
    // updateAccountInfo();
  }
};

const updateAccountName = (newAlias: string) => {
  console.log('계좌 별명 변경:', newAlias);

  if (selectedAccount.value) {
    selectedAccount.value.accountAlias = newAlias;

    const accountIndex = accountList.value.findIndex(
      (acc) => acc.accountNo === selectedAccount.value!.accountNo
    );

    if (accountIndex !== -1) {
      accountList.value[accountIndex].accountAlias = newAlias;
      console.log('accountList 업데이트 완료:', accountList.value[accountIndex]);
    }
    // 계좌 정보 변경 요청(별칭)
    // updateAccountInfo();
  }
};

// 계좌 정보 변경 요청(별칭, 활성화 상태, 계좌 순서)
const updateAccountInfo = async () => {
  try {
    const updateInfos = activeAccounts.value.map((account) => ({
      accountNo: account.accountNo,
      accountAlias: account.accountAlias,
      visible: account.visible,
    }));

    // await accountService.updateAccountInfo(updateInfos);
    console.log('계좌 순서가 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('계좌 순서 저장 실패:', error);
    // TODO: 사용자에게 에러 메시지 표시
  }
};

const handleAccountOrderChange = () => {
  showAccountOrderChange.value = !showAccountOrderChange.value;
  if (!showAccountOrderChange.value) {
    // 서버에 변경된 순서 저장
    updateAccountInfo();
  }
};

onMounted(() => {
  // getAccountInfo();
  updateActiveAccounts();
});
</script>

<style scoped lang="scss">
.account-list {
  .draggable-list {
    width: 100%;
    > * {
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }
  }

  .list-item {
    border-radius: 10px;
    border: solid 0.5px var(--background-bg-outline);
    transition: all 0.2s ease;

    // 선택된 상태
    &.list-item--selected {
      background: none;
      box-shadow: inset 0 0 0 2px var(--base-colors-primary-primary800);
    }

    // 비활성화
    &.list-item--disabled {
      opacity: 1 !important;
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

    // 드래그 모드 활성화 시 hover 효과 비활성화
    &.drag-mode-active.list-item--clickable {
      &:hover {
        background-color: transparent !important;
      }

      &:active {
        background-color: transparent !important;
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

.draggable-item {
  transition: transform 0.5s ease;
}

.draggable-item:not(.flip-list-item) {
  transition: transform 0s;
}
</style>
