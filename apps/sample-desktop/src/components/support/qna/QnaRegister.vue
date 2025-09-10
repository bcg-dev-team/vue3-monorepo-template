<template>
  <div>
    <div>
      <span class="text-font-20 font-semibold">문의 내용</span>
    </div>
    <div class="mt-size-8">
      <div class="border-t border-[var(--table-type2-body-border)]">
        <TableLabel title="제목">
          <BaseInput class="w-[600px]" size="sm" placeholder="제목을 입력하세요." />
        </TableLabel>
      </div>
      <div class="border-t border-[var(--table-type2-body-border)]">
        <TableLabel title="카테고리">
          <BaseInput class="w-[240px]" size="sm" placeholder="셀렉트 박스가 들어갈 예정이에요" />
        </TableLabel>
      </div>
      <div class="border-t border-[var(--table-type2-body-border)]">
        <TableLabel title="내용">
          <div class="py-size-8 min-h-[516px] w-full">
            <BaseInput size="sm" placeholder="Text Area가 들어갈 예정이에요" />
          </div>
        </TableLabel>
      </div>
      <div class="border-b border-t border-[var(--table-type2-body-border)]">
        <TableLabel title="첨부파일">
          <div class="gap-size-10 flex items-center">
            <div>
              <BaseFileUploadButton class="w-[130px]" status="hover" />
            </div>
            <div class="gap-size-4 flex items-center">
              <Anchor @click="() => logger.info('첨부파일 클릭!')">
                20250601_Screenshot_14.00.01.jpg
              </Anchor>
              <BaseIcon name="icn-delete" size="sm" color="var(--input-icon-off)" />
            </div>
          </div>
        </TableLabel>
      </div>
    </div>
    <div class="gap-size-12 pt-padding-24 flex justify-center">
      <BaseButton label="등록하기" size="lg" variant="contained" />
      <BaseButton label="취소" size="lg" variant="outlined" color="white" @click="type = null" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseInput, BaseIcon, BaseFileUploadButton, BaseButton } from '@template/ui';
import TableLabel from '@/components/support/qna/common/TableLabel.vue';
import Anchor from '@/components/common/Anchor.vue';
import { logger } from '@template/utils';

const type = defineModel<null | 'register' | 'detail'>('type', { required: true });
</script>
