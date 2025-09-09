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
              label="계좌 번호"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput size="sm" type="text" placeholder="계좌 번호를 입력해주세요" />
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
                  <BaseInput size="sm" type="text" placeholder="10자 이내 입력" />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              label="계좌 비밀번호"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput class="w-[140px]" size="sm" type="text" placeholder="6자리 입력" />
                </div>
              </template>
            </LabelContent>
            <div>
              <BaseButton
                variant="contained"
                size="lg"
                color="primary"
                label="계좌 등록하기"
                fullWidth
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
</script>
