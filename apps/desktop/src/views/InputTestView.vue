<template>
  <div class="input-test-view">
    <h1>Input 컴포넌트 테스트</h1>
    <p class="description">InputSearch와 InputStepper 컴포넌트의 동작을 테스트합니다.</p>

    <!-- InputSearch 테스트 -->
    <section class="test-section">
      <h2>🔍 InputSearch 테스트</h2>
      <div class="input-demo">
        <InputSearch
          v-model="searchValue"
          placeholder="검색어를 입력하세요"
          :clearable="true"
          @search="handleSearch"
          @clear="handleClear"
        />
        <div class="search-info">
          <p><strong>현재 검색어:</strong> "{{ searchValue }}"</p>
          <p><strong>검색어 길이:</strong> {{ searchValue.length }}</p>
          <p><strong>마지막 검색:</strong> {{ lastSearch || '없음' }}</p>
        </div>
      </div>
    </section>

    <!-- InputStepper 테스트 -->
    <section class="test-section">
      <h2>🔢 InputStepper 테스트</h2>
      <div class="input-demo">
        <InputStepper
          v-model="stepperValue"
          :min="0"
          :max="100"
          :step="5"
          :show-buttons="true"
          button-position="inside"
          placeholder="값을 입력하세요"
        />
        <div class="stepper-info">
          <p><strong>현재 값:</strong> {{ stepperValue }}</p>
          <p><strong>최소값:</strong> 0</p>
          <p><strong>최대값:</strong> 100</p>
          <p><strong>증감 단위:</strong> 5</p>
        </div>
      </div>
    </section>

    <!-- 디버깅 정보 -->
    <section class="test-section">
      <h2>🐛 디버깅 정보</h2>
      <div class="debug-info">
        <p><strong>콘솔 로그를 확인하세요:</strong></p>
        <ul>
          <li>InputSearch: hasValue computed 값과 clear 버튼 클릭 이벤트</li>
          <li>InputStepper: canIncrease, canDecrease computed 값과 버튼 클릭 이벤트</li>
        </ul>
        
        <div class="debug-values">
          <h3>실시간 값 모니터링:</h3>
          <p><strong>InputSearch hasValue:</strong> {{ searchValue ? 'true' : 'false' }} (값: "{{ searchValue }}")</p>
          <p><strong>InputStepper canDecrease:</strong> {{ stepperValue > 0 ? 'true' : 'false' }}</p>
          <p><strong>InputStepper canIncrease:</strong> {{ stepperValue < 100 ? 'true' : 'false' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputSearch, InputStepper } from '@template/ui';

/**
 * Input 컴포넌트 테스트 페이지
 * InputSearch와 InputStepper의 동작을 테스트합니다.
 */

// InputSearch 상태
const searchValue = ref('');
const lastSearch = ref('');

// InputStepper 상태
const stepperValue = ref(25);

// 이벤트 핸들러
const handleSearch = (value: string) => {
  console.log('Search triggered:', value);
  lastSearch.value = value;
};

const handleClear = () => {
  console.log('Clear triggered');
  lastSearch.value = '';
};
</script>

<style scoped>
.input-test-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 30px;
}

.test-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.test-section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.input-demo {
  margin: 20px 0;
}

.search-info,
.stepper-info {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.search-info p,
.stepper-info p {
  margin: 5px 0;
}

.debug-info {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 15px;
}

.debug-info ul {
  margin: 10px 0;
  padding-left: 20px;
}

.debug-info li {
  margin: 5px 0;
}

.debug-values {
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 4px;
}

.debug-values h3 {
  margin-top: 0;
  color: #1976d2;
}

.debug-values p {
  margin: 8px 0;
  font-family: monospace;
}
</style> 