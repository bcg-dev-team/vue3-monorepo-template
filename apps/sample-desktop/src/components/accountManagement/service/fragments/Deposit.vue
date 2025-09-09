<template>
  <div class="gap-size-24 flex">
    <MainCardContent
      class="p-padding-24 w-[424px] border border-[var(--button-red-border)] !bg-[var(--button-red-background)]"
    >
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">입금정보</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <LabelContent label="입금 계좌번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput placeholder="6자리" />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="대표 트레이딩 계좌번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput placeholder="input select 가 들어갈 예정이에요" />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="트레이딩계좌 비밀번호" size="sm">
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
            <span class="text-font-16 font-semibold">입금 금액</span>
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
    <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[424px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">송금내역서 첨부</span>
          </div>
          <div
            class="mt-size-12 bg-bg-bg-default p-padding-16 border-bg-bg-outline gap-size-10 flex flex-col items-center justify-center rounded-[10px] border-2 border-dashed"
          >
            <div class="p-padding-16 bg-bg-bg-surface rounded-full">
              <BaseIcon name="upload" size="md" />
            </div>
            <div class="gap-size-4 flex flex-col text-center">
              <span class="text-font-14 font-semibold">파일을 선택하거나 드래그하세요</span>
              <span class="text-font-12 text-default-muted-dark"
                >JPG, PNG, PDF 파일만 업로드 가능 (최대 10MB)</span
              >
            </div>
          </div>
          <div
            class="gap-size-4 border-primary-primary800 bg-primary-primary100 p-padding-8 mt-size-16 flex rounded-md border"
          >
            <div>
              <BaseIcon name="warning2" size="sm" color="var(--chips-status-pending-text)" />
            </div>
            <div class="text-[var(--chips-status-pending-text)]">
              <span class="text-font-14 font-semibold">송금내역서업로드 안내</span>
              <ul class="text-font-12 list-inside list-disc">
                <li>인터넷뱅킹 또는 은행 앱에서 송금 완료 화면을 캡쳐해주세요</li>
                <li>입금 금액, 계좌번호, 날짜가 명확히 보이는 파일을 업로드해주세요</li>
                <li>파일 크기는 10MB 이하로 업로드해주세요</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseButton, BaseInput, BaseIcon } from '@template/ui';
</script>
