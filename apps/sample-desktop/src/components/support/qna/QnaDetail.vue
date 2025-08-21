<template>
  <div class="gap-size-48 flex flex-col">
    <div>
      <div>
        <span class="text-font-20 font-semibold">문의 내용</span>
      </div>
      <div class="mt-size-8">
        <table class="qna-table">
          <tr>
            <th>제목</th>
            <td>
              <BaseChip class="mr-size-10" label="답변완료" variant="red" size="sm" />
              출금신청이 잘 됐는지 문의드립니다!
            </td>
            <th>작성일시</th>
            <td>2025.05.25 09:15:46</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td colspan="3">출금/예치</td>
          </tr>
          <tr>
            <th>내용</th>
            <td class="qna-content" colspan="3">
              <div class="min-h-size-200">
                출금신청이 잘 되었는지 모르겠어서 문의드립니다.<br />
                신청 이름: 김주석<br />
                신한은행 110-81-2301410
              </div>
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td colspan="3">
              <Anchor @click="() => console.log('첨부파일 클릭!')">
                20250601_Screenshot_14.00.01.jpg
              </Anchor>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div>
        <span class="text-font-20 font-semibold">관리자 답변</span>
      </div>
      <div class="mt-size-8">
        <table class="qna-table">
          <tr>
            <th>제목</th>
            <td>답변 드립니다.</td>
            <th>답변일시</th>
            <td>2025.05.25 09:15:46</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td colspan="3">출금/예치</td>
          </tr>
          <tr>
            <th>내용</th>
            <td class="qna-content" colspan="3">
              <div class="min-h-size-200"></div>
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td colspan="3"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="mt-size-24 flex justify-center">
    <BaseButton label="확인" size="lg" @click="type = null" />
  </div>
</template>
<script setup lang="ts">
import Anchor from '@/components/common/Anchor.vue';
import { BaseButton, BaseChip } from '@template/ui';

const type = defineModel<null | 'register' | 'detail'>('type', { required: true });
</script>
