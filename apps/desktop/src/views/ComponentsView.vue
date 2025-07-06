<template>
  <div class="components-view">
    <h1>UI 컴포넌트</h1>
    <p class="description">재사용 가능한 UI 컴포넌트 라이브러리</p>

    <div class="components-grid">
      <div class="component-card">
        <h3>BaseButton</h3>
        <div class="component-demo">
          <BaseButton variant="primary">Primary Button</BaseButton>
          <BaseButton variant="secondary">Secondary Button</BaseButton>
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseButton variant="primary"&gt;
  Primary Button
&lt;/BaseButton&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseInput</h3>
        <div class="component-demo">
          <BaseInput name="demo-input" v-model="inputValue" placeholder="입력하세요" />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseInput 
  name="input-name"
  v-model="value" 
  placeholder="입력하세요" 
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseForm</h3>
        <div class="component-demo">
          <BaseForm @submit="handleSubmit">
            <BaseInput name="name" v-model="formData.name" placeholder="이름" />
            <BaseInput name="email" v-model="formData.email" placeholder="이메일" />
            <BaseButton type="submit">제출</BaseButton>
          </BaseForm>
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseForm @submit="handleSubmit"&gt;
  &lt;BaseInput name="name" v-model="name" /&gt;
  &lt;BaseButton type="submit"&gt;제출&lt;/BaseButton&gt;
&lt;/BaseForm&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h2>사용법</h2>
      <div class="code-block">
        <pre><code>// 컴포넌트 임포트
import { BaseButton, BaseInput, BaseForm } from '@template/ui'

// 사용
&lt;BaseButton variant="primary" @click="handleClick"&gt;
  클릭하세요
&lt;/BaseButton&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BaseButton, BaseInput, BaseForm } from '@template/ui';

const inputValue = ref('');
const formData = ref({
  name: '',
  email: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
};
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
