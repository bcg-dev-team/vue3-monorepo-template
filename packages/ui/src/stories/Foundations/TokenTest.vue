<template>
  <div class="token-test">
    <h2>토큰 테스트</h2>

    <div class="test-section">
      <h3>색상 토큰</h3>
      <pre>{{ JSON.stringify(colors, null, 2) }}</pre>
    </div>

    <div class="test-section">
      <h3>타이포그래피 토큰</h3>
      <pre>{{ JSON.stringify(typography, null, 2) }}</pre>
    </div>

    <div class="test-section">
      <h3>간격 토큰</h3>
      <pre>{{ JSON.stringify(spacing, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getColorTokens,
  getTypographyTokens,
  getSpacingTokens,
  getPaddingTokens,
  getRadiusTokens,
} from '@template/theme';
import { ref, onMounted } from 'vue';

const colors = ref({});
const typography = ref({});
const spacing = ref({});
const padding = ref({});
const radius = ref({});

onMounted(() => {
  colors.value = getColorTokens();
  typography.value = getTypographyTokens();
  spacing.value = getSpacingTokens();
  padding.value = getPaddingTokens();
  radius.value = getRadiusTokens();
});
</script>

<style scoped>
.token-test {
  padding: 2rem;
  font-family: monospace;
}

.test-section {
  margin-bottom: 2rem;
}

.test-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
}
</style>
