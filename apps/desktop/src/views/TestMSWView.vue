<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NButton, NSpace, NAlert, NSpin } from 'naive-ui';
import UserProfile from '../components/UserProfile.vue';

const users = ref([
  { id: '123', name: '김철수' },
  { id: '456', name: '이영희' },
  { id: '789', name: '박민수' },
]);

const selectedUserId = ref('123');
const apiTestResult = ref<any>(null);
const loading = ref(false);

/**
 * 직접 API 호출해보기
 */
const testDirectApi = async () => {
  try {
    loading.value = true;
    apiTestResult.value = null;

    // 사용자 목록 API 호출
    const usersResponse = await fetch('/api/users');
    const usersData = await usersResponse.json();

    // 특정 사용자 API 호출
    const userResponse = await fetch(`/api/user/${selectedUserId.value}`);
    const userData = await userResponse.json();

    apiTestResult.value = {
      users: usersData,
      selectedUser: userData,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    apiTestResult.value = {
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  } finally {
    loading.value = false;
  }
};

/**
 * 새 사용자 생성 테스트
 */
const createUser = async () => {
  try {
    loading.value = true;

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '새 사용자',
        email: 'newuser@example.com',
      }),
    });

    const newUser = await response.json();

    apiTestResult.value = {
      message: '사용자 생성 성공!',
      newUser,
      timestamp: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    apiTestResult.value = {
      error: error instanceof Error ? error.message : '사용자 생성 실패',
    };
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="test-msw-page">
    <h1>MSW 테스트 페이지</h1>
    <p class="description">
      개발자 도구 콘솔을 열어서 "🔧 MSW가 활성화되었습니다." 메시지를 확인하세요!
    </p>

    <NSpace vertical :size="24">
      <!-- API 직접 테스트 -->
      <NCard title="API 직접 호출 테스트">
        <NSpace vertical>
          <div>
            <label>사용자 선택: </label>
            <select v-model="selectedUserId">
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} (ID: {{ user.id }})
              </option>
            </select>
          </div>

          <NSpace>
            <NButton type="primary" @click="testDirectApi" :loading="loading">
              API 테스트 실행
            </NButton>
            <NButton type="success" @click="createUser" :loading="loading">
              새 사용자 생성
            </NButton>
          </NSpace>

          <!-- API 결과 표시 -->
          <div v-if="apiTestResult">
            <h4>API 응답 결과:</h4>
            <pre class="api-result">{{ JSON.stringify(apiTestResult, null, 2) }}</pre>
          </div>
        </NSpace>
      </NCard>

      <!-- 컴포넌트 테스트 -->
      <NCard title="UserProfile 컴포넌트 테스트">
        <NSpace vertical>
          <div>
            현재 선택된 사용자 ID: <strong>{{ selectedUserId }}</strong>
          </div>
          <UserProfile :user-id="selectedUserId" />
        </NSpace>
      </NCard>

      <!-- MSW 상태 정보 -->
      <NCard title="MSW 상태 정보">
        <NAlert type="info" title="MSW 작동 확인 방법">
          <ul>
            <li>개발자 도구 → Network 탭에서 요청이 "(from service worker)"로 표시됨</li>
            <li>콘솔에 "🔧 MSW가 활성화되었습니다." 메시지 표시</li>
            <li>실제 서버 없이도 API 응답을 받을 수 있음</li>
          </ul>
        </NAlert>
      </NCard>
    </NSpace>
  </div>
</template>

<style scoped>
.test-msw-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
}

.api-result {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
  font-size: 12px;
}

select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 8px;
}
</style>
