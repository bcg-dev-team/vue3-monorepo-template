<template>
  <div class="components-view">
    <h1>UI 컴포넌트</h1>
    <p class="description">재사용 가능한 UI 컴포넌트 라이브러리</p>

    <div class="components-grid">
      <div class="component-card">
        <h3>BaseButton</h3>
        <div class="component-demo">
          <BaseButton label="Primary Button" variant="primary" />
          <BaseButton label="Outline Button" variant="outline" />
          <BaseButton label="Red Button" variant="red" />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseButton 
  label="Primary Button" 
  variant="primary" 
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseTabs</h3>
        <div class="component-demo">
          <BaseTabs :tabs="tabs" v-model="selectedTab" :show-content="true" />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  :show-content="true"
/&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h2>사용법</h2>
      <div class="code-block">
        <pre><code>// 컴포넌트 임포트
import { BaseButton, BaseTabs } from '@template/ui'

// BaseButton 사용
&lt;BaseButton 
  label="클릭하세요" 
  variant="primary" 
  @click="handleClick" 
/&gt;

// BaseTabs 사용
const tabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '컨텐츠' },
  { value: 'tab2', label: '두 번째 탭', content: '컨텐츠' },
];

&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  :show-content="true"
/&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, BaseTabs } from '@template/ui';
import { ref } from 'vue';

// BaseTabs 관련 상태
const selectedTab = ref('tab1');
const tabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab2', label: '두 번째 탭', content: '파란색 탭의 컨텐츠입니다.' },
  { value: 'tab3', label: '세 번째 탭', content: '초록색 탭의 컨텐츠입니다.' },
  { value: 'tab4', label: '네 번째 탭', content: '보라색 탭의 컨텐츠입니다.' },
];
</script>

<style scoped>
.components-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.component-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.component-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.component-demo {
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.component-code {
  background: #2c3e50;
  border-radius: 6px;
  overflow: hidden;
}

.component-code pre {
  margin: 0;
  padding: 1rem;
  color: #ecf0f1;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.component-code code {
  background: none;
  padding: 0;
}

.usage-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.usage-section h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-block {
  background: #2c3e50;
  border-radius: 6px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  color: #ecf0f1;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-block code {
  background: none;
  padding: 0;
}
</style>
