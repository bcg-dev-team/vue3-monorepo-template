<!-- BasePagination 데모 컴포넌트 -->
<script setup lang="ts">
import { ref } from 'vue';
import BasePagination from './BasePagination.vue';

const currentPage = ref(1);
const totalPages = ref(20);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  console.log('페이지 변경:', page);
};
</script>

<template>
  <div class="space-y-8 p-6">
    <div>
      <h2 class="text-lg font-semibold mb-4">기본 페이지네이션</h2>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600">현재 페이지: {{ currentPage }}</span>
        <BasePagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">첫/마지막 버튼 포함</h2>
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :show-first-last="true"
        @page-change="handlePageChange"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">적은 페이지 수 (3페이지)</h2>
      <BasePagination :current-page="1" :total-pages="3" @page-change="handlePageChange" />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">많은 페이지 수 (100페이지, 현재 50페이지)</h2>
      <BasePagination
        :current-page="50"
        :total-pages="100"
        :show-first-last="true"
        @page-change="handlePageChange"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">커스텀 최대 표시 페이지 수 (3개)</h2>
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :max-visible-pages="3"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
