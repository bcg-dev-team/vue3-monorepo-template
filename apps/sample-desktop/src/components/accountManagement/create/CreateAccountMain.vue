<template>
  <MainCardContent class="p-padding-24">
    <template #content>
      <div class="gap-size-12 flex flex-col">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-font-18 font-medium">등록된 계좌</span>
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
        <div class="gap-size-36 flex items-start">
          <div class="flex h-[590px] w-full items-center justify-center">
            <div class="text-default-muted text-font-14 text-center">
              <p>등록된 계좌가 아직 없어요</p>
              <p>새 계좌를 등록해보세요</p>
            </div>
          </div>
          <div class="gap-size-16 flex w-full flex-col">
            <div class="w-full" v-if="showEnrollAccountCard">
              <EnrollAccountCard />
            </div>
            <div class="w-full" v-if="showAccountInfoDetail">
              <AccountInfoDetail />
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import EnrollAccountCard from './EnrollAccountCard.vue';
import AccountInfoDetail from './AccountInfoDetail.vue';
import { BaseButton } from '@template/ui';
import { ref } from 'vue';

const showEnrollAccountCard = ref(false);
const showAccountInfoDetail = ref(true);
</script>
