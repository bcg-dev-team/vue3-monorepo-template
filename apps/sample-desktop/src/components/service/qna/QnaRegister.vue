<template>
  <div>
    <div>
      <span class="text-font-20 font-semibold">문의 내용</span>
    </div>
    <div class="mt-size-8">
      <table class="qna-table">
        <tr>
          <th>제목</th>
          <td class="!py-2" colspan="3">
            <BaseInput class="w-[600px]" size="sm" placeholder="제목을 입력하세요." />
          </td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td class="!py-2" colspan="3">
            <BaseInput class="w-[240px]" size="sm" placeholder="셀렉트 박스가 들어갈 예정이에요" />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td class="qna-content !py-2" colspan="3">
            <div class="min-h-[516px]">
              <BaseInput size="sm" placeholder="Text Area가 들어갈 예정이에요" />
            </div>
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td class="!py-2" colspan="3">
            <div class="gap-size-10 flex items-center">
              <div>
                <BaseFileUploadButton class="w-[130px]" status="hover" />
              </div>
              <div class="gap-size-4 flex items-center">
                <a class="text-blue underline" href="#">20250601_Screenshot_14.00.01.jpg</a>
                <BaseIcon name="icn-delete" size="sm" color="rgba(180, 182, 187, 1)" />
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="gap-size-12 pt-padding-24 flex justify-center">
      <BaseButton label="등록하기" size="lg" variant="contained" />
      <BaseButton label="취소" size="lg" variant="outlined" @click="type = null" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseInput, BaseIcon, BaseFileUploadButton, BaseButton } from '@template/ui';

const type = defineModel<null | 'register' | 'detail'>('type', { required: true });
</script>
