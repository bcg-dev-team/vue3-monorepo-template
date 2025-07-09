<template>
  <div class="theme-test">
    <h1>테마 테스트</h1>

    <div class="theme-info">
      <p>
        현재 테마: <strong>{{ themeStore.isDark ? '다크' : '라이트' }}</strong>
      </p>
      <ThemeToggle />
    </div>

    <div class="component-examples">
      <h2>컴포넌트 예시</h2>

      <div class="example-section">
        <h3>버튼 컴포넌트</h3>
        <div class="button-examples">
          <BaseButton variant="primary">Primary 버튼</BaseButton>
          <BaseButton variant="secondary">Secondary 버튼</BaseButton>
          <BaseButton variant="success">Success 버튼</BaseButton>
          <BaseButton variant="warning">Warning 버튼</BaseButton>
          <BaseButton variant="danger">Error 버튼</BaseButton>
        </div>
      </div>

      <div class="example-section">
        <h3>입력 컴포넌트</h3>
        <div class="input-examples">
          <BaseInput v-model="inputValue" placeholder="텍스트를 입력하세요" />
          <BaseInput v-model="inputValue2" placeholder="비밀번호" type="password" />
        </div>
      </div>

      <div class="example-section">
        <h3>폼 컴포넌트</h3>
        <BaseForm @submit="handleSubmit">
          <BaseInput v-model="formData.name" placeholder="이름" />
          <BaseInput v-model="formData.email" placeholder="이메일" />
          <BaseButton variant="primary" type="submit">제출</BaseButton>
        </BaseForm>
      </div>

      <div class="example-section">
        <h3>Naive UI 기본 컴포넌트</h3>
        <div class="naive-examples">
          <NButton type="primary">Naive Primary</NButton>
          <NButton type="info">Naive Info</NButton>
          <NButton type="success">Naive Success</NButton>
          <NButton type="warning">Naive Warning</NButton>
          <NButton type="error">Naive Error</NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { BaseButton, BaseInput, BaseForm } from '@template/ui';
import { useThemeStore } from '@template/theme';
import ThemeToggle from '../components/ThemeToggle.vue';

const themeStore = useThemeStore();

const inputValue = ref('');
const inputValue2 = ref('');
const formData = ref({
  name: '',
  email: '',
});

const handleSubmit = (data: any) => {
  console.log('폼 제출:', data);
  alert('폼이 제출되었습니다!');
};
</script>

<style scoped>
.theme-test {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.theme-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--n-color);
  border-radius: 8px;
}

.component-examples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-section {
  padding: 1.5rem;
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  background: var(--n-color);
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--n-text-color);
}

.button-examples,
.input-examples,
.naive-examples {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.input-examples {
  flex-direction: column;
  align-items: stretch;
}

.input-examples .base-input {
  width: 100%;
  max-width: 300px;
}
</style>
