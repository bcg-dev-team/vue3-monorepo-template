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
          <BaseButton variant="primary" label="Primary 버튼" />
          <BaseButton variant="outline" label="Secondary 버튼" />
          <BaseButton variant="blue" label="Blue 버튼" />
          <BaseButton variant="red" label="Red 버튼" />
          <BaseButton variant="pill" label="Pill 버튼" />
        </div>
      </div>

      <div class="example-section">
        <h3>입력 컴포넌트</h3>
        <div class="input-examples">
          <BaseInputText v-model="inputValue" placeholder="텍스트를 입력하세요" />
          <BaseInputText v-model="inputValue2" placeholder="비밀번호" type="password" />
        </div>
      </div>

      <div class="example-section">
        <h3>BaseButton 컴포넌트</h3>
        <div class="naive-examples">
          <BaseButton variant="primary" label="Primary" />
          <BaseButton variant="outline" label="Outline" />
          <BaseButton variant="blue" label="Blue" />
          <BaseButton variant="red" label="Red" />
          <BaseButton variant="disabled" label="Disabled" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, BaseInputText } from '@template/ui';
import ThemeToggle from '../components/ThemeToggle.vue';
import { useThemeStore } from '@template/theme';
import { ref } from 'vue';

const themeStore = useThemeStore();

const inputValue = ref('');
const inputValue2 = ref('');
</script>

<style scoped>
.theme-test {
  padding: var(--padding-padding-24);
  max-width: 1200px;
  margin: 0 auto;
}

.theme-info {
  display: flex;
  align-items: center;
  gap: var(--padding-padding-16);
  margin-bottom: var(--padding-padding-24);
  padding: var(--padding-padding-16);
  background: var(--background-bg-default);
  border-radius: var(--radius-default);
}

.component-examples {
  display: flex;
  flex-direction: column;
  gap: var(--padding-padding-24);
}

.example-section {
  padding: var(--padding-padding-24);
  border: 1px solid var(--background-divider);
  border-radius: var(--radius-default);
  background: var(--background-bg-default);
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: var(--padding-padding-16);
  color: var(--font-color-default);
}

.button-examples,
.input-examples,
.naive-examples {
  display: flex;
  gap: var(--padding-padding-16);
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
