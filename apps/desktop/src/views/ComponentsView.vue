<template>
  <div class="components-view">
    <h1>UI 컴포넌트</h1>
    <p class="description">재사용 가능한 UI 컴포넌트 라이브러리</p>

    <div class="components-grid">
      <div class="component-card">
        <h3>BaseTabs - 연결된 탭 (Connected)</h3>
        <p class="component-description">
          탭들이 서로 연결되어 있으며, 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경됩니다.
        </p>
        <div class="component-demo">
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTabConnected"
            variant="connected"
            :show-content="true"
          />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="connected"
  :show-content="true"
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseTabs - 개별 탭 (Individual)</h3>
        <p class="component-description">
          각 탭이 독립적으로 표시되며, 선택된 탭만 색상이 변경됩니다.
        </p>
        <div class="component-demo">
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTabIndividual"
            variant="individual"
            :show-content="true"
          />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="individual"
  :show-content="true"
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseTabs - 카드 탭 (Card)</h3>
        <p class="component-description">
          각 탭이 카드처럼 표시되며, 선택 시 그림자 효과와 함께 위로 올라가는 애니메이션이
          적용됩니다.
        </p>
        <div class="component-demo">
          <BaseTabs :tabs="tabs" v-model="selectedTabCard" variant="card" :show-content="true" />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="card"
  :show-content="true"
/&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h2>BaseTabs 사용법</h2>
      <div class="code-block">
        <pre><code>// 컴포넌트 임포트
import { BaseTabs } from '@template/ui'

// 탭 데이터 정의
const tabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab2', label: '두 번째 탭', content: '파란색 탭의 컨텐츠입니다.' },
  { value: 'tab3', label: '세 번째 탭', content: '초록색 탭의 컨텐츠입니다.' },
  { value: 'tab4', label: '네 번째 탭', content: '보라색 탭의 컨텐츠입니다.' },
];

// 1. 연결된 탭 형태 (기본값) - 탭들이 서로 연결됨
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="connected"
  :show-content="true"
/&gt;

// 2. 개별 탭 형태 - 각 탭이 독립적으로 표시됨
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="individual"
  :show-content="true"
/&gt;

// 3. 카드 형태 탭 - 카드 스타일의 탭
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="card"
  :show-content="true"
/&gt;

// 추가 옵션들
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="connected"
  direction="horizontal"  // horizontal | vertical
  size="md"              // sm | md | lg
  :show-content="true"   // true | false
  @tab-click="handleTabClick"
/&gt;</code></pre>
      </div>
    </div>

    <div class="features-section">
      <h2>BaseTabs 디자인 특징</h2>
      <div class="features-grid">
        <div class="feature-item">
          <h4>🔗 연결된 탭 (Connected)</h4>
          <p>
            탭들이 서로 연결되어 하나의 그룹처럼 보입니다. 선택된 탭과 컨텐츠 영역이 같은 색상으로
            통일되어 시각적 일관성을 제공합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>🔘 개별 탭 (Individual)</h4>
          <p>
            각 탭이 독립적인 버튼처럼 표시됩니다. 선택된 탭만 색상이 변경되어 명확한 상태 표시를
            제공합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>🃏 카드 탭 (Card)</h4>
          <p>
            각 탭이 카드처럼 표시되며, 호버와 선택 시 그림자 효과와 애니메이션이 적용됩니다. 더
            현대적이고 인터랙티브한 느낌을 제공합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>🌈 색상 순환 시스템</h4>
          <p>
            탭 순서에 따라 빨간색(Trade Long) → 파란색(Trade Short) → 초록색(Trade Correct) →
            보라색(Trade Cancel) 순으로 색상이 순환됩니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>♿ 접근성 지원</h4>
          <p>
            키보드 네비게이션, 스크린 리더 지원, 포커스 표시 등 웹 접근성 가이드라인을 준수합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>📱 반응형 디자인</h4>
          <p>다양한 화면 크기에 대응하며, 세로/가로 방향과 크기 옵션을 지원합니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, BaseTabs } from '@template/ui';
import { ref } from 'vue';

// BaseTabs 관련 상태
const selectedTabConnected = ref('tab1');
const selectedTabIndividual = ref('tab1');
const selectedTabCard = ref('tab1');

const tabs = [
  {
    value: 'tab1',
    label: '첫 번째 탭',
    content: '빨간색 탭의 컨텐츠입니다. 이 탭은 Trade Long 색상을 사용합니다.',
  },
  {
    value: 'tab2',
    label: '두 번째 탭',
    content: '파란색 탭의 컨텐츠입니다. 이 탭은 Trade Short 색상을 사용합니다.',
  },
  {
    value: 'tab3',
    label: '세 번째 탭',
    content: '초록색 탭의 컨텐츠입니다. 이 탭은 Trade Correct 색상을 사용합니다.',
  },
  {
    value: 'tab4',
    label: '네 번째 탭',
    content: '보라색 탭의 컨텐츠입니다. 이 탭은 Trade Cancel 색상을 사용합니다.',
  },
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

.component-description {
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
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
  margin-bottom: 2rem;
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

.features-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.features-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.feature-item h4 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.feature-item p {
  color: #7f8c8d;
  line-height: 1.5;
  margin: 0;
}
</style>
