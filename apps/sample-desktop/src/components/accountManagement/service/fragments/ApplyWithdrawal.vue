<template>
  <div class="gap-size-24 flex">
    <MainCardContent
      class="p-padding-24 !bg-bg-bg-innerframe border-bg-bg-outline w-[424px] border"
    >
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">선택된 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInput placeholder="input select 가 들어갈 예정이에요" />
            <LabelContent label="계좌 비밀번호(6자리)" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput class="w-[140px]" placeholder="6자리" />
                </div>
              </template>
            </LabelContent>
          </div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 border-bg-bg-outline w-[424px] border">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">출금 금액</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInput placeholder="" />
            <div class="gap-size-8 grid grid-cols-4">
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="100"
                variant="contained"
                size="md"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="500"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="1,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="1,500"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="2,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="5,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="10,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="15,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="25%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="50%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="75%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="전액"
                variant="contained"
                size="md"
                color="grey"
              />
            </div>
          </div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 !bg-primary-primary100 w-[424px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">선택된 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <LabelContent label="입금은행" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput placeholder="6자리" />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="입금 계좌번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput placeholder="계좌번호를 입력하세요 (예: 123-456-789012)" />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="예금주명" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput placeholder="예금주명을 입력하세요" />
                </div>
              </template>
            </LabelContent>
          </div>
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseButton, BaseInput } from '@template/ui';
</script>
