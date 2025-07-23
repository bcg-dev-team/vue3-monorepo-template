<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NCard, NButton, NSpin, NAlert } from 'naive-ui';

interface User {
  user_id: string;
  user_name: string;
}

interface Props {
  userId: string;
}

const props = defineProps<Props>();

// 반응형 상태
const user = ref<User | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

/**
 * 사용자 정보를 가져오는 함수
 * MSW가 활성화되어 있으면 모킹된 데이터를 받습니다.
 */
const fetchUser = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`/api/user/${props.userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    user.value = userData;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '사용자 정보를 불러오는데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

// 컴포넌트 마운트 시 사용자 정보 가져오기
onMounted(() => {
  fetchUser();
});
</script>

<template>
  <NCard title="사용자 프로필" class="user-profile">
    <template v-if="loading">
      <div class="text-center py-8">
        <NSpin size="large" />
        <p class="mt-4">사용자 정보를 불러오는 중...</p>
      </div>
    </template>

    <template v-else-if="error">
      <NAlert type="error" :title="error" class="mb-4" />
      <NButton @click="fetchUser" type="primary">다시 시도</NButton>
    </template>

    <template v-else-if="user">
      <div class="user-info">
        <h3>{{ user.user_name }}</h3>
        <p>사용자 ID: {{ user.user_id }}</p>
        <NButton @click="fetchUser" class="mt-4">새로고침</NButton>
      </div>
    </template>
  </NCard>
</template>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
}

.user-info {
  text-align: center;
}

.text-center {
  text-align: center;
}
</style>
