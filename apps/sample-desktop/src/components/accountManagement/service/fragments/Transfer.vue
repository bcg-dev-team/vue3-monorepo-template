<template>
  <div class="gap-size-24 flex">
    <MainCardContent class="p-padding-24 !bg-red-red050 border-red-red800 w-[424px]">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">출금계좌</span>
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
    <MainCardContent class="p-padding-24 w-[424px]">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">출금 금액</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInput placeholder="" />
            <div class="gap-size-8 grid grid-cols-4">
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="100"
                variant="contained"
                size="md"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="500"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="1,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="1,500"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="2,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="5,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="10,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="15,000"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="25%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="50%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
                label="75%"
                variant="contained"
                size="md"
                color="grey"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe h-[44px] !text-black"
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
    <MainCardContent class="p-padding-24 !bg-blue-blue050 border-blue-blue800-deep w-[424px]">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">이체받을 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInput placeholder="input select 가 들어갈 예정이에요" />
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
